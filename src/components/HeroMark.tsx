"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { site } from "@/data/site";

/**
 * The hero mark: the words static, the hash written on.
 *
 * THE TECHNIQUE is the standard one for revealing hand-drawn lettering
 * (CSS-Tricks, "Animate Calligraphy with SVG" and "Handwriting Animation
 * With Irregular SVG Strokes"): the artwork stays a raster, and over each
 * stroke sits an SVG mask whose content is a thick round-capped path along
 * the brush's actual trajectory. Animating that path's stroke-dashoffset
 * from 1 to 0 (pathLength="1") reveals the raster along the path, so the
 * leading edge is the brush's own edge travelling the way the brush went.
 * The two earlier versions swept a straight edge across the strokes,
 * which is a wipe however soft the edge, and Kevin said so twice.
 *
 * THE LAYERS. The hash is split into its four strokes pixel by pixel
 * (tools/strokes.py: each painted pixel goes to the stroke whose
 * centerline it is nearest, crossings to the verticals, which were
 * painted first), so each mask only ever reveals its own stroke and its
 * own spatter. The four layers recombine to the original exactly. Each
 * is a 640px webp with alpha; one request each, about the size of the
 * single file they replace.
 *
 * ORDER AND DIRECTION, the way a hand draws a hash: left vertical top to
 * bottom, right vertical top to bottom, upper bar left to right, lower
 * bar left to right. The paths are TRACED from the pixels by
 * tools/centerlines.py (the center of each row's or column's ink,
 * smoothed, one point every 20px, in hash.png's 567x766 space), and the
 * script checks that every ink pixel of a layer lies inside its mask
 * width, so the write-on follows the brush exactly and leaves nothing
 * unrevealed. Rerun it if the art or the layers change.
 *
 * data-ready is set once all four layers have been fetched (see the
 * effect), and the write-on keys on it (globals.css); before that the mask
 * paths are fully offset, so nothing animates over an image that has not
 * arrived. Without JS
 * the offset is never applied and the mark is simply there. Mask ids
 * come from useId so two instances could never share one.
 */
const STROKES = [
  { layer: "/brand/hash-s1.webp", d: "M289 106 L262 121 L257 141 L261 161 L250 181 L244 201 L239 221 L234 241 L227 261 L221 281 L217 301 L211 321 L206 341 L207 361 L193 381 L189 401 L186 421 L180 441 L176 461 L172 481 L169 501 L164 521 L161 541 L155 561 L148 581 L144 601 L140 621 L134 641 L129 661 L125 681 L128 698 L127 700", width: 150 },
  { layer: "/brand/hash-s2.webp", d: "M479 18 L471 34 L449 54 L438 74 L432 94 L413 114 L402 134 L405 154 L385 174 L379 194 L372 214 L365 234 L364 254 L357 274 L355 294 L349 314 L344 334 L339 354 L334 374 L328 394 L327 414 L317 434 L314 454 L307 474 L298 494 L293 514 L293 534 L269 584 L264 637 L260 658 L256 677", width: 140 },
  { layer: "/brand/hash-s3.webp", d: "M50 362 L66 356 L86 351 L106 337 L126 334 L146 332 L166 316 L234 315 L271 304 L291 303 L311 283 L404 280 L424 264 L444 270 L461 269 L462 268", width: 140 },
  { layer: "/brand/hash-s4.webp", d: "M26 513 L41 504 L61 496 L81 491 L101 486 L121 479 L173 463 L228 464 L248 448 L268 440 L337 432 L375 417 L395 411 L415 406 L435 409 L456 416 L477 406 L497 402 L514 396 L514 395", width: 150 },
];

export default function HeroMark({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  const id = useId();
  const [ready, setReady] = useState(false);
  /* Readiness comes from fetching the four layers with HTMLImageElement,
     not from onLoad on the SVG <image> elements: React does not deliver
     load events for SVG images (the first cut waited forever and the hash
     never appeared). By the time these resolve the files are in the cache
     and the SVG images are painted. */
  useEffect(() => {
    let live = true;
    Promise.all(
      STROKES.map(
        (s) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = s.layer;
          }),
      ),
    ).then(() => {
      if (live) setReady(true);
    });
    return () => {
      live = false;
    };
  }, []);
  return (
    <span className={`rtp-mark relative block ${className}`} data-ready={ready ? "" : undefined} style={{ aspectRatio: "1224 / 1140" }} role="img" aria-label={site.hashtag}>
      {/* The words, static, and the Largest Contentful Paint element on phones. */}
      <Image src="/brand/words.png" alt="" width={1224} height={1140} priority={priority} sizes="(min-width: 768px) 40vw, 280px" className="absolute inset-0 h-full w-full" />
      {/* The hash, at its own position inside the mark's box: cut from
          x=5 y=94 at 567x766 of the 1224x1140 source. */}
      <svg
        viewBox="0 0 567 766"
        className="absolute block"
        style={{ left: `${(5 / 1224) * 100}%`, top: `${(94 / 1140) * 100}%`, width: `${(567 / 1224) * 100}%`, height: "auto" }}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {STROKES.map((s, i) => (
            <mask key={i} id={`${id}-m${i + 1}`} maskUnits="userSpaceOnUse" x="0" y="0" width="567" height="766">
              <path d={s.d} className={`rtp-p rtp-p${i + 1}`} pathLength={1} stroke="#fff" strokeWidth={s.width} strokeLinecap="round" fill="none" />
            </mask>
          ))}
        </defs>
        {STROKES.map((s, i) => (
          <image key={i} href={s.layer} width="567" height="766" mask={`url(#${id}-m${i + 1})`} />
        ))}
      </svg>
    </span>
  );
}
