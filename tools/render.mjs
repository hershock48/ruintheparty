/**
 * Renders both share cards and screenshots the proposal, so all three get
 * LOOKED at before anything ships (glaze.md: render before shipping).
 *
 *   1. public/pitch/ruintheparty/og-card.html -> public/pitch/ruintheparty/og.jpg
 *      (1200x630 JPEG, the proposal's card, Glazed's argument in Glazed's look)
 *   2. tools/og-demo.html -> public/og.jpg (the site's own card, theirs entirely)
 *      Each also gets a center 630x630 crop written to OUT, which is what iOS
 *      shows (glaze/link-cards.md).
 *   3. The proposal at 1280, 390 and 320 wide, served from a static server
 *      over public/ (the Next host 404s /pitch off the pitch hostname):
 *      page errors, horizontal overflow, broken images, full-page screenshots.
 *
 *   npx http-server public -p 4491 -s &
 *   GLAZE=/path/to/glazedweb node tools/render.mjs --base http://127.0.0.1:4491 --out /tmp/render
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const GLAZE = process.env.GLAZE ?? path.resolve(process.cwd(), "../glazedweb");
const { loadChromium, launchOpts, desktopLaunchOpts, arg } = await import(pathToFileURL(path.join(GLAZE, "glaze/scripts/lib/browser.mjs")).href);

const ROOT = process.cwd();
const PITCH = path.join(ROOT, "public/pitch/ruintheparty");
const BASE = arg("base", "http://127.0.0.1:4491");
const OUT = arg("out", path.join(ROOT, "tools/out"));
fs.mkdirSync(OUT, { recursive: true });

const chromium = await loadChromium();
const browser = await chromium.launch({ headless: true, ...launchOpts() });

// 1 and 2. The cards.
for (const [html, jpg, name] of [
  [path.join(PITCH, "og-card.html"), path.join(PITCH, "og.jpg"), "proposal-card"],
  [path.join(ROOT, "tools/og-demo.html"), path.join(ROOT, "public/og.jpg"), "demo-card"],
]) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(html).href, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  await page.screenshot({ path: jpg, type: "jpeg", quality: 86 });
  await page.screenshot({ path: path.join(OUT, `${name}-center630.jpg`), type: "jpeg", quality: 86, clip: { x: 285, y: 0, width: 630, height: 630 } });
  console.log(`${name}: ${(fs.statSync(jpg).size / 1024).toFixed(0)}KB -> ${jpg}`);
  await page.close();
}
await browser.close();

// 3. The proposal.
for (const [width, height, label, opts] of [[1280, 900, "desk", desktopLaunchOpts()], [390, 844, "phone", launchOpts()], [320, 568, "narrow", launchOpts()]]) {
  const b = await chromium.launch({ headless: true, ...opts });
  const page = await b.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(`${BASE}/pitch/ruintheparty/index.html`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
  await page.screenshot({ path: path.join(OUT, `proposal-${label}.png`), fullPage: true });
  console.log(`proposal ${label.padEnd(6)} overflow ${overflow}px, broken images ${broken.length}, ${errors.length ? "ERRORS: " + errors.join(" | ") : "no errors"}`);
  await b.close();
}
