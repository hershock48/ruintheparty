import type { Metadata } from "next";
import { site } from "@/data/site";

/**
 * The share card every page starts from. Next merges metadata shallowly, so a
 * page that sets its own openGraph replaces the root's whole block, and a page
 * that sets none inherits the HOME page's title and og:url. That is why every
 * page goes through pageMeta() below rather than setting title and
 * description alone.
 *
 * The image is ABSOLUTE, ON THE PITCH HOST, DELIBERATELY, for now. A relative
 * /og.jpg resolves against metadataBase (their real domain), where nothing is
 * deployed yet, so sharing the demo would show no picture. At launch this goes
 * back to plain "/og.jpg"; it is on the README checklist.
 */
export const baseOpenGraph = {
  type: "website",
  locale: "en_US",
  siteName: site.name,
  images: [{ url: `${site.pitchUrl}/og.jpg`, width: 1200, height: 630, alt: `${site.hashtag}. ${site.tagline}` }],
} satisfies Metadata["openGraph"];

/**
 * Title, description, canonical and a share card that matches them. `title`
 * is the page's own title; the share card gets it with the site name, as the
 * tab does. `fullTitle` skips the suffix for a title that already carries it.
 */
export function pageMeta({
  title,
  description,
  path,
  fullTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  fullTitle?: boolean;
}): Metadata {
  const shareTitle = fullTitle ? title : `${title} | ${site.name}`;
  return {
    title: fullTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { ...baseOpenGraph, title: shareTitle, description, url: path },
  };
}
