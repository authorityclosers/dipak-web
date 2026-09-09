import React from "react";
import styles from "./editorial.module.css";

export interface EditorialSeparatorProps {
  /**
   * - "centered": Compact ornament (default ~240px - 360px wide) used below headlines/quotes (e.g. Act 4 Manifesto, Act 7 Bridge).
   * - "full": Expands 100% across the container with extended hairline rules (e.g. Act 3 Presence).
   */
  variant?: "centered" | "full";
  /** Inverted styling for dark/obsidian sections (e.g. Act 7 Bridge). */
  inverted?: boolean;
  className?: string;
  "data-story-axis"?: string;
}

export function EditorialSeparator({
  variant = "centered",
  inverted = false,
  className,
  "data-story-axis": dataStoryAxis,
}: EditorialSeparatorProps) {
  const containerClass = [
    styles.separatorWrapper,
    variant === "full" ? styles.separatorFull : styles.separatorCentered,
    inverted ? styles.separatorInverted : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  if (variant === "full") {
    return (
      <div
        className={containerClass}
        data-story-axis={dataStoryAxis}
        aria-hidden="true"
      >
        <svg
          className={styles.separatorSvgFull}
          viewBox="0 0 1396 34"
          preserveAspectRatio="none"
          fill="none"
        >
          <line
            x1="0"
            y1="17"
            x2="612"
            y2="17"
            stroke="currentColor"
            strokeOpacity={inverted ? "0.15" : "0.12"}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M612 17 C632 17 643 16.4 650 14.5 C656 12.8 659 17 665 17"
            stroke="var(--accent, #e83a12)"
            strokeWidth="1.15"
            strokeOpacity="0.85"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="665" cy="17" r="3.1" fill="var(--accent, #e83a12)" />

          <g className={styles.separatorFloretGroup}>
            <path
              d="M698 0.7 C699.8 10.6 704.4 15.2 713.3 17 C704.4 18.8 699.8 23.4 698 33.3 C696.2 23.4 691.6 18.8 682.7 17 C691.6 15.2 696.2 10.6 698 0.7 Z"
              fill="var(--accent, #e83a12)"
            />
          </g>

          <circle cx="731" cy="17" r="3.1" fill="var(--accent, #e83a12)" />
          <path
            d="M731 17 C737 17 740 12.8 746 14.5 C753 16.4 764 17 784 17"
            stroke="var(--accent, #e83a12)"
            strokeWidth="1.15"
            strokeOpacity="0.85"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1="784"
            y1="17"
            x2="1396"
            y2="17"
            stroke="currentColor"
            strokeOpacity={inverted ? "0.15" : "0.12"}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={containerClass}
      data-story-axis={dataStoryAxis}
      aria-hidden="true"
    >
      <svg
        className={styles.separatorSvgCentered}
        viewBox="0 0 340 34"
        fill="none"
      >
        <line
          x1="0"
          y1="17"
          x2="84"
          y2="17"
          stroke="currentColor"
          strokeOpacity={inverted ? "0.15" : "0.12"}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M84 17 C104 17 115 16.4 122 14.5 C128 12.8 131 17 137 17"
          stroke="var(--accent, #e83a12)"
          strokeWidth="1.15"
          strokeOpacity="0.85"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="137" cy="17" r="3.1" fill="var(--accent, #e83a12)" />

        <g className={styles.separatorFloretGroup}>
          <path
            d="M170 0.7 C171.8 10.6 176.4 15.2 185.3 17 C176.4 18.8 171.8 23.4 170 33.3 C168.2 23.4 163.6 18.8 154.7 17 C163.6 15.2 168.2 10.6 170 0.7 Z"
            fill="var(--accent, #e83a12)"
          />
        </g>

        <circle cx="203" cy="17" r="3.1" fill="var(--accent, #e83a12)" />
        <path
          d="M203 17 C209 17 212 12.8 218 14.5 C225 16.4 236 17 256 17"
          stroke="var(--accent, #e83a12)"
          strokeWidth="1.15"
          strokeOpacity="0.85"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="256"
          y1="17"
          x2="340"
          y2="17"
          stroke="currentColor"
          strokeOpacity={inverted ? "0.15" : "0.12"}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
