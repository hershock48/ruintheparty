import { moves } from "@/data/site";
import Reveal from "@/components/Reveal";

/**
 * The four moves from the client's boards, numbered 01 to 04 in the big
 * teal condensed figures the rest of the site counts with. The first
 * version drew them as thin outline icons (an eye, a speech bubble, a
 * shield, two heads), which is the training-seminar language the brief
 * rules out. Numbers in the display face are the streetwear version.
 */
export default function Moves({ light = false }: { light?: boolean }) {
  return (
    <ul className="grid gap-px overflow-hidden bg-chalk/15 sm:grid-cols-2 lg:grid-cols-4">
      {moves.map((m, i) => (
        <Reveal as="li" key={m.key} delay={i * 90} className={`${light ? "bg-paper text-ink" : "bg-black text-chalk"} p-6`}>
          <p className={`font-[family-name:var(--font-display)] text-5xl font-extrabold leading-none ${light ? "text-teal-ink" : "text-teal"}`} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="display mt-4 text-3xl">{m.title}</h3>
          <p className={`mt-2 text-base ${light ? "text-smoke" : "text-ash"}`}>{m.text}</p>
        </Reveal>
      ))}
    </ul>
  );
}
