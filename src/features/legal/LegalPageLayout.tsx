import Link from "next/link";
import { PageHero } from "@/features/editorial";
import editorial from "@/features/editorial/editorial.module.css";
import type { LegalDocument } from "./legal.content";
import styles from "./legal.module.css";

interface LegalPageLayoutProps {
  document: LegalDocument;
  indexNumber: string;
}

export function LegalPageLayout({ document, indexNumber }: LegalPageLayoutProps) {
  return (
    <>
      <PageHero
        eyebrow={document.eyebrow}
        index={indexNumber}
        headline={document.headline}
        body={[document.summary]}
      />

      <section className={`${editorial.section} ${styles.legalContainer}`}>
        <div className={`${editorial.container} ${styles.legalGrid}`}>
          {/* Sticky Table of Contents */}
          <aside className={styles.tocWrapper} aria-label="Table of contents">
            <div className={styles.tocHeader}>
              <span className={styles.tocDot} aria-hidden="true" />
              <span className={styles.tocTitle}>Contents</span>
            </div>
            <nav>
              <ul className={styles.tocList}>
                {document.sections.map((section) => (
                  <li key={section.id}>
                    <a className={styles.tocLink} href={`#${section.id}`}>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Legal Content */}
          <article className={styles.documentArea}>
            <header className={styles.documentMetaHeader}>
              <div className={styles.metaRow}>
                <span className={styles.badge}>Official Policy</span>
                <span className={styles.metaDate}>
                  Last Updated: {document.lastUpdated}
                </span>
                <span className={styles.metaDate}>
                  Effective: {document.effectiveDate}
                </span>
              </div>
              <p className={styles.documentSummary}>{document.summary}</p>
            </header>

            {document.sections.map((section) => (
              <section key={section.id} id={section.id} className={styles.legalSection}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>

                {section.content.map((p, idx) => (
                  <p key={idx} className={styles.paragraph}>
                    {p}
                  </p>
                ))}

                {section.highlightBox ? (
                  <aside className={styles.highlightBox} aria-label={section.highlightBox.title}>
                    <h3 className={styles.highlightTitle}>{section.highlightBox.title}</h3>
                    <p className={styles.highlightText}>{section.highlightBox.text}</p>
                  </aside>
                ) : null}

                {section.listItems && section.listItems.length > 0 ? (
                  <ul className={styles.legalList}>
                    {section.listItems.map((item, idx) => (
                      <li key={idx} className={styles.legalListItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.subsections?.map((sub, sIdx) => (
                  <div key={sIdx} className={styles.subsection}>
                    <h3 className={styles.subsectionTitle}>{sub.title}</h3>
                    {sub.content.map((subP, pIdx) => (
                      <p key={pIdx} className={styles.paragraph}>
                        {subP}
                      </p>
                    ))}
                    {sub.listItems && sub.listItems.length > 0 ? (
                      <ul className={styles.legalList}>
                        {sub.listItems.map((sItem, lIdx) => (
                          <li key={lIdx} className={styles.legalListItem}>
                            {sItem}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </section>
            ))}

            {/* Bottom Contact / Inquiries Box */}
            <div className={styles.bottomContactCard}>
              <h3 className={styles.contactCardTitle}>Questions or Legal Inquiries?</h3>
              <p className={styles.contactCardText}>
                If you have questions regarding this {document.title.toLowerCase()}, intellectual property permissions, or data protection practices, please contact our team directly.
              </p>
              <div className={styles.contactActions}>
                <Link className={styles.primaryContactBtn} href="/contact">
                  Contact Dipak Vishwakarma <span aria-hidden="true">→</span>
                </Link>
                <a
                  className={styles.secondaryContactLink}
                  href="https://authorityclosers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore Authority Closers
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
