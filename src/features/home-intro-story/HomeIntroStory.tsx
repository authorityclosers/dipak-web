"use client";

import React, { useRef } from "react";
import { DipakHero, dipakHeroContent } from "@/features/dipak-hero";
import { DipakIdentityAct, identityContent } from "@/features/dipak-identity";
import { DipakPresenceAct, presenceContent } from "@/features/dipak-presence";
import { DipakMissionAct, missionContent } from "@/features/dipak-mission";
import { DipakTopicsAct, topicsContent } from "@/features/dipak-topics";
import { DipakThinkingAct, thinkingContent } from "@/features/dipak-thinking";
import { DipakBridgeAct, bridgeContent } from "@/features/dipak-bridge";
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
    <div className={styles.masterStoryWrapper}>
      {/* Pinned Cinematic Story Stage: Act 1 (Hero) -> Act 2 (Identity) -> Act 3 (Presence) -> Act 4 (Mission) */}
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
          <div className={styles.act1Wrapper} data-story-act1-wrapper="true">
            <DipakHero content={dipakHeroContent} />
          </div>

          {/* Act 2: The Person & Credentials (Identity) */}
          <div className={styles.act2Wrapper} data-story-act2-wrapper="true">
            <DipakIdentityAct content={identityContent} />
          </div>

          {/* Act 3: Presence & Authority Proof (Featured In) */}
          <div className={styles.act3Wrapper} data-story-act3-wrapper="true">
            <DipakPresenceAct content={presenceContent} />
          </div>

          {/* Act 4: My Mission Manifesto */}
          <div className={styles.act4Wrapper} data-story-act4-wrapper="true">
            <DipakMissionAct content={missionContent} />
          </div>
        </div>
      </div>

      {/* Act 5: What I Talk About Topic Index */}
      <div className={styles.actSectionWrapper}>
        <DipakTopicsAct content={topicsContent} />
      </div>

      {/* Act 6: Latest Thinking (Videos + Articles) */}
      <div className={styles.actSectionWrapper}>
        <DipakThinkingAct content={thinkingContent} />
      </div>

      {/* Act 7: Authority Closers Bridge & Final CTA */}
      <div className={styles.actSectionWrapper}>
        <DipakBridgeAct content={bridgeContent} />
      </div>
    </div>
  );
}
