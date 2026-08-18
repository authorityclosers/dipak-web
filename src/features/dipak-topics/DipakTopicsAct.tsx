import React from "react";
import type { TopicsContent } from "./topics.types";
import { topicsContent } from "./topics.content";
import styles from "./dipak-topics-act.module.css";

interface DipakTopicsActProps {
  content?: TopicsContent;
  className?: string;
}

export function DipakTopicsAct({
  content = topicsContent,
  className,
}: DipakTopicsActProps) {
  return (
    <section
      id="topics"
      className={`${styles.topicsSection} ${className || ""}`}
      aria-labelledby="topics-heading"
      data-story-act5="true"
    >
      <div className={styles.atmosphereLayer} aria-hidden="true" />
      <div className={styles.ensoEcho} aria-hidden="true" />

      <div className={styles.topicsContainer}>
        {/* Header Row */}
        <header className={styles.headerRow}>
          <div className={styles.titleBlock}>
            <div className={styles.sectionIndex} data-story-act5-index="true">
              <span>{content.sectionNumber}</span>
              <span aria-hidden="true">/</span>
              <span>{content.sectionTitle}</span>
            </div>

            <h2 id="topics-heading" className={styles.headline}>
              <span>{content.headlineWord1}</span>{" "}
              <span>
                {content.headlineWord2}
                <span className={styles.goldPeriod}>.</span>
              </span>
            </h2>
          </div>

          <div className={styles.headerMeta}>
            <span className={styles.metaLabel}>{content.metaLabel}</span>
            <p className={styles.supportingNote} data-story-act5-note="true">
              {content.supportingNote}
            </p>
          </div>
        </header>

        {/* Monumental Architectural Domain Ledger */}
        <ul
          className={styles.ledgerList}
          aria-label="Core topic domains"
          data-story-act5-ledger="true"
        >
          {content.topics.map((item) => (
            <li
              key={item.id}
              className={styles.ledgerRow}
              data-story-act5-item="true"
            >
              <span className={styles.rowIndex}>[{item.number}]</span>

              <div className={styles.rowTitleBlock}>
                <span className={styles.domainTag}>{item.tag}</span>
                <h3 className={styles.domainTitle}>{item.title}</h3>
              </div>

              <div className={styles.rowContentBlock}>
                <p className={styles.domainDescription}>{item.description}</p>
              </div>

              <span className={styles.rowArrow} aria-hidden="true">
                →
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
