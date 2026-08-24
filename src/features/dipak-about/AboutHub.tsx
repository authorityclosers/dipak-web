import Image from "next/image";
import Link from "next/link";
import { aboutContent } from "./about.content";
import styles from "./about-hub.module.css";

export function AboutHub() {
  const { hero, story, journey, philosophy, principles, missionVision, faq, cta } =
    aboutContent;

  return (
    <article className={styles.aboutSection} aria-label="About Dipak Vishwakarma">
      <div className={styles.atmosphereLayer} aria-hidden="true" />
      <div className={styles.ensoEcho} aria-hidden="true" />

      {/* --- Section 1: Hero Profile -------------------------------------- */}
      <section className={styles.heroSection} aria-label="Executive Profile">
        <div className={styles.pageContainer}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.sectionKicker}>
                [ {hero.sectionIndex} / PROFILE ] · {hero.eyebrow}
              </p>

              <h1 className={styles.heroHeadline}>
                {hero.headlineWord1} <span className={styles.heroHeadlineAccent}>{hero.headlineWord2}</span>
              </h1>

              <blockquote className={styles.heroLeadQuote}>
                &ldquo;{hero.leadQuote}&rdquo;
              </blockquote>

              <p className={styles.heroSummaryText}>
                {hero.summary}
              </p>

              <div className={styles.heroActionsRow}>
                <a href="#philosophy" className={styles.heroPrimaryBtn}>
                  Core Philosophy ↓
                </a>
                <Link href="/connect" className={styles.heroSecondaryBtn}>
                  Book Advisory →
                </Link>
              </div>

              <div className={styles.heroStatsRibbon}>
                {hero.stats.map((stat, i) => (
                  <div key={i} className={styles.statItem}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.heroMediaFrame}>
              <Image
                src="/media/01_dsc06974.webp"
                alt="Dipak Vishwakarma — High-Ticket Sales Coach, Founder of Authority Closers"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className={styles.heroImage}
              />

              <div className={styles.heroBadgeOverlay}>
                <div className={styles.heroBadgeLeft}>
                  <span className={styles.heroBadgeName}>Dipak Vishwakarma</span>
                  <span className={styles.heroBadgeRole}>Founder, Authority Closers</span>
                </div>
                <span className={styles.verifiedBadge}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: My Story ------------------------------------------ */}
      <section className={styles.storySection} aria-label="Origin Narrative">
        <div className={styles.pageContainer}>
          <div className={styles.storyGrid}>
            <div className={styles.storyLeft}>
              <span className={styles.sectionHeaderKicker}>
                [ {story.index} / ORIGIN ] · {story.label}
              </span>
              <h2 className={styles.sectionHeaderTitle}>{story.headline}</h2>
              <p className={styles.storyPullQuote}>&ldquo;{story.quote}&rdquo;</p>
            </div>

            <div className={styles.storyRight}>
              {story.paragraphs.map((p, idx) => (
                <p key={idx} className={styles.storyParagraph}>
                  {p}
                </p>
              ))}

              <div className={styles.storySignatureBlock}>
                <Image
                  src="/branding/dipak-signature-full-black.webp"
                  alt="Dipak Vishwakarma Official Signature"
                  width={220}
                  height={92}
                  className={styles.signatureImage}
                />
                <div className={styles.signatureMeta}>
                  <span className={styles.signatureName}>Dipak Vishwakarma</span>
                  <span className={styles.signatureTitle}>The Certainty Builder™</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 3: Journey Timeline ---------------------------------- */}
      <section className={styles.journeySection} aria-label="Evolution & Milestones">
        <div className={styles.pageContainer}>
          <div className={styles.journeyHeaderBlock}>
            <span className={styles.sectionHeaderKicker}>
              [ {journey.index} / EVOLUTION ] · {journey.label}
            </span>
            <h2 className={styles.sectionHeaderTitle}>{journey.headline}</h2>
            <p className={styles.journeySubhead}>{journey.subhead}</p>
          </div>

          <div className={styles.journeyCardsGrid}>
            {journey.stages.map((stage) => (
              <div key={stage.index} className={styles.journeyCard}>
                <div className={styles.journeyCardTop}>
                  <div className={styles.journeyBadgeRow}>
                    <span className={styles.journeyIndex}>[{stage.index}]</span>
                    <span className={styles.journeyPhaseTag}>{stage.phase}</span>
                  </div>
                  <h3 className={styles.journeyCardTitle}>{stage.title}</h3>
                  <p className={styles.journeyCardBody}>{stage.body}</p>
                </div>
                <div className={styles.journeyTakeaway}>{stage.takeaway}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 4: Philosophy (THE CINEMATIC GLASSMORPHISM STAGE) ---- */}
      <section id="philosophy" className={styles.philosophySection} aria-label="Core Philosophy">
        <div className={styles.philosophyAtmosphere} aria-hidden="true" />
        <div className={styles.philosophyEnso} aria-hidden="true" />

        <div className={styles.pageContainer}>
          <div className={styles.philosophyContainer}>
            <div className={styles.philosophyHeaderBlock}>
              <span className={styles.philosophyKicker}>
                [ {philosophy.index} / CORE PHILOSOPHY ] · {philosophy.label}
              </span>
              <h2 className={styles.philosophyHeadline}>{philosophy.headline}</h2>
              <p className={styles.philosophySubhead}>{philosophy.subhead}</p>
            </div>

            <div className={styles.glassGrid}>
              {philosophy.entries.map((entry) => (
                <div key={entry.index} className={styles.glassCard}>
                  <div className={styles.glassCardTop}>
                    <div className={styles.glassCardBadgeRow}>
                      <span className={styles.glassTag}>★ {entry.tag}</span>
                      <span className={styles.glassIndex}>[{entry.index} / 04]</span>
                    </div>
                    <h3 className={styles.glassStatement}>&ldquo;{entry.statement}&rdquo;</h3>
                  </div>
                  <p className={styles.glassElaboration}>{entry.elaboration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 5: Principles ---------------------------------------- */}
      <section className={styles.principlesSection} aria-label="Operating Principles">
        <div className={styles.pageContainer}>
          <div className={styles.principlesHeaderBlock}>
            <span className={styles.sectionHeaderKicker}>
              [ {principles.index} / METHODOLOGY ] · {principles.label}
            </span>
            <h2 className={styles.sectionHeaderTitle}>{principles.headline}</h2>
          </div>

          <div className={styles.principlesGrid}>
            {principles.items.map((item, idx) => (
              <div key={idx} className={styles.principleCard}>
                <span className={styles.principleIndex}>
                  #{String(idx + 1).padStart(2, "0")}
                </span>
                <p className={styles.principleText}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 6: Mission & Vision (Elevated Dual Cards) ------------ */}
      <section className={styles.missionVisionSection} aria-label="Mission & Vision">
        <div className={styles.pageContainer}>
          <div className={styles.journeyHeaderBlock}>
            <span className={styles.sectionHeaderKicker}>
              [ {missionVision.index} / DIRECTION ] · {missionVision.label}
            </span>
            <h2 className={styles.sectionHeaderTitle}>{missionVision.headline}</h2>
            <p className={styles.journeySubhead}>{missionVision.subhead}</p>
          </div>

          <div className={styles.missionVisionGrid}>
            <div className={styles.mvCard}>
              <div className={styles.mvCardTop}>
                <span className={styles.mvTag}>{missionVision.mission.tag}</span>
                <h3 className={styles.mvHeadline}>{missionVision.mission.headline}</h3>
                <p className={styles.mvBody}>{missionVision.mission.body}</p>
              </div>
            </div>

            <div className={styles.mvCard}>
              <div className={styles.mvCardTop}>
                <span className={styles.mvTag}>{missionVision.vision.tag}</span>
                <h3 className={styles.mvHeadline}>{missionVision.vision.headline}</h3>
                <p className={styles.mvBody}>{missionVision.vision.body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 7: FAQ & Executive Advisory Banner ------------------ */}
      <section className={styles.faqSection} aria-label="FAQ & Consultation">
        <div className={styles.pageContainer}>
          <div className={styles.faqHeaderBlock}>
            <span className={styles.sectionHeaderKicker}>
              [ {faq.index} / CLARITY ] · {faq.label}
            </span>
            <h2 className={styles.sectionHeaderTitle}>{faq.headline}</h2>
          </div>

          <div className={styles.faqList}>
            {faq.entries.map((item, idx) => (
              <details key={idx} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>{item.question}</span>
                  <span className={styles.faqIcon} aria-hidden="true">+</span>
                </summary>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </details>
            ))}
          </div>

          {/* Bottom Executive Advisory Banner */}
          <aside className={styles.advisoryBanner} aria-label="Executive Sales Advisory">
            <div className={styles.advisoryLeft}>
              <span className={styles.advisoryKicker}>
                FOUNDER-LED SALES ADVISORY
              </span>
              <h3 className={styles.advisoryHeading}>
                Ready to eliminate pipeline hesitation and scale deal closing?
              </h3>
              <p className={styles.advisoryBody}>
                {cta.primary.text}
              </p>
            </div>

            <div className={styles.advisoryRight}>
              <Link href={cta.primary.href} className={styles.advisoryBtn}>
                {cta.primary.label} <span aria-hidden="true">→</span>
              </Link>
              <span className={styles.advisorySecondary}>
                Or explore{" "}
                <a href={cta.secondary.href} target="_blank" rel="noopener noreferrer">
                  Authority Closers
                </a>
              </span>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}
