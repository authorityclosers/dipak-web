import React from "react";
import { missionContent } from "./mission.content";
import type { MissionContent } from "./mission.types";
import styles from "./dipak-mission-act.module.css";

interface DipakMissionActProps {
  content?: MissionContent;
  className?: string;
}

export function DipakMissionAct({
  content = missionContent,
  className,
}: DipakMissionActProps) {
  return (
    <section
      id="mission"
      className={`${styles.missionSection} ${className || ""}`}
      aria-labelledby="mission-heading"
      data-story-act4="true"
    >
      <div className={styles.atmosphereLayer} aria-hidden="true" />
      <div
        className={styles.ensoAura}
        data-story-act4-enso="true"
        aria-hidden="true"
      />

      <div className={styles.manifestoContainer}>
        {/* Kicker Block */}
        <div className={styles.kickerBlock}>
          <div className={styles.sectionIndex} data-story-act4-index="true">
            <span>{content.sectionNumber}</span>
            <span aria-hidden="true">/</span>
            <span>{content.sectionTitle}</span>
          </div>
          <span className={styles.kickerMeta} data-story-act4-kicker="true">
            {content.kicker}
          </span>
        </div>

        {/* Monumental Quote Sculpture */}
        <blockquote className={styles.quoteSculpture}>
          <h2 id="mission-heading" className={styles.quoteHeadline}>
            <span className={styles.headlineMask}>
              <span
                className={styles.headlineLine}
                data-story-act4-line="0"
              >
                &ldquo;Sales is the
              </span>
            </span>
            <span className={styles.headlineMask}>
              <span
                className={`${styles.headlineLine} ${styles.goldEmphasis}`}
                data-story-act4-line="1"
              >
                transfer of certainty.&rdquo;
              </span>
            </span>
          </h2>
        </blockquote>

        {/* Central Gold Laser Axis with Center Accent */}
        <div className={styles.laserContainer} data-story-act4-rule="true">
          <div className={styles.laserLine} aria-hidden="true" />
          <div className={styles.laserDiamond} aria-hidden="true" />
          <div className={styles.laserLine} aria-hidden="true" />
        </div>

        {/* Two Pure Editorial Tenets */}
        <ul
          className={styles.tenetsRow}
          aria-label="Core Operating Tenets"
          data-story-act4-tenets="true"
        >
          <li className={styles.tenetItem}>
            <span className={styles.tenetDot} aria-hidden="true" />
            <span>Trust is the absence of doubt.</span>
          </li>
          <li className={styles.tenetItem}>
            <span className={styles.tenetDot} aria-hidden="true" />
            <span>Curiosity builds trust.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
