import { ViewTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/shop";
import { money } from "@/data/shop";

/**
 * A product tile: the photo, square, then name, line and price. The photos
 * are crops from the client's own boards (src/data/shop.ts says which),
 * which is the real thing we have; the line silhouettes the first version
 * drew are gone.
 */
/**
 * The photo carries a view-transition name shared with the product page's
 * photo, so following the link grows this tile into that page's picture
 * instead of cutting to it (see the product page and globals.css,
 * "THE PHOTO MORPH").
 *
 * `priority` preloads the photo: the first tile on /shop is the Largest
 * Contentful Paint element there, and a lazy image is discovered late.
 */
export default function ProductCard({
  p,
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw",
  priority = false,
  heading: Heading = "h3",
}: {
  p: Product;
  sizes?: string;
  priority?: boolean;
  /** h2 where the grid sits straight under the page's h1 (the shop); h3 under a section heading (home). */
  heading?: "h2" | "h3";
}) {
  return (
    <Link href={`/shop/${p.slug}`} className="group block border border-chalk/15 bg-coal transition-colors hover:border-teal">
      <ViewTransition name={`product-${p.slug}`} share="morph" default="none">
        <div className="relative aspect-square overflow-hidden bg-black">
          <Image src={p.photo} alt={p.photoAlt} width={800} height={800} sizes={sizes} priority={priority} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
      </ViewTransition>
      <div className="flex items-baseline justify-between gap-3 p-4">
        <div>
          <Heading className="display text-2xl text-white">{p.name}</Heading>
          <p className="mt-1 text-sm text-ash">{p.line}</p>
        </div>
        <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-teal">{money(p.priceCents)}</p>
      </div>
    </Link>
  );
}
