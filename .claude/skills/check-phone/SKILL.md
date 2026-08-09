---
name: check-phone
description: Serve the Frigo app locally and screenshot it at Samsung phone size in both dark and light mode. Use before claiming any UI change is done, and whenever a screen's layout, spacing, or colours changed. Triggers on "check how it looks", "screenshot the app", "does this fit on the phone".
---

# Look at it on the phone

Frigo is only ever used on a Samsung. Desktop-width Chrome will lie to you about spacing,
touch targets, and how much fits above the fold. Never call a UI change done without this.

## Serve it

```powershell
python -m http.server 8777
```

Run it in the background from the project root. The app is a static site — no build.

## Drive Chrome

Use the `chrome-devtools` MCP tools:

1. `start_chrome_and_connect` → `navigate_to_url` `http://localhost:8777`
2. Set the viewport to **412 × 915** (Galaxy S-series) with a device pixel ratio of 3.
   Also spot-check **360 × 800** — the narrowest phone worth supporting.
3. Screenshot the screen you changed.
4. Toggle the theme and screenshot again. Dark is primary; light must still be good.

## What to actually look for

- **Nothing scrolls sideways.** Check `document.scrollingElement.scrollWidth` against
  `clientWidth` — they must match.
- **Touch targets ≥ 44 px.** Checkboxes and nav items especially; they get tapped hundreds
  of times.
- **Body text is 16 px or more.** This is read across a counter, not held to your face.
- **The bottom nav clears the home bar** — `env(safe-area-inset-bottom)` is respected.
- **Amber is the only saturated colour** apart from the food photos. Per
  `@.claude/rules/ui-style.md`.
- **Reload the page.** Inventory, ratings and the shopping list must all survive.
- **Console is clean.** `get_console_error_summary`.

## Report

Show Jerome the screenshot, not a description of it. If something's off, say what and fix
it before moving on.
