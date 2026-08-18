"use client";

import { useCallback, useState } from "react";
import {
  useIsHydrated,
  usePrefersReducedMotion,
  useSaveData,
} from "./useClientEnvironment";
import styles from "./editorial.module.css";

interface BackgroundMediaProps {
  /**
   * Path to a looping background video under /public (e.g. "/media/loop.mp4").
   * When omitted, the poster image alone is used — so sections render
   * correctly today and gain video the moment a file is dropped in.
   */
  src?: string;
  /** Always required: the still shown before/instead of video. */
  poster: string;
  /** Darkening veil over the media so overlaid text stays readable. */
  overlay?: "none" | "soft" | "strong";
  className?: string;
}

/**
 * Cinematic background layer with a poster-first contract.
 *
 * Deliberately degrades in four steps rather than failing:
 *   1. No `src`            -> poster image only.
 *   2. Reduced motion      -> poster image only, video never loads.
 *   3. Data saver on       -> poster image only.
 *   4. Video fails to play -> poster stays, error swallowed.
 *
 * This is why `poster` is required and `src` is not: dropping an mp4 into
 * /public/media and passing its path is the only change needed to go live
 * with video, and removing it degrades cleanly instead of leaving a gap.
 */
export function BackgroundMedia({
  src,
  poster,
  overlay = "soft",
  className = "",
}: BackgroundMediaProps) {
  const [failed, setFailed] = useState(false);
  const isHydrated = useIsHydrated();
  const prefersReduced = usePrefersReducedMotion();
  const saveData = useSaveData();

  const useVideo =
    Boolean(src) && isHydrated && !prefersReduced && !saveData && !failed;

  // Autoplay can reject (browser policy, decode failure). Fall back to the
  // poster rather than leaving a blank or stalled video element.
  const attachVideo = useCallback((node: HTMLVideoElement | null) => {
    if (!node) return;
    void node.play().catch(() => setFailed(true));
  }, []);

  return (
    <div className={`${styles.bgMedia} ${className}`} aria-hidden="true">
      <div
        className={styles.bgPoster}
        style={{ backgroundImage: `url(${poster})` }}
      />

      {useVideo && src ? (
        <video
          ref={attachVideo}
          className={styles.bgVideo}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
        />
      ) : null}

      {overlay !== "none" ? (
        <div
          className={`${styles.bgOverlay} ${
            overlay === "strong" ? styles.bgOverlayStrong : ""
          }`}
        />
      ) : null}

      <div className={styles.bgGrain} />
    </div>
  );
}
