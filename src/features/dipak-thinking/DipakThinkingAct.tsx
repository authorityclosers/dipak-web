import React from "react";
import type { ThinkingContent } from "./thinking.types";
import { thinkingContent } from "./thinking.content";
import styles from "./dipak-thinking-act.module.css";

interface DipakThinkingActProps {
  content?: ThinkingContent;
  className?: string;
}

export function DipakThinkingAct({
  content = thinkingContent,
  className,
}: DipakThinkingActProps) {
  const editorialEssays = [
    {
      id: "a1",
      number: "01",
      tag: "BUYER PSYCHOLOGY // ESSAY",
      title: "Why Negotiation Is Just a Symptom of Early Misalignment.",
      abstract:
        "When certainty is established in the first fifteen minutes, commercial friction dissolves. Deconstructing the cognitive friction behind closing stalls.",
      readTime: "6 MIN READ",
      url: "https://medium.com",
    },
    {
      id: "a2",
      number: "02",
      tag: "COMMUNICATION // ESSAY",
      title: "The Architecture of Trust: How Top Closers Lead Conversations.",
      abstract:
        "Clarity over volume. Structuring high-ticket advisory dialogues that systematically dissolve buyer doubt and command authority.",
      readTime: "8 MIN READ",
      url: "https://medium.com",
    },
    {
      id: "a3",
      number: "03",
      tag: "ENTREPRENEURSHIP // ESSAY",
      title: "Transitioning From Founder-Led Sales to a Scalable Machine.",
      abstract:
        "Codifying founder intuition into repeatable team execution frameworks that preserve closing ratios across enterprise pipelines.",
      readTime: "5 MIN READ",
      url: "https://medium.com",
    },
  ];

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
            <span className={styles.metaLabel}>PUBLICATIONS &amp; MEDIA</span>
            <p className={styles.supportingNote} data-story-act6-note="true">
              Deep dives, video breakdowns, and strategic frameworks on buyer psychology and closing.
            </p>
          </div>
        </header>

        {/* Feature 1: Monumental Full-Width Masterclass Installation */}
        <div className={styles.masterclassBlock} data-story-act6-video="true">
          <div className={styles.blockLabelRow}>
            <span className={styles.blockSectionTitle}>
              FEATURED VIDEO MASTERCLASS
            </span>
          </div>

          <a
            href={content.featuredVideo.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.masterclassCard}
            aria-label={`Watch masterclass: ${content.featuredVideo.title}`}
          >
            <div className={styles.cardMainInfo}>
              <div className={styles.cardKickerRow}>
                <span className={styles.cardCategory}>
                  {content.featuredVideo.category} {" // MASTERCLASS"}
                </span>
                <span className={styles.cardDuration}>
                  {content.featuredVideo.duration}
                </span>
              </div>

              <h3 className={styles.cardTitle}>
                {content.featuredVideo.title}
              </h3>

              <p className={styles.cardSubtitle}>
                A complete breakdown of certainty transfer protocols, buyer friction elimination, and closing mechanics in high-ticket enterprise transactions.
              </p>
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

        {/* Feature 2: Expansive Full-Width Essays Ledger */}
        <div className={styles.essaysBlock} data-story-act6-articles="true">
          <div className={styles.blockLabelRow}>
            <span className={styles.blockSectionTitle}>
              LONG-FORM EDITORIAL ESSAYS
            </span>
          </div>

          <ul
            className={styles.essaysLedgerList}
            aria-label="Editorial Essays"
          >
            {editorialEssays.map((essay) => (
              <li key={essay.id}>
                <a
                  href={essay.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.essayLedgerRow}
                  data-story-act6-essay-row="true"
                >
                  <span className={styles.essayIndex}>[{essay.number}]</span>

                  <div className={styles.essayTitleCol}>
                    <span className={styles.essayCategory}>{essay.tag}</span>
                    <h3 className={styles.essayTitle}>{essay.title}</h3>
                  </div>

                  <div className={styles.essaySummaryCol}>
                    <p className={styles.essayAbstract}>{essay.abstract}</p>
                    <div className={styles.essayMetaRow}>
                      <span className={styles.essayReadTime}>
                        {essay.readTime}
                      </span>
                    </div>
                  </div>

                  <span className={styles.essayArrow} aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
