import Image from "next/image";
import brushLeft from "./assets/brush-left.png";
import brushHalo from "./assets/brush-halo.png";
import type { HeroContent, HeroCta } from "./hero.types";
import styles from "./dipak-hero.module.css";

const EVENT_SCHEMA_VERSION = "1";

function CtaButton({ cta }: { cta: HeroCta }) {
  if (!cta.href) return null;

  return (
    <a
      className={cta.kind === "primary" ? styles.primaryCta : styles.secondaryCta}
      href={cta.href}
      data-ac-event={cta.event}
      data-ac-event-schema={EVENT_SCHEMA_VERSION}
      data-ac-surface="dipak-public-hero"
    >
      {cta.kind === "primary" ? (
        <span aria-hidden="true" className={styles.primaryIcon}>
          →
        </span>
      ) : (
        <span aria-hidden="true" className={styles.secondaryIconCircle}>
          <span className={styles.playTriangle}>▶</span>
        </span>
      )}
      <span className={styles.ctaText}>{cta.label}</span>
    </a>
  );
}

export function DipakHero({ content }: { content: HeroContent }) {
  return (
    <section id="hero" className={styles.surface} aria-labelledby="hero-heading">
      {/* Authentic charcoal brush stroke on left border */}
      <div className={styles.leftBrushContainer} aria-hidden="true">
        <Image
          className={styles.leftBrushImage}
          src={brushLeft}
          alt=""
          priority
          quality={95}
        />
      </div>

      {/* Top Header & Navigation */}
      <header className={styles.header}>
        <a className={styles.wordmark} href="#hero" aria-label="Dipak Vishwakarma homepage">
          <span className={styles.wordmarkFirst}>{content.brandFirstLine}</span>
          <span className={styles.wordmarkSecond}>{content.brandSecondLine}</span>
        </a>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {content.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`${styles.navLink} ${link.active ? styles.navLinkActive : ""}`}
            >
              <span>{link.label}</span>
              {link.active ? <span className={styles.activeIndicator} aria-hidden="true" /> : null}
            </a>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <button className={styles.hamburgerBtn} aria-label="Open menu" type="button">
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </header>

      {/* Viewport Grid */}
      <div className={styles.heroGrid}>
        {/* Left Column: Copy & CTAs */}
        <div className={styles.copyColumn}>
          <div className={styles.kickerRow}>
            <span className={styles.kickerText}>{content.kicker}</span>
            <span className={styles.kickerLine} aria-hidden="true" />
          </div>

          <h1 id="hero-heading" className={styles.headline}>
            <span className={styles.headlineLine}>{content.headlinePart1}</span>
            <span className={styles.headlineLine}>{content.headlinePart2}</span>
            <span className={styles.headlineLine}>
              {content.headlinePart3}
              <span className={styles.goldDot} aria-hidden="true">
                .
              </span>
            </span>
          </h1>

          <p className={styles.supportingCopy}>{content.supportingCopy}</p>

          {content.ctas.some((cta) => Boolean(cta.href)) ? (
            <div className={styles.ctaRow} aria-label="Hero actions">
              {content.ctas.map((cta) => (
                <CtaButton cta={cta} key={cta.event} />
              ))}
            </div>
          ) : null}

          {content.quote ? (
            <blockquote className={styles.quoteBlock}>
              <span className={styles.quoteMark} aria-hidden="true">
                “
              </span>
              <span className={styles.quoteDivider} aria-hidden="true" />
              <cite className={styles.quoteText}>{content.quote}</cite>
            </blockquote>
          ) : null}
        </div>

        {/* Right Column: Pristine Seated Armchair Portrait with Zen Halo */}
        <div className={styles.portraitColumn}>
          {/* Zen Ensō Brush Halo Arc */}
          <div className={styles.haloContainer} aria-hidden="true">
            <Image
              className={styles.haloImage}
              src={brushHalo}
              alt=""
              priority
              quality={95}
            />
          </div>

          <div className={styles.portraitWrapper}>
            <Image
              className={styles.portrait}
              src={content.portrait}
              alt={content.portraitAlt}
              sizes="(max-width: 767px) 96vw, (max-width: 1200px) 55vw, 48vw"
              quality={95}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
