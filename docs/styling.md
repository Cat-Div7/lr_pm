# Styling Guide

Everything about colors, fonts, spacing, and utility classes.
Read this before writing a single `className`.

---

## How the system works

We use **Tailwind v4+** with `@theme inline` inside `src/index.css`.
Every CSS variable defined under `@theme inline` automatically becomes a Tailwind utility class.

```css
/* defined in index.css */
--color-brand-purple: oklch(0.52 0.28 275);

/* automatically available as */
bg-brand-purple
text-brand-purple
border-brand-purple
ring-brand-purple
```

No config file. No plugin. Just define the variable → use the class.

---

## Fonts

| Variable | Class | Use for |
|----------|-------|---------|
| `--font-display` → Nunito | `font-display` | All headings, hero text, badges, buttons |
| `--font-sans` → Plus Jakarta Sans | `font-sans` | All body text, descriptions, labels |
| `--font-mono` → Space Grotesk | `font-mono` | Numbers, stats, scores, code snippets |

```tsx
<h1 className="font-display font-black text-4xl">Hero Heading</h1>
<p className="font-sans text-ink-muted">Body paragraph text</p>
<span className="font-mono text-2xl">4,820</span>
```

---

## Brand colors

These are Luminary's own colors — use them for all design decisions.

### Primary palette

| Class | Color | Use |
|-------|-------|-----|
| `bg-brand-purple` | `#6C3EFF` | Primary buttons, active states, key accents |
| `bg-brand-violet` | `#9B72FF` | Hover states on purple elements |
| `text-brand-lavender` | `#A78BFA` | Accent text, icon fills, secondary labels |
| `bg-brand-coral` | `#FF5C6C` | Secondary CTA, alerts, "New" badges |
| `bg-brand-amber` | `#F59E0B` | Streak indicators, warnings, gold rewards |
| `bg-brand-lime` | `#22C55E` | Success states, correct answers, completion |

### Surface colors (backgrounds)

| Class | Color | Use |
|-------|-------|-----|
| `bg-surface-dark` | `#0D0D14` | Main page background — body default |
| `bg-surface-mid` | `#13121F` | Section backgrounds, alternating rows |
| `bg-surface-card` | `#1A1828` | Card backgrounds before glass effect |
| `bg-surface-card-hover` | `#1E1C2E` | Card background on hover |

### Text colors

| Class | Color | Use |
|-------|-------|-----|
| `text-ink` | `#F8F6FF` | Main headings, important labels |
| `text-ink-muted` | `#C4B5FD` | Body text, descriptions, secondary info |
| `text-ink-faint` | `#6B6885` | Placeholders, disabled text, timestamps |

### Border colors

| Variable | Use |
|----------|-----|
| `--color-edge` (18% opacity lavender) | Default card border — use in `.glass-card` |
| `--color-edge-glow` (50% opacity lavender) | Card border on hover / active state |

---

## shadcn semantic colors

shadcn components use their own token names internally.
You do not need to use these for custom UI, but know what they map to:

| shadcn class | Maps to |
|-------------|---------|
| `bg-background` | `#0D0D14` (same as `bg-surface-dark`) |
| `bg-primary` | `#6C3EFF` (same as `bg-brand-purple`) |
| `text-foreground` | `#F8F6FF` (same as `text-ink`) |
| `text-muted-foreground` | muted lavender text |
| `bg-card` | dark card surface |
| `border-border` | subtle border |

**Rule:** For shadcn components (`<Button>`, `<Input>`, `<Card>`) → let them use their own tokens.
For your own custom elements → use `brand-*`, `surface-*`, `ink-*` tokens.

---

## Radius

| Class | Value | Use |
|-------|-------|-----|
| `rounded-sm` | ~7px | Small badges, tags |
| `rounded-md` | ~11px | Inputs, small buttons |
| `rounded-lg` | ~12px | Standard cards |
| `rounded-xl` | ~18px | Large cards, modals |
| `rounded-2xl` | ~24px | Hero cards, featured sections |
| `rounded-3xl` | ~31px | Large feature blocks |
| `rounded-pill` | 9999px | Pills, tags, round buttons |

