import { createHmac, timingSafeEqual } from "node:crypto";
import nodemailer from "nodemailer";
import { bySlug, money } from "@/data/shop";
import { site } from "@/data/site";

export const runtime = "nodejs";

/**
 * Stripe tells this route when a checkout is paid; this route emails the
 * order to a person. That is the whole of fulfillment for now (the
 * client, 2026-10-03: worst case, email me and I will place it with the
 * dropshipper by hand). When the Printful line is built, the hand-off to
 * Printful's API goes where the email is sent, the way beanumber does it
 * (its src/lib/printful/orders.ts), and the email becomes the receipt.
 *
 * The signature is checked by hand rather than with Stripe's SDK, the
 * same choice /api/checkout makes: one header, one HMAC. Stripe signs
 * `${t}.${rawBody}` with the endpoint's secret; we recompute it, compare in
 * constant time, and refuse anything older than five minutes.
 *
 * Setup, once, on the client's Stripe account: Developers > Webhooks >
 * Add endpoint, URL https://ruintheparty.com/api/stripe-webhook, event
 * checkout.session.completed; copy the signing secret into
 * STRIPE_WEBHOOK_SECRET in Vercel. ORDER_TO is where orders land
 * (defaults to CONTACT_TO).
 *
 * This route answers 200 to anything it has verified, including events it
 * does not act on and sends it could not complete, because Stripe retries
 * on anything else and a mail outage would otherwise turn into dozens of
 * copies. A failed send is logged in full so nothing is lost.
 */

type Address = { line1?: string; line2?: string; city?: string; state?: string; postal_code?: string; country?: string };
type Session = {
  id: string;
  payment_intent?: string | null;
  amount_total?: number | null;
  currency?: string | null;
  metadata?: Record<string, string> | null;
  customer_details?: { email?: string | null; name?: string | null } | null;
  shipping_details?: { name?: string | null; address?: Address | null } | null;
  collected_information?: { shipping_details?: { name?: string | null; address?: Address | null } | null } | null;
};

function verify(raw: string, header: string | null, secret: string) {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(",").map((kv) => kv.split("=") as [string, string]));
  const t = Number(parts.t);
  const v1 = parts.v1;
  if (!t || !v1) return false;
  if (Math.abs(Date.now() / 1000 - t) > 300) return false;
  const expected = createHmac("sha256", secret).update(`${t}.${raw}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(v1);
  return a.length === b.length && timingSafeEqual(a, b);
}

function addressLines(a?: Address | null) {
  if (!a) return ["(no address collected)"];
  return [a.line1, a.line2, [a.city, a.state, a.postal_code].filter(Boolean).join(" "), a.country].filter(Boolean) as string[];
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response("Webhook not configured", { status: 503 });

  const raw = await request.text();
  if (!verify(raw, request.headers.get("stripe-signature"), secret)) {
    return new Response("Bad signature", { status: 400 });
  }

  let event: { id: string; type: string; data: { object: Session } };
  try {
    event = JSON.parse(raw);
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }
  if (event.type !== "checkout.session.completed") return new Response("Ignored", { status: 200 });

  const s = event.data.object;
  const slug = s.metadata?.slug ?? "";
  const size = s.metadata?.size ?? "";
  const product = bySlug(slug);
  const ship = s.shipping_details ?? s.collected_information?.shipping_details ?? null;
  const total = typeof s.amount_total === "number" ? money(s.amount_total) : "(unknown)";

  const text = [
    `NEW ORDER, ${site.name}`,
    "",
    `Item:     ${product ? product.name : slug || "(unknown)"}${size ? ` (${size})` : ""}`,
    `Paid:     ${total} ${(s.currency ?? "usd").toUpperCase()}`,
    `Buyer:    ${s.customer_details?.name ?? "(no name)"} <${s.customer_details?.email ?? "no email"}>`,
    "",
    "Ship to:",
    `  ${ship?.name ?? s.customer_details?.name ?? "(no name)"}`,
    ...addressLines(ship?.address).map((l) => `  ${l}`),
    "",
    `Stripe:   https://dashboard.stripe.com/payments/${s.payment_intent ?? ""}`,
    `Session:  ${s.id}`,
    "",
    "Place this with the dropshipper, then mark it in Stripe.",
  ].join("\n");

  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  const to = process.env.ORDER_TO || process.env.CONTACT_TO;
  const port = Number(process.env.SMTP_PORT || 587);
  const from = process.env.CONTACT_FROM || `${site.name} Website <${SMTP_USER}>`;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !to) {
    console.error("[order] mail not configured; order follows\n" + text);
    return new Response("Logged", { status: 200 });
  }
  try {
    await nodemailer
      .createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } })
      .sendMail({ from, to, subject: `Order: ${product ? product.name : slug}${size ? ` ${size}` : ""}, ${total}`, text });
  } catch (err) {
    console.error("[order] send failed; order follows\n" + text, err);
  }
  return new Response("OK", { status: 200 });
}
