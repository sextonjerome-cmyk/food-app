# Rule — the shape of a recipe

Everything in `recipes.js` is data. No logic, no functions, no computed values.

```js
{
  id: "poulet-moutarde",              // kebab-case, unique, never changes (ratings key off it)
  title: "Poulet à la Moutarde",
  subtitle: "Mustard cream chicken",  // optional plain-English gloss for non-French dishes
  photo: "img/poulet-moutarde.webp",
  cuisine: "french",                  // french | american | middle-eastern | turkish | asian | other
  appliances: ["stove"],              // stove | oven | crockpot | instantpot | airfryer | ricecooker
  minutes: 30,                        // TOTAL wall-clock for stove/oven/air fryer.
  activeMinutes: 20,                  // hands-on time. For crockpot: minutes 480, active 15.
  difficulty: "easy",                 // easy | medium   (never "hard" — not this app)
  baseServings: 2,                    // what the quantities below are written for
  scalable: [1, 6],                   // range the recipe honestly scales across
  capacityQt: 1.5,                    // volume the finished dish occupies — drives the
                                      // "won't fit your 2 qt air fryer" warning
  tags: ["hellofresh-style", "one-pan", "weeknight"],
  spiceLevel: 2,                      // 1-5 as written; the spice dial adjusts from here

  ingredients: [
    { item: "chicken thighs", qty: 4, unit: "piece", aisle: "meat", scale: true,
      note: "bone-in, skin-on" },
    { item: "dijon mustard", qty: 2, unit: "tbsp", aisle: "canned", scale: true,
      sub: "any grainy mustard; yellow mustard is too sharp" },
    { item: "butter", qty: 1, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false,
      staple: true, note: "to taste" }
  ],

  misePlace: [                        // do this BEFORE the heat goes on
    "Pat the chicken dry and salt it on both sides.",
    "Slice the shallots thin.",
    "Measure the mustard and cream into one small bowl."
  ],

  steps: [
    { text: "Heat the butter in a wide pan over medium-high until it stops foaming.",
      minutes: null },
    { text: "Lay the chicken in skin-side down and leave it alone for about eight minutes, until the skin is deep golden.",
      minutes: 8 },                   // any step with `minutes` gets a tap-to-start timer
  ],

  beginnerTip: "Don't move the chicken while it browns. If it sticks, it isn't ready yet — it releases on its own when the crust forms.",
  makeItBetter: "Off the heat, stir in a spoon of crème fraîche and a squeeze of lemon. The acid is what makes it taste restaurant-made instead of heavy.",
  skills: ["searing", "deglazing"],   // feeds the skill badges

  source: { name: "Jacques Pépin, Essential Pépin", url: "https://…" },
  vetting: "Cross-referenced with Serious Eats' pan-sauce method; r/cooking thread flagged that most versions curdle the cream, so the cream goes in off the heat here."
}
```

## Field rules

**`aisle`** — must be one of, and this drives the shopping list order:
`produce · meat · dairy · bakery · frozen · canned · dry · spices · other`

**`scale: false`** on anything that shouldn't multiply — a pinch of salt, a bay leaf, the
water in a pan. Getting this wrong is how you end up with six bay leaves.

**`staple: true`** on salt, pepper, oil, butter, flour, sugar, water. Assumed present, hidden
from the missing-ingredients count unless Jerome explicitly unchecks them.

**`minutes` on a step** — only when it's a real wait ("simmer 10 minutes"), so the timer
button means something. Not on "chop the onion."

**`capacityQt`** — be honest. A 2 qt air fryer holds about **1.2 qt of food** in practice.
If a recipe at 4 servings needs 2.5 qt, the app must warn instead of pretending.

**Steps are spoken aloud.** One action per step. Write numbers as words the way a person
says them. No "sauté until translucent, approx. 5-7 min, then add garlic and cook 30 sec."
Break it up.

**Never** put a URL, an emoji, or markdown inside a step — it gets read out loud.

## Adding a recipe

Use the `add-recipe` skill. It runs `@.claude/rules/recipe-vetting.md` first; a recipe that
can't fill the `vetting` field honestly doesn't get written.
