# Mobile and Accessibility

## Mobile motion is not desktop motion squeezed narrower

Below ~768px, avoid a long pinned 250vh cinematic sequence.

Use a shorter `120–150vh` transition or normal document flow with ScrollTrigger only controlling the first handoff.

### Mobile static Act 2

```text
02 / THE PERSON
───────────────

THE CERTAINTY
BUILDER™.

Founder of Authority Closers.

With over 11 years ...
... implement immediately.

11+         ₹9+ CRORE
YEARS       REVENUE

940+
TRAINED

Featured In ↓
```

### Mobile rules

- Do not let desktop serif heading exceed ~54–58px on 390px width.
- Keep body at least 14.5–16px depending on font rendering.
- Stats may become 2-column + 1 full-width, not tiny 3-column text.
- Do not pin on very short devices (<700px height).
- No horizontal overflow from the stretching gold rule.

## Reduced motion

`prefers-reduced-motion: reduce`:

- no pin-scrub animation
- hero flows normally into Act 2
- all Act 2 content visible in final position
- no pointer parallax
- gold rule shown in final Act 2 geometry

## Keyboard / focus

The scroll sequence must not trap focus. Links and CTAs remain in DOM order and focusable even if visually transitioning.
