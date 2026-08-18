import { HomeIntroStory } from "@/features/home-intro-story";
import { SiteFooter } from "@/features/site-chrome";
import { getAllArticles } from "@/lib/articles";
import type { FeaturedArticle } from "@/features/dipak-thinking/thinking.types";

export default function HomePage() {
  // Read the article store here (server) and hand it to the client story
  // component — HomeIntroStory is "use client" for GSAP and cannot touch fs.
  const latestArticles: FeaturedArticle[] = getAllArticles()
    .slice(0, 3)
    .map((article, index) => ({
      id: article.slug,
      number: String(index + 1).padStart(2, "0"),
      title: article.title,
      category: article.category.toUpperCase(),
      series: article.series,
      readTime: article.readTime,
      abstract: article.excerpt,
      url: `/articles/${article.slug}`,
    }));

  return (
    <>
      <main id="main">
        <HomeIntroStory latestArticles={latestArticles} />
      </main>
      <SiteFooter />
    </>
  );
}
