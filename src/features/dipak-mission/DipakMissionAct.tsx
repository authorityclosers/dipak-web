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
      className={`${styles.section} ${className || ""}`}
      aria-labelledby="mission-heading"
      data-story-act3="true"
    >
      <div className={styles.media} aria-hidden="true">
        <div className={styles.mediaInner} data-story-act3-media="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/optimized/manifesto-1920-v1.webp"
            srcSet="/optimized/manifesto-1280-v1.webp 1280w, /optimized/manifesto-1920-v1.webp 1920w, /optimized/manifesto-2560-v1.webp 2560w"
            sizes="100vw"
            alt=""
            width={1920}
            height={1089}
            loading="lazy"
            decoding="async"
            className={styles.photo}
          />
        </div>
        <div className={styles.scrim} />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowIndex}>{content.sectionNumber}</span>
          {content.sectionTitle}
        </p>

        <blockquote className={styles.quote}>
          <h2 id="mission-heading" className={styles.quoteHeadline}>
            <span className={styles.mask}>
              <span className={styles.line} data-story-act3-line="0">
                &ldquo;{content.monumentalQuote.prefix}
              </span>
            </span>
            <span className={styles.mask}>
              <span className={`${styles.line} ${styles.lineEm}`} data-story-act3-line="1">
                {content.monumentalQuote.emphasis}
                {content.monumentalQuote.suffix}&rdquo;
              </span>
            </span>
          </h2>
        </blockquote>

        <ul className={styles.tenets} aria-label="Operating tenets" data-story-act3-tenets="true">
          {content.pillars.map((pillar) => (
            <li key={pillar.index} className={styles.tenet}>
              {pillar.statement}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
