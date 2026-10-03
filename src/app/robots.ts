import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Open since launch (2026-10-03). The copy on the pitch host is kept out
 * of search by the host-scoped X-Robots-Tag in next.config.ts, because a
 * robots.txt cannot tell one host from another.
 */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
