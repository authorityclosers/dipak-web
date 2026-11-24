import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/structured-data";

export default function robots(): MetadataRoute.Robots {
  // The preview build (SITE_ENV=preview) must never be crawled.
  if (process.env.SITE_ENV === "preview") {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/tools/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
