import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import Image from "next/image";
import Mark from "@/components/Mark";
import Moves from "@/components/Moves";
import Reveal from "@/components/Reveal";
import { refrain, site } from "@/data/site";
import { products } from "@/data/shop";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = pageMeta({
  title: `${site.name} | Be the man who ruins the party`,
  description:
    "When something isn't right, say something. When your friend crosses the line, stop him. Ruin the Party talks to young men about consent and stepping in.",
  path: "/",
  fullTitle: true,
});

export default function HomePage() {
  return (
    <>
      {/*
        HERO. The client's opening, word for word from the brief.

        Grit, two ways, neither of them a stock effect: film grain over the
        black (.grain), and the hash from their own mark, huge, cropped off
        the top right corner behind everything at low opacity. It is the
        brand doing the decorating. aria-hidden, pointer-events none, and
        contained by overflow-hidden so it can never widen the page.

        On phones the mark comes FIRST (order-first below md), a third
        shorter than on desktop, so the brand is the first thing on the
        screen and the headline still lands inside the first viewport.
      */}
      <section className="grain relative overflow-hidden border-b border-chalk/10 bg-black">
        <div className="pointer-events-none absolute -right-[14%] -top-[18%] w-[72%] opacity-[0.11] md:-right-[6%] md:-top-[28%] md:w-[46%]" aria-hidden="true">
          <Image src="/brand/hash.png" alt="" width={567} height={766} sizes="480px" className="h-auto w-full rotate-[8deg]" />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-16 pt-8 sm:px-6 md:grid-cols-[1fr_0.9fr] md:gap-10 md:pb-24 md:pt-20">
          <div className="order-first mx-auto w-full max-w-[280px] md:order-last md:max-w-none">
            <Mark hero priority className="w-full" />
          </div>
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
            {/* One button. "Why this exists" was the weaker of two and the
                mark beside it does that job; What it means is one tap away
                in the nav and the cards below. */}
            <div className="mt-8">
              <Link href="/be-the-guy" className="btn btn-teal">
                Be the guy
              </Link>
            </div>
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

      {/*
        THE REFRAIN. The one place on the site the line repeats, on purpose,
        and the signature piece of the page: each setup in big condensed
        caps, the answer stamping in a beat later, the lines alternating
        left and right down the page like a chant. The stamp's motion is in
        globals.css (.stamp); the li reveals through Reveal.
      */}
      <section className="grain overflow-hidden border-b border-chalk/10 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <ul className="space-y-10 md:space-y-14">
            {refrain.map((r, i) => (
              <Reveal as="li" key={r.setup} delay={60} className={i % 2 ? "md:text-right" : ""}>
                <p className={`display max-w-4xl text-3xl text-white sm:text-4xl md:text-5xl ${i % 2 ? "md:ml-auto" : ""}`}>{r.setup}</p>
                <p className="stamp display mt-3 text-4xl text-teal sm:text-5xl md:text-6xl">{"answer" in r ? r.answer : "Ruin the party."}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/*
        THE HASHTAG BAND. The phrase has to stand on its own, and nothing
        else on the page asks anyone to say it. Six copies on the track (an even count, so the two halves match);
        the width budget is in globals.css (.ticker). aria-hidden on the
        moving line, the sentence under it carries the meaning.
      */}
      <section className="border-b border-chalk/10 bg-black py-8 md:py-10">
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="display inline-block pr-10 text-6xl text-teal md:text-7xl">
                {site.hashtag.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        <p className="mx-auto mt-5 max-w-6xl px-4 text-chalk sm:px-6 md:text-lg">
          Post it. Wear it. Say it out loud. The phrase only works if it gets used.
        </p>
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

      {/*
        WHO IT IS FOR. The one idea the old "message" block carried that
        nothing else on the page did, the responsibility to act, is the
        subhead here. The rest of that block repeated the hero and What it
        means, and it is gone (copy is counted).
      */}
      <section className="border-b border-chalk/10 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal>
            <p className="kicker text-teal">Who this is for</p>
            <h2 className="display mt-3 max-w-3xl text-4xl text-white sm:text-5xl">
              The message isn&rsquo;t that men are bad. It&rsquo;s that good men have a responsibility to act.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { href: "/be-the-guy", k: "For you", t: "Be the guy", p: "Real situations, what to say, what to do, and when to get somebody else." },
              { href: "/parents", k: "For parents", t: "Raising him", p: "Nine conversations, each with a first sentence you can actually say." },
              { href: "/teams", k: "For coaches and schools", t: "Bring it to your team", p: "A locker-room talk, a season plan, and the programs that already work." },
            ].map((c, i) => (
              <Reveal key={c.href} delay={i * 90}>
                <Link href={c.href} className="group block h-full border border-chalk/15 bg-coal p-6 transition-colors hover:border-teal">
                  <p className="kicker text-teal">{c.k}</p>
                  <h3 className="display mt-3 text-3xl text-white">{c.t}</h3>
                  <p className="mt-3 text-ash">{c.p}</p>
                  <p className="mt-5 font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-[0.08em] text-chalk group-hover:text-teal">
                    Open &rarr;
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP. Three of the tiles, the client's own photos, instead of a sentence. */}
      <section className="bg-coal">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="kicker text-teal">Wear it</p>
              <h2 className="display mt-2 text-4xl text-white">Start the conversation without saying anything.</h2>
            </div>
            <Link href="/shop" className="btn btn-teal">
              The shop
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-3">
            {products.slice(0, 3).map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 80}>
                <ProductCard p={p} sizes="(min-width: 640px) 30vw, 90vw" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
