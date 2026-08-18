import { useId } from "react";

const ENSO_CENTERLINE =
  "M 720 175 C 555 110 345 145 220 315 C 120 455 145 680 300 810 C 455 940 695 885 835 710";

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
          <path
            className="ensoRevealPath"
            d={ENSO_CENTERLINE}
            pathLength="1"
            fill="none"
            stroke="white"
            strokeWidth="210"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>
      </defs>

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
