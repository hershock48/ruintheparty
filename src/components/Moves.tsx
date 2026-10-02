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
          {/*
            The figure ticks up from 0 to its number as the card arrives,
            like a counter rolling (Kevin, 2026-10-02: "have the numbers
            count up like a ticker"). A column of digits 0..n in a box one
            digit tall, translated up by n digits; the CSS (.odo) starts it
            at 0 and rolls it once the card is shown. Transform only, no
            timer, no animated CSS counter (WebKit freezes those). Without
            JS or under reduced motion the column sits on its number.
          */}
          <p className={`font-[family-name:var(--font-display)] text-5xl font-extrabold leading-none ${light ? "text-teal-ink" : "text-teal"}`} aria-hidden="true">
            0
            <span className="odo">
              <span className="odo-col" style={{ "--n": i + 1 } as React.CSSProperties}>
                {Array.from({ length: i + 2 }, (_, d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          </p>
          <h3 className="display mt-4 text-3xl">{m.title}</h3>
          <p className={`mt-2 text-base ${light ? "text-smoke" : "text-ash"}`}>{m.text}</p>
        </Reveal>
      ))}
    </ul>
  );
}
