/**
 * Screenshots of every route at a phone and a desktop width, full page, so
 * the site gets LOOKED at before anything ships (glaze.md: render before
 * shipping; judge at true size). Also reports page errors and horizontal
 * overflow per route, the two things a screenshot cannot show.
 *
 *   node tools/shots.mjs --base http://127.0.0.1:4490 --out /tmp/shots
 *
 * The browser loader is the shared one in glazedweb's glaze/scripts/lib/
 * browser.mjs, imported by absolute path rather than copied, so a fix to
 * the resolver never misses a copy. GLAZE points at that repo.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const GLAZE = process.env.GLAZE ?? path.resolve(process.cwd(), "../glazedweb");
const { loadChromium, launchOpts, desktopLaunchOpts, arg } = await import(pathToFileURL(path.join(GLAZE, "glaze/scripts/lib/browser.mjs")).href);

const BASE = arg("base", "http://127.0.0.1:4490");
const OUT = arg("out", path.join(process.cwd(), "tools/out"));
const ROUTES = arg("routes", "/,/what-it-means,/know-the-line,/be-the-guy,/parents,/teams,/resources,/shop,/shop/the-hoodie,/contact,/nope-404").split(",");
fs.mkdirSync(OUT, { recursive: true });

const chromium = await loadChromium();
const summary = [];
for (const [width, height, label, opts] of [[390, 844, "phone", launchOpts()], [1280, 900, "desk", desktopLaunchOpts()]]) {
  const browser = await chromium.launch({ headless: true, ...opts });
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  for (const route of ROUTES) {
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    // Reveal everything, then let the transitions finish before shooting.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(900);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const name = (route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "_")) + `-${label}.png`;
    await page.screenshot({ path: path.join(OUT, name), fullPage: true });
    summary.push({ route, label, overflow, errors });
    page.removeAllListeners("pageerror");
    page.removeAllListeners("console");
  }
  await browser.close();
}
for (const s of summary) console.log(`${s.label.padEnd(5)} ${s.route.padEnd(18)} overflow ${s.overflow}px ${s.errors.length ? "ERRORS: " + s.errors.join(" | ") : "ok"}`);
