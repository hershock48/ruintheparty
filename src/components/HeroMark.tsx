"use client";

import { useState } from "react";
import Image from "next/image";
import { site } from "@/data/site";

/**
 * The hero mark. The words are there from the first frame; only the hash
 * is painted in, stroke by stroke, the way it was drawn: the left
 * vertical, the right vertical, the upper bar, the lower bar. Each stroke
 * is the hash artwork clipped to a quad around that stroke, revealed by a
 * soft-edged mask that sweeps along the stroke's own direction (down the
 * verticals, across the bars). The soft edge is the point: a hard edge
 * sliding across lettering is a slide transition, which is what this
 * replaces (Kevin, 2026-10-01, twice).
 *
 * The fourth layer is the whole hash, unclipped, swept last: whatever
 * spatter the three quads miss arrives with the final stroke, so the
 * resting frame is the complete mark pixel for pixel. The quads are in
 * globals.css (.rtp-s1 to .rtp-s4) in the 567x766 space of hash.png.
 *
 * data-ready is set once the hash image has loaded, and the sweeps key on
 * it; before that the strokes sit unpainted, so nothing animates over an
 * image that has not arrived. Without JS or under reduced motion the mask
 * is never applied and the hero simply shows the logo.
 */
export default function HeroMark({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  const [ready, setReady] = useState(false);
  return (
    <span className={`rtp-mark relative block ${className}`} data-ready={ready ? "" : undefined} style={{ aspectRatio: "1224 / 1140" }} role="img" aria-label={site.hashtag}>
      {/* The words, static. */}
      <Image src="/brand/words.png" alt="" width={1224} height={1140} priority={priority} sizes="(min-width: 768px) 40vw, 280px" className="absolute inset-0 h-full w-full" />
      {/* The hash, four times, at its own position inside the mark's box:
          cut from x=5 y=94 at 567x766 of the 1224x1140 source. One file,
          fetched once. */}
      {["rtp-s1", "rtp-s2", "rtp-s3", "rtp-s4"].map((stroke, i) => (
        <span key={stroke} className={`${stroke} rtp-stroke-layer absolute block`} style={{ left: `${(5 / 1224) * 100}%`, top: `${(94 / 1140) * 100}%`, width: `${(567 / 1224) * 100}%` }}>
          <Image src="/brand/hash.png" alt="" width={567} height={766} priority={priority} sizes="(min-width: 768px) 19vw, 130px" className="h-auto w-full" onLoad={i === 0 ? () => setReady(true) : undefined} />
        </span>
      ))}
    </span>
  );
}
