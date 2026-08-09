# Rule — the look: Dark Kitchen

Jerome picked **style 04, Dark Kitchen**, from the ten-way style picker on 2026-08-09.
This file is binding. Don't improvise a new palette; extend this one.

**The idea:** a dark, quiet room where the food is the only bright thing. Near-black ground,
warm amber accent, photos that glow. It reads well in a dim kitchen at night, doesn't blast
your eyes at 6 a.m., and makes even a plain chicken thigh look worth cooking.

**Dark is the primary.** Light mode exists and must be good, but it's the counterpart, not
the default. It is warm, not clinical — think daylight in the same room, never cold white.

## Tokens

Declare all of these on bare `:root` (dark values, since dark is primary), then override
the whole set under `@media (prefers-color-scheme: light){ :root:not([data-theme="dark"]) }`
and again under `:root[data-theme="light"]`. **Never** declare a colour only inside a media
block. `body` always sets an explicit `background: var(--bg)`.

```css
:root{
  /* ground — warm-biased near-black, never pure #000 */
  --bg:        #111010;   /* the room */
  --surface:   #1B1918;   /* cards */
  --surface-2: #262320;   /* chips, inputs, pressed states */
  --line:      #2C2926;   /* hairlines */
  --line-2:    #443F3A;   /* borders that need to be seen */

  /* ink */
  --ink:       #F3EEE6;   /* warm off-white, never #FFF */
  --ink-2:     #9B938A;   /* secondary text */
  --ink-3:     #6B645C;   /* disabled, placeholders */

  /* the one accent — warm amber */
  --accent:    #E7A23C;
  --accent-2:  #F2BC66;   /* hover / lighter */
  --accent-ink:#1A1512;   /* text ON amber — dark, always */
  --accent-dim:#2A2119;   /* amber-tinted fill for soft badges */

  /* semantic — separate from the accent, used sparingly */
  --have:      #6FBF7F;   /* got it */
  --need:      #E07B5C;   /* must buy */
  --warn:      #D9A441;   /* won't fit the air fryer */

  --r:14px; --r-sm:10px; --r-pill:999px;
  --shadow:0 10px 30px -14px rgba(0,0,0,.9);
  --glow:0 0 0 1px var(--line), 0 8px 26px -14px rgba(231,162,60,.35);
}
```

**Light mode** keeps the same roles, warm throughout:
`--bg #FAF7F2` · `--surface #FFFFFF` · `--surface-2 #F2ECE3` · `--line #E8E0D5` ·
`--line-2 #D2C7B8` · `--ink #211D19` · `--ink-2 #6E655B` · `--ink-3 #9A9087` ·
`--accent #B5701A` (darkened so it passes contrast on a light ground) ·
`--accent-ink #FFFFFF` · `--accent-dim #F7EBD8`.

## Type

System fonts only — nothing is downloaded, so nothing can fail to load or leak a request.

```css
--font: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
--font-num: ui-monospace, "Roboto Mono", Consolas, monospace;
```

Scale, and stay on it: `28 / 22 / 19 / 16 / 14.5 / 12.5 / 10.5`.
Body 16 px minimum — this is read at arm's length across a counter. Headings 620–650 weight
with `-0.015em` tracking and `text-wrap: balance`. Eyebrows and labels: 10.5 px, uppercase,
`0.13em` tracking, 650 weight, in `--ink-2`. **All quantities and timers get
`font-variant-numeric: tabular-nums`** so they don't jitter.

## Components

- **Cards** — `--surface`, `--r`, 1 px `--line` border, `--shadow`. Photo bleeds to the card
  edge at the top, no inset, no rounded corner fighting the card's own radius.
- **Photos are the only saturated thing on screen.** Everything around them stays quiet.
- **Buttons** — primary is amber fill with `--accent-ink` text, `--r-sm`, 14 px vertical
  padding. Secondary is transparent with a `--line-2` border. Minimum 44 px tall, always.
- **Chips** — `--surface-2` fill, `--ink-2` text, pill radius, 11 px.
- **Checkboxes** — 22 px, `--r-sm`, `--line-2` border; checked fills `--accent` with an
  `--accent-ink` tick. These get tapped constantly, so give them a 44 px hit area with
  padding, not size.
- **Bottom nav** — four items: Cook · Fridge · List · Plan. Active in `--accent`. Sits above
  `env(safe-area-inset-bottom)`.
- **Cook-along mode** — one step at a time, step text at 22 px, huge Next button, everything
  else dimmed to `--ink-3`. This is read from three feet away.

## Layout

Design at **360–412 px**. One column, always. `gap` on flex/grid containers — no per-element
margins. Page padding 16 px, 20 px inside cards. Content never scrolls sideways: tables and
long rows get their own `overflow-x: auto`.

## Don't

- No pure `#000` or pure `#FFF` anywhere.
- No second accent colour. Amber is it. Semantic green/orange are status, not decoration.
- No gradients, no glassmorphism, no blur — that was a different specimen.
- No emoji as UI furniture. Icons are inline SVG, `currentColor`, 20 px.
- No animation beyond 150 ms state fades, and all of it inside
  `@media (prefers-reduced-motion: reduce)` guards.
- No decorative element that isn't carrying information.
