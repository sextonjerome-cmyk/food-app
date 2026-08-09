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

## Filling the kitchen — three ways in

1. **Tap a row.** Each tab holds 45-odd items; tapping ticks it.
2. **Type in the search box.** Finds an item, or offers to add what you typed.
   If the word is a synonym of something already listed it offers to tick *that*
   instead of making a duplicate, and names the tab it lives on.
3. **"Say or paste my whole kitchen"** — the fast one. Under the search box on
   the Fridge screen. Tap it, tap the **keyboard's microphone**, say the kitchen
   out loud. One spoken sentence ticked seven items in testing. No link, no
   server, no API key, works offline.

A `#have=eggs,harissa,prawns` link also works (Claude can generate one; tapping
it ticks the lot) — kept because it costs nothing, but the microphone is the
route to show people.

### Fixing a name that's spelt wrong

Two routes, because the list lives in two places.

- **On the phone** — tap the ⊕ on any row, then **Fix the spelling**. The ticked
  state, the running-low flag and anything already on the shopping list all
  follow the new name. Renaming a built-in row hides the original and adds the
  corrected one beside it, so it looks like an edit in place. Renaming onto a
  name that already exists merges the two instead of making a duplicate.
- **On the computer** — open **`items.html`**. All 144 rows, each with its name,
  its aisle and a staple toggle. It refuses to hand you a file with a duplicate
  or an empty name in it. **Download ingredients.js** and drop it in the folder,
  replacing the old one; a round trip through it was verified byte-identical.

The list itself moved out of `app.js` into **`ingredients.js`**, one item per
line — that alone makes it editable in VS Code without hunting through code.

### It understands his words

Names reduce to a head noun plus qualifying words, through a synonym table
covering the French and British names Jerome actually uses: coriandre/coriander →
cilantro, courgette, aubergine, prawns, double cream, mince, pul biber,
doubanjiang, garbanzo, spring onions/scallions.

**Deliberately narrow as well as wide** — "chicken stock" matches "chicken broth"
but **not** "beef stock"; "black pepper" never matches "red bell pepper".
31 cases including every false-positive guard are verified against real recipe
data via `window.FrigoTest`.

## Bugs found and fixed — the ones worth remembering

- **An always-on overlay swallowed every tap.** `.sheet{display:flex}` outranks
  the browser's `[hidden]{display:none}`, so the bottom sheet sat permanently at
  `inset:0, z-index:70` over the whole app. Two symptoms, one cause: nothing was
  tappable, and both themes looked washed out (that was its scrim).
  **It shipped because the phone check used synthetic `.click()`, which skips
  hit-testing entirely.** `check-phone` now requires real touch events.
- **Anything rendered after a long list is off the bottom of the screen.** Three
  separate affordances got lost this way (y≈2824 on a 915-tall screen). Put
  actions *above* the list.
- **`render()` swallowed exceptions**, leaving the previous screen on the glass —
  a typo read as "the app is unresponsive". Failures are shown now.
- **A tapped `#have=` link did nothing when the app was already open**, because
  changing only the hash is a same-document navigation. Handled on `hashchange`.
- **`sameItem`'s subset rule ate words.** "eggs milk butter garlic" matched plain
  *garlic* and swallowed the three words in front of it — nine spoken items came
  back as three. Window matching now requires equal significant-word weight.
- **`CUISINES` had no `other` entry**, so two recipes rendered as "FOOD" and
  couldn't be filtered to.
- **The shopping list guessed each item's aisle** from its name while every
  ingredient already declares a hand-checked one.
- **The ⊕ on an inventory row was a 34 px target** and the 44 px audit never saw
  it, because the audit only measured `button`, `input` and `.tab` — the ⊕ is a
  `span`. It's 44 px now, and the row height is unchanged because the padding
  above it paid for the difference.
- **A cache-first service worker will hand you yesterday's file.** Two rounds of
  "the fix didn't work" were the worker serving the old `styles.css` and
  `items.html`. The phone check now unregisters the worker and drops every cache
  before it tests anything. `items.html` loads `ingredients.js` with a
  cache-busting query for the same reason.

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
- **Driven with real taps**, not synthetic clicks — filters, bottom nav, ticking
  an ingredient, opening a recipe, the servings stepper, star rating, cook-along,
  and the say-your-kitchen sheet, all confirmed by finger at real coordinates.
- **Every touch target measured ≥ 44 px.** Chips and bar buttons were 40, steppers
  38 — all raised.
- `sw.js` `CACHE_VERSION` is at **`frigo-v8`** (eight deploys). Bump it every time.

## Then

1. One free-licence photo per recipe → 600 px WebP, ~40 KB, into `img/`.
   Until then the app draws its own placeholder tile, which is honest — but it
   takes about half the screen per card, so photos are the biggest visible win
   left.
2. More recipes when wanted. Eleven is a real collection, not a demo; the
   `add-recipe` skill does one start to finish.
3. ~~Publish.~~ **Done 2026-08-09.**

## It's live

**https://sextonjerome-cmyk.github.io/food-app/**

Public repo `sextonjerome-cmyk/food-app`, GitHub Pages on from `main` at root,
HTTPS enforced. Every file verified served from the live URL, all 11 recipes
included.

**Jerome's one manual step:** open that URL in Chrome on the Samsung and tap
**Add to Home Screen**. After that, every `git push` updates his phone.

**Bump `CACHE_VERSION` in `sw.js` on every deploy** or his phone runs old code.
Currently `frigo-v8`.

## How to look at it

```
python -m http.server 8777       # from this folder
```
Then Chrome at 412×915. The `check-phone` skill does this properly.
