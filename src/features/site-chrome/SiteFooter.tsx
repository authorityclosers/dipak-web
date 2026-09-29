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

function SocialGlyph({ label }: { label: string }) {
  switch (label.toLowerCase()) {
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      );
  }
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <div className={styles.footerInner}>
        <div className={styles.footerBrandBlock}>
          <Link className={styles.footerBrandLink} href="/" aria-label="Dipak Vishwakarma — home">
            <Image
              src="/branding/dipak-signature-full-white.webp"
              alt="Dipak Vishwakarma"
              width={220}
              height={92}
              className={styles.footerSignatureImg}
              unoptimized
            />
          </Link>
          <p className={styles.footerPhilosophy}>{footerContent.philosophyLine}</p>
          <p className={styles.footerPositioning}>{siteBrand.positioning}</p>
          <p className={styles.footerLocation}>{siteBrand.location}</p>
        </div>

        <div className={styles.footerNavBlock}>
          <span className={styles.footerColHeader}>{footerSections.navigation.label}</span>
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

        <div className={styles.footerDialogueBlock}>
          <span className={styles.footerColHeader}>{footerSections.dialogue.label}</span>
          <ul className={styles.footerNavList}>
            {footerSections.dialogue.links.map((link) =>
              link.isExternal ? (
                <li key={link.href}>
                  <a
                    className={styles.footerSocialLink}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.socialGlyph}>
                      <SocialGlyph label={link.label} />
                    </span>
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.href}>
                  <Link className={styles.footerSocialLink} href={link.href}>
                    <span className={styles.socialGlyph}>
                      <SocialGlyph label={link.label} />
                    </span>
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className={styles.footerVentureBlock}>
          <span className={styles.footerColHeader}>{footerSections.venture.label}</span>
          <h3 className={styles.ventureTitle}>{footerSections.venture.title}</h3>
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
            {footerSections.venture.cta.label}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

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

        <span className={styles.footerCopyright}>
          © {year} {footerContent.copyright}
        </span>
      </div>
    </footer>
  );
}
