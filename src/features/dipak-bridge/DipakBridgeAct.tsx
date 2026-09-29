import { bridgeContent } from "./bridge.content";
import type { BridgeContent } from "./bridge.types";
import styles from "./dipak-bridge-act.module.css";

interface DipakBridgeActProps {
  content?: BridgeContent;
  className?: string;
}

export function DipakBridgeAct({
  content = bridgeContent,
  className,
}: DipakBridgeActProps) {
  const primaryCta = content.ctas.find((c) => c.primary) || content.ctas[0];
  const secondaryCta = content.ctas.find((c) => !c.primary);

  return (
    <section
      id="authority-closers"
      className={`${styles.section} ${className || ""}`}
      aria-labelledby="bridge-heading"
      data-story-act7="true"
    >
      <div className={styles.container}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>{content.sectionNumber}</span>
            {content.sectionTitle}
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/optimized/15_authority_closers_png__1_-768-v1.webp"
            alt=""
            className={styles.mark}
            width={768}
            height={582}
            loading="lazy"
            decoding="async"
          />

          <h2 id="bridge-heading" className={styles.headline}>
            {content.headlineWord1} <em>{content.headlineWord2}</em>
          </h2>

          <p className={styles.kicker}>{content.eyebrow}</p>
          <p className={styles.body}>{content.bodyParagraph}</p>

          <div className={styles.ctaRow} data-story-act7-ctas="true">
            {primaryCta ? (
              <a
                href={primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primary}
                data-ac-event={primaryCta.event}
              >
                {primaryCta.label}
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
            {secondaryCta ? (
              <a href={secondaryCta.href} className={styles.secondary} data-ac-event={secondaryCta.event}>
                {secondaryCta.label}
                <span aria-hidden="true">→</span>
              </a>
            ) : null}
          </div>
        </div>

        <figure className={styles.media}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/optimized/bridge-team-1600-v1.webp"
            srcSet="/optimized/bridge-team-960-v1.webp 960w, /optimized/bridge-team-1600-v1.webp 1600w"
            sizes="(max-width: 900px) 100vw, 46vw"
            alt="The Authority Closers team"
            width={1600}
            height={1200}
            loading="lazy"
            decoding="async"
            className={`editorialGrade ${styles.photo}`}
          />
          <figcaption className={styles.caption}>Authority Closers cohort · Pune</figcaption>
        </figure>
      </div>
    </section>
  );
}
