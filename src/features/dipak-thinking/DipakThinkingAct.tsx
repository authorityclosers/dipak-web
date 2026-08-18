import React from "react";
import Link from "next/link";
import type { ThinkingContent, FeaturedArticle } from "./thinking.types";
import { thinkingContent } from "./thinking.content";
import styles from "./dipak-thinking-act.module.css";

interface DipakThinkingActProps {
  content?: ThinkingContent;
  /**
   * Real published articles, injected by the page from the file-backed
   * article store. Supplying these is what makes this act link to live posts
   * instead of the static fallback in thinking.content.ts.
   */
  articles?: FeaturedArticle[];
  className?: string;
}

export function DipakThinkingAct({
  content = thinkingContent,
  articles,
  className,
}: DipakThinkingActProps) {
  const essays = articles?.length ? articles : content.articles;
  const featuredVideo = content.featuredVideo;

  return (
    <section
      id="thinking"
      className={`${styles.thinkingSection} ${className || ""}`}
      aria-labelledby="thinking-heading"
      data-story-act6="true"
    >
      <div className={styles.atmosphereLayer} aria-hidden="true" />
      <div className={styles.ensoEcho} aria-hidden="true" />

      <div className={styles.thinkingContainer}>
        {/* Header Row */}
        <header className={styles.headerRow}>
          <div className={styles.titleBlock}>
            <div className={styles.sectionIndex} data-story-act6-index="true">
              <span>{content.sectionNumber}</span>
              <span aria-hidden="true">/</span>
              <span>{content.sectionTitle}</span>
            </div>

            <h2 id="thinking-heading" className={styles.headline}>
              <span>LATEST</span> <span>THINKING</span>
              <span className={styles.goldPeriod}>.</span>
            </h2>
          </div>

          <div className={styles.headerMeta}>
            <span className={styles.metaLabel}>{content.metaLabel}</span>
            <p className={styles.supportingNote} data-story-act6-note="true">
              {content.supportingNote}
            </p>
          </div>
        </header>

        {/*
          Featured masterclass renders only when a real video URL exists.
          AGENTS.md forbids shipping a dead destination to make a button
          clickable, so an unset youtubeUrl removes the block entirely.
        */}
        {featuredVideo?.youtubeUrl ? (
          <div className={styles.masterclassBlock} data-story-act6-video="true">
            <div className={styles.blockLabelRow}>
              <span className={styles.blockSectionTitle}>
                {content.videoSectionHeading}
              </span>
            </div>

            <a
              href={featuredVideo.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.masterclassCard}
              aria-label={`Watch masterclass: ${featuredVideo.title}`}
              data-ac-event="public.home.featured_video_clicked"
            >
              <div className={styles.cardMainInfo}>
                <div className={styles.cardKickerRow}>
                  <span className={styles.cardCategory}>
                    {featuredVideo.category} {" // MASTERCLASS"}
                  </span>
                  <span className={styles.cardDuration}>
                    {featuredVideo.duration}
                  </span>
                </div>

                <h3 className={styles.cardTitle}>{featuredVideo.title}</h3>

                {featuredVideo.summary ? (
                  <p className={styles.cardSubtitle}>{featuredVideo.summary}</p>
                ) : null}
              </div>

              <div className={styles.cardActionCol}>
                <div className={styles.playTokenContainer}>
                  <span className={styles.playPrompt}>WATCH BREAKDOWN</span>
                  <div className={styles.playIconSlot} aria-hidden="true">
                    ▶
                  </div>
                </div>
              </div>
            </a>
          </div>
        ) : null}

        {/* Long-form essays — real published articles when available. */}
        <div className={styles.essaysBlock} data-story-act6-articles="true">
          <div className={styles.blockLabelRow}>
            <span className={styles.blockSectionTitle}>
              {content.articleSectionHeading}
            </span>
          </div>

          <ul className={styles.essaysLedgerList} aria-label="Editorial essays">
            {essays.map((essay) => (
              <li key={essay.id}>
                <Link
                  href={essay.url ?? "/articles"}
                  className={styles.essayLedgerRow}
                  data-story-act6-essay-row="true"
                  data-ac-event="public.home.article_clicked"
                >
                  <span className={styles.essayIndex}>[{essay.number}]</span>

                  <div className={styles.essayTitleCol}>
                    <span className={styles.essayCategory}>
                      {essay.category}
                      {essay.series ? ` // ${essay.series}` : " // ESSAY"}
                    </span>
                    <h3 className={styles.essayTitle}>{essay.title}</h3>
                  </div>

                  <div className={styles.essaySummaryCol}>
                    {essay.abstract ? (
                      <p className={styles.essayAbstract}>{essay.abstract}</p>
                    ) : null}
                    <div className={styles.essayMetaRow}>
                      <span className={styles.essayReadTime}>
                        {essay.readTime}
                      </span>
                    </div>
                  </div>

                  <span className={styles.essayArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link className={styles.allArticlesCta} href="/articles">
            {content.articlesCtaText}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
