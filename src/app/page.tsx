import type { Metadata } from "next";
import Link from "next/link";
import Mark from "@/components/Mark";
import Moves from "@/components/Moves";
import Reveal from "@/components/Reveal";
import { refrain, site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.name} | Be the man who ruins the party`,
  description:
    "When something isn't right, say something. When your friend crosses the line, stop him. Ruin the Party talks to young men about consent and stepping in.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* HERO. The client's opening, word for word from the brief. */}
      <section className="relative overflow-hidden border-b border-chalk/10 bg-black">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-[1fr_0.9fr] md:pb-24 md:pt-20">
          <div>
            <h1 className="display text-[3.4rem] leading-[0.9] text-white sm:text-7xl md:text-[5.4rem]">
              Be the man
              <br />
              who ruins
              <br />
              the party.
            </h1>
            <span className="rtp-stroke rule mt-6" aria-hidden="true" />
            <ul className="mt-7 max-w-md space-y-1.5 text-lg leading-snug text-chalk md:text-xl">
              <li>When something isn&rsquo;t right, say something.</li>
              <li>When your friend crosses the line, stop him.</li>
              <li>When someone needs help, step in.</li>
              <li className="pt-2 font-semibold text-white">Doing what&rsquo;s right matters more than fitting in.</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/be-the-guy" className="btn btn-teal">
                What to actually do
              </Link>
              <Link href="/what-it-means" className="btn btn-ghost">
                Why this exists
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[420px] md:max-w-none">
            <Mark hero priority className="w-full" />
          </div>
        </div>
      </section>

      {/* THE DECISION. One box, one sentence. */}
      <section className="bg-teal text-black">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <Reveal>
            <p className="kicker">The phrase is a decision</p>
            <p className="display mt-3 max-w-4xl text-4xl sm:text-5xl md:text-6xl">
              I&rsquo;d rather ruin the party than ignore something I know is wrong.
            </p>
          </Reveal>
        </div>
      </section>

      {/* THE REFRAIN. The one place on the site the line repeats, on purpose. */}
      <section className="border-b border-chalk/10 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <ul className="divide-y divide-chalk/10">
            {refrain.map((r, i) => (
              <Reveal as="li" key={r.setup} delay={i * 60} className="grid gap-2 py-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8">
                <p className="text-xl text-chalk md:text-2xl">{r.setup}</p>
                <p className="display text-3xl text-teal md:text-4xl">{"answer" in r ? r.answer : "Ruin the party."}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* THE FOUR MOVES. */}
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal>
            <p className="kicker text-teal">Four moves</p>
            <h2 className="display mt-3 text-4xl text-white sm:text-5xl">See it. Say it. Step in.</h2>
          </Reveal>
          <div className="mt-10">
            <Moves />
          </div>
          <p className="mt-8 max-w-2xl text-ash">
            Every one of those has words that go with it, and situations to practice them on.{" "}
            <Link href="/be-the-guy" className="link">
              Be the guy
            </Link>{" "}
            is the page for that.
          </p>
        </div>
      </section>

      {/* NO IS A COMPLETE SENTENCE. The second big message, on paper. */}
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <Reveal>
            <p className="display text-6xl sm:text-7xl md:text-8xl">
              &ldquo;No&rdquo;
              <br />
              is a
              <br />
              complete
              <br />
              sentence.
            </p>
            <span className="rule mt-6" aria-hidden="true" />
            <p className="display mt-6 text-2xl text-teal-ink sm:text-3xl">It doesn&rsquo;t matter when no is said.</p>
          </Reveal>
          <Reveal delay={120} className="md:pt-4">
            <ul className="space-y-3 text-lg leading-snug text-ink md:text-xl">
              <li>Before anything happens.</li>
              <li>After kissing.</li>
              <li>After clothes come off.</li>
              <li>After someone previously said yes.</li>
              <li>In the middle of sex.</li>
            </ul>
            <p className="mt-6 max-w-md text-smoke">
              Consent can be taken back at any time. Nobody owes anyone sex because they flirted, took a drink, went home
              with them, kissed them, or said yes before.
            </p>
            <Link href="/know-the-line" className="btn btn-ink mt-8">
              Know the line
            </Link>
          </Reveal>
        </div>
      </section>

      {/* WHO IT IS FOR. */}
      <section className="border-b border-chalk/10 bg-black">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3 md:py-24">
          {[
            { href: "/be-the-guy", k: "For you", t: "Be the guy", p: "Real situations, what to say, what to do, and when to get somebody else." },
            { href: "/parents", k: "For parents", t: "Raising him", p: "Nine conversations, each with a first sentence you can actually say." },
            { href: "/teams", k: "For coaches and schools", t: "Bring it to your team", p: "A locker-room talk, a season plan, and the programs that already work." },
          ].map((c, i) => (
            <Reveal key={c.href} delay={i * 90}>
              <Link href={c.href} className="group block h-full border border-chalk/15 bg-coal p-6 transition-colors hover:border-teal">
                <p className="kicker text-teal">{c.k}</p>
                <h2 className="display mt-3 text-3xl text-white">{c.t}</h2>
                <p className="mt-3 text-ash">{c.p}</p>
                <p className="mt-5 font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-[0.08em] text-chalk group-hover:text-teal">
                  Open &rarr;
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* THE MESSAGE, in the client's words. */}
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal className="max-w-3xl">
            <p className="kicker text-teal">The message</p>
            <p className="display mt-3 text-4xl text-white sm:text-5xl">
              The message isn&rsquo;t &ldquo;men are bad.&rdquo; The message is that good men have a responsibility to
              act.
            </p>
            <p className="mt-6 text-lg text-chalk">
              Silence isn&rsquo;t brotherhood. Sometimes being a good friend means stopping your friend. Sometimes doing
              what&rsquo;s right means you have to ruin the party.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SHOP. */}
      <section className="border-t border-chalk/10 bg-coal">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-14 sm:px-6">
          <div>
            <p className="kicker text-teal">Wear it</p>
            <h2 className="display mt-2 text-4xl text-white">Start the conversation without saying anything.</h2>
            <p className="mt-3 max-w-xl text-ash">Shirts, hoodies, hats, wristbands, stickers. The hashtag on the front, nothing preachy on the back.</p>
          </div>
          <Link href="/shop" className="btn btn-teal">
            The shop
          </Link>
        </div>
      </section>
    </>
  );
}
