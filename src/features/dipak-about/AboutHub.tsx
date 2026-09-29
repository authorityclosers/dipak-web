import Image from "next/image";
import Link from "next/link";
import { aboutContent } from "./about.content";
import styles from "./about-hub.module.css";

/**
 * About — five movements: Hero · Story · Evolution · Philosophy · FAQ + CTA.
 * Principles and Mission/Vision fold into Philosophy as a single list, and
 * every nested "epiphany" / "strategic law" box is gone: one idea, one line.
 */
export function AboutHub() {
  const { hero, story, journey, philosophy, principles, missionVision, faq, cta } =
    aboutContent;

  return (
    <article className={styles.about} aria-label="About Dipak Vishwakarma">
      {/* --- 01 Hero ---------------------------------------------------- */}
      <section className={styles.hero} aria-label="Profile">
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowIndex}>01</span>About
              </p>

              <h1 className={styles.heroHeadline}>
                I study how people <em>decide.</em>
              </h1>

              <p className={styles.heroThesis}>{hero.thesis}</p>

              <blockquote className={styles.heroQuote}>{hero.leadQuote}</blockquote>

              <div className={styles.heroActions}>
                <a href={hero.actions.primary.href} className={styles.btnPrimary}>
                  Explore the philosophy <span aria-hidden="true">↓</span>
                </a>
                <Link href={hero.actions.secondary.href} className={styles.btnSecondary}>
                  Private advisory <span aria-hidden="true">→</span>
                </Link>
              </div>

              <dl className={styles.identityRail}>
                {hero.identityRail.map((item) => (
                  <div key={item.role} className={styles.identityItem}>
                    <dt>{item.role}</dt>
                    <dd>{item.entity}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <figure className={styles.portrait}>
              <div className={styles.portraitFrame}>
                <Image
                  src="/optimized/about-portrait-1600-v1.webp"
                  alt="Dipak Vishwakarma — Founder of Authority Closers"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 40vw"
                  className={`editorialGrade ${styles.portraitImg}`}
                />
              </div>
              <figcaption className={styles.caption}>{hero.portraitCaption}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* --- 02 Story ---------------------------------------------------- */}
      <section className={styles.story} aria-label="Story">
        <div className={styles.container}>
          <div className={styles.split}>
            <div className={styles.splitHead}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowIndex}>{story.index}</span>
                {story.label}
              </p>
              <h2 className={styles.h2}>{story.headline}</h2>
              <p className={styles.pullQuote}>&ldquo;{story.quote}&rdquo;</p>
            </div>

            <div className={styles.prose}>
              {story.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
              <div className={styles.signature}>
                <Image
                  src="/branding/dipak-signature-full-black.webp"
                  alt="Dipak Vishwakarma signature"
                  width={200}
                  height={84}
                  className={styles.signatureImg}
                />
                <span className={styles.signatureMeta}>Dipak Vishwakarma · The Certainty Builder™</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 03 Evolution ------------------------------------------------ */}
      <section className={styles.evolution} aria-label="Evolution">
        <div className={styles.container}>
          <div className={styles.split}>
            <div className={`${styles.splitHead} ${styles.sticky}`}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowIndex}>{journey.index}</span>
                {journey.label}
              </p>
              <h2 className={styles.h2}>
                {journey.headlineLine1} <em>{journey.headlineLine2}</em>
              </h2>
              <p className={styles.lede}>{journey.subhead}</p>
            </div>

            <ol className={styles.timeline}>
              {journey.stages.map((stage, index) => {
                const isApex = index === journey.stages.length - 1;
                return (
                  <li
                    key={stage.index}
                    className={`${styles.stage} ${isApex ? styles.stageApex : ""}`}
                  >
                    <span className={styles.stageIndex}>{stage.numeral}</span>
                    <div className={styles.stageBody}>
                      <span className={styles.stagePhase}>{stage.phase.replace(/^Phase \d+ · /, "")}</span>
                      <h3 className={styles.stageTitle}>{stage.title}</h3>
                      <p className={styles.stageText}>{stage.body}</p>
                      <p className={styles.stageTakeaway}>{stage.takeaway}</p>
                      {isApex ? (
                        <a
                          href="https://authorityclosers.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.textLink}
                        >
                          Explore Authority Closers <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* --- 04 Philosophy ----------------------------------------------- */}
      <section id="philosophy" className={styles.philosophy} aria-label="Philosophy">
        <div className={styles.container}>
          <div className={styles.split}>
            <div className={`${styles.splitHead} ${styles.sticky}`}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowIndex}>{philosophy.index}</span>
                {philosophy.label}
              </p>
              <h2 className={styles.h2}>
                {philosophy.headlineLine1} <em>{philosophy.headlineLine2}</em>
              </h2>
              <p className={styles.lede}>{philosophy.subhead}</p>
              <p className={styles.footnote}>{philosophy.footnote}</p>
            </div>

            <div className={styles.ideas}>
              {philosophy.entries.map((entry) => (
                <article key={entry.index} className={styles.idea}>
                  <span className={styles.ideaIndex}>{entry.index}</span>
                  <h3 className={styles.ideaStatement}>
                    {entry.statementPrefix} <em>{entry.accentWord}</em>
                  </h3>
                  <p className={styles.ideaText}>{entry.elaboration}</p>
                  <p className={styles.ideaLaw}>{entry.implication}</p>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.principles}>
            <div className={styles.principlesHead}>
              <h3 className={styles.h3}>{principles.headline}</h3>
              <p className={styles.lede}>{missionVision.mission.body}</p>
            </div>
            <ol className={styles.principleList}>
              {principles.items.map((item, index) => (
                <li key={item} className={styles.principle}>
                  <span className={styles.principleIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* --- 05 FAQ + CTA ------------------------------------------------ */}
      <section className={styles.faq} aria-label="Questions">
        <div className={styles.container}>
          <div className={styles.split}>
            <div className={styles.splitHead}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowIndex}>05</span>
                {faq.label}
              </p>
              <h2 className={styles.h2}>Frequently asked</h2>
            </div>

            <div className={styles.faqList}>
              {faq.entries.map((item) => (
                <details key={item.question} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>
                    <span>{item.question}</span>
                    <span className={styles.faqIcon} aria-hidden="true" />
                  </summary>
                  <p className={styles.faqAnswer}>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className={styles.cta} aria-label="Advisory">
            <div>
              <p className={styles.ctaKicker}>Founder-led sales advisory</p>
              <h3 className={styles.ctaHeadline}>{cta.primary.text}</h3>
            </div>
            <div className={styles.ctaActions}>
              <Link href={cta.primary.href} className={styles.btnLight}>
                {cta.primary.label} <span aria-hidden="true">→</span>
              </Link>
              <a
                href={cta.secondary.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSecondary}
              >
                {cta.secondary.label} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}
