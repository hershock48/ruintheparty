import Link from "next/link";
import Image from "next/image";
import GlazedPlate from "@/components/GlazedPlate";
import { nav, site } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="bg-black text-chalk">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image src="/brand/mark.png" alt={site.hashtag} width={1224} height={1140} sizes="88px" className="h-20 w-auto" />
          <p className="mt-5 max-w-sm text-base leading-relaxed text-ash">
            {site.tagline} Speak up. Step in. Ruin the party.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">
            Ruin the Party is educational. It is not a replacement for emergency services, law enforcement, medical
            care or professional crisis support. If someone is in danger, call 911.{" "}
            <Link href="/resources" className="link">
              Get help now
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="kicker text-teal">Pages</h2>
          <ul className="mt-3 space-y-1.5">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="tap font-medium text-chalk hover:text-teal">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="tap font-medium text-chalk hover:text-teal">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="kicker text-teal">Find us</h2>
          <ul className="mt-3 space-y-1.5">
            <li>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="tap font-medium text-chalk hover:text-teal">
                Instagram
              </a>
            </li>
            <li>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="tap font-medium text-chalk hover:text-teal">
                Facebook
              </a>
            </li>
          </ul>
          <p className="mt-5 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase text-white">
            {site.hashtag}
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-chalk/10 px-4 py-6 text-sm text-ash sm:px-6">
        {/* A static year on purpose: new Date() in a statically generated page freezes at build time (glaze.md). PLACEHOLDER until the client's legal name is on file. */}
        <p>&copy; 2026 {site.name}. All rights reserved.</p>
        <p>Good men don&rsquo;t stay silent.</p>
      </div>

      {/* Glazed Web signs off below the client's footer, not inside it.
          The line is the studio default, "Double Dipped by". The first cut
          used "Baked by" on the reading that a donut pun under a page about
          consent lands wrong; Kevin, 2026-10-02: Double Dipped. */}
      <GlazedPlate line="Double Dipped by" />
    </footer>
  );
}
