"use client";

import { useState } from "react";
import Image from "next/image";
import { site } from "@/data/site";

/**
 * The hero mark, painted in. See Mark.tsx for the artwork and globals.css
 * for the motion; this is the client half, and it exists for one reason:
 * THE CLIPS OPEN ONLY ONCE THE ARTWORK HAS ARRIVED. A CSS animation starts
 * when the style applies, which on a slow connection is a second or more
 * before hash.png and words.png have downloaded, so the wipes would run
 * over nothing and the finished mark would pop in afterwards, which is the
 * exact thing this replaces. data-ready is set when the hash and the words
 * have both loaded (next/image fires onLoad for a cached image too), and
 * the animations in globals.css key on it. Before that the layers sit at
 * their closed clip, so there is no flash of the full mark first.
 *
 * Without JS the attribute is never set, and html:not(.js) shows the mark
 * complete; reduced motion does the same (globals.css).
 */
export default function HeroMark({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  const [hash, setHash] = useState(false);
  const [words, setWords] = useState(false);
  const ready = hash && words;
  const wordSizes = "(min-width: 768px) 40vw, 280px";
  return (
    <span className={`rtp-mark relative block ${className}`} data-ready={ready ? "" : undefined} style={{ aspectRatio: "1224 / 1140" }} role="img" aria-label={site.hashtag}>
      <span className="rtp-hash absolute block" style={{ left: `${(5 / 1224) * 100}%`, top: `${(94 / 1140) * 100}%`, width: `${(567 / 1224) * 100}%` }}>
        <Image src="/brand/hash.png" alt="" width={567} height={766} priority={priority} sizes="(min-width: 768px) 19vw, 130px" className="h-auto w-full" onLoad={() => setHash(true)} />
      </span>
      {["rtp-w1", "rtp-w2", "rtp-w3"].map((band, i) => (
        <span key={band} className={`${band} absolute inset-0 block`}>
          <Image src="/brand/words.png" alt="" width={1224} height={1140} priority={priority} sizes={wordSizes} className="h-full w-full" onLoad={i === 0 ? () => setWords(true) : undefined} />
        </span>
      ))}
    </span>
  );
}
