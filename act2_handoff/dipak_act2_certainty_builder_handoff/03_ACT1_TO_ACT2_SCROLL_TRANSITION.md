# Act 1 → Act 2 Transition

## What we are borrowing from Estate Autopilots

The Estate Autopilots animation work established several useful principles:

- the first scroll must react immediately instead of wasting wheel distance
- one motif should survive the transition and become part of the next act
- deconstruction should feel like solid material movement, not gray opacity mush
- the next act should assemble quickly and then **hold completely readable**
- scroll progress should drive one deterministic reversible timeline
- fine-pointer parallax may exist, but only after core layout is correct

Do **not** copy EA's perspective rails, 3D runway, eclipse or velocity-poster aesthetic into Dipak. Copy the motion grammar, not the visual language.

## Shared motif

Use the **gold kicker rule** from the hero as the bridge object.

Hero state:

```text
Founder. Strategist. Communicator.  ─────
```

Act 2 state:

```text
────────────────────────────────────────────────────────
```

The line stretches across the page and becomes the structural horizontal rule of Act 2.

The natural-media Ensō can drift / fade behind it but is not the primary morph.

## Desktop scroll timeline

Use a pinned story shell approximately `230–270vh` tall with a sticky/pinned `100dvh` stage.

Normalize timeline progress `p ∈ [0,1]`.

### Beat 1 — Signal / immediate response

`p = 0.00 → 0.08`

- hero kicker gold rule extends 5–8%
- portrait translates 2–3px on x / scales ~0.995
- headline remains readable
- scroll cue / lowest-priority elements begin leaving

This must begin with the very first wheel/touch movement.

### Beat 2 — Hero deconstruction

`p = 0.08 → 0.30`

- headline lines exit through their existing overflow masks, not loose opacity fades
- supporting copy exits after headline by ~0.03 progress
- CTAs move downward 12–18px and clip/fade
- quote exits last, so the philosophy remains visible briefly
- portrait shifts toward the right edge and scales to ~0.88–0.92
- Ensō drifts with the same visual composition root

Do not fragment letters individually. Dipak is editorial, not kinetic-type spectacle.

### Beat 3 — Gold-rule bridge

`p = 0.22 → 0.44`

- kicker rule detaches visually from kicker text
- transformOrigin = left center
- rule grows from current width to ~86–92vw
- y position moves toward Act 2's upper structural rule
- color remains warm gold; do not bloom neon

This is the equivalent of EA's dot→hyphen bridge: an object the user already saw becomes a meaningful object in the next scene.

### Beat 4 — Act 2 assembly

`p = 0.34 → 0.62`

Order:

1. small `02 / THE PERSON`
2. `THE CERTAINTY BUILDER™.` masked-line reveal
3. `Founder of Authority Closers.`
4. short bio paragraph
5. three proof figures

Use short overlapping timings, not a long stagger chain.

### Beat 5 — readable hold

`p = 0.62 → 0.86`

Freeze major typography completely.

Only permissible life:

- subtle 1–2px registered Ensō/ambient movement on fine pointer
- almost imperceptible background light drift if already present

The visitor needs a real reading window.

### Beat 6 — Featured In handoff

`p = 0.86 → 1.00`

- bottom typographic media rail rises 12–16px
- gold structural rule moves down / duplicates into the next section boundary
- Act 2 does not disappear before the next section is visibly present

## Suggested GSAP ScrollTrigger configuration

Start around:

```ts
scrub: 0.35 to 0.45
anticipatePin: 1
```

EA moved toward ~0.38–0.42 because ~0.8 felt delayed. Dipak should feel crisp but calmer than EA.

Use one timeline with labels; do not maintain React state on every scroll event.
