import { identityContent } from "./identity.content";
import { MediaIcon } from "./MediaIcons";
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
      className={`${styles.section} ${className || ""}`}
      aria-labelledby="identity-heading"
      data-story-act2="true"
    >
      <div className={styles.grid}>
        <figure className={styles.portraitCol} data-story-act2-reveal="true">
          <div className={styles.portraitFrame}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content.portrait.src}
              srcSet="/optimized/person-768-v1.webp 768w, /optimized/person-1200-v1.webp 1200w, /optimized/person-1600-v1.webp 1600w"
              sizes="(max-width: 900px) 100vw, 40vw"
              alt={content.portrait.alt}
              width={1600}
              height={1067}
              loading="lazy"
              decoding="async"
              className={`editorialGrade ${styles.portraitImg}`}
            />
          </div>
          <figcaption className={styles.portraitCaption}>{content.portrait.caption}</figcaption>
        </figure>

        <div className={styles.copyCol}>
          <p className={styles.eyebrow} data-story-act2-reveal="true">
            <span className={styles.eyebrowIndex}>{content.sectionNumber}</span>
            {content.sectionTitle}
          </p>

          <h2 id="identity-heading" className={styles.headline} data-story-act2-reveal="true">
            {content.headlinePart1}{" "}
            <em className={styles.headlineEm}>{content.headlineWord2}</em>
            <sup className={styles.tm}>™</sup>
          </h2>

          <p className={styles.role} data-story-act2-reveal="true">
            {content.roleSubhead}
          </p>

          <p className={styles.bio} data-story-act2-reveal="true">
            {content.bioParagraph}
          </p>

          <dl className={styles.metrics} data-story-act2-reveal="true" data-story-act2-stats="true">
            {content.metrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <dt className={styles.metricLabel}>{metric.label}</dt>
                <dd className={styles.metricValue}>
                  {metric.main}
                  {metric.suffix ? <span className={styles.metricSuffix}>{metric.suffix}</span> : null}
                </dd>
              </div>
            ))}
          </dl>

          <div className={styles.featured} data-story-act2-reveal="true">
            <span className={styles.featuredLabel}>{content.previewRailLabel}</span>
            <ul className={styles.featuredList} aria-label="Platforms Dipak is featured on">
              {content.previewChannels.map((channel) => {
                const inner = (
                  <>
                    <MediaIcon type={channel.iconType} className={styles.featuredIcon} />
                    <span>{channel.label}</span>
                  </>
                );
                return (
                  <li key={channel.label} className={styles.featuredItem}>
                    {channel.href ? (
                      <a href={channel.href} target="_blank" rel="noopener noreferrer" className={styles.featuredLink}>
                        {inner}
                      </a>
                    ) : (
                      <span className={styles.featuredLink}>{inner}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
