# 05 — Brush Lab / Asset Authoring Specification

## Recommended: create a development-only Brush Lab

Route/tool (not public production UI):

```text
/tools/brush-lab
```

or a standalone script/page outside the app route tree.

Use:

```ts
import * as brush from 'p5.brush/standalone'
```

The standalone build does not require p5.js, but it requires WebGL2.

## Controls the lab should expose

- brush preset (`charcoal`, custom image tip)
- weight
- scatter
- grain
- opacity
- spacing
- pressure curve
- control points
- spline curvature
- seed
- canvas size
- background preview (ivory vs transparent)
- export PNG

## Determinism

Always set a fixed seed before rendering.

The same seed + same control points + same parameters must produce identical exported artwork.

Keep the chosen parameters in:

```text
src/features/dipak-hero/brush/enso-brush.config.json
```

## First prototype settings

Start with built-in charcoal.

If it looks too pencil-like, create a custom **image brush tip** from a real dry-brush tip texture.

Suggested direction:

```text
weight:     tune visually around medium-wide
scatter:    low-medium
opacity:    low enough for paper to breathe
spacing:    small enough to avoid dotted appearance
pressure:   0.35 → 1.05 → 0.75 → 0.28
curvature:  ~0.55–0.75
```

Do not copy numbers blindly; use the lab.

## Export

Render at:

```text
2048×2048 minimum
4096×4096 master if asset weight remains acceptable
```

Export transparent.

Generate production derivatives:

- master PNG (source)
- lossless WebP if verified visually
- optional AVIF only if alpha/edge quality is proven superior for this artwork

Do not allow lossy compression to destroy fine bristle alpha.
