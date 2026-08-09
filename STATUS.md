# Frigo — where this stands

**Last worked: 2026-08-09.** Read `CLAUDE.md` first, then `.claude/rules/`.

## What Frigo is

Jerome's food app. Check off what's actually in the fridge / freezer / pantry /
spices; it finds something good to cook right now, or tells him the one thing to
buy. Offline web app installed on his Samsung home screen. Nothing leaves the
phone except the optional "invent me something" call.

## Decisions already made — don't re-litigate these

| Decision | Answer |
|---|---|
| Look | **Dark Kitchen** — Jerome picked #4 from a ten-way style picker on 2026-08-09. Tokens are in `.claude/rules/ui-style.md` and are binding. |
| Platform | Web app on **Samsung**, added to home screen. Not iOS, not an app store. |
| Recipes | **Both** — a researched built-in collection *plus* an "Ask AI" button. |
| Recipe quality | Researched and vetted, never invented. Jerome was explicit: no SEO-farm filler with fake 4.8 stars. The bar is in `.claude/rules/recipe-vetting.md`. |
| Servings | Selectable 1–8, quantities scale. |
| Ratings | 1–5 stars; high ones resurface. |
| Name | Working name **Frigo**. Renameable. |

## Built and verified

Everything below was driven end-to-end in headless Chrome at 412×915 with a
probe recipe, console clean, no sideways scroll, state surviving reload:

- `index.html` `styles.css` `app.js` — all five screens: Cook (filters →
  ranked photo cards), Fridge (4 tabs, 44+ items each, search, add-your-own,
  running-low flag), Shopping list (grouped by store aisle), Plan ahead,
  Settings / My Kitchen (appliances are editable, not hard-coded).
- Recipe view: scaled ingredients with have/missing, mise en place, numbered
  steps, tap-to-start timers, star rating, "plan this", "what did I use up?".
- Cook-along: one step at a time, read aloud, big Next, screen stays awake.
- `ai.js` — the Claude API call (`claude-opus-5`, structured outputs so the
  recipe always parses). Raw fetch, no SDK — zero-dependency rule.
- `manifest.json`, `sw.js`, `icons/` — installs and runs offline.
- `style-picker.html` — the ten design directions, kept for reference.

## The collection — 11 recipes, researched and in

`recipes.js` is no longer empty. Every entry was researched against
`.claude/rules/recipe-vetting.md` and carries a `vetting` line naming the actual
evidence, plus all five extras (mise en place, beginner tip, make it better,
substitutions, attribution).

| Recipe | Appliance | Source behind it |
|---|---|---|
| Poulet à la Moutarde | stove | Jacques Pépin (NYT) |
| Shakshuka | stove | America's Test Kitchen |
| Menemen | stove | Turkey's For Life + Foolproof Living |
| Mapo Tofu | stove | Chinese Cooking Demystified + Kenji |
| Smash Burger | stove | Kenji López-Alt, Serious Eats |
| Garlic Lemon Butter Shrimp | stove | America's Test Kitchen |
| Crockpot Beef Stew | crockpot | Budget Bytes |
| Red Lentil Soup with Lemon | instantpot | Melissa Clark (NYT) |
| Air Fryer Salmon | airfryer | America's Test Kitchen |
| Crispy Air Fryer Chickpeas | airfryer | ATK + Skinnytaste |
| Air Fryer Chicken Thighs | airfryer | ATK method + Budget Bytes |

**One slot was deliberately left empty.** A second crockpot recipe (Moroccan
chickpea stew) was researched and dropped — every result was blog-tier with no
tested kitchen or named cook behind it. The rule says leave it out, so it is out.

**The 2 qt air fryer is honoured, not pretended about.** All three air-fryer
recipes are written as two-serving dishes with `scalable: [1, 2]`, because two
salmon fillets or two bone-in thighs is genuinely what that basket holds.
At 4 servings the app now says *"Tight fit in your 2 qt air fryer at 4 servings —
cook it in two batches"* — verified on screen.

### Fixed while checking

`app.js` had no `other` entry in `CUISINES`, so the two recipes with
`cuisine: "other"` rendered as **"FOOD"** in the eyebrow and could not be
filtered to. Added `['other','Other']`.

## Verified 2026-08-09

Driven in headless Chrome at 412 × 915, device pixel ratio 3, with all 11
recipes loaded:

- Cook screen ranks and matches — 11 matches, missing-ingredient counts correct.
- Recipe screen renders scaled quantities, subs, mise en place, numbered steps
  with tap-to-start timers, beginner tip, make-it-better, rating, attribution.
- **No sideways scroll** — `scrollWidth` 412 = `clientWidth` 412 on every screen.
- **Both themes checked.** Dark is primary and right; light is warm, not clinical.
- **State survives reload** — ratings, shopping list and ticked inventory all came
  back.
- **Console clean**, zero errors, zero warnings.
- `sw.js` `CACHE_VERSION` bumped to `frigo-v2`.

## Then

1. One free-licence photo per recipe → 600 px WebP, ~40 KB, into `img/`.
   Until then the app draws its own placeholder tile, which is honest — but it
   takes about half the screen per card, so photos are the biggest visible win
   left.
2. More recipes when wanted. Eleven is a real collection, not a demo; the
   `add-recipe` skill does one start to finish.
3. Public repo `sextonjerome-cmyk/food-app`, GitHub Pages on, Jerome opens the
   URL in Chrome on the Samsung once and taps **Add to Home Screen**.
   **Bump `CACHE_VERSION` in `sw.js` on every deploy** or his phone runs old code.

## How to look at it

```
python -m http.server 8777       # from this folder
```
Then Chrome at 412×915. The `check-phone` skill does this properly.
