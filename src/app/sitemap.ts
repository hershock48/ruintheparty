import type { MetadataRoute } from "next";
import { site, nav } from "@/data/site";
import { products } from "@/data/shop";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", ...nav.map((n) => n.href), "/contact", ...products.map((p) => `/shop/${p.slug}`)];
  return pages.map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
