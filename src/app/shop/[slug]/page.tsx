import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { Garment } from "@/components/ProductCard";
import { bySlug, money, products } from "@/data/shop";
import { SHOP_LIVE } from "@/data/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = bySlug((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name}, ${money(p.priceCents)}`,
    description: `${p.line} ${p.print}`,
    alternates: { canonical: `/shop/${p.slug}` },
  };
}

/**
 * One product. The buy form is a plain POST to /api/checkout with a slug
 * and a size, nothing else, so it works without JavaScript and cannot carry
 * a price. Sizes are real radios for the same reason.
 */
export default async function ProductPage({ params }: Params) {
  const p = bySlug((await params).slug);
  if (!p) notFound();
  const useHash = p.kind === "hat" || p.kind === "sticker";

  return (
    <section className="bg-black">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16">
        <Link href="/shop" className="link text-sm">
          &larr; Shop
        </Link>
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <Reveal className="relative flex aspect-square items-center justify-center border border-chalk/15 bg-coal">
            <Garment kind={p.kind} className="h-3/4 w-3/4 text-chalk/60" />
            <Image
              src={useHash ? "/brand/hash.png" : "/brand/mark.png"}
              alt=""
              width={useHash ? 567 : 1224}
              height={useHash ? 766 : 1140}
              sizes="160px"
              className={`absolute ${p.kind === "hat" ? "top-[38%] h-16 w-auto" : p.kind === "band" ? "h-12 w-auto" : p.kind === "sticker" ? "h-24 w-auto" : "h-24 w-auto"}`}
            />
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display text-5xl text-white md:text-6xl">{p.name}</h1>
            <p className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold text-teal">{money(p.priceCents)}</p>
            <p className="mt-4 text-lg text-chalk">{p.line}</p>
            <p className="mt-2 text-ash">{p.print}</p>

            <form action="/api/checkout" method="post" className="mt-8">
              <input type="hidden" name="slug" value={p.slug} />
              <fieldset>
                <legend className="kicker text-chalk">Size</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.sizes.map((s, i) => (
                    <label key={s} className="inline-flex min-h-12 min-w-12 cursor-pointer items-center justify-center border border-chalk/30 px-4 text-white has-checked:border-teal has-checked:bg-teal has-checked:text-black">
                      <input type="radio" name="size" value={s} defaultChecked={i === 0} className="sr-only" />
                      {s}
                    </label>
                  ))}
                </div>
              </fieldset>
              <button type="submit" className="btn btn-teal mt-6 w-full sm:w-auto">
                {SHOP_LIVE ? "Buy" : "Buy (store not open yet)"}
              </button>
              <p className="mt-3 text-sm text-ash">
                {SHOP_LIVE
                  ? "Checkout runs on Stripe. Ships in the US."
                  : "The store is built and switched off until Ruin the Party connects its own Stripe account. Nothing is charged."}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
