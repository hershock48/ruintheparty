import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/shop";
import { SHOP_LIVE } from "@/data/site";
import { PREORDER, givingLine } from "@/data/shop";

export const metadata: Metadata = pageMeta({
  title: "Shop",
  description: "Ruin the Party shirts, hoodies, hats, wristbands and bottles. The hashtag on the front. Wearing it starts the conversation.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <>
      <PageHero kicker="Shop" title="Wear the phrase." lead={`Bold, simple, black. Nothing that looks like a fundraiser. Wearing it is how the phrase ends up standing on its own. ${givingLine()}`}>
        {!SHOP_LIVE ? (
          <p className="mt-6 inline-block border border-chalk/30 px-4 py-3 text-sm text-chalk">
            The store is built and not open yet. Prices shown are sample prices until Ruin the Party sets its own, and the
            buy button says so instead of taking a card.
          </p>
        ) : PREORDER.on ? (
          <div className="mt-6 inline-block border border-teal/40 px-5 py-4">
            <p className="kicker text-teal">Pre-orders open</p>
            <p className="mt-1 max-w-xl text-chalk">
              This is the first run. Order now and you are in at the start, before anyone has one. Everything ships{" "}
              {PREORDER.ships}, and you will get an email when it does.
            </p>
          </div>
        ) : null}
      </PageHero>
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 3) * 80}>
                <ProductCard p={p} priority={i === 0} heading="h2" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
