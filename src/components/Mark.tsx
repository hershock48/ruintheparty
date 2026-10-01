import Image from "next/image";
import { site } from "@/data/site";
import HeroMark from "@/components/HeroMark";

/**
 * The client's brush mark, lifted from the file they sent, never redrawn.
 * public/brand/mark.png is that file with the black keyed out (the art is
 * two flat inks, teal #00DFDF and white, on black) so it sits on any dark
 * ground; the source webp is kept beside it.
 *
 * `hero` hands off to HeroMark.tsx: the words static, the hash painted in
 * stroke by stroke behind a soft-edged mask, once the artwork has loaded.
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
