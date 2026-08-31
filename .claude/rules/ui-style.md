# Rule — the look: After Dark

Jerome picked **G, After Dark**, from the eight-way redesign on 2026-08-31, replacing the
original "Dark Kitchen" (style 04, chosen 2026-08-09). This file is binding. Don't improvise
a new palette; extend this one. The old amber palette is gone — if you find amber anywhere,
it is a leftover, not a choice.

**The idea:** a deep indigo room with one electric lime in it, and the lime only ever means
*you can cook this*. Coral only ever means *you can't yet*. Violet is *one thing away*.
Colour is never decoration here: if something on the screen is bright, it is answering the
question the app exists to answer. Everything else stays quiet so the food photos and the
lime are the only things that pull your eye.

**Dark is the primary.** Light mode exists and must be good, but it is the counterpart. In
light, the lime darkens to an olive so it still passes contrast on white — it loses some of
its electricity, and that is the right trade.

## Tokens

Declare all of these on bare `:root` (dark values, since dark is primary), then override
the whole set under `@media (prefers-color-scheme: light){ :root:not([data-theme="dark"]) }`
and again under `:root[data-theme="light"]`. **Never** declare a colour only inside a media
block. `body` always sets an explicit `background: var(--bg)`.

```css
:root{
  /* ground — deep indigo, never pure black */
  --bg:        #0E1020;   /* the room */
  --surface:   #171A31;   /* cards */
  --surface-2: #1F2340;   /* chips, inputs, pressed states */
  --line:      #2A2F52;   /* hairlines */
  --line-2:    #3A4070;   /* borders that need to be seen */

  /* ink */
  --ink:       #EEF0FA;   /* cool off-white, never #FFF */
  --ink-2:     #9096BE;   /* secondary text */
  --ink-3:     #666C96;   /* disabled, placeholders */

  /* the one accent — electric lime. It means READY, nowhere else. */
  --accent:    #B8F03C;
  --accent-2:  #C9F76A;   /* hover / lighter */
  --accent-ink:#141A05;   /* text ON lime — near-black, always */
  --accent-dim:#222C18;   /* lime-tinted fill for soft badges */

  /* semantic — each one is a state, never a decoration */
  --have:      #B8F03C;   /* got it — the same lime, on purpose */
  --near:      #8B7BF7;   /* one thing away */
  --need:      #FF7A5C;   /* must buy */
  --warn:      #FFC24D;   /* won't fit the air fryer */

  --r:14px; --r-sm:10px; --r-pill:999px;
  --shadow:0 10px 30px -14px rgba(0,0,0,.9);
}
```

**Light mode** keeps the same roles, cool throughout:
`--bg #F5F6FC` · `--surface #FFFFFF` · `--surface-2 #ECEEF8` · `--line #E1E4F1` ·
`--line-2 #C6CBE2` · `--ink #11132A` · `--ink-2 #545A80` · `--ink-3 #858AAC` ·
`--accent #4C6B00` (the lime darkened to olive so it passes contrast on white) ·
`--accent-ink #FFFFFF` · `--accent-dim #EEF6DA` · `--near #5B45C9` · `--need #C2412A`.

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
- **The score** — the Cook screen opens with one number: how many dishes are cookable right
  now, in `--accent` at 42 px, above a three-part bar (lime / violet / `--line-2`). It is the
  answer to the app's only real question, so nothing goes above it.
- **Quick chips** — a single scrolling row under the score: Everything · Ready now · Under 30
  min · One pan · Big kick · Vegetarian · Going off. `--surface` fill, `--line` border, 44 px
  tall; the chosen one fills `--accent` with `--accent-ink` text. They narrow what is listed,
  never what the score counts.
- **Bottom nav** — four items: Cook · Fridge · List · Plan. Active in `--accent`. Sits above
  `env(safe-area-inset-bottom)`.
- **Cook-along mode** — one step at a time, step text at 22 px, huge Next button, everything
  else dimmed to `--ink-3`. This is read from three feet away.

## Layout

Design at **360–412 px**. One column, always. `gap` on flex/grid containers — no per-element
margins. Page padding 16 px, 20 px inside cards. Content never scrolls sideways: tables and
long rows get their own `overflow-x: auto`.

## Don't

- No pure `#000` or pure `#FFF` anywhere. No amber — that was the previous palette.
- No second accent colour. Lime is it. Violet and coral are states, not decoration — never
  use them to make something look nice.
- Never use lime for anything that isn't "ready". The moment it decorates a heading, it stops
  meaning anything.
- No gradients, no glassmorphism, no blur — that was a different specimen.
- No emoji as UI furniture. Icons are inline SVG, `currentColor`, 20 px.
- No animation beyond 150 ms state fades, and all of it inside
  `@media (prefers-reduced-motion: reduce)` guards.
- No decorative element that isn't carrying information.
