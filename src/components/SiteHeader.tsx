"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/site";

/**
 * Sticky black bar. The mark in the corner is the client's own, at header
 * size. The home link's destination is resolved from the hostname at render
 * time on the client: on the pitch host "/" is the proposal, not the site,
 * so a logo linking to "/" would throw the client out of their own demo and
 * back into the sales document (glaze.md). The server renders "/" and the
 * effect corrects it; the pattern mirrors the rewrite in next.config.ts.
 */
const subscribeNever = () => () => {};
const getHomeServer = () => "/";
const getHomeClient = () => (/\.glazedweb\.com$/.test(window.location.hostname) ? "/demo" : "/");

export default function SiteHeader() {
  const pathname = usePathname();
  const ref = useRef<HTMLElement | null>(null);
  /*
    The menu is "open for this path": navigating closes it without an effect
    that sets state (the lint rule react-hooks/set-state-in-effect), because
    a menu left open across a navigation hides the page you arrived at.
  */
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  /* The home link's destination, read from the hostname. The server snapshot
     is "/" so markup matches on hydration; the client snapshot corrects it on
     the pitch host. */
  const home = useSyncExternalStore(subscribeNever, getHomeClient, getHomeServer);

  /* Publish the measured header height so anchor offsets stay honest. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <header ref={ref} className="sticky top-0 z-40 border-b border-chalk/10 bg-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link href={home} className="tap flex items-center" aria-label={`${site.name} home`}>
          <Image src="/brand/mark.png" alt="" width={1224} height={1140} sizes="48px" className="h-11 w-auto" priority />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href || pathname.startsWith(`${l.href}/`) ? "page" : undefined}
              className="tap font-[family-name:var(--font-display)] text-[1.05rem] font-bold uppercase tracking-[0.08em] text-chalk hover:text-teal aria-[current=page]:text-teal"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-teal !min-h-10 !px-4 !py-2 !text-[0.95rem]">
            Get involved
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpenAt(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="tap font-[family-name:var(--font-display)] px-3 py-2 text-base font-bold uppercase tracking-[0.1em] text-white lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main menu"
        className={`${open ? "block" : "hidden"} border-t border-chalk/10 bg-black px-4 pb-5 pt-2 sm:px-6 lg:hidden`}
      >
        <ul>
          {nav.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href || pathname.startsWith(`${l.href}/`) ? "page" : undefined}
                className="font-[family-name:var(--font-display)] block w-full py-2.5 text-xl font-bold uppercase tracking-[0.06em] text-chalk aria-[current=page]:text-teal"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="btn btn-teal mt-3 w-full">
          Get involved
        </Link>
      </nav>
    </header>
  );
}
