import Image from "next/image";
import { site } from "@/data/site";
import HeroMark from "@/components/HeroMark";

/**
 * The client's brush mark, lifted from the file they sent, never redrawn.
 * public/brand/mark.png is that file with the black keyed out (the art is
 * two flat inks, teal #00DFDF and white, on black) so it sits on any dark
 * ground; the source webp is kept beside it.
 *
 * `hero` paints the mark in rather than fading it in (HeroMark.tsx): the
 * hash is stroked first, then RUIN, THE and PARTY are each wiped in along
 * the mark's own lean, a beat apart, the way a hand writes it. Four
 * layers of the same artwork: hash.png (the teal hash alone) and three
 * bands of words.png (the white words alone), each band a clip-path that
 * opens in globals.css (.rtp-hash, .rtp-w1, .rtp-w2, .rtp-w3), once the
 * images have loaded. The band edges come
 * from a row profile of the ink: RUIN 0 to 41%, THE 41 to 52%, PARTY
 * 52 to 100% of the mark's height. The resting frame is the complete
 * mark, pixel for pixel, so without JS or under reduced motion the hero
 * simply shows the logo.
 *
 * The phone `sizes` are the rendered pixel widths (the hero caps the mark
 * at 280px below md), not a viewport fraction: 90vw at 390 wide asked the
 * optimizer for the 750 variant for a 280px slot, and the mark is the
 * Largest Contentful Paint element on phones.
 */
export default function Mark({ className = "", hero = false, priority = false }: { className?: string; hero?: boolean; priority?: boolean }) {
  if (hero) return <HeroMark className={className} priority={priority} />;
  return (
    <Image
      src="/brand/mark.png"
      alt={`${site.hashtag}`}
      width={1224}
      height={1140}
      priority={priority}
      sizes="(min-width: 768px) 40vw, 280px"
      className={className}
    />
  );
}
