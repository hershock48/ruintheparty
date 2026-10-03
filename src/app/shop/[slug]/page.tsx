import type { Metadata } from "next";
import { ViewTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { PREORDER, bySlug, givingLine, money, products } from "@/data/shop";
import { SHOP_LIVE } from "@/data/site";
import { pageMeta } from "@/lib/meta";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = bySlug((await params).slug);
  if (!p) return {};
  return pageMeta({ title: `${p.name}, ${money(p.priceCents)}`, description: `${p.line} ${p.print}`, path: `/shop/${p.slug}` });
}

/**
 * One product. The buy form is a plain POST to /api/checkout with a slug
 * and a size, nothing else, so it works without JavaScript and cannot carry
 * a price. Sizes are real radios for the same reason. The photo is the
 * client's own (a crop from his boards, see src/data/shop.ts).
 *
 * The photo is the other half of the tile's view-transition pair, so it
 * grows out of the tile that was tapped. It is deliberately NOT inside a
 * Reveal: a reveal starts at opacity 0, and the morph would land on an
 * invisible picture and then fade it in a second time.
 */
export default async function ProductPage({ params }: Params) {
  const p = bySlug((await params).slug);
  if (!p) notFound();

  return (
    <section className="bg-black">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16">
        <Link href="/shop" className="link text-sm">
          &larr; Shop
        </Link>
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <ViewTransition name={`product-${p.slug}`} share="morph" default="none">
            <div className="relative aspect-square overflow-hidden border border-chalk/15 bg-black">
              <Image src={p.photo} alt={p.photoAlt} width={800} height={800} priority sizes="(min-width: 768px) 48vw, 92vw" className="h-full w-full object-cover" />
            </div>
          </ViewTransition>
          <Reveal delay={100}>
            <h1 className="display text-5xl text-white md:text-6xl">{p.name}</h1>
            <p className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold text-teal">{money(p.priceCents)}</p>
            <p className="mt-2 text-sm text-chalk">{givingLine()}</p>
            <p className="mt-4 text-lg text-chalk">{p.line}</p>
            <p className="mt-2 text-ash">{p.print}</p>

            <form action="/api/checkout" method="post" className="mt-8">
              <input type="hidden" name="slug" value={p.slug} />
              <fieldset>
                <legend className="kicker text-chalk">Size</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.sizes.map((s, i) => (
                    <label key={s} className="inline-flex min-h-12 min-w-12 cursor-pointer items-center justify-center border border-chalk/30 px-4 text-white has-checked:border-teal has-checked:bg-teal has-checked:text-black has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-teal">
                      <input type="radio" name="size" value={s} defaultChecked={i === 0} className="sr-only" />
                      {s}
                    </label>
                  ))}
                </div>
              </fieldset>
              <button type="submit" className="btn btn-teal mt-6 w-full sm:w-auto">
                {!SHOP_LIVE ? "Buy (store not open yet)" : PREORDER.on ? "Pre-order" : "Buy"}
              </button>
              <p className="mt-3 text-sm text-ash">
                {!SHOP_LIVE
                  ? "The store is built and switched off until Ruin the Party connects its own Stripe account. Nothing is charged."
                  : PREORDER.on
                    ? `This is a pre-order. The first run ships ${PREORDER.ships}, in the US. Checkout runs on Stripe.`
                    : "Checkout runs on Stripe. Ships in the US."}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
