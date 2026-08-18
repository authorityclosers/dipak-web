# 01 — Current Failure Audit

## 1. Why the new SVG looks like giant gray rings

The latest `EnsoBrush.tsx` is not painting. It draws **four separate fixed-width SVG strokes**:

- 140 px at opacity 0.08
- 95 px at opacity 0.07
- 45 px at opacity 0.04
- 55 px at opacity 0.05

Those paths are displaced using `feTurbulence` + `feDisplacementMap` and lightly blurred.

That changes the *boundary position*, but it does not create the core phenomena that make dry brush look natural:

- variable pigment density inside the stroke
- bristle separation
- holes/dry pickup
- pressure-dependent width
- pressure-dependent opacity
- directional bristle streaks
- loaded-brush start
- depleted-brush tail
- coherent grain following the tangent of the stroke

Therefore the eye sees four translucent vector tubes. The supplied desktop and mobile screenshots show exactly that.

## 2. The SVG defines a wash gradient that is not used

`brush-wash` is defined in `<defs>`, but no shape references it as a fill/stroke/mask. It currently has zero visual effect.

## 3. `feTurbulence` is being used as distortion, not pigment

The filter uses turbulence only as the displacement map input. A displaced uniform stroke is still a uniform stroke internally.

For natural media, noise needs to affect **alpha/density and local bristle deposition**, not merely x/y displacement.

## 4. The latest registration work is directionally correct

The repo now has:

- `visualComposition`
- generated normalized halo variables
- desktop/mobile composition metadata
- portrait and halo under one composition root

Do not discard that architecture.

The error now is mainly **brush synthesis**, not the high-level idea of a registered composition root.

## 5. Important correction to the current mindset

The halo does **not** need its own responsive ratio system.

There should be:

```text
composition root transform
    portrait
    brush artwork
```

The brush artwork lives in fixed logical coordinates (for example 1000×1000) inside the root. The browser scales the complete root. Mobile may choose a different root placement/crop, but the brush and portrait do not independently chase the viewport.

## 6. Why the old raster attempts drifted

The old system mixed:

- `vw`
- `vh`
- independent portrait max-height constraints
- independent mask width/top/right
- different mobile crop dimensions

Even clean assets drift if their transforms are independent.

The fix is not more breakpoints. The fix is **one affine transform per composition**.
