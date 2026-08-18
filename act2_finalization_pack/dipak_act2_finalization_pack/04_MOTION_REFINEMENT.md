# Motion Refinement — Make the Transition Less Obvious

## What the recording shows

The desktop transition contains a highly visible washed/white intermediate frame where both Act 1 and Act 2 appear partially transparent.

That is exactly the kind of animation the user is reacting to.

The problem is not merely timing. It is the use of **stage-level opacity / crossfade**.

## New motion rule

**Do not crossfade whole acts.**

Keep the canvas constant and move/clip individual visual objects.

### Reject

```text
Act 1 opacity 1 → 0
Act 2 opacity 0 → 1
```

This creates the ghost/white flash visible in the recording.

### Use

```text
Act 1 elements:
  clipped/translated out

Act 2 elements:
  already mounted
  revealed through local masks/transforms

background:
  unchanged
```

## Revised beat design

### Beat A — immediate response
First 3–5% of scroll.

- gold kicker rule extends ~12%
- hero portrait root x:+4px, scale 0.997
- no opacity changes

### Beat B — editorial exit
~5–25%.

Headline lines:
- yPercent: -105
- keep opacity 1 while inside overflow-hidden wrappers

Supporting copy:
- y: -10px
- opacity may reduce only in final 20% of its exit

CTAs:
- y: +12px
- clip/fade locally

Portrait:
- x: +5vw
- scale: 0.92–0.95
- **do not fade to a pale ghost**
- exit behind right clip or remain opaque until it leaves the frame

Ensō:
- travels with the portrait composition root
- may fade late, after it is mostly off-canvas

### Beat C — gold-rule bridge
~18–38%.

Use the existing kicker line as the shared object.

Instead of growing through the Act 2 title:
- stretch toward the Act 2 structural-rule y-position
- stop below the title header row
- final width = content grid width, not `100vw`

### Beat D — Act 2 reveal
~30–52%.

Act 2 should already exist in DOM at final layout.

Reveal:
- section index: y 8→0 + opacity
- title: line-mask yPercent 105→0
- founder line: y 8→0
- bio: y 8→0
- proof row: y 10→0 with very small 35–50ms overlap

Do not use huge x translations.
Do not stagger every word/letter.

### Beat E — readable lock
~52–88%.

All major typography completely static.

This hold should be longer than the visible transition.

### Beat F — trust rail
~88–100%.

Featured rail rises 8–12px and settles.

## ScrollTrigger feel

Keep scrub responsive, but reduce theatrical motion magnitude.

Recommended test range:

```ts
scrub: 0.28
scrub: 0.34
scrub: 0.40
```

Choose by recording, not preference.

The user should feel that scrolling naturally rearranges the page, not that a pre-made animation is playing.

## Mobile

Do not run the full pinned desktop transition.

The current sequential mobile flow is directionally correct.

Only use:
- title reveal on intersection
- founder/bio 8px rise
- metrics stagger 40ms
- media rail reveal

No washed crossfade from mobile hero.
