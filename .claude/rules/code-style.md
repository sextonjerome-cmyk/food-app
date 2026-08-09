# Rule — how the code is written

## Non-negotiable

- **Vanilla JS, no build step, no dependencies.** Open `index.html` in a browser and it
  works. If something seems to need a library, it doesn't — write the twenty lines.
- **No network requests** except the one optional Claude API call in `ai.js`. No fonts, no
  CDNs, no analytics, no icon packs. Everything ships in the repo.
- **ES modules are fine** (`<script type="module">`); every browser Jerome will use has them.

## State

One object, one key, one place:

```js
const KEY = 'frigo.v1';

const state = {
  inventory: { fridge:{}, freezer:{}, pantry:{}, spices:{} }, // { "dijon mustard": {have:true, low:false} }
  custom:    { fridge:[], freezer:[], pantry:[], spices:[] }, // items Jerome added himself
  appliances:[ {id:'crockpot', name:'Crockpot', qt:4.5}, … ], // editable, not hard-coded
  ratings:   {},          // { recipeId: 4 }
  cooked:    {},          // { recipeId: '2026-08-09' }
  favorites: [],
  shopping:  [],          // [{ item, aisle, qty, unit, from: recipeId, done:false }]
  planned:   [],          // [{ recipeId, date, servings }]
  aiRecipes: [],          // AI recipes Jerome rated 4-5, kept forever
  prefs:     { servings:2, spice:3, theme:'auto', apiKey:'' }
};
```

- `save()` writes the whole object; `load()` merges over the defaults so a new field never
  breaks an old save. **Always merge, never replace** — Jerome's inventory is real data.
- Debounce saves to ~300 ms; checkbox taps come in bursts.
- Bump `KEY` only for a breaking change, and write a migration when you do.

## Structure

Plain functions grouped by screen. No classes, no state library, no framework patterns.

```
app.js
  ├─ state / load / save
  ├─ render()          — one entry point, re-renders the active screen
  ├─ screenCook()      screenFridge()  screenList()  screenPlan()  screenSettings()
  ├─ matchRecipes()    — filter + rank
  ├─ scale()           — servings maths
  └─ helpers
```

`render()` is the only thing that touches the DOM at the top level. Screens return strings
or build nodes; they don't reach into each other.

## Matching and scaling

- **Rank by:** fewest missing non-staple ingredients → then star rating → then "uses
  something flagged low" → then least-recently-cooked. Never random.
- Staples (`staple: true`) don't count as missing unless explicitly unchecked.
- `scale()` multiplies only ingredients with `scale: true`. Round sensibly: whole eggs and
  whole chicken thighs are integers; tablespoons go to the nearest ¼.
- Check `capacityQt × (servings / baseServings)` against the chosen appliance's `qt` and
  warn at 80% — a 2 qt air fryer really holds about 1.2 qt.

## Text-to-speech

`speechSynthesis` only, no library. Read one step at a time and hold the index in a local
variable, not in `state` — it isn't worth persisting. Always `cancel()` before `speak()`, or
Android queues them up and talks over itself. Request a `wakeLock` when cook-along opens and
release it on exit; wrap it in `try/catch` because it isn't guaranteed.

## Offline

`sw.js` caches every file at install. **Bump `CACHE_VERSION` on every deploy** — forget this
and Jerome's phone runs old code and you'll waste an hour debugging a bug you already fixed.

## Style

- `const` by default, `let` when it changes, never `var`.
- Real names: `missingIngredients`, not `m`. Jerome reads this code.
- Comments only for a constraint the code can't show ("air fryer holds ~1.2 qt, not 2").
  Never narrate what the next line does.
- No `innerHTML` with anything Jerome typed — custom ingredient names go in via
  `textContent`.

## Before saying it's done

Serve it, look at it **at phone width**, both themes, reload to confirm state survived.
Use the `check-phone` skill.
