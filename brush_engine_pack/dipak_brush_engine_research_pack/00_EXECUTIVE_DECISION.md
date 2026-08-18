# 00 — Executive Decision

## Baseline reviewed

Repository: `nayagrowth/dipak-web`

Latest reviewed commit:

`d70ebc9561be9efd41e5df44002f13291bdbea60`

`feat: replace raster mask with pure vector SVG Enso calligraphy component and fix headline descender clipping`

## Decision

**Stop trying to make the current `EnsoBrush.tsx` look like a real brush by stacking thick SVG strokes plus `feTurbulence`.**

The current component is structurally the wrong rendering model for the visual target. It creates translucent tubes/bands, not deposited pigment, bristle breakup, dry gaps, pressure variation, or a natural brush head/tail.

The recommended production architecture is a **hybrid natural-media pipeline**:

1. Use **p5.brush (standalone WebGL2)** as a *design-time / authoring engine* to create the real Ensō texture from a deterministic spline with pressure and a charcoal/custom image brush tip.
2. Export a clean transparent high-resolution brush asset (PNG or lossless WebP) in a fixed logical coordinate system.
3. Render that asset at runtime inside a single registered SVG/composition root.
4. Animate the *reveal* of the authentic texture with an SVG mask path (native `stroke-dashoffset` or GSAP DrawSVG if GSAP is being introduced for later scroll work).
5. Keep portrait + halo registered through the existing single composition root. **No separate mobile/desktop mask ratios.**

This gives the best combination of:

- authentic dry-brush appearance
- deterministic responsive geometry
- animation capability
- no first-paint WebGL dependency
- no SVG-filter banding
- no mask/portrait drift across breakpoints

## If true runtime painting is required later

Use `p5.brush/standalone` dynamically on the client and draw the spline progressively. It supports custom/image tips, pressure, splines, vector fields and natural-media brushes. Keep a static exported texture as fallback and for `prefers-reduced-motion` / WebGL failure.

## Do not use as primary solution

- four broad SVG paths + turbulence/displacement (current approach)
- Rough.js (wrong aesthetic: sketch, not dry ink)
- Perfect Freehand alone (excellent variable-width geometry, but no natural-media grain/bristles)
- Paper.js alone (excellent path math, not a brush renderer)
- PixiJS for this one hero unless the site later needs many GPU-driven painted scenes

Read in order:

1. `01_CURRENT_FAILURE_AUDIT.md`
2. `02_LIBRARY_RESEARCH.md`
3. `03_PRODUCTION_ARCHITECTURE.md`
4. `04_BRUSH_MATH.md`
5. `05_AUTHORING_TOOL_SPEC.md`
6. `06_RUNTIME_REVEAL_AND_MOTION.md`
7. `07_QA_AND_ACCEPTANCE.md`
8. `08_AGENT_EXECUTION_PROMPT.txt`
