import Image from "next/image";
import { site } from "@/data/site";

/**
 * The client's brush mark, lifted from the file they sent, never redrawn.
 * public/brand/mark.png is that file with the black keyed out (the art is
 * two flat inks, teal #00DFDF and white, on black) so it sits on any dark
 * ground; the source webp is kept beside it.
 *
 * `hero` splits it into the hash and the words so the two can arrive on
 * different schedules (globals.css, .rtp-hash and .rtp-words). The split is
 * two crops of the same image, so the resting frame is pixel-identical to
 * the one-piece mark.
 *
 * The phone `sizes` are the rendered pixel widths (the hero caps the mark
 * at 280px below md), not a viewport fraction: 90vw at 390 wide asked the
 * optimizer for the 750 variant for a 280px slot, and the mark is the
 * Largest Contentful Paint element on phones.
 */
export default function Mark({ className = "", hero = false, priority = false }: { className?: string; hero?: boolean; priority?: boolean }) {
  if (!hero) {
    return (
      <Image
        src="/brand/mark.png"
        alt={`${site.hashtag}`}
        width={1224}
        height={1140}
        priority={priority}
        sizes="(min-width: 768px) 40vw, 90vw"
        className={className}
      />
    );
  }
  return (
    <span className={`relative block ${className}`} style={{ aspectRatio: "1224 / 1140" }} role="img" aria-label={site.hashtag}>
      {/* The words, full image with the hash region left to the layer below.
          Cropping with overflow and an inset rather than two files keeps one
          source of truth for the artwork. */}
      <span className="rtp-words absolute inset-0 block overflow-hidden">
        <Image src="/brand/mark.png" alt="" width={1224} height={1140} priority={priority} sizes="(min-width: 768px) 40vw, 280px" className="h-full w-full" />
      </span>
      {/* The hash alone, on top, at its own position inside the mark's box:
          it was cut from x=5 y=94 at 567x766 of the 1224x1140 source. */}
      <span
        className="rtp-hash absolute block"
        style={{ left: `${(5 / 1224) * 100}%`, top: `${(94 / 1140) * 100}%`, width: `${(567 / 1224) * 100}%` }}
      >
        <Image src="/brand/hash.png" alt="" width={567} height={766} priority={priority} sizes="(min-width: 768px) 19vw, 130px" className="h-auto w-full" />
      </span>
    </span>
  );
}
