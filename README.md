# Ruin the Party, concept build

Spec build of [ruintheparty.com](https://ruintheparty.com) by
[Glazed Web](https://glazedweb.com), October 2026, from the client's own brief
and the brush mark they sent. Next.js App Router, TypeScript, Tailwind 4, no
CMS, no paid services. The client has not bought this; the footer carries the
studio credit until they do ("Baked by", because a donut pun under a page
about consent is the wrong reading of a joke with two readings; Kevin's call
per build).

The proposal lives at `public/pitch/ruintheparty/` and is served at the root
of ruintheparty.glazedweb.com; the site is at `/demo` on that host. Delete the
pitch folder and the rewrites in `next.config.ts` when the client signs or
passes.

## Run it

```
npm install
npm run build && npm start     # audit against THIS, never the dev server
npm run dev                    # development only
npm run lint
```

## Where content lives

Every fact is in `src/data/` and nowhere else:

- `site.ts`, the name, the phrase, the tagline, the domain, the email, the
  handles, the nav, the four moves, the refrain. Anything marked PLACEHOLDER
  is unconfirmed and on the checklist below.
- `scenarios.ts`, the eight Be the Guy situations. Adding a ninth is adding
  an object; the page, the jump list and the numbering follow.
- `parents.ts`, the nine conversations.
- `resources.ts`, every help line and organization, with the URL each number
  was read from.
- `shop.ts`, the products. Prices are integer cents and PLACEHOLDER until the
  client sets them; `/api/checkout` resolves price and name from this file,
  never from the form.

Surfaces that cannot read from these constants: `public/og.jpg` and
`public/pitch/ruintheparty/og.jpg` (rendered images; remake with
`tools/render.mjs` if the mark or the lines change), the copyright year in
`SiteFooter.tsx` (static on purpose, see traps), and the proposal itself,
which is a hand-written HTML file. You cannot grep a JPEG.

## Traps, this will break if you do not know

- **The noindex is deliberate and lives in TWO places:** `src/app/robots.ts`
  (disallow all) and `next.config.ts` (`X-Robots-Tag` on every response).
  Remove BOTH on launch day, and not before.
- **`/pitch/*` 404s on every host except ruintheparty.glazedweb.com.** That
  is the `missing: onPitchHost` rewrite. To look at the proposal locally,
  serve `public/` with a static server (`npx http-server public -p 4491`)
  rather than through Next.
- **The home link in the header reads the hostname.** On a `*.glazedweb.com`
  host it goes to `/demo`, because `/` there is the proposal. It is a
  `useSyncExternalStore` with a server snapshot of `/`, so markup matches on
  hydration. Keep the pattern in sync with the rewrite.
- **`.gitignore` is `.env*` plus `!.env.example`.** A bare `.env*` silently
  ignores the example file too.
- **The reveal system hides content only after JS flags `<html class="js">`.**
  No JS, no hiding. Do not "simplify" the flag away.
- **Teal is never text on a light ground.** `#00DFDF` on white measures
  1.66. The light bands use `teal-ink` `#0E6E6E` (6.04 on white). The whole
  table is at the top of `globals.css`.
- **The mobile nav is hidden in server HTML and shown by a button**, so it
  never ships open and collapses on hydration (the 0.39 CLS trap). Without JS
  the CSS shows the menu and hides the button.
- **No `scroll-behavior: smooth`, deliberately.** It breaks the harnesses.
- **The copyright year is a static 2026.** `new Date()` in a statically
  generated page freezes at build time and will print the wrong year; a
  static number that gets edited once a year is more honest than a frozen
  function call.
- **`next/font` preloads every weight you list.** It is three files on
  purpose (Barlow Condensed 800, Barlow 400 and 600). Six files put 80KB in
  front of first paint and pushed LCP over 3 seconds on every route.
- **Every mark `<Image>` carries `sizes`.** Without it the optimizer serves a
  1920px variant to a 420px slot and preloads it.
- **`favicon.ico` carries bitmap payloads** (ImageMagick packs them), three
  sizes: 48 from the real hash, 32 and 16 from a simplified four-bar hash,
  because the brush strokes turn to mush at 16px (standards.md).

## Forms and the store

`/api/contact` sends over SMTP with nodemailer, from a mailbox the client (or,
until they have one, the studio) owns, with `replyTo` set to the visitor. See
`.env.example`; Kevin sets real values in the Vercel dashboard. Behavior,
verified by hand on the production build (October 1, 2026):

- JS path: inline states, honest failure copy with the real email address.
- No-JS path: the same endpoint accepts a plain form post; success redirects
  to `/thanks` (303), failure returns a small real HTML page with the message
  and a link back to the form.
- Unconfigured: the visitor is told the truth (503) and given the email
  address, and the full payload is written to the server log so nothing a
  real person typed is lost. It never fakes an "ok".
- Honeypot field `company` silently accepts and discards bots.

`/api/checkout` is a plain form POST (works with JS off) that creates a Stripe
Checkout Session with raw fetch, no SDK, on the client's own
`STRIPE_SECRET_KEY`, and 303s to it. The store opens only when the key AND
`SHOP_OPEN=1` are both set (`SHOP_LIVE` in `site.ts`), so adding the key
cannot start charging the placeholder prices; until then it answers a real
HTML page saying the store is not open yet (503), and the pages say so too.
The shop pages are static, so changing either variable needs a redeploy. A bad slug is 404, a size the
product does not have is 400. Success returns to `/shop/thanks`. No webhook
yet: order notification is the Stripe dashboard email until one is built
(checklist).

## Decisions, with reasoning

- **The palette is measured.** The teal is the painted ink of the client's
  own mark, `#00DFDF`, sampled from the file. Ratios for every pairing are
  in `globals.css`.
- **The mark is their file, keyed, never redrawn.** `public/brand/mark.png`
  is `source-logo.webp` with the black made transparent and every pixel
  snapped to one of the two flat inks (the webp's chroma subsampling had
  left green and magenta speckles along the strokes). `hash.png` is the hash
  cut from it for the icons and the hero's two-piece arrival.
- **Barlow Condensed and Barlow.** One family, two widths. The condensed
  heavy caps are what the client's boards set every headline in.
- **No photography, and the design does not wait for any.** There is none
  on file. When real photographs of real young men who agreed to be on the
  site exist, they go behind the home hero, on What it means, and on Teams.
- **Timing on the home page was walked with frames, not eyeballed.** The
  headline underline draws as the hash's first stroke lands (0.7s), not
  after the last (3.35s), where it read as a mistake. The refrain stamp
  waits for its line's 0.6s reveal to finish and lands in the beat after
  (0.65s); at 0.26s it landed mid-fade and the two smeared together. Both
  were captured frame by frame (`tools/` has no copy of the capture
  scripts; they live in the session scratchpad and are two short
  Playwright loops).
- **The refrain repeats on purpose, once.** "Ruin the party." after each
  setup is the client's device from the brief. It appears on the home page
  and nowhere else, so the house rule on counted repetition still holds.
- **Grit without photographs.** The hero and the refrain carry a film
  grain (`public/brand/grain.png`, 120px of white pixels at random alpha,
  tiled at 9% opacity) and the hero has the hash from the mark itself,
  huge and cropped off the corner at 11%. The grain sits above the content
  on its own z-index; see the comment in `globals.css` for the `position`
  trap that putting it underneath walked into.
- **The mark is first on phones.** Streetwear leads with the mark. It costs
  about a quarter second of LCP on the throttled profile (audit state).
- **Only the hash is painted in, written on along its own strokes; the
  words are static.** Three earlier versions were a rise-and-pop, a wipe
  of every word, and a soft-edged wipe of the hash. Kevin: "rushed and
  cheap", "a bad transition on PowerPoint", "something is lazy, research
  the proper way." The proper way for hand-drawn lettering is an SVG mask
  whose content is a thick round-capped path along the brush's trajectory,
  animated with `stroke-dashoffset` (`pathLength="1"`), so the reveal
  travels the way the brush went and its edge is the brush's own
  (CSS-Tricks, "Animate Calligraphy with SVG"; "Handwriting Animation With
  Irregular SVG Strokes"). `HeroMark.tsx` does that over four stroke
  layers, `public/brand/hash-s1.webp` to `hash-s4.webp`, which
  `tools/strokes.py` cuts from `hash.png` by nearest centerline (crossings
  to the verticals, painted first); they recombine to the original exactly.
  The mask paths are TRACED from the pixels by `tools/centerlines.py`
  (the center of each row's or column's ink, smoothed, a point every
  20px), and the script checks every ink pixel lies inside its mask width.
  Order: left vertical, right vertical, upper bar, lower bar, about 3.3s.
  The write-on waits for the four layers to be fetched (`data-ready`, set
  from an effect: React does not deliver load events for SVG `<image>`,
  and the first cut waited forever). Frames captured and looked at;
  reduced motion and no-JS show the finished mark; home LCP 2.1s.
- **The shop photos are crops from the client's boards.** Kevin, 2026-10-01:
  use his photos so the store looks legit. The two boards he sent are in
  `public/brand/`, the five square crops are cut by `tools/crops.sh` into
  `public/shop/`, and the product list matches what the boards show (the
  sticker pack became the bottle, which is on the boards; stickers are
  not). They are concept renders upscaled from about 300px, to be replaced
  by product photography when the goods exist.
- **The header is black glass.** 70% black with an 18px backdrop blur, so
  the teal band and the shop photographs show through it as they scroll
  under. 70% is a contrast floor: over white the bar mixes to about
  #4D4D4D, where chalk measures 6.8 and the teal current link 5.1. Without
  `backdrop-filter` it falls back to the 95% black it was. It is the one
  place glass is used; on a black page glass needs colour behind it, and
  glass cards or buttons would read as a tech site, not a brush mark.
- **A product tile grows into its page.** The tile photo and the product
  page photo share a React `<ViewTransition name>` (Next 16 ships it with
  no config), so the browser's View Transitions API carries the picture
  from the grid into the page, 420ms, with a 2px blur mid-flight to hide
  the resampling. No library, no JavaScript of ours. Browsers without the
  API just navigate. The product photo is NOT inside a `Reveal` for this
  reason: the morph would land on an invisible picture. Reduced motion
  turns every view transition off (`globals.css`).
- **Inner pages open on the home hero's ground.** `PageHero` carries the
  same grain and the hash from the mark, faint and low on the right. Both
  are held back until the window `load` event (`html.loaded`, set in
  `layout.tsx`): as plain images they downloaded beside the fonts the
  headline waits for and cost the inner pages about 350ms of LCP on the
  throttled profile. `hash-ghost.webp` is `hash.png` at 420px (20KB vs
  124KB) because at 9% opacity nobody sees the compression.
- **The shop photos are the second cut** (`tools/crops.sh`). The first
  carried half a wristband in the tee tile, the board's border across the
  hoodie and scraps of other lettering beside the bottle. The files are
  named `-2` because the image optimizer caches by URL.
- **The hashtag ticker** is the streetwear version of a hashtag band: six
  copies on a track that moves by half its width and loops. The track
  width is a budget (globals.css, `.ticker`); measure it before adding a
  copy or a size.
- **Statistics appear once**, on What it means, with the RAINN link, and
  nowhere else. The brief says not to build a seminar.
- **Scenarios credit Green Dot's three Ds** (direct, delegate, distract) by
  name on Be the Guy; the words are ours.
- **Organization schema, not LocalBusiness.** It is a movement, not a shop
  with an address. The launch checklist's LocalBusiness line is marked not
  applicable below.
- **The plate inverts to cream** under the black footer (`plate.mjs`:
  chocolate measures 1.19, cream 19.57).

## Audit state (October 1, 2026, this sandbox)

Against the production build, with the glazedweb harnesses:

- `audit.mjs`, 13 routes at 390 and 1440: axe violations **0**, horizontal
  overflow **none**, console errors **none**, 4xx/5xx **none**.
- `width-check.mjs`, 10 routes at 320 and 768: **0** violations, no overflow.
- `perf-check.mjs` (1.6Mbps, 150ms, 4x CPU, 390x844): `/` **2,068ms**
  with the words static from the first paint (it was 2,696 to 2,748 while
  the whole mark animated in and sat first on the phone screen; the LCP
  element is the words image).
  `/be-the-guy` 2,500ms, `/know-the-line` 2,472ms, `/shop` **2,956ms** and
  `/shop/the-tee` **2,652ms, both over the line** since the tiles became
  photographs (the first tile is preloaded; the 750-wide webp is 21KB, so
  the rest is the throttled connection in front of fonts, JS and image).
  CLS 0 to 0.043 everywhere. JS **141KB** compressed, under the 150KB bar.
- October 2 (glass header, photo morph, inner-page ground, second crop),
  measured before and after on the same profile with a Playwright LCP
  observer, three runs each, in this sandbox: `/` 1,040 to 1,045ms,
  `/be-the-guy` 2,405 to 2,433, `/teams` 2,459 to 2,455, `/shop` 2,691 to
  2,675, `/shop/the-tee` 2,525 to **713** (the tile the visitor came from
  is already cached). Unchanged within noise everywhere else, which is the
  point of deferring the ground to the load event: the first version of it
  was +350ms. Absolute numbers differ from the October 1 harness because the
  machines differ; compare within a row.
- October 2, final pass, 14 routes at 320, 390, 768 and 1440 with axe-core
  4 (wcag2a, 2aa, 21aa, best-practice): **0 violations** after the pass
  (before it: h3 under h1 on the shop grid, no h1 on `/thanks`,
  `/shop/thanks` and the 404), console errors **none**, horizontal
  overflow **none**. Checked by hand: the mobile menu opens, closes on
  navigation and on Escape (focus returns to the button); the size and
  "I am a" radios show a focus ring, not only the checked state; no-JS
  shows every reveal and the menu; the contact form keeps the message on
  screen and names the address when sending fails; reduced motion shows
  the finished hash and no view transitions.
- The hashtag ticker track measures **2,843px** at 1440 (2,409 at 390),
  under the 4,096px mobile compositing budget in glaze.md. Six copies.
- `motion-check.mjs` on `/`: no transient overflow at 320, 390 or 1440
  during the entrance; reduced motion animates nothing. The first
  painted-in version failed this: the reduced-motion overrides had lower
  specificity than the `[data-ready]` rules that start the animations, so
  the mark animated anyway. The overrides now name the same selectors.
- Plate verified: `.gw-plate` computed cream, drip inherits the footer black.
- Both API routes exercised in every state (above).
- `npm audit`: **0 vulnerabilities**, after moving to Next 16.3.8 (16.3.0
  carried three remote code execution advisories) and nodemailer 10.0.13
  (7.x carried SMTP command injection advisories). Keep both current.

Not run: `glaze/scripts/second.mjs` (the Codex second opinion on the
proposal; the sandbox has no Codex sign-in). Run judge and prose on the
letter before Kevin sends it (backlog C01).

## Before launch (when this stops being a spec build)

- [ ] Remove the noindex from BOTH `robots.ts` and `next.config.ts`
- [ ] Delete `public/pitch/` and the rewrites in `next.config.ts`
- [ ] `og:image` in `src/lib/meta.ts` is pinned to the ruintheparty.glazedweb.com
      host so shares show a picture during the pitch; change it back to
      `/og.jpg` so it resolves against the real domain
- [ ] Confirm the client's legal name and who is behind the movement, and put
      it on the site where they want it said (`site.ts` `founder`)
- [ ] Replace the PLACEHOLDER email, Instagram and TikTok handles in `site.ts`
- [ ] Set `SMTP_*` and `CONTACT_TO` (a real, human-watched inbox) in Vercel;
      submit the form on `/contact` and `/teams`; confirm arrival
- [ ] Set `STRIPE_SECRET_KEY` (the client's own); place a test order with
      4242 4242 4242 4242; decide stock-and-ship versus print-on-demand
- [ ] Real prices in `shop.ts`; remove the PLACEHOLDER comments
- [ ] Only then set `SHOP_OPEN=1` in Vercel and redeploy; that is the switch
      that opens the store
- [ ] An order webhook or Stripe's own email notifications, confirmed arriving
- [ ] Re-check every number and address on `/resources` in a browser (they were
      read by search listing from this sandbox, which cannot open the sites)
- [ ] Write the materials for coaches and schools, in whatever order the
      `/teams` form asks for them
- [ ] Photography, if and when it exists, with written permission from
      everyone in it
- [ ] Product photography to replace the five board crops in `public/shop/`
- [ ] `/` and `/shop` LCP under 2,500ms on the throttled profile, or record
      why not (home is under it; the shop pages are not)
- [ ] LocalBusiness structured data: not applicable, Organization is used
- [ ] Studio credit: the client told it is there, and the wording confirmed
      with Kevin ("Baked by")
- [ ] `npm audit` reviewed, any remaining advisory named here with a reason
- [ ] Point the canonical host at ruintheparty.com everywhere it appears; DNS
      cutover; HTTPS enforced
