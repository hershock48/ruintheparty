"use client";

import { useEffect, useRef, useState } from "react";

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
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  /** Stagger, in ms. Keep under ~240 or it starts to feel slow. */
  delay?: number;
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
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
