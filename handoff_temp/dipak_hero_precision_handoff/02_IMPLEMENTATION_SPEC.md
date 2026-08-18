# 02 — Implementation Specification

## 1. Remove the left brush now

Delete the rendered left brush element from the hero or force it off for all breakpoints.

Do not spend time trying to preserve it in this iteration.

The right-side Ensō + portrait + editorial typography are already enough visual language.

If the left brush is later reintroduced, it must have:

- true transparent alpha
- no opaque rectangular component
- no stretch via `object-fit: fill`
- its own alpha QC test

---

# 2. Rebuild the Ensō from the original brush asset

Use:

```text
src/features/dipak-hero/assets/brush-halo.png
```

as the source.

Do **not** use the two reference screenshots as mask sources.

## Background extraction

If the source has an opaque white/cream background:

1. Read as RGB/RGBA.
2. Estimate background color from border pixels robustly:
   - median of border pixels
   - reject obvious dark brush samples
3. Convert sRGB → linear RGB.
4. Calculate linear luminance.
5. Calculate darkness relative to the estimated local/background luminance.
6. Convert darkness to alpha with smoothstep / sigmoid.
7. Preserve brush bristles and soft opacity.

Example:

```python
ink = np.clip((L_bg - L_pixel - epsilon) / strength, 0, 1)
alpha = smoothstep(0, 1, ink)
```

## Remove foreign artifact(s)

Fit the dominant ring on the original brush source, not a screenshot.

Preferred:

- threshold only obvious dark stroke pixels
- robust circle fit using RANSAC / nonlinear least squares
- use distance-to-ring as a structural prior
- remove disconnected components that are both:
  - far from ring support
  - geometrically inconsistent with bristle/splatter

Do not erase legitimate splatter just because it is small.

## Important

The output mask should represent the **complete Ensō**, including pixels that would be hidden behind Dipak at runtime.

This is why the original source is mandatory.

---

# 3. Stop treating mask alignment as a visual guessing exercise

Create a generated registration file:

```text
src/features/dipak-hero/generated/hero-composition.json
```

Example schema:

```json
{
  "reference": {
    "width": 1672,
    "height": 941
  },
  "portrait": {
    "referenceBox": [xp, yp, wp, hp],
    "sourceWidth": Wp,
    "sourceHeight": Hp,
    "alphaBox": [ax, ay, aw, ah]
  },
  "halo": {
    "referenceBox": [xh, yh, wh, hh]
  },
  "relative": {
    "haloLeft": 0.0,
    "haloTop": 0.0,
    "haloWidth": 1.0,
    "haloHeight": 1.0
  }
}
```

The values must be generated/measured, not guessed in CSS.

---

# 4. Register halo to portrait mathematically

From the approved reference composition:

Portrait box:

```text
P = (xp, yp, wp, hp)
```

Halo box:

```text
H = (xh, yh, wh, hh)
```

Convert halo to portrait-relative coordinates:

```text
u  = (xh - xp) / wp
v  = (yh - yp) / hp
sw = wh / wp
sh = hh / hp
```

At runtime, if the portrait composition root is `W × H`, place the halo using:

```css
left:   calc(var(--halo-u)  * 100%);
top:    calc(var(--halo-v)  * 100%);
width:  calc(var(--halo-sw) * 100%);
height: calc(var(--halo-sh) * 100%);
```

Portrait and halo now share the same affine scale/translation.

There is no independent `92vw` vs `104vw`.

---

# 5. How to measure the portrait reference box accurately

Because the production cutout is the same photographed subject as the reference, solve its registration once.

Recommended OpenCV pipeline:

1. Use the transparent portrait source.
2. Create:
   - grayscale image
   - alpha silhouette
   - Canny edge map
3. Crop the right half of the approved reference screenshot.
4. Solve a uniform scale + translation registration.

Options:

### A. Multi-scale template matching

For candidate scales:

```text
0.4 ... 1.4
```

resize the source silhouette/edge image and run normalized template matching.

Choose the maximum score.

### B. Feature registration (more robust)

Use SIFT/ORB features on visible portrait details:

- face
- shirt collar
- suit lapels
- watch
- hands
- chair edges

Match source ↔ reference.

Use:

```python
cv2.estimateAffinePartial2D(..., method=cv2.RANSAC)
```

Constrain to near-zero rotation if needed.

The result gives the exact reference scale and translation for the portrait.

