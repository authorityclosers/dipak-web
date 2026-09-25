"use client";

import { useEffect, useState } from "react";
import styles from "./editorial-preloader.module.css";

interface EditorialPreloaderProps {
  onReady?: () => void;
}

export function EditorialPreloader({ onReady }: EditorialPreloaderProps) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let active = true;

    async function waitForAssets() {
      // Do not hold the page behind a second image preload/decode queue. The
      // hero owns its single responsive high-priority image; this surface only
      // provides a short editorial handoff while fonts settle in the background.
      const fontReady =
        typeof document !== "undefined" && "fonts" in document
          ? document.fonts.ready.catch(() => undefined)
          : Promise.resolve();
      await Promise.race([
        fontReady,
        new Promise<void>((resolve) => setTimeout(resolve, 220)),
      ]);
      await new Promise((resolve) => setTimeout(resolve, 120));

      if (active) {
        setDismissed(true);
        if (onReady) {
          onReady();
        }
      }
    }

    waitForAssets();

    // Safety fallback: maximum 2.5s timeout
    const timer = setTimeout(() => {
      if (active) {
        setDismissed(true);
        if (onReady) onReady();
      }
    }, 2500);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [onReady]);

  return (
    <div
      className={`${styles.preloaderSurface} ${dismissed ? styles.dismissed : ""}`}
      aria-hidden={dismissed ? "true" : "false"}
      role="progressbar"
      aria-label="Loading Dipak Vishwakarma official folio"
    >
      <div className={styles.brandCenter}>
        <div className={styles.monogramWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/branding/dipak-monogram-white.webp"
            alt="Dipak Vishwakarma Monogram"
            width={64}
            height={42}
            className={styles.monogramImg}
          />
        </div>

        <div className={styles.brandWordmark}>
          <span className={styles.brandName}>DIPAK VISHWAKARMA</span>
          <span className={styles.brandKicker}>
            THE CERTAINTY BUILDER<span className={styles.redTm}>™</span>
          </span>
        </div>

        <div className={styles.progressBarContainer}>
          <div className={styles.progressBarFill} />
        </div>
      </div>
    </div>
  );
}
