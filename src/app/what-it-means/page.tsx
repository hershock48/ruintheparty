import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "What does Ruin the Party mean?",
  description:
    "For generations the safety talk went to women. Ruin the Party talks to men, and to the good men who stay quiet when another man crosses the line.",
  alternates: { canonical: "/what-it-means" },
};

/**
 * The story and the philosophy. This page is the client's brief, kept in
 * their own words wherever the words were already right (glaze/proposal.md:
 * their real copy where it is already good).
 */
export default function WhatItMeansPage() {
  return (
    <>
      <PageHero
        kicker="What it means"
        title="Sometimes doing the right thing means being willing to ruin the party."
        lead="Ruin the Party is a movement about the safety of women that talks directly to men, especially young men."
      />

      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <p className="kicker text-teal">For generations</p>
              <h2 className="display mt-3 text-4xl text-white">The responsibility was put on women.</h2>
              <ul className="mt-6 space-y-2 text-xl text-chalk">
                <li>Be careful.</li>
                <li>Don&rsquo;t walk alone.</li>
                <li>Watch your drink.</li>
                <li>Don&rsquo;t dress a certain way.</li>
                <li>Text when you get home.</li>
                <li>Don&rsquo;t put yourself in a bad situation.</li>
              </ul>
              <p className="mt-6 text-ash">Those conversations may still have value. They aren&rsquo;t enough.</p>
            </Reveal>
            <Reveal delay={120}>
              <p className="kicker text-teal">So</p>
              <h2 className="display mt-3 text-4xl text-white">We talk to men about how men are expected to act.</h2>
              <p className="mt-6 text-lg text-chalk">
                And we teach good men that doing nothing when another man crosses the line isn&rsquo;t enough.
              </p>
              <p className="mt-4 text-lg text-chalk">That&rsquo;s what Ruin the Party means. It means being the guy who:</p>
              <ul className="mt-5 space-y-3 border-l-4 border-teal pl-5 text-lg text-chalk">
                <li>speaks up when everyone else stays quiet.</li>
                <li>
                  tells his friend: <span className="font-semibold text-white">&ldquo;No. This ends right now.&rdquo;</span>
                </li>
                <li>notices that someone is too intoxicated to consent.</li>
                <li>doesn&rsquo;t laugh at the joke.</li>
                <li>steps between someone vulnerable and someone taking advantage of them.</li>
                <li>gets a woman safely out of a situation.</li>
                <li>
                  is willing to be called dramatic, a buzzkill, a snitch, or worse, because protecting another human being
                  matters more than fitting in.
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-teal text-black">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <Reveal>
            <p className="display max-w-4xl text-4xl sm:text-5xl md:text-6xl">Standing up isn&rsquo;t weakness. It&rsquo;s courage.</p>
          </Reveal>
        </div>
      </section>

      {/* THE NUMBERS, once, with the link, and nowhere else on the site. A
          site that shouts statistics at a nineteen-year-old is the seminar
          the brief says not to build. Source: RAINN's campus page, reporting
          the 2019 AAU Campus Climate Survey; read October 1, 2026. */}
      <section className="border-b border-chalk/10 bg-coal">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <Reveal>
            <p className="kicker text-teal">The numbers, once</p>
            <dl className="mt-5 grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="display text-6xl text-white">13%</dt>
                <dd className="mt-2 text-ash">of undergraduates experienced rape or sexual assault after enrolling in college.</dd>
              </div>
              <div>
                <dt className="display text-6xl text-white">1 in 4</dt>
                <dd className="mt-2 text-ash">undergraduate women, nonconsensual sexual contact by force or while unable to consent.</dd>
              </div>
              <div>
                <dt className="display text-6xl text-white">1 in 14</dt>
                <dd className="mt-2 text-ash">undergraduate men, the same. It happens to men too, and they talk about it less.</dd>
              </div>
            </dl>
            <p className="mt-5 text-sm text-ash">
              From{" "}
              <a href="https://rainn.org/facts-statistics-the-scope-of-the-problem/statistics-campus-sexual-violence/" className="link" target="_blank" rel="noopener noreferrer">
                RAINN&rsquo;s campus statistics
              </a>
              , reporting the 2019 Association of American Universities campus climate survey. The rest of this site has no
              statistics in it on purpose.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <p className="kicker text-teal">The core message</p>
              <p className="mt-4 text-xl text-chalk">
                Raising good men isn&rsquo;t simply teaching them not to hurt women. It&rsquo;s teaching them what to do when
                another man does, or is about to.
              </p>
              <ul className="mt-6 space-y-3 text-xl text-white">
                <li>Silence isn&rsquo;t brotherhood.</li>
                <li>Sometimes being a good friend means stopping your friend.</li>
                <li>Sometimes leadership means being the unpopular person in the room.</li>
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <p className="kicker text-teal">Who this is for</p>
              <p className="mt-4 text-xl text-chalk">Young men, and the men helping raise and influence them.</p>
              <p className="mt-4 text-lg text-ash">
                Teenagers. College students. Athletes. Coaches. Fathers. Brothers. Friends. Fraternities. Teams. Schools.
              </p>
              <p className="mt-6 text-lg text-chalk">
                The message isn&rsquo;t that men are bad. The message is that good men have a responsibility to act. We want
                men to feel able to step in, not attacked for being men.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 flex flex-wrap gap-3">
            <Link href="/be-the-guy" className="btn btn-teal">
              What to actually do
            </Link>
            <Link href="/know-the-line" className="btn btn-ghost">
              Know the line
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
