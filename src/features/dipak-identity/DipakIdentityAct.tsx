import React from "react";
import { identityContent } from "./identity.content";
import type { IdentityContent } from "./identity.types";
import styles from "./dipak-identity-act.module.css";

interface DipakIdentityActProps {
  content?: IdentityContent;
  className?: string;
}

export function DipakIdentityAct({
  content = identityContent,
  className,
}: DipakIdentityActProps) {
  return (
    <section
      id="identity"
      className={`${styles.identitySection} ${className || ""}`}
      aria-labelledby="identity-heading"
      data-story-act2="true"
    >
      {/* Background Atmosphere */}
      <div className={styles.atmosphereLayer} aria-hidden="true" />

      <div className={styles.identityContainer}>
        {/* Top Header Row: Section Number & Massive Editorial Headline */}
        <header className={styles.topRow}>
          <div className={styles.sectionIndex} data-story-act2-index="true">
            <span>{content.sectionNumber}</span>
            <span aria-hidden="true">/</span>
            <span>{content.sectionTitle}</span>
          </div>

          <h2 id="identity-heading" className={styles.headline}>
            <span className={styles.headlineMask}>
              <span
                className={styles.headlineLine}
                data-story-act2-headline="true"
              >
                {content.headlinePart1}
              </span>
            </span>
            <span className={styles.headlineMask}>
              <span
                className={styles.headlineLine}
                data-story-act2-headline="true"
              >
                {content.headlinePart2}
              </span>
            </span>
          </h2>
        </header>

        {/* Structural Editorial Gold Rule */}
        <div className={styles.structuralRuleContainer}>
          <div
            className={styles.structuralRule}
            data-story-act2-rule="true"
            aria-hidden="true"
          />
        </div>

        {/* Middle Content Row: Subhead & Verified Bio */}
        <div className={styles.middleRow}>
          <div className={styles.roleColumn} data-story-act2-role="true">
            <h3 className={styles.roleSubhead}>{content.roleSubhead}</h3>
            <p className={styles.roleTagline}>Strategic Sales Enablement</p>
          </div>

          <div className={styles.bioColumn} data-story-act2-bio="true">
            <p className={styles.bioText}>{content.bioParagraph}</p>
          </div>
        </div>

        {/* Bottom Proof Metrics Row */}
        <div className={styles.statsRow} data-story-act2-stats="true">
          {content.stats.map((stat) => (
            <div className={styles.statBlock} key={stat.label}>
              <span className={styles.statValue}>{stat.value}</span>
              <div className={styles.statLabelRow}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statSublabel}>{stat.sublabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Media Proof Preview Rail */}
        <footer className={styles.previewRail} data-story-act2-preview="true">
          <div className={styles.previewRailLabel}>
            <span>{content.previewRailLabel}</span>
            <span className={styles.previewRailArrow} aria-hidden="true">
              →
            </span>
          </div>

          <ul className={styles.channelsList} aria-label="Media channels">
            {content.previewChannels.map((channel, idx) => (
              <React.Fragment key={channel}>
                <li className={styles.channelItem}>{channel}</li>
                {idx < content.previewChannels.length - 1 ? (
                  <li className={styles.channelDot} aria-hidden="true">
                    ·
                  </li>
                ) : null}
              </React.Fragment>
            ))}
          </ul>
        </footer>
      </div>
    </section>
  );
}
