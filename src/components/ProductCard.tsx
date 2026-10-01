import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/shop";
import { money } from "@/data/shop";

/**
 * A product tile. There is no photography yet, so the tile is the garment's
 * silhouette with the real mark on it, which is honest about what exists
 * and still looks like a shop. The silhouettes are furniture, not the mark;
 * the mark is the client's file (brand/mark.png and brand/hash.png).
 */
export function Garment({ kind, className = "" }: { kind: Product["kind"]; className?: string }) {
  const shape: Record<Product["kind"], React.ReactNode> = {
    tee: <path d="M40 22 60 12l16 10 4 8 16 8-10 22-10-4v64H44V56l-10 4L24 38l16-8 0-8Z" />,
    hoodie: (
      <>
        <path d="M46 20c4-8 24-8 28 0l8 6 18 8-9 23-9-3v66H38V54l-9 3-9-23 18-8 8-6Z" />
        <path d="M50 20c2 10 18 10 20 0M60 68v26" />
      </>
    ),
    hat: (
      <>
        <path d="M22 72c0-28 16-44 38-44s38 16 38 44H22Z" />
        <path d="M22 72c-10 0-16 2-16 6s10 8 54 8h44c6 0 12-2 12-6s-6-8-18-8H22Z" />
      </>
    ),
    band: (
      <>
        <ellipse cx="60" cy="60" rx="44" ry="30" />
        <ellipse cx="60" cy="60" rx="30" ry="18" />
      </>
    ),
    sticker: (
      <>
        <rect x="20" y="24" width="80" height="72" rx="8" />
        <path d="M78 96c0-14 8-22 22-22" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
      {shape[kind]}
    </svg>
  );
}

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/shop/${p.slug}`} className="group block border border-chalk/15 bg-coal transition-colors hover:border-teal">
      <div className="relative flex aspect-square items-center justify-center bg-black">
        <Garment kind={p.kind} className="h-3/4 w-3/4 text-chalk/60 transition-colors group-hover:text-chalk" />
        <Image
          src={p.kind === "hat" || p.kind === "sticker" ? "/brand/hash.png" : "/brand/mark.png"}
          alt=""
          width={p.kind === "hat" || p.kind === "sticker" ? 567 : 1224}
          height={p.kind === "hat" || p.kind === "sticker" ? 766 : 1140}
          sizes="96px"
          className={`absolute ${p.kind === "hat" ? "h-10 w-auto top-[38%]" : p.kind === "band" ? "h-8 w-auto" : p.kind === "sticker" ? "h-16 w-auto" : "h-14 w-auto"}`}
        />
      </div>
      <div className="flex items-baseline justify-between gap-3 p-4">
        <div>
          <h3 className="display text-2xl text-white">{p.name}</h3>
          <p className="mt-1 text-sm text-ash">{p.line}</p>
        </div>
        <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-teal">{money(p.priceCents)}</p>
      </div>
    </Link>
  );
}
