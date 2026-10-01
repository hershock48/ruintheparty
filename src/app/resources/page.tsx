import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { lines, orgs } from "@/data/resources";

export const metadata: Metadata = pageMeta({
  title: "Resources and help lines",
  description:
    "The National Sexual Assault Hotline, 988, Crisis Text Line, love is respect, the National Domestic Violence Hotline, and the organizations already doing this work.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero kicker="Resources" title="Get help. Right now if you need it." lead="Ruin the Party is educational. It is not a replacement for emergency services, law enforcement, medical care or professional crisis support. The people below are.">
        <p className="mt-6 inline-block border-2 border-teal px-4 py-3 text-lg text-white">
          If someone is hurt, in danger, or cannot be woken up:{" "}
          <a href="tel:911" className="font-bold text-teal underline underline-offset-4">
            call 911
          </a>
          .
        </p>
      </PageHero>

      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <h2 className="kicker text-teal">Lines that answer</h2>
          <ul className="mt-6 grid gap-px bg-chalk/15 md:grid-cols-2">
            {lines.map((l, i) => (
              <Reveal as="li" key={l.name} delay={(i % 2) * 80} className="bg-black p-6">
                <h3 className="display text-3xl text-white">{l.name}</h3>
                <p className="mt-2 text-ash">{l.who}</p>
                <dl className="mt-4 space-y-2">
                  {l.how.map((h) => (
                    <div key={h.label} className="flex flex-wrap items-baseline gap-x-3">
                      <dt className="kicker w-24 text-chalk">{h.label}</dt>
                      <dd className="font-[family-name:var(--font-display)] text-2xl font-bold text-teal">
                        {h.href ? (
                          <a href={h.href} className="tap hover:text-white" target={h.href.startsWith("http") ? "_blank" : undefined} rel={h.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                            {h.value}
                          </a>
                        ) : (
                          h.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
                {l.url ? (
                  <a href={l.url} className="link mt-4 inline-block text-sm" target="_blank" rel="noopener noreferrer">
                    {l.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                  </a>
                ) : null}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <h2 className="kicker text-teal-ink">Organizations already doing this work</h2>
          <p className="mt-3 max-w-2xl text-lg">
            Ruin the Party is a phrase and a push. These are the people with programs, training and twenty years of
            evidence. Use them.
          </p>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {orgs.map((o, i) => (
              <Reveal as="li" key={o.name} delay={(i % 2) * 80} className="border border-ink/15 bg-white p-6">
                <p className="kicker text-teal-ink">{o.forWho}</p>
                <h3 className="display mt-2 text-3xl">
                  <a href={o.url} className="hover:text-teal-ink" target="_blank" rel="noopener noreferrer">
                    {o.name}
                  </a>
                </h3>
                <p className="mt-3 text-smoke">{o.what}</p>
                <a href={o.url} className="link mt-4 inline-block text-sm" target="_blank" rel="noopener noreferrer">
                  {o.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </a>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl text-sm text-smoke">
            Numbers and addresses on this page were read from each organization&rsquo;s own site on October 1, 2026. If one
            has changed, tell us and we will fix it the same day.
          </p>
        </div>
      </section>
    </>
  );
}
