# Featured In — Icon + Name Rail

## Goal

Upgrade the current floating text list without making it look like a social-media footer.

### Visual

- monochrome mark: 14–18px
- name: 15–18px serif/sans depending final system
- brand cells separated by very faint neutral hairlines or whitespace
- gold is used only in the `FEATURED IN` label / arrow, not every icon

## Component

```tsx
type MediaItem = {
  label: string;
  icon?: ReactNode;
};

const mediaItems = [
  { label: 'Medium', icon: <MediumMark /> },
  { label: 'Dailyhunt', icon: <DailyhuntMarkOrNull /> },
  { label: 'YouTube', icon: <YouTubeMark /> },
  { label: 'Podcast', icon: <PodcastGlyph /> },
  { label: 'LinkedIn', icon: <LinkedInMark /> },
];
```

Do not block the section on Dailyhunt icon sourcing. A consistent typographic Dailyhunt item is better than a fabricated brand mark.

## Desktop

```css
.mediaRail {
  display:grid;
  grid-template-columns: minmax(150px, .8fr) repeat(5, minmax(0, 1fr));
  align-items:center;
  gap: 0;
}

.mediaItem {
  min-width:0;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
}
```

## Mobile

```css
.mediaRail {
  display:block;
}

.mediaGrid {
  margin-top:14px;
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:14px 18px;
}

.mediaItem {
  justify-content:flex-start;
}
```

## Asset policy

- Prefer local SVG markup/assets over CDN requests.
- Normalize all marks to `currentColor`.
- Do not recolor into platform brand colors.
- Keep accessible text labels even when an icon is present.
