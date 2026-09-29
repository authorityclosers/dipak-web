import { BrushArtwork } from "./BrushArtwork";
import type { HeroContent, HeroCta } from "./hero.types";
import heroComposition from "./generated/hero-composition.json";
import styles from "./dipak-hero.module.css";

const EVENT_SCHEMA_VERSION = "1";
const portraitSizes =
  "(max-width: 380px) 12.5rem, (max-width: 900px) min(26rem, calc(100vw - 3rem)), (max-width: 1200px) 44vw, 40vw";
const desktopPortraitSrcSet =
  "/optimized/dipak-desktop-384-v1.webp 384w, /optimized/dipak-desktop-640-v1.webp 640w, /optimized/dipak-desktop-960-v1.webp 960w";
const mobilePortraitSrcSet =
  "/optimized/dipak-mobile-384-v1.webp 384w, /optimized/dipak-mobile-640-v1.webp 640w";

function CtaButton({ cta }: { cta: HeroCta }) {
  if (!cta.href) return null;
  const external = cta.href.startsWith("http");

  return (
    <a
      className={cta.kind === "primary" ? styles.primaryCta : styles.secondaryCta}
      href={cta.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-ac-event={cta.event}
      data-ac-event-schema={EVENT_SCHEMA_VERSION}
      data-ac-surface="dipak-public-hero"
    >
      <span>{cta.label}</span>
      <span aria-hidden="true" className={styles.ctaArrow}>
        {external ? "↗" : "→"}
      </span>
    </a>
  );
}

export function DipakHero({ content }: { content: HeroContent }) {
  return (
    <section
      id="hero"
      className={styles.surface}
      aria-labelledby="hero-heading"
      data-story-act1="true"
    >
      <div
        className={styles.leftBrushAccent}
        data-story-left-accent="true"
        aria-hidden="true"
      />

      <div className={styles.heroGrid}>
        <div className={styles.copyColumn} data-story-copy-col="true">
          <p className={styles.kicker} data-story-kicker="true">
            {content.kicker}
          </p>

          <h1 id="hero-heading" className={styles.headline}>
            <span className={styles.headlineMask}>
              <span className={styles.headlineLine} style={{ "--line-index": 0 } as React.CSSProperties}>
                {content.headlinePart1}
              </span>
            </span>
            <span className={styles.headlineMask}>
              <span className={styles.headlineLine} style={{ "--line-index": 1 } as React.CSSProperties}>
                {content.headlinePart2}
              </span>
            </span>
            <span className={styles.headlineMask}>
              <span className={styles.headlineLine} style={{ "--line-index": 2 } as React.CSSProperties}>
                <em className={styles.emphasis}>{content.headlinePart3}</em>
                <span className={styles.period} aria-hidden="true">
                  .
                </span>
              </span>
            </span>
          </h1>

          <p className={styles.supportingCopy} data-story-copy="true">
            {content.supportingCopy}
          </p>

          {content.ctas.some((cta) => Boolean(cta.href)) ? (
            <div className={styles.ctaRow} data-story-cta-row="true" aria-label="Hero actions">
              {content.ctas.map((cta) => (
                <CtaButton cta={cta} key={cta.event} />
              ))}
            </div>
          ) : null}

          {content.quote ? (
            <blockquote className={styles.quoteBlock} data-hero-quote="true" data-story-quote="true">
              <span className={styles.quoteText}>{content.quote}</span>
            </blockquote>
          ) : null}
        </div>

        <div className={styles.portraitColumn}>
          <div
            className={styles.visualComposition}
            data-hero-composition="true"
            data-story-portrait-root="true"
            style={
              {
                "--desktop-aspect": heroComposition.desktop.aspectRatio,
                "--desktop-halo-u": `${heroComposition.desktop.halo_u * 100}%`,
                "--desktop-halo-v": `${heroComposition.desktop.halo_v * 100}%`,
                "--desktop-halo-sw": `${heroComposition.desktop.halo_sw * 100}%`,
                "--desktop-halo-sh": `${heroComposition.desktop.halo_sh * 100}%`,
                "--mobile-aspect": heroComposition.mobile.aspectRatio,
                "--mobile-halo-u": `${heroComposition.mobile.halo_u * 100}%`,
                "--mobile-halo-v": `${heroComposition.mobile.halo_v * 100}%`,
                "--mobile-halo-sw": `${heroComposition.mobile.halo_sw * 100}%`,
                "--mobile-halo-sh": `${heroComposition.mobile.halo_sh * 100}%`,
              } as React.CSSProperties
            }
          >
            <BrushArtwork className={styles.halo} />

            <picture className={styles.responsivePicture}>
              <source
                media="(max-width: 900px)"
                srcSet={mobilePortraitSrcSet}
                sizes={portraitSizes}
              />
              <img
                className={styles.portrait}
                data-hero-portrait="true"
                src="/optimized/dipak-desktop-960-v1.webp"
                srcSet={desktopPortraitSrcSet}
                sizes={portraitSizes}
                alt={content.portraitAlt}
                width={960}
                height={1200}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
