import Reveal from "@/components/Reveal";

/**
 * The top of every inner page: kicker, the big line, one paragraph, on the
 * home hero's own ground: the film grain and the hash from the mark, huge
 * and faint. Here it leans the other way and sits low on the right, so an
 * inner page reads as the same brand without repeating the home screen.
 * aria-hidden, pointer-events none, clipped by overflow-hidden so it can
 * never widen the page.
 *
 * It is a CSS background that only starts loading after the window's load
 * event (globals.css, .hero-ghost). As an <Image> it downloaded beside the
 * fonts the headline waits for, and on the throttled phone profile the
 * headline, which is the LCP element on these pages, painted about 350ms
 * later. The grain waits for the same event here (.grain-late).
 */
export default function PageHero({
  kicker,
  title,
  lead,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="grain grain-late relative overflow-hidden border-b border-chalk/10 bg-black">
      <div className="hero-ghost pointer-events-none absolute -bottom-[38%] -right-[22%] w-[78%] -rotate-[10deg] md:-bottom-[70%] md:-right-[4%] md:w-[38%]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 md:pt-24">
        <Reveal>
          <p className="kicker text-teal">{kicker}</p>
          <h1 className="display mt-3 max-w-4xl text-[2.9rem] text-white sm:text-6xl md:text-7xl">{title}</h1>
          <span className="rule mt-6" aria-hidden="true" />
          {lead ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-chalk md:text-xl">{lead}</p> : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