Then derive the halo relation from the reference.

This is a one-time registration operation.

---

# 6. One composition root in React/CSS

Target structure:

```tsx
<div className={styles.visualComposition}>
  <div className={styles.halo} aria-hidden="true" />
  <Image className={styles.portrait} ... />
</div>
```

Not:

```text
stage
  halo with width/top/right A
  portrait wrapper with width/bottom/right B
```

The root owns scale and placement.

Inside the root:

```css
.visualComposition {
  position: absolute;
  aspect-ratio: var(--composition-aspect);
}

.portrait {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.halo {
  position: absolute;
  left: var(--halo-left);
  top: var(--halo-top);
  width: var(--halo-width);
  aspect-ratio: 1;
}
```

If the portrait source has transparent padding, the root aspect must use the **trimmed production source** and its generated alpha-bounds metadata.

---

# 7. Mobile: fill the dead zone by fixing geometry, not adding decoration

Current portrait is pushed down by `bottom: -4rem`.

Remove that behavior.

At `359 × 807`, a composition around **109vw** using the current mobile aspect ratio would be:

```text
width ≈ 391px
height ≈ 363px
```

Anchored near the viewport bottom:

```text
top ≈ 807 - 363 = 444px
```

That puts meaningful portrait content immediately after the quote instead of around 577px.

Starting direction:

```css
@media (max-width: 768px) {
  .visualComposition {
    width: min(109vw, 27.5rem);
    right: -8vw;
    bottom: -0.25rem;
  }
}
```

This is a **starting root placement only**.

The halo inside it must use the generated registration variables.

Do not separately set halo `width/right/top` in mobile CSS.

---

# 8. Mobile visual target

At roughly 359–390px width:

- full logo + menu
- kicker
- three-line headline
- supporting text
- both CTAs
- quote
- halo begins as transition
- face appears approximately 40–55px after quote
- hands and torso are visible without scroll
- lower body may crop at the viewport edge

The mobile hero should read as one editorial poster.

It must not read:

```text
content
large blank area
portrait
```

---

# 9. Mobile crop handling

A dedicated mobile crop is acceptable, but coordinate registration must survive the crop.

If the mobile crop is taken from a master portrait source:

```text
C = (cx, cy, cw, ch)
```

and a registered element in master portrait coordinates is:

```text
(x, y, w, h)
```

transform into crop-relative coordinates:

```text
x' = (x - cx) / cw
y' = (y - cy) / ch
w' = w / cw
h' = h / ch
```

Do this in the asset-preparation script and write the resulting mobile variables to JSON/CSS.

Do not hand-adjust the mobile halo after cropping.

---

# 10. Desktop root sizing

Desktop also needs one root.

Use a single computed root width constrained by both horizontal space and available height.

Conceptually:

```css
--available-h:
  calc(100dvh - var(--header-h) - var(--hero-y-padding));

.visualComposition {
  width: min(
    48vw,
    calc(var(--available-h) * var(--composition-aspect))
  );

  right: 0;
  bottom: 0;
}
```

The exact formula should use the actual source aspect convention correctly.

The important part:

> The portrait and halo inherit the same root transform.

No `max-height` on portrait that can independently change its scale relative to the halo.

---

# 11. Background cleanup

Until registration is correct, simplify the hero:

```css
background:
  radial-gradient(
    ellipse 34rem 28rem at 78% 42%,
    rgba(255,255,255,.44),
    transparent 72%
  ),
  #f4f1ea;
```

Mobile:

```css
background:
  radial-gradient(
    ellipse 23rem 19rem at 76% 78%,
    rgba(255,255,255,.42),
    transparent 72%
  ),
  #f4f1ea;
```

No extra paper texture.
No left brush.
No gray block.
No backdrop blur in decorative layers.

---

# 12. Keep the portrait dominant

Do not shrink Dipak to make the halo fit.

Fit the composition around Dipak.

Priority:

1. face
2. hands
3. headline
4. CTA
5. halo
6. decorative accents

The Ensō is atmospheric support, not a logo that must be fully visible.

Cropping the ring at viewport edges is acceptable if the original design feels intentional.

---

# 13. Do not create another generated mask from the screenshots

This is a hard rule.

Reference screenshots are for:

- measuring composition
- checking scale/position
- visual regression

They are **not** production texture sources when foreground subjects/text cover the desired artwork.
