import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/data/site";

export const runtime = "nodejs";

/**
 * The contact form's destination.
 *
 * Mail goes over SMTP through a mailbox the client (or, until they have one,
 * the studio) already owns; no hosted mail API that costs a subscription
 * (glaze.md, "don't rent what the site can own"). reply_to is the visitor,
 * so whoever reads the inbox just hits reply.
 *
 * When mail is not configured the visitor is told the truth (there is no
 * address to give them: the client shows none on the site), and the full
 * payload is written to the log so nothing a real person typed is lost. What this route never does is answer ok when
 * the message went nowhere.
 */

const MAX = { name: 120, email: 200, who: 60, message: 4000 };

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Deliberately permissive. Bouncing a real person over a regex is worse. */
function looksLikeEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escapeHtml(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/**
 * The no-JS path answers with a real page instead of JSON. Tiny,
 * self-styled, honest: the error page carries the same message and the
 * email address. backHref is a real link, not javascript:history.back();
 * this page exists precisely for visitors without JavaScript.
 */
function htmlPage(title: string, message: string, status: number, backHref: string) {
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="font-family:system-ui,sans-serif;background:#000;color:#E6E6E6;display:grid;place-items:center;min-height:100vh;margin:0;padding:24px;text-align:center">
<div><h1 style="font-size:1.6rem;color:#fff">${escapeHtml(title)}</h1><p style="max-width:34rem;line-height:1.6">${escapeHtml(message)}</p>
<p><a href="${escapeHtml(backHref)}" style="color:#00DFDF">Go back to the form</a></p></div></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

/** Same-origin referer path, so the error page can link back to the form. */
function backHrefFrom(request: Request) {
  const ref = request.headers.get("referer");
  if (ref) {
    try {
      const u = new URL(ref);
      if (u.origin === new URL(request.url).origin) return u.pathname;
    } catch {
      /* fall through */
    }
  }
  return "/contact";
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const isForm = !contentType.includes("application/json");

  let b: Record<string, unknown>;
  if (isForm) {
    try {
      b = Object.fromEntries((await request.formData()).entries());
    } catch {
      return htmlPage("That did not work", "The form could not be read. Please go back and try again.", 400, backHrefFrom(request));
    }
  } else {
    let parsed: unknown;
    try {
      parsed = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    // Valid JSON is not necessarily an object: null, a number or an array
    // would otherwise crash the field reads below with a 500.
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    b = parsed as Record<string, unknown>;
  }

  /** One reply helper so the JSON and form paths cannot drift. */
  const fail = (error: string, status: number) =>
    isForm ? htmlPage("One more thing", error, status, backHrefFrom(request)) : NextResponse.json({ error }, { status });

  // Honeypot. Real people never fill this in because they never see it.
  if (clean(b.company, 100)) {
    return isForm ? NextResponse.redirect(new URL("/thanks", request.url), 303) : NextResponse.json({ ok: true });
  }

  const name = clean(b.name, MAX.name);
  const email = clean(b.email, MAX.email);
  const who = clean(b.who, MAX.who) || "Not said";
  // Team and school requests (the Teams page) go to the person who handles
  // them when TEAMS_TO is set; everything else to CONTACT_TO.
  const topic = clean(b.topic, 20);
  const message = clean(b.message, MAX.message);

  if (!name) return fail("Please add your name.", 400);
  if (!email || !looksLikeEmail(email)) return fail("Please add an email address we can answer.", 400);
  if (!message) return fail("Please tell us what you need.", 400);

  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  const CONTACT_TO = (topic === "teams" && process.env.TEAMS_TO) || process.env.CONTACT_TO;
  const port = Number(process.env.SMTP_PORT || 587);
  const from = process.env.CONTACT_FROM || `${site.name} Website <${SMTP_USER}>`;

  const text = [`Name: ${name}`, `Email: ${email}`, `I am a: ${who}`, topic ? `From: the ${topic} page` : "", "", message].filter((l, i) => l !== "" || i === 4).join("\n");

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    // Unconfigured. Log everything so nothing is lost, then tell the truth.
    console.error("[contact] mail not configured; message follows\n" + text);
    return fail("We could not send this just now. Please try again in a few minutes, we are sorry for the hassle.", 503);
  }

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transport.sendMail({
      from,
      to: CONTACT_TO,
      replyTo: email,
      subject: `${site.name}: ${who}, ${name}`,
      text,
    });
  } catch (err) {
    console.error("[contact] send failed; message follows\n" + text, err);
    return fail("We could not send this just now. Please try again in a few minutes.", 502);
  }

  return isForm ? NextResponse.redirect(new URL("/thanks", request.url), 303) : NextResponse.json({ ok: true });
}
