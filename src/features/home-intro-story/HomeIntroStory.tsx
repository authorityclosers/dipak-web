"use client";

import React, { useRef } from "react";
import { DipakHero, dipakHeroContent } from "@/features/dipak-hero";
import { DipakIdentityAct, identityContent } from "@/features/dipak-identity";
import { useHomeIntroTimeline } from "./useHomeIntroTimeline";
import styles from "./home-intro-story.module.css";

export function HomeIntroStory() {
  const shellRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bridgeRuleRef = useRef<HTMLDivElement>(null);

  useHomeIntroTimeline({
    shellRef,
    stageRef,
    bridgeRuleRef,
  });

  return (
    <div ref={shellRef} className={styles.storyShell}>
      <div ref={stageRef} className={styles.storyStage}>
        {/* Shared Bridge Motif: The Gold Rule */}
        <div
          ref={bridgeRuleRef}
          className={styles.bridgeGoldRule}
          data-story-bridge-rule="true"
          aria-hidden="true"
        />

        {/* Act 1: Belief & Philosophy (Hero) */}
        <div className={styles.act1Wrapper}>
          <DipakHero content={dipakHeroContent} />
        </div>

        {/* Act 2: The Person & Credentials (Identity) */}
        <div className={styles.act2Wrapper}>
          <DipakIdentityAct content={identityContent} />
        </div>
      </div>
    </div>
  );
}
