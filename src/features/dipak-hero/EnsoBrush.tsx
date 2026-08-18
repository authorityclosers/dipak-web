import React from "react";

export function EnsoBrush({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-hero-halo="true"
      aria-hidden="true"
    >
      <defs>
        {/* Soft Organic Dry-Brush Ink Filter */}
        <filter id="enso-brush-filter" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.09"
            numOctaves="3"
            seed="27"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="14"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="0.8" result="softened" />
          <feMerge>
            <feMergeNode in="softened" />
            <feMergeNode in="displaced" opacity="0.65" />
          </feMerge>
        </filter>

        {/* Linear and Radial Gradients for Authentic Calligraphic Ink Density */}
        <radialGradient id="brush-wash" cx="46%" cy="48%" r="45%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#11110f" stopOpacity="0" />
          <stop offset="52%" stopColor="#11110f" stopOpacity="0.04" />
          <stop offset="72%" stopColor="#11110f" stopOpacity="0.11" />
          <stop offset="90%" stopColor="#11110f" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#11110f" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Primary Sweeping Calligraphic Arc */}
      <g filter="url(#enso-brush-filter)">
        {/* Deep Ink Foundation Stroke */}
        <path
          d="M 680 180 C 450 140, 240 260, 190 480 C 140 700, 290 890, 520 900 C 740 910, 890 760, 900 560"
          stroke="rgba(17, 17, 15, 0.08)"
          strokeWidth="140"
          strokeLinecap="round"
        />

        {/* Dynamic Main Body Flow */}
        <path
          d="M 720 200 C 480 150, 260 280, 210 500 C 160 710, 310 880, 540 880 C 730 880, 880 740, 880 540"
          stroke="rgba(17, 17, 15, 0.07)"
          strokeWidth="95"
          strokeLinecap="round"
        />

        {/* Fine Dry Bristle Sweeps */}
        <path
          d="M 650 160 C 420 120, 220 240, 170 460 C 120 680, 260 910, 500 920 C 730 930, 910 770, 920 540"
          stroke="rgba(17, 17, 15, 0.04)"
          strokeWidth="45"
          strokeLinecap="round"
        />

        {/* Inner Taper Feather Stroke */}
        <path
          d="M 760 240 C 530 180, 320 300, 260 510 C 210 700, 350 850, 560 850"
          stroke="rgba(17, 17, 15, 0.05)"
          strokeWidth="55"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
