# Frigo — Food App

## What this is

A private, offline recipe app for Jerome's phone. He checks off what's actually in his
fridge, freezer, pantry and spice rack; the app tells him what he can cook **right now**,
or what one thing he'd need to buy. Installed on a **Samsung** as a home-screen web app.
Not iOS. Not an app store. No account, no server, no tracking.

## Who I'm building for

Jerome — **beginner cook who wants to learn**, not a chef. French, lives in Charleston SC.
Likes French, American comfort, Middle Eastern, Turkish and simple Asian food. **Wants a
kick** — food should be better than average, so lean into spice and technique, never bland.
Cooks for 1–4 people. Reads recipes on a phone with greasy hands.

His gear (editable in Settings, don't hard-code it):
Crockpot 4.5 qt · Air fryer **2 qt (small — this constrains a lot)** · Instant Pot ·
Stove & oven · Rice cooker ~1.5 qt.

## Hard rules

1. **Vanilla HTML/CSS/JS. Zero dependencies, zero build step.** No framework, no npm, no
   bundler. Open `index.html` and it runs. If a feature needs a library, find another way.
2. **Nothing leaves the phone.** All state in `localStorage`. Two exceptions, both
   opt-in and both off until Jerome pastes an address in Settings: the "Ask AI" call,
   which uses his own API key; and syncing, which POSTs the kitchen to an Apps Script
   he deployed from his own Google Sheet. `prefs` is never synced — the API key and the
   sync address stay on one device.
3. **Works offline.** No fonts, images, or scripts loaded from the internet — everything is
   bundled. A service worker caches the app on first visit.
4. **Mobile first, always.** Design at 360–412 px wide. Touch targets ≥ 44 px. Reachable
   one-handed. Desktop is an afterthought, not a target.
5. **Minimalist.** Clean, uncluttered, generous white space, one accent colour. See
   `@.claude/rules/ui-style.md` — it is binding, not a suggestion.
6. **No recipe goes in the app unless it passes the vetting rule.** Real, tested, genuinely
   well-liked recipes only — no SEO-farm filler with fake ratings. See
   `@.claude/rules/recipe-vetting.md`. When in doubt, leave it out.
7. **Ship, don't gold-plate.** Jerome asked to be pushed to finish. If a new idea arrives
   mid-build, say what it delays and ask whether the current thing is good enough to ship.

## Talking to Jerome

Short, plain English. No jargon unless he asks. Don't soften real problems to be brief.
Give detail when the decision is his — money, deleting things, anything hard to undo.

## The recipe standard

Every recipe carries more than steps. It must have:

- **Mise en place** — what to prep before the heat goes on. The habit that makes beginners
  cook well.
- **Beginner tip** — one technique explained plainly ("here's how you know it's done").
- **Make it better** — the spice or flavour move that lifts it above average.
- **Substitutions** — what to use when he's missing something.
- **Attribution** — where the dish came from, in his own words, never copy-pasted.

Steps are written to be **read out loud** — one action per step, no run-on sentences,
numbers spoken naturally ("about ten minutes", not "10-12 min").

## Layout

```
index.html      app shell and screens
styles.css      all styling, tokens at the top
app.js          inventory, matching, scaling, ratings, shopping list, planning
ingredients.js  the tick-box list Jerome starts from (data only, one item per line)
items.html      edit that list on a computer, then download the file back out
recipes.js      the recipe collection (data only, no logic)
ai.js           optional Claude API call
sync-sheet.gs   the Apps Script Jerome pastes into his own Sheet (not shipped to the app)
img/            one small WebP per recipe
manifest.json   sw.js   icons/      makes it installable and offline
style-picker.html   the ten design directions (kept for reference)
```

## Rules files

- `@.claude/rules/recipe-vetting.md` — what earns a place in the collection
- `@.claude/rules/recipe-schema.md` — the exact shape of a recipe object
- `@.claude/rules/ui-style.md` — palette, type, spacing, components
- `@.claude/rules/code-style.md` — JS conventions, state layout, offline rules

## Skills

- `add-recipe` — research, vet, and write one new recipe into the collection
- `check-phone` — serve the app and screenshot it at Samsung size

## Quality gate — before saying anything is done

- Looked at it **at phone width**, not desktop. Screenshot it.
- Both light and dark mode checked.
- Reloaded the page: state survived.
- No new dependency, no network request added.
- Any new recipe passed the vetting rule and has all five extras above.

## Publishing

Public repo `sextonjerome-cmyk/food-app`, GitHub Pages on. Jerome opens the Pages URL in
Chrome on his Samsung once and taps **Add to Home Screen**. After that, every `git push`
updates his phone. Bump the cache version in `sw.js` on each deploy or he'll see stale code.
