import { chromium } from "playwright"; import path from "node:path"; import fs from "node:fs";
const dir = path.resolve(process.argv[2]); const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport: { width: 1024, height: 1024 } });
for (const n of ["icon", "icon-small"]) { await p.setContent(`<style>html,body{margin:0;background:transparent}</style>` + fs.readFileSync(path.join(dir, n + ".svg"), "utf8").replace("<svg ", '<svg width="1024" height="1024" ')); await p.waitForTimeout(100); await p.locator("svg").screenshot({ path: path.join(dir, n + "-svg.png"), omitBackground: true }); }
await b.close();
