import Reveal from "@/components/Reveal";

/** The top of every inner page: kicker, the big line, one paragraph. */
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
    <section className="border-b border-chalk/10 bg-black">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 md:pt-24">
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
