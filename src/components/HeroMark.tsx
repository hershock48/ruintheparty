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
 * bar left to right. Centerlines were read off a grid over the art and
 * checked against it (the coordinates are in hash.png's 567x766 space).
 *
 * data-ready is set once all four layers have been fetched (see the
 * effect), and the write-on keys on it (globals.css); before that the mask
 * paths are fully offset, so nothing animates over an image that has not
 * arrived. Without JS
 * the offset is never applied and the mark is simply there. Mask ids
 * come from useId so two instances could never share one.
 */
const STROKES = [
  { layer: "/brand/hash-s1.webp", d: "M268 95 L118 735", width: 150 },
  { layer: "/brand/hash-s2.webp", d: "M432 12 L262 700", width: 140 },
  { layer: "/brand/hash-s3.webp", d: "M25 325 L485 248", width: 140 },
  { layer: "/brand/hash-s4.webp", d: "M15 478 L560 385", width: 150 },
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
