import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/shop";
import { SHOP_LIVE } from "@/data/site";

export const metadata: Metadata = {
  title: "Shop",
  description: "Ruin the Party shirts, hoodies, hats, wristbands and stickers. The hashtag on the front. Wearing it starts the conversation.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <PageHero kicker="Shop" title="Wear the phrase." lead="Bold, simple, black. Nothing that looks like a fundraiser. Wearing it is how the phrase ends up standing on its own.">
        {!SHOP_LIVE ? (
          <p className="mt-6 inline-block border border-chalk/30 px-4 py-3 text-sm text-chalk">
            The store is built and not open yet. Prices shown are sample prices until Ruin the Party sets its own, and the
            buy button says so instead of taking a card.
          </p>
        ) : null}
      </PageHero>
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 3) * 80}>
                <ProductCard p={p} priority={i === 0} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
