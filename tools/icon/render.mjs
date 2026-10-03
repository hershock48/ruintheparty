import { chromium } from "playwright";
import path from "node:path";
const dir = path.resolve(process.argv[2]);
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
for (const [q, out] of [["", "roundel-1024.png"], ["?small=1", "small-1024.png"]]) {
  await p.goto("file://" + path.join(dir, "icon.html") + q);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(250);
  await p.locator("#c").screenshot({ path: path.join(dir, out), omitBackground: true });
}
await b.close();
