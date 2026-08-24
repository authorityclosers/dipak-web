import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { authorityClosersCta } from "@/features/site-chrome";
import { ContactForm } from "./ContactForm";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact Dipak Vishwakarma — Founder of Authority Closers",
  description:
    "Good conversations begin with clarity. Connect with Dipak Vishwakarma for keynotes, advisory, interviews, partnerships, and high-ticket sales engineering.",
  alternates: {
    canonical: "https://dipakvishwakarma.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main className={styles.contactPage}>
      {/* --- Section 1: Hero ("Clarity Before Contact") ---------------- */}
      <section className={styles.heroSection} aria-label="Contact Dipak Vishwakarma">
        <div className={styles.pageContainer}>
          <div className={styles.heroGrid}>
            <div className={styles.heroHeaderBlock}>
              <span className={styles.chapterEyebrow}>01 — CONTACT</span>
              <h1 className={styles.heroHeadline}>
                Good conversations
                <br />
                <em className={styles.headlineItalic}>begin with clarity.</em>
              </h1>
              <p className={styles.heroSubhead}>
                For speaking, advisory, interviews, or strategic partnerships—choose the conversation that best fits.
              </p>

              <div className={styles.heroLocationBadge}>
                <span className={styles.locationDot} aria-hidden="true" />
                <span className={styles.locationText}>Pune, India · Global Engagements</span>
              </div>
            </div>

            <div className={styles.heroPortraitWrapper}>
              <div className={styles.heroPortraitFrame}>
                <Image
                  src="/media/dipak-vishwakarma-portrait-connect.webp"
                  alt="Dipak Vishwakarma — Founder of Authority Closers"
                  fill
                  priority
                  sizes="(max-width: 960px) 100vw, 380px"
                  className={styles.heroPortraitImg}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: Main Decision-to-Conversation Stage ------------ */}
      <section className={styles.mainSection}>
        <div className={styles.pageContainer}>
          <div className={styles.layoutGrid}>
            {/* Left Column: Interactive Progressive Experience */}
            <div className={styles.formColumn}>
              <Suspense fallback={<div className={styles.formSkeleton} />}>
                <ContactForm />
              </Suspense>
            </div>

            {/* Right Column: Other Paths (Clean Semantic Aside) */}
            <aside className={styles.asideColumn} aria-label="Alternative Engagement Paths">
              <div className={styles.asideStickyWrapper}>
                <div className={styles.asideHeaderRow}>
                  <span className={styles.asideKicker}>OTHER PATHS</span>
                </div>

                {/* Venture Card */}
                <div className={styles.asideVentureCard}>
                  <span className={styles.asideVentureTag}>01 / FLAGSHIP VENTURE</span>
                  <h4 className={styles.asideVentureTitle}>Authority Closers™</h4>
                  <p className={styles.asideVentureText}>
                    Institutional sales training, simulated roleplay labs, and deal architecture programs.
                  </p>
                  <a
                    className={styles.asideVentureBtn}
                    href={authorityClosersCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ac-event={authorityClosersCta.event}
                    data-ac-surface="contact-aside"
                  >
                    <span>Visit Authority Closers</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>

                {/* Direct Dialogue Channels */}
                <div className={styles.asideSocialCard}>
                  <span className={styles.asideSocialTag}>02 / DIRECT CHANNELS</span>
                  <ul className={styles.asideSocialList}>
                    <li>
                      <a
                        className={styles.asideSocialLink}
                        href="https://www.linkedin.com/in/dipak-vishwakarma"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className={styles.asideSocialIconBox}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect x="2" y="9" width="4" height="12" />
                            <circle cx="4" cy="4" r="2" />
                          </svg>
                        </span>
                        <span className={styles.asideSocialLabel}>LinkedIn</span>
                        <span className={styles.asideSocialArrow}>↗</span>
                      </a>
                    </li>
                    <li>
                      <a
                        className={styles.asideSocialLink}
                        href="https://youtube.com/@dipakvishwakarmasalescoach"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className={styles.asideSocialIconBox}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                          </svg>
                        </span>
                        <span className={styles.asideSocialLabel}>YouTube</span>
                        <span className={styles.asideSocialArrow}>↗</span>
                      </a>
                    </li>
                    <li>
                      <a
                        className={styles.asideSocialLink}
                        href="https://www.instagram.com/dipakv.sales"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className={styles.asideSocialIconBox}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                        </span>
                        <span className={styles.asideSocialLabel}>Instagram</span>
                        <span className={styles.asideSocialArrow}>↗</span>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Location / Direct Note */}
                <div className={styles.asideLocationCard}>
                  <div className={styles.locationDot} aria-hidden="true" />
                  <span className={styles.locationText}>Pune, India · Global Engagements</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* --- Section 3: Grand Closing Typographic Horizon -------------- */}
      <section className={styles.closingHorizon}>
        <div className={styles.pageContainer}>
          <div className={styles.closingContent}>
            <span className={styles.closingKicker}>THE PRINCIPLE</span>
            <h2 className={styles.closingHeadline}>
              Certainty starts with a <em className={styles.closingItalic}>conversation.</em>
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
}
