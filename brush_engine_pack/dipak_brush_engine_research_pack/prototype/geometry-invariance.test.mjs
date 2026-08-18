const meta = {
  desktop: { u: -0.34597, v: -0.39152, sw: 1.06174, sh: 0.84970 },
  mobile:  { u: -0.34597, v: -0.52729, sw: 1.06174, sh: 1.14435 },
};

const roots = [
  [320, 400], [360, 450], [520, 650], [700, 875], [900, 1125],
];

function rect(rootW, rootH, m) {
  return {
    x: m.u * rootW,
    y: m.v * rootH,
    w: m.sw * rootW,
    h: m.sh * rootH,
  };
}

function normalized(r, rootW, rootH) {
  return { u: r.x/rootW, v: r.y/rootH, sw: r.w/rootW, sh: r.h/rootH };
}

for (const mode of ['desktop', 'mobile']) {
  const m = meta[mode];
  for (const [w,h] of roots) {
    const n = normalized(rect(w,h,m),w,h);
    for (const k of ['u','v','sw','sh']) {
      if (Math.abs(n[k]-m[k]) > 1e-12) throw new Error(`${mode} ${w}x${h} drift in ${k}`);
    }
  }
}
console.log('PASS: normalized brush registration is invariant under composition-root resizing');
