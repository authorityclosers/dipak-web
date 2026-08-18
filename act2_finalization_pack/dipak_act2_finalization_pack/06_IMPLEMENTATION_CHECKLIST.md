# Implementation Checklist

Target files named by the agent walkthrough:

- `src/features/dipak-identity/identity.content.ts`
- `src/features/dipak-identity/DipakIdentityAct.tsx` (or equivalent)
- `src/features/dipak-identity/dipak-identity-act.module.css`
- `src/features/home-intro-story/useHomeIntroTimeline.ts`
- `src/features/home-intro-story/HomeIntroStory.tsx`

## Pass 1 — static desktop only

- remove upper line that crosses title
- align index and title in one header row
- normalize title size and right inset
- split TM + gold period
- remove unsupported `STRATEGIC SALES ENABLEMENT` unless confirmed
- tighten identity/bio grid
- normalize all metrics
- rebuild Featured In rail

Take 1920×1080 and 1440×900 screenshots before touching animation.

## Pass 2 — static mobile

At:
- 390×844
- 412×915
- 440×956

Ensure:
- no clipped `CRORE`
- no horizontal overflow
- no clipped media item
- third metric spans grid
- title remains 2 lines
- TM stays superscript
- body text remains readable

## Pass 3 — transition

Remove stage-level crossfade / whole-act `autoAlpha` where it creates the white ghost state.

Use mask/transform exits and local reveals.

Capture:
- 0%
- 15%
- 30%
- 45%
- 60%
- 75%
- 100%

Review those seven screenshots as a film strip.

No frame should look like two semi-transparent pages stacked over each other.

## Pass 4 — optional brush echo

Only after static + motion passes.

If still needed, add one low-opacity cropped fragment from the existing authentic brush asset.

## Pass 5 — cleanup

The recording also shows:

```text
GET /favicon.ico 404
```

Fix or add the favicon before client review. It is not a visual-layout blocker, but it is unnecessary console noise.
