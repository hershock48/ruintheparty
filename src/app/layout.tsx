import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/data/site";
import { baseOpenGraph } from "@/lib/meta";

/**
 * Barlow Condensed carries every headline: the condensed heavy caps the
 * client's boards are set in. Barlow carries body copy. Both are downloaded
 * at build time by next/font and served from this origin; nothing is fetched
 * from a third party at runtime.
 *
 * THREE FILES, NOT SIX. next/font preloads every weight listed, and six
 * woff2 files (about 80KB) sat in front of first paint on a 1.6Mbps
 * profile: LCP measured 3.0 to 3.6s on every route. One display weight and
 * two body weights is 40KB. A 700 request resolves to the 800 face and a
 * 500 to the 400, which is what the layout was designed around.
 */
const display = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["800"],
  display: "swap",
});

const body = Barlow({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.blurb,
  openGraph: {
    ...baseOpenGraph,
    url: "/",
    title: `${site.name} | ${site.tagline}`,
    description: site.blurb,
  },
  /* Card type only. A root twitter block carrying title and image is inherited
     by every sub-page and would hand the homepage's card to any scraper that
     prefers twitter:* tags. */
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

/*
  One Organization node. This is a movement, not a shop with an address, so
  there is no LocalBusiness block here on purpose (the launch checklist's
  LocalBusiness line is marked not applicable in the README).
*/
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#org`,
  name: site.name,
  alternateName: site.hashtag,
  url: site.url,
  logo: `${site.url}/brand/icon-512.png`,
  email: site.email,
  sameAs: [site.social.instagram, site.social.tiktok],
  slogan: site.tagline,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        {/* Flags that JS is available before first paint. Reveal and the hero
            motion only engage on .js, so without it everything renders
            visible and nothing ever flashes. .loaded follows the window's
            load event: decoration that must not compete with the first
            paint for bandwidth waits for it (globals.css, .hero-ghost). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `var d=document.documentElement;d.classList.add('js');addEventListener('load',function(){d.classList.add('loaded')})`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-teal focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-black"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
