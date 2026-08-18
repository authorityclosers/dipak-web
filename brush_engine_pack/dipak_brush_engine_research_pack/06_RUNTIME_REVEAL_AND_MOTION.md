# 06 — Runtime Reveal + Hero Motion

## Brush reveal

The underlying texture is complete from first render.

Animate the reveal mask path.

Native version:

```css
.revealPath {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: paintReveal 820ms cubic-bezier(.16,1,.3,1) 110ms forwards;
}

@keyframes paintReveal {
  to { stroke-dashoffset: 0; }
}
```

With `pathLength="1"`, values remain normalized.

## GSAP option

If GSAP is introduced for the next-section scroll transition, use DrawSVG on the reveal path.

Do not use DrawSVG to synthesize texture. It only controls the reveal.

## Hero intro timing

Suggested sequence:

```text
0ms      canvas/background already visible
80ms     wordmark/nav settle in
100ms    brush begins paint reveal
160ms    portrait subtle 8px/0.995 → final
200ms    headline lines reveal
480ms    supporting copy
540ms    CTAs
610ms    quote
~900ms   brush reveal complete
```

No loader.
No scroll lock.
No 2–3 second cinematic delay.

## Pointer interaction

Only on fine pointers and only after static QA.

Move the entire registered visual composition by 2–3px maximum.

If doing halo-vs-portrait parallax, keep it under ~2px so registration never visibly breaks.

## Reduced motion

Render final brush fully revealed and all content in final positions.
