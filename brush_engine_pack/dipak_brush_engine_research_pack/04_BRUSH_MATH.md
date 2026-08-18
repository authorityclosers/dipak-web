# 04 — Brush Mathematics

## A. Logical coordinate system

All brush authoring happens in a fixed logical square:

```text
W = H = 1000
```

Path points are normalized or stored in this coordinate system.

Example centerline control points:

```text
(730, 185)
(600, 125)
(380, 150)
(220, 310)
(165, 520)
(250, 760)
(470, 875)
(700, 840)
(855, 660)
```

These are authoring points, not final design values.

## B. Arc-length parameterization

Do not animate using raw Bézier parameter `t` because equal `Δt` does not mean equal physical distance.

Build a dense lookup table:

```text
C(t_i)
L_i = L_{i-1} + ||C(t_i)-C(t_{i-1})||
```

Normalize:

```text
s_i = L_i / L_total
```

For reveal progress `p`, sample/interpolate the point where:

```text
s = p
```

This gives constant visual paint velocity.

## C. Tangent and normal

For centerline point `C(s)`:

```text
T(s) = normalize(dC/ds)
N(s) = (-T_y, T_x)
```

Bristle `j` sits at:

```text
B_j(s) = C(s) + N(s) * offset_j * width(s) + drift_j(s)
```

## D. Pressure / width

Use a pressure function with a loaded start, strong middle and depleted tail.

Example:

```text
p(s) = base
     + A * sin(pi*s)^gamma
     + lowFrequencyNoise(s)
```

Then:

```text
width(s) = w0 * clamp(p(s), pmin, pmax)
```

Do not make width noise white/random frame-to-frame. Use coherent noise.

## E. Dry-brush deposition

For each bristle:

```text
alpha_j(s)
= pigmentLoad(s)
* bristleWeight_j
* dryGate_j(s)
```

`dryGate` should be spatially coherent, not fresh random noise every sample.

This produces streaks instead of television static.

## F. Responsive transform

The brush SVG lives in its own 1000×1000 box.

The brush artwork has normalized position within the portrait composition root:

```text
u = (brushX - portraitX) / portraitW
v = (brushY - portraitY) / portraitH
sw = brushW / portraitW
sh = brushH / portraitH
```

Runtime:

```css
left:   calc(var(--halo-u)  * 100%);
top:    calc(var(--halo-v)  * 100%);
width:  calc(var(--halo-sw) * 100%);
height: calc(var(--halo-sh) * 100%);
```

This relation is invariant under any uniform composition-root resize.

## G. Mobile crop

If the mobile portrait is a crop of the desktop master, map coordinates mathematically:

```text
x' = (x - cropX) / cropW
y' = (y - cropY) / cropH
w' = w / cropW
h' = h / cropH
```

Do not re-eyeball the brush position after cropping.
