import Image from "next/image";
import Link from "next/link";
import {
  authorityClosersCta,
  footerContent,
  footerSections,
  siteBrand,
} from "./site.content";
import styles from "./site-chrome.module.css";

const EVENT_SCHEMA_VERSION = "1";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <div className={styles.footerInner}>
        {/* Column 1: Brand, Positioning & Location */}
        <div className={styles.footerBrandBlock}>
          <Link className={styles.footerBrandLink} href="/" aria-label="Dipak Vishwakarma — home">
            <Image
              src="/branding/dipak-signature-full-white.webp"
              alt="Dipak Vishwakarma"
              width={220}
              height={92}
              className={styles.footerSignatureImg}
            />
          </Link>

          <div className={styles.footerBrandMeta}>
            <span className={styles.footerPositioning}>{siteBrand.positioning}</span>
            <p className={styles.footerPhilosophy}>&ldquo;{footerContent.philosophyLine}&rdquo;</p>
            <div className={styles.footerLocationRow}>
              <span className={styles.footerLocationDot} aria-hidden="true" />
              <span className={styles.footerLocationText}>{siteBrand.location}</span>
            </div>
          </div>
        </div>

        {/* Column 2: Navigation Directory */}
        <div className={styles.footerNavBlock}>
          <span className={styles.footerColHeader}>01 / {footerSections.navigation.label}</span>
          <ul className={styles.footerNavList}>
            {footerSections.navigation.links.map((link) => (
              <li key={link.href}>
                <Link className={styles.footerLink} href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Direct Dialogue & Channels with Bespoke Themed Icons */}
        <div className={styles.footerDialogueBlock}>
          <span className={styles.footerColHeader}>02 / {footerSections.dialogue.label}</span>
          <ul className={styles.footerSocialList}>
            {footerSections.dialogue.links.map((link) => (
              <li key={link.href}>
                {link.isExternal ? (
                  <a
                    className={styles.footerSocialLink}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.socialIconBox}>
                      {link.label.toLowerCase() === "linkedin" && (
                        <svg className={styles.socialSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      )}
                      {link.label.toLowerCase() === "youtube" && (
                        <svg className={styles.socialSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                        </svg>
                      )}
                      {link.label.toLowerCase() === "instagram" && (
                        <svg className={styles.socialSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      )}
                    </span>
                    <span className={styles.socialLabelText}>{link.label}</span>
                    <span className={styles.externalArrow} aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <Link className={styles.footerSocialLink} href={link.href}>
                    <span className={styles.socialIconBox}>
                      <svg className={styles.socialSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </span>
                    <span className={styles.socialLabelText}>{link.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Flagship Venture Spotlight */}
        <div className={styles.footerVentureBlock}>
          <span className={styles.footerColHeader}>03 / {footerSections.venture.label}</span>
          <div className={styles.ventureCard}>
            <h4 className={styles.ventureTitle}>{footerSections.venture.title}</h4>
            <p className={styles.ventureDescription}>{footerSections.venture.description}</p>
            <a
              className={styles.ventureBtn}
              href={authorityClosersCta.href}
              target="_blank"
              rel="noopener noreferrer"
              data-ac-event={authorityClosersCta.event}
              data-ac-event-schema={EVENT_SCHEMA_VERSION}
              data-ac-surface="site-footer"
            >
              <span>{footerSections.venture.cta.label}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer Baseline */}
      <div className={styles.footerBaseline}>
        <ul className={styles.footerLegalList}>
          {footerContent.legalLinks.map((link) => (
            <li key={link.href}>
              <Link className={styles.footerLegalLink} href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.footerCopyright}>
          <span>Copyright © {year} {footerContent.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
