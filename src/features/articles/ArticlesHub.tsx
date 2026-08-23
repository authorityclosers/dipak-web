"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import { formatArticleDate } from "@/lib/dates";
import styles from "./articles-hub.module.css";

interface ArticlesHubProps {
  articles: Article[];
}

export function ArticlesHub({ articles }: ArticlesHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique categories and counts
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach((a) => {
      const cat = a.category || "Sales";
      counts[cat] = (counts[cat] || 0) + 1;
    });

    const list = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return [
      { name: "All", count: articles.length },
      ...list.map(([name, count]) => ({ name, count })),
    ];
  }, [articles]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        article.displayTitle.toLowerCase().includes(query) ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        (article.tags && article.tags.some((t) => t.toLowerCase().includes(query)));

      return matchesCategory && matchesQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  // When viewing "All" and no search active, divide into Flagship, Grid, and Ledger
  const isDefaultView = selectedCategory === "All" && searchQuery.trim() === "";
  const flagshipArticle = isDefaultView ? filteredArticles[0] : null;
  const gridArticles = isDefaultView
    ? filteredArticles.slice(1, 7)
    : filteredArticles;
  const ledgerArticles = isDefaultView ? filteredArticles.slice(7) : [];

  return (
    <section className={styles.archiveSection} aria-label="Articles & Frameworks Archive">
      <div className={styles.atmosphereLayer} aria-hidden="true" />
      <div className={styles.ensoEcho} aria-hidden="true" />

      <div className={styles.archiveContainer}>
        {/* --- Header & Search -------------------------------------------- */}
        <header className={styles.heroHeader}>
          <div className={styles.heroLeft}>
            <p className={styles.sectionKicker}>
              [ 01 / ARCHIVE ] · STRATEGIC ESSAYS & FRAMEWORKS
            </p>
            <h1 className={styles.headline}>
              PRINCIPLES &<br />
              <span className={styles.headlineAccent}>FRAMEWORKS.</span>
            </h1>
          </div>

          <div className={styles.heroRight}>
            <p className={styles.heroStandfirst}>
              A library of {articles.length} tactical frameworks on buyer psychology,
              deal architecture, conversational leverage, and consultative authority —
              distilled by Dipak Vishwakarma.
            </p>

            <div className={styles.searchWrapper}>
              <svg
                className={styles.searchIcon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search frameworks, objections, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search articles"
              />
            </div>
          </div>
        </header>

        {/* --- Category Filter Ribbon ------------------------------------- */}
        <nav className={styles.filterRibbon} aria-label="Article categories">
          <div className={styles.filterPills}>
            {categoriesWithCounts.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`${styles.filterPill} ${isActive ? styles.filterPillActive : ""}`}
                >
                  {isActive && <span className={styles.filterDot} />}
                  <span>{cat.name}</span>
                  <span className={styles.filterCount}>({cat.count})</span>
                </button>
              );
            })}
          </div>

          <span className={styles.resultsMeta}>
            Showing {filteredArticles.length} of {articles.length} Frameworks
          </span>
        </nav>

        {/* --- Flagship Cover Spotlight (Only on default view) ------------ */}
        {flagshipArticle && (
          <section className={styles.flagshipSection} aria-label="Flagship Article">
            <article className={styles.flagshipCard}>
              <div className={styles.flagshipContent}>
                <div className={styles.flagshipTop}>
                  <div className={styles.flagshipBadgeRow}>
                    <span className={styles.flagshipTag}>
                      ★ FLAGSHIP ESSAY · {flagshipArticle.category}
                    </span>
                    <span className={styles.flagshipMeta}>
                      {formatArticleDate(flagshipArticle.date)} · {flagshipArticle.readTime}
                    </span>
                  </div>

                  <h2 className={styles.flagshipTitle}>
                    <Link
                      href={`/articles/${flagshipArticle.slug}`}
                      className={styles.flagshipTitleLink}
                    >
                      {flagshipArticle.displayTitle}
                    </Link>
                  </h2>

                  <p className={styles.flagshipExcerpt}>
                    {flagshipArticle.excerpt}
                  </p>
                </div>

                <div className={styles.flagshipBottom}>
                  <div className={styles.authorCredit}>
                    <div className={styles.authorAvatar}>
                      <Image
                        src="/media/dipak-vishwakarma-portrait-connect.webp"
                        alt="Dipak Vishwakarma"
                        width={80}
                        height={80}
                        className={styles.authorAvatarImg}
                      />
                    </div>
                    <div className={styles.authorDetails}>
                      <span className={styles.authorName}>Dipak Vishwakarma</span>
                      <span className={styles.authorRole}>Founder, Authority Closers</span>
                    </div>
                  </div>

                  <Link
                    href={`/articles/${flagshipArticle.slug}`}
                    className={styles.flagshipCta}
                  >
                    Read Analysis <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className={styles.flagshipMedia}>
                <Image
                  src={flagshipArticle.coverImage}
                  alt={flagshipArticle.displayTitle}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={styles.flagshipImage}
                />
                <span className={styles.mediaOverlayBadge}>
                  {flagshipArticle.readTime}
                </span>
              </div>
            </article>
          </section>
        )}

        {/* --- Primary Magazine Grid -------------------------------------- */}
        {gridArticles.length > 0 && (
          <section className={styles.gridSection} aria-label="Curated Frameworks">
            {isDefaultView && (
              <div className={styles.sectionSubheadRow}>
                <h3 className={styles.sectionSubheadTitle}>
                  CURATED STRATEGIC ESSAYS
                </h3>
                <span className={styles.resultsMeta}>
                  02 — 07 OF {articles.length}
                </span>
              </div>
            )}

            <div className={styles.articlesGrid}>
              {gridArticles.map((article, idx) => {
                const articleIndex = isDefaultView ? idx + 2 : idx + 1;
                return (
                  <article key={article.slug} className={styles.gridCard}>
                    <div className={styles.gridCardMedia}>
                      <Image
                        src={article.coverImage}
                        alt={article.displayTitle}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.gridCardImage}
                      />
                      <span className={styles.gridCardIndex}>
                        #{String(articleIndex).padStart(2, "0")}
                      </span>
                      <span className={styles.gridCardCategory}>
                        {article.category}
                      </span>
                    </div>

                    <div className={styles.gridCardBody}>
                      <div className={styles.gridCardTop}>
                        <h3 className={styles.gridCardTitle}>
                          <Link
                            href={`/articles/${article.slug}`}
                            className={styles.gridCardTitleLink}
                          >
                            {article.displayTitle}
                          </Link>
                        </h3>
                        <p className={styles.gridCardExcerpt}>
                          {article.excerpt}
                        </p>
                      </div>

                      <div className={styles.gridCardFooter}>
                        <span>{formatArticleDate(article.date)}</span>
                        <Link
                          href={`/articles/${article.slug}`}
                          className={styles.gridCardReadLink}
                        >
                          {article.readTime} <span aria-hidden="true">↗</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* --- Tactical Field Ledger (Dense list for remaining items) ----- */}
        {ledgerArticles.length > 0 && (
          <section className={styles.ledgerSection} aria-label="Strategic Field Notes">
            <div className={styles.sectionSubheadRow}>
              <h3 className={styles.sectionSubheadTitle}>
                TACTICAL FIELD NOTES & ESSAYS
              </h3>
              <span className={styles.resultsMeta}>
                08 — {articles.length} OF {articles.length}
              </span>
            </div>

            <div className={styles.ledgerList}>
              {ledgerArticles.map((article, idx) => {
                const ledgerIndex = idx + 8;
                return (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className={styles.ledgerRow}
                  >
                    <span className={styles.ledgerIndex}>
                      {String(ledgerIndex).padStart(2, "0")}
                    </span>
                    <span className={styles.ledgerCategory}>
                      {article.category}
                    </span>
                    <h4 className={styles.ledgerTitle}>
                      {article.displayTitle}
                    </h4>
                    <span className={styles.ledgerMeta}>
                      {formatArticleDate(article.date)} · {article.readTime}
                    </span>
                    <span className={styles.ledgerArrow} aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* --- Empty Search State ----------------------------------------- */}
        {filteredArticles.length === 0 && (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>No matching frameworks found</h3>
            <p className={styles.emptyText}>
              No articles matched your filter or search query &quot;{searchQuery}&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className={styles.resetBtn}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* --- Executive Advisory Invitation ------------------------------- */}
        <aside className={styles.advisoryBanner} aria-label="Executive Advisory">
          <div className={styles.advisoryLeft}>
            <span className={styles.advisoryKicker}>
              FOUNDER-LED SALES ADVISORY
            </span>
            <h3 className={styles.advisoryHeading}>
              Looking to eliminate pipeline doubt and scale deal velocity?
            </h3>
            <p className={styles.advisoryBody}>
              Dipak Vishwakarma advises B2B founders, sales teams, and executives
              on high-ticket consultative architecture, buyer certainty, and objection
              elimination.
            </p>
          </div>

          <div className={styles.advisoryRight}>
            <Link href="/connect" className={styles.advisoryBtn}>
              Request Advisory Call <span aria-hidden="true">→</span>
            </Link>
            <span className={styles.advisorySecondary}>
              Or explore <a href="https://authorityclosers.com" target="_blank" rel="noopener noreferrer">Authority Closers</a>
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}
