import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = pageMeta({
  title: "For coaches, teams and schools",
  description:
    "A locker-room talk you can give this week, a season plan that already has evidence behind it, and a way to bring Ruin the Party to your program.",
  path: "/teams",
});

export default function TeamsPage() {
  return (
    <>
      <PageHero
        kicker="For coaches, teams and schools"
        title="Your guys will listen to you before they listen to anyone."
        lead="A coach has the room that a parent, a teacher and a poster do not. Here is a talk for this week, a plan for the season, and how to get the materials."
      />

      <section className="bg-black">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <Reveal>
            <p className="kicker text-teal">The locker-room talk</p>
            <h2 className="display mt-3 text-4xl text-white">Four minutes. Before a party weekend.</h2>
            <ol className="mt-6 space-y-5 text-lg text-chalk">
              <li className="flex gap-4">
                <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-teal">1</span>
                <span>
                  <strong className="text-white">Name it.</strong> &ldquo;Some of you are going to be at a party this weekend
                  where a guy, maybe one of you, is about to do something to a girl who can&rsquo;t say no. I want to talk
                  about what you do.&rdquo;
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-teal">2</span>
                <span>
                  <strong className="text-white">The rule.</strong> &ldquo;If she can&rsquo;t stand up, she can&rsquo;t say yes.
                  If she said no, that&rsquo;s the end of it. If one of you is still going, the rest of you stop him. Not
                  later. Right there.&rdquo;
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-teal">3</span>
                <span>
                  <strong className="text-white">The cost.</strong> &ldquo;You will get called a buzzkill. Somebody will say
                  you ruined the party. Good. I would rather you ruin a party than let that happen on this team.&rdquo;
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-teal">4</span>
                <span>
                  <strong className="text-white">The backing.</strong> &ldquo;If you step in and it gets ugly, you call me. Any
                  hour. You will not be in trouble with me for doing the right thing. Ever.&rdquo;
                </span>
              </li>
            </ol>
            <p className="mt-6 text-ash">
              Then send them to{" "}
              <Link href="/be-the-guy" className="link">
                Be the guy
              </Link>
              , which has the words for the eight situations they will actually hit.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <p className="kicker text-teal">The season plan</p>
            <h2 className="display mt-3 text-4xl text-white">Use the one that has been tested.</h2>
            <p className="mt-4 text-chalk">
              <a href="https://coachescorner.org/" className="link" target="_blank" rel="noopener noreferrer">
                Coaching Boys Into Men
              </a>
              , from Futures Without Violence, is twelve fifteen-minute talks a coach has with his team over a season. The
              CDC funded a three-year evaluation of it, and athletes who went through it were significantly more likely to
              step in when they saw abusive or disrespectful behavior. The card series is free.
            </p>
            <p className="mt-4 text-chalk">
              We are not going to rebuild that. We are going to point every coach at it, and give you the shirts, the
              wristbands and the words so the message is on the bus and in the group chat when the talk is over.
            </p>
            <div className="mt-8 border border-chalk/20 p-5">
              <p className="kicker text-white">For athletic departments and schools</p>
              <p className="mt-2 text-chalk">
                <a href="https://itsonus.org/athletics-playbook/" className="link" target="_blank" rel="noopener noreferrer">
                  It&rsquo;s On Us has an athletics playbook
                </a>{" "}
                and student chapters on more than 500 campuses. If you are at a college, there may already be one on yours.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="bring-it" className="border-t border-chalk/10 bg-coal">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:py-20">
          <Reveal>
            <p className="kicker text-teal">Bring it to your team</p>
            <h2 className="display mt-3 text-4xl text-white">Tell us what you need.</h2>
            <p className="mt-4 text-chalk">
              Posters for the locker room. A box of wristbands. Somebody to come talk to the team. A version of this page
              for your program&rsquo;s site. Materials that organizations can hand straight to young men are the next thing
              Ruin the Party is building, and what you ask for here decides what gets built first.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ContactForm preset="Coach or teacher" topic="teams" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
