import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllArticleSlugs,
  getAllArticles,
  getArticleBySlug,
  formatArticleDate,
} from "@/lib/articles";
import { authorityClosersCta } from "@/features/site-chrome";
import { ProseBody } from "@/features/editorial";
import editorial from "@/features/editorial/editorial.module.css";
import styles from "../articles.module.css";
import { PERSON_ID, SITE_URL } from "@/lib/structured-data";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return { title: "Article not found" };

  const canonicalUrl = `${SITE_URL}/articles/${article.slug}`;
  const seoTitle = `${article.displayTitle} | Dipak Vishwakarma`;
  const seoDescription = article.excerpt;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.updatedAt || article.date,
      authors: [`${SITE_URL}/about`],
      siteName: "Dipak Vishwakarma",
      images: [
        {
          url: article.coverImage || "/social/dipak-og-default-1200x630.jpg",
          width: 1200,
          height: 630,
          alt: `${article.title} — Dipak Vishwakarma`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [article.coverImage || "/social/dipak-og-default-1200x630.jpg"],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  // "More thinking" — up to three other posts, newest first.
  const related = getAllArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .slice(0, 3);

  const articleUrl = `${SITE_URL}/articles/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${articleUrl}#article`,
        headline: article.displayTitle,
        description: article.excerpt,
        datePublished: article.date,
        dateModified: article.updatedAt || article.date,
        inLanguage: "en",
        ...(article.tags?.length ? { keywords: article.tags.join(", ") } : { keywords: article.category }),
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
        image: article.coverImage
          ? `${SITE_URL}${article.coverImage}`
          : `${SITE_URL}/social/dipak-og-default-1200x630.jpg`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Articles",
            item: `${SITE_URL}/articles`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.displayTitle,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <article className={styles.post}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className={styles.postHeader}>
        <div className={editorial.containerNarrow}>
          <Link href="/articles" className={styles.backLink}>
            <span aria-hidden="true">←</span> All Articles
          </Link>

          <div className={styles.postMeta}>
            {article.series ? (
              <span className={styles.series}>{article.series}</span>
            ) : null}
            <span className={styles.metaLine}>
              {article.category} · {article.readTime} ·{" "}
              <time dateTime={article.date}>
                {formatArticleDate(article.date)}
              </time>
            </span>
          </div>

          <h1 className={styles.postTitle}>{article.displayTitle}</h1>

          <div className={styles.bylineRow}>
            <Link href="/about" className={styles.bylineName}>
              By Dipak Vishwakarma
            </Link>
            <span className={styles.bylineSep}>·</span>
            <span className={styles.bylineRole}>High-Ticket Sales Coach &amp; Founder of Authority Closers</span>
          </div>

          {article.excerpt ? (
            <p className={styles.postStandfirst}>{article.excerpt}</p>
          ) : null}

          <div className={styles.postRule} aria-hidden="true" />
        </div>
      </header>

      <div className={editorial.containerNarrow}>
        <ProseBody
          className={styles.prose}
          html={article.html}
        />

        {/* Author Bio Box */}
        <section className={styles.authorBox} aria-label="About the Author">
          <div className={styles.authorBoxMeta}>
            <span className={styles.authorBoxLabel}>ABOUT THE AUTHOR</span>
            <h3 className={styles.authorBoxName}>
              <Link href="/about" className={styles.bylineName}>
                Dipak Vishwakarma
              </Link>
            </h3>
            <p className={styles.authorBoxRole}>High-Ticket Sales Coach &amp; Founder of Authority Closers</p>
          </div>
          <p className={styles.authorBoxBio}>
            Dipak Vishwakarma works across sales education, buyer psychology, communication, and high-ticket deal architecture, developing practical frameworks that help founders and sales professionals replace pressure with certainty.
          </p>
          <div className={styles.authorSignatureWrap}>
            <Image
              src="/branding/dipak-signature-full-black.webp"
              alt="Dipak Vishwakarma Signature"
              width={200}
              height={84}
              className={styles.authorSignatureImg}
            />
          </div>
        </section>

        <aside className={styles.postCta}>
          <p className={styles.postCtaText}>
            Want structured sales learning and practice?
          </p>
          <a
            className={editorial.ctaPrimary}
            href={authorityClosersCta.href}
            target="_blank"
            rel="noopener noreferrer"
            data-ac-event={authorityClosersCta.event}
            data-ac-surface="article-footer"
          >
            {authorityClosersCta.label}
            <span aria-hidden="true">→</span>
          </a>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className={`${editorial.section} ${editorial.sectionSunken}`}>
          <div className={editorial.container}>
            <h2 className={styles.relatedHeading}>More thinking by Dipak Vishwakarma</h2>
            <ul className={styles.relatedGrid}>
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/articles/${item.slug}`} className={styles.relatedCard}>
                    <span className={styles.metaLine}>{item.category}</span>
                    <h3 className={styles.relatedTitle}>{item.title}</h3>
                    <span className={styles.metaLine}>{item.readTime}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  );
}
