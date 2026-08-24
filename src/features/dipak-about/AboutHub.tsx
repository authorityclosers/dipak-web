import Image from "next/image";
import Link from "next/link";
import { aboutContent } from "./about.content";
import styles from "./about-hub.module.css";

export function AboutHub() {
  const { hero, story, journey, philosophy, principles, missionVision, faq, cta } =
    aboutContent;

  return (
    <article className={styles.aboutSection} aria-label="About Dipak Vishwakarma">
      {/* Clean Ivory Background Canvas */}
      <div className={styles.ensoWatermark} aria-hidden="true" />

      {/* --- Section 1: Hero Editorial Profile ---------------------------- */}
      <section className={styles.heroSection} aria-label="Executive Profile">
        <div className={styles.pageContainer}>
          <div className={styles.heroGrid}>
            {/* Left Narrative Column */}
            <div className={styles.heroCopy}>
              <p className={styles.chapterEyebrow}>{hero.chapter}</p>

              <h1 className={styles.heroHeadline}>
                {hero.headlineLine1}
                <br />
                {hero.headlineLine2People}{" "}
                <em className={styles.headlineItalic}>{hero.headlineLine2Decide}</em>
              </h1>

              <p className={styles.heroThesis}>{hero.thesis}</p>

              <blockquote className={styles.editorialQuote}>
                What interests me is not pressure or hype. It is{" "}
                <strong className={styles.highlightWord}>certainty</strong> — what creates it, what destroys it, and how people make confident high-stakes decisions.
              </blockquote>

              <div className={styles.heroActionsRow}>
                <a href={hero.actions.primary.href} className={styles.heroPrimaryBtn}>
                  {hero.actions.primary.label}
                </a>
                <Link href={hero.actions.secondary.href} className={styles.heroSecondaryBtn}>
                  {hero.actions.secondary.label}
                </Link>
              </div>

              {/* Semantic Identity Rail */}
              <div className={styles.identityRail}>
                {hero.identityRail.map((item, idx) => (
                  <div key={idx} className={styles.identityItem}>
                    <span className={styles.identityRole}>{item.role}</span>
                    <span className={styles.identityEntity}>{item.entity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Art-Directed Portrait Column */}
            <figure className={styles.portraitFigure}>
              <div className={styles.portraitFrame}>
                <Image
                  src="/media/01_dsc06974.webp"
                  alt="Dipak Vishwakarma — Founder of Authority Closers"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className={styles.portraitImage}
                />
              </div>
              <figcaption className={styles.portraitCaption}>
                [ Fig. 01 ] — {hero.portraitCaption}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* --- Section 2: My Story ------------------------------------------ */}
      <section className={styles.storySection} aria-label="Origin Narrative">
        <div className={styles.pageContainer}>
          <div className={styles.storyGrid}>
            <div className={styles.storyLeft}>
              <span className={styles.sectionHeaderKicker}>
                02 — {story.label.toUpperCase()}
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

      {/* --- Section 3: Journey (Progressive Evolution Spine) ----------- */}
      <section className={styles.journeySection} aria-label="Evolution & Milestones">
        <div className={styles.pageContainer}>
          <div className={styles.journeyLayout}>
            {/* Left Sticky Intellectual Intro */}
            <div className={styles.journeyStickyIntro}>
              <span className={styles.sectionHeaderKicker}>
                03 — {journey.label.toUpperCase()}
              </span>
              <h2 className={styles.sectionHeaderTitle}>
                {journey.headlineLine1}
                <br />
                <em className={styles.headlineItalic}>{journey.headlineLine2}</em>
              </h2>
              <p className={styles.journeySubhead}>{journey.subhead}</p>

              {/* Cognitive Maturity Ladder Indicator */}
              <div className={styles.maturityLadder}>
                <span className={styles.ladderKicker}>Strategic Maturity Track</span>
                <ol className={styles.ladderList}>
                  {journey.stages.map((stage) => (
                    <li key={stage.index} className={styles.ladderItem}>
                      <span className={styles.ladderIndex}>[{stage.index}]</span>
                      <span className={styles.ladderTitle}>{stage.title}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right Connected Evolution Spine (Phases 01 to 04) */}
            <div className={styles.evolutionSpine}>
              <div className={styles.spineRail} aria-hidden="true" />

              {/* Sequential Evolution Chapters (Phases 01 to 04) */}
              <div className={styles.evolutionChapters}>
                {journey.stages.slice(0, 4).map((stage) => (
                  <div key={stage.index} className={styles.evolutionNode}>
                    <div className={styles.nodeMarker}>
                      <span className={styles.nodeNumeral}>{stage.numeral}</span>
                    </div>

                    <div className={styles.nodeContent}>
                      <div className={styles.nodeMetaRow}>
                        <span className={styles.nodePhaseTag}>{stage.phase}</span>
                        <span className={styles.nodeFocusBadge}>{stage.focus}</span>
                      </div>

                      <h3 className={styles.nodeTitle}>{stage.title}</h3>
                      <p className={styles.nodeBody}>{stage.body}</p>

                      <div className={styles.nodeInsightBlock}>
                        <span className={styles.nodeInsightLabel}>The Core Epiphany</span>
                        <blockquote className={styles.nodeInsightQuote}>
                          &ldquo;{stage.takeaway}&rdquo;
                        </blockquote>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grand Full-Width Culmination Apex (Phase 05 - Authority Closers™) */}
          {journey.stages[4] && (
            <div className={styles.apexFullWidthWrapper}>
              <div className={styles.apexMilestoneCard}>
                <div className={styles.apexAtmosphere} aria-hidden="true" />
                <div className={styles.apexCardContent}>
                  <div className={styles.apexLeft}>
                    <div className={styles.apexBadgeRow}>
                      <span className={styles.apexTag}>★ THE APEX · CURRENT INSTITUTIONAL ERA</span>
                      <span className={styles.apexIndex}>[05 / 05]</span>
                    </div>
                    <h3 className={styles.apexTitle}>{journey.stages[4].title}</h3>
                    <span className={styles.apexFocusBadge}>{journey.stages[4].focus}</span>
                    <p className={styles.apexBody}>{journey.stages[4].body}</p>
                    <div className={styles.apexInsightBox}>
                      <span className={styles.apexInsightLabel}>The Core Paradigm</span>
                      <p className={styles.apexInsightText}>
                        {journey.stages[4].takeaway}
                      </p>
                    </div>
                  </div>

                  <div className={styles.apexRight}>
                    <span className={styles.apexCtaKicker}>Flagship Venture</span>
                    <p className={styles.apexCtaBody}>
                      Turning high-ticket consultative selling into an institutional, practice-driven discipline.
                    </p>
                    <a
                      href="https://authorityclosers.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.apexBtn}
                    >
                      <span>Explore Authority Closers</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- Section 4: Philosophy (The Sticky Manifesto Ledger) --------- */}
      <section id="philosophy" className={styles.philosophySection} aria-label="Core Philosophy">
        <div className={styles.pageContainer}>
          <div className={styles.philosophyLayout}>
            {/* Left Sticky Intellectual Anchor */}
            <div className={styles.philosophyStickyCol}>
              <span className={styles.sectionHeaderKicker}>
                04 — {philosophy.label.toUpperCase()}
              </span>
              <h2 className={styles.sectionHeaderTitle}>
                {philosophy.headlineLine1}
                <br />
                <em className={styles.headlineItalic}>{philosophy.headlineLine2}</em>
              </h2>
              <p className={styles.philosophySubhead}>{philosophy.subhead}</p>

              {/* Quick Philosophy Ledger Index */}
              <div className={styles.philosophyLedgerBox}>
                <span className={styles.ledgerBoxKicker}>Pillars of Decision Psychology</span>
                <ol className={styles.ledgerList}>
                  {philosophy.entries.map((entry) => (
                    <li key={entry.index} className={styles.ledgerItem}>
                      <span className={styles.ledgerIndex}>[{entry.index}]</span>
                      <span className={styles.ledgerText}>
                        {entry.statementPrefix} <em>{entry.accentWord}</em>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Epistemological Footnote */}
              <p className={styles.philosophyFootnote}>
                &ldquo;{philosophy.footnote}&rdquo;
              </p>
            </div>

            {/* Right Flowing Manifesto Stream */}
            <div className={styles.philosophyStreamCol}>
              {philosophy.entries.map((entry) => (
                <article key={entry.index} className={styles.manifestoCard}>
                  <div className={styles.manifestoCardHeader}>
                    <span className={styles.manifestoCategoryTag}>{entry.category}</span>
                    <span className={styles.manifestoCardIndex}>[ {entry.index} / 04 ]</span>
                  </div>

                  <h3 className={styles.manifestoStatement}>
                    {entry.statementPrefix}{" "}
                    <em className={styles.manifestoItalic}>{entry.accentWord}</em>
                  </h3>

                  <p className={styles.manifestoExplanation}>{entry.elaboration}</p>

                  <div className={styles.manifestoImplicationBox}>
                    <span className={styles.implicationLabel}>Strategic Law</span>
                    <p className={styles.implicationText}>&ldquo;{entry.implication}&rdquo;</p>
                  </div>
                </article>
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
              05 — {principles.label.toUpperCase()}
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
              06 — {missionVision.label.toUpperCase()}
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
              07 — {faq.label.toUpperCase()}
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
