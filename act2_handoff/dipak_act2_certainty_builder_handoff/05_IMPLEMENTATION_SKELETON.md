# Implementation Skeleton

## Suggested component architecture

```text
src/features/home-intro-story/
  HomeIntroStory.tsx
  home-intro-story.module.css
  useHomeIntroTimeline.ts

src/features/dipak-hero/
  DipakHero.tsx          # existing visual content, minimally adapted

src/features/dipak-identity/
  DipakIdentityAct.tsx
  dipak-identity-act.module.css
  identity.content.ts
```

## Principle

Do not rewrite the current hero. Wrap it as Act 1 and add Act 2 as a sibling in one stage.

```tsx
<section ref={shellRef} className={styles.storyShell}>
  <div ref={stageRef} className={styles.storyStage}>
    <DipakHero mode="story" />
    <DipakIdentityAct />
  </div>
</section>
```

Desktop:

```css
.storyShell { height: 250vh; }
.storyStage { height: 100dvh; position: sticky; top: 0; overflow: clip; }
.act1, .act2 { position: absolute; inset: 0; }
```

Use JS/GSAP pinning instead of CSS sticky if it integrates more cleanly with the current hero; do not use both simultaneously.

## GSAP

Add GSAP + ScrollTrigger because this is now a genuine cross-section scrubbed story, unlike the simple hero-load intro.

Use `gsap.context()` inside `useLayoutEffect` or `@gsap/react` if added intentionally.

Do not call React `setState` on scroll progress.

Pseudo timeline:

```ts
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: shell,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.4,
    pin: stage,
    anticipatePin: 1,
  }
});

tl.addLabel('SIGNAL', 0)
  .to(heroRule, {...}, 'SIGNAL')
  .addLabel('DECONSTRUCT', 0.8)
  .to(heroHeadlineLines, {...}, 'DECONSTRUCT')
  .to(heroPortraitRoot, {...}, 'DECONSTRUCT')
  .addLabel('BRIDGE', 1.4)
  .to(heroRule, { scaleX: ..., x: ..., y: ... }, 'BRIDGE')
  .addLabel('ACT2_ENTER', 2.1)
  .to(identityStage, { autoAlpha: 1 }, 'ACT2_ENTER')
  .from(identityHeadlineLines, {...}, 'ACT2_ENTER+=0.05')
  .from(identityBio, {...}, 'ACT2_ENTER+=0.12')
  .from(identityStats, {...}, 'ACT2_ENTER+=0.18')
  .addLabel('ACT2_HOLD', 3.1)
  .to({}, { duration: 1.4 })
  .addLabel('FEATURED_PREVIEW', 4.5)
  .from(featuredRail, {...}, 'FEATURED_PREVIEW');
```

## Hero shared-rule hook

Add a stable data hook to the hero kicker rule:

```tsx
<span className={styles.kickerLine} data-story-gold-rule aria-hidden="true" />
```

Do not query hashed CSS-module class strings.

## QA

Add Playwright screenshots for timeline states at fixed scroll positions:

- Act 1 initial
- 10% immediate response
- 28% deconstruction
- 45% bridge
- 65% Act 2 entered
- 76% Act 2 readable hold
- 95% Featured In preview

Test at:

- 1366×768
- 1440×900
- 1920×1080
- 390×844
- 375×667

At Act 2 hold, major text must not be moving.
