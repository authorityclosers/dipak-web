import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/structured-data";

export default function sitemap(): MetadataRoute.Sitemap {
  // Single unified source — blog is merged into articles
  const articles = getAllArticles();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/articles`,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/resources`,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/connect`,
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/contact`,
      priority: 0.8,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.date),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...articleRoutes];
}
