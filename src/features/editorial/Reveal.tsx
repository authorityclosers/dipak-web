"use client";

import { useCallback, useState, type ReactNode } from "react";
import { useIsHydrated, usePrefersReducedMotion } from "./useClientEnvironment";
import styles from "./editorial.module.css";

interface RevealProps {
  children: ReactNode;
  /** Stagger index — multiplies the delay step. */
  index?: number;
  /** Reveal direction. "up" is the editorial default. */
  from?: "up" | "left" | "scale";
  className?: string;
  as?: "div" | "li" | "section" | "article";
}

/**
 * Scroll-triggered reveal.
 *
 * Uses IntersectionObserver rather than GSAP ScrollTrigger: these are simple
 * one-shot entrances across many static pages, and IO avoids paying for a
 * scroll-scrubbed timeline the page does not need. The homepage's pinned act
 * choreography still uses GSAP, where scrubbing is the whole point.
 *
 * The hidden state is only armed after hydration, so server-rendered and
 * no-JS output is always visible — the animation can never strand content.
 */
export function Reveal({
  children,
  index = 0,
  from = "up",
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const [shown, setShown] = useState(false);
  const isHydrated = useIsHydrated();
  const prefersReduced = usePrefersReducedMotion();

  const armed = isHydrated && !prefersReduced;
  const visible = shown || !armed;

  // Ref callback rather than an effect: React 19 runs the returned cleanup
  // when the node detaches, so the observer's lifetime tracks the element.
  const attachObserver = useCallback(
    (node: HTMLElement | null) => {
      if (!node || !armed) return;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setShown(true);
              observer.disconnect();
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );

      observer.observe(node);
      return () => observer.disconnect();
    },
    [armed],
  );

  return (
    <Tag
      ref={attachObserver as never}
      className={`${styles.reveal} ${styles[`revealFrom_${from}`]} ${
        armed ? styles.revealArmed : ""
      } ${visible ? styles.revealShown : ""} ${className}`}
      style={{ "--reveal-index": index } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
