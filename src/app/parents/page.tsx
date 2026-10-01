import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { topics } from "@/data/parents";

export const metadata: Metadata = {
  title: "For parents raising boys",
  description:
    "Nine conversations to have with a son about consent, respect, sex, porn, alcohol, peer pressure, relationships, masculinity and speaking up, each with a first sentence you can actually say.",
  alternates: { canonical: "/parents" },
};

export default function ParentsPage() {
  return (
    <>
      <PageHero
        kicker="For parents"
        title="He is going to be in the room. Make sure he knows what to do."
        lead="Raising a boy who would never hurt anyone is half the job. The other half is raising one who stops his friend. These are the nine conversations, each with a way to start it."
      />

      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <ol className="grid gap-px bg-chalk/15 md:grid-cols-2">
            {topics.map((t, i) => (
              <Reveal as="li" key={t.key} delay={(i % 2) * 90} className="bg-black p-6 md:p-8">
                <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-teal">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="display mt-1 text-3xl text-white md:text-4xl">{t.title}</h2>
                <p className="mt-3 text-ash">{t.why}</p>
                <p className="kicker mt-5 text-chalk">A way to start</p>
                <ul className="mt-2 space-y-2">
                  {t.start.map((s) => (
                    <li key={s} className="border-l-4 border-teal pl-4 text-lg text-chalk">
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
          <Reveal>
            <p className="kicker text-teal-ink">How to have any of them</p>
            <ul className="mt-4 space-y-4 text-lg">
              <li>
                <strong>In the car.</strong> Side by side, no eye contact, a natural end point. Every parent who has done this
                says the same thing.
              </li>
              <li>
                <strong>Short.</strong> Two minutes, then let it go. You are not closing the subject, you are opening it.
              </li>
              <li>
                <strong>Say what you expect, then take questions.</strong> He does not need a lecture on what he already
                knows is wrong. He needs to hear that you know he will be in the room, and what you expect him to do there.
              </li>
              <li>
                <strong>Back him in advance.</strong> &ldquo;If you ever have to ruin the party, I&rsquo;ve got you.&rdquo; Say it
                before he needs it.
              </li>
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <p className="kicker text-teal-ink">People who have done this longer than we have</p>
            <ul className="mt-4 space-y-4 text-lg">
              <li>
                <a href="https://www.acalltomen.org/" className="link" target="_blank" rel="noopener noreferrer">
                  A Call to Men
                </a>{" "}
                on healthy manhood and the Man Box, the list of things boys are told a man is not allowed to be.
              </li>
              <li>
                <a href="https://www.loveisrespect.org/" className="link" target="_blank" rel="noopener noreferrer">
                  love is respect
                </a>{" "}
                for the relationship conversations, written for 14 to 24 year olds, with a line they can call or text
                themselves.
              </li>
              <li>
                <a href="https://rainn.org/safety-students" className="link" target="_blank" rel="noopener noreferrer">
                  RAINN&rsquo;s page for students
                </a>{" "}
                and parents, from middle school through college.
              </li>
            </ul>
            <Link href="/resources" className="btn btn-ink mt-8">
              All the resources
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
