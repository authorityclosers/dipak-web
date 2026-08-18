import type { ReactNode } from "react";
import styles from "./editorial.module.css";

interface PageHeroProps {
  eyebrow: string;
  /** Rendered as the page h1. Keep to a short editorial statement. */
  headline: string;
  /** Optional standfirst paragraph(s). */
  body?: string[];
  /** Optional right-hand slot, typically a portrait or stat block. */
  aside?: ReactNode;
  /** Optional index label, e.g. "01". */
  index?: string;
}

export function PageHero({ eyebrow, headline, body, aside, index }: PageHeroProps) {
  return (
    <section className={styles.pageHero} aria-labelledby="page-hero-heading">
      <div className={`${styles.pageHeroInner} ${aside ? styles.pageHeroSplit : ""}`}>
        <div className={styles.pageHeroCopy}>
          <div className={styles.eyebrowRow}>
            {index ? <span className={styles.eyebrowIndex}>{index}</span> : null}
            <span className={styles.eyebrow}>{eyebrow}</span>
            <span className={styles.eyebrowRule} aria-hidden="true" />
          </div>

          <h1 id="page-hero-heading" className={styles.pageHeadline}>
            {headline}
            <span className={styles.goldPeriod} aria-hidden="true">
              .
            </span>
          </h1>

          {body?.length ? (
            <div className={styles.pageHeroBody}>
              {body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>

        {aside ? <div className={styles.pageHeroAside}>{aside}</div> : null}
      </div>
    </section>
  );
}
