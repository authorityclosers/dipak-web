import Image from "next/image";
import Link from "next/link";
import { connectContent } from "./connect.content";
import styles from "./connect.module.css";

function LinkIcon({ type }: { type: string }) {
  switch (type) {
    case "authority":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case "about":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "contact":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "youtube":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "instagram":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "articles":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case "videos":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      );
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
  }
}

export function ConnectHub() {
  return (
    <main className={styles.connectPage}>
      <div className={styles.connectContainer}>
        {/* Profile Card Header */}
        <header className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarInner}>
              <Image
                src={connectContent.portrait.src}
                alt={connectContent.portrait.alt}
                width={140}
                height={140}
                priority
                quality={92}
                className={styles.avatarImg}
              />
            </div>
            <span className={styles.verifiedBadge} title="Verified Official Profile">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          </div>

          <div className={styles.nameBlock}>
            <h1 className={styles.profileName}>{connectContent.name}</h1>
            <p className={styles.profileTitle}>{connectContent.title}</p>
          </div>

          <p className={styles.profileBio}>{connectContent.bio}</p>

          <div className={styles.locationPill}>
            <span className={styles.locationDot} aria-hidden="true" />
            <span>{connectContent.location}</span>
          </div>
        </header>

        {/* Quick Social Buttons */}
        <nav className={styles.socialBar} aria-label="Social shortcuts">
          <a
            className={styles.socialBtn}
            href="https://www.linkedin.com/in/dipak-vishwakarma"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
          >
            <LinkIcon type="linkedin" />
            <span>LinkedIn</span>
          </a>
          <a
            className={styles.socialBtn}
            href="https://youtube.com/@dipakvishwakarmasalescoach"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube Channel"
          >
            <LinkIcon type="youtube" />
            <span>YouTube</span>
          </a>
          <a
            className={styles.socialBtn}
            href="https://www.instagram.com/dipakv.sales"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram Profile"
          >
            <LinkIcon type="instagram" />
            <span>Instagram</span>
          </a>
        </nav>

        {/* Links Directory */}
        <ul className={styles.linksList} aria-label="Official Links">
          {connectContent.links.map((item) => {
            const cardClasses = `${styles.linkCard} ${item.featured ? styles.linkCardFeatured : ""}`;

            if (item.isExternal) {
              return (
                <li key={item.id}>
                  <a
                    className={cardClasses}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ac-event="connect.link_clicked"
                    data-ac-item={item.id}
                  >
                    <div className={styles.linkCardLeft}>
                      <div className={styles.iconWrapper}>
                        <LinkIcon type={item.iconType} />
                      </div>
                      <div className={styles.linkInfo}>
                        <div className={styles.titleRow}>
                          <h2 className={styles.linkTitle}>{item.title}</h2>
                          {item.badge ? (
                            <span className={styles.itemBadge}>{item.badge}</span>
                          ) : null}
                        </div>
                        <p className={styles.linkSubtitle}>{item.subtitle}</p>
                      </div>
                    </div>
                    <span className={styles.arrowRight} aria-hidden="true">
                      →
                    </span>
                  </a>
                </li>
              );
            }

            return (
              <li key={item.id}>
                <Link
                  className={cardClasses}
                  href={item.url}
                  data-ac-event="connect.link_clicked"
                  data-ac-item={item.id}
                >
                  <div className={styles.linkCardLeft}>
                    <div className={styles.iconWrapper}>
                      <LinkIcon type={item.iconType} />
                    </div>
                    <div className={styles.linkInfo}>
                      <div className={styles.titleRow}>
                        <h2 className={styles.linkTitle}>{item.title}</h2>
                        {item.badge ? (
                          <span className={styles.itemBadge}>{item.badge}</span>
                        ) : null}
                      </div>
                      <p className={styles.linkSubtitle}>{item.subtitle}</p>
                    </div>
                  </div>
                  <span className={styles.arrowRight} aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Footer Area */}
        <footer className={styles.connectFooter}>
          <Image
            src="/branding/dipak-signature-full-black.webp"
            alt="Dipak Vishwakarma Signature"
            width={160}
            height={68}
            className={styles.signatureLogo}
          />
          <p className={styles.footerNote}>{connectContent.footerNote}</p>
          <Link href="/" className={styles.bottomHomeLink}>
            ← Return to Official Website
          </Link>
        </footer>
      </div>
    </main>
  );
}
