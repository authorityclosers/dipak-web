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
  const domains = [
    {
      number: "01",
      tag: "SYSTEMS ARCHITECTURE",
      title: "High-Ticket Sales Systems",
      description:
        "Codifying predictable enterprise revenue pipelines, qualification matrices, and closing protocols that scale without founder dependency.",
      telemetry: "[ 940+ CLOSERS TRAINED ]",
    },
    {
      number: "02",
      tag: "COGNITIVE DYNAMICS",
      title: "Buyer Psychology & Certainty",
      description:
        "Deconstructing the deep cognitive resistance behind buyer hesitation and engineering decisive certainty before commercial proposals.",
      telemetry: "[ TRUST IS ABSENCE OF DOUBT ]",
    },
    {
      number: "03",
      tag: "INTELLECTUAL EQUITY",
      title: "Founder Authority Architecture",
      description:
        "Transforming executive conviction and specialized frameworks into an unassailable commercial moat that commands premium pricing.",
      telemetry: "[ THE CERTAINTY BUILDER™ ]",
    },
    {
      number: "04",
      tag: "ORGANIZATIONAL SCALE",
      title: "High-Performance Sales Leadership",
      description:
        "Building autonomous deal closers, high-conviction culture, and scalable sales management systems for high-growth enterprise teams.",
      telemetry: "[ ₹9+ CRORE GENERATED ]",
    },
  ];

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
            <span className={styles.metaLabel}>ADVISORY &amp; KEYNOTES</span>
            <p className={styles.supportingNote} data-story-act5-note="true">
              Strategic keynotes, interactive workshops, and high-stakes executive advisory.
            </p>
          </div>
        </header>

        {/* Monumental Architectural Domain Ledger */}
        <ul
          className={styles.ledgerList}
          aria-label="Core topic domains"
          data-story-act5-ledger="true"
        >
          {domains.map((item) => (
            <li
              key={item.number}
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
                <span className={styles.telemetryTag}>{item.telemetry}</span>
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
