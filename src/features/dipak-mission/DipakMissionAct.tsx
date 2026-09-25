import React from "react";
import { EditorialSeparator } from "@/features/editorial";
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
      
      {/* Cinematic Window Silhouette Background Layer */}
      <div className={styles.videoBackgroundContainer} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/optimized/mission-background-768-v1.webp"
          alt=""
          className={styles.backgroundPhoto}
          width={768}
          height={436}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        <div className={styles.videoGradientWash} />
      </div>

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
              <span className={styles.headlineLine} data-story-act4-line="0">
                &ldquo;{content.monumentalQuote.prefix}
              </span>
            </span>
            <span className={styles.headlineMask}>
              <span
                className={`${styles.headlineLine} ${styles.goldEmphasis}`}
                data-story-act4-line="1"
              >
                {content.monumentalQuote.emphasis}
                {content.monumentalQuote.suffix}&rdquo;
              </span>
            </span>
          </h2>
        </blockquote>

        {/* Central Architectural Florentine Separator Axis */}
        <div className={styles.separatorContainer} data-story-act4-rule="true">
          <EditorialSeparator variant="centered" />
        </div>

        {/* Two Pure Editorial Tenets */}
        <ul
          className={styles.tenetsRow}
          aria-label="Core Operating Tenets"
          data-story-act4-tenets="true"
        >
          {content.pillars.map((pillar) => (
            <li key={pillar.index} className={styles.tenetItem}>
              <span className={styles.tenetDot} aria-hidden="true" />
              <span>{pillar.statement}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
