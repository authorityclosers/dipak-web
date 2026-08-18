# 03 — Intro Motion + Interaction Specification

The page currently appears instantly and statically. Add motion only **after** the static visual registration is correct.

The Estate Autopilots work is useful as a quality reference for immediacy and interaction, not as a visual style to copy.

## Motion principle

Dipak should feel:

- editorial
- intelligent
- premium
- restrained
- confident

Not:

- tech-demo
- WebGL spectacle
- spinning brush
- loader for the sake of a loader
- long dead time before content

## Intro concept: "Editorial Assembly"

Total perceived intro:

```text
~850–1100ms
```

The page must be usable immediately. Do not lock scroll.

### Phase 0 — First paint

At time 0:

- background already present
- layout already at final geometry
- no layout shift
- portrait asset requested immediately

### Phase 1 — Identity

```text
0–260ms
```

- wordmark: `translateY(6px) -> 0`
- opacity -> 1
- nav/menu: subtle fade, 40–80ms stagger

### Phase 2 — Portrait + Ensō

```text
100–650ms
```

Portrait:

- `translate3d(10px, 6px, 0) -> 0`
- scale `0.995 -> 1`
- very light opacity reveal if desired

Ensō:

- opacity `0 -> final`
- scale `0.985 -> 1`
- no rotation
- no fake brush-drawing unless a real path-based brush animation is later built

The portrait and halo must animate through the **same composition root**. Never animate them with unrelated translations that visibly break registration.

### Phase 3 — Headline reveal

```text
180–760ms
```

Each headline line uses an overflow clip:

```text
line 1
line 2
line 3
```

Stagger:

```text
~65–80ms
```

Transform:

```text
translateY(105%) -> 0
```

Use a tasteful cubic-bezier / expo-like easing.

### Phase 4 — Supporting details

```text
500–900ms
```

Reveal:

- supporting copy
- CTA row
- quote

Small `translateY(8px)` + opacity.

Do not animate every letter.

---

## CSS/WAAPI vs GSAP

For this hero-load intro alone, CSS animations or the Web Animations API are sufficient.

Do **not** add GSAP solely to make a 1-second entrance.

Use GSAP later only if the project adds:

- scroll-scrubbed storytelling
- pinned scenes
- first-scroll transition into section 2
- pointer smoothing with `quickTo`
- cross-section continuity

That is where the Estate Autopilots research becomes directly useful.

---

## Optional desktop pointer response

Only after static QA passes.

For:

```css
@media (pointer: fine) and (prefers-reduced-motion: no-preference)
```

track normalized cursor:

```text
mx ∈ [-1,1]
my ∈ [-1,1]
```

Apply extremely small offsets:

Portrait composition root:

```text
x = mx * 3px
y = my * 2px
```

Halo internal offset (only if it remains registered aesthetically):

```text
x = -mx * 4px
y = -my * 3px
```

If halo/portrait separation becomes visually noticeable, move the complete root only and do not parallax them separately.

Use requestAnimationFrame or GSAP `quickTo` if GSAP already exists later.

No React state update on every pointer event.

---

## First scroll, when section 2 exists

Estate Autopilots research showed the value of:

- immediate first-scroll response
- no dead wheel distance
- progress-driven transitions
- preserving one visual motif across acts
- small pointer response
- scroll-triggered typography and scene continuity

For Dipak, do not invent a giant 3D scene.

A later first-scroll transition could:

1. lightly reduce hero copy opacity
2. move the registered portrait composition 2–4vh upward
3. let the Ensō become a continuity motif into the next section
4. reveal the next editorial section from underneath

Do not implement this before section 2 has a designed transition target.

---

## Reduced motion

`prefers-reduced-motion: reduce` must produce:

- final positions immediately
- no transforms
- no stagger
- no scroll-driven movement
- menu still fully functional

---

## Performance

Animate only:

- `transform`
- `opacity`

Avoid hero-load animation of:

- width
- height
- top/left
- filter blur
- large backdrop filters

The final composition geometry must exist before the animation starts.
