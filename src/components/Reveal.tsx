"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Items that share a queue go off one after another, in document order,
 * never together, however many of them are in view at once. Each item has
 * its own IntersectionObserver and the browser does not promise to run
 * their callbacks in page order (it ran the refrain 1, 3, 4, 2), so the
 * waiting list is sorted by position every time something joins it.
 */
type Waiting = { el: Element; show: () => void };
type Queue = { next: number; waiting: Waiting[]; timer?: number };
const queues = new Map<string, Queue>();

function enqueue(name: string, gap: number, item: Waiting) {
  const q = queues.get(name) ?? { next: 0, waiting: [] };
  queues.set(name, q);
  q.waiting.push(item);
  q.waiting.sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
  pump(q, gap);
}
function dequeue(name: string, el: Element) {
  const q = queues.get(name);
  if (q) q.waiting = q.waiting.filter((w) => w.el !== el);
}
/** Show the first item waiting at its slot: now, or a beat after the last one, whichever is later. */
function pump(q: Queue, gap: number) {
  if (q.timer !== undefined || q.waiting.length === 0) return;
  const now = performance.now();
  q.timer = window.setTimeout(
    () => {
      q.timer = undefined;
      const item = q.waiting.shift();
      if (item) {
        item.show();
        q.next = performance.now() + gap;
      }
      pump(q, gap);
    },
    Math.max(0, q.next - now),
  );
}

/**
 * Fade and rise on scroll into view, once. IntersectionObserver rather than
 * a scroll handler so it costs nothing on the main thread.
 *
 * Content is visible by default in CSS and only hidden once JS has flagged
 * the document, so no-JS visitors and crawlers always see everything.
 * prefers-reduced-motion disables it entirely, in globals.css.
 */
export default function Reveal({
  children,
  delay = 0,
  queue,
  gap = 1100,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  /** Stagger, in ms. Keep under ~240 or it starts to feel slow. */
  delay?: number;
  /**
   * Items sharing a queue name show in the order they come into view and
   * at least `gap` ms apart. For a list that is read line by line, like
   * the home page refrain: three lines fit in a desktop viewport and all
   * five in a phone's, so without this they all went off at once and the
   * chant was over before the reader reached its second line.
   */
  queue?: string;
  gap?: number;
  as?: "div" | "section" | "li" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // An old browser. Reveal by writing the attribute directly; it is a DOM
      // write rather than a state write, so nothing re-renders.
      el.setAttribute("data-shown", "");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (queue) enqueue(queue, gap, { el, show: () => setShown(true) });
        else setShown(true);
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (queue) dequeue(queue, el);
    };
  }, [queue, gap]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal=""
      data-shown={shown ? "" : undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
