"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroCta, NavLink } from "./hero.types";
import styles from "./dipak-hero.module.css";

interface MobileNavProps {
  navLinks: NavLink[];
  ctas: HeroCta[];
  brandFirstLine: string;
  brandSecondLine: string;
}

export function MobileNav({
  navLinks,
  ctas,
  brandFirstLine,
  brandSecondLine,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Body scroll locking and Escape key handling
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Auto-focus close button when menu opens
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleCloseAndReturnFocus = () => {
    closeMenu();
    triggerRef.current?.focus();
  };

  const secondaryCta = ctas.find((c) => c.kind === "secondary" && Boolean(c.href)) || ctas[0];

  return (
    <>
      {/* Hamburger Trigger Button */}
      <button
        ref={triggerRef}
        className={styles.hamburgerBtn}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-primary-navigation"
        type="button"
        onClick={toggleMenu}
      >
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
      </button>

      {/* Full-Screen Editorial Mobile Drawer */}
      <div
        id="mobile-primary-navigation"
        className={`${styles.mobileDrawer} ${isOpen ? styles.mobileDrawerOpen : ""}`}
        aria-hidden={!isOpen}
      >
        {/* Drawer Header */}
        <div className={styles.drawerHeader}>
          <a
            className={styles.wordmark}
            href="#hero"
            onClick={handleCloseAndReturnFocus}
            tabIndex={isOpen ? 0 : -1}
          >
            <span className={styles.wordmarkFirst}>{brandFirstLine}</span>
            <span className={styles.wordmarkSecond}>{brandSecondLine}</span>
          </a>

          <button
            ref={closeBtnRef}
            className={styles.drawerCloseBtn}
            aria-label="Close navigation menu"
            type="button"
            onClick={handleCloseAndReturnFocus}
            tabIndex={isOpen ? 0 : -1}
          >
            <span aria-hidden="true" className={styles.closeIcon}>
              ✕
            </span>
          </button>
        </div>

        {/* Numbered Editorial Navigation Links */}
        <nav className={styles.drawerNav} aria-label="Mobile navigation">
          {navLinks.map((link, index) => {
            const num = (index + 1).toString().padStart(2, "0");
            return (
              <a
                key={link.label}
                href={link.href}
                className={`${styles.drawerNavLink} ${link.active ? styles.drawerNavLinkActive : ""}`}
                onClick={handleCloseAndReturnFocus}
                tabIndex={isOpen ? 0 : -1}
              >
                <span className={styles.drawerNavIndex} aria-hidden="true">
                  {num}
                </span>
                <span className={styles.drawerNavLabel}>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Drawer Bottom CTA */}
        {secondaryCta?.href ? (
          <div className={styles.drawerFooter}>
            <div className={styles.drawerDivider} aria-hidden="true" />
            <a
              href={secondaryCta.href}
              className={styles.drawerCta}
              onClick={handleCloseAndReturnFocus}
              tabIndex={isOpen ? 0 : -1}
              data-ac-event={secondaryCta.event}
              data-ac-event-schema="1"
              data-ac-surface="dipak-public-hero-mobile-drawer"
            >
              <span>{secondaryCta.label}</span>
              <span aria-hidden="true" className={styles.drawerCtaArrow}>
                →
              </span>
            </a>
          </div>
        ) : null}
      </div>
    </>
  );
}
