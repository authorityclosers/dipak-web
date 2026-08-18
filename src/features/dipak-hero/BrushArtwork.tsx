import { useId } from "react";
import styles from "./dipak-hero.module.css";

// Logical 1000x1000 centerline for the animated reveal mask path matching the sweeping Ensō master curve
const ENSO_CENTERLINE =
  "M 840 310 C 740 190, 540 115, 320 145 C 155 300, 105 520, 160 740 C 320 890, 540 930, 750 860 C 800 810, 840 750, 860 690";

export function BrushArtwork({ className }: { className?: string }) {
  const rawId = useId();
  const maskId = `enso-reveal-${rawId.replace(/:/g, "")}`;

  return (
    <svg
      className={className}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      data-hero-halo="true"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
          <rect width="1000" height="1000" fill="black" />
          {/* Animated reveal path uncovering the authentic brush master texture */}
          <path
            className={styles.ensoRevealPath}
            d={ENSO_CENTERLINE}
            pathLength="1"
            fill="none"
            stroke="white"
            strokeWidth="250"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>
      </defs>

      {/* High-Resolution Authentic Natural-Media Brush Master Texture */}
      <image
        href="/hero/enso-brush-master.webp"
        x="0"
        y="0"
        width="1000"
        height="1000"
        preserveAspectRatio="none"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
