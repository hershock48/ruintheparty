import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { scenarios } from "@/data/scenarios";

export const metadata: Metadata = pageMeta({
  title: "Be the guy: what to say and what to do",
  description:
    "Eight real situations young men end up in, with the words that work, the moves that work, and when to get a bouncer, a coach, an RA or the police involved.",
  path: "/be-the-guy",
});

export default function BeTheGuyPage() {
  return (
    <>
      <PageHero
        kicker="Be the guy"
        title="You already know it's wrong. Here is what to do about it."
        lead="Nobody freezes because they don't care. They freeze because they don't have the words. These are the words."
      >
        <nav aria-label="Scenarios" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {scenarios.map((s, i) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="inline-flex min-h-11 items-center gap-2 border border-chalk/25 px-3 py-1.5 text-sm text-chalk hover:border-teal hover:text-white">
                  <span className="font-[family-name:var(--font-display)] font-bold text-teal">{String(i + 1).padStart(2, "0")}</span>
                  {s.title.replace(/\.$/, "")}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* The three ways in, credited. */}
      <section className="border-b border-chalk/10 bg-coal">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Reveal>
            <p className="kicker text-teal">Three ways in</p>
            <div className="mt-4 grid gap-6 md:grid-cols-3">
              <div>
                <h2 className="display text-3xl text-white">Do it yourself</h2>
                <p className="mt-2 text-chalk">Say the thing. Stand in the way. It is the fastest and it takes the most nerve.</p>
              </div>
              <div>
                <h2 className="display text-3xl text-white">Get somebody</h2>
                <p className="mt-2 text-chalk">Her friends. The host. A bouncer, a coach, an RA. The police. You do not have to be the whole answer.</p>
              </div>
              <div>
                <h2 className="display text-3xl text-white">Break the moment</h2>
                <p className="mt-2 text-chalk">Spill a drink. Ask him to help you carry something. Start a dumb argument about the game. It does not have to be brave to work.</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-ash">
              Bystander programs call these direct, delegate and distract. The{" "}
              <a href="https://alteristic.org/" className="link" target="_blank" rel="noopener noreferrer">
                Green Dot
              </a>{" "}
              program has taught them to schools and colleges for years. The words on this page are ours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          {scenarios.map((s, i) => (
            <Reveal as="article" key={s.slug} className="border-b border-chalk/10 py-12 last:border-b-0 md:py-16">
              <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
                <div id={s.slug}>
                  <p className="font-[family-name:var(--font-display)] text-5xl font-extrabold text-teal">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="display mt-2 text-4xl text-white md:text-5xl">{s.title}</h2>
                  <p className="mt-4 text-lg text-chalk">{s.situation}</p>
                </div>
                <div className="grid gap-7">
                  <div>
                    <h3 className="kicker text-teal">Say</h3>
                    <ul className="mt-3 space-y-2">
                      {s.say.map((line) => (
                        <li key={line} className="border-l-4 border-teal pl-4 text-xl text-white">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="kicker text-teal">Do</h3>
                    <ul className="mt-3 space-y-2 text-chalk">
                      {s.do.map((d) => (
                        <li key={d} className="flex gap-3">
                          <span className="mt-2.5 block h-2 w-2 flex-none bg-teal" aria-hidden="true" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-chalk/20 p-4">
                    <h3 className="kicker text-white">When to get somebody with authority</h3>
                    <p className="mt-2 text-chalk">{s.escalate}</p>
                  </div>
                  <div>
                    <h3 className="kicker text-teal">After</h3>
                    <p className="mt-2 text-chalk">{s.after}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-chalk/10 bg-teal text-black">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-3xl">
              <p className="kicker">If it has already happened</p>
              <p className="display mt-3 text-4xl sm:text-5xl">Someone is on the line all day, every day.</p>
              <p className="mt-4 text-lg">
                The National Sexual Assault Hotline is free and confidential: 800-656-4673, or chat at online.rainn.org. For
                anything right now, 911.
              </p>
            </div>
            <Link href="/resources" className="btn btn-ink">
              Every number
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
