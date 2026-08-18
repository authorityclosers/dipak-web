# 02 — Library Research

## A. p5.brush — best direct match for the requested medium

Repository: `acamposuribe/p5.brush` (MIT)

Why it matters:

- dedicated natural drawing tools
- built-in charcoal/pencil/marker style brushes
- custom brush tips
- **image brush tips**
- scatter, grain, opacity, spacing
- pressure curves
- `brush.spline(...)`
- `beginStroke / move / endStroke`
- vector fields
- standalone build with no p5 dependency, but it requires WebGL2

### Best role in this project

**Design-time authoring tool first.**

Use it to generate one excellent deterministic Ensō asset and tune:

- pressure
- tip image
- bristle density
- opacity
- scatter
- path geometry

Commit the exported transparent result.

This prevents the hero from depending on a WebGL engine during first paint.

### Optional runtime role

If later we want the brush to genuinely paint itself in real time, dynamically import `p5.brush/standalone` after hydration and draw the same path progressively.

Keep the static asset as fallback.

---

## B. perfect-freehand — excellent stroke geometry, insufficient texture by itself

`perfect-freehand` converts points + pressure into a pressure-sensitive polygon outline. It supports thinning, smoothing, streamlining, tapering and simulated/real pressure.

Use it if we want to build our own vector brush silhouette.

Do **not** expect it to create dry pigment/bristles by itself. It produces geometry; we must still texture/mask that geometry.

Potential role:

```text
centerline points
→ pressure profile
→ perfect-freehand outline
→ textured alpha mask
```

Good fallback if we want no WebGL authoring dependency.

---

## C. Paper.js — excellent for path mathematics / authoring

Paper.js exposes path length, point/tangent/normal/curvature sampling (`getPointAt`, `getTangentAt`, `getNormalAt`, etc.) and curve smoothing.

Useful for:

- arc-length resampling
- computing normals for bristle offsets
- custom brush simulation
- authoring a clean spline

It is not a natural-media brush engine by itself.

---

## D. PixiJS v8 — best if this grows into a real GPU painting system

PixiJS gives:

- production WebGL renderer
- custom shaders / filters
- displacement/noise filters
- Mesh / MeshRope
- high-performance ParticleContainer
- transparent canvas
- ticker/render loop

If the site later needs:

- multiple animated painted backgrounds
- hundreds/thousands of brush stamps
- pointer-reactive pigment
- scroll-driven GPU transitions

then PixiJS becomes attractive.

For **one** hero brush, it is more engine than we need.

---

## E. SVG filter stack — keep only for subtle secondary texture

SVG `feTurbulence` and `feDisplacementMap` are useful for distortion, but they should not be the core brush renderer.

If used at all:

- use turbulence to perturb alpha/mask edges slightly
- keep displacement small
- never build the full stroke from multiple uniform broad bands

The current approach over-relies on displacement.

---

## F. GSAP DrawSVG — useful only for the reveal animation

DrawSVG progressively reveals SVG strokes by controlling dasharray/dashoffset and can recalculate lengths when responsive.

Use it to reveal the **mask path**, not to synthesize the brush texture.

If GSAP is not otherwise needed yet, native SVG `pathLength=1` + CSS/WAAPI is enough for the first-load reveal.

When the next scroll-act work begins, GSAP becomes more justified.
