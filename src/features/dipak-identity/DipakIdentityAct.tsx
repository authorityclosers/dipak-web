import React from "react";
import { identityContent } from "./identity.content";
import type { IdentityContent } from "./identity.types";
import { MediaIcon } from "./MediaIcons";
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
      {/* Background Atmosphere Continuity */}
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
                {content.headlineWord2}
                <span className={styles.tm}>™</span>
                <span className={styles.goldPeriod}>.</span>
              </span>
            </span>
          </h2>
        </header>

        {/* Structural Editorial Gold Rule Sits Strictly Under Header */}
        <div className={styles.structuralRuleContainer}>
          <div
            className={styles.structuralRule}
            data-story-act2-rule="true"
            aria-hidden="true"
          />
        </div>

        {/* Middle Content Row: Founder Lockup & Verified Bio */}
        <div className={styles.middleRow}>
          <div className={styles.roleColumn} data-story-act2-role="true">
            <h3 className={styles.roleSubhead}>{content.roleSubhead}</h3>
            <span className={styles.founderDash} aria-hidden="true" />
          </div>

          <div className={styles.bioColumn} data-story-act2-bio="true">
            <p className={styles.bioText}>{content.bioParagraph}</p>
          </div>
        </div>

        {/* Bottom Normalized Proof Metrics Row */}
        <div className={styles.statsRow} data-story-act2-stats="true">
          {content.metrics.map((metric) => (
            <div className={styles.statBlock} key={metric.label}>
              <div className={styles.statValueRow}>
                <span className={styles.statMain}>{metric.main}</span>
                {metric.suffix ? (
                  <span className={styles.statSuffix}>{metric.suffix}</span>
                ) : null}
              </div>
              <div className={styles.statLabelRow}>
                <span className={styles.statLabel}>{metric.label}</span>
                {metric.sublabel ? (
                  <span className={styles.statSublabel}>{metric.sublabel}</span>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Monochrome Media Proof Trust Rail */}
        <footer className={styles.previewRail} data-story-act2-preview="true">
          <div className={styles.previewRailLabel}>
            <span>{content.previewRailLabel}</span>
            <span className={styles.previewRailArrow} aria-hidden="true">
              →
            </span>
          </div>

          <ul className={styles.mediaList} aria-label="Featured media channels">
            {content.previewChannels.map((channel) => (
              <li className={styles.mediaItem} key={channel.label}>
                <MediaIcon
                  type={channel.iconType}
                  className={styles.mediaIcon}
                />
                <span className={styles.mediaName}>{channel.label}</span>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </section>
  );
}
