import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = pageMeta({
  title: "Know the line: consent, in plain words",
  description:
    "No is a complete sentence. It does not matter when no is said. Consent, alcohol and the line, written for young men rather than for a training seminar.",
  path: "/know-the-line",
});

/**
 * Consent. Short, direct, second person. The facts about consent and
 * intoxication match RAINN's published explanations and are linked to them;
 * the page is education, not legal advice, and says so at the bottom. The
 * law on consent differs by state; RAINN's state-by-state comparison is the
 * link for that.
 */
export default function KnowTheLinePage() {
  const whens = ["Before anything happens.", "After kissing.", "After clothes come off.", "After someone previously said yes.", "In the middle of sex."];
  const owes = ["They flirted with you.", "They let you buy the drink.", "They went home with you.", "They kissed you.", "They said yes last time.", "They said yes an hour ago."];

  return (
    <>
      {/* The same black hero as every other inner page. The first cut opened
          on a paper block like the home page's "No" panel, and this was the
          one page that did not look like the rest of the site (Kevin,
          2026-10-02). The line stays; the ground matches. */}
      <PageHero
        kicker="Know the line"
        title={
          <>
            &ldquo;No&rdquo; is a
            <br />
            complete
            <br />
            sentence.
          </>
        }
      >
        <p className="display mt-6 text-3xl text-teal sm:text-4xl">It doesn&rsquo;t matter when no is said.</p>
      </PageHero>

      <section className="bg-black">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <Reveal>
            <p className="kicker text-teal">When</p>
            <h2 className="display mt-3 text-4xl text-white">No counts at every one of these.</h2>
            <ul className="mt-6 space-y-3">
              {whens.map((w) => (
                <li key={w} className="border-l-4 border-teal pl-4 text-xl text-chalk">
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg text-chalk">
              Consent can be taken back at any time. &ldquo;Stop&rdquo; means stop. Pulling away means stop. Going quiet and
              still means stop. You do not get to finish.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="kicker text-teal">Nobody owes you sex because</p>
            <ul className="mt-3 space-y-3">
              {owes.map((o) => (
                <li key={o} className="border-l-4 border-chalk/30 pl-4 text-xl text-chalk">
                  {o}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg text-chalk">
              None of that is a yes. The only yes is a yes, from somebody who is awake, sober enough to mean it, and
              free to say no instead.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-chalk/10 bg-coal">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="grid gap-10 md:grid-cols-3">
            <Reveal>
              <h2 className="display text-3xl text-white">Drunk</h2>
              <p className="mt-3 text-chalk">
                Someone too intoxicated to make a decision cannot consent. If you would take her keys, you do not take
                her home. Being drunk yourself is not a reason either. It is an excuse, and it is the oldest one.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="display text-3xl text-white">Asleep or out</h2>
              <p className="mt-3 text-chalk">Asleep is a no. Passed out is a no. &ldquo;She didn&rsquo;t say anything&rdquo; is a no.</p>
            </Reveal>
            <Reveal delay={180}>
              <h2 className="display text-3xl text-white">Pressure</h2>
              <p className="mt-3 text-chalk">
                A yes you had to wear somebody down for is not a yes. If you are still asking after the first no, you
                already know.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <Reveal className="max-w-3xl">
            <p className="kicker text-teal">The short version</p>
            <p className="display mt-3 text-4xl text-white sm:text-5xl">If you&rsquo;re not sure, that&rsquo;s your answer.</p>
            <p className="mt-6 text-lg text-chalk">
              Ask. Out loud. &ldquo;You good with this?&rdquo; takes a second and it is the least embarrassing sentence you will
              ever say. Then listen to the answer, including the one that is not words.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/be-the-guy" className="btn btn-teal">
                When it&rsquo;s your friend
              </Link>
              <Link href="/resources" className="btn btn-ghost">
                Get help
              </Link>
            </div>
          </Reveal>
          <p className="mt-14 max-w-3xl border-t border-chalk/10 pt-6 text-sm text-ash">
            This page is education, not legal advice. The definitions above match what{" "}
            <a href="https://rainn.org/share-the-facts/consent-101-respect-boundaries-and-building-trust/" className="link" target="_blank" rel="noopener noreferrer">
              RAINN says about consent
            </a>{" "}
            and{" "}
            <a href="https://rainn.org/strategies-to-reduce-risk-increase-safety/alcohol-safety/" className="link" target="_blank" rel="noopener noreferrer">
              about alcohol and consent
            </a>
            . How the law defines consent differs by state;{" "}
            <a href="https://apps.rainn.org/policy/compare/consent-laws.cfm" className="link" target="_blank" rel="noopener noreferrer">
              RAINN compares them here
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
