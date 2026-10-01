import { NextResponse } from "next/server";
import { bySlug } from "@/data/shop";

export const runtime = "nodejs";

/**
 * Buy button to Stripe Checkout (hosted). A plain form post, so it works
 * with JavaScript off; the answer is a 303 to Stripe's page.
 *
 * Price and name resolve SERVER-SIDE from src/data/shop.ts; the form sends
 * only a slug and a size, so a tampered post cannot invent a price. Raw
 * fetch against Stripe's API rather than the SDK: one call, one shape, no
 * dependency to keep current.
 *
 * Without STRIPE_SECRET_KEY the store is built but switched off, and the
 * visitor is told exactly that rather than shown a fake receipt.
 */
function page(title: string, message: string, status: number, back: string) {
  const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="font-family:system-ui,sans-serif;background:#000;color:#E6E6E6;display:grid;place-items:center;min-height:100vh;margin:0;padding:24px;text-align:center">
<div><h1 style="font-size:1.6rem;color:#fff">${esc(title)}</h1><p style="max-width:34rem;line-height:1.6">${esc(message)}</p>
<p><a href="${esc(back)}" style="color:#00DFDF">Back to the shop</a></p></div></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

export async function POST(request: Request) {
  let slug = "";
  let size = "";
  try {
    const fd = await request.formData();
    slug = String(fd.get("slug") ?? "");
    size = String(fd.get("size") ?? "");
  } catch {
    return page("That did not work", "The form could not be read.", 400, "/shop");
  }

  const product = bySlug(slug);
  if (!product) return page("Not on the shelf", "That product does not exist.", 404, "/shop");
  if (!product.sizes.includes(size)) return page("Pick a size", "Choose a size and try again.", 400, `/shop/${product.slug}`);

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return page(
      "The store is not open yet",
      `The shop is built and switched off until Ruin the Party connects its own Stripe account. Nothing was charged. When it opens, ${product.name.toLowerCase()} in ${size} will be here.`,
      503,
      `/shop/${product.slug}`,
    );
  }

  const origin = process.env.SITE_URL || new URL(request.url).origin;
  const body = new URLSearchParams({
    mode: "payment",
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": String(product.priceCents),
    "line_items[0][price_data][product_data][name]": `${product.name} (${size})`,
    "line_items[0][price_data][product_data][description]": product.print,
    "metadata[slug]": product.slug,
    "metadata[size]": size,
    "shipping_address_collection[allowed_countries][0]": "US",
    success_url: `${origin}/shop/thanks`,
    cancel_url: `${origin}/shop/${product.slug}`,
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const json = (await res.json().catch(() => ({}))) as { url?: string; error?: { message?: string } };
  if (!res.ok || !json.url) {
    console.error("[checkout] stripe refused", json.error?.message ?? res.status);
    return page("Checkout is not answering", "Stripe did not start a checkout. Nothing was charged. Try again in a minute.", 502, `/shop/${product.slug}`);
  }
  return NextResponse.redirect(json.url, 303);
}