---

## Shadows

| Class | Use |
|-------|-----|
| `shadow-glow` | Purple glow on active/highlighted cards |
| `shadow-glow-coral` | Coral glow on secondary CTA buttons |
| `shadow-card` | Standard subtle shadow on cards |

```tsx
<div className="glass-card shadow-glow">Featured card</div>
<button className="bg-brand-coral shadow-glow-coral">Enroll Now</button>
```

---

## Utility classes (hand-made — check before writing custom styles)

These are defined in `src/index.css` under `@layer utilities`.
Always check if one of these does what you need before writing raw CSS.

### `.glass-card`

The standard card used on almost every page.
Dark blurred background with a subtle lavender border.

```tsx
<div className="glass-card rounded-2xl p-6">
  Card content
</div>
```

On hover the border brightens automatically (defined in CSS).
If you need a glow on hover, add `hover:shadow-glow` as well.

### `.gradient-text`

White → lavender → violet gradient. For hero headings or large display text.

```tsx
<h1 className="font-display font-black text-5xl gradient-text">
  Master anything.
</h1>
```

### `.gradient-text-purple`

Violet → purple gradient. For highlighted words inside a heading.

```tsx
<h2 className="font-display font-bold text-3xl text-ink">
  Learn{" "}
  <span className="gradient-text-purple">smarter</span>
  , not harder.
</h2>
```

### `.mesh-bg`

Purple radial glow background for hero sections.
Combine with `.grid-overlay` for the subtle grid on top.

```tsx
<section className="mesh-bg grid-overlay min-h-screen">
  Hero content
</section>
```

### `.glow-border`

Glowing purple border + shadow for highlighted/featured cards.
Use on the "Most Popular" pricing card or a featured course.

```tsx
<div className="glass-card glow-border rounded-2xl p-6">
  Featured
</div>
```

### `.custom-scroll`

Dark purple-themed scrollbar. Add to any scrollable container.

```tsx
<div className="overflow-y-auto custom-scroll h-64">
  Long list
</div>
```

---

## What NOT to do

```tsx
// Never hardcode hex values
<div style={{ backgroundColor: "#6C3EFF" }} />

// Never use arbitrary Tailwind values for brand colors
<div className="bg-[#6C3EFF]" />

// Never write inline styles for anything in the design system
<div style={{ borderRadius: "20px", color: "#C4B5FD" }} />

// Always use tokens
<div className="bg-brand-purple rounded-xl text-ink-muted" />
```

---

## Example — building a card from scratch

```tsx
<div className="glass-card rounded-2xl p-6 hover:shadow-glow transition-shadow duration-300">

  {/* Category badge */}
  <span className="bg-brand-purple/20 text-brand-lavender text-xs font-display font-bold
                   px-3 py-1 rounded-pill uppercase tracking-wide">
    Design
  </span>

  {/* Title */}
  <h3 className="font-display font-bold text-ink text-lg mt-3 leading-snug">
    Complete UI/UX Design Masterclass
  </h3>

  {/* Description */}
  <p className="font-sans text-ink-muted text-sm mt-2 leading-relaxed">
    From wireframes to polished interfaces — learn everything.
  </p>

  {/* Stats */}
  <div className="flex items-center gap-3 mt-4 text-ink-faint text-xs font-mono">
    <span>⭐ 4.9</span>
    <span>·</span>
    <span>38h</span>
    <span>·</span>
    <span>210 lessons</span>
  </div>

  {/* CTA */}
  <button className="mt-5 w-full bg-brand-purple hover:bg-brand-violet text-ink
                     font-display font-bold rounded-pill py-3 text-sm
                     transition-colors duration-200 shadow-glow">
    Enroll Now
  </button>

</div>
```