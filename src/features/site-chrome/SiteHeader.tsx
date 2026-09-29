"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authorityClosersCta, primaryNav, socialLinks } from "./site.content";
import styles from "./site-chrome.module.css";

const EVENT_SCHEMA_VERSION = "1";

/**
 * The one site header. Fixed on every route, including Home.
 *
 * It starts transparent over the page's own canvas and gains a solid surface
 * and hairline after 24px of scroll, so it never competes with a hero but is
 * always reachable.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the drawer on route change so back/forward never strands it open.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll behind the drawer, and restore it on unmount.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>

      <header
        className={`${styles.header} ${scrolled || menuOpen ? styles.headerScrolled : ""}`}
        data-site-header="true"
      >
        <Link className={styles.brandLink} href="/" aria-label="Dipak Vishwakarma — home">
          <Image
            src="/branding/dipak-signature-full-black.webp"
            alt="Dipak Vishwakarma"
            width={180}
            height={76}
            className={styles.headerSignatureImg}
            priority
            unoptimized
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ""}`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <a
            className={styles.navCta}
            href={authorityClosersCta.href}
            target="_blank"
            rel="noopener noreferrer"
            data-ac-event={authorityClosersCta.event}
            data-ac-event-schema={EVENT_SCHEMA_VERSION}
            data-ac-surface="site-header"
          >
            Authority Closers
            <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="site-mobile-drawer"
          data-ac-event="public.global.mobile_nav_toggled"
          data-ac-event-schema={EVENT_SCHEMA_VERSION}
        >
          <span className="srOnly">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span
            className={`${styles.menuBar} ${menuOpen ? styles.menuBarTopOpen : ""}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.menuBar} ${menuOpen ? styles.menuBarBottomOpen : ""}`}
            aria-hidden="true"
          />
        </button>
      </header>

      {menuOpen ? (
        <div id="site-mobile-drawer" className={styles.drawer} role="dialog" aria-modal="true">
          <nav className={styles.drawerNav} aria-label="Mobile">
            {primaryNav.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.drawerLink} ${isActive(link.href) ? styles.drawerLinkActive : ""}`}
                style={{ "--i": index } as React.CSSProperties}
              >
                <span className={styles.drawerIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.drawerFoot}>
            <a
              className={styles.drawerCta}
              href={authorityClosersCta.href}
              target="_blank"
              rel="noopener noreferrer"
              data-ac-event={authorityClosersCta.event}
              data-ac-event-schema={EVENT_SCHEMA_VERSION}
              data-ac-surface="mobile-drawer"
            >
              {authorityClosersCta.label}
              <span aria-hidden="true">↗</span>
            </a>
            <ul className={styles.drawerSocial}>
              {socialLinks
                .filter((link) => link.href.startsWith("http"))
                .map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
