# Dipak Vishwakarma Hero — Precision Rebuild Handoff

## Baseline

Work against:

- Repository: `nayagrowth/dipak-web`
- Baseline commit: `43a85ae0a4539ac2bc250e61960fdefd5355a1a4`
- Commit message: `feat: complete mobile & desktop responsive art direction rebuild with Playwright test suite`

The current commit has useful structural improvements (mobile nav, responsive breakpoints, Playwright, CSS masking), but the visual system is still not production-ready.

## What must happen first

Do **not** keep nudging the current mask with arbitrary `top/right/width` values.

The current failure has three separate causes:

1. **The left brush mask is objectively broken.** The solid gray rectangle in the desktop screenshot is the mask element itself.
2. **The Ensō mask was reconstructed from already-composited screenshots containing people/text.** It therefore contains missing/ghost geometry. No amount of proportional scaling can restore pixels that were deleted during extraction.
3. **Portrait and halo are rendered with separate transforms.** On mobile the portrait is `92vw` while the halo is `104vw`, and they use unrelated offsets. On desktop the halo fills the stage while the portrait is constrained by a different `max-height/max-width` system. They cannot stay registered across aspect ratios.

## Required execution order

1. Remove the left brush from the production hero immediately.
2. Rebuild the Ensō from the original brush source asset, not from reference screenshots.
3. Introduce one mathematically registered composition coordinate system for portrait + halo.
4. Fix mobile composition using one composition root, not two separately positioned siblings.
5. Correct the Playwright tests so they detect visible dead space and mask drift.
6. Only after static screenshots pass, add the intro animation.
7. Add subtle desktop pointer response only as a final enhancement.

## Read next

1. `01_ROOT_CAUSE_AND_MATH.md`
2. `02_IMPLEMENTATION_SPEC.md`
3. `03_INTRO_MOTION_SPEC.md`
4. `04_QA_PLAYWRIGHT.md`
5. `05_DESIGNER_NOTES.md`

The `references/` folder contains the exact current desktop/mobile screenshots plus zooms of the failures.
