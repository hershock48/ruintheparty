import { moves } from "@/data/site";
import Reveal from "@/components/Reveal";

/**
 * The four moves from the client's boards, with the four icons drawn as
 * plain strokes in the boards' own line weight. Width and height are stated
 * on every SVG, derived from the viewBox (glaze.md: Safari falls back to
 * 150px without them).
 */
const icons: Record<(typeof moves)[number]["key"], React.ReactNode> = {
  see: (
    <>
      <path d="M2 20c5-8 11-12 18-12s13 4 18 12c-5 8-11 12-18 12S7 28 2 20Z" />
      <circle cx="20" cy="20" r="5" />
    </>
  ),
  say: (
    <>
      <path d="M6 8h28a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H18l-8 7v-7H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z" />
      <path d="M12 15h16M12 21h10" />
    </>
  ),
  step: (
    <>
      <path d="M20 4 6 9v9c0 9 6 15 14 18 8-3 14-9 14-18V9L20 4Z" />
      <path d="m13 20 5 5 9-10" />
    </>
  ),
  better: (
    <>
      <circle cx="14" cy="13" r="5" />
      <circle cx="27" cy="13" r="5" />
      <path d="M3 33c1-7 5-11 11-11s10 4 11 11M23 25c1-2 3-3 4-3 6 0 10 4 11 11" />
    </>
  ),
};

export default function Moves({ light = false }: { light?: boolean }) {
  return (
    <ul className="grid gap-px overflow-hidden bg-chalk/15 sm:grid-cols-2 lg:grid-cols-4">
      {moves.map((m, i) => (
        <Reveal as="li" key={m.key} delay={i * 90} className={`${light ? "bg-paper text-ink" : "bg-black text-chalk"} p-6`}>
          <svg
            viewBox="0 0 40 40"
            width="40"
            height="40"
            aria-hidden="true"
            className={`${light ? "text-teal-ink" : "text-teal"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {icons[m.key]}
          </svg>
          <h3 className="display mt-4 text-3xl">{m.title}</h3>
          <p className={`mt-2 text-base ${light ? "text-smoke" : "text-ash"}`}>{m.text}</p>
        </Reveal>
      ))}
    </ul>
  );
}
