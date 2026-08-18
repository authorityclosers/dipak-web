# 03 — Recommended Production Architecture

## Final system

```text
AUTHORING (development only)

p5.brush / custom brush lab
   ↓
logical 1000×1000 composition
   ↓
pressure-aware charcoal spline
   ↓
transparent authentic brush texture
   ↓
/hero/enso-brush-master.png or lossless WebP


RUNTIME

visualComposition (single responsive transform)
   ├── BrushArtwork SVG
   │     ├── <image> authentic transparent texture
   │     └── <mask> animated reveal path
   └── portrait
```

## Why this is robust

The texture and reveal mask share the same SVG `viewBox`.

Therefore there is no image-mask ratio problem inside the brush artwork.

The whole BrushArtwork is then placed in portrait-relative normalized coordinates inside `visualComposition`.

Therefore there is no viewport-specific halo/portrait ratio problem.

Two transform spaces only:

1. **brush-local**: fixed 1000×1000
2. **composition-root**: responsive scale/translation

No third system based on viewport width/height.

---

## BrushArtwork component

Use a single SVG like:

```tsx
<svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
  <defs>
    <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
      <rect width="1000" height="1000" fill="black" />
      <path
        className={styles.revealPath}
        d={ENSO_CENTERLINE}
        pathLength="1"
        fill="none"
        stroke="white"
        strokeWidth="190"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </mask>
  </defs>

  <image
    href="/hero/enso-brush-master.webp"
    x="0" y="0" width="1000" height="1000"
    preserveAspectRatio="none"
    mask={`url(#${maskId})`}
  />
</svg>
```

The exported texture already contains the real ragged edges, gaps and bristles.

The mask only controls **how much of it is revealed**.

---

## Leading-edge concealment

A perfectly circular reveal cap can look synthetic during the 0.7–0.9s animation.

Use one of these:

### Option 1 — oversized mask stroke + fast reveal

Usually sufficient if the reveal is < 900ms.

### Option 2 — noisy head mask

Add a small secondary animated texture at the moving reveal front.

### Option 3 — three reveal paths

Use 3 parallel reveal paths at 180/150/120px widths with 20–40ms offsets. This makes the advancing head feel uneven without affecting the final artwork.

Do not animate the actual texture geometry.

---

## Static first-paint fallback

For no-JS, reduced motion, or slow client initialization:

- render the full brush texture statically
- skip reveal animation

The hero must never wait for an effect.
