# Shared Motion Architecture — Acts 3 to 7

## Do not create one giant fragile 900vh animation immediately

Each act should expose:

```ts
getEnterTimeline()
getHoldTimeline()
getExitTimeline()
```

or equivalent selectors/labels.

Then compose them in the homepage story controller.

## Desktop timing philosophy

Approximate balance for each pinned/editorial act:

- 15–20% entrance
- 55–65% readable hold
- 15–25% exit / bridge

The site must not force the user to continuously watch transitions.

## Shared object chain

Recommended continuity:

```text
Act 1 hero kicker rule
    ↓
Act 2 structural gold rule
    ↓
Act 2 Featured In preview rail
    ↓
Act 3 media rows / separators
    ↓
Act 4 single manifesto rule
    ↓
Act 5 topic reading axis
    ↓
Act 6 content top rule
    ↓
Act 7 dark section boundary
```

This gives the homepage one coherent visual grammar without repeating the Ensō in every scene.

## GSAP rules

- use ScrollTrigger
- deterministic timeline
- no React setState on every scroll
- transform / opacity / clip-path only where practical
- avoid animating layout width/height continuously
- no global stage crossfades
- no 3D transforms unless a future section genuinely requires them
- `prefers-reduced-motion` gets static document flow

## Mobile

Mobile should primarily be normal document flow.

Allowed:
- IntersectionObserver/ScrollTrigger reveal
- 8–12px y transform
- opacity
- small line growth

Avoid:
- pinning every section
- long scrub distances
- parallax that causes text/image overlap
