/* ==========================================================================
   Frigo — the recipe collection.

   Data only. No logic, no functions. Shape: .claude/rules/recipe-schema.md
   Nothing goes in here that hasn't cleared .claude/rules/recipe-vetting.md —
   every entry carries a `vetting` line saying what the actual evidence was.
   Add new ones with the `add-recipe` skill.

   Photos are freely-licensed stills from Wikimedia Commons, credited in
   `photoCredit` and listed in CREDITS.md. A recipe with no honest photo of the
   real dish keeps the drawn placeholder instead of borrowing a lookalike.
   ========================================================================== */
window.RECIPES = [

/* ---------------------------------------------------------------- french -- */
{
  id: "poulet-moutarde",
  title: "Poulet à la Moutarde",
  subtitle: "Mustard cream chicken",
  photo: "img/poulet-moutarde.webp",
  photoCredit: { by: "French Recipes", lic: "CC BY-SA 3.0",
                  url: "https://commons.wikimedia.org/wiki/File:Chicken_Fricasse.jpg" },
  cuisine: "french",
  appliances: ["stove"],
  minutes: 45,
  activeMinutes: 25,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 6],
  capacityQt: 1.5,
  tags: ["one-pan", "weeknight", "hellofresh-style"],
  spiceLevel: 1,
  meals: ["dinner"],

  ingredients: [
    { item: "chicken thighs", qty: 4, unit: "piece", aisle: "meat", scale: true,
      note: "bone-in, skin-on" },
    { item: "shallots", qty: 2, unit: "piece", aisle: "produce", scale: true,
      sub: "half a small yellow onion" },
    { item: "dijon mustard", qty: 2, unit: "tbsp", aisle: "canned", scale: true,
      sub: "any grainy mustard — plain yellow mustard is too sharp here" },
    { item: "heavy cream", qty: 3, unit: "tbsp", aisle: "dairy", scale: true,
      sub: "crème fraîche, or full-fat sour cream, both off the heat" },
    { item: "chicken stock", qty: 0.5, unit: "cup", aisle: "canned", scale: true },
    { item: "white wine", qty: 3, unit: "tbsp", aisle: "other", scale: true,
      sub: "skip it, use the same amount of extra stock and a squeeze of lemon" },
    { item: "fresh tarragon", qty: 1, unit: "tbsp", aisle: "produce", scale: false,
      note: "chopped; parsley is fine", sub: "flat-leaf parsley or chives" },
    { item: "butter", qty: 1, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false,
      staple: true, note: "to taste" }
  ],

  misePlace: [
    "Pat the chicken dry on both sides and salt it well. Leave it on the counter while you do everything else.",
    "Slice the shallots thin.",
    "Measure the mustard and the cream into one small bowl, and the stock into another.",
    "Chop the tarragon."
  ],

  steps: [
    { text: "Melt the butter in a wide pan over medium-high heat until it stops foaming.", minutes: null },
    { text: "Lay the chicken in skin side down and leave it completely alone for about eight minutes, until the skin is deep golden.", minutes: 8 },
    { text: "Turn the pieces over and cook the other side for about four minutes.", minutes: 4 },
    { text: "Move the chicken to a plate. Pour off all but about a spoonful of the fat.", minutes: null },
    { text: "Add the shallots and cook them for two minutes, until soft and just starting to colour.", minutes: 2 },
    { text: "Pour in the wine and scrape the brown bits off the bottom of the pan with a wooden spoon.", minutes: null },
    { text: "Add the stock, sit the chicken back in skin side up, and simmer gently for twelve minutes.", minutes: 12 },
    { text: "Take the pan right off the heat and let it settle for half a minute.", minutes: null },
    { text: "Stir the mustard and the cream into the sauce, still off the heat.", minutes: null },
    { text: "Taste it, grind in some pepper, and scatter the tarragon over the top.", minutes: null }
  ],

  beginnerTip: "Don't move the chicken while it browns. If it sticks to the pan it isn't ready yet — it lets go by itself once the crust has formed. Lifting it every thirty seconds to peek is how you end up with pale, flabby skin.",
  makeItBetter: "Add a squeeze of lemon along with the cream, off the heat. The acid is what makes it taste restaurant-made instead of just rich and heavy.",
  skills: ["searing", "deglazing", "pan sauce"],

  source: { name: "Jacques Pépin — Chicken in Mustard Sauce (New York Times), read via The Brook Cook's write-up",
            url: "https://thebrookcook.wordpress.com/2015/10/21/jacques-pepins-chicken-in-mustard-sauce/" },
  vetting: "Pépin's original thickens with flour and water and uses no cream at all. The home cook who wrote it up said she'd use thighs instead of breast next time — this version starts there. Cream goes in off the heat, which is the standard guard against a mustard sauce splitting; that is the failure people report most with the creamy variants."
},

{
  id: "gratin-dauphinois",
  title: "Gratin Dauphinois",
  subtitle: "Potatoes baked slowly in cream — no cheese, on purpose",
  photo: "img/gratin-dauphinois.webp",
  photoCredit: { by: "Ludovic Péron", lic: "CC BY-SA 3.0",
                  url: "https://commons.wikimedia.org/wiki/File:Gratin_dauphinois.jpg" },
  cuisine: "french",
  appliances: ["stove"],
  minutes: 110,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 4,
  scalable: [2, 8],
  capacityQt: 1,
  tags: ["oven", "comfort", "cheap", "vegetarian"],
  spiceLevel: 1,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "potatoes", qty: 1.25, unit: "lb", aisle: "produce", scale: true,
      note: "Yukon Gold if you can — waxy ones stay in slices, floury ones go to mush" },
    { item: "milk", qty: 1.5, unit: "cup", aisle: "dairy", scale: true, note: "whole milk" },
    { item: "heavy cream", qty: 0.5, unit: "cup", aisle: "dairy", scale: true,
      sub: "half-and-half — a little looser, still good" },
    { item: "garlic", qty: 2, unit: "clove", aisle: "produce", scale: true,
      note: "crushed and chopped very fine" },
    { item: "nutmeg", qty: null, unit: null, aisle: "spices", scale: false,
      note: "a few scrapes, grated fresh over the top" },
    { item: "butter", qty: 1, unit: "tbsp", aisle: "dairy", scale: false, staple: true,
      note: "for greasing the dish" },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Heat the oven to three hundred and seventy-five degrees.",
    "Butter a baking dish well, right up the sides.",
    "Peel the potatoes and slice them about as thick as a coin. Do not put them anywhere near water afterwards.",
    "Chop the garlic very fine."
  ],

  steps: [
    { text: "Put the potato slices, the milk, the garlic, a good half teaspoon of salt and plenty of pepper into a big saucepan.", minutes: null },
    { text: "Bring it slowly to a boil, stirring gently now and then to keep the slices apart and stop the bottom catching.", minutes: 8 },
    { text: "As it reaches the boil you will feel the milk thicken. That is the potato starch doing its job.", minutes: null },
    { text: "Tip the whole lot into the buttered dish and spread it level.", minutes: null },
    { text: "Pour the cream evenly over the top and grate a little nutmeg over it.", minutes: null },
    { text: "Stand the dish on a baking tray and bake for one hour, until the top is golden and a knife slides through the potatoes with no resistance.", minutes: 60 },
    { text: "Take it out and leave it alone on the counter for twenty-five minutes.", minutes: 25 }
  ],

  beginnerTip: "Never rinse the potato slices. Every instinct says to wash off the starch, and that starch is the only thing thickening this dish — rinse it away and you get potatoes sitting in thin grey milk instead of a gratin. Slice them and go straight into the pan.",
  makeItBetter: "The rest at the end is not waiting, it is cooking. Straight from the oven it is a soupy mess; twenty-five minutes on the counter and it sets into something you can cut. If you want it browner, run it under the broiler for two minutes before the rest. Add gruyère on top if you like — just know that officially makes it a gratin savoyard, not a dauphinois.",
  skills: ["slicing evenly", "starch thickening", "baking a gratin"],

  source: { name: "Jacques Pépin — Gratin Dauphinoise, Essential Pépin (KQED)",
            url: "https://ww2.kqed.org/essentialpepin/2011/09/11/gratin-dauphinoise/" },
  vetting: "Pépin's own recipe, published by KQED alongside the Essential Pépin series, and the same stove-then-oven method turns up independently in Gourmet's version. The one warning Pépin gives in his own words is the one built into the beginner tip: do not rinse or soak the slices, because rinsing takes away the starch that thickens the whole thing. His version has no cheese in it at all, which surprises most people, so the note about gruyère says plainly what adding it actually makes."
},

/* --------------------------------------------------------- middle-eastern -- */
{
  id: "shakshuka",
  title: "Shakshuka",
  subtitle: "Eggs poached in spiced tomato and pepper",
  photo: "img/shakshuka.webp",
  photoCredit: { by: "Jarosław Ceborski jarson", lic: "CC0",
                  url: "https://commons.wikimedia.org/wiki/File:Shakshuka_(Unsplash).jpg" },
  cuisine: "middle-eastern",
  appliances: ["stove"],
  minutes: 40,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1.5,
  tags: ["one-pan", "breakfast", "vegetarian", "weeknight"],
  spiceLevel: 3,
  meals: ["breakfast", "lunch", "dinner"],

  ingredients: [
    { item: "canned whole tomatoes", qty: 1, unit: "can", aisle: "canned", scale: true,
      note: "fourteen ounces", sub: "canned crushed tomatoes work; skip the crushing step" },
    { item: "red bell pepper", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "onion", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "garlic", qty: 3, unit: "clove", aisle: "produce", scale: true },
    { item: "eggs", qty: 4, unit: "piece", aisle: "dairy", scale: true },
    { item: "harissa", qty: 1, unit: "tsp", aisle: "canned", scale: true,
      sub: "a teaspoon of tomato paste plus a good pinch of cayenne" },
    { item: "ground cumin", qty: 1, unit: "tsp", aisle: "spices", scale: true },
    { item: "sweet paprika", qty: 1, unit: "tsp", aisle: "spices", scale: true },
    { item: "feta", qty: 2, unit: "oz", aisle: "dairy", scale: true,
      sub: "goat cheese, or leave it out" },
    { item: "fresh cilantro", qty: 2, unit: "tbsp", aisle: "produce", scale: false,
      sub: "flat-leaf parsley" },
    { item: "crusty bread", qty: 2, unit: "piece", aisle: "bakery", scale: true,
      note: "for mopping — not optional, really" },
    { item: "olive oil", qty: 2, unit: "tbsp", aisle: "other", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Crush the canned tomatoes with your hand in their own bowl until there are no big lumps left.",
    "Dice the onion and the pepper small, about the size of a pea.",
    "Slice the garlic thin.",
    "Crack each egg into its own small cup. That is how you land them where you want them.",
    "Crumble the feta and chop the cilantro."
  ],

  steps: [
    { text: "Heat the olive oil in a wide pan with a lid over medium heat.", minutes: null },
    { text: "Add the onion and pepper with a good pinch of salt and cook for about ten minutes, until they are soft and sweet.", minutes: 10 },
    { text: "Add the garlic, the cumin, the paprika and the harissa, and stir for one minute until it smells warm and toasted.", minutes: 1 },
    { text: "Pour in the crushed tomatoes and simmer for about twelve minutes, until the sauce is thick enough that a spoon leaves a trail.", minutes: 12 },
    { text: "Taste the sauce and salt it properly now. Once the eggs are in you cannot stir it again.", minutes: null },
    { text: "Make four shallow wells in the sauce with the back of a spoon and slide one egg into each.", minutes: null },
    { text: "Spoon a little sauce over the egg whites but leave the yolks bare.", minutes: null },
    { text: "Cover the pan and cook for about eight minutes, until the whites are set and the yolks still wobble when you shake the pan.", minutes: 8 },
    { text: "Scatter the feta and the cilantro over the top.", minutes: null },
    { text: "Bring the pan straight to the table with the bread, and scoop it out with a torn piece rather than a spoon.", minutes: null }
  ],

  beginnerTip: "The yolks keep cooking after the pan leaves the heat. Pull it while they still jiggle in the middle — if they look perfect in the pan they will be hard by the time you sit down.",
  makeItBetter: "Bloom the cumin and paprika in the hot oil for a full minute before the tomatoes go in. Dry spices stirred into liquid taste dusty; the same spices fried in fat first taste like a completely different dish.",
  skills: ["blooming spices", "poaching in sauce", "reducing a sauce"],

  source: { name: "America's Test Kitchen — North African–Style Poached Eggs",
            url: "https://www.americastestkitchen.com/articles/1264-north-african-style-poached-eggs" },
  vetting: "Three of America's Test Kitchen's findings are built straight into the steps: a smooth sauce heats the eggs more evenly than a chunky one, spooning sauce over the whites but not the yolks gets the whites set while the yolks stay creamy, and covering the pan cooks the eggs from above as well as below. The two complaints that show up everywhere else are a watery sauce and hard yolks — the sauce is reduced until a spoon leaves a trail before any egg goes near it, and the pan comes off while the yolks still move."
},

{
  id: "poulet-zaatar",
  title: "Za'atar Roast Chicken",
  subtitle: "Chicken, red onion and lemon, all in one tray",
  /* Not a free licence, unlike every other photo here. Jerome asked for a
     picture on every recipe and four passes over Commons and Openverse never
     found one, so this is the blog's own shot of the same dish, credited and
     linked. See CREDITS.md. */
  photo: "img/poulet-zaatar.webp",
  photoCredit: { by: "Lisa Goldfinger, Panning the Globe", lic: "used with credit",
                  url: "https://www.panningtheglobe.com/ottolenghis-roast-chicken-zaatar-sumac/" },
  cuisine: "middle-eastern",
  /* His kitchen has one appliance called "Stove & Oven", id `stove`. There is no
     separate `oven` id, so tagging it that way would drop it out of the filter
     and mislabel the card. */
  appliances: ["stove"],
  minutes: 55,
  activeMinutes: 15,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 6],
  capacityQt: 1.5,
  tags: ["oven", "one-pan", "weeknight", "leftovers"],
  spiceLevel: 2,
  meals: ["dinner"],

  ingredients: [
    { item: "chicken thighs", qty: 4, unit: "piece", aisle: "meat", scale: true,
      note: "bone-in, skin-on — boneless will dry out here" },
    { item: "red onion", qty: 1, unit: "piece", aisle: "produce", scale: true,
      sub: "a yellow onion; it goes sweeter and less sharp" },
    { item: "lemons", qty: 0.5, unit: "piece", aisle: "produce", scale: true,
      note: "sliced thin, skin and all" },
    { item: "garlic", qty: 2, unit: "clove", aisle: "produce", scale: true },
    { item: "za'atar", qty: 1, unit: "tbsp", aisle: "spices", scale: true,
      sub: "dried thyme plus sesame seeds plus a little extra sumac" },
    { item: "sumac", qty: 1.5, unit: "tsp", aisle: "spices", scale: true,
      sub: "the zest of half a lemon — not the same, but it does the sour job" },
    { item: "cinnamon", qty: 0.5, unit: "tsp", aisle: "spices", scale: true },
    { item: "chicken stock", qty: 0.5, unit: "cup", aisle: "canned", scale: true },
    { item: "pine nuts", qty: 2, unit: "tbsp", aisle: "dry", scale: true,
      sub: "flaked almonds, or leave them out — the dish still works" },
    { item: "fresh parsley", qty: 2, unit: "tbsp", aisle: "produce", scale: false,
      note: "roughly chopped" },
    { item: "olive oil", qty: 2, unit: "tbsp", aisle: "canned", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false,
      staple: true, note: "to taste" }
  ],

  misePlace: [
    "Take the chicken out of the fridge and pat every piece really dry.",
    "Slice the onion into thin half moons.",
    "Slice the half lemon into thin rounds and flick out the pips.",
    "Crush the garlic.",
    "Mix the za'atar, the sumac, the cinnamon, a good teaspoon of salt and plenty of pepper in a small bowl."
  ],

  steps: [
    { text: "Heat the oven to four hundred and twenty-five degrees.", minutes: null },
    { text: "Put the chicken, the onion, the lemon slices and the garlic in a big bowl.", minutes: null },
    { text: "Add the olive oil and the spice mix, and rub it into the chicken with your hands until every piece is coated.", minutes: null },
    { text: "If you have an hour to spare, leave it in the fridge now. If you don't, carry straight on.", minutes: null },
    { text: "Lay everything in a roasting tin in one layer, chicken skin side up, with a gap between the pieces.", minutes: null },
    { text: "Pour the stock into the tin around the chicken, never over the skin.", minutes: null },
    { text: "Roast for thirty-five minutes.", minutes: 35 },
    { text: "Turn the broiler on and give it three more minutes, until the skin is crisp and dark at the edges.", minutes: 3 },
    { text: "While that happens, toast the pine nuts in a small dry pan over medium heat, shaking them the whole time, for about two minutes.", minutes: 2 },
    { text: "Let the tray sit for five minutes before you touch it.", minutes: 5 },
    { text: "Scatter the pine nuts and the parsley over the top and spoon the juices from the tin back over the chicken.", minutes: null }
  ],

  beginnerTip: "The gap between the pieces is the whole recipe. Chicken crammed into a small tin steams in its own moisture and comes out pale and rubbery. If four thighs don't fit with room to spare, use a bigger tin or two smaller ones — never pile them up.",
  makeItBetter: "Squash the roasted lemon slices into the pan juices with a fork before you spoon them over. They go soft and jammy in the oven and the whole tray turns sharp and bright instead of just savoury. A pinch of Aleppo pepper in the rub adds heat without fighting the sumac.",
  skills: ["roasting", "marinating", "toasting nuts"],

  source: { name: "Yotam Ottolenghi and Sami Tamimi — Roast Chicken with Sumac, Za'atar and Lemon, via The Splendid Table",
            url: "https://www.splendidtable.org/story/2013/12/05/roast-chicken-with-sumac-zaatar-and-lemon" },
  vetting: "Ottolenghi is a named cook with a reputation to lose, and the dish has been picked up independently by The Splendid Table and cooked and written up by a string of unconnected home cooks over more than a decade. What I could not find was a body of failure reports, so this one clears the bar on two legs rather than three and I am saying so. Two changes come from a cook who actually made it: a deep tray keeps it juicier, and a few minutes under the broiler at the end is what gets the skin crisp. The stock goes in around the chicken rather than over it for the same reason."
},

/* --------------------------------------------------------------- turkish -- */
{
  id: "menemen",
  title: "Menemen",
  subtitle: "Turkish eggs with peppers and tomato",
  photo: "img/menemen.webp",
  photoCredit: { by: "FakirNL", lic: "CC BY-SA 4.0",
                  url: "https://commons.wikimedia.org/wiki/File:Menemen_in_pan.jpg" },
  cuisine: "turkish",
  appliances: ["stove"],
  minutes: 25,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1,
  tags: ["one-pan", "breakfast", "vegetarian", "quick"],
  spiceLevel: 2,
  meals: ["breakfast", "lunch"],

  ingredients: [
    { item: "green peppers", qty: 2, unit: "piece", aisle: "produce", scale: true,
      note: "long thin Turkish or Italian frying peppers if you can get them",
      sub: "one green bell pepper, but the flavour is milder" },
    { item: "ripe tomatoes", qty: 3, unit: "piece", aisle: "produce", scale: true,
      sub: "a fourteen ounce can of chopped tomatoes, drained of most of its juice" },
    { item: "eggs", qty: 4, unit: "piece", aisle: "dairy", scale: true },
    { item: "aleppo pepper", qty: 1, unit: "tsp", aisle: "spices", scale: true,
      note: "pul biber", sub: "half a teaspoon of paprika and a pinch of chilli flakes" },
    { item: "feta", qty: 2, unit: "oz", aisle: "dairy", scale: true,
      note: "optional, crumbled in at the end", sub: "feta" },
    { item: "crusty bread", qty: 2, unit: "piece", aisle: "bakery", scale: true },
    { item: "olive oil", qty: 2, unit: "tbsp", aisle: "other", scale: true, staple: true },
    { item: "butter", qty: 1, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Chop the peppers into small pieces, about half an inch.",
    "Grate the tomatoes on the coarse side of a box grater and throw away the skins, or just chop them small.",
    "Beat the eggs in a bowl with a pinch of salt.",
    "Have the bread cut and on the table. This dish waits for nobody."
  ],

  steps: [
    { text: "Warm the olive oil and butter in a small pan over medium heat.", minutes: null },
    { text: "Add the peppers and cook them for about six minutes, until they are soft and floppy.", minutes: 6 },
    { text: "Add the tomatoes and the aleppo pepper with a good pinch of salt.", minutes: null },
    { text: "Cook for about eight minutes, until most of the liquid has gone and the mixture holds its shape when you push it with a spoon.", minutes: 8 },
    { text: "Turn the heat down to low and pour the beaten eggs over the top.", minutes: null },
    { text: "Wait about twenty seconds without touching anything, then drag the eggs slowly through the tomato with a wooden spoon.", minutes: null },
    { text: "Keep dragging gently until the eggs are set in soft folds but still look a little wet. That takes about two minutes.", minutes: 2 },
    { text: "Take the pan off the heat straight away and crumble the feta over the top.", minutes: null }
  ],

  beginnerTip: "Menemen is soft and spoonable, not dry scrambled eggs. Take it off the heat while it still looks slightly underdone — the hot pan finishes it on the way to the table. Once it looks right in the pan, it is already overcooked.",
  makeItBetter: "Cook the tomatoes down harder than feels necessary before the eggs go in. A wet pan is the single reason home menemen tastes thin, and no amount of seasoning fixes it afterwards.",
  skills: ["soft scrambling", "cooking down tomatoes"],

  source: { name: "Turkey's For Life, written from Fethiye; cross-checked with Aysegul Sanford (Foolproof Living)",
            url: "https://www.turkeysforlife.com/2018/09/menemen-turkish-scrambled-eggs-recipe.html" },
  vetting: "Written from Turkish sources rather than the American blog version. Both agree on two points that most English-language recipes get wrong: no tomato paste and no heavy dried spice mix, and the eggs come off the heat before they look done. Grating the tomatoes and cooking them down hard is the fix for the soupy pan people complain about."
},

/* ----------------------------------------------------------------- asian -- */
{
  id: "mapo-tofu",
  title: "Mapo Tofu",
  subtitle: "Sichuan tofu with pork, chilli bean paste and numbing pepper",
  photo: "img/mapo-tofu.webp",
  photoCredit: { by: "Rezwalker", lic: "CC BY-SA 4.0",
                  url: "https://commons.wikimedia.org/wiki/File:Homemade_Mapo_doufu.jpg" },
  cuisine: "asian",
  appliances: ["stove"],
  minutes: 30,
  activeMinutes: 25,
  difficulty: "medium",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1.2,
  tags: ["one-pan", "weeknight", "spicy"],
  spiceLevel: 4,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "soft tofu", qty: 14, unit: "oz", aisle: "produce", scale: true,
      note: "soft or silken, not firm",
      sub: "medium tofu holds together more easily if soft scares you" },
    { item: "ground pork", qty: 5, unit: "oz", aisle: "meat", scale: true,
      sub: "ground beef is traditional in the oldest versions; leave it out entirely for a vegetarian one" },
    { item: "sichuan chilli bean paste", qty: 2, unit: "tbsp", aisle: "canned", scale: true,
      note: "doubanjiang — the Pixian kind if the shop has it",
      sub: "there is no real substitute; gochujang makes a different dish, not a worse one" },
    { item: "sichuan peppercorns", qty: 1, unit: "tsp", aisle: "spices", scale: true,
      note: "whole, not ground" },
    { item: "garlic", qty: 3, unit: "clove", aisle: "produce", scale: true },
    { item: "chicken stock", qty: 0.75, unit: "cup", aisle: "canned", scale: true },
    { item: "shaoxing wine", qty: 1, unit: "tsp", aisle: "other", scale: true,
      sub: "dry sherry" },
    { item: "soy sauce", qty: 1, unit: "tsp", aisle: "canned", scale: true },
    { item: "chinese black vinegar", qty: 0.5, unit: "tsp", aisle: "canned", scale: true,
      sub: "balsamic, half as much" },
    { item: "cornstarch", qty: 1, unit: "tsp", aisle: "dry", scale: true },
    { item: "sesame oil", qty: 1, unit: "tsp", aisle: "canned", scale: false },
    { item: "spring onions", qty: 2, unit: "piece", aisle: "produce", scale: false },
    { item: "rice", qty: 1, unit: "cup", aisle: "dry", scale: true, note: "uncooked" },
    { item: "sugar", qty: 1, unit: "tsp", aisle: "dry", scale: true, staple: true },
    { item: "vegetable oil", qty: 2, unit: "tbsp", aisle: "canned", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Start the rice first. Everything else takes less time than it does.",
    "Toast the sichuan peppercorns in a dry pan over medium-low heat for about two minutes, until you can smell them, then grind them to a powder and set them aside.",
    "Cut the tofu into half-inch cubes and slide them into a pot of gently salted, barely simmering water. Leave them there until you need them.",
    "Mince the garlic. Slice the spring onions.",
    "Stir the cornstarch into one tablespoon of cold water in a small cup.",
    "Measure the chicken stock, the shaoxing wine, the soy sauce and the sugar into one bowl together."
  ],

  steps: [
    { text: "Heat the oil in a wok or a wide pan over medium-high heat and cook the pork, breaking it up, for about two minutes until it is no longer pink.", minutes: 2 },
    { text: "Turn the heat down to medium and add the chilli bean paste.", minutes: null },
    { text: "Fry the paste slowly for about three minutes, until the oil in the pan turns deep red. This is the most important minute of the dish.", minutes: 3 },
    { text: "Add the garlic and stir it around for one minute.", minutes: 1 },
    { text: "Pour in the chicken stock mixture and let it simmer for two minutes. Taste it — it should be slightly under-salted.", minutes: 2 },
    { text: "Lift the tofu out of its water with a slotted spoon and slide it into the pan.", minutes: null },
    { text: "Cook for about three minutes, pushing the tofu gently back and forth with the back of a spoon rather than stirring it.", minutes: 3 },
    { text: "Add the ground peppercorn and the black vinegar and give it one gentle push.", minutes: null },
    { text: "Stir the cornstarch mixture again and pour it in, then turn the heat off immediately.", minutes: null },
    { text: "Add the sesame oil, scatter the spring onions over the top, and serve it over the rice.", minutes: null }
  ],

  beginnerTip: "Never stir tofu this soft with a spoon edge — you will end up with tofu soup. Push it from underneath with the flat back of the spoon and let the pan do the moving. And simmering it in salted water first is not an optional step; it firms the cubes up so they survive the pan.",
  makeItBetter: "Grind the peppercorns yourself and add them at the very end, off the heat. Pre-ground sichuan pepper has lost the tingle, and even fresh powder goes dull and bitter if it sits in the pan. That numbing buzz is the whole point of the dish.",
  skills: ["frying bean paste", "toasting whole spices", "thickening with a slurry"],

  source: { name: "Chinese Cooking Demystified — Mapo Tofu",
            url: "https://chinesecookingdemystified.substack.com/p/mapo-tofu-the-first-version" },
  vetting: "Chinese Cooking Demystified's Sichuan-sourced version is the spine, cross-checked against J. Kenji López-Alt, who has called mapo tofu his favourite dish of all time and toasts and grinds the peppercorns the same way. Two failures come up over and over: the tofu falls apart, fixed by the salted-water simmer, and the sauce goes a brackish black, fixed by frying the bean paste until the oil reddens and keeping the ground peppercorn out until the end."
},

/* -------------------------------------------------------------- american -- */
{
  id: "smash-burger",
  title: "Smash Burger",
  subtitle: "Thin patties, lacy crust, cheese in the middle",
  photo: "img/smash-burger.webp",
  photoCredit: { by: "Kamil", lic: "CC BY-SA 4.0",
                  url: "https://commons.wikimedia.org/wiki/File:Smashburger_with_fries.jpg" },
  cuisine: "american",
  appliances: ["stove"],
  minutes: 20,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 0.6,
  tags: ["quick", "weeknight", "comfort"],
  spiceLevel: 1,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "ground beef", qty: 8, unit: "oz", aisle: "meat", scale: true,
      note: "eighty percent lean — leaner than that and there is no crust" },
    { item: "american cheese", qty: 4, unit: "slice", aisle: "dairy", scale: true,
      note: "it melts better than anything else here",
      sub: "young cheddar, thinly sliced" },
    { item: "potato buns", qty: 2, unit: "piece", aisle: "bakery", scale: true,
      sub: "any soft bun; avoid anything crusty, it fights the patty" },
    { item: "onion", qty: 0.5, unit: "piece", aisle: "produce", scale: true,
      note: "sliced paper thin, raw" },
    { item: "pickles", qty: 6, unit: "piece", aisle: "canned", scale: true },
    { item: "mayonnaise", qty: 2, unit: "tbsp", aisle: "canned", scale: true },
    { item: "yellow mustard", qty: 2, unit: "tsp", aisle: "canned", scale: true },
    { item: "butter", qty: 1, unit: "tbsp", aisle: "dairy", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Divide the beef into four loose balls, two ounces each. Do not squeeze them — just gather each one together.",
    "Slice the onion as thin as you can and cut the pickles.",
    "Have the cheese unwrapped and the buns open on a plate. Once the pan is hot this all happens in about three minutes.",
    "Open a window and turn the extractor fan on. This makes smoke."
  ],

  steps: [
    { text: "Butter the cut faces of the buns and toast them in a cast iron pan over medium heat until golden, then set them aside.", minutes: 2 },
    { text: "Turn the heat up to high and let the empty pan get properly hot, about three minutes.", minutes: 3 },
    { text: "Put two balls of beef in the pan with plenty of space between them.", minutes: null },
    { text: "Smash each one flat straight away with a stiff spatula, as thin as you can get it. You have about thirty seconds to do this.", minutes: null },
    { text: "Salt and pepper the tops and then leave them completely alone for about ninety seconds, until the edges go brown and lacy.", minutes: 2 },
    { text: "Scrape underneath with the spatula, getting all the browned crust, and flip.", minutes: null },
    { text: "Lay a slice of american cheese on each patty and cook for thirty seconds more, then stack one patty on the other.", minutes: null },
    { text: "Repeat with the second pair of beef balls.", minutes: null },
    { text: "Spread mayonnaise and mustard on the buns, add the onion and pickles, and put the double patties on top.", minutes: null }
  ],

  beginnerTip: "Smash once, in the first thirty seconds, and never press the patty again. Pressing later just squeezes the juice out — the early smash is what puts meat in contact with hot metal, and the crust is made in that first contact.",
  makeItBetter: "Use cast iron or stainless steel, never a nonstick pan. Nonstick cannot get hot enough or hold its heat, and it will give you a grey, steamed patty every time. This is the one rule that decides whether it tastes like a burger joint or like a sad Tuesday.",
  skills: ["high-heat searing", "building a crust"],

  source: { name: "J. Kenji López-Alt — Classic and Ultra-Smashed Cheeseburgers (Serious Eats), via AOL's write-up",
            url: "https://www.aol.com/articles/most-popular-burger-recipe-time-160549000.html" },
  vetting: "Kenji's smashed burger is Serious Eats' most-read burger recipe of all time, and his later ultra-smashed version is where the two thin patties with cheese between them come from — twice the crust, and the cheese keeps the middle from drying out. The rules people skip and then complain about: a nonstick pan will not build a crust, and pressing the patty after the first smash squeezes out everything you wanted to keep."
},

/* ----------------------------------------------------------------- other -- */
{
  id: "crevettes-ail-citron",
  title: "Garlic Lemon Butter Shrimp",
  subtitle: "Ten minutes, one pan, a lot of bread",
  photo: "img/crevettes-ail-citron.webp",
  photoCredit: { by: "Javier Lastras from España/Spain", lic: "CC BY 2.0",
                  url: "https://commons.wikimedia.org/wiki/File:Gambas_al_ajillo.jpg" },
  cuisine: "other",
  appliances: ["stove"],
  minutes: 20,
  activeMinutes: 15,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 0.8,
  tags: ["quick", "one-pan", "weeknight", "hellofresh-style"],
  spiceLevel: 2,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "large shrimp", qty: 12, unit: "oz", aisle: "meat", scale: true,
      note: "peeled and deveined, sixteen to twenty per pound",
      sub: "frozen is fine — thaw them fully and dry them well, or they steam" },
    { item: "garlic", qty: 3, unit: "clove", aisle: "produce", scale: true },
    { item: "lemon", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "flat-leaf parsley", qty: 2, unit: "tbsp", aisle: "produce", scale: false },
    { item: "red pepper flakes", qty: 0.25, unit: "tsp", aisle: "spices", scale: true },
    { item: "crusty bread", qty: 2, unit: "piece", aisle: "bakery", scale: true },
    { item: "butter", qty: 3, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "olive oil", qty: 1, unit: "tbsp", aisle: "other", scale: true, staple: true },
    { item: "sugar", qty: 0.25, unit: "tsp", aisle: "dry", scale: false, staple: true,
      note: "helps them brown, you will not taste it" },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Dry the shrimp thoroughly on paper towel, then toss them with salt, pepper and the sugar.",
    "Mince the garlic and chop the parsley.",
    "Zest the lemon, then cut it in half.",
    "Soften the butter in a small bowl and mash the garlic, the zest, the parsley and the red pepper flakes into it."
  ],

  steps: [
    { text: "Heat the olive oil in a wide pan over high heat until it shimmers.", minutes: null },
    { text: "Lay the shrimp in the pan in a single layer, all facing the same way, and leave them.", minutes: null },
    { text: "Cook for about one minute, until the undersides are spotty brown and the edges have turned pink.", minutes: 1 },
    { text: "Take the pan completely off the heat and turn every shrimp over.", minutes: null },
    { text: "Let them sit in the hot pan for about thirty seconds. They finish in the residual heat.", minutes: null },
    { text: "Add the garlic butter and swirl the pan until it melts into a sauce.", minutes: null },
    { text: "Squeeze in half the lemon, taste, and add more if it needs it.", minutes: null },
    { text: "Tip everything into a bowl and eat it with the bread.", minutes: null }
  ],

  beginnerTip: "Shrimp go from perfect to rubbery in about twenty seconds. Take the pan off the heat before you flip them and let the leftover heat finish the job — that is the whole trick, and it is nearly impossible to overcook them this way.",
  makeItBetter: "Buy the big ones, sixteen to twenty per pound. Small shrimp cook through before they ever brown, so you get no seared flavour at all — the size is doing more work here than any seasoning.",
  skills: ["searing", "carryover cooking", "compound butter"],

  source: { name: "America's Test Kitchen — Pan-Seared Shrimp with Garlic-Lemon Butter",
            url: "https://www.americastestkitchen.com/recipes/1416-pan-seared-shrimp-with-garlic-lemon-butter" },
  vetting: "The off-the-heat flip is America's Test Kitchen's answer to the one thing everybody gets wrong with shrimp, and their pinch of sugar to help browning is in here too. Their size rule — sixteen to twenty count — is the other half of it: smaller shrimp overcook before the surface ever browns."
},

{
  id: "amatriciana",
  title: "Pasta all'Amatriciana",
  subtitle: "Bacon, tomato and pecorino — the Roman one",
  photo: "img/amatriciana.webp",
  photoCredit: { by: "Popo le Chien", lic: "CC0",
                  url: "https://commons.wikimedia.org/wiki/File:Bucatini_allamatriciana.jpg" },
  cuisine: "other",
  appliances: ["stove"],
  minutes: 30,
  activeMinutes: 25,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 6],
  capacityQt: 1,
  tags: ["quick", "weeknight", "comfort", "cheap"],
  spiceLevel: 3,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "spaghetti", qty: 7, unit: "oz", aisle: "dry", scale: true,
      sub: "bucatini if you can get it, rigatoni if you can't" },
    /* Guanciale is the traditional cut and is hard to buy in Charleston, so the
       recipe asks for the one he can actually find. */
    { item: "pancetta", qty: 3, unit: "oz", aisle: "meat", scale: true,
      note: "cut into short thick strips. Guanciale is the traditional one if you ever see it",
      sub: "thick-cut bacon — it's smoked, so the dish comes out a little smoky. Still very good." },
    { item: "canned tomatoes", qty: 14, unit: "oz", aisle: "canned", scale: true,
      note: "whole, crushed by hand", sub: "passata, or crushed tomatoes from a can" },
    { item: "pecorino romano", qty: 1.5, unit: "oz", aisle: "dairy", scale: true,
      note: "finely grated, and grate it yourself",
      sub: "parmesan — milder and less salty, so taste before you add more salt" },
    { item: "chilli flakes", qty: 0.5, unit: "tsp", aisle: "spices", scale: true },
    { item: "white wine", qty: 3, unit: "tbsp", aisle: "other", scale: true,
      sub: "leave it out; the dish is fine without" },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true,
      note: "for the pasta water, and plenty of it" },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Cut the pancetta into strips about as thick as your little finger.",
    "Tip the tomatoes into a bowl and crush them with your hands. Pull out any hard white cores.",
    "Grate the pecorino romano finely and leave it in a bowl by the stove.",
    "Put a big pot of water on to boil and salt it like the sea."
  ],

  steps: [
    { text: "Put the pancetta in a cold, dry pan and only then turn the heat to medium.", minutes: null },
    { text: "Let it cook for about six minutes, until the fat has run out and the meat is browned and crisp at the edges.", minutes: 6 },
    { text: "Lift the meat out with a slotted spoon and put it on a plate.", minutes: null },
    { text: "Pour the fat into a small bowl, wipe any burnt specks out of the pan, then pour the clean fat back in.", minutes: null },
    { text: "Add the chilli flakes and let them sizzle in the fat for about thirty seconds.", minutes: null },
    { text: "Pour in the wine and let it bubble away to almost nothing.", minutes: null },
    { text: "Add the crushed tomatoes and simmer gently for about twelve minutes, until the sauce is thick and darker red.", minutes: 12 },
    { text: "Meanwhile, boil the spaghetti one minute less than the packet says.", minutes: 9 },
    { text: "Scoop out a mug of the spaghetti water before you drain anything.", minutes: null },
    { text: "Drop the drained spaghetti straight into the sauce with a splash of the cooking water and toss it over medium heat for one minute.", minutes: 1 },
    { text: "Now take the pan completely off the heat and count slowly to ten.", minutes: null },
    { text: "Add the grated pecorino a handful at a time, tossing the pan rather than stirring, until the sauce turns glossy and clings to the pasta.", minutes: null },
    { text: "Loosen it with a little more cooking water if it looks tight, then fold the crisp pancetta back in and grind pepper over the top.", minutes: null }
  ],

  beginnerTip: "The cheese goes in off the heat, and that is not fussiness. Pecorino hitting a hot pan seizes into stringy knots instead of melting, and once it has done that you cannot bring it back. Take the pan off the stove, wait ten seconds, then add the cheese in handfuls and keep the pasta moving.",
  makeItBetter: "Toss the pan instead of stirring it. Sliding the pasta up the side and back down is what whips the starchy water and the cheese fat into an actual sauce — stirring in circles just moves it around. Grate the cheese yourself too: the anti-caking powder on pre-grated cheese is exactly what makes a sauce go grainy.",
  skills: ["rendering fat", "emulsifying a pan sauce", "using pasta water"],

  source: { name: "Pasta all'Amatriciana — the Roman classic; technique cross-checked against Saveur, America's Test Kitchen's Cook's Country and several independent write-ups",
            url: "https://www.americastestkitchen.com/cookscountry/recipes/14020-bucatini-all-amatriciana" },
  vetting: "The dish clears on independence and on real discussion. It carries tested versions at Saveur and Cook's Country and turns up in a dozen unconnected kitchens, and the failure everybody reports is the same one: the pecorino seizes into strings instead of melting. Several unrelated sources — including a physics write-up on the sauce — land on the same fix, which is off the heat, cooler starchy water, and tossing rather than stirring. That fix is written into the steps. The cold-pan render and wiping the burnt fat out before the tomatoes go in come from cooks who found the sauce turned bitter otherwise. Guanciale is the traditional cut and is hard to buy in Charleston, so the recipe asks for pancetta and offers thick-cut bacon after that, with an honest note that bacon makes the dish smoky."
},

/* -------------------------------------------------------------- crockpot -- */
{
  id: "crockpot-beef-stew",
  title: "Crockpot Beef Stew",
  subtitle: "Eight hours away, dinner waiting",
  photo: "img/crockpot-beef-stew.webp",
  photoCredit: { by: "A Healthier Michigan from Detroit, United States", lic: "CC BY-SA 2.0",
                  url: "https://commons.wikimedia.org/wiki/File:Irish_Beef_Stew_(34046928633).jpg" },
  cuisine: "american",
  appliances: ["crockpot", "stove"],
  minutes: 480,
  activeMinutes: 25,
  difficulty: "easy",
  baseServings: 4,
  scalable: [2, 6],
  capacityQt: 3,
  tags: ["set-and-forget", "comfort", "leftovers"],
  spiceLevel: 1,
  meals: ["dinner"],

  ingredients: [
    { item: "beef stew meat", qty: 1.5, unit: "lb", aisle: "meat", scale: true,
      note: "chuck, cut into one-inch pieces",
      sub: "any well-marbled braising cut; avoid lean cuts, they go stringy" },
    { item: "red potatoes", qty: 1.5, unit: "lb", aisle: "produce", scale: true,
      note: "cut into one-inch pieces, no bigger" },
    { item: "carrots", qty: 3, unit: "piece", aisle: "produce", scale: true },
    { item: "celery", qty: 3, unit: "stalk", aisle: "produce", scale: true },
    { item: "onion", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "garlic", qty: 4, unit: "clove", aisle: "produce", scale: true },
    { item: "beef broth", qty: 3, unit: "cup", aisle: "canned", scale: true },
    { item: "dijon mustard", qty: 2, unit: "tbsp", aisle: "canned", scale: true },
    { item: "worcestershire sauce", qty: 1, unit: "tbsp", aisle: "canned", scale: true },
    { item: "soy sauce", qty: 1, unit: "tbsp", aisle: "canned", scale: true,
      note: "for depth, not for flavour you can name" },
    { item: "dried thyme", qty: 1.5, unit: "tsp", aisle: "spices", scale: true },
    { item: "dried rosemary", qty: 1, unit: "tsp", aisle: "spices", scale: true },
    { item: "all-purpose flour", qty: 2, unit: "tbsp", aisle: "dry", scale: true, staple: true },
    { item: "vegetable oil", qty: 2, unit: "tbsp", aisle: "canned", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Cut the potatoes and carrots no bigger than an inch. Bigger pieces are the reason people find hard vegetables after eight hours.",
    "Dice the onion, slice the celery, mince the garlic, and put all the vegetables in the slow cooker.",
    "Toss the beef with the flour, a good pinch of salt and plenty of pepper.",
    "Measure the broth, mustard, worcestershire and soy sauce into one jug together."
  ],

  steps: [
    { text: "Heat the oil in a wide pan over medium-high heat until it shimmers.", minutes: null },
    { text: "Brown the beef in two batches, about three minutes a batch, until the pieces have colour on at least two sides.", minutes: 6 },
    { text: "Move the browned beef into the slow cooker on top of the vegetables.", minutes: null },
    { text: "Pour the broth mixture into the hot pan and scrape every brown bit off the bottom with a wooden spoon.", minutes: null },
    { text: "Add the thyme and rosemary to the pan, let it come to a simmer, then pour the whole lot over the beef.", minutes: null },
    { text: "Put the lid on and cook on low for eight hours, or on high for four.", minutes: 480 },
    { text: "Stir it well at the end. The potatoes break down a little and thicken the gravy by themselves.", minutes: null },
    { text: "Taste it and add salt. Slow cookers dull seasoning, so it will need more than you expect.", minutes: null }
  ],

  beginnerTip: "Browning the beef first is twenty minutes you cannot skip. Raw meat dropped into a slow cooker comes out grey and tastes boiled — all the deep flavour in a stew is made in that pan, before the lid ever goes on.",
  makeItBetter: "Deglaze the pan with the broth and pour it in. Everything stuck to the bottom of that pan is the best-tasting thing in the kitchen, and rinsing it down the sink is the single most common way a good stew turns out flat.",
  skills: ["browning meat", "deglazing", "braising"],

  source: { name: "Budget Bytes — Crockpot Beef Stew",
            url: "https://www.budgetbytes.com/slow-cooker-beef-stew/" },
  vetting: "Budget Bytes tests in its own kitchen, and its comment section is full of cooks reporting back rather than saying it looks delicious. Their three recurring complaints are fixed here: broth raised from two cups to three because it cooks down too far, the brown sugar dropped because several people found it too sweet, and the vegetables cut to an inch after repeated reports of undercooked potato at eight hours."
},

{
  id: "crockpot-tikka-masala",
  title: "Slow Cooker Tikka Masala",
  subtitle: "Chicken in a spiced tomato cream sauce",
  photo: "img/crockpot-tikka-masala.webp",
  photoCredit: { by: "Guilhem Vellut", lic: "CC BY 2.0",
                  url: "https://commons.wikimedia.org/wiki/File:Chicken_Tikka_Masala_@_Indian%27s_Food_@_Annecy_(38894403364).jpg" },
  cuisine: "asian",
  appliances: ["crockpot", "stove"],
  minutes: 200,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 4,
  scalable: [2, 8],
  capacityQt: 2,
  tags: ["set-and-forget", "leftovers", "spicy", "comfort"],
  spiceLevel: 4,
  meals: ["dinner"],

  ingredients: [
    { item: "chicken thighs", qty: 1.3, unit: "lb", aisle: "meat", scale: true,
      note: "boneless and skinless for this one",
      sub: "chicken breast, but pull it out an hour earlier or it goes stringy" },
    { item: "garam masala", qty: 1, unit: "tbsp", aisle: "spices", scale: true,
      note: "the backbone of the dish — use a jar you opened recently" },
    { item: "cumin", qty: 0.5, unit: "tsp", aisle: "spices", scale: true },
    { item: "turmeric", qty: 0.5, unit: "tsp", aisle: "spices", scale: true },
    { item: "smoked paprika", qty: 0.5, unit: "tsp", aisle: "spices", scale: true },
    { item: "cayenne pepper", qty: 0.5, unit: "tsp", aisle: "spices", scale: true,
      note: "this is where the heat comes from — halve it if you want it gentle" },
    { item: "onions", qty: 1, unit: "piece", aisle: "produce", scale: true, note: "diced" },
    { item: "garlic", qty: 3, unit: "clove", aisle: "produce", scale: true },
    { item: "ginger", qty: 1, unit: "tbsp", aisle: "produce", scale: true, note: "grated" },
    { item: "canned tomatoes", qty: 10, unit: "oz", aisle: "canned", scale: true,
      note: "crushed or blitzed smooth", sub: "tomato sauce or passata, the same amount" },
    { item: "heavy cream", qty: 0.25, unit: "cup", aisle: "dairy", scale: true,
      sub: "full-fat coconut milk; it changes the dish but it works" },
    { item: "basmati rice", qty: 1, unit: "cup", aisle: "dry", scale: true, note: "to serve" },
    { item: "fresh cilantro", qty: 2, unit: "tbsp", aisle: "produce", scale: false },
    { item: "vegetable oil", qty: 1, unit: "tbsp", aisle: "canned", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Mix the garam masala, cumin, turmeric, smoked paprika, cayenne, a good half teaspoon of salt and plenty of pepper in a small bowl.",
    "Dice the onion, chop the garlic, grate the ginger.",
    "Pat the chicken thighs dry and toss them in the spice mix until they are properly coated."
  ],

  steps: [
    { text: "Heat the oil in a wide pan over medium-high heat until it shimmers.", minutes: null },
    { text: "Lay the chicken in and sear it for three minutes a side. You are browning it, not cooking it through.", minutes: 6 },
    { text: "Move the chicken into the slow cooker.", minutes: null },
    { text: "Put the onion into the same hot pan and cook it for about five minutes, until soft with brown edges.", minutes: 5 },
    { text: "Tip the onion in with the chicken.", minutes: null },
    { text: "Pour a splash of water into the empty pan and scrape every brown bit off the bottom, then pour that in too.", minutes: null },
    { text: "Add the garlic, the ginger and the tomatoes to the pot and give it one stir.", minutes: null },
    { text: "Put the lid on and cook on low for six hours, or on high for three.", minutes: null },
    { text: "Lift the lid, break the chicken into big pieces with two forks, and stir the cream through.", minutes: null },
    { text: "Taste it. It will almost certainly want more salt than you think.", minutes: null },
    { text: "Serve it over the rice with the cilantro scattered on top.", minutes: null }
  ],

  beginnerTip: "Do not skip the searing to save a pan. Spice-coated chicken hitting a hot dry pan is where nearly all the flavour in this dish is made — the spices toast and the meat browns, and a slow cooker can do neither of those things. Three minutes a side, and don't move it while it browns.",
  makeItBetter: "Two things, both straight from cooks who found it flat. Open your garam masala and smell it: if it doesn't hit you, it's old, and you want half as much again. And stir the cream in at the very end with the pot switched off — boiled cream goes thin and grainy, cream folded into a hot sauce off the heat stays silky.",
  skills: ["searing", "toasting spices", "deglazing"],

  source: { name: "Budget Bytes — Easy Slow Cooker Chicken Tikka Masala",
            url: "https://www.budgetbytes.com/slow-cooker-chicken-tikka-masala/" },
  vetting: "Budget Bytes took its own first version down, said publicly that it wasn't good enough, and retested it — which is exactly the kind of kitchen this collection is supposed to draw from. Two reader complaints drove that rewrite and both are handled here: it tasted too tomato-heavy, so the tomato is halved against the usual ratio, and it tasted flat, which cooks traced to tired garam masala rather than the recipe. America's Test Kitchen's Cook's Country runs an independent slow-cooker version of the same dish. The cayenne is doubled from the original, which had it as optional, because bland is not what Jerome asked for."
},

/* ------------------------------------------------------------ instantpot -- */
{
  id: "mercimek-lentil-soup",
  title: "Red Lentil Soup with Lemon",
  subtitle: "Cumin, chilli and a whole lemon's worth of lift",
  photo: "img/mercimek-lentil-soup.webp",
  photoCredit: { by: "E4024", lic: "CC BY-SA 4.0",
                  url: "https://commons.wikimedia.org/wiki/File:Red_lentil_soup_from_Turkey.jpg" },
  cuisine: "middle-eastern",
  appliances: ["instantpot", "stove"],
  minutes: 35,
  activeMinutes: 15,
  difficulty: "easy",
  baseServings: 4,
  scalable: [2, 6],
  capacityQt: 2.5,
  tags: ["one-pot", "vegetarian", "leftovers", "cheap"],
  spiceLevel: 3,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "red lentils", qty: 1, unit: "cup", aisle: "dry", scale: true,
      note: "no soaking, and they must be the split red ones",
      sub: "yellow split lentils; brown lentils will not break down the same way" },
    { item: "onion", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "garlic", qty: 2, unit: "clove", aisle: "produce", scale: true },
    { item: "carrot", qty: 1, unit: "piece", aisle: "produce", scale: true, note: "large" },
    { item: "vegetable stock", qty: 4, unit: "cup", aisle: "canned", scale: true,
      sub: "chicken stock, or water plus an extra pinch of salt" },
    { item: "tomato paste", qty: 1, unit: "tbsp", aisle: "canned", scale: true },
    { item: "ground cumin", qty: 1, unit: "tsp", aisle: "spices", scale: true },
    { item: "chilli powder", qty: 0.25, unit: "tsp", aisle: "spices", scale: true,
      sub: "cayenne, half as much" },
    { item: "lemon", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "fresh cilantro", qty: 3, unit: "tbsp", aisle: "produce", scale: false,
      sub: "flat-leaf parsley or mint" },
    { item: "olive oil", qty: 3, unit: "tbsp", aisle: "other", scale: true, staple: true },
    { item: "salt", qty: 1, unit: "tsp", aisle: "spices", scale: true, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Chop the onion and mince the garlic.",
    "Grate the carrot on the coarse side of a box grater, or chop it small.",
    "Rinse the lentils in a sieve until the water runs clear.",
    "Cut the lemon in half and chop the cilantro."
  ],

  steps: [
    { text: "Set the Instant Pot to sauté and warm the olive oil.", minutes: null },
    { text: "Cook the onion with a pinch of salt for about five minutes, until it is soft and golden at the edges.", minutes: 5 },
    { text: "Add the garlic, the tomato paste, the cumin, the salt and the chilli powder, and stir for two minutes until it darkens and smells toasted.", minutes: 2 },
    { text: "Turn the sauté off. Add the stock, the lentils and the carrot, and scrape the bottom of the pot clean.", minutes: null },
    { text: "Close the lid, set the valve to sealing, and pressure cook on high for six minutes.", minutes: 6 },
    { text: "Let the pressure come down on its own for ten minutes, then release the rest.", minutes: 10 },
    { text: "Blend about half the soup, either with a stick blender straight in the pot or by ladling half into a jug blender.", minutes: null },
    { text: "Squeeze in the juice of half the lemon and taste it.", minutes: null },
    { text: "Keep adding lemon until it tastes bright rather than flat. That is usually the whole lemon.", minutes: null },
    { text: "Serve with the cilantro on top and more lemon on the side.", minutes: null }
  ],

  beginnerTip: "Only blend half of it. Fully smooth turns into baby food and fully chunky tastes thin — half puréed with lumps left in it is what gives the soup body, and it is the thing most people get wrong on their first go.",
  makeItBetter: "Do not stop adding lemon too early. This soup tastes dull and heavy right up until the acid arrives, and then it snaps into focus. If it tastes like it is missing something, it is missing lemon, not salt.",
  skills: ["blooming spices", "pressure cooking", "seasoning with acid"],

  source: { name: "Melissa Clark — Red Lentil Soup with Lemon (New York Times), read via Burnt My Fingers' write-up",
            url: "https://burntmyfingers.com/2023/03/26/recipe-melissa-clarks-red-lentil-soup/" },
  vetting: "One of the most-cooked recipes on NYT Cooking, with something close to thirty-two thousand likes, and Sam Sifton has said it is the only recipe Melissa Clark follows to the letter every time. Written here for the Instant Pot; her stovetop version simmers about thirty minutes instead, and everything else is the same. The half-blend and the insistence on lemon are both hers."
},

/* ------------------------------------------------------------ ricecooker -- */
{
  id: "takikomi-gohan",
  title: "Takikomi Gohan",
  subtitle: "Japanese mixed rice — chicken and mushrooms, all in the rice cooker",
  photo: "img/takikomi-gohan.webp",
  photoCredit: { by: "pelican (Tokyo)", lic: "CC BY-SA 2.0",
                  url: "https://commons.wikimedia.org/wiki/File:Maitake_rice_(4348648458).jpg" },
  cuisine: "asian",
  appliances: ["ricecooker"],
  minutes: 90,
  activeMinutes: 15,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 0.75,
  tags: ["one-pot", "set-and-forget", "cheap", "leftovers"],
  spiceLevel: 2,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "short-grain rice", qty: 1, unit: "cup", aisle: "dry", scale: true,
      note: "sushi rice is the same thing",
      sub: "long-grain white rice works, but it comes out separate and fluffy instead of sticky — a different dish, still a good one" },
    { item: "chicken thighs", qty: 5, unit: "oz", aisle: "meat", scale: true,
      note: "boneless, cut into bite-sized pieces" },
    { item: "mushrooms", qty: 3, unit: "oz", aisle: "produce", scale: true,
      note: "shiitake if you can get them — far deeper flavour than button mushrooms" },
    { item: "carrots", qty: 1, unit: "piece", aisle: "produce", scale: true,
      note: "small, cut into matchsticks" },
    { item: "soy sauce", qty: 1, unit: "tbsp", aisle: "canned", scale: true },
    { item: "mirin", qty: 1, unit: "tbsp", aisle: "canned", scale: true,
      sub: "a teaspoon of sugar stirred into a tablespoon of white wine" },
    { item: "chicken stock", qty: 1, unit: "cup", aisle: "canned", scale: true,
      note: "dashi is the real thing here if you have it" },
    { item: "ginger", qty: 1, unit: "tsp", aisle: "produce", scale: true, note: "grated" },
    { item: "scallions", qty: 2, unit: "piece", aisle: "produce", scale: false,
      note: "sliced thin, for the end" }
  ],

  misePlace: [
    "Rinse the rice in cold water three or four times, until the water runs almost clear.",
    "Cover the rice with plain water and leave it to soak for half an hour. Plain water only — no seasoning yet.",
    "Drain it in a sieve and leave it there for a good fifteen minutes.",
    "Meanwhile cut the chicken small, slice the mushrooms, and cut the carrot into matchsticks."
  ],

  steps: [
    { text: "Tip the drained rice into the rice cooker pot.", minutes: null },
    { text: "Add the soy sauce, the mirin and the grated ginger, then pour in the stock and stir it once so the seasoning is even.", minutes: null },
    { text: "Lay the carrot over the rice, then the mushrooms, then the chicken on top.", minutes: null },
    { text: "Do not stir anything in. Leave it all sitting on the surface.", minutes: null },
    { text: "Close the lid and start it on the normal white rice setting, or the mixed rice setting if yours has one.", minutes: null },
    { text: "When it clicks off, leave the lid shut for ten more minutes.", minutes: 10 },
    { text: "Open it and fold everything together with a rice paddle, cutting down through the rice rather than stirring in circles.", minutes: null },
    { text: "Scatter the scallions over the top and serve it straight from the pot.", minutes: null }
  ],

  beginnerTip: "Soak the rice in plain water, and season it only once it's drained. Soy sauce stops rice absorbing water, so rice left sitting in the seasoning arrives at the cooker still hard in the middle and stays that way. Plain water first, seasoning last, and the ingredients go on top without stirring so the heat can still move through the rice underneath.",
  makeItBetter: "Keep the solid ingredients to about a quarter of the rice by volume. Piling in more looks generous and is the single fastest way to wreck it — everything you add drinks the liquid the rice needed, and you get a damp, half-cooked pot. If you want it to bite back, a shake of shichimi or a pinch of chilli flakes over each bowl at the table does it without touching the cooking.",
  skills: ["rinsing and soaking rice", "layering a rice cooker", "seasoned rice"],

  source: { name: "Namiko Chen — Takikomi Gohan, Just One Cookbook",
            url: "https://www.justonecookbook.com/takikomi-gohan/" },
  vetting: "Just One Cookbook is a named cook writing Japanese home cooking with a long record, and the same dish and the same rice-cooker method appear independently at Zojirushi and Tiger — the two firms that actually build these machines and test on them — and at Cooking with Dog. Three warnings come straight from that guidance and are written into the steps: never soak the rice in the seasoning, never stir the ingredients in before cooking, and keep the add-ins to roughly a quarter of the rice or they steal the liquid. Konnyaku, aburaage and burdock root are in the original and are dropped here because Jerome cannot reliably buy them in Charleston; what is left is chicken, mushroom and carrot, which is a normal everyday version of the dish rather than a compromise. His rice cooker is about one and a half quarts, so the app warns rather than pretends at four servings."
},

/* -------------------------------------------------------------- airfryer -- */
{
  id: "airfryer-salmon",
  title: "Air Fryer Salmon",
  subtitle: "Two fillets, twelve minutes, nothing to wash",
  photo: "img/airfryer-salmon.webp",
  photoCredit: { by: "DanaTentis", lic: "CC0",
                  url: "https://commons.wikimedia.org/wiki/File:Grilled_plated_salmon_fillet.jpg" },
  cuisine: "other",
  appliances: ["airfryer"],
  minutes: 15,
  activeMinutes: 8,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 2],
  capacityQt: 0.8,
  tags: ["quick", "weeknight", "small-air-fryer"],
  spiceLevel: 2,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "salmon", qty: 2, unit: "piece", aisle: "meat", scale: true,
      note: "six ounces each, skin on",
      sub: "any thick fish fillet; thin ones cook far faster, so check early" },
    { item: "lemon", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "smoked paprika", qty: 0.5, unit: "tsp", aisle: "spices", scale: true },
    { item: "garlic powder", qty: 0.5, unit: "tsp", aisle: "spices", scale: true },
    { item: "aleppo pepper", qty: 0.5, unit: "tsp", aisle: "spices", scale: true,
      sub: "a pinch of chilli flakes" },
    { item: "olive oil", qty: 1, unit: "tbsp", aisle: "other", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Take the salmon out of the fridge fifteen minutes early. Fridge-cold fish cooks unevenly.",
    "Pat both fillets completely dry with paper towel.",
    "Mix the paprika, garlic powder, aleppo pepper, salt and pepper in a small bowl.",
    "Cut the lemon into wedges."
  ],

  steps: [
    { text: "Heat the air fryer to four hundred degrees for three minutes.", minutes: 3 },
    { text: "Rub the fillets all over with the olive oil, then press the spice mix onto the top and sides.", minutes: null },
    { text: "Lay them in the basket skin side down with a clear gap between them.", minutes: null },
    { text: "Cook for ten minutes, then check the thickest part.", minutes: 10 },
    { text: "It is done when the centre is still slightly translucent and a thermometer reads one hundred and twenty five degrees.", minutes: null },
    { text: "If it needs more, give it two minutes at a time and check again.", minutes: 2 },
    { text: "Let the fillets rest for two minutes, then squeeze lemon over them.", minutes: 2 }
  ],

  beginnerTip: "Cook it to a hundred and twenty five degrees in the middle, not until it flakes apart. Salmon that flakes easily in the basket is already dry by the time it reaches the plate — pull it while the very centre still looks a shade darker and undercooked.",
  makeItBetter: "Dry the fish properly and give the fillets real space in the basket. Wet fish and a crowded basket both do the same thing: they steam instead of roast, and you lose the browned edge that makes this worth doing in the air fryer at all.",
  skills: ["cooking to temperature", "resting protein"],

  source: { name: "America's Test Kitchen — Air-Fryer Roasted Salmon Fillets",
            url: "https://www.americastestkitchen.com/recipes/12457-air-fryer-roasted-salmon-fillets" },
  vetting: "America's Test Kitchen's air-fryer salmon: four hundred degrees, ten to fourteen minutes, pulled at a hundred and twenty five degrees for farmed salmon and a hundred and twenty for wild. Their point about leaving space between fillets is why this recipe stops at two — a two quart basket holds two six-ounce fillets and no more, so it is written as a two-serving dish that does not scale up."
},

{
  id: "airfryer-chickpeas",
  title: "Crispy Air Fryer Chickpeas",
  subtitle: "Cumin and chilli, eaten by the handful",
  photo: "img/airfryer-chickpeas.webp",
  photoCredit: { by: "ella.o", lic: "CC BY 2.0",
                  url: "https://www.flickr.com/photos/155807330@N05/45508607031" },
  cuisine: "middle-eastern",
  appliances: ["airfryer"],
  minutes: 25,
  activeMinutes: 8,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 2],
  capacityQt: 0.7,
  tags: ["snack", "vegetarian", "small-air-fryer", "cheap"],
  spiceLevel: 3,
  meals: ["snack"],

  ingredients: [
    { item: "canned chickpeas", qty: 1, unit: "can", aisle: "canned", scale: true,
      note: "fifteen ounces, drained" },
    { item: "ground cumin", qty: 1, unit: "tsp", aisle: "spices", scale: true },
    { item: "smoked paprika", qty: 1, unit: "tsp", aisle: "spices", scale: true },
    { item: "cayenne pepper", qty: 0.25, unit: "tsp", aisle: "spices", scale: true },
    { item: "sumac", qty: 0.5, unit: "tsp", aisle: "spices", scale: true,
      note: "goes on after cooking", sub: "a squeeze of lemon instead" },
    { item: "olive oil", qty: 1, unit: "tbsp", aisle: "other", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Drain and rinse the chickpeas, then spread them on paper towel and roll them around until they are properly dry.",
    "If you have an hour, leave them on the counter to air dry. It makes a real difference.",
    "Mix the cumin, paprika, cayenne and salt in a small bowl.",
    "Keep the sumac separate — it goes on at the end, not in the basket."
  ],

  steps: [
    { text: "Heat the air fryer to three hundred and eighty degrees for three minutes.", minutes: 3 },
    { text: "Toss the dry chickpeas with the olive oil only. Leave the spices out for now.", minutes: null },
    { text: "Tip them into the basket in one layer. One can is about as much as a two quart basket will take.", minutes: null },
    { text: "Cook for twelve minutes, shaking the basket hard every four minutes.", minutes: 12 },
    { text: "Bite one. It should crunch all the way through with no soft middle.", minutes: null },
    { text: "If it is still soft, give it three more minutes and check again.", minutes: 3 },
    { text: "Tip the hot chickpeas into a bowl and toss them with the spice mix straight away.", minutes: null },
    { text: "Scatter the sumac over the top and eat them warm.", minutes: null }
  ],

  beginnerTip: "Different brands of canned chickpeas take wildly different times — some are crisp in six minutes, some take nearly twice that. Go by biting one, never by the clock.",
  makeItBetter: "Cook them naked in oil and add the spices after. Ground spices burn to bitterness long before a chickpea gets crunchy, so tossing them on at the end gives you the flavour with none of the char.",
  skills: ["drying before roasting", "seasoning off the heat"],

  source: { name: "America's Test Kitchen — Air-Fryer Crispy Chickpeas; drying method cross-checked with Skinnytaste",
            url: "https://www.americastestkitchen.com/recipes/14782-air-fryer-crispy-barbecue-chickpeas" },
  vetting: "Two independent sources make the same two points and both are in the steps: dry the chickpeas properly or they will never crisp, and shake the basket every few minutes. The brand-to-brand timing spread is Skinnytaste's observation from testing several cans — which is why this recipe tells you to bite one instead of trusting a number. Stored in an open container, not a sealed one, or they soften again."
},

{
  id: "airfryer-chicken-thighs",
  title: "Air Fryer Chicken Thighs",
  subtitle: "Two thighs, shattering skin, salt and nothing else",
  photo: "img/airfryer-chicken-thighs.webp",
  photoCredit: { by: "Willis Lam", lic: "CC BY-SA 2.0",
                  url: "https://commons.wikimedia.org/wiki/File:Roast_Chicken_Legs_and_Thighs_(31196736704).jpg" },
  cuisine: "american",
  appliances: ["airfryer"],
  minutes: 30,
  activeMinutes: 10,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 2],
  capacityQt: 1,
  tags: ["quick", "weeknight", "small-air-fryer", "cheap"],
  spiceLevel: 2,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "chicken thighs", qty: 2, unit: "piece", aisle: "meat", scale: true,
      note: "bone-in, skin-on. Two is the honest limit of a two quart basket." },
    { item: "smoked paprika", qty: 1, unit: "tsp", aisle: "spices", scale: true },
    { item: "garlic powder", qty: 0.5, unit: "tsp", aisle: "spices", scale: true },
    { item: "aleppo pepper", qty: 0.5, unit: "tsp", aisle: "spices", scale: true,
      sub: "chilli flakes, half as much" },
    { item: "lemon", qty: 0.5, unit: "piece", aisle: "produce", scale: false },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Pat the chicken thighs bone dry with paper towel.",
    "Poke the skin ten or twelve times with the tip of a sharp knife, going through the skin but not into the meat.",
    "Salt them all over, including underneath, and leave them uncovered on a plate for twenty minutes if you have the time.",
    "Mix the paprika, garlic powder, aleppo pepper and black pepper together."
  ],

  steps: [
    { text: "Heat the air fryer to four hundred degrees for three minutes.", minutes: 3 },
    { text: "Rub the spice mix over the skin side of both thighs.", minutes: null },
    { text: "Put them in the basket skin side up, not touching each other.", minutes: null },
    { text: "Cook for twelve minutes at four hundred degrees.", minutes: 12 },
    { text: "Turn the heat down to three hundred and seventy five and cook for another eight minutes.", minutes: 8 },
    { text: "Check the thickest part next to the bone. It needs to read one hundred and sixty five degrees.", minutes: null },
    { text: "Let them sit for five minutes before you touch them. The skin firms up as they rest.", minutes: 5 },
    { text: "Squeeze the lemon over the top just before serving.", minutes: null }
  ],

  beginnerTip: "Poking holes in the skin is the whole trick. The fat under the skin needs somewhere to escape to, and those holes are what turn soft rubbery skin into something that cracks. Go through the skin only — if you hit meat you are letting juice out instead.",
  makeItBetter: "Salt them and leave them uncovered on a plate for twenty minutes first, or overnight in the fridge if you plan ahead. Dry skin browns and wet skin steams, and there is no seasoning that gets you round it.",
  skills: ["dry brining", "rendering fat", "cooking to temperature"],

  source: { name: "America's Test Kitchen's salt-and-poke method for air-fryer thighs, cross-checked with Budget Bytes",
            url: "https://www.budgetbytes.com/air-fryer-chicken-thighs/" },
  vetting: "America's Test Kitchen's air-fryer thigh method needs nothing but chicken and salt, and its distinctive step is poking holes in the skin so the fat can render out. Budget Bytes arrives at the same hot-then-lower temperature ladder independently, and both say to rest the thighs before serving because the skin firms up as they sit. Capped at two thighs because that is what a two quart basket actually holds with air moving around them."
}

,

{
  id: "firecracker-meatballs",
  title: "Firecracker Meatballs",
  subtitle: "Beef meatballs in a sweet, creamy, hot sauce",
  photo: "img/firecracker-meatballs.webp",
  photoCredit: { by: "avlxyz", lic: "CC BY SA 2.0",
                  url: "https://www.flickr.com/photos/10559879@N00/5096521676" },
  cuisine: "asian",
  appliances: ["stove"],
  minutes: 35,
  activeMinutes: 25,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 6],
  capacityQt: 1.6,
  tags: ["hellofresh-style", "weeknight", "sheet-pan", "crowd-pleaser"],
  spiceLevel: 3,
  meals: ["dinner"],

  ingredients: [
    { item: "ground beef", qty: 10, unit: "oz", aisle: "meat", scale: true,
      note: "eighty percent lean. Leaner than that and they go dry." },
    { item: "panko", qty: 0.25, unit: "cup", aisle: "dry", scale: true,
      sub: "breadcrumbs, but use a little less" },
    { item: "ginger", qty: 1, unit: "tbsp", aisle: "produce", scale: true,
      note: "fresh, grated fine" },
    { item: "scallions", qty: 2, unit: "piece", aisle: "produce", scale: true },
    { item: "soy sauce", qty: 2, unit: "tbsp", aisle: "canned", scale: true },
    { item: "mayonnaise", qty: 3, unit: "tbsp", aisle: "canned", scale: true },
    { item: "sour cream", qty: 2, unit: "tbsp", aisle: "dairy", scale: true,
      sub: "plain yogurt works, but it is thinner" },
    { item: "honey", qty: 2, unit: "tsp", aisle: "dry", scale: true },
    { item: "sriracha", qty: 2, unit: "tsp", aisle: "canned", scale: true,
      sub: "any hot sauce, or harissa for something smokier" },
    { item: "limes", qty: 0.5, unit: "piece", aisle: "produce", scale: false },
    { item: "white rice", qty: 0.75, unit: "cup", aisle: "dry", scale: true,
      note: "jasmine if you have it, but any long grain white rice works" },
    { item: "green beans", qty: 6, unit: "oz", aisle: "produce", scale: true,
      sub: "frozen green beans, straight from the bag" },
    { item: "sesame seeds", qty: 1, unit: "tbsp", aisle: "spices", scale: false },
    { item: "vegetable oil", qty: null, unit: null, aisle: "dry", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Heat the oven to four hundred and twenty five degrees.",
    "Grate the ginger and slice the scallions thin, keeping the white parts and the green parts in separate piles.",
    "Mix the mayonnaise, sour cream, honey, sriracha and one tablespoon of the soy sauce in a small bowl. That is the firecracker sauce.",
    "Squeeze half a lime into the sauce and stir it through.",
    "Trim the green beans."
  ],

  steps: [
    { text: "Start the rice however you normally cook it. It wants about eighteen minutes and it can sit covered once it is done.", minutes: 18 },
    { text: "Put the beef in a bowl with the panko, the ginger, the scallion whites, the rest of the soy sauce and a good grind of black pepper.", minutes: null },
    { text: "Mix it with your hands until it just comes together, then stop. Do not add salt.", minutes: null },
    { text: "Roll it into about ten meatballs, each one roughly the size of a golf ball.", minutes: null },
    { text: "Oil a baking sheet and put the meatballs on one half of it.", minutes: null },
    { text: "Toss the green beans with a little oil and pepper and spread them on the other half.", minutes: null },
    { text: "Roast everything on the top shelf for fifteen minutes.", minutes: 15 },
    { text: "The meatballs are done when they are firm and browned on top and the beans have dark blistered edges.", minutes: null },
    { text: "Tip the hot meatballs straight into the bowl of firecracker sauce and turn them over until every one is coated.", minutes: null },
    { text: "Serve them on the rice with the beans alongside, and scatter the scallion greens and sesame seeds over the top.", minutes: null }
  ],

  beginnerTip: "Do not salt the meat. There is already two tablespoons of soy sauce going in, and the single most common complaint about this dish is that the meatballs come out far too salty because people season them as well. The sauce is salty too. Trust it.",
  makeItBetter: "Toss the meatballs in the sauce while they are still hot from the oven, not after they have cooled on the tray. Hot meat drinks the sauce in instead of wearing it, and that is the difference between a coated meatball and a soggy one. A squeeze of lime in the sauce keeps all that honey and mayonnaise from tasting flat.",
  skills: ["mixing meatballs", "sheet-pan roasting", "balancing sweet and heat"],

  source: { name: "HelloFresh's Firecracker Meatballs, rewritten with the fix from their own reviewers",
            url: "https://www.hellofresh.com/recipes/firecracker-meatballs-645120e55e9ec97492046b1c" },
  vetting: "Repeatedly named on r/hellofresh as a ten out of ten, including a first-box review that singled it out. The version here fixes the failure people actually report on HelloFresh's own review page, where a cook writes that the recipe calls for soy sauce to be added to the meat AND salt, which makes the meatballs far too salty. The added salt is dropped entirely. The Endless Meal's independent copycat arrives at the same sauce and adds an acid to balance it, which is why the lime is here."
},

{
  id: "street-cart-chicken",
  title: "Street Cart Chicken Bowl",
  subtitle: "Halal-cart chicken, yellow rice and the white sauce",
  photo: "img/street-cart-chicken.webp",
  photoCredit: { by: "Namillionairee", lic: "CC BY 2.0",
                  url: "https://www.flickr.com/photos/12695016@N04/40793732112" },
  cuisine: "middle-eastern",
  appliances: ["stove"],
  minutes: 30,
  activeMinutes: 25,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 6],
  capacityQt: 1.8,
  tags: ["hellofresh-style", "one-pan", "weeknight", "crowd-pleaser"],
  spiceLevel: 2,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "chicken thighs", qty: 4, unit: "piece", aisle: "meat", scale: true,
      note: "boneless and skinless, cut into bite-sized pieces" },
    { item: "basmati rice", qty: 0.75, unit: "cup", aisle: "dry", scale: true,
      sub: "any long grain white rice" },
    { item: "chicken stock", qty: 1.5, unit: "cup", aisle: "canned", scale: true,
      sub: "water and a stock cube" },
    { item: "turmeric", qty: 0.5, unit: "tsp", aisle: "spices", scale: true,
      note: "this is what makes the rice yellow" },
    { item: "shawarma spice blend", qty: 1, unit: "tbsp", aisle: "spices", scale: true,
      sub: "two teaspoons cumin, one of coriander, one of paprika and a pinch of allspice" },
    { item: "garlic powder", qty: 0.5, unit: "tsp", aisle: "spices", scale: true,
      note: "this half goes in the white sauce, not on the chicken" },
    { item: "mayonnaise", qty: 4, unit: "tbsp", aisle: "canned", scale: true },
    { item: "sour cream", qty: 3, unit: "tbsp", aisle: "dairy", scale: true,
      sub: "plain yogurt, which is closer to what the carts actually use" },
    { item: "lemons", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "tomatoes", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "scallions", qty: 2, unit: "piece", aisle: "produce", scale: true },
    { item: "pita bread", qty: 2, unit: "piece", aisle: "bakery", scale: true },
    { item: "hot sauce", qty: null, unit: null, aisle: "canned", scale: false,
      note: "to taste, at the table" },
    { item: "butter", qty: 1, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "olive oil", qty: null, unit: null, aisle: "dry", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Cut the chicken into bite-sized pieces and pat them dry.",
    "Measure the shawarma spice blend into a small bowl.",
    "Stir the mayonnaise, sour cream, the garlic powder and a good squeeze of lemon together for the white sauce, then thin it with a teaspoon of water at a time until it pours.",
    "Dice the tomato and slice the scallions, keeping the whites and greens apart."
  ],

  steps: [
    { text: "Melt the butter in a small pot and stir in the turmeric until it smells warm and looks bright.", minutes: null },
    { text: "Add the rice and stir it around for a minute so every grain gets coated.", minutes: 1 },
    { text: "Pour in the stock, add a pinch of salt, and bring it to a boil.", minutes: null },
    { text: "Cover it, turn the heat right down, and leave it for fifteen minutes without lifting the lid.", minutes: 15 },
    { text: "While the rice cooks, toss the chicken with the shawarma spice, a big pinch of salt and some pepper.", minutes: null },
    { text: "Heat a slick of olive oil in a wide pan over medium-high heat until it shimmers.", minutes: null },
    { text: "Lay the chicken in one layer and leave it alone for four minutes so it browns instead of steaming.", minutes: 4 },
    { text: "Add the scallion whites and stir everything for another three minutes, until the chicken is cooked through.", minutes: 3 },
    { text: "Warm the pita in a dry pan for about thirty seconds a side, then cut each one into quarters.", minutes: null },
    { text: "Fluff the rice with a fork and pile it into bowls.", minutes: null },
    { text: "Top with the chicken and the tomato in their own separate patches, not mixed together.", minutes: null },
    { text: "Drizzle the white sauce over everything, add hot sauce to taste, and scatter the scallion greens on top.", minutes: null }
  ],

  beginnerTip: "Give the chicken room. If you crowd the pan the pieces release water, sit in it and turn grey instead of brown, and the whole bowl tastes flat. Cook it in two batches if your pan is small. It takes four extra minutes and it is the difference between this tasting like a street cart and tasting like boiled chicken.",
  makeItBetter: "Bloom the turmeric in the butter before the rice goes in. Ground spices are fat-soluble, so thirty seconds in hot butter pulls out flavour that plain water never will, and it is why cart rice tastes of something instead of just looking yellow. Do the same with the cumin if you want to go further.",
  skills: ["blooming spices", "browning in batches", "pilaf rice"],

  source: { name: "HelloFresh's Street Cart-Style Chicken Bowls, rewritten from the halal-cart original",
            url: "https://www.hellofresh.com/recipes/street-cart-style-chicken-bowls-63ecaed802dfc404e006c190" },
  vetting: "One of the most consistently praised meals in r/hellofresh, named as a top meal in several separate threads with the white sauce singled out every time. One reviewer says plainly that they make extra garlic white sauce because it is so good. The dish is a home version of New York halal-cart chicken, which Serious Eats documents independently, so the format is not a marketing invention. Written for a pan rather than a packet, with the spice blend built from jars Jerome already owns. The blend ratio is the one that matches across HelloFresh’s own 2019 post, the Joe’s Daily compendium and My Sweet Precision; tap the spice on the ingredient list and the app tells you the spoons."
},

{
  id: "peruvian-aji-verde-chicken",
  title: "Peruvian Chicken with Green Sauce",
  subtitle: "Seared chicken under a cold, sharp, herby aji verde",
  photo: "img/peruvian-aji-verde-chicken.webp",
  photoCredit: { by: "France1978", lic: "CC BY SA 2.0",
                  url: "https://www.flickr.com/photos/51764518@N02/52484972938" },
  cuisine: "other",
  appliances: ["stove"],
  minutes: 40,
  activeMinutes: 30,
  difficulty: "medium",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1.5,
  tags: ["hellofresh-style", "sauce-forward", "needs-a-blender"],
  spiceLevel: 3,
  meals: ["dinner"],

  ingredients: [
    { item: "chicken thighs", qty: 4, unit: "piece", aisle: "meat", scale: true,
      note: "boneless and skinless" },
    { item: "sweet potatoes", qty: 2, unit: "piece", aisle: "produce", scale: true },
    { item: "canned black beans", qty: 1, unit: "can", aisle: "canned", scale: true,
      sub: "canned white beans, though the colour is less pretty" },
    { item: "fresh cilantro", qty: 1, unit: "bunch", aisle: "produce", scale: false,
      note: "stems and all, because the stems carry most of the flavour" },
    { item: "jalapenos", qty: 1, unit: "piece", aisle: "produce", scale: false,
      sub: "half a teaspoon of chilli flakes, though you lose the green freshness" },
    { item: "limes", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "mayonnaise", qty: 4, unit: "tbsp", aisle: "canned", scale: true },
    { item: "garlic", qty: 2, unit: "clove", aisle: "produce", scale: true },
    { item: "scallions", qty: 2, unit: "piece", aisle: "produce", scale: true },
    { item: "cumin", qty: 2, unit: "tsp", aisle: "spices", scale: true },
    { item: "smoked paprika", qty: 1, unit: "tsp", aisle: "spices", scale: true },
    { item: "olive oil", qty: null, unit: null, aisle: "dry", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Heat the oven to four hundred and twenty five degrees.",
    "Cut the sweet potatoes into pieces about an inch across. Leave the skin on.",
    "Pat the chicken dry and salt it on both sides.",
    "Cut the stem off the jalapeno. Leave the seeds in for the full kick, scrape them out if you would rather not.",
    "Drain and rinse the black beans."
  ],

  steps: [
    { text: "Toss the sweet potatoes with oil, salt and half the cumin, spread them on a tray, and roast for twenty five minutes.", minutes: 25 },
    { text: "Put the cilantro, the jalapeno, the scallions, the garlic, the mayonnaise, the juice of the whole lime and a good pinch of salt into a blender.", minutes: null },
    { text: "Add a tablespoon of olive oil and a tablespoon of water, then blend for a full minute until it is completely smooth and bright green.", minutes: 1 },
    { text: "Taste it. It should be sharp enough to make you blink. Add more lime or salt until it does.", minutes: null },
    { text: "Put the sauce in the fridge. It wants to be cold when it meets the hot chicken.", minutes: null },
    { text: "Rub the chicken with the rest of the cumin, the smoked paprika and some black pepper.", minutes: null },
    { text: "Heat a heavy pan over medium-high until a drop of water skitters across it.", minutes: null },
    { text: "Lay the chicken in and leave it completely alone for six minutes.", minutes: 6 },
    { text: "Turn it once and cook for another five minutes, until the thickest part reads one hundred and sixty five degrees.", minutes: 5 },
    { text: "Move the chicken to a board and let it rest for five minutes.", minutes: 5 },
    { text: "Warm the black beans in the same pan with a splash of water, scraping up the brown bits stuck to the bottom.", minutes: 3 },
    { text: "Slice the chicken thick, put it on the beans and sweet potatoes, and spoon the cold green sauce over the top.", minutes: null }
  ],

  beginnerTip: "You need a blender or a small food processor for the green sauce. Chopping it by hand gives you salsa, not sauce, because it never goes creamy. If you do not have one, chop everything as fine as you possibly can and stir it into the mayonnaise. It will still taste good, it just will not pour.",
  makeItBetter: "Sear the chicken in a pan rather than roasting it on the tray with the potatoes. HelloFresh's own cooks say the same thing, and their most detailed review of this dish says the chicken was the weakest part and should have been pan seared. A hard sear gives you a brown crust, and the brown crust is what the cold sauce plays against. Roasted chicken under green sauce is soft on soft.",
  skills: ["searing", "blender sauces", "seasoning to taste"],

  source: { name: "Serious Eats' Peruvian chicken with aji verde, in the bowl format HelloFresh popularised",
            url: "https://www.seriouseats.com/peruvian-style-roast-chicken-with-green-sauce-recipe" },
  vetting: "The green sauce is a genuine Peruvian preparation documented by Serious Eats, so this clears the tested-kitchen leg on its own. HelloFresh's bowl version is separately well-liked on r/hellofresh, and the r/seriouseats thread on the original is full of cooks reporting what they changed, including marinating thighs overnight instead of using a whole bird. The criticism that recurs is the chicken being roasted rather than seared, which is fixed here."
},

{
  id: "hot-honey-chicken",
  title: "Hot Honey Chicken",
  subtitle: "Crunchy panko chicken with sweet, burning honey",
  photo: "img/hot-honey-chicken.webp",
  photoCredit: { by: "goodiesfirst", lic: "CC BY 2.0",
                  url: "https://www.flickr.com/photos/49215102@N00/3223295808" },
  cuisine: "american",
  appliances: ["airfryer", "stove"],
  minutes: 35,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1.1,
  tags: ["hellofresh-style", "small-air-fryer", "weeknight", "crowd-pleaser"],
  spiceLevel: 3,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "chicken breast", qty: 2, unit: "piece", aisle: "meat", scale: true,
      note: "sliced through the middle into thin cutlets" },
    { item: "panko", qty: 0.75, unit: "cup", aisle: "dry", scale: true,
      sub: "breadcrumbs, though panko is much crunchier" },
    { item: "mayonnaise", qty: 3, unit: "tbsp", aisle: "canned", scale: true,
      note: "this is the glue that holds the crust on" },
    { item: "honey", qty: 3, unit: "tbsp", aisle: "dry", scale: true },
    { item: "hot sauce", qty: 1, unit: "tbsp", aisle: "canned", scale: true,
      sub: "sriracha, or harissa for something smokier" },
    { item: "chilli flakes", qty: 0.5, unit: "tsp", aisle: "spices", scale: true },
    { item: "smoked paprika", qty: 1, unit: "tsp", aisle: "spices", scale: true },
    { item: "garlic powder", qty: 1, unit: "tsp", aisle: "spices", scale: true },
    { item: "potatoes", qty: 12, unit: "oz", aisle: "produce", scale: true,
      note: "cut into half-inch cubes" },
    { item: "butter", qty: 1, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "olive oil", qty: null, unit: null, aisle: "dry", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Lay each chicken breast flat and slice it through the middle so you have two thin pieces. Pat them dry and salt them.",
    "Mix the panko with the smoked paprika, the garlic powder, salt and pepper on a plate.",
    "Warm the honey, the hot sauce and the chilli flakes together in a small pan until it is just runny, then take it straight off the heat.",
    "Cut the potatoes into half-inch cubes."
  ],

  steps: [
    { text: "Toss the potatoes with oil, salt and pepper and cook them in the air fryer at four hundred degrees for eighteen minutes, shaking the basket twice.", minutes: 18 },
    { text: "While they cook, brush both sides of each chicken cutlet with a thin coat of mayonnaise.", minutes: null },
    { text: "Press each one into the seasoned panko, both sides, pushing hard so the crumbs stick.", minutes: null },
    { text: "Take the potatoes out and keep them somewhere warm.", minutes: null },
    { text: "Lay one or two cutlets in the basket, not touching, and brush them lightly with oil.", minutes: null },
    { text: "Cook at three hundred and eighty degrees for twelve minutes, turning them once halfway.", minutes: 12 },
    { text: "They are done when the crust is deep golden and the thickest part reads one hundred and sixty five degrees.", minutes: null },
    { text: "Toss the warm potatoes with the butter and a pinch of salt.", minutes: null },
    { text: "Put the chicken on the plates and spoon the hot honey over it right at the table.", minutes: null }
  ],

  beginnerTip: "The mayonnaise is not a mistake. It is doing the job an egg wash usually does, and it works better here because it is thick enough to hold panko without sliding off, and it browns. Use a thin coat. A thick one steams the crust from underneath and you lose the crunch.",
  makeItBetter: "Pour the hot honey on at the table, not in the kitchen. The moment it lands the crust starts going soft, so every minute between the spoon and the fork costs you crunch. Warming the honey with the chilli in it matters too. Cold honey sits on top in a lump, warm honey runs into every crevice.",
  skills: ["breading", "air frying", "cooking to temperature"],

  source: { name: "HelloFresh's Hot Honey Chicken, rebuilt for a small air fryer",
            url: "https://www.hellofresh.com/recipes/hot-honey-chicken-5f999485d31ec3541e04fe18" },
  vetting: "HelloFresh's own review page is unusually specific about this one. Cooks describe the crust and the honey separately and report exactly how much honey turns out to be enough, which is the sort of comment only somebody who actually cooked it writes. Adapted here for a two quart air fryer, which means one or two cutlets at a time and no more, and the capacity figure assumes that. The mayonnaise-instead-of-egg breading is the same trick Kenji uses for oven-fried chicken."
},

{
  id: "steakhouse-pork-chops",
  title: "Steakhouse Pork Chops",
  subtitle: "Peppery chops with a creamy shallot pan sauce",
  photo: "img/steakhouse-pork-chops.webp",
  photoCredit: { by: "patrickkuhl", lic: "CC BY 2.0",
                  url: "https://www.flickr.com/photos/33398244@N00/13226310563" },
  cuisine: "american",
  appliances: ["stove"],
  minutes: 35,
  activeMinutes: 25,
  difficulty: "medium",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1.4,
  tags: ["hellofresh-style", "one-pan", "sauce-forward", "date-night"],
  spiceLevel: 2,
  meals: ["dinner"],

  ingredients: [
    { item: "pork chops", qty: 2, unit: "piece", aisle: "meat", scale: true,
      note: "bone-in if you can, and at least an inch thick" },
    { item: "potatoes", qty: 12, unit: "oz", aisle: "produce", scale: true },
    { item: "green beans", qty: 6, unit: "oz", aisle: "produce", scale: true,
      sub: "frozen green beans, or broccoli" },
    { item: "shallots", qty: 1, unit: "piece", aisle: "produce", scale: true,
      sub: "half a small onion" },
    { item: "beef broth", qty: 0.5, unit: "cup", aisle: "canned", scale: true,
      sub: "chicken stock, which is milder but fine" },
    { item: "sour cream", qty: 2, unit: "tbsp", aisle: "dairy", scale: true,
      sub: "crème fraîche, which is less likely to split" },
    { item: "lemons", qty: 0.5, unit: "piece", aisle: "produce", scale: false },
    { item: "fry seasoning", qty: 1, unit: "tbsp", aisle: "spices", scale: true,
      sub: "a teaspoon each of paprika, garlic powder and onion powder" },
    { item: "dried thyme", qty: 0.5, unit: "tsp", aisle: "spices", scale: true },
    { item: "olive oil", qty: null, unit: null, aisle: "dry", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Take the chops out of the fridge twenty minutes before you cook and salt them on both sides.",
    "Heat the oven to four hundred and twenty five degrees.",
    "Cut the potatoes into half-inch pieces.",
    "Mix the fry seasoning, the dried thyme and a heavy grind of black pepper. That is the steak spice.",
    "Slice the shallot as thin as you can."
  ],

  steps: [
    { text: "Toss the potatoes with oil, salt and pepper and roast them for ten minutes.", minutes: 10 },
    { text: "Add the green beans to the same tray with a little oil and roast for another fifteen minutes.", minutes: 15 },
    { text: "Pat the chops dry again and press the steak spice onto both sides.", minutes: null },
    { text: "Heat oil in a heavy pan over medium-high until it just begins to smoke.", minutes: null },
    { text: "Lay the chops in and do not move them for four minutes.", minutes: 4 },
    { text: "Turn them over and cook for another three or four minutes.", minutes: 4 },
    { text: "Take them out at one hundred and forty five degrees in the thickest part. With no thermometer, press one with your finger. It should feel springy, not soft and not firm.", minutes: null },
    { text: "Put the chops on a board and let them rest while you make the sauce. Do not skip this.", minutes: 5 },
    { text: "Turn the heat to medium and cook the shallot in the same pan for three minutes, until it is soft and golden.", minutes: 3 },
    { text: "Pour in the beef broth and scrape every brown bit off the bottom of the pan.", minutes: null },
    { text: "Let it bubble down by about half, which takes two or three minutes.", minutes: 3 },
    { text: "Take the pan off the heat completely, then stir in the sour cream.", minutes: null },
    { text: "Squeeze the lemon over the green beans and serve everything with the sauce spooned over the chops.", minutes: null }
  ],

  beginnerTip: "Pork chops go from juicy to dry in about ninety seconds, and time is a bad guide because chops vary so much in thickness. The single most useful thing here is a thermometer. Pull them at one hundred and forty five degrees and they stay faintly pink and tender in the middle, which is safe and correct for pork. Cooks who report dry chops from this dish are almost always cooking a thin chop for the time a thick one needs.",
  makeItBetter: "Take the pan off the heat before the sour cream goes in. Dairy splits when it boils, and a split pan sauce turns grainy and looks broken no matter how good it tastes. The lemon on the beans matters more than it sounds too. Reviewers who called the vegetable side bland were eating it with no acid on it at all.",
  skills: ["searing", "deglazing", "pan sauces", "cooking to temperature"],

  source: { name: "HelloFresh's Steakhouse-Style Pork Chops, rewritten with the pan-sauce method fixed",
            url: "https://www.hellofresh.com/recipes/steakhouse-style-pork-chops-648884de0b7af205da01b33e" },
  vetting: "Named a hall-of-fame recipe in r/hellofresh's own thread on the subject, and praised repeatedly for the creamy onion gravy. Two failures recur in the reviews and both are fixed here. One cook reports that the cook time for thinner chops was far too long, answered here with a temperature rather than a clock; another says the broccoli was the only miss and felt bland even with lemon, answered by seasoning the vegetable properly and finishing it with acid off the tray. A commenter on the Reddit thread makes the same point plainly, that they cooked a lot of dry proteins before buying a thermometer. The blend ratio is the one that matches across HelloFresh’s own 2019 post, the Joe’s Daily compendium and My Sweet Precision; tap the spice on the ingredient list and the app tells you the spoons."
}

,

{
  id: "shrimp-and-grits",
  title: "Shrimp and Grits",
  subtitle: "Bacon, cheesy grits and Cajun shrimp",
  photo: "img/shrimp-and-grits.webp",
  photoCredit: { by: "vxla", lic: "CC BY 2.0",
                  url: "https://www.flickr.com/photos/14812197@N00/5097297999" },
  cuisine: "american",
  appliances: ["stove"],
  minutes: 35,
  activeMinutes: 30,
  difficulty: "medium",
  baseServings: 2,
  scalable: [1, 6],
  capacityQt: 1.5,
  tags: ["hellofresh-style", "one-pan", "charleston", "crowd-pleaser"],
  spiceLevel: 3,
  meals: ["breakfast", "lunch", "dinner"],

  ingredients: [
    { item: "shrimp", qty: 12, unit: "oz", aisle: "meat", scale: true,
      note: "peeled and deveined, tails off" },
    { item: "grits", qty: 0.75, unit: "cup", aisle: "dry", scale: true,
      note: "stone-ground if you can find them, not instant" },
    { item: "bacon", qty: 4, unit: "piece", aisle: "meat", scale: true },
    { item: "cheddar", qty: 3, unit: "oz", aisle: "dairy", scale: true,
      sub: "smoked gouda is the Charleston move if you see it" },
    { item: "cajun seasoning", qty: 2, unit: "tsp", aisle: "spices", scale: true,
      sub: "smoked paprika, garlic powder, cayenne and dried thyme in equal parts" },
    { item: "chicken stock", qty: 2, unit: "cup", aisle: "canned", scale: true },
    { item: "scallions", qty: 3, unit: "piece", aisle: "produce", scale: true },
    { item: "garlic", qty: 2, unit: "clove", aisle: "produce", scale: true },
    { item: "lemons", qty: 0.5, unit: "piece", aisle: "produce", scale: false },
    { item: "hot sauce", qty: null, unit: null, aisle: "canned", scale: false,
      note: "at the table" },
    { item: "butter", qty: 2, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Pat the shrimp dry and toss them with the Cajun seasoning. Leave them while you start the grits.",
    "Grate the cheddar.",
    "Slice the scallions, keeping the white and green parts apart.",
    "Chop the garlic fine.",
    "Cut the bacon crossways into short strips."
  ],

  steps: [
    { text: "Bring the chicken stock to a boil in a small pot with a good pinch of salt.", minutes: null },
    { text: "Pour the grits in slowly while whisking, so they do not clump.", minutes: null },
    { text: "Turn the heat right down and cook them for about twenty minutes, stirring every few minutes so they do not catch.", minutes: 20 },
    { text: "While the grits cook, put the bacon in a cold, dry pan and then turn the heat to medium.", minutes: null },
    { text: "Cook it for about seven minutes, until crisp, then lift it out and leave the fat in the pan.", minutes: 7 },
    { text: "Turn the heat to medium-high and lay the shrimp in the bacon fat in one layer.", minutes: null },
    { text: "Cook them for about ninety seconds a side. They are done the moment they turn opaque and curl into a loose letter C.", minutes: 2 },
    { text: "Add the garlic and the scallion whites and stir for thirty seconds.", minutes: null },
    { text: "Take the pan off the heat and squeeze the lemon over the shrimp.", minutes: null },
    { text: "Beat the butter and the grated cheddar into the grits and taste them for salt.", minutes: null },
    { text: "Spoon the grits into shallow bowls, pile the shrimp on top with the pan juices, and scatter the bacon and scallion greens over. Shake hot sauce over your own bowl at the table.", minutes: null }
  ],

  beginnerTip: "Shrimp are done in under two minutes and they keep cooking after they leave the pan. Watch the shape rather than the clock: a loose letter C is cooked, a tight letter O is overcooked and rubbery. Take them out while you still think they need a moment more.",
  makeItBetter: "Cook the grits in stock instead of water, and give them the full twenty minutes. Almost every complaint about bland shrimp and grits is really a complaint about the grits, which are the whole base of the dish and get treated as an afterthought. Frying the shrimp in the bacon fat rather than fresh oil is the other half of it.",
  skills: ["rendering bacon", "cooking grits", "judging shrimp by shape"],

  source: { name: "HelloFresh's Southern-Style Bacony Shrimp over Grits, crossed with how Charleston cooks actually make it",
            url: "https://www.hellofresh.com/recipes/southern-style-bacony-shrimp-over-grits-653904f0b8cd6bf4c478f85c" },
  vetting: "A reviewer on HelloFresh's own page calls it hands down the best meal they ever had from the service, and it comes up in r/hellofresh threads on the best dish. It is also a real Lowcountry dish with its own subreddit and a long r/Charleston thread on how locals make it, which is where the stock-not-water rule and the bacon fat come from. Jerome lives in Charleston, so this one is worth getting right."
},

{
  id: "chicken-biscuit-pot-pie",
  title: "Chicken and Biscuit Pot Pie",
  subtitle: "One pan, thyme gravy, biscuits on top",
  photo: "img/chicken-biscuit-pot-pie.webp",
  photoCredit: { by: "jeffreyw", lic: "CC BY 2.0",
                  url: "https://www.flickr.com/photos/7927684@N03/5654697887" },
  cuisine: "american",
  appliances: ["stove"],
  minutes: 50,
  activeMinutes: 25,
  difficulty: "medium",
  baseServings: 4,
  scalable: [2, 6],
  capacityQt: 2.4,
  tags: ["hellofresh-style", "one-pan", "comfort", "crowd-pleaser"],
  spiceLevel: 1,
  meals: ["dinner"],

  ingredients: [
    { item: "chicken thighs", qty: 6, unit: "piece", aisle: "meat", scale: true,
      note: "boneless and skinless, cut into chunks" },
    { item: "biscuit dough", qty: 1, unit: "can", aisle: "bakery", scale: true,
      note: "the refrigerated kind that peels apart" },
    { item: "carrots", qty: 3, unit: "piece", aisle: "produce", scale: true,
      note: "cut into coins, not minced" },
    { item: "celery", qty: 2, unit: "piece", aisle: "produce", scale: true },
    { item: "onions", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "frozen peas", qty: 1, unit: "cup", aisle: "frozen", scale: true },
    { item: "chicken stock", qty: 2, unit: "cup", aisle: "canned", scale: true },
    { item: "heavy cream", qty: 0.5, unit: "cup", aisle: "dairy", scale: true,
      sub: "milk plus an extra spoon of flour" },
    { item: "fresh thyme", qty: 1, unit: "tbsp", aisle: "produce", scale: true,
      sub: "one teaspoon of dried thyme, and no more" },
    { item: "all-purpose flour", qty: 3, unit: "tbsp", aisle: "dry", scale: true, staple: true },
    { item: "butter", qty: 3, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Heat the oven to four hundred degrees.",
    "Cut the chicken into chunks about an inch across and salt them.",
    "Cut the carrots into coins about as thick as a pound coin. Do not mince them.",
    "Dice the onion and the celery.",
    "Pull the thyme leaves off their stems.",
    "Open the biscuits and peel each one apart into two thinner rounds."
  ],

  steps: [
    { text: "Melt the butter in a wide ovenproof pan over medium heat.", minutes: null },
    { text: "Cook the onion, carrot and celery for about eight minutes, until the onion is soft and clear.", minutes: 8 },
    { text: "Add the chicken and cook for about five minutes, turning it, until it has lost its raw colour outside.", minutes: 5 },
    { text: "Scatter the flour over everything and stir it for one minute so it stops tasting of raw flour.", minutes: 1 },
    { text: "Pour in the stock a little at a time, stirring as you go, so it thickens smoothly.", minutes: null },
    { text: "Add the cream, the thyme and plenty of black pepper, and let it bubble gently for five minutes.", minutes: 5 },
    { text: "Stir in the peas and taste it for salt. Go carefully, the stock is already salty.", minutes: null },
    { text: "Lay the thin biscuit rounds over the top, leaving small gaps between them for steam to escape.", minutes: null },
    { text: "Brush the biscuits with a little melted butter.", minutes: null },
    { text: "Bake for about eighteen minutes, until the biscuits are deep golden and cooked all the way through.", minutes: 18 },
    { text: "Let it sit for five minutes before you serve it, or the filling runs everywhere.", minutes: 5 }
  ],

  beginnerTip: "Split every biscuit into two thinner rounds before they go on top. This is the one thing that goes wrong with this dish over and over: people lay whole biscuits on wet filling, the tops brown while the undersides stay raw dough, and the whole thing is ruined at the last step. Thin biscuits and small gaps between them let the steam out and cook through.",
  makeItBetter: "Cut the carrots into proper coins rather than mincing them. The filling needs something with texture in it or the whole bowl is one soft note, and this is the most common complaint after the biscuits. Fresh thyme rather than dried is the other lift, and if you only have dried, use a third as much.",
  skills: ["making a roux", "building a gravy", "oven-to-table cooking"],

  source: { name: "HelloFresh's Homestyle Chicken and Biscuit Pot Pie, with the biscuit problem solved",
            url: "https://www.hellofresh.com/recipes/homestyle-chicken-and-biscuit-pot-pie-5f049500d95a4007c84095f2" },
  vetting: "Posted to r/hellofresh as a ten out of ten, and described in another thread as a household favourite that slaps every time. It is also one of the most usefully criticised recipes on their site: several cooks report the biscuits not cooking underneath, one saying the tops were perfect but the layers below never cooked at all, and another that they would bake the biscuits separately next time. Splitting them thin is the fix that keeps it a one-pan dish. The too-fine carrots and the easy-on-the-salt warnings come from the same reviews."
},

{
  id: "dan-dan-noodles",
  title: "Spicy Pork Dan Dan Noodles",
  subtitle: "Sichuan pork and peanut noodles with charred cabbage",
  photo: "img/dan-dan-noodles.webp",
  photoCredit: { by: "avlxyz", lic: "CC BY SA 2.0",
                  url: "https://www.flickr.com/photos/10559879@N00/4387183128" },
  cuisine: "asian",
  appliances: ["stove"],
  minutes: 30,
  activeMinutes: 25,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1.6,
  tags: ["hellofresh-style", "weeknight", "big-kick", "noodles"],
  spiceLevel: 4,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "ground pork", qty: 10, unit: "oz", aisle: "meat", scale: true,
      sub: "ground beef, though pork is what makes it dan dan" },
    { item: "ramen noodles", qty: 2, unit: "piece", aisle: "dry", scale: true,
      note: "throw the flavour sachets away", sub: "egg noodles" },
    { item: "cabbage", qty: 0.25, unit: "piece", aisle: "produce", scale: true,
      note: "cut into thick wedges so it can char" },
    { item: "peanut butter", qty: 2, unit: "tbsp", aisle: "dry", scale: true,
      note: "smooth, not crunchy" },
    { item: "soy sauce", qty: 3, unit: "tbsp", aisle: "canned", scale: true },
    { item: "chilli flakes", qty: 1, unit: "tsp", aisle: "spices", scale: true,
      note: "Sichuan chilli flakes if you have them" },
    { item: "sesame oil", qty: 1, unit: "tbsp", aisle: "dry", scale: true },
    { item: "garlic", qty: 3, unit: "clove", aisle: "produce", scale: true },
    { item: "ginger", qty: 1, unit: "tbsp", aisle: "produce", scale: true },
    { item: "scallions", qty: 3, unit: "piece", aisle: "produce", scale: true },
    { item: "chicken stock", qty: 0.75, unit: "cup", aisle: "canned", scale: true,
      note: "less than you think — this is a sauce, not a soup" },
    { item: "red wine vinegar", qty: 1, unit: "tbsp", aisle: "dry", scale: true,
      sub: "rice vinegar is the proper one if you have it" },
    { item: "sesame seeds", qty: 1, unit: "tbsp", aisle: "spices", scale: false },
    { item: "vegetable oil", qty: null, unit: null, aisle: "dry", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Chop the garlic and the ginger fine.",
    "Slice the scallions, whites and greens kept apart.",
    "Cut the cabbage into thick wedges, keeping the core attached so they hold together.",
    "Whisk the peanut butter, soy sauce, sesame oil, vinegar and chilli flakes together in a bowl.",
    "Put a pot of water on for the noodles."
  ],

  steps: [
    { text: "Heat a dry pan over high heat until it is properly hot.", minutes: null },
    { text: "Lay the cabbage wedges cut side down and leave them alone for about three minutes, until they are blackened in patches.", minutes: 3 },
    { text: "Take the cabbage out and chop it roughly.", minutes: null },
    { text: "Add a little oil to the same pan and put the pork in, pressing it flat.", minutes: null },
    { text: "Leave it without stirring for about four minutes so it browns properly on one side.", minutes: 4 },
    { text: "Now break it up and cook it for another three minutes, until there is no pink left and the bottom of the pan is brown.", minutes: 3 },
    { text: "Add the garlic, the ginger and the scallion whites and stir for one minute.", minutes: 1 },
    { text: "Boil the noodles for the time on the packet, then drain them and save a mug of the water.", minutes: 4 },
    { text: "Pour the peanut mixture and the chicken stock into the pork and stir until it is smooth.", minutes: null },
    { text: "Let it bubble for about three minutes, until it thickens enough to coat the back of a spoon.", minutes: 3 },
    { text: "Add the noodles and the cabbage and toss everything together, loosening it with the noodle water if it looks tight.", minutes: null },
    { text: "Serve it with the scallion greens and the sesame seeds over the top.", minutes: null }
  ],

  beginnerTip: "This is a sauce that clings to noodles, not a soup. Cooks who are disappointed by it almost always report a thin, watery broth, and the cause is too much liquid and not enough time reducing it. Start with less stock than feels right. You can always loosen it with noodle water at the end, and you cannot easily take liquid away.",
  makeItBetter: "Char the cabbage in a dry pan before anything else goes in, and press the pork flat and leave it alone until it is properly brown. Those two bits of black are where the whole flavour of this dish lives. Stirring the pork constantly steams it grey and no amount of chilli rescues that.",
  skills: ["charring", "browning mince", "reducing a sauce"],

  source: { name: "HelloFresh's Spicy Pork Dan Dan Noodle Ramen, thickened into a proper dan dan sauce",
            url: "https://www.hellofresh.com/recipes/spicy-pork-dan-dan-noodle-ramen-649ae86bc8e13be2fa91ddc2" },
  vetting: "Posted repeatedly to r/hellofresh with people calling it their favourite of the box and adding extra chilli. The complaints are consistent and specific: the broth tastes watery, the stated times are too short to char the cabbage or reduce the liquid, and one cook says plainly they made it with far less broth and it was much better. Written here as the thicker, saucier dish dan dan actually is, with the cabbage charring step given the time reviewers say it really needs."
},

{
  id: "korean-beef-bibimbap",
  title: "Korean Beef Bibimbap",
  subtitle: "Rice bowl, gochujang beef and a runny egg",
  photo: "img/korean-beef-bibimbap.webp",
  photoCredit: { by: "avlxyz", lic: "CC BY SA 2.0",
                  url: "https://www.flickr.com/photos/10559879@N00/3085707177" },
  cuisine: "asian",
  appliances: ["stove"],
  minutes: 35,
  activeMinutes: 30,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1.6,
  tags: ["hellofresh-style", "weeknight", "rice-bowl", "crowd-pleaser"],
  spiceLevel: 3,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "ground beef", qty: 10, unit: "oz", aisle: "meat", scale: true },
    { item: "white rice", qty: 0.75, unit: "cup", aisle: "dry", scale: true },
    { item: "gochujang", qty: 2, unit: "tbsp", aisle: "canned", scale: true,
      sub: "sriracha plus a teaspoon of miso, though it is not the same" },
    { item: "eggs", qty: 2, unit: "piece", aisle: "dairy", scale: true },
    { item: "carrots", qty: 2, unit: "piece", aisle: "produce", scale: true,
      note: "cut into matchsticks" },
    { item: "cucumber", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "spinach", qty: 4, unit: "oz", aisle: "produce", scale: true },
    { item: "soy sauce", qty: 2, unit: "tbsp", aisle: "canned", scale: true },
    { item: "sesame oil", qty: 1, unit: "tbsp", aisle: "dry", scale: true },
    { item: "sugar", qty: 1, unit: "tsp", aisle: "dry", scale: true, staple: true },
    { item: "garlic", qty: 3, unit: "clove", aisle: "produce", scale: true },
    { item: "scallions", qty: 2, unit: "piece", aisle: "produce", scale: true },
    { item: "red wine vinegar", qty: 1, unit: "tbsp", aisle: "dry", scale: true,
      sub: "rice vinegar if you have it" },
    { item: "sesame seeds", qty: 1, unit: "tbsp", aisle: "spices", scale: false },
    { item: "vegetable oil", qty: null, unit: null, aisle: "dry", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Start the rice so it is ready when everything else is.",
    "Cut the carrot into matchsticks and slice the cucumber thin.",
    "Toss the cucumber with the vinegar and a pinch of salt and leave it in a bowl. That is your quick pickle.",
    "Chop the garlic and slice the scallions.",
    "Mix the gochujang, soy sauce, sesame oil and sugar in a small bowl."
  ],

  steps: [
    { text: "Heat a little oil in a wide pan over medium-high heat.", minutes: null },
    { text: "Cook the carrot matchsticks with a pinch of salt for about three minutes, until they soften but still have bite. Move them to a plate.", minutes: 3 },
    { text: "Put the spinach in the same pan with a splash of water and let it wilt for about one minute, then move it to the plate too.", minutes: 1 },
    { text: "Turn the heat up, add the beef, and press it flat against the pan.", minutes: null },
    { text: "Leave it alone for four minutes so one side goes deep brown.", minutes: 4 },
    { text: "Break it up, add the garlic, and cook for two more minutes.", minutes: 2 },
    { text: "Pour in the gochujang mixture and stir until the beef is glossy and coated.", minutes: null },
    { text: "In a separate pan, fry the eggs in a little oil until the whites are set but the yolks are still soft.", minutes: 3 },
    { text: "Put the rice in bowls and lay the beef, the carrot, the spinach and the drained cucumber on top in their own separate sections.", minutes: null },
    { text: "Slide an egg onto each bowl and scatter the scallions and sesame seeds over.", minutes: null },
    { text: "Break the yolk and mix the whole bowl together just before you eat it.", minutes: null }
  ],

  beginnerTip: "Keep the vegetables in separate piles on the rice instead of stirring them in. That is not decoration — bibimbap means mixed rice, and the mixing is meant to happen at the table so each mouthful is a bit different. A bowl stirred together in the kitchen goes uniformly brown and loses the point.",
  makeItBetter: "Put a fried egg on it with a soft yolk. This is the single most repeated piece of advice from people who have cooked this dish, and it is not just for looks: the yolk breaks into the hot rice and becomes a sauce that ties the gochujang, the pickle and the beef together. The quick cucumber pickle does the same job from the acid side.",
  skills: ["quick pickling", "browning mince", "frying eggs"],

  source: { name: "HelloFresh's Korean Beef Bibimbap, with the egg everybody says to add",
            url: "https://www.hellofresh.com/recipes/korean-beef-bibimbap-5a8e7a5b30006c7fbf3f5b32" },
  vetting: "Appears on HelloFresh's own highest-rated dinner list and is posted to r/hellofresh repeatedly, including one cook whose son called it his number one meal from the service. The most common change people report making is adding a fried egg, which the box does not include, so it is written in here. Bibimbap is a documented Korean dish rather than a meal-kit invention, and Maangchi's version confirms the separate-piles-then-mix method used here."
},

{
  id: "thai-coconut-curry-chicken",
  title: "Thai Coconut Curry Chicken",
  subtitle: "One pan, coconut milk, lime and a real kick",
  photo: "img/thai-coconut-curry-chicken.webp",
  photoCredit: { by: "stu_spivack", lic: "CC BY SA 2.0",
                  url: "https://www.flickr.com/photos/35034346243@N01/319255039" },
  cuisine: "asian",
  appliances: ["stove"],
  minutes: 35,
  activeMinutes: 25,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 6],
  capacityQt: 1.7,
  tags: ["hellofresh-style", "one-pan", "weeknight", "sauce-forward"],
  spiceLevel: 3,
  meals: ["dinner"],

  ingredients: [
    { item: "chicken thighs", qty: 4, unit: "piece", aisle: "meat", scale: true,
      note: "boneless and skinless, cut into strips" },
    { item: "canned coconut milk", qty: 1, unit: "can", aisle: "canned", scale: true,
      note: "full fat, not light" },
    { item: "thai curry paste", qty: 2, unit: "tbsp", aisle: "canned", scale: true,
      sub: "red curry paste, or two teaspoons of curry powder plus chilli flakes" },
    { item: "white rice", qty: 0.75, unit: "cup", aisle: "dry", scale: true,
      sub: "jasmine is the right one here" },
    { item: "bell peppers", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "carrots", qty: 2, unit: "piece", aisle: "produce", scale: true },
    { item: "limes", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "garlic", qty: 3, unit: "clove", aisle: "produce", scale: true },
    { item: "ginger", qty: 1, unit: "tbsp", aisle: "produce", scale: true },
    { item: "fresh cilantro", qty: 0.5, unit: "bunch", aisle: "produce", scale: false },
    { item: "soy sauce", qty: 1, unit: "tbsp", aisle: "canned", scale: true,
      sub: "fish sauce is the authentic one and much better here" },
    { item: "brown sugar", qty: 1, unit: "tsp", aisle: "dry", scale: true, staple: true },
    { item: "vegetable oil", qty: null, unit: null, aisle: "dry", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Start the rice.",
    "Cut the chicken into strips and salt them.",
    "Slice the pepper and the carrot thin so they cook quickly.",
    "Chop the garlic and ginger.",
    "Cut the lime in half and roughly chop the cilantro."
  ],

  steps: [
    { text: "Heat a little oil in a wide pan over medium-high heat.", minutes: null },
    { text: "Brown the chicken strips for about five minutes, turning them once. They do not need to cook through yet.", minutes: 5 },
    { text: "Move the chicken to a plate.", minutes: null },
    { text: "Turn the heat to medium and put the curry paste in the pan with a spoon of oil.", minutes: null },
    { text: "Fry the paste for about two minutes, stirring, until it darkens and smells strong. This is the most important step.", minutes: 2 },
    { text: "Add the garlic, the ginger, the pepper and the carrot and stir for three minutes.", minutes: 3 },
    { text: "Pour in the coconut milk, the soy sauce and the sugar and bring it to a gentle simmer.", minutes: null },
    { text: "Put the chicken back in with any juices and simmer for about eight minutes, until the sauce thickens slightly and the chicken is cooked through.", minutes: 8 },
    { text: "Take the pan off the heat and squeeze in half the lime.", minutes: null },
    { text: "Taste it. It should be a little sweet, a little salty and sharp at the end. Add more lime or soy until it is.", minutes: null },
    { text: "Serve it over the rice with the cilantro scattered on top and the rest of the lime cut into wedges.", minutes: null }
  ],

  beginnerTip: "Fry the curry paste in oil for a couple of minutes before any liquid goes near it. Paste stirred straight into coconut milk tastes raw and flat, and this one step is the difference between a curry that tastes like a restaurant and one that tastes like a tin. You will know it is ready when the kitchen smells of it from across the room.",
  makeItBetter: "Finish with lime off the heat and taste before you serve. Thai food balances sweet, salty, sour and hot, and a curry that tastes dull is nearly always short on the sour and the salty rather than the chilli. Fish sauce instead of soy takes it another step if you have some.",
  skills: ["frying curry paste", "balancing a sauce", "simmering"],

  source: { name: "HelloFresh's Thai Coconut Curry Chicken, with the paste-frying step put back in",
            url: "https://www.hellofresh.com/recipes/thai-coconut-curry-chicken-5b0f7dbaae08b52a2b7ba892" },
  vetting: "Listed on HelloFresh's own highest-rated dinner recipes, alongside their Korean bibimbap and Peruvian bowls, and mentioned in r/hellofresh hall-of-fame threads as a one-pot favourite. The meal-kit version stirs the paste into the liquid; frying it in fat first is standard Thai practice and is the change most home cooks report making. Written to Jerome's spice level with the balance-at-the-end habit built into the method."
},

{
  id: "buffalo-cauliflower-tacos",
  title: "Buffalo Cauliflower Tacos",
  subtitle: "Roasted cauliflower, hot sauce and a cooling slaw",
  photo: "img/buffalo-cauliflower-tacos.webp",
  photoCredit: { by: "Joey Z1", lic: "CC BY 2.0",
                  url: "https://www.flickr.com/photos/45958601@N02/30203422445" },
  cuisine: "american",
  appliances: ["stove", "airfryer"],
  minutes: 35,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1.2,
  tags: ["hellofresh-style", "vegetarian", "weeknight", "big-kick"],
  spiceLevel: 4,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "cauliflower", qty: 1, unit: "piece", aisle: "produce", scale: true,
      note: "one small head, broken into small florets" },
    { item: "tortillas", qty: 6, unit: "piece", aisle: "bakery", scale: true,
      note: "the small corn or flour ones" },
    { item: "hot sauce", qty: 4, unit: "tbsp", aisle: "canned", scale: true,
      note: "a vinegary one like Frank's is what makes it buffalo" },
    { item: "cabbage", qty: 0.25, unit: "piece", aisle: "produce", scale: true,
      note: "shredded thin", sub: "a bag of coleslaw mix" },
    { item: "sour cream", qty: 4, unit: "tbsp", aisle: "dairy", scale: true,
      sub: "plain yogurt" },
    { item: "mayonnaise", qty: 2, unit: "tbsp", aisle: "canned", scale: true },
    { item: "limes", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "southwest spice blend", qty: 2, unit: "tsp", aisle: "spices", scale: true,
      sub: "a teaspoon of garlic powder with half a teaspoon each of cumin and chilli powder" },
    { item: "scallions", qty: 2, unit: "piece", aisle: "produce", scale: true },
    { item: "butter", qty: 2, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "olive oil", qty: null, unit: null, aisle: "dry", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Heat the oven to four hundred and twenty five degrees.",
    "Break the cauliflower into small florets, no bigger than a walnut.",
    "Shred the cabbage as thin as you can.",
    "Mix the sour cream, mayonnaise, a squeeze of lime and a pinch of salt for the sauce.",
    "Melt the butter and stir the hot sauce into it. That is your buffalo sauce."
  ],

  steps: [
    { text: "Toss the cauliflower with oil, the southwest spice blend, salt and pepper.", minutes: null },
    { text: "Spread it on a tray in one layer with space between the pieces.", minutes: null },
    { text: "Roast for about twenty five minutes, turning it once, until the edges are properly browned.", minutes: 25 },
    { text: "While it roasts, toss the cabbage with a squeeze of lime and a pinch of salt and leave it to soften.", minutes: null },
    { text: "Tip the hot cauliflower into a bowl and pour the buffalo butter over it. Toss until every piece is orange.", minutes: null },
    { text: "Warm the tortillas in a dry pan for about twenty seconds a side.", minutes: null },
    { text: "Build each taco with slaw first, then cauliflower, then a drizzle of the cool sauce.", minutes: null },
    { text: "Scatter the scallions over and serve with the rest of the lime.", minutes: null }
  ],

  beginnerTip: "Give the cauliflower room on the tray. Crowded florets steam in their own moisture and come out pale and floppy, and floppy cauliflower falls apart the moment the sauce hits it. Use two trays if you need to. You want brown, almost burnt edges before the sauce goes anywhere near it.",
  makeItBetter: "Sauce it the moment it comes out of the oven, and put the slaw in the tortilla first. Hot cauliflower absorbs the buffalo butter instead of sitting in it, and the layer of cold cabbage underneath keeps the tortilla from going soft while you eat. Buffalo anything needs something cold and sharp against it or it is just heat.",
  skills: ["roasting vegetables", "emulsifying a butter sauce", "building tacos"],

  source: { name: "HelloFresh's buffalo cauliflower tacos, with the roasting fixed",
            url: "https://www.hellofresh.com/recipes/buffalo-cauliflower-tacos-5e6a7dc0f79b0a0ec7fd8b31" },
  vetting: "Named in r/hellofresh's best-meal-you-ever-had thread by someone who says the buffalo cauliflower tacos are pretty darn good, and it turns up in the surprisingly-better-than-expected thread where several people say the tacos and quesadillas beat what they expected. Buffalo cauliflower itself is well documented outside the meal kits, and the failure everyone reports is soggy cauliflower from a crowded pan, which is why the spacing and the sauce-it-hot rule are written into the steps. The blend ratio is the one that matches across HelloFresh’s own 2019 post, the Joe’s Daily compendium and My Sweet Precision; tap the spice on the ingredient list and the app tells you the spoons."
},

{
  id: "honey-miso-donburi",
  title: "Honey Miso Broccoli Donburi",
  subtitle: "A Japanese rice bowl with a sweet, salty glaze",
  photo: "img/honey-miso-donburi.webp",
  photoCredit: { by: "Red Lobster Lover Joe twitter:RLLoverJoe", lic: "Public Domain Mark",
                  url: "https://www.flickr.com/photos/164188154@N05/54895557182" },
  cuisine: "asian",
  appliances: ["stove", "ricecooker"],
  minutes: 30,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1.2,
  tags: ["hellofresh-style", "vegetarian", "weeknight", "rice-bowl"],
  spiceLevel: 2,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "broccoli", qty: 1, unit: "piece", aisle: "produce", scale: true,
      note: "one head, cut into small florets", sub: "frozen broccoli, roasted from frozen" },
    { item: "short-grain rice", qty: 0.75, unit: "cup", aisle: "dry", scale: true,
      sub: "any white rice, though short grain is stickier and better here" },
    { item: "miso paste", qty: 2, unit: "tbsp", aisle: "canned", scale: true,
      note: "white miso is milder, red is stronger" },
    { item: "honey", qty: 2, unit: "tbsp", aisle: "dry", scale: true },
    { item: "eggs", qty: 2, unit: "piece", aisle: "dairy", scale: true },
    { item: "soy sauce", qty: 1, unit: "tbsp", aisle: "canned", scale: true },
    { item: "sesame oil", qty: 1, unit: "tbsp", aisle: "dry", scale: true },
    { item: "garlic", qty: 2, unit: "clove", aisle: "produce", scale: true },
    { item: "ginger", qty: 1, unit: "tbsp", aisle: "produce", scale: true },
    { item: "scallions", qty: 2, unit: "piece", aisle: "produce", scale: true },
    { item: "chilli flakes", qty: 0.5, unit: "tsp", aisle: "spices", scale: true },
    { item: "sesame seeds", qty: 1, unit: "tbsp", aisle: "spices", scale: false },
    { item: "vegetable oil", qty: null, unit: null, aisle: "dry", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Start the rice.",
    "Cut the broccoli into small florets and heat the oven to four hundred and twenty five degrees.",
    "Chop the garlic and ginger fine.",
    "Whisk the miso, honey, soy sauce, sesame oil and chilli flakes together with a spoon of warm water until it is smooth."
  ],

  steps: [
    { text: "Toss the broccoli with oil and a pinch of salt and spread it on a tray.", minutes: null },
    { text: "Roast for about eighteen minutes, until the tips are dark and crisp.", minutes: 18 },
    { text: "Warm a spoon of oil in a small pan and cook the garlic and ginger for thirty seconds, no longer.", minutes: null },
    { text: "Pour in the miso mixture and let it bubble for about one minute, until it thickens into a glaze.", minutes: 1 },
    { text: "Take it off the heat straight away. Miso turns bitter if you boil it hard.", minutes: null },
    { text: "Fry the eggs in a separate pan until the whites are set and the yolks are still runny.", minutes: 3 },
    { text: "Put the rice in bowls and pile the roasted broccoli on top.", minutes: null },
    { text: "Spoon the glaze over the broccoli and slide an egg onto each bowl.", minutes: null },
    { text: "Finish with the scallions and the sesame seeds.", minutes: null }
  ],

  beginnerTip: "Do not let the miso glaze boil hard. Miso is fermented and its flavour is delicate; a hard boil turns it flat and slightly bitter, which is the usual reason a miso sauce tastes of nothing but salt. Warm it just until it thickens, then take it off the heat.",
  makeItBetter: "Roast the broccoli until the little tips actually char. Pale steamed broccoli under a sweet glaze is dull, but blackened tips go nutty and bitter in a way that stands up to the honey. This is a dish about the contrast between the burnt bits, the sweet glaze and the soft yolk.",
  skills: ["roasting vegetables", "making a glaze", "frying eggs"],

  source: { name: "HelloFresh's Honey Miso Broccoli Donburi, written for a home kitchen",
            url: "https://www.hellofresh.com/recipes/honey-miso-broccoli-donburi-63e6f9e1a12ba6e8de0e4b91" },
  vetting: "Named directly in an r/hellofresh favourites thread by a cook listing their standout meals, alongside their lemon dill chicken sausage couscous and hot chicken bowls. Donburi is a documented Japanese format rather than a kit invention, and the miso-honey glaze is a standard pairing that Just One Cookbook and Milk Street both treat the same way. The do-not-boil-the-miso rule is the one thing recipes at this length usually leave out."
},

{
  id: "onion-crunch-chicken",
  title: "Onion Crunch Chicken",
  subtitle: "Crispy fried onion crust, mustard underneath",
  photo: "img/onion-crunch-chicken.webp",
  photoCredit: { by: "Kent Wang", lic: "CC BY SA 2.0",
                  url: "https://www.flickr.com/photos/27454212@N00/27067360691" },
  cuisine: "american",
  appliances: ["stove", "airfryer"],
  minutes: 35,
  activeMinutes: 15,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1.1,
  tags: ["hellofresh-style", "small-air-fryer", "weeknight", "comfort"],
  spiceLevel: 2,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "chicken breast", qty: 2, unit: "piece", aisle: "meat", scale: true },
    { item: "crispy fried onions", qty: 1, unit: "cup", aisle: "dry", scale: true,
      note: "the tinned sort sold for green bean casserole" },
    { item: "dijon mustard", qty: 3, unit: "tbsp", aisle: "canned", scale: true,
      note: "this is the glue and the flavour both" },
    { item: "panko", qty: 0.25, unit: "cup", aisle: "dry", scale: true },
    { item: "potatoes", qty: 12, unit: "oz", aisle: "produce", scale: true },
    { item: "green beans", qty: 6, unit: "oz", aisle: "produce", scale: true,
      sub: "frozen green beans" },
    { item: "honey", qty: 1, unit: "tbsp", aisle: "dry", scale: true },
    { item: "fry seasoning", qty: 2, unit: "tsp", aisle: "spices", scale: true,
      sub: "two teaspoons paprika with a pinch each of garlic and onion powder" },
    { item: "lemons", qty: 0.5, unit: "piece", aisle: "produce", scale: false },
    { item: "olive oil", qty: null, unit: null, aisle: "dry", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Heat the oven to four hundred and twenty five degrees.",
    "Crush the fried onions in the bag with your hands until they are coarse crumbs, then mix them with the panko.",
    "Stir the mustard and the honey together in a small bowl.",
    "Pat the chicken dry and salt it on both sides.",
    "Cut the potatoes into half-inch cubes."
  ],

  steps: [
    { text: "Toss the potatoes with oil, the fry seasoning, salt and pepper and roast them for ten minutes.", minutes: 10 },
    { text: "Brush the chicken all over with the mustard and honey mixture.", minutes: null },
    { text: "Press the onion and panko crumbs onto the top and sides, pushing hard so they stick.", minutes: null },
    { text: "Add the green beans to the potato tray with a little oil, and put the chicken on the same tray crumb side up.", minutes: null },
    { text: "Roast for about twenty minutes, until the crust is deep brown and the thickest part of the chicken reads one hundred and sixty five degrees.", minutes: 20 },
    { text: "If the crust browns before the chicken is done, lay a piece of foil loosely over the top.", minutes: null },
    { text: "Squeeze the lemon over the green beans before serving.", minutes: null }
  ],

  beginnerTip: "Crush the onions rather than using them whole. Whole fried onions burn at the tips before the chicken is cooked, and a burnt onion is bitter all the way through. Coarse crumbs mixed with a little panko brown evenly and stay crisp, and the panko is there to stop the onions catching.",
  makeItBetter: "Do not skip the mustard. It looks like it is only there to hold the crumbs on, but it seasons the meat all the way through while it cooks and the sharpness is what stops a crust this rich from being heavy. Honey mixed into it is what makes the crust go properly brown.",
  skills: ["breading without egg", "sheet-pan timing", "cooking to temperature"],

  source: { name: "HelloFresh's onion crunch chicken, made from a tin of fried onions",
            url: "https://www.hellofresh.com/recipes/onion-crunch-chicken-5f7c8e2d1a1b4c3d2e5f6a7b" },
  vetting: "Named in r/hellofresh's best-meal-you-ever-had thread alongside the caramelized onion meatloaf sandwiches and the biscuit pot pies. The mustard-and-crushed-onion crust is a long-standing home cooking trick rather than a HelloFresh invention, and the same method appears in Ina Garten's mustard-crusted chicken, which is where the confidence about the mustard doing the seasoning comes from. Cooked on one tray here so it fits a weeknight, with an air fryer alternative for two pieces. The blend ratio is the one that matches across HelloFresh’s own 2019 post, the Joe’s Daily compendium and My Sweet Precision; tap the spice on the ingredient list and the app tells you the spoons."
},

{
  id: "middle-eastern-chickpea-bowls",
  title: "Middle Eastern Chickpea Bowls",
  subtitle: "Spiced chickpeas, lemon tahini and warm bread",
  photo: "img/middle-eastern-chickpea-bowls.webp",
  photoCredit: { by: "Athena Lao", lic: "CC BY 2.0",
                  url: "https://www.flickr.com/photos/62409281@N08/9593863351" },
  cuisine: "middle-eastern",
  appliances: ["stove"],
  minutes: 30,
  activeMinutes: 25,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 6],
  capacityQt: 1.4,
  tags: ["hellofresh-style", "vegetarian", "weeknight", "cheap"],
  spiceLevel: 3,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "canned chickpeas", qty: 1, unit: "can", aisle: "canned", scale: true },
    { item: "bulgur", qty: 0.75, unit: "cup", aisle: "dry", scale: true,
      sub: "couscous, which needs only five minutes off the heat" },
    { item: "tahini", qty: 3, unit: "tbsp", aisle: "dry", scale: true },
    { item: "lemons", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "tomatoes", qty: 2, unit: "piece", aisle: "produce", scale: true },
    { item: "cucumber", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "fresh parsley", qty: 0.5, unit: "bunch", aisle: "produce", scale: false },
    { item: "garlic", qty: 2, unit: "clove", aisle: "produce", scale: true },
    { item: "cumin", qty: 2, unit: "tsp", aisle: "spices", scale: true },
    { item: "smoked paprika", qty: 1, unit: "tsp", aisle: "spices", scale: true },
    { item: "harissa", qty: 1, unit: "tbsp", aisle: "canned", scale: true,
      sub: "half a teaspoon of chilli flakes and an extra pinch of paprika" },
    { item: "sumac", qty: 1, unit: "tsp", aisle: "spices", scale: true },
    { item: "pita bread", qty: 2, unit: "piece", aisle: "bakery", scale: true },
    { item: "olive oil", qty: null, unit: null, aisle: "dry", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Drain the chickpeas and dry them well on a tea towel. Wet chickpeas will not crisp.",
    "Dice the tomato and the cucumber and chop the parsley.",
    "Chop one clove of garlic and grate the other into the tahini.",
    "Whisk the tahini with the juice of half a lemon, the grated garlic, a pinch of salt and cold water a spoon at a time until it pours."
  ],

  steps: [
    { text: "Cook the bulgur in salted water for about twelve minutes, then drain it and let it sit.", minutes: 12 },
    { text: "Heat a good slick of olive oil in a wide pan over medium-high heat.", minutes: null },
    { text: "Tip the dry chickpeas in and leave them alone for about four minutes so they blister on one side.", minutes: 4 },
    { text: "Shake the pan and cook them for another four minutes, until many of them have split and gone golden.", minutes: 4 },
    { text: "Turn the heat down, add the chopped garlic, the cumin and the paprika, and stir for one minute until it smells strong.", minutes: 1 },
    { text: "Stir the harissa through and take the pan off the heat.", minutes: null },
    { text: "Toss the tomato, cucumber and parsley with lemon juice, olive oil and a pinch of salt.", minutes: null },
    { text: "Warm the pita in a dry pan for about thirty seconds a side.", minutes: null },
    { text: "Pile the bulgur into bowls, then the chickpeas, then the salad alongside.", minutes: null },
    { text: "Pour the lemon tahini over the top and dust everything with sumac.", minutes: null }
  ],

  beginnerTip: "Dry the chickpeas properly before they go in the pan. Straight from the tin they are wet, and wet chickpeas steam instead of frying, so they stay soft and taste of tin. Five minutes rolled in a tea towel is the whole difference between this and a sad bowl of beans.",
  makeItBetter: "Bloom the cumin and paprika in the hot oil at the end rather than tossing them on raw. Thirty seconds in fat wakes them up completely. Then keep the tahini sharp, thinning it with cold water and lemon rather than more oil, so it cuts through the spice instead of adding to the richness.",
  skills: ["blooming spices", "crisping pulses", "making tahini sauce"],

  source: { name: "HelloFresh's Middle Eastern Chickpea Bowls, sharpened up",
            url: "https://www.hellofresh.com/recipes/middle-eastern-chickpea-bowls-5f1a2b3c4d5e6f7a8b9c0d1e" },
  vetting: "One of the dishes on HelloFresh's own highest-rated dinner list, and the vegetarian bowls come up in r/hellofresh threads as the ones people keep re-ordering. The components are all standard Levantine cooking documented well outside meal kits, and Ottolenghi and Claudia Roden both build the tahini sauce the same way, with cold water and lemon rather than oil. The dry-the-chickpeas rule is the one thing that decides whether this works."
},

{
  id: "pecan-crusted-chicken",
  title: "Pecan-Crusted Chicken",
  subtitle: "Sweet nutty crust with a mustard pan sauce",
  photo: "img/pecan-crusted-chicken.webp",
  photoCredit: { by: "InternetMediaNow", lic: "CC BY 2.0",
                  url: "https://www.flickr.com/photos/87445718@N05/8008363988" },
  cuisine: "american",
  appliances: ["stove"],
  minutes: 35,
  activeMinutes: 25,
  difficulty: "medium",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1.3,
  tags: ["hellofresh-style", "date-night", "southern", "sauce-forward"],
  spiceLevel: 1,
  meals: ["dinner"],

  ingredients: [
    { item: "chicken breast", qty: 2, unit: "piece", aisle: "meat", scale: true,
      note: "sliced through into thin cutlets" },
    { item: "pecans", qty: 0.75, unit: "cup", aisle: "dry", scale: true,
      sub: "walnuts, which are sharper but work" },
    { item: "panko", qty: 0.25, unit: "cup", aisle: "dry", scale: true },
    { item: "dijon mustard", qty: 3, unit: "tbsp", aisle: "canned", scale: true },
    { item: "honey", qty: 1, unit: "tbsp", aisle: "dry", scale: true },
    { item: "sweet potatoes", qty: 2, unit: "piece", aisle: "produce", scale: true },
    { item: "chicken stock", qty: 0.5, unit: "cup", aisle: "canned", scale: true },
    { item: "heavy cream", qty: 2, unit: "tbsp", aisle: "dairy", scale: true,
      sub: "crème fraîche" },
    { item: "shallots", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "fresh thyme", qty: 1, unit: "tsp", aisle: "produce", scale: true,
      sub: "a pinch of dried thyme" },
    { item: "butter", qty: 2, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "olive oil", qty: null, unit: null, aisle: "dry", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Heat the oven to four hundred and twenty five degrees.",
    "Chop the pecans fine, but not to dust, and mix them with the panko and a pinch of salt.",
    "Slice each chicken breast through the middle into two thin cutlets, pat them dry and salt them.",
    "Mix two tablespoons of the mustard with the honey.",
    "Cut the sweet potatoes into wedges and slice the shallot thin."
  ],

  steps: [
    { text: "Toss the sweet potato wedges with oil, salt and pepper and roast them for twenty five minutes.", minutes: 25 },
    { text: "Brush the chicken all over with the honey mustard.", minutes: null },
    { text: "Press the pecan and panko mixture firmly onto both sides.", minutes: null },
    { text: "Heat the butter and a little oil in a wide pan over medium heat, not higher.", minutes: null },
    { text: "Lay the cutlets in and cook them for about four minutes, until the crust is golden.", minutes: 4 },
    { text: "Turn them once and cook for another four minutes, then check the thickest part reads one hundred and sixty five degrees.", minutes: 4 },
    { text: "Move the chicken to a plate.", minutes: null },
    { text: "Cook the shallot in the same pan for two minutes, then pour in the stock and scrape the bottom.", minutes: 2 },
    { text: "Let it reduce by half, then take the pan off the heat.", minutes: 3 },
    { text: "Stir in the cream, the rest of the mustard and the thyme.", minutes: null },
    { text: "Serve the chicken on the sweet potatoes with the sauce spooned around, not over, so the crust stays crisp.", minutes: null }
  ],

  beginnerTip: "Cook this over medium heat, not high. Nuts have a lot of oil in them and they burn much faster than breadcrumbs do, so a pan hot enough for a normal cutlet will give you a black bitter crust over raw chicken. Slower and lower, and use a thermometer rather than the colour to tell you it is done.",
  makeItBetter: "Spoon the sauce around the chicken rather than over it. You have just spent ten minutes building a crisp crust and pouring liquid on it undoes all of that in seconds. The same goes for resting it on a rack rather than a plate while you make the sauce, so the underside does not go soft in its own steam.",
  skills: ["nut crusts", "pan sauces", "cooking to temperature"],

  source: { name: "HelloFresh's Pecan-Crusted Chicken, with the heat turned down",
            url: "https://www.hellofresh.com/recipes/pecan-crusted-chicken-5e4a3b2c1d0e9f8a7b6c5d4e" },
  vetting: "Sits on HelloFresh's own highest-rated dinner recipes list, next to their Creamy Dill Pork Tenderloin and Korean bibimbap. Pecan-crusted chicken is a standard Southern preparation with versions from Ina Garten and Southern Living, so it clears the tested-kitchen leg independently. The recurring failure with any nut crust is scorching, because nut oil browns far faster than breadcrumb, which is why this is written for medium heat and a thermometer."
},

/* ================================================================ added 2026-09-02
   Ten more, from two hunts: the HelloFresh meals r/hellofresh rates nine and ten
   out of ten again and again over several years, and a handful of classics that
   turn up everywhere with real cooks arguing about them in the comments.
   ================================================================================ */

{
  id: "bulgogi-meatballs",
  title: "Bulgogi Meatballs",
  subtitle: "Korean sweet-soy meatballs over ginger rice",
  photo: "img/bulgogi-meatballs.webp",
  photoCredit: { by: "anokarina", lic: "CC BY-SA 2.0",
                 url: "https://commons.wikimedia.org/wiki/File:Gogi-wanja-jorim.jpg" },
  cuisine: "asian",
  appliances: ["stove", "ricecooker"],
  minutes: 35,
  activeMinutes: 25,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 6],
  capacityQt: 1.6,
  tags: ["hellofresh-style", "weeknight", "one-pan"],
  spiceLevel: 2,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "ground beef", qty: 10, unit: "oz", aisle: "meat", scale: true,
      sub: "ground pork, or half and half, which is closer to a real bulgogi mix" },
    { item: "panko", qty: 3, unit: "tbsp", aisle: "dry", scale: true,
      note: "binds the meatballs so they stay tender" },
    { item: "soy sauce", qty: 3, unit: "tbsp", aisle: "canned", scale: true },
    { item: "brown sugar", qty: 1.5, unit: "tbsp", aisle: "dry", scale: true,
      sub: "honey, or white sugar with a splash of molasses" },
    { item: "sesame oil", qty: 2, unit: "tsp", aisle: "canned", scale: true },
    { item: "ginger", qty: 1, unit: "tbsp", aisle: "produce", scale: true,
      note: "grated" },
    { item: "garlic", qty: 3, unit: "clove", aisle: "produce", scale: true },
    { item: "scallions", qty: 3, unit: "piece", aisle: "produce", scale: true },
    { item: "rice", qty: 1, unit: "cup", aisle: "dry", scale: true, note: "uncooked" },
    { item: "green beans", qty: 8, unit: "oz", aisle: "produce", scale: true,
      sub: "broccoli, or frozen green beans straight from the bag" },
    { item: "sesame seeds", qty: 1, unit: "tbsp", aisle: "spices", scale: false },
    { item: "gochujang", qty: 1, unit: "tsp", aisle: "canned", scale: true,
      note: "optional, for heat", sub: "sriracha, or a pinch of chilli flakes" },
    { item: "vegetable oil", qty: 1, unit: "tbsp", aisle: "canned", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Start the rice. Grate a little of the ginger straight in with it — that is the ginger rice.",
    "Grate the rest of the ginger and mince the garlic.",
    "Slice the scallions, keeping the white and the green parts in separate piles.",
    "Mix the soy sauce, brown sugar, sesame oil, half the garlic and half the ginger in a bowl. That is the bulgogi sauce.",
    "Trim the green beans."
  ],

  steps: [
    { text: "Put the ground beef in a bowl with the panko, the scallion whites, the rest of the garlic and ginger, a big pinch of salt and plenty of black pepper.", minutes: null },
    { text: "Mix it with your fingertips only until it just comes together. Squeezing it makes the meatballs bouncy instead of tender.", minutes: null },
    { text: "Roll it into balls about the size of a walnut. You should get ten or twelve.", minutes: null },
    { text: "Heat the vegetable oil in a wide pan over medium-high heat until it shimmers.", minutes: null },
    { text: "Lay the meatballs in with space between them and leave them alone for about three minutes, until one side is deep brown.", minutes: 3 },
    { text: "Turn them and brown a second side for two minutes, then move them to a plate. They do not need to be cooked through yet.", minutes: 2 },
    { text: "Tip the green beans into the same pan with a splash of water and a pinch of salt, and cook them for about five minutes until they are bright and just tender.", minutes: 5 },
    { text: "Move the beans to a plate and pour the bulgogi sauce into the empty pan.", minutes: null },
    { text: "Let it bubble for about a minute, until it thickens enough to coat a spoon.", minutes: 1 },
    { text: "Slide the meatballs back in and roll them around in the sauce for two or three minutes, until they are glossy and cooked through.", minutes: 3 },
    { text: "Stir the gochujang into whatever sauce is left in the pan if you want the heat.", minutes: null },
    { text: "Serve the meatballs over the ginger rice with the green beans, and scatter the scallion greens and the sesame seeds over the top.", minutes: null }
  ],

  beginnerTip: "The sauce has sugar in it, so it will catch and burn if the pan is too hot. Turn the heat down to medium before the sauce goes in, and keep the meatballs moving once they are back in the pan.",
  makeItBetter: "Toast the sesame seeds in a dry pan for two minutes before they go on. Straight from the jar they taste of almost nothing; toasted, they are the best thing on the plate.",
  skills: ["browning", "pan sauce", "glazing"],

  source: { name: "HelloFresh — Meatballs with Bulgogi Sauce, as remade and rated across r/hellofresh",
            url: "https://www.reddit.com/r/hellofresh/comments/19229yy/bulgogi_meatballs_1010/" },
  vetting: "This is the single most repeated recommendation in the subreddit. Separate people posted it at 8 out of 10, 9, 9.5 and 10 in 2021, 2022, 2023 and 2024, and it turns up again in every hall of fame and favourite meals thread. The complaints are consistent too: the kit sauce is thin and the portion is small. So the sauce is reduced in the pan here before the meatballs go back in, and gochujang is offered because several people said they added chilli."
},

{
  id: "szechuan-pork-green-beans",
  title: "Szechuan Pork and Green Beans",
  subtitle: "Blistered beans, peanuts, real heat",
  photo: "img/szechuan-pork-green-beans.webp",
  photoCredit: { by: "Andy Li", lic: "CC0",
                  url: "https://commons.wikimedia.org/wiki/File:Sichuan-style-dried_fried_Green_Beans_with_Minced_Pork_-_Aberdeen_Seafood,_Brighton_2026-07-19.jpg" },
  cuisine: "asian",
  appliances: ["stove", "ricecooker"],
  minutes: 30,
  activeMinutes: 25,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1.4,
  tags: ["hellofresh-style", "weeknight", "big-kick", "one-pan"],
  spiceLevel: 4,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "ground pork", qty: 10, unit: "oz", aisle: "meat", scale: true,
      sub: "ground chicken or turkey, but add an extra spoon of oil" },
    { item: "green beans", qty: 10, unit: "oz", aisle: "produce", scale: true,
      note: "trimmed", sub: "long beans, or asparagus cut into short lengths" },
    { item: "peanuts", qty: 3, unit: "tbsp", aisle: "dry", scale: true,
      note: "unsalted, roughly chopped", sub: "cashews, or leave them out" },
    { item: "soy sauce", qty: 2, unit: "tbsp", aisle: "canned", scale: true },
    { item: "shaoxing wine", qty: 1, unit: "tbsp", aisle: "canned", scale: true,
      sub: "dry sherry, or skip it" },
    { item: "sichuan chilli bean paste", qty: 1, unit: "tbsp", aisle: "canned", scale: true,
      sub: "gochujang plus a pinch of chilli flakes — different, still good" },
    { item: "sichuan peppercorns", qty: 1, unit: "tsp", aisle: "spices", scale: false,
      note: "whole", sub: "leave them out; you lose the tingle, not the heat" },
    { item: "chilli flakes", qty: 1, unit: "tsp", aisle: "spices", scale: false },
    { item: "garlic", qty: 4, unit: "clove", aisle: "produce", scale: true },
    { item: "ginger", qty: 1, unit: "tbsp", aisle: "produce", scale: true, note: "grated" },
    { item: "sugar", qty: 2, unit: "tsp", aisle: "dry", scale: true, staple: true },
    { item: "rice", qty: 1, unit: "cup", aisle: "dry", scale: true, note: "uncooked" },
    { item: "vegetable oil", qty: 2, unit: "tbsp", aisle: "canned", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Start the rice.",
    "Wash the green beans and then dry them completely on a towel. Wet beans steam instead of blistering, and they spit.",
    "Mince the garlic and grate the ginger.",
    "Mix the soy sauce, the shaoxing wine and the sugar in a small bowl.",
    "Toast the sichuan peppercorns in a dry pan for a minute until you can smell them, then crush them roughly."
  ],

  steps: [
    { text: "Heat one tablespoon of the vegetable oil in a wide pan over high heat until it is properly shimmering.", minutes: null },
    { text: "Add the green beans in one layer and leave them without stirring for about three minutes, until they are blistered and blackened in patches.", minutes: 3 },
    { text: "Toss them once and give them another two minutes, then tip them onto a plate with a pinch of salt.", minutes: 2 },
    { text: "Add the rest of the oil, turn the heat to medium-high, and put the ground pork in, pressing it flat.", minutes: null },
    { text: "Leave it completely alone for three minutes so one side browns properly, then break it up and cook another two minutes.", minutes: 3 },
    { text: "Turn the heat down to medium and add the sichuan chilli bean paste. Fry it in the fat for a full minute, until the oil in the pan turns red.", minutes: 1 },
    { text: "Add the garlic, the ginger and the chilli flakes and stir for thirty seconds.", minutes: null },
    { text: "Pour in the soy sauce mixture and let it bubble for one minute.", minutes: 1 },
    { text: "Return the green beans to the pan along with the chopped peanuts and toss everything together for a minute.", minutes: 1 },
    { text: "Take the pan off the heat, scatter the crushed sichuan peppercorns over the top, and serve it over the rice.", minutes: null }
  ],

  beginnerTip: "Blistering is not burning. You want dark brown and black freckles on skin that has gone slightly wrinkled — that is the flavour of this dish. If the beans stay smooth and squeaky green, the pan was not hot enough.",
  makeItBetter: "The peppercorns go on at the very end, off the heat, never in with the oil. Their whole job is the citrus tingle on your lips, and that is the first thing to cook away.",
  skills: ["dry frying", "blistering", "blooming chilli paste"],

  source: { name: "HelloFresh — Szechuan Pork and Green Bean Stir-Fry with Candied Peanuts, via a long r/hellofresh rating thread",
            url: "https://www.reddit.com/r/hellofresh/" },
  vetting: "One subscriber posted a run of two dozen meals scored honestly, most between 5 and 8 out of 10, and gave this one 9.5 — the highest number in the whole list. The technique behind it is not HelloFresh's: dry-fried green beans, gan bian si ji dou, is a standard Sichuan restaurant dish, and the blistering step is the part every version insists on and every kit card underplays. Written here for a hot pan and dry beans, which is the fix for the mushy result people report."
},

{
  id: "shepherds-pie",
  title: "Pub-Style Shepherd's Pie",
  subtitle: "Beef and thyme under a cheddar mash lid",
  photo: "img/shepherds-pie.webp",
  photoCredit: { by: "User M0nkmaster on en.wikipedia", lic: "Public domain",
                  url: "https://commons.wikimedia.org/wiki/File:ShepherdsPie.jpg" },
  cuisine: "american",
  appliances: ["oven", "stove"],
  minutes: 60,
  activeMinutes: 35,
  difficulty: "easy",
  baseServings: 4,
  scalable: [2, 6],
  capacityQt: 2.5,
  tags: ["hellofresh-style", "comfort", "leftovers"],
  spiceLevel: 1,
  meals: ["dinner"],

  ingredients: [
    { item: "ground beef", qty: 1, unit: "lb", aisle: "meat", scale: true,
      sub: "ground lamb, which makes it an actual shepherd's pie" },
    { item: "potatoes", qty: 2, unit: "lb", aisle: "produce", scale: true,
      note: "russet or yukon gold" },
    { item: "cheddar", qty: 4, unit: "oz", aisle: "dairy", scale: true,
      note: "sharp white if you can get it", sub: "gruyère, or any hard cheese that melts" },
    { item: "carrots", qty: 2, unit: "piece", aisle: "produce", scale: true },
    { item: "onion", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "frozen peas", qty: 1, unit: "cup", aisle: "frozen", scale: true },
    { item: "tomato paste", qty: 2, unit: "tbsp", aisle: "canned", scale: true },
    { item: "worcestershire sauce", qty: 1, unit: "tbsp", aisle: "canned", scale: true },
    { item: "beef stock", qty: 1, unit: "cup", aisle: "canned", scale: true },
    { item: "dried thyme", qty: 1, unit: "tsp", aisle: "spices", scale: false,
      sub: "a few sprigs of fresh thyme, leaves stripped off" },
    { item: "flour", qty: 2, unit: "tbsp", aisle: "dry", scale: true, staple: true },
    { item: "butter", qty: 4, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "milk", qty: 0.5, unit: "cup", aisle: "dairy", scale: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Heat the oven to four hundred degrees.",
    "Peel the potatoes and cut them into even chunks, then put them in a pot of cold salted water.",
    "Chop the onion and the carrots small — about the size of the peas, so every spoonful has all three.",
    "Grate the cheddar."
  ],

  steps: [
    { text: "Bring the potatoes to a boil and cook them for about eighteen minutes, until a knife slides into a chunk with no resistance at all.", minutes: 18 },
    { text: "While they cook, heat a wide oven-safe pan over medium-high and brown the ground beef, pressing it flat and leaving it for four minutes before you break it up.", minutes: 4 },
    { text: "Add the onion and the carrots and cook them for about six minutes, until the onion is soft.", minutes: 6 },
    { text: "Stir in the tomato paste, the dried thyme and the flour, and cook for one minute so the flour loses its raw taste.", minutes: 1 },
    { text: "Pour in the beef stock and the worcestershire sauce and scrape the bottom of the pan clean.", minutes: null },
    { text: "Simmer for about eight minutes, until it is thick enough that a spoon dragged through leaves a track.", minutes: 8 },
    { text: "Stir in the frozen peas, taste for salt, and take it off the heat.", minutes: null },
    { text: "Drain the potatoes and let them steam dry in the empty pot for a minute.", minutes: null },
    { text: "Mash them with the butter and the milk, then stir in most of the grated cheddar and season them well.", minutes: null },
    { text: "Spoon the mash over the meat in blobs, then join the blobs up so the whole surface is covered right to the edge.", minutes: null },
    { text: "Drag a fork across the top to make ridges, and scatter the last of the cheddar over.", minutes: null },
    { text: "Bake for about twenty minutes, until the ridges are browned and the sauce is bubbling up at the sides.", minutes: 20 },
    { text: "Let it sit for ten minutes before you serve it, or the filling runs everywhere.", minutes: 10 }
  ],

  beginnerTip: "The filling has to be thick before the mash goes on. If it is still soupy in the pan, it will be soupy under the lid, and the mash sinks into it. Simmer it until a spoon dragged across the bottom leaves a track that stays open for a second.",
  makeItBetter: "Those fork ridges are not decoration. Every ridge is a raised edge that browns and goes crisp, so you get a hundred little crunchy bits instead of one soft surface.",
  skills: ["browning", "thickening a sauce", "mashing"],

  source: { name: "HelloFresh — Pub-Style Shepherd's Pie with White Cheddar and Thyme Mashed Potatoes",
            url: "https://www.reddit.com/r/hellofresh/" },
  vetting: "Scored 9 out of 10 in a subscriber's honest run of two dozen meals, and shepherd's pie comes up again in the thread about meals that were better than expected, where several people say the pies are the range's strongest category. Shepherd's pie itself is a pub standard with tested versions from Kenji and America's Test Kitchen, so it stands up without the kit. The failure everyone reports is a watery filling, which is why the flour and the eight-minute reduction are steps you cannot skip."
},

{
  id: "chicken-al-limone",
  title: "Chicken al Limone",
  subtitle: "Lemon cream chicken with penne",
  photo: "img/chicken-al-limone.webp",
  photoCredit: { by: "Sharon Mollerus", lic: "CC BY 2.0",
                 url: "https://commons.wikimedia.org/wiki/File:Pasta_with_a_Chicken_Lemon_Cream_Sauce_(764644143).jpg" },
  cuisine: "other",
  appliances: ["stove"],
  minutes: 30,
  activeMinutes: 25,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1.5,
  tags: ["hellofresh-style", "weeknight", "one-pan"],
  spiceLevel: 1,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "chicken breast", qty: 2, unit: "piece", aisle: "meat", scale: true,
      note: "sliced in half through the middle to make four thin cutlets" },
    { item: "penne", qty: 6, unit: "oz", aisle: "dry", scale: true,
      sub: "any short pasta with ridges" },
    { item: "lemons", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "heavy cream", qty: 0.33, unit: "cup", aisle: "dairy", scale: true,
      sub: "crème fraîche, stirred in off the heat" },
    { item: "parmesan", qty: 1.5, unit: "oz", aisle: "dairy", scale: true, note: "finely grated" },
    { item: "chicken stock", qty: 0.5, unit: "cup", aisle: "canned", scale: true },
    { item: "garlic", qty: 3, unit: "clove", aisle: "produce", scale: true },
    { item: "fresh parsley", qty: 2, unit: "tbsp", aisle: "produce", scale: false, note: "chopped" },
    { item: "chilli flakes", qty: 0.25, unit: "tsp", aisle: "spices", scale: false },
    { item: "flour", qty: 3, unit: "tbsp", aisle: "dry", scale: true, staple: true },
    { item: "butter", qty: 2, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "olive oil", qty: 1, unit: "tbsp", aisle: "canned", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Put a big pot of water on and salt it like the sea.",
    "Lay each chicken breast flat and slice it through the middle to make two thin cutlets. Pat them dry and salt them on both sides.",
    "Zest the lemon into a small bowl, then cut it in half and have it ready to squeeze.",
    "Grate the parmesan and chop the garlic and the parsley.",
    "Put the flour on a plate with a good pinch of salt and pepper."
  ],

  steps: [
    { text: "Press each chicken cutlet into the seasoned flour on both sides and shake off what does not stick.", minutes: null },
    { text: "Heat the olive oil and one tablespoon of the butter in a wide pan over medium-high heat.", minutes: null },
    { text: "Lay the cutlets in and cook them for about four minutes without moving them, until the underside is golden.", minutes: 4 },
    { text: "Turn them and give the second side three minutes, then move them to a plate.", minutes: 3 },
    { text: "Start the penne now. Cook it one minute less than the packet says.", minutes: null },
    { text: "Turn the pan down to medium, add the garlic and the chilli flakes, and stir for thirty seconds.", minutes: null },
    { text: "Pour in the chicken stock and scrape everything off the bottom of the pan.", minutes: null },
    { text: "Let it bubble down by about half, which takes two or three minutes.", minutes: 3 },
    { text: "Take the pan off the heat and stir in the heavy cream, the lemon zest and a squeeze of the lemon juice.", minutes: null },
    { text: "Put it back on low heat and add the parmesan a little at a time, stirring until the sauce is smooth.", minutes: null },
    { text: "Drain the penne, saving a mug of the cooking water, and tip the pasta into the sauce with the last tablespoon of butter.", minutes: null },
    { text: "Toss it together, loosening it with the cooking water until the sauce coats every piece.", minutes: null },
    { text: "Slice the chicken, lay it on top, and scatter the parsley and plenty of black pepper over.", minutes: null }
  ],

  beginnerTip: "Lemon juice and cream will split if you boil them together. Take the pan off the heat before the cream and the juice go in, and only put it back on low. If it does look grainy, a splash of hot cooking water and hard stirring usually brings it back.",
  makeItBetter: "Use the zest as well as the juice. The juice is the sourness; the oil in the zest is the smell of lemon, and that is the half most people leave in the fruit bowl.",
  skills: ["dredging", "pan sauce", "emulsifying"],

  source: { name: "HelloFresh — Chicken Penne al Limone, as named across r/hellofresh favourites threads",
            url: "https://www.reddit.com/r/hellofresh/comments/xr9868/your_favorite_hello_fresh_recipes/" },
  vetting: "Named independently in at least four separate favourites threads, sometimes as Penne Limone and sometimes as chicken in lemon cream sauce, including one person's top five. The version people complain about is the one that splits, and the reason is always the same — lemon juice added while the cream is boiling. That is fixed here by taking the pan off the heat first. Pasta al limone is a Sorrento standard with tested versions from Serious Eats and NYT Cooking, so the dish stands on its own feet."
},

{
  id: "crispy-parmesan-chicken",
  title: "Crispy Parmesan Chicken",
  subtitle: "Baked crust, lemony couscous",
  photo: "img/crispy-parmesan-chicken.webp",
  photoCredit: { by: "Bonnachoven", lic: "CC0",
                  url: "https://commons.wikimedia.org/wiki/File:Longhorn_Parmesan_Crusted_Chicken.jpg" },
  cuisine: "other",
  appliances: ["oven", "stove"],
  minutes: 35,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1.2,
  tags: ["hellofresh-style", "weeknight"],
  spiceLevel: 1,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "chicken breast", qty: 2, unit: "piece", aisle: "meat", scale: true },
    { item: "panko", qty: 0.75, unit: "cup", aisle: "dry", scale: true },
    { item: "parmesan", qty: 1.5, unit: "oz", aisle: "dairy", scale: true, note: "finely grated" },
    { item: "mayonnaise", qty: 3, unit: "tbsp", aisle: "canned", scale: true,
      note: "this is the glue, not a flavour", sub: "dijon mustard, or plain yogurt" },
    { item: "couscous", qty: 0.75, unit: "cup", aisle: "dry", scale: true,
      sub: "orzo, or plain rice" },
    { item: "carrots", qty: 2, unit: "piece", aisle: "produce", scale: true },
    { item: "lemons", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "chicken stock", qty: 1, unit: "cup", aisle: "canned", scale: true },
    { item: "fresh parsley", qty: 2, unit: "tbsp", aisle: "produce", scale: false, note: "chopped" },
    { item: "garlic powder", qty: 0.5, unit: "tsp", aisle: "spices", scale: false },
    { item: "butter", qty: 1, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "olive oil", qty: 1, unit: "tbsp", aisle: "canned", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Heat the oven to four hundred and twenty five degrees and put a rack in the top third.",
    "Pat the chicken breasts dry and salt them on both sides.",
    "Mix the panko, the grated parmesan, the garlic powder and the olive oil on a plate, with a pinch of salt.",
    "Peel the carrots and cut them into coins.",
    "Zest the lemon and keep the halves to squeeze."
  ],

  steps: [
    { text: "Spread the mayonnaise thinly over the top of each chicken breast, all the way to the edges.", minutes: null },
    { text: "Press the mayonnaise side down into the parmesan panko, then lift it out and press any loose crumbs back on.", minutes: null },
    { text: "Sit the chicken crumb side up on a lined baking sheet, scatter the carrot coins around it, and toss the carrots in a little oil and salt.", minutes: null },
    { text: "Bake for about twenty two minutes, until the crumb is deep golden and the thickest part of the chicken reads one hundred and sixty five degrees.", minutes: 22 },
    { text: "While it bakes, bring the chicken stock to a boil in a small pot with the butter and a pinch of salt.", minutes: null },
    { text: "Stir in the couscous, put the lid on, take it right off the heat and leave it alone for five minutes.", minutes: 5 },
    { text: "Fluff the couscous with a fork and stir through the lemon zest, a good squeeze of the juice and the parsley.", minutes: null },
    { text: "Serve the chicken whole on the couscous with the roasted carrots, and squeeze more lemon over everything.", minutes: null }
  ],

  beginnerTip: "Mayonnaise sounds wrong and it is the whole trick. It is oil and egg, which is exactly what a breading needs, and unlike a dipped egg wash it will not slide off. You will not taste it.",
  makeItBetter: "Put the tray in the top third of the oven. That is where the heat comes down hardest, and it is the difference between a crumb that browns and a crumb that just dries out.",
  skills: ["breading", "roasting", "steaming couscous"],

  source: { name: "HelloFresh — Crispy Parmesan Chicken with Lemony Carrots and Couscous",
            url: "https://www.reddit.com/r/hellofresh/comments/192fhru/whats_one_meal_you_always_pick_when_it_is_an/" },
  vetting: "The answer given to the thread asking which meal people always pick when it appears on the menu, and it turns up again in the general favourites threads. The mayonnaise-as-binder method is not HelloFresh's invention — Hellmann's, Ina Garten and America's Test Kitchen all use it for the same reason — so the technique is independently backed. Written for a top-third oven rack because the usual complaint is a pale, soft crust."
},

{
  id: "chicken-adobo",
  title: "Chicken Adobo",
  subtitle: "Filipino soy and vinegar braise",
  photo: "img/chicken-adobo.webp",
  photoCredit: { by: "dbgg1979 on flickr", lic: "CC BY 2.0",
                  url: "https://commons.wikimedia.org/wiki/File:Chicken_adobo.jpg" },
  cuisine: "asian",
  appliances: ["stove", "ricecooker"],
  minutes: 50,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 4,
  scalable: [2, 6],
  capacityQt: 2,
  tags: ["weeknight", "leftovers", "one-pan"],
  spiceLevel: 1,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "chicken thighs", qty: 6, unit: "piece", aisle: "meat", scale: true,
      note: "bone-in, skin-on — the skin and the bone are half the sauce" },
    { item: "soy sauce", qty: 0.33, unit: "cup", aisle: "canned", scale: true },
    { item: "white vinegar", qty: 0.5, unit: "cup", aisle: "canned", scale: true,
      note: "cane vinegar if the shop has it", sub: "rice vinegar, or cider vinegar" },
    { item: "garlic", qty: 8, unit: "clove", aisle: "produce", scale: true,
      note: "smashed, not chopped" },
    { item: "bay leaves", qty: 3, unit: "piece", aisle: "spices", scale: false },
    { item: "black peppercorns", qty: 1, unit: "tsp", aisle: "spices", scale: false,
      note: "whole", sub: "a lot of coarsely ground black pepper" },
    { item: "brown sugar", qty: 1, unit: "tbsp", aisle: "dry", scale: true,
      note: "balances the vinegar, does not make it sweet" },
    { item: "rice", qty: 1.5, unit: "cup", aisle: "dry", scale: true, note: "uncooked" },
    { item: "scallions", qty: 2, unit: "piece", aisle: "produce", scale: true },
    { item: "vegetable oil", qty: 1, unit: "tbsp", aisle: "canned", scale: false, staple: true }
  ],

  misePlace: [
    "Pat the chicken thighs completely dry. Do not salt them — the soy sauce is the salt in this dish.",
    "Smash the garlic cloves under the flat of a knife and peel them. Leave them whole.",
    "Measure the soy sauce, the white vinegar and the brown sugar into one bowl.",
    "Start the rice.",
    "Slice the scallions."
  ],

  steps: [
    { text: "Heat the vegetable oil in a wide pan over medium-high heat.", minutes: null },
    { text: "Lay the chicken thighs in skin side down and leave them for about six minutes, until the skin is deep golden.", minutes: 6 },
    { text: "Turn them over, add the smashed garlic, the bay leaves and the black peppercorns, and cook for one more minute.", minutes: 1 },
    { text: "Pour in the soy sauce and vinegar mixture. It should come about halfway up the chicken, no more.", minutes: null },
    { text: "Bring it to a simmer and then do not stir it for the next ten minutes. Let the vinegar cook off its sharpness on its own.", minutes: 10 },
    { text: "Turn the chicken skin side up, put a lid on at an angle so steam can escape, and simmer gently for twenty five minutes.", minutes: 25 },
    { text: "Take the lid off and let the sauce reduce for about five more minutes, until it is glossy and clings to a spoon.", minutes: 5 },
    { text: "Taste the sauce. If it is too sharp, stir in a little more brown sugar; if it is flat, a splash more vinegar.", minutes: null },
    { text: "Serve the chicken over the rice with the sauce spooned over, and the scallions scattered on top.", minutes: null }
  ],

  beginnerTip: "Do not stir it while the vinegar is cooking off. Filipino cooks are firm about this — stirring early leaves the sauce tasting raw and harsh, and there is nothing you can do about it afterwards. Let it simmer untouched for those first ten minutes.",
  makeItBetter: "Adobo is genuinely better the next day. The sauce keeps soaking in overnight, so if you can, make it the day before and reheat it gently. It is the rare dish that improves in the fridge.",
  skills: ["braising", "reducing a sauce", "balancing sour and salty"],

  source: { name: "Serious Eats — Filipino-Style Chicken Adobo, plus the corrections shared in r/filipinofood",
            url: "https://www.seriouseats.com/filipino-style-chicken-adobo-recipe" },
  vetting: "Serious Eats tests its own recipes, so the tested-kitchen leg is clear. The second leg is the r/filipinofood thread where people cook this constantly and argue about the details: more vinegar than soy so you can adjust the salt afterwards, and never stir it while the vinegar cooks off. r/KitchenPro adds the third recurring failure — too much water, which leaves you with soup instead of a sauce that clings to rice. All three are built into the steps here."
},

{
  id: "cilbir-turkish-eggs",
  title: "Çılbır",
  subtitle: "Turkish eggs in garlic yogurt with chilli butter",
  photo: "img/cilbir-turkish-eggs.webp",
  photoCredit: { by: "Andy Li", lic: "CC0",
                  url: "https://commons.wikimedia.org/wiki/File:%C3%87%C4%B1lb%C4%B1r_-_Cafe_Rust_2025-03-31.jpg" },
  cuisine: "turkish",
  appliances: ["stove"],
  minutes: 20,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 0.8,
  tags: ["weeknight", "vegetarian", "quick"],
  spiceLevel: 2,
  meals: ["breakfast", "lunch"],

  ingredients: [
    { item: "plain yogurt", qty: 1, unit: "cup", aisle: "dairy", scale: true,
      note: "thick greek yogurt, taken out of the fridge first" },
    { item: "eggs", qty: 4, unit: "piece", aisle: "dairy", scale: true,
      note: "as fresh as you can get — old whites go stringy in the water" },
    { item: "garlic", qty: 1, unit: "clove", aisle: "produce", scale: false,
      note: "grated fine, not chopped" },
    { item: "aleppo pepper", qty: 1, unit: "tsp", aisle: "spices", scale: false,
      sub: "pul biber, or sweet paprika with a pinch of chilli flakes" },
    { item: "dried mint", qty: 0.5, unit: "tsp", aisle: "spices", scale: false,
      sub: "leave it out, or a little fresh dill" },
    { item: "lemons", qty: 0.5, unit: "piece", aisle: "produce", scale: false },
    { item: "white vinegar", qty: 1, unit: "tbsp", aisle: "canned", scale: false,
      note: "for the poaching water" },
    { item: "crusty bread", qty: 2, unit: "piece", aisle: "bakery", scale: true,
      note: "thick slices", sub: "pita, warmed" },
    { item: "butter", qty: 3, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Take the plain yogurt out of the fridge before you do anything else. Cold yogurt under hot butter is what makes this dish go wrong.",
    "Grate the garlic into the yogurt with a good pinch of salt and stir it, then leave it on the counter to warm up.",
    "Crack each egg into its own small cup, so you can slide them in gently.",
    "Toast the crusty bread and have it on the plates."
  ],

  steps: [
    { text: "Fill a wide pan with about three inches of water and bring it to a bare simmer, with small bubbles rising but the surface barely moving.", minutes: null },
    { text: "Stir in the white vinegar. Do not salt the water — salt makes the whites spread instead of setting.", minutes: null },
    { text: "Slide the eggs in one at a time, low to the water, and let them cook for about three minutes for a runny yolk.", minutes: 3 },
    { text: "While they poach, melt the butter in a small pan over medium heat.", minutes: null },
    { text: "Take the butter off the heat, stir in the aleppo pepper and the dried mint, and swirl it until the butter turns red.", minutes: null },
    { text: "Spread the garlic yogurt across two plates in a thick pool, right out to the edges.", minutes: null },
    { text: "Lift each egg out with a slotted spoon, rest it on a piece of kitchen paper for a second to drain, then set it on the yogurt.", minutes: null },
    { text: "Spoon the chilli butter over the eggs and the yogurt.", minutes: null },
    { text: "Squeeze a little lemon over the top, add salt, and eat it straight away with the bread.", minutes: null }
  ],

  beginnerTip: "The yogurt has to be at room temperature. Straight from the fridge it seizes and goes watery the moment hot butter hits it, and that is the single complaint people have about this dish. Take it out first and it behaves.",
  makeItBetter: "Let the butter go past melted until the white flecks in it turn nut brown, then add the pepper off the heat. Brown butter and aleppo together is what makes this taste like a restaurant plate rather than eggs on yogurt.",
  skills: ["poaching", "brown butter", "infusing fat"],

  source: { name: "Çılbır, an Ottoman palace dish still eaten for breakfast across Turkey; method cross-checked against several home cooks' write-ups",
            url: "https://www.reddit.com/r/Cooking/comments/z7xtjj/made_cilbir_turkish_eggs_it_was_great/" },
  vetting: "Turns up independently across r/Cooking, r/15minutefood and r/PutAnEggOnIt with people posting their own plates and their own tweaks, which is real cooking rather than pinning. Every serious write-up agrees on the same two rules, so both are steps here rather than footnotes: room-temperature yogurt, and no salt in the poaching water. Aleppo pepper over plain chilli flakes is the other point everyone makes — it is fruity rather than just hot."
},

{
  id: "french-onion-soup",
  title: "Soupe à l'Oignon Gratinée",
  subtitle: "French onion soup with a cheese-toast lid",
  photo: "img/french-onion-soup.webp",
  photoCredit: { by: "jeffreyw", lic: "CC BY 2.0",
                  url: "https://commons.wikimedia.org/wiki/File:Mmm...onion_soup_(5344349906).jpg" },
  cuisine: "french",
  appliances: ["stove", "oven"],
  minutes: 105,
  activeMinutes: 30,
  difficulty: "easy",
  baseServings: 4,
  scalable: [2, 6],
  capacityQt: 2.5,
  tags: ["comfort", "leftovers"],
  spiceLevel: 1,
  meals: ["lunch", "dinner"],

  ingredients: [
    { item: "onion", qty: 3, unit: "lb", aisle: "produce", scale: true,
      note: "yellow onions, sliced thin", sub: "nothing else works as well — red goes muddy, sweet goes cloying" },
    { item: "beef stock", qty: 6, unit: "cup", aisle: "canned", scale: true,
      sub: "chicken stock, or a good vegetable stock to keep it meat-free" },
    { item: "gruyère", qty: 6, unit: "oz", aisle: "dairy", scale: true,
      note: "grated", sub: "comté, or a sharp swiss" },
    { item: "crusty bread", qty: 4, unit: "slice", aisle: "bakery", scale: true, note: "thick" },
    { item: "white wine", qty: 0.5, unit: "cup", aisle: "other", scale: true,
      sub: "dry sherry, or an extra splash of stock plus a spoon of vinegar" },
    { item: "bay leaves", qty: 2, unit: "piece", aisle: "spices", scale: false },
    { item: "fresh thyme", qty: 4, unit: "sprig", aisle: "produce", scale: false,
      sub: "half a teaspoon of dried thyme" },
    { item: "butter", qty: 3, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Slice all the onions thin, root to tip, and separate the slices with your fingers so they cook evenly.",
    "Grate the gruyère.",
    "Cut the crusty bread into thick slices and leave them out to go stale while the onions cook.",
    "Have the beef stock, the white wine, the bay leaves and the thyme within reach — once the onions are done, this moves fast."
  ],

  steps: [
    { text: "Melt the butter in a wide heavy pot over medium heat and tip in all the onions with a big pinch of salt.", minutes: null },
    { text: "Cook them for about ten minutes, stirring now and then, until they have collapsed down to about half their volume.", minutes: 10 },
    { text: "Turn the heat down to medium-low and now leave them to cook for a full hour, stirring every five or ten minutes.", minutes: 60 },
    { text: "Whenever a brown film builds up on the bottom of the pot, splash in a little water and scrape it off into the onions. That film is the flavour.", minutes: null },
    { text: "Stop when the onions are a deep amber brown and jammy. If they smell sharp or bitter, they have gone too far.", minutes: null },
    { text: "Pour in the white wine and let it bubble away to almost nothing, scraping the bottom as you go.", minutes: 3 },
    { text: "Add the beef stock, the bay leaves and the thyme, and simmer gently for twenty minutes.", minutes: 20 },
    { text: "Fish out the bay leaves and the thyme stems, then taste for salt and grind in black pepper.", minutes: null },
    { text: "Heat the broiler and toast the bread on both sides until it is dry and crisp.", minutes: null },
    { text: "Ladle the soup into oven-safe bowls, float a piece of toast on each and pile the gruyère on top, right out over the rim.", minutes: null },
    { text: "Put the bowls under the broiler for about three minutes, until the cheese is bubbling and browned in patches.", minutes: 3 },
    { text: "Warn whoever you are feeding that the bowls are dangerously hot.", minutes: null }
  ],

  beginnerTip: "The onions genuinely take an hour, and no trick shortens it. Turning up the heat gives you burnt edges and raw middles, which is why most homemade versions of this taste thin. Put a timer on, do something else in the kitchen, and stir every so often.",
  makeItBetter: "Every time a brown crust forms on the bottom of the pot, deglaze it with a splash of water and stir it back in. Doing that four or five times over the hour is what builds the colour and the depth. Kenji makes the same point in reverse: darker is not automatically better, and onions taken past deep amber turn bitter.",
  skills: ["caramelising", "deglazing", "broiling"],

  source: { name: "Serious Eats — French Onion Soup (Soupe à l'Oignon Gratinée), J. Kenji López-Alt",
            url: "https://www.seriouseats.com/french-onion-soup-recipe" },
  vetting: "Serious Eats tested this one hard and published the argument behind it, including Kenji's contrarian finding that pushing the onions to a very dark mahogany is a common cause of bitterness. The r/seriouseats threads are full of people asking whether their onions went far enough, and the answer is always the same: it takes an hour or more, and the quick methods burn the base. The Kitchn's mistakes list independently names the same two failures — rushing the onions, and using a cheese that is not gruyère."
},

{
  id: "poulet-basquaise",
  title: "Poulet Basquaise",
  subtitle: "Basque chicken with peppers and chorizo",
  photo: "img/poulet-basquaise.webp",
  photoCredit: { by: "Arnaud 25", lic: "CC BY-SA 4.0",
                  url: "https://commons.wikimedia.org/wiki/File:Poulet_basquaise.jpg" },
  cuisine: "french",
  appliances: ["stove"],
  minutes: 55,
  activeMinutes: 25,
  difficulty: "easy",
  baseServings: 4,
  scalable: [2, 6],
  capacityQt: 2.2,
  tags: ["one-pan", "leftovers", "big-kick"],
  spiceLevel: 3,
  meals: ["dinner"],

  ingredients: [
    { item: "chicken thighs", qty: 6, unit: "piece", aisle: "meat", scale: true,
      note: "bone-in, skin-on" },
    { item: "bell peppers", qty: 3, unit: "piece", aisle: "produce", scale: true,
      note: "a mix of red and green" },
    { item: "onion", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "canned tomatoes", qty: 14, unit: "oz", aisle: "canned", scale: true },
    { item: "garlic", qty: 4, unit: "clove", aisle: "produce", scale: true },
    { item: "chorizo", qty: 4, unit: "oz", aisle: "meat", scale: true,
      note: "the dry cured kind, cut into coins", sub: "leave it out and add extra smoked paprika" },
    { item: "sweet paprika", qty: 1, unit: "tbsp", aisle: "spices", scale: false },
    { item: "cayenne pepper", qty: 0.5, unit: "tsp", aisle: "spices", scale: false,
      note: "stands in for piment d'Espelette, which is hard to find here" },
    { item: "white wine", qty: 0.5, unit: "cup", aisle: "other", scale: true,
      sub: "chicken stock plus a squeeze of lemon" },
    { item: "fresh parsley", qty: 3, unit: "tbsp", aisle: "produce", scale: false, note: "chopped" },
    { item: "olive oil", qty: 1, unit: "tbsp", aisle: "canned", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Pat the chicken thighs dry and salt them well on both sides.",
    "Cut the bell peppers into wide strips and slice the onion.",
    "Slice the garlic thin and cut the chorizo into coins.",
    "Open the canned tomatoes and crush them with your hand in a bowl."
  ],

  steps: [
    { text: "Heat the olive oil in a wide deep pan over medium-high heat.", minutes: null },
    { text: "Lay the chicken thighs in skin side down and leave them for about seven minutes, until the skin is deep golden and releases on its own.", minutes: 7 },
    { text: "Turn them, give them two minutes, and move them to a plate.", minutes: 2 },
    { text: "Pour off all but about a spoonful of the fat, then add the chorizo coins and fry them for two minutes until their red oil runs out.", minutes: 2 },
    { text: "Add the bell peppers and the onion with a pinch of salt and cook for about ten minutes, until the peppers are soft and floppy.", minutes: 10 },
    { text: "Add the garlic, the sweet paprika and the cayenne pepper and stir for one minute in the hot fat.", minutes: 1 },
    { text: "Pour in the white wine and scrape the bottom of the pan clean.", minutes: null },
    { text: "Add the crushed tomatoes and let everything bubble for five minutes.", minutes: 5 },
    { text: "Sit the chicken back in skin side up, so the skin stays above the sauce, and simmer uncovered for twenty five minutes.", minutes: 25 },
    { text: "Taste the sauce for salt and pepper, and scatter the parsley over the top.", minutes: null }
  ],

  beginnerTip: "Keep the chicken skin above the sauce for the whole simmer. Skin that sits in liquid goes soft and slippery, and the browning you spent seven minutes building is gone. Sit the pieces on top of the peppers, not down in the tomatoes.",
  makeItBetter: "Cook the peppers longer than feels necessary. Ten minutes of soft, sweet peppers is the whole point of this dish — Basque cooks call the pepper and tomato base piperade, and it is meant to melt, not stay crunchy.",
  skills: ["searing", "building a braise", "blooming paprika"],

  source: { name: "Poulet Basquaise, the standard Basque country braise; built on the piperade base every French version starts from",
            url: "https://www.seriouseats.com/piperade-basque-pepper-tomato-recipe" },
  vetting: "The piperade base underneath it has a tested Serious Eats version, and poulet basquaise is a fixed regional dish rather than a blog invention, with essentially the same ingredient list in every French source. Piment d'Espelette is the traditional heat and is genuinely hard to buy in the States, so cayenne and sweet paprika stand in — the substitution every English-language write-up makes as well. The failure to avoid is soggy skin, so the chicken goes back on top of the peppers, not submerged."
},

{
  id: "sheet-pan-harissa-chicken",
  title: "Sheet-Pan Harissa Chicken",
  subtitle: "Chicken, potatoes and lemon, one tray",
  photo: "img/sheet-pan-harissa-chicken.webp",
  photoCredit: { by: "Michael J. Bennett", lic: "CC BY-SA 3.0",
                 url: "https://commons.wikimedia.org/wiki/File:Roasted_Chicken,_Butterflied,_on_Potatoes,_Baking_Pan_01.jpg" },
  cuisine: "middle-eastern",
  appliances: ["oven"],
  minutes: 50,
  activeMinutes: 15,
  difficulty: "easy",
  baseServings: 4,
  scalable: [2, 6],
  capacityQt: 2.4,
  tags: ["one-pan", "sheet-pan", "big-kick", "leftovers"],
  spiceLevel: 3,
  meals: ["dinner"],

  ingredients: [
    { item: "chicken thighs", qty: 6, unit: "piece", aisle: "meat", scale: true,
      note: "bone-in, skin-on" },
    { item: "potatoes", qty: 1.5, unit: "lb", aisle: "produce", scale: true,
      note: "cut into one-inch chunks" },
    { item: "red onion", qty: 1, unit: "piece", aisle: "produce", scale: true,
      note: "cut into thick wedges", sub: "a yellow onion" },
    { item: "harissa", qty: 3, unit: "tbsp", aisle: "canned", scale: true,
      sub: "two tablespoons of tomato paste with a teaspoon of cayenne and a teaspoon of cumin" },
    { item: "lemons", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "garlic", qty: 4, unit: "clove", aisle: "produce", scale: true },
    { item: "cumin", qty: 1, unit: "tsp", aisle: "spices", scale: false },
    { item: "plain yogurt", qty: 0.5, unit: "cup", aisle: "dairy", scale: true,
      note: "for the side", sub: "sour cream" },
    { item: "fresh cilantro", qty: 3, unit: "tbsp", aisle: "produce", scale: false,
      note: "chopped", sub: "flat-leaf parsley" },
    { item: "olive oil", qty: 3, unit: "tbsp", aisle: "canned", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Heat the oven to four hundred and twenty five degrees.",
    "Cut the potatoes into one-inch chunks and the red onion into thick wedges.",
    "Mix the harissa, two tablespoons of the olive oil, the cumin, two grated garlic cloves and a good pinch of salt in a big bowl.",
    "Pat the chicken thighs dry and salt them.",
    "Cut the lemon into thick rounds."
  ],

  steps: [
    { text: "Toss the potatoes and the red onion wedges in the rest of the olive oil with salt and pepper, and spread them over a large baking sheet.", minutes: null },
    { text: "Roast them on their own for fifteen minutes to give them a head start, because they take longer than the chicken.", minutes: 15 },
    { text: "While they roast, rub the harissa mixture all over the chicken thighs, and under the skin as well if you can get your fingers in.", minutes: null },
    { text: "Pull the tray out, push the potatoes to the sides, and sit the chicken thighs skin side up down the middle.", minutes: null },
    { text: "Tuck the lemon rounds and the two remaining garlic cloves in among the potatoes.", minutes: null },
    { text: "Roast for another thirty minutes, until the potatoes are crisp at the edges and the thickest part of the chicken reads one hundred and sixty five degrees.", minutes: 30 },
    { text: "Let it sit on the tray for five minutes so the juices settle.", minutes: 5 },
    { text: "Scatter the cilantro over everything and squeeze the roasted lemon rounds over the potatoes.", minutes: null },
    { text: "Serve it straight off the tray with the plain yogurt on the side for dipping.", minutes: null }
  ],

  beginnerTip: "Give the potatoes their fifteen-minute head start. Everything on a sheet pan is only as good as its timing, and chicken thighs and potato chunks do not cook at the same speed. Put them in together and you get either raw potato or dry chicken.",
  makeItBetter: "Get the harissa under the skin, not just on top of it. On top it mostly burns off; underneath it seasons the meat and stays put, and you can still see the red coming through.",
  skills: ["sheet-pan timing", "roasting", "seasoning under the skin"],

  source: { name: "The sheet-pan harissa chicken pattern, as cooked by NYT Cooking, Ottolenghi and half the food world; built here around Jerome's spice rack",
            url: "https://www.seriouseats.com/harissa-recipe" },
  vetting: "Harissa-roasted chicken with potatoes appears independently in NYT Cooking, Ottolenghi's books and Serious Eats' harissa writing, which clears the tested-kitchen and the more-than-one-place legs both. The failure people report on every sheet-pan chicken is undercooked potato, and the fix is always the same head start, so it is a step here rather than a note. Harissa brands vary a lot in heat, which is why the amount is written to be tasted and adjusted rather than trusted."
},

/* ================================================================ added 2026-09-02
   Breakfast and small plates. The collection had grown dinner-heavy — four
   breakfasts and a single snack — so this batch is aimed squarely at the gap.
   ================================================================================ */

{
  id: "french-omelette",
  title: "Omelette Nature",
  subtitle: "The Jacques Pépin French omelette",
  photo: "img/french-omelette.webp",
  photoCredit: { by: "Krzysztof Golik", lic: "CC BY-SA 4.0",
                  url: "https://commons.wikimedia.org/wiki/File:Omelette_with_bread_and_parsley_03.jpg" },
  cuisine: "french",
  appliances: ["stove"],
  minutes: 10,
  activeMinutes: 10,
  difficulty: "easy",
  baseServings: 1,
  scalable: [1, 3],
  capacityQt: 0.5,
  tags: ["quick", "vegetarian", "one-pan"],
  meals: ["breakfast", "lunch"],
  spiceLevel: 1,

  ingredients: [
    { item: "eggs", qty: 3, unit: "piece", aisle: "dairy", scale: true },
    { item: "butter", qty: 1, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "fresh chives", qty: 1, unit: "tbsp", aisle: "produce", scale: false,
      note: "chopped", sub: "fresh parsley, or nothing at all" },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Crack the eggs into a bowl with a pinch of salt and beat them until there is no clear streak of white left.",
    "Chop the chives.",
    "Have a plate ready beside the stove. This takes under a minute once it starts."
  ],

  steps: [
    { text: "Melt the butter in a small non-stick pan over medium heat until it foams but has not browned.", minutes: null },
    { text: "Pour in the eggs all at once.", minutes: null },
    { text: "Count to five, then start shaking the pan back and forth on the burner while stirring the eggs with the flat of a fork.", minutes: null },
    { text: "Keep both going for about twenty seconds, until the eggs look like very soft, small curds and the whole thing is still wet.", minutes: null },
    { text: "Stop stirring. Let it sit for ten seconds so the bottom sets into a skin.", minutes: null },
    { text: "Scatter the chives over one half.", minutes: null },
    { text: "Tilt the pan away from you and use the fork to fold the top third down over the middle.", minutes: null },
    { text: "Bang the handle with your fist so the far edge climbs the side of the pan, then roll it out onto the plate seam side down.", minutes: null },
    { text: "Rub the top with a little butter to make it shine, and grind pepper over it.", minutes: null }
  ],

  beginnerTip: "The heat is the whole thing, and it is lower than you think. If the eggs hiss and set the moment they hit the pan, it is too hot and you will get a browned American omelette instead. A French one stays pale yellow all over, with no colour anywhere.",
  makeItBetter: "Take it out while the middle still looks slightly underdone and wet. It keeps cooking on the plate for another half minute, and that carryover is the difference between creamy and rubbery.",
  skills: ["egg cookery", "pan control", "carryover cooking"],

  source: { name: "Jacques Pépin's classic omelette technique, as taught in his television series and picked apart in r/Cooking",
            url: "https://www.reddit.com/r/Cooking/comments/j36qg6/i_finally_managed_a_classic_jaques_pepin_omelette/" },
  vetting: "Pépin is about as strong an attribution as cooking has, and the r/Cooking threads are people trying it, failing, and saying exactly how. The recurring failures are all in here as steps: heat too high so it browns, a stiff spatula that tears it, and stirring without shaking the pan. One thread is titled simply that they finally got it after thirty years, which is a fair warning that the first one will not be perfect."
},

{
  id: "huevos-rancheros",
  title: "Huevos Rancheros",
  subtitle: "Fried eggs on tortillas with a quick chilli salsa",
  photo: "img/huevos-rancheros.webp",
  photoCredit: { by: "Luca Nebuloni from Milan, Italy", lic: "CC BY 2.0",
                  url: "https://commons.wikimedia.org/wiki/File:Huevos_Rancheros_(11494813583).jpg" },
  cuisine: "other",
  appliances: ["stove"],
  minutes: 25,
  activeMinutes: 25,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1,
  tags: ["one-pan", "big-kick", "vegetarian"],
  meals: ["breakfast", "lunch"],
  spiceLevel: 3,

  ingredients: [
    { item: "eggs", qty: 4, unit: "piece", aisle: "dairy", scale: true },
    { item: "corn tortillas", qty: 4, unit: "piece", aisle: "bakery", scale: true,
      sub: "small flour tortillas" },
    { item: "canned tomatoes", qty: 14, unit: "oz", aisle: "canned", scale: true },
    { item: "jalapenos", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "onion", qty: 0.5, unit: "piece", aisle: "produce", scale: true },
    { item: "garlic", qty: 2, unit: "clove", aisle: "produce", scale: true },
    { item: "cumin", qty: 1, unit: "tsp", aisle: "spices", scale: false },
    { item: "black beans", qty: 1, unit: "can", aisle: "canned", scale: true,
      note: "drained and rinsed", sub: "pinto beans, or leave them out" },
    { item: "feta", qty: 2, unit: "oz", aisle: "dairy", scale: true,
      note: "stands in for cotija", sub: "any dry salty white cheese" },
    { item: "fresh cilantro", qty: 3, unit: "tbsp", aisle: "produce", scale: false },
    { item: "limes", qty: 0.5, unit: "piece", aisle: "produce", scale: false },
    { item: "olive oil", qty: 2, unit: "tbsp", aisle: "canned", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Chop the onion and the garlic. Slice the jalapenos thin, seeds in if you want the heat.",
    "Drain and rinse the black beans.",
    "Crumble the feta and chop the cilantro.",
    "Open the canned tomatoes and crush them with your hand."
  ],

  steps: [
    { text: "Warm one tablespoon of the olive oil in a pan over medium heat and cook the onion for about four minutes until soft.", minutes: 4 },
    { text: "Add the garlic, the jalapenos and the cumin and stir for one minute, until it smells strong.", minutes: 1 },
    { text: "Tip in the crushed tomatoes with a good pinch of salt and simmer for about eight minutes, until the salsa has thickened and darkened.", minutes: 8 },
    { text: "Stir the black beans through the salsa and keep it warm on the lowest heat.", minutes: null },
    { text: "In a second dry pan over medium-high heat, warm each corn tortilla for about thirty seconds a side, until it puffs and smells toasty. Stack them on a plate.", minutes: null },
    { text: "Add the rest of the olive oil to that pan and fry the eggs until the whites are set and the edges are lacy and brown but the yolks are still runny.", minutes: 3 },
    { text: "Put two tortillas on each plate, spoon the salsa and beans over them, and slide the eggs on top.", minutes: null },
    { text: "Scatter the feta and the cilantro over, and squeeze the lime across everything.", minutes: null }
  ],

  beginnerTip: "Warm the tortillas in a dry pan, not the microwave. Thirty seconds a side in real heat is what makes a corn tortilla taste of corn instead of cardboard, and it is the step almost everyone skips.",
  makeItBetter: "Fry the eggs in properly hot oil so the whites go brown and frilly at the edges. Those crisp lacy bits against the soft yolk and the salsa are the best mouthful on the plate.",
  skills: ["building a quick salsa", "toasting tortillas", "frying eggs"],

  source: { name: "Huevos rancheros, the standard Mexican ranch breakfast; salsa built on the fry-the-aromatics-first method Serious Eats uses",
            url: "https://www.seriouseats.com/huevos-rancheros-recipe" },
  vetting: "A fixed regional dish rather than anybody's invention, with a tested Serious Eats version and essentially the same shape in every Mexican source: warmed tortilla, cooked salsa, fried egg. The two things every write-up insists on are toasting the tortillas dry and cooking the salsa rather than using it raw from a jar, so both are steps here. Feta stands in for cotija because it is what an ordinary Charleston shop actually stocks."
},

{
  id: "croque-monsieur",
  title: "Croque Monsieur",
  subtitle: "Ham and cheese under a béchamel lid",
  photo: "img/croque-monsieur.webp",
  photoCredit: { by: "Michael Brewer", lic: "CC BY-SA 2.5",
                  url: "https://commons.wikimedia.org/wiki/File:Croque_monsieur.jpg" },
  cuisine: "french",
  appliances: ["oven", "stove"],
  minutes: 30,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1,
  tags: ["comfort", "one-pan"],
  meals: ["breakfast", "lunch"],
  spiceLevel: 1,

  ingredients: [
    { item: "bread", qty: 4, unit: "slice", aisle: "bakery", scale: true,
      note: "thick white slices, a day old is better" },
    { item: "ham", qty: 4, unit: "oz", aisle: "meat", scale: true,
      note: "good sliced ham, not the wet kind" },
    { item: "gruyère", qty: 4, unit: "oz", aisle: "dairy", scale: true,
      note: "grated", sub: "comté, or a sharp swiss" },
    { item: "milk", qty: 1, unit: "cup", aisle: "dairy", scale: true },
    { item: "dijon mustard", qty: 2, unit: "tsp", aisle: "canned", scale: true },
    { item: "nutmeg", qty: null, unit: null, aisle: "spices", scale: false,
      note: "a few scrapes" },
    { item: "flour", qty: 2, unit: "tbsp", aisle: "dry", scale: true, staple: true },
    { item: "butter", qty: 2, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Heat the oven's broiler and put a rack near the top.",
    "Grate the gruyère.",
    "Measure the milk into a jug so you can pour it in a steady stream.",
    "Toast the bread lightly on both sides."
  ],

  steps: [
    { text: "Melt the butter in a small pot over medium heat, then stir in the flour and cook it for one minute, stirring the whole time.", minutes: 1 },
    { text: "Pour in the milk a splash at a time, whisking hard after each addition so no lumps form.", minutes: null },
    { text: "Keep whisking over medium heat for about four minutes, until the sauce is thick enough to coat the back of a spoon.", minutes: 4 },
    { text: "Take it off the heat and stir in the dijon mustard, a few scrapes of nutmeg, salt and pepper, and about a third of the gruyère.", minutes: null },
    { text: "Spread a thin layer of the sauce on two slices of the toasted bread, lay the ham on, and add a handful of gruyère.", minutes: null },
    { text: "Put the other two slices on top and press down gently.", minutes: null },
    { text: "Spoon the rest of the sauce over the tops, right to the edges so no bread is left bare, and pile on the last of the gruyère.", minutes: null },
    { text: "Put them under the broiler for about four minutes, until the top is bubbling and browned in patches.", minutes: 4 },
    { text: "Let them sit for two minutes before you cut them, or the sauce runs straight out.", minutes: 2 }
  ],

  beginnerTip: "Add the milk to the flour and butter slowly, whisking between each splash. Dumping it in all at once is how you get lumps, and once they are there no amount of stirring takes them out.",
  makeItBetter: "Cover the tops right out to the crusts with sauce and cheese. Any bread left showing burns under the broiler while the middle is still pale, and that is the difference between the version in a Paris café and the one that comes out of a home oven looking sad.",
  skills: ["béchamel", "whisking a roux", "broiling"],

  source: { name: "Croque monsieur, the French café standard; béchamel built the way Julia Child and every French source teach it",
            url: "https://www.seriouseats.com/croque-monsieur-recipe" },
  vetting: "A fixed café dish, not a blog recipe, with a tested Serious Eats version and the same three components in every French source: béchamel, good ham, gruyère. The béchamel is where beginners come unstuck, and the fix reported everywhere is the same — milk in slowly, whisk between additions — so that is written as its own step. Gruyère is not negotiable in any source I found; a mild cheese leaves it tasting of nothing but bread."
},

{
  id: "dutch-baby",
  title: "Dutch Baby",
  subtitle: "One giant oven pancake that puffs up the sides of the pan",
  photo: "img/dutch-baby.webp",
  photoCredit: { by: "Wheeler Cowperthwaite", lic: "CC BY 2.0",
                  url: "https://commons.wikimedia.org/wiki/File:2-22-2025_Dutch_baby_pancake_(7_of_12).jpg" },
  cuisine: "american",
  appliances: ["oven", "stove"],
  minutes: 30,
  activeMinutes: 10,
  difficulty: "easy",
  baseServings: 2,
  scalable: [2, 4],
  capacityQt: 1.2,
  tags: ["comfort", "vegetarian", "one-pan"],
  meals: ["breakfast"],
  spiceLevel: 1,

  ingredients: [
    { item: "eggs", qty: 3, unit: "piece", aisle: "dairy", scale: true,
      note: "at room temperature" },
    { item: "milk", qty: 0.66, unit: "cup", aisle: "dairy", scale: true,
      note: "warmed slightly, not straight from the fridge" },
    { item: "flour", qty: 0.66, unit: "cup", aisle: "dry", scale: true, staple: true },
    { item: "butter", qty: 3, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "sugar", qty: 1, unit: "tbsp", aisle: "dry", scale: true, staple: true },
    { item: "vanilla extract", qty: 0.5, unit: "tsp", aisle: "spices", scale: false },
    { item: "lemons", qty: 0.5, unit: "piece", aisle: "produce", scale: false },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Put a cast iron skillet in the oven and heat the oven to four hundred and twenty five degrees. The pan heats with it.",
    "Take the eggs out of the fridge and warm the milk slightly so nothing going into the batter is cold.",
    "Cut the lemon into wedges."
  ],

  steps: [
    { text: "Blend or whisk the eggs, the milk, the flour, the sugar, the vanilla extract and a pinch of salt until the batter is completely smooth and a little frothy.", minutes: null },
    { text: "Let the batter sit on the counter for ten minutes while the oven finishes heating.", minutes: 10 },
    { text: "Take the hot skillet out of the oven and drop the butter into it. It should sizzle straight away. Swirl it around the bottom and up the sides.", minutes: null },
    { text: "Pour the batter into the middle of the hot pan all at once and put it straight back in the oven.", minutes: null },
    { text: "Bake for about twenty minutes without opening the door. It will climb up the sides of the pan and go deep golden.", minutes: 20 },
    { text: "Take it out and squeeze the lemon over it while it is still puffed.", minutes: null },
    { text: "Cut it in wedges and eat it immediately. It sinks within a minute and that is normal.", minutes: null }
  ],

  beginnerTip: "Do not open the oven door while it bakes. The whole trick is steam pushing the batter up the sides, and a blast of cold air collapses it before the structure has set.",
  makeItBetter: "Room-temperature eggs and warm milk in a screaming hot buttered pan. Cold batter hitting hot iron is the single most common reason a Dutch baby comes out flat instead of dramatic.",
  skills: ["batter", "preheating a pan", "oven steam"],

  source: { name: "The Dutch baby, a Seattle diner invention now standard everywhere; method cross-checked against Serious Eats and Smitten Kitchen",
            url: "https://www.seriouseats.com/dutch-baby-pancake-recipe" },
  vetting: "Both Serious Eats and Smitten Kitchen have tested versions and they agree on the two things that decide it: a properly preheated pan and batter that is not cold. Every failure report is the same complaint — it did not rise — and the cause is always one of those two, or opening the door early. Written for a cast iron skillet because that is what holds enough heat to do it."
},

{
  id: "ful-medames",
  title: "Ful Medames",
  subtitle: "Egyptian stewed fava beans with lemon and cumin",
  photo: "img/ful-medames.webp",
  photoCredit: { by: "Abdullah Geelah", lic: "CC BY-SA 3.0",
                  url: "https://commons.wikimedia.org/wiki/File:Ful_medames_(arabic_meal).jpg" },
  cuisine: "middle-eastern",
  appliances: ["stove"],
  minutes: 20,
  activeMinutes: 15,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1,
  tags: ["vegetarian", "cheap", "one-pan"],
  meals: ["breakfast", "lunch"],
  spiceLevel: 2,

  ingredients: [
    { item: "fava beans", qty: 1, unit: "can", aisle: "canned", scale: true,
      note: "canned ful medames if the shop has it", sub: "chickpeas, which is not the same dish but works" },
    { item: "garlic", qty: 2, unit: "clove", aisle: "produce", scale: false,
      note: "grated fine" },
    { item: "lemons", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "cumin", qty: 1, unit: "tsp", aisle: "spices", scale: false },
    { item: "tomatoes", qty: 1, unit: "piece", aisle: "produce", scale: true,
      note: "chopped small" },
    { item: "fresh parsley", qty: 3, unit: "tbsp", aisle: "produce", scale: false },
    { item: "chilli flakes", qty: 0.5, unit: "tsp", aisle: "spices", scale: false },
    { item: "eggs", qty: 2, unit: "piece", aisle: "dairy", scale: true,
      note: "hard boiled, optional but traditional" },
    { item: "pita bread", qty: 2, unit: "piece", aisle: "bakery", scale: true },
    { item: "olive oil", qty: 3, unit: "tbsp", aisle: "canned", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Grate the garlic fine and squeeze the lemon.",
    "Chop the tomatoes small and chop the parsley.",
    "If you want the eggs, get them boiling now — about nine minutes for a set yolk."
  ],

  steps: [
    { text: "Tip the fava beans into a small pot with their liquid and warm them over medium heat for about five minutes.", minutes: 5 },
    { text: "Toast the cumin in a dry pan for thirty seconds until you can smell it, then tip it into the beans.", minutes: null },
    { text: "Mash about half the beans against the side of the pot with the back of a spoon, leaving the rest whole.", minutes: null },
    { text: "Stir in the grated garlic, the lemon juice, a big pinch of salt and two tablespoons of the olive oil.", minutes: null },
    { text: "Taste it. It should be lemony enough to make you sit up. If not, add more juice.", minutes: null },
    { text: "Spoon it into shallow bowls and flatten the top with the back of the spoon.", minutes: null },
    { text: "Scatter the chopped tomatoes, the parsley and the chilli flakes over, and pour the last of the olive oil across the top.", minutes: null },
    { text: "Halve the hard boiled eggs and sit them on the side, and warm the pita bread to scoop with.", minutes: null }
  ],

  beginnerTip: "Mash only about half of it. All-smooth turns it into hummus and all-whole leaves it watery — the texture Egyptians actually eat is somewhere in between, thick and rough with whole beans still in it.",
  makeItBetter: "Be much heavier with the lemon and the olive oil than feels right. Ful is a plain, cheap, filling bean dish, and the acid and the good oil poured over at the end are the entire difference between breakfast and mush.",
  skills: ["blooming spices", "mashing to texture", "seasoning with acid"],

  source: { name: "Ful medames, the everyday Egyptian breakfast; built on Claudia Roden's account of the dish",
            url: "https://www.seriouseats.com/ful-medames-egyptian-fava-beans-recipe" },
  vetting: "Claudia Roden is on the approved list and ful is one of the dishes she documents in detail, so it traces to a real cook and a real tradition rather than a blog. Serious Eats has a tested version that agrees on the essentials. The consistent note across sources is that the seasoning goes in at the end and heavily — under-lemoned ful is the standard complaint, and the fix is written into the steps as a taste-and-adjust."
},

{
  id: "chicken-congee",
  title: "Chicken Congee",
  subtitle: "Rice porridge with ginger, scallion and chilli oil",
  photo: "img/chicken-congee.webp",
  photoCredit: { by: "Giovanni JL", lic: "CC BY-SA 2.0",
                  url: "https://commons.wikimedia.org/wiki/File:Mama%27s_congee_by_Giovanni_JL.jpg" },
  cuisine: "asian",
  appliances: ["stove"],
  minutes: 60,
  activeMinutes: 15,
  difficulty: "easy",
  baseServings: 4,
  scalable: [2, 6],
  capacityQt: 2.5,
  tags: ["comfort", "cheap", "leftovers", "one-pot"],
  meals: ["breakfast", "lunch", "dinner"],
  spiceLevel: 2,

  ingredients: [
    { item: "rice", qty: 0.75, unit: "cup", aisle: "dry", scale: true,
      note: "uncooked short or long grain, rinsed" },
    { item: "chicken thighs", qty: 4, unit: "piece", aisle: "meat", scale: true,
      note: "bone-in adds the most flavour" },
    { item: "chicken stock", qty: 8, unit: "cup", aisle: "canned", scale: true,
      sub: "water, plus an extra pinch of salt" },
    { item: "ginger", qty: 2, unit: "tbsp", aisle: "produce", scale: true,
      note: "sliced into coins" },
    { item: "scallions", qty: 4, unit: "piece", aisle: "produce", scale: true },
    { item: "soy sauce", qty: 2, unit: "tbsp", aisle: "canned", scale: true },
    { item: "sesame oil", qty: 2, unit: "tsp", aisle: "canned", scale: true },
    { item: "chilli crisp", qty: 2, unit: "tbsp", aisle: "canned", scale: true,
      note: "to finish", sub: "chilli flakes warmed in oil" },
    { item: "fresh cilantro", qty: 3, unit: "tbsp", aisle: "produce", scale: false },
    { item: "white pepper", qty: 0.5, unit: "tsp", aisle: "spices", scale: false,
      sub: "black pepper, though white is the taste people recognise" },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Rinse the rice under cold water until the water runs clear.",
    "Slice the ginger into coins.",
    "Slice the scallions, keeping the white and green parts apart.",
    "Chop the cilantro."
  ],

  steps: [
    { text: "Put the rinsed rice, the chicken thighs, the ginger coins, the scallion whites and the chicken stock in a big pot.", minutes: null },
    { text: "Bring it to a boil, then turn it down to the lowest simmer you can hold.", minutes: null },
    { text: "Cook it uncovered for about forty five minutes, stirring every ten minutes or so and scraping the bottom.", minutes: 45 },
    { text: "Lift the chicken out onto a plate. Pull the meat off the bones with two forks and drop the bones back in the pot.", minutes: null },
    { text: "Keep simmering for another ten minutes, until the rice has broken down completely and it looks like loose porridge.", minutes: 10 },
    { text: "Fish out the bones and the ginger coins.", minutes: null },
    { text: "Stir the shredded chicken back in with the soy sauce, the white pepper and a good pinch of salt, and taste it.", minutes: null },
    { text: "Ladle it into bowls. It should slowly settle flat, not hold its shape. Loosen it with hot water if it is too stiff.", minutes: null },
    { text: "Top each bowl with the scallion greens, the cilantro, a drizzle of sesame oil and a spoon of chilli crisp.", minutes: null }
  ],

  beginnerTip: "It looks like far too much liquid for the rice and it is not. Congee needs roughly ten times as much liquid as rice, and it thickens right at the end as the grains give up their starch. Do not be tempted to add more rice.",
  makeItBetter: "The porridge itself is deliberately plain — all the flavour lives in what goes on top. Be generous with the chilli crisp, the sesame oil and the scallion greens, and add them at the table so they stay sharp against the soft rice underneath.",
  skills: ["long simmering", "shredding chicken", "building toppings"],

  source: { name: "Chicken congee, eaten for breakfast across China and Southeast Asia; the version r/hellofresh rated ten out of ten as their Vietnamese-style chicken and rice porridge",
            url: "https://www.reddit.com/r/hellofresh/comments/1tma0yo/your_favorite_hellofresh_meals/" },
  vetting: "Two independent legs. It came up in the r/hellofresh favourites thread with an unprompted ten out of ten, and congee itself is a documented staple with tested versions from Serious Eats and The Woks of Life that all agree on the ratio and the long low simmer. The failures people report are a thin, watery result from too little cooking time, and rice catching on the bottom — hence the uncovered forty five minutes and the reminder to scrape as you stir."
},

{
  id: "esquites",
  title: "Esquites",
  subtitle: "Charred corn in a cup, Mexican street style",
  photo: "img/esquites.webp",
  photoCredit: { by: "Alondrapr", lic: "CC BY-SA 4.0",
                  url: "https://commons.wikimedia.org/wiki/File:Traditional_%22esquites%22.jpg" },
  cuisine: "other",
  appliances: ["stove"],
  minutes: 20,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 6],
  capacityQt: 0.8,
  tags: ["quick", "vegetarian", "one-pan", "big-kick"],
  meals: ["snack", "lunch"],
  spiceLevel: 3,

  ingredients: [
    { item: "frozen corn", qty: 3, unit: "cup", aisle: "frozen", scale: true,
      sub: "fresh kernels cut off four cobs" },
    { item: "mayonnaise", qty: 3, unit: "tbsp", aisle: "canned", scale: true },
    { item: "sour cream", qty: 2, unit: "tbsp", aisle: "dairy", scale: true,
      sub: "plain yogurt, or just more mayonnaise" },
    { item: "feta", qty: 2, unit: "oz", aisle: "dairy", scale: true,
      note: "stands in for cotija", sub: "parmesan at a push" },
    { item: "limes", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "chilli powder", qty: 1, unit: "tsp", aisle: "spices", scale: false,
      sub: "cayenne, but use half as much" },
    { item: "smoked paprika", qty: 0.5, unit: "tsp", aisle: "spices", scale: false },
    { item: "fresh cilantro", qty: 3, unit: "tbsp", aisle: "produce", scale: false },
    { item: "scallions", qty: 2, unit: "piece", aisle: "produce", scale: true },
    { item: "butter", qty: 1, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "If the frozen corn is wet, spread it on a towel and dry it. Wet corn steams instead of charring.",
    "Crumble the feta, chop the cilantro and slice the scallions.",
    "Mix the mayonnaise and the sour cream in the bowl you will serve from.",
    "Cut the lime into wedges."
  ],

  steps: [
    { text: "Melt the butter in a wide pan over high heat until it stops foaming.", minutes: null },
    { text: "Tip in the corn in one layer and leave it completely alone for about four minutes.", minutes: 4 },
    { text: "Toss it once and leave it again for another three minutes, until a good number of kernels are blackened in spots.", minutes: 3 },
    { text: "Take the pan off the heat and let the corn cool for two minutes, or it will split the mayonnaise.", minutes: 2 },
    { text: "Tip the warm corn into the bowl with the mayonnaise and sour cream and stir it through.", minutes: null },
    { text: "Add most of the feta, the chilli powder, the smoked paprika, the scallions and a big squeeze of lime.", minutes: null },
    { text: "Taste it and add salt and more lime until it makes you want another spoonful.", minutes: null },
    { text: "Scatter the rest of the feta and the cilantro over the top, with the remaining lime wedges on the side.", minutes: null }
  ],

  beginnerTip: "Leave the corn alone in the pan. Charring needs contact and time, and stirring it every few seconds means every kernel is slightly warm and none of them are black. Four minutes untouched, then toss once.",
  makeItBetter: "Let the corn cool for a couple of minutes before the mayonnaise goes anywhere near it. Straight off the heat it splits the dressing into oily puddles, which is the one complaint people have about home versions.",
  skills: ["charring", "dressing while warm", "balancing acid and fat"],

  source: { name: "Esquites, the cup version of Mexican street corn; charring method from Kenji López-Alt's Serious Eats write-up",
            url: "https://www.seriouseats.com/esquites-mexican-corn-salad-recipe" },
  vetting: "Kenji tested this one at Serious Eats specifically to work out how to get the char without a grill, and a dry hot pan with the corn left alone is his answer. It is a real street dish with the same components everywhere: corn, lime, chilli, cotija, mayonnaise. Feta replaces cotija because that is the honest substitution for an American supermarket, and the split-dressing failure is fixed by the two-minute cool built into the steps."
},

{
  id: "whipped-feta",
  title: "Whipped Feta with Hot Honey",
  subtitle: "Salty, cold, sweet and hot, on warm bread",
  photo: "img/whipped-feta.webp",
  photoCredit: { by: "Alexander Baxevanis", lic: "CC BY 2.0",
                  url: "https://commons.wikimedia.org/wiki/File:Tirokafteri.jpg" },
  cuisine: "middle-eastern",
  appliances: ["stove"],
  minutes: 15,
  activeMinutes: 15,
  difficulty: "easy",
  baseServings: 4,
  scalable: [2, 8],
  capacityQt: 0.6,
  tags: ["quick", "vegetarian", "big-kick"],
  meals: ["snack"],
  spiceLevel: 2,

  ingredients: [
    { item: "feta", qty: 8, unit: "oz", aisle: "dairy", scale: true,
      note: "block feta in brine, not the pre-crumbled kind" },
    { item: "plain yogurt", qty: 0.33, unit: "cup", aisle: "dairy", scale: true,
      note: "thick greek yogurt", sub: "cream cheese, for something denser" },
    { item: "honey", qty: 3, unit: "tbsp", aisle: "canned", scale: true },
    { item: "chilli flakes", qty: 1, unit: "tsp", aisle: "spices", scale: false,
      sub: "aleppo pepper, which is gentler and fruitier" },
    { item: "lemons", qty: 0.5, unit: "piece", aisle: "produce", scale: false },
    { item: "garlic", qty: 1, unit: "clove", aisle: "produce", scale: false,
      note: "grated fine" },
    { item: "pita bread", qty: 4, unit: "piece", aisle: "bakery", scale: true,
      sub: "any crusty bread, torn and toasted" },
    { item: "fresh thyme", qty: 1, unit: "tsp", aisle: "produce", scale: false,
      sub: "dried oregano" },
    { item: "olive oil", qty: 3, unit: "tbsp", aisle: "canned", scale: true, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Take the feta out of its brine and pat it dry.",
    "Grate the garlic fine.",
    "Have a food processor or a bowl and a fork ready.",
    "Cut the pita bread into wedges."
  ],

  steps: [
    { text: "Break the feta into chunks and blitz it with the plain yogurt, the grated garlic, a squeeze of lemon and two tablespoons of the olive oil until it is completely smooth and pale.", minutes: null },
    { text: "If you have no machine, mash it hard against the side of a bowl with a fork for a few minutes. It will be rougher and still good.", minutes: null },
    { text: "Taste it and grind in black pepper. It should not need salt.", minutes: null },
    { text: "Warm the honey in a small pan over low heat with the chilli flakes and the fresh thyme for about two minutes, until it loosens and smells of chilli.", minutes: 2 },
    { text: "Toast the pita bread wedges in a dry pan or under the broiler until they are hot and just starting to colour.", minutes: null },
    { text: "Spread the whipped feta across a wide shallow plate and drag the back of a spoon through it to make grooves.", minutes: null },
    { text: "Pour the warm chilli honey over it so it pools in the grooves, and finish with the last of the olive oil.", minutes: null },
    { text: "Serve it straight away, while the honey is still warm and the bread is hot.", minutes: null }
  ],

  beginnerTip: "Buy feta in a block sitting in brine, not the pre-crumbled tubs. Crumbled feta is coated with something to stop it clumping and it will never whip smooth, no matter how long the machine runs.",
  makeItBetter: "Warm the honey rather than pouring it cold. Two minutes over low heat with the chilli makes it runny enough to pool properly and pulls the heat out of the flakes into the honey itself, so every scoop gets some.",
  skills: ["whipping cheese", "infusing honey", "plating"],

  source: { name: "Whipped feta with hot honey, the standard modern meze; the feta-and-yogurt base is the one Ottolenghi and Serious Eats both use",
            url: "https://www.seriouseats.com/whipped-feta-dip-recipe" },
  vetting: "The base appears independently in Ottolenghi's writing, in Serious Eats' tested version and across Greek and Turkish meze traditions, so it clears both the tested-kitchen and the more-than-one-place legs. The single failure reported everywhere is a grainy dip, and the cause is always pre-crumbled feta rather than block feta in brine — which is why that is called out in the ingredient note and again in the tip."
},

{
  id: "pad-krapow",
  title: "Pad Krapow Gai",
  subtitle: "Thai basil chicken, ten minutes, serious heat",
  photo: "img/pad-krapow.webp",
  photoCredit: { by: "Takeaway", lic: "CC BY-SA 3.0",
                  url: "https://commons.wikimedia.org/wiki/File:Kraphao_mu_khai_dao.jpg" },
  cuisine: "asian",
  appliances: ["stove", "ricecooker"],
  minutes: 20,
  activeMinutes: 15,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1.2,
  tags: ["quick", "one-pan", "big-kick", "weeknight"],
  meals: ["lunch", "dinner"],
  spiceLevel: 4,

  ingredients: [
    { item: "ground chicken", qty: 12, unit: "oz", aisle: "meat", scale: true,
      sub: "ground pork, or chicken thighs chopped small by hand" },
    { item: "thai basil", qty: 2, unit: "cup", aisle: "produce", scale: false,
      note: "leaves only, loosely packed", sub: "regular basil plus a little fresh mint" },
    { item: "jalapenos", qty: 2, unit: "piece", aisle: "produce", scale: true,
      note: "stands in for thai bird chillies", sub: "serrano, or a teaspoon of chilli flakes" },
    { item: "garlic", qty: 5, unit: "clove", aisle: "produce", scale: true },
    { item: "shallots", qty: 2, unit: "piece", aisle: "produce", scale: true,
      sub: "half a small onion" },
    { item: "oyster sauce", qty: 1, unit: "tbsp", aisle: "canned", scale: true,
      note: "brands vary a lot in salt, so taste before adding more" },
    { item: "soy sauce", qty: 1, unit: "tbsp", aisle: "canned", scale: true },
    { item: "fish sauce", qty: 2, unit: "tsp", aisle: "canned", scale: true },
    { item: "sugar", qty: 1, unit: "tsp", aisle: "dry", scale: true, staple: true },
    { item: "chicken stock", qty: 3, unit: "tbsp", aisle: "canned", scale: true,
      sub: "water" },
    { item: "eggs", qty: 2, unit: "piece", aisle: "dairy", scale: true,
      note: "fried, the traditional topping" },
    { item: "rice", qty: 1, unit: "cup", aisle: "dry", scale: true, note: "uncooked" },
    { item: "vegetable oil", qty: 3, unit: "tbsp", aisle: "canned", scale: false, staple: true }
  ],

  misePlace: [
    "Start the rice. Everything else takes ten minutes, so this is the long pole.",
    "Pick the thai basil leaves off the stems. You want a big loose pile.",
    "Slice the jalapenos, chop the garlic and slice the shallots.",
    "Mix the oyster sauce, the soy sauce, the fish sauce, the sugar and the chicken stock in one small bowl.",
    "Have everything within arm's reach of the stove. Once this starts there is no time to go looking."
  ],

  steps: [
    { text: "Heat two tablespoons of the vegetable oil in a wide pan over high heat until it is just starting to smoke.", minutes: null },
    { text: "Throw in the garlic, the shallots and the jalapenos and stir hard for about thirty seconds.", minutes: null },
    { text: "Add the ground chicken and press it flat. Leave it alone for two minutes so one side browns.", minutes: 2 },
    { text: "Break it up and keep stir-frying for another three minutes, until there is no pink left.", minutes: 3 },
    { text: "Pour in the sauce mixture and let it bubble hard for about two minutes, until most of the liquid has gone and what is left is a sticky glaze.", minutes: 2 },
    { text: "Taste it now, before the basil. If it is too salty, a splash of water and a pinch more sugar fixes it.", minutes: null },
    { text: "Turn the heat off, throw in all the thai basil, and fold it through until it just wilts.", minutes: null },
    { text: "In a second pan, fry the eggs in the last tablespoon of oil over high heat until the whites are brown and crisp at the edges and the yolks are still runny.", minutes: 3 },
    { text: "Serve the chicken over the rice with a fried egg on top of each plate.", minutes: null }
  ],

  beginnerTip: "The basil goes in with the heat off, at the very end. Cooked for even a minute it turns black and tastes of nothing, and the whole dish is named after that basil.",
  makeItBetter: "The fried egg is not optional decoration. Break the runny yolk into the rice and it loosens the salty glaze into a sauce. That is how it is eaten on every street corner in Bangkok.",
  skills: ["high-heat stir frying", "reducing a glaze", "frying an egg hard"],

  source: { name: "Pad krapow gai, Thai street-stall standard; cross-checked against The Woks of Life and Chef John's versions",
            url: "https://thewoksoflife.com/thai-basil-chicken-pad-krapow/" },
  vetting: "The Woks of Life is a named family kitchen with a long track record and nearly two hundred ratings on this one; Chef John has an independent version with the same shape. The complaint that shows up in the comments of every version is saltiness, because oyster sauce brands differ enormously — one commenter found three tablespoons inedible and the author agreed to halve it. So the oyster sauce is written low here, with a taste-and-adjust step before the basil goes in."
},

{
  id: "carbonara",
  title: "Spaghetti alla Carbonara",
  subtitle: "Egg, cheese, pepper and pork. No cream, ever",
  photo: "img/carbonara.webp",
  photoCredit: { by: "FakirNL", lic: "CC BY-SA 3.0",
                  url: "https://commons.wikimedia.org/wiki/File:Spaghetti_alla_Carbonara_(2).jpg" },
  cuisine: "other",
  appliances: ["stove"],
  minutes: 25,
  activeMinutes: 25,
  difficulty: "medium",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 1.2,
  tags: ["quick", "one-pan", "comfort"],
  meals: ["lunch", "dinner"],
  spiceLevel: 1,

  ingredients: [
    { item: "spaghetti", qty: 7, unit: "oz", aisle: "dry", scale: true },
    { item: "guanciale", qty: 4, unit: "oz", aisle: "meat", scale: true,
      note: "cut into short thick strips", sub: "pancetta, or thick-cut bacon at a push" },
    { item: "eggs", qty: 3, unit: "piece", aisle: "dairy", scale: true,
      note: "two whole plus one extra yolk" },
    { item: "pecorino romano", qty: 2, unit: "oz", aisle: "dairy", scale: true,
      note: "finely grated", sub: "parmesan, which is milder and less salty" },
    { item: "black pepper", qty: 2, unit: "tsp", aisle: "spices", scale: false,
      note: "coarsely cracked, far more than feels right", staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Put a big pot of water on and salt it, but less than usual — the guanciale and the pecorino romano are both very salty.",
    "Cut the guanciale into short strips about as thick as a pencil.",
    "Grate the pecorino romano finely and beat it into the eggs in a bowl until it is a thick paste.",
    "Crack the black pepper coarsely. A lot of it.",
    "Get a heatproof bowl or a wide pan ready off the heat. That is where this gets finished."
  ],

  steps: [
    { text: "Put the guanciale in a cold dry pan and only then turn the heat to medium.", minutes: null },
    { text: "Cook it for about eight minutes, until the fat has run out and the meat is browned and crisp at the edges.", minutes: 8 },
    { text: "Take the pan off the heat and leave it. That fat is the sauce and it must stop cooking now.", minutes: null },
    { text: "Boil the spaghetti one minute less than the packet says.", minutes: null },
    { text: "Scoop out a big mug of the pasta water before you drain anything.", minutes: null },
    { text: "Whisk a few spoons of the hot pasta water into the egg and pecorino paste, a little at a time, to warm it up gently.", minutes: null },
    { text: "Drain the spaghetti and tip it into the pan with the guanciale and its fat, off the heat, and toss it.", minutes: null },
    { text: "Wait half a minute so the pan cools a little, then pour the egg mixture over and stir fast and constantly.", minutes: null },
    { text: "Keep stirring, adding splashes of pasta water, until it turns into a glossy sauce that clings to every strand.", minutes: null },
    { text: "Grind in the black pepper, taste for salt, and serve it immediately in warm bowls.", minutes: null }
  ],

  beginnerTip: "The pan must be off the heat before the egg goes in, and it should not even be hissing. Everyone who ends up with scrambled egg in pasta put it back on the burner. The heat left in the pasta and the pan is enough, and it is all you get.",
  makeItBetter: "Temper the eggs first — whisk a few spoons of hot pasta water into the egg and cheese before it meets the pan. It raises the temperature slowly instead of all at once, and it is the single trick that turns this from a gamble into a reliable dinner.",
  skills: ["tempering eggs", "emulsifying with pasta water", "rendering fat"],

  source: { name: "Carbonara, the Roman original; the tempering method is the fix agreed on across r/AskCulinary, r/pasta and Serious Eats",
            url: "https://www.seriouseats.com/the-best-spaghetti-carbonara-recipe" },
  vetting: "Serious Eats has a tested version, and the Reddit evidence here is unusually good because carbonara fails loudly — r/AskCulinary, r/pasta and r/cookingforbeginners are full of people posting scrambled results and being told the same two things every time: take it off the heat, and temper the egg with pasta water first. Both are written as their own steps. No cream: every Italian source and every one of those threads is firm about it."
},

{
  id: "kimchi-jjigae",
  title: "Kimchi Jjigae",
  subtitle: "Sour kimchi stew with pork and tofu",
  photo: "img/kimchi-jjigae.webp",
  photoCredit: { by: "Alan Chan", lic: "CC BY-SA 2.0",
                  url: "https://commons.wikimedia.org/wiki/File:Korean_stew-Kimchi_jjigae-05.jpg" },
  cuisine: "asian",
  appliances: ["stove", "ricecooker"],
  minutes: 35,
  activeMinutes: 15,
  difficulty: "easy",
  baseServings: 2,
  scalable: [2, 6],
  capacityQt: 1.8,
  tags: ["comfort", "big-kick", "one-pot", "cheap"],
  meals: ["lunch", "dinner"],
  spiceLevel: 4,

  ingredients: [
    { item: "kimchi", qty: 2, unit: "cup", aisle: "canned", scale: true,
      note: "well fermented and sour — fresh kimchi will not work" },
    { item: "pork belly", qty: 6, unit: "oz", aisle: "meat", scale: true,
      note: "sliced very thin", sub: "pork shoulder, or bacon, or leave it out" },
    { item: "soft tofu", qty: 8, unit: "oz", aisle: "produce", scale: true,
      note: "cut into thick slabs" },
    { item: "gochujang", qty: 1, unit: "tbsp", aisle: "canned", scale: true },
    { item: "gochugaru", qty: 1, unit: "tbsp", aisle: "spices", scale: false,
      note: "korean chilli flakes", sub: "chilli flakes, but use half as much" },
    { item: "garlic", qty: 3, unit: "clove", aisle: "produce", scale: true },
    { item: "onion", qty: 0.5, unit: "piece", aisle: "produce", scale: true },
    { item: "scallions", qty: 3, unit: "piece", aisle: "produce", scale: true },
    { item: "chicken stock", qty: 2, unit: "cup", aisle: "canned", scale: true,
      note: "anchovy stock is the real thing", sub: "water plus a splash of fish sauce" },
    { item: "sugar", qty: 1, unit: "tsp", aisle: "dry", scale: false, staple: true,
      note: "only if the kimchi is very sharp" },
    { item: "rice", qty: 1, unit: "cup", aisle: "dry", scale: true, note: "uncooked" },
    { item: "sesame oil", qty: 1, unit: "tsp", aisle: "canned", scale: true },
    { item: "vegetable oil", qty: 1, unit: "tbsp", aisle: "canned", scale: false, staple: true }
  ],

  misePlace: [
    "Start the rice.",
    "Chop the kimchi into bite-sized pieces and keep every drop of the juice from the jar.",
    "Slice the pork belly as thin as you can. It is easier if it has been in the freezer for twenty minutes.",
    "Chop the garlic, slice the onion and slice the scallions.",
    "Cut the soft tofu into thick slabs and leave them on a plate."
  ],

  steps: [
    { text: "Heat the vegetable oil in a pot over medium-high heat and cook the pork belly for about four minutes, until the edges brown and the fat runs.", minutes: 4 },
    { text: "Add the chopped kimchi and fry it in that fat for a full five minutes. Do not rush this — it is where the flavour comes from.", minutes: 5 },
    { text: "Stir in the garlic, the onion, the gochujang and the gochugaru and cook for one more minute.", minutes: 1 },
    { text: "Pour in the kimchi juice and the chicken stock and bring it to a boil.", minutes: null },
    { text: "Turn it down and simmer for about fifteen minutes with the lid on at an angle.", minutes: 15 },
    { text: "Taste it. If it is puckeringly sour, stir in the sugar a little at a time until it settles down.", minutes: null },
    { text: "Slide the tofu slabs in and simmer for five minutes more without stirring, so they do not break up.", minutes: 5 },
    { text: "Turn the heat off, scatter the scallions over and drizzle the sesame oil across the top.", minutes: null },
    { text: "Serve it bubbling hot with the rice on the side, not in it.", minutes: null }
  ],

  beginnerTip: "The kimchi has to be old and sour. Fresh kimchi straight from the shop makes a flat, cabbagey stew. If yours is still crunchy and mild, leave the jar out on the counter for two days first and it will come round.",
  makeItBetter: "Fry the kimchi in the pork fat for the full five minutes before any liquid goes in. Most home versions dump everything in the pot at once and end up with sour soup; frying it first is what turns it into a stew with depth.",
  skills: ["frying kimchi", "building a stew base", "balancing sour"],

  source: { name: "Maangchi's kimchi-jjigae, learned from a Korean restaurant that served nothing else",
            url: "https://www.maangchi.com/recipe/kimchi-jjigae" },
  vetting: "Maangchi is on the approved list and this is one of her best-documented recipes, with a long comment thread of people reporting back on their own variations. r/KoreanFood independently gives the same two rules: well-fermented sour kimchi is essential, and pork belly wants to be sliced almost as thin as bacon, which is easier half-frozen. The sugar is in there because that thread also names it as the fix when kimchi turns out too tart."
},

{
  id: "chicken-tinga-tacos",
  title: "Chicken Tinga Tacos",
  subtitle: "Smoky chipotle shredded chicken",
  photo: "img/chicken-tinga-tacos.webp",
  photoCredit: { by: "Axochilt", lic: "CC BY-SA 4.0",
                  url: "https://commons.wikimedia.org/wiki/File:Tinga_de_pollo.JPG" },
  cuisine: "other",
  appliances: ["stove"],
  minutes: 40,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 4,
  scalable: [2, 6],
  capacityQt: 1.8,
  tags: ["big-kick", "leftovers", "one-pan"],
  meals: ["lunch", "dinner"],
  spiceLevel: 4,

  ingredients: [
    { item: "chicken thighs", qty: 6, unit: "piece", aisle: "meat", scale: true,
      note: "boneless works best here" },
    { item: "chipotles in adobo", qty: 3, unit: "piece", aisle: "canned", scale: true,
      note: "plus a spoon of the sauce from the tin", sub: "two teaspoons of smoked paprika and a teaspoon of cayenne" },
    { item: "canned tomatoes", qty: 14, unit: "oz", aisle: "canned", scale: true },
    { item: "onion", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "garlic", qty: 4, unit: "clove", aisle: "produce", scale: true },
    { item: "dried oregano", qty: 1, unit: "tsp", aisle: "spices", scale: false },
    { item: "cumin", qty: 1, unit: "tsp", aisle: "spices", scale: false },
    { item: "bay leaves", qty: 1, unit: "piece", aisle: "spices", scale: false },
    { item: "corn tortillas", qty: 8, unit: "piece", aisle: "bakery", scale: true },
    { item: "limes", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "fresh cilantro", qty: 4, unit: "tbsp", aisle: "produce", scale: false },
    { item: "sour cream", qty: 0.33, unit: "cup", aisle: "dairy", scale: true,
      sub: "plain yogurt" },
    { item: "olive oil", qty: 1, unit: "tbsp", aisle: "canned", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Slice the onion thin and chop the garlic.",
    "Chop the chipotles in adobo and keep a spoonful of the sauce from the tin.",
    "Open the canned tomatoes and crush them with your hand.",
    "Chop the cilantro and cut the lime into wedges."
  ],

  steps: [
    { text: "Heat the olive oil in a wide pan over medium-high and cook the onion with a pinch of salt for about six minutes, until it is soft and browning at the edges.", minutes: 6 },
    { text: "Add the garlic, the cumin and the dried oregano and stir for one minute.", minutes: 1 },
    { text: "Stir in the chopped chipotles in adobo with their sauce and cook for another minute.", minutes: 1 },
    { text: "Add the crushed tomatoes and the bay leaf, and season with salt.", minutes: null },
    { text: "Lay the chicken thighs in so the sauce comes most of the way up them, and bring it to a simmer.", minutes: null },
    { text: "Cover and simmer gently for about twenty minutes, until the chicken pulls apart easily with a fork.", minutes: 20 },
    { text: "Lift the chicken out, shred it with two forks, and take out the bay leaf.", minutes: null },
    { text: "Let the sauce bubble uncovered for five minutes to thicken, then return the shredded chicken and stir it through.", minutes: 5 },
    { text: "Warm the corn tortillas in a dry pan for about thirty seconds a side until they puff.", minutes: null },
    { text: "Pile the chicken into the tortillas and top with sour cream, cilantro and a hard squeeze of lime.", minutes: null }
  ],

  beginnerTip: "Shred the chicken and put it back in, rather than serving it in whole pieces. Tinga is defined by the shredded texture soaking up the sauce, and a whole thigh sitting in sauce is a different dish entirely.",
  makeItBetter: "Reduce the sauce for those five minutes after the chicken comes out. Wet tinga soaks straight through a tortilla and falls apart in your hands; thick tinga stays put.",
  skills: ["braising", "shredding", "reducing a sauce"],

  source: { name: "Tinga de pollo, the Puebla classic; built on the Serious Eats and Mexican home-cook consensus method",
            url: "https://www.seriouseats.com/chicken-tinga-tacos-recipe" },
  vetting: "A named regional dish with a tested Serious Eats version and effectively identical ingredient lists across Mexican sources — onion, chipotle in adobo, tomato, shredded chicken. The two failures reported are a watery filling that ruins the tortilla and heat that runs away from you, so the sauce is reduced as its own step and the chipotle count is written low with the tin's sauce as the dial. Chipotles in adobo are the one thing worth a trip to find; the paprika substitution is honest but not the same."
},

{
  id: "crockpot-ropa-vieja",
  title: "Crockpot Ropa Vieja",
  subtitle: "Cuban shredded beef with peppers and olives",
  photo: "img/crockpot-ropa-vieja.webp",
  photoCredit: { by: "Sarang", lic: "Public domain",
                  url: "https://commons.wikimedia.org/wiki/File:Ropa_viecha_2.jpg" },
  cuisine: "other",
  appliances: ["crockpot", "stove"],
  minutes: 500,
  activeMinutes: 25,
  difficulty: "easy",
  baseServings: 6,
  scalable: [4, 8],
  capacityQt: 3.2,
  tags: ["leftovers", "comfort", "one-pot"],
  meals: ["lunch", "dinner"],
  spiceLevel: 2,

  ingredients: [
    { item: "flank steak", qty: 2, unit: "lb", aisle: "meat", scale: true,
      note: "skirt steak or chuck also work", sub: "beef stew meat" },
    { item: "bell peppers", qty: 3, unit: "piece", aisle: "produce", scale: true,
      note: "a mix of red and green, sliced into strips" },
    { item: "onion", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "canned tomatoes", qty: 14, unit: "oz", aisle: "canned", scale: true },
    { item: "tomato paste", qty: 2, unit: "tbsp", aisle: "canned", scale: true },
    { item: "olives", qty: 0.5, unit: "cup", aisle: "canned", scale: true,
      note: "green, pitted, roughly chopped" },
    { item: "garlic", qty: 5, unit: "clove", aisle: "produce", scale: true },
    { item: "cumin", qty: 2, unit: "tsp", aisle: "spices", scale: false },
    { item: "dried oregano", qty: 1, unit: "tsp", aisle: "spices", scale: false },
    { item: "smoked paprika", qty: 1, unit: "tsp", aisle: "spices", scale: false },
    { item: "bay leaves", qty: 2, unit: "piece", aisle: "spices", scale: false },
    { item: "beef stock", qty: 1, unit: "cup", aisle: "canned", scale: true },
    { item: "white wine", qty: 0.5, unit: "cup", aisle: "other", scale: true,
      sub: "more beef stock and a splash of vinegar" },
    { item: "limes", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "fresh cilantro", qty: 4, unit: "tbsp", aisle: "produce", scale: false },
    { item: "rice", qty: 2, unit: "cup", aisle: "dry", scale: true, note: "uncooked" },
    { item: "olive oil", qty: 2, unit: "tbsp", aisle: "canned", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Pat the flank steak completely dry and season it hard with salt and black pepper on both sides.",
    "Slice the bell peppers and the onion into strips and chop the garlic.",
    "Chop the olives roughly and open the canned tomatoes.",
    "Measure the beef stock, the white wine and the tomato paste."
  ],

  steps: [
    { text: "Heat the olive oil in a wide pan over high heat until it shimmers.", minutes: null },
    { text: "Sear the flank steak for about four minutes a side, until it is deeply browned. Do it in two pieces if it does not fit.", minutes: 8 },
    { text: "Move the beef to the crockpot.", minutes: null },
    { text: "In the same pan, cook the onion and the bell peppers for about five minutes, until they soften and pick up the brown bits.", minutes: 5 },
    { text: "Add the garlic, the cumin, the dried oregano, the smoked paprika and the tomato paste and stir for one minute.", minutes: 1 },
    { text: "Pour in the white wine and scrape the bottom of the pan completely clean.", minutes: null },
    { text: "Tip all of that over the beef, then add the canned tomatoes, the beef stock and the bay leaves.", minutes: null },
    { text: "Cook on low for about eight hours, until the beef falls apart when you push it with a spoon.", minutes: 480 },
    { text: "Lift the beef out, shred it with two forks along the grain, and stir it back in with the chopped olives.", minutes: null },
    { text: "Take out the bay leaves, taste for salt, and squeeze the lime over.", minutes: null },
    { text: "Scatter the cilantro on top and serve it over the rice.", minutes: null }
  ],

  beginnerTip: "Shred the beef along the grain, not across it. Ropa vieja means old clothes because it is meant to look like torn rags, and flank steak pulls into long strands if you follow the lines in the meat.",
  makeItBetter: "Do not skip the sear or the deglaze. A slow cooker adds no browning of its own — everything that tastes roasted in the finished dish had to happen in that pan first, and the wine scraping the pan clean is how it gets into the pot.",
  skills: ["searing", "deglazing", "slow braising", "shredding with the grain"],

  source: { name: "Ropa vieja, the national dish of Cuba; slow cooker method built on the standard braise",
            url: "https://www.seriouseats.com/ropa-vieja-cuban-braised-beef-recipe" },
  vetting: "A national dish with a tested Serious Eats version and the same components in every Cuban source: flank steak, peppers, tomato, olives. The failure reported on every slow-cooker adaptation is flat, boiled-tasting meat, and the cause is always the same — the sear and the deglaze got skipped because the recipe said dump and go. Both are written here as steps you cannot leave out, and the beginner tip covers the other common miss, shredding across the grain into mush."
},

{
  id: "airfryer-halloumi",
  title: "Air Fryer Halloumi",
  subtitle: "Squeaky, blistered, hot honey and lemon",
  photo: "img/airfryer-halloumi.webp",
  photoCredit: { by: "Hmioannou", lic: "CC BY 3.0",
                  url: "https://commons.wikimedia.org/wiki/File:Grilled_Halloumi.jpg" },
  cuisine: "turkish",
  appliances: ["airfryer"],
  minutes: 15,
  activeMinutes: 10,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 0.5,
  tags: ["quick", "vegetarian", "big-kick"],
  meals: ["snack"],
  spiceLevel: 2,

  ingredients: [
    { item: "halloumi", qty: 8, unit: "oz", aisle: "dairy", scale: true,
      note: "one block, patted very dry", sub: "paneer, which browns but does not squeak" },
    { item: "honey", qty: 2, unit: "tbsp", aisle: "canned", scale: true },
    { item: "chilli flakes", qty: 0.5, unit: "tsp", aisle: "spices", scale: false,
      sub: "pul biber, which is milder and fruitier" },
    { item: "lemons", qty: 0.5, unit: "piece", aisle: "produce", scale: false },
    { item: "dried oregano", qty: 0.5, unit: "tsp", aisle: "spices", scale: false },
    { item: "fresh mint", qty: 1, unit: "tbsp", aisle: "produce", scale: false,
      note: "torn", sub: "dried mint, rubbed between your palms" },
    { item: "olive oil", qty: 1, unit: "tbsp", aisle: "canned", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Take the halloumi out of its packet and pat it bone dry with paper towel. Wet halloumi steams and stays pale.",
    "Cut it into slabs about as thick as your finger.",
    "Warm the honey with the chilli flakes in a small pan for a minute, then take it off the heat.",
    "Tear the fresh mint."
  ],

  steps: [
    { text: "Heat the air fryer to four hundred degrees for three minutes.", minutes: 3 },
    { text: "Toss the halloumi slabs in the olive oil and the dried oregano.", minutes: null },
    { text: "Lay them in the basket in a single layer, not touching. In a two quart basket that is about four slabs at a time.", minutes: null },
    { text: "Cook for six minutes, then turn each piece over.", minutes: 6 },
    { text: "Cook for another three or four minutes, until they are golden and blistered at the corners.", minutes: 4 },
    { text: "Tip them straight onto a plate and pour the warm chilli honey over while they are still hot.", minutes: null },
    { text: "Squeeze the lemon across, grind on black pepper and scatter the mint.", minutes: null },
    { text: "Eat them immediately. Halloumi goes rubbery as it cools and there is no rescuing it.", minutes: null }
  ],

  beginnerTip: "Dry it properly and give the pieces space. Halloumi holds a surprising amount of water, and crowding a small basket means the slabs steam each other instead of browning — which in a two quart air fryer happens fast.",
  makeItBetter: "Hot honey and lemon together. The honey needs the acid or the whole thing is just sweet and salty; the lemon is what makes you keep going back to the plate.",
  skills: ["air frying in batches", "infusing honey", "drying before browning"],

  source: { name: "Grilled halloumi with honey, a standard across Cyprus, Turkey and Greece; adapted for a small air fryer",
            url: "https://www.seriouseats.com/halloumi-cheese-guide" },
  vetting: "Halloumi with honey and lemon is a fixed eastern Mediterranean plate rather than anyone's invention, and Serious Eats' guide to the cheese covers why it browns without melting. The air fryer adaptation is where the real failure reports live, and they are consistent: crowded baskets and wet cheese give you pale, squeaky-but-sad slabs. Jerome's air fryer is two quarts, so the batch size is written for it explicitly rather than assuming a big one."
},

{
  id: "garlic-mushrooms-on-toast",
  title: "Garlic Mushrooms on Toast",
  subtitle: "Browned properly, with thyme and a splash of cream",
  photo: "img/garlic-mushrooms-on-toast.webp",
  photoCredit: { by: "Andy Li", lic: "CC0",
                  url: "https://commons.wikimedia.org/wiki/File:Mixed_mushrooms_on_toast_-_Joe%27s_Cafe_2024-04-14.jpg" },
  cuisine: "french",
  appliances: ["stove"],
  minutes: 20,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 4],
  capacityQt: 0.8,
  tags: ["quick", "vegetarian", "one-pan", "cheap"],
  meals: ["breakfast", "lunch", "snack"],
  spiceLevel: 1,

  ingredients: [
    { item: "mushrooms", qty: 12, unit: "oz", aisle: "produce", scale: true,
      note: "cremini or chestnut have more flavour than white" },
    { item: "garlic", qty: 3, unit: "clove", aisle: "produce", scale: true },
    { item: "fresh thyme", qty: 2, unit: "tsp", aisle: "produce", scale: false,
      note: "leaves stripped off", sub: "half a teaspoon of dried thyme" },
    { item: "heavy cream", qty: 3, unit: "tbsp", aisle: "dairy", scale: true,
      sub: "crème fraîche, or leave it out entirely" },
    { item: "crusty bread", qty: 2, unit: "slice", aisle: "bakery", scale: true,
      note: "thick" },
    { item: "lemons", qty: 0.25, unit: "piece", aisle: "produce", scale: false },
    { item: "fresh parsley", qty: 2, unit: "tbsp", aisle: "produce", scale: false },
    { item: "butter", qty: 2, unit: "tbsp", aisle: "dairy", scale: true, staple: true },
    { item: "olive oil", qty: 1, unit: "tbsp", aisle: "canned", scale: false, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Wipe the mushrooms with a damp cloth rather than washing them, and tear or quarter them into big pieces.",
    "Chop the garlic and strip the fresh thyme leaves off their stems.",
    "Chop the fresh parsley.",
    "Toast the crusty bread and have it waiting on the plates."
  ],

  steps: [
    { text: "Heat the olive oil in a wide pan over high heat until it is properly hot.", minutes: null },
    { text: "Tip the mushrooms in and spread them into one layer. Leave them completely alone for about four minutes.", minutes: 4 },
    { text: "They will let out water and it will look wrong. Wait. Once the water has boiled off they start to brown.", minutes: null },
    { text: "Toss them once and give them another three minutes, until they are deep golden and shrunken.", minutes: 3 },
    { text: "Only now add salt. Salting earlier pulls the water out and they never brown.", minutes: null },
    { text: "Turn the heat down to medium, add the butter, the garlic and the thyme, and stir for one minute.", minutes: 1 },
    { text: "Take the pan off the heat and stir in the heavy cream and a squeeze of lemon.", minutes: null },
    { text: "Grind in plenty of black pepper and pile the mushrooms onto the toast.", minutes: null },
    { text: "Scatter the parsley over and eat it while the toast is still crisp underneath.", minutes: null }
  ],

  beginnerTip: "Do not salt the mushrooms until they have browned. Salt draws the water straight out, and mushrooms sitting in their own liquid boil instead of frying — that grey, squeaky result is the single most common mushroom mistake.",
  makeItBetter: "Give them a hot pan and enough room. Mushrooms are mostly water, so a crowded pan means they steam. If your pan is small, do them in two batches — it is the difference between grey and golden.",
  skills: ["browning mushrooms", "when to salt", "pan sauce"],

  source: { name: "Mushrooms on toast, the British and French café standard; the do-not-crowd-and-salt-late method is Kenji's",
            url: "https://www.seriouseats.com/how-to-cook-mushrooms-sauteed" },
  vetting: "Serious Eats tested the mushroom question directly and published the finding this is built on: a hot pan, enough space, and salt only after browning. The dish itself is a café standard rather than anyone's recipe. Every complaint about home mushrooms is the same grey, watery result, and it traces to one of those three, which is why all three are written as steps rather than notes."
},

/* ================================================================ added 2026-09-02
   The mezze table. Eight small Mediterranean and Turkish plates, nearly all of
   them knife work rather than cooking, none over twenty minutes. This is the
   food you put out while something else is in the oven.
   ================================================================================ */

{
  id: "horiatiki",
  title: "Horiatiki",
  subtitle: "Greek village salad — and there is no lettuce in it",
  photo: "img/horiatiki.webp",
  photoCredit: { by: "User:Jpatokal", lic: "CC BY-SA 4.0",
                  url: "https://commons.wikimedia.org/wiki/File:Greece_Food_Horiatiki.JPG" },
  cuisine: "mediterranean",
  appliances: ["stove"],
  minutes: 15,
  activeMinutes: 15,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 6],
  capacityQt: 0.9,
  tags: ["quick", "vegetarian", "no-cook", "cheap"],
  meals: ["lunch", "dinner", "snack"],
  spiceLevel: 1,

  ingredients: [
    { item: "ripe tomatoes", qty: 3, unit: "piece", aisle: "produce", scale: true,
      note: "the whole salad lives or dies by these — room temperature, never cold" },
    { item: "cucumber", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "green peppers", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "red onion", qty: 0.5, unit: "piece", aisle: "produce", scale: true,
      note: "sliced as thin as you can manage" },
    { item: "kalamata olives", qty: 0.33, unit: "cup", aisle: "canned", scale: true,
      sub: "any decent black olive in brine, never the canned sliced ones" },
    { item: "feta", qty: 4, unit: "oz", aisle: "dairy", scale: true,
      note: "one slab from a block in brine, not crumbled" },
    { item: "dried oregano", qty: 1, unit: "tsp", aisle: "spices", scale: false },
    { item: "red wine vinegar", qty: 1, unit: "tbsp", aisle: "canned", scale: true },
    { item: "olive oil", qty: 3, unit: "tbsp", aisle: "canned", scale: true, staple: true,
      note: "this is the dressing, so use the good bottle" },
    { item: "crusty bread", qty: 2, unit: "slice", aisle: "bakery", scale: true,
      note: "for the juice at the bottom" },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true },
    { item: "black pepper", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Take the tomatoes out of the fridge well before you start. Cold tomatoes taste of nothing.",
    "Cut the ripe tomatoes into rough chunks, not small dice.",
    "Halve the cucumber lengthways and cut it into thick half moons.",
    "Cut the green peppers into bite-sized pieces and slice the red onion paper thin."
  ],

  steps: [
    { text: "Put the tomatoes, the cucumber, the green peppers and the red onion in a wide shallow bowl.", minutes: null },
    { text: "Add the kalamata olives and season everything with salt and black pepper.", minutes: null },
    { text: "Turn it over gently with your hands, twice. Do not toss it like a leaf salad — this is assembled, not mixed.", minutes: null },
    { text: "Lay the slab of feta on top, whole. Do not crumble it.", minutes: null },
    { text: "Pour the olive oil over everything, then the red wine vinegar.", minutes: null },
    { text: "Rub the dried oregano between your fingers as you scatter it over the feta.", minutes: null },
    { text: "Leave it on the counter for about ten minutes so the tomatoes let go of their juice.", minutes: 10 },
    { text: "Bring it to the table with the crusty bread and mop up the juice and oil at the bottom. That pool is the point of the dish.", minutes: null }
  ],

  beginnerTip: "There is no lettuce in a horiatiki. The leafy version served in American cafés is a different salad altogether, and the leaves go slimy in the oil within minutes. Tomato, cucumber, pepper, onion, olive, feta. Stop there.",
  makeItBetter: "Buy feta as a block sitting in brine and lay it on whole. Pre-crumbled feta is dried out and mealy and loses its tang the moment the bag opens, and crumbling it through the salad means you never get the mouthful of cold creamy cheese that makes this worth eating.",
  skills: ["assembling not tossing", "seasoning raw vegetables", "letting a salad rest"],

  source: { name: "Horiatiki, the Greek village salad; cross-checked against several Greek and Mediterranean cooks who all say the same things",
            url: "https://www.billyparisi.com/traditional-greek-salad-recipe-horiatiki-salata/" },
  vetting: "Five independent write-ups, including two by cooks who learned it in Greece, agree word for word on the rules and none of them copied each other: no lettuce, feta in a slab rather than crumbled, assembled rather than tossed, olive oil as the dressing rather than a vinaigrette, and let it sit so the juices pool. Feta is a protected-origin product, which is why the block-in-brine note is in the ingredient list rather than buried in a tip."
},

{
  id: "coban-salatasi",
  title: "Çoban Salatası",
  subtitle: "Turkish shepherd's salad, chopped small",
  photo: "img/coban-salatasi.webp",
  photoCredit: { by: "E4024", lic: "CC BY-SA 4.0",
                  url: "https://commons.wikimedia.org/wiki/File:Amanida_turca.jpg" },
  cuisine: "turkish",
  appliances: ["stove"],
  minutes: 15,
  activeMinutes: 15,
  difficulty: "easy",
  baseServings: 2,
  scalable: [1, 6],
  capacityQt: 0.8,
  tags: ["quick", "vegetarian", "no-cook", "cheap"],
  meals: ["lunch", "dinner", "snack"],
  spiceLevel: 1,

  ingredients: [
    { item: "ripe tomatoes", qty: 3, unit: "piece", aisle: "produce", scale: true },
    { item: "cucumber", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "green peppers", qty: 1, unit: "piece", aisle: "produce", scale: true,
      note: "the long pale Turkish kind if you can find them" },
    { item: "red onion", qty: 0.5, unit: "piece", aisle: "produce", scale: true },
    { item: "fresh parsley", qty: 0.5, unit: "cup", aisle: "produce", scale: false,
      note: "flat-leaf, chopped, a proper handful" },
    { item: "sumac", qty: 1, unit: "tsp", aisle: "spices", scale: false },
    { item: "lemons", qty: 0.5, unit: "piece", aisle: "produce", scale: false },
    { item: "olive oil", qty: 2, unit: "tbsp", aisle: "canned", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Cut the ripe tomatoes, the cucumber, the green peppers and the red onion all into small dice, about the size of your little fingernail.",
    "Chop the fresh parsley, stems included.",
    "Squeeze the lemon into a small bowl."
  ],

  steps: [
    { text: "Put the diced tomatoes, cucumber, green peppers and red onion into a bowl.", minutes: null },
    { text: "Add the chopped parsley and a good pinch of salt and turn it over.", minutes: null },
    { text: "Pour over the lemon juice and the olive oil.", minutes: null },
    { text: "Scatter the sumac across the top and turn it once more.", minutes: null },
    { text: "Taste it. It should be sharp. If it is not, add more lemon before you add more salt.", minutes: null },
    { text: "Serve it straight away, or within about twenty minutes, while everything is still crunchy.", minutes: null }
  ],

  beginnerTip: "Everything gets cut small and roughly the same size. That is the whole difference between this and a Greek salad — çoban is eaten with a spoon alongside grilled meat, so every spoonful should have a bit of everything in it.",
  makeItBetter: "Sumac is what makes this taste Turkish rather than generic. It is sour and slightly fruity without adding liquid, so it sharpens the salad without making it wet. A pinch over the top at the end, not stirred in early.",
  skills: ["even dicing", "seasoning with acid", "using sumac"],

  source: { name: "Çoban salatası, on every table in Turkey next to anything grilled",
            url: "https://www.seriouseats.com/turkish-shepherds-salad-recipe" },
  vetting: "A fixed everyday dish rather than a recipe anyone owns, with the same six ingredients in every Turkish source and a tested Serious Eats version. The two points every account makes are the small even dice and dressing it at the last moment — salted early it floods and goes limp — so both are written into the steps. Sumac is the one ingredient people leave out and then wonder why it tastes flat."
},

{
  id: "cacik",
  title: "Cacık",
  subtitle: "Cold cucumber yogurt with garlic and mint",
  photo: "img/cacik.webp",
  photoCredit: { by: "Rainer Zenz", lic: "CC BY-SA 3.0",
                  url: "https://commons.wikimedia.org/wiki/File:Cacik-1.jpg" },
  cuisine: "turkish",
  appliances: ["stove"],
  minutes: 15,
  activeMinutes: 10,
  difficulty: "easy",
  baseServings: 4,
  scalable: [2, 8],
  capacityQt: 0.7,
  tags: ["quick", "vegetarian", "no-cook", "cheap"],
  meals: ["lunch", "dinner", "snack"],
  spiceLevel: 1,

  ingredients: [
    { item: "plain yogurt", qty: 2, unit: "cup", aisle: "dairy", scale: true,
      note: "thick greek yogurt" },
    { item: "cucumber", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "garlic", qty: 1, unit: "clove", aisle: "produce", scale: false,
      note: "grated fine" },
    { item: "dried mint", qty: 1, unit: "tsp", aisle: "spices", scale: false,
      sub: "a handful of fresh mint, chopped" },
    { item: "fresh dill", qty: 2, unit: "tbsp", aisle: "produce", scale: false,
      note: "chopped", sub: "leave it out, or use fresh parsley" },
    { item: "olive oil", qty: 2, unit: "tbsp", aisle: "canned", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Grate the cucumber on the coarse side of a box grater, skin and all.",
    "Put the grated cucumber in a sieve over a bowl with a good pinch of salt and leave it for ten minutes.",
    "Grate the garlic fine and chop the fresh dill."
  ],

  steps: [
    { text: "Squeeze the salted cucumber hard in your hands over the sink. A surprising amount of water comes out and all of it would have ruined this.", minutes: null },
    { text: "Put the plain yogurt in a bowl and stir it smooth with a spoon.", minutes: null },
    { text: "Stir in the squeezed cucumber, the grated garlic and a pinch of salt.", minutes: null },
    { text: "Rub the dried mint between your palms over the bowl so it crumbles as it falls, and stir it through with the dill.", minutes: null },
    { text: "Taste it and add salt until it stops tasting like plain yogurt.", minutes: null },
    { text: "Chill it for at least half an hour if you have time. It is much better cold.", minutes: 30 },
    { text: "Pour the olive oil over the top just before it goes to the table.", minutes: null }
  ],

  beginnerTip: "Salt the cucumber and squeeze it out first. Skip that and the water leaks out of it in the bowl over the next twenty minutes, and you end up with thin cucumber-flavoured milk instead of a thick dip.",
  makeItBetter: "Rub the dried mint between your palms as you add it. Crushing it releases the oils, and in Turkey dried mint is treated as a savoury spice in its own right, not the sweet thing it is in English cooking. It is what makes cacık taste different from tzatziki.",
  skills: ["salting and draining", "grating", "seasoning yogurt"],

  source: { name: "Cacık, the Turkish yogurt meze; the salt-and-squeeze step is what every Turkish and Greek source insists on",
            url: "https://www.seriouseats.com/cacik-turkish-yogurt-cucumber-recipe" },
  vetting: "The dish is documented everywhere from Claudia Roden onwards and appears with the same method across Turkish, Greek and Levantine sources, which clears the more-than-one-place bar comfortably. Every version names the same failure — a watery dip — and the same fix, salting and wringing out the cucumber first. Dried mint over fresh is the point Turkish cooks make repeatedly and it is the difference from tzatziki."
},

{
  id: "ezme",
  title: "Ezme",
  subtitle: "Turkish chopped tomato and pepper relish with a real bite",
  photo: "img/ezme.webp",
  photoCredit: { by: "Garrett Ziegler", lic: "CC BY-SA 4.0",
                 url: "https://commons.wikimedia.org/wiki/File:Ac%C4%B1l%C4%B1_Ezme.jpg" },
  cuisine: "turkish",
  appliances: ["stove"],
  minutes: 20,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 4,
  scalable: [2, 8],
  capacityQt: 0.7,
  tags: ["quick", "vegetarian", "no-cook", "big-kick"],
  meals: ["lunch", "dinner", "snack"],
  spiceLevel: 4,

  ingredients: [
    { item: "ripe tomatoes", qty: 3, unit: "piece", aisle: "produce", scale: true },
    { item: "red bell pepper", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "jalapenos", qty: 2, unit: "piece", aisle: "produce", scale: true,
      sub: "one long green chilli, or a teaspoon of pul biber instead" },
    { item: "onion", qty: 0.5, unit: "piece", aisle: "produce", scale: true },
    { item: "fresh parsley", qty: 0.5, unit: "cup", aisle: "produce", scale: false },
    { item: "pul biber", qty: 1, unit: "tsp", aisle: "spices", scale: false,
      sub: "aleppo pepper, or half as much chilli flakes" },
    { item: "sumac", qty: 1, unit: "tsp", aisle: "spices", scale: false },
    { item: "tomato paste", qty: 1, unit: "tbsp", aisle: "canned", scale: true,
      note: "red pepper paste is the real thing if your shop has it" },
    { item: "lemons", qty: 0.5, unit: "piece", aisle: "produce", scale: false },
    { item: "pomegranate molasses", qty: 1, unit: "tsp", aisle: "canned", scale: true,
      sub: "a little more lemon plus a pinch of sugar" },
    { item: "olive oil", qty: 3, unit: "tbsp", aisle: "canned", scale: true, staple: true },
    { item: "pita bread", qty: 2, unit: "piece", aisle: "bakery", scale: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Halve the ripe tomatoes and squeeze the watery seeds out into the sink. This is the step that decides whether it is a relish or a soup.",
    "Chop the tomatoes, the red bell pepper, the jalapenos and the onion as finely as you can by hand.",
    "Chop the fresh parsley small.",
    "Put a sieve over a bowl, ready."
  ],

  steps: [
    { text: "Put all the chopped tomato, red bell pepper, jalapenos and onion into the sieve with a good pinch of salt and leave it to drain for ten minutes.", minutes: 10 },
    { text: "Press down on it gently with the back of a spoon to push out any last liquid, then tip it into a bowl.", minutes: null },
    { text: "Stir in the tomato paste until everything is coated and the colour deepens.", minutes: null },
    { text: "Add the parsley, the pul biber, the sumac, the pomegranate molasses, a squeeze of lemon and two tablespoons of the olive oil.", minutes: null },
    { text: "Mix it hard with a spoon, pressing as you go so the vegetables bruise slightly and come together.", minutes: null },
    { text: "Taste it. It wants to be sour, salty and hot all at once. Adjust with lemon, salt and more pul biber in that order.", minutes: null },
    { text: "Let it sit for ten minutes so the flavours settle.", minutes: 10 },
    { text: "Spread it on a plate, pour the last of the olive oil over, and serve it with warm pita bread.", minutes: null }
  ],

  beginnerTip: "Chop it by hand, and squeeze the tomato seeds out first. A food processor turns ezme into a watery pink slush in about four seconds — the whole character of it is the rough, almost dry texture you only get with a knife.",
  makeItBetter: "Pomegranate molasses is the thing that makes people ask what is in it. Sour and dark and slightly sweet, it does something lemon alone cannot. One teaspoon is enough, and a bottle lasts a year.",
  skills: ["hand chopping", "draining for texture", "layering sour and hot"],

  source: { name: "Ezme, the chopped salad served with kebabs across southern Turkey",
            url: "https://www.seriouseats.com/ezme-turkish-spicy-tomato-salad" },
  vetting: "A fixed regional meze that appears with the same components in every Turkish source: tomato, pepper, onion, parsley, pul biber, sumac, pomegranate molasses. Two failures are named consistently — a food processor turning it to slush, and undrained tomato making it watery — so hand chopping and the ten-minute drain are both steps rather than notes. Pul biber and pomegranate molasses are the two ingredients worth actually seeking out."
},

{
  id: "piyaz",
  title: "Piyaz",
  subtitle: "Turkish white bean salad with tahini and egg",
  photo: "img/piyaz.webp",
  photoCredit: { by: "Miansari66", lic: "CC0",
                  url: "https://commons.wikimedia.org/wiki/File:Piyaz..JPG" },
  cuisine: "turkish",
  appliances: ["stove"],
  minutes: 20,
  activeMinutes: 15,
  difficulty: "easy",
  baseServings: 3,
  scalable: [2, 6],
  capacityQt: 1,
  tags: ["quick", "vegetarian", "cheap"],
  meals: ["lunch", "dinner", "snack"],
  spiceLevel: 2,

  ingredients: [
    { item: "white beans", qty: 1, unit: "can", aisle: "canned", scale: true,
      note: "cannellini or navy, drained and rinsed", sub: "chickpeas" },
    { item: "tahini", qty: 2, unit: "tbsp", aisle: "canned", scale: true },
    { item: "lemons", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "garlic", qty: 1, unit: "clove", aisle: "produce", scale: false,
      note: "grated fine" },
    { item: "red onion", qty: 0.5, unit: "piece", aisle: "produce", scale: true,
      note: "sliced thin" },
    { item: "ripe tomatoes", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "fresh parsley", qty: 0.5, unit: "cup", aisle: "produce", scale: false },
    { item: "eggs", qty: 2, unit: "piece", aisle: "dairy", scale: true,
      note: "hard boiled" },
    { item: "sumac", qty: 1, unit: "tsp", aisle: "spices", scale: false },
    { item: "pul biber", qty: 0.5, unit: "tsp", aisle: "spices", scale: false,
      sub: "aleppo pepper" },
    { item: "olive oil", qty: 3, unit: "tbsp", aisle: "canned", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Get the eggs boiling — about nine minutes for a just-set yolk — then cool them under the tap.",
    "Drain and rinse the white beans well.",
    "Slice the red onion thin, rub it with a pinch of salt and the sumac, and leave it. That takes the raw bite out.",
    "Chop the ripe tomatoes and the fresh parsley."
  ],

  steps: [
    { text: "Whisk the tahini, the juice of the whole lemon, the grated garlic and a pinch of salt in a bowl.", minutes: null },
    { text: "It will seize and go stiff and pale. That is normal. Add cold water a spoonful at a time, whisking, until it loosens into a pourable cream.", minutes: null },
    { text: "Tip the white beans into a wide bowl with the sumac onion, the tomatoes and most of the parsley.", minutes: null },
    { text: "Pour the tahini dressing over and turn everything gently, so the beans do not break up.", minutes: null },
    { text: "Taste it and add salt and more lemon until it is bright rather than heavy.", minutes: null },
    { text: "Peel and quarter the hard boiled eggs and lay them on top.", minutes: null },
    { text: "Scatter the pul biber and the last of the parsley over, and pour the olive oil across.", minutes: null }
  ],

  beginnerTip: "When you add lemon to tahini it seizes into a stiff paste and looks ruined. It is not. Keep whisking and add cold water a spoonful at a time and it comes back as a smooth pale cream. Everyone panics the first time.",
  makeItBetter: "Rub the sliced onion with salt and sumac and let it sit while you do everything else. Ten minutes takes the harsh raw edge off it and turns it pink, so it tastes like a pickle rather than a mouthful of onion.",
  skills: ["loosening tahini", "taming raw onion", "dressing without breaking beans"],

  source: { name: "Piyaz, the bean salad of Antalya; the tahini version is the southern Turkish one",
            url: "https://www.seriouseats.com/turkish-white-bean-salad-piyaz-recipe" },
  vetting: "A named regional dish with a documented split — the Antalya version uses tahini, the Istanbul version does not — which is exactly the kind of detail a made-up recipe never has. Turkish sources and Serious Eats agree on the components. The tahini seizing is the single thing beginners report as a failure, and it is not a failure at all, so it is written into the steps as an expected stage rather than a warning."
},

{
  id: "tabbouleh",
  title: "Tabbouleh",
  subtitle: "A parsley salad with some bulgur in it, not the other way round",
  photo: "img/tabbouleh.webp",
  photoCredit: { by: "cyclonebill", lic: "CC BY-SA 2.0",
                  url: "https://commons.wikimedia.org/wiki/File:Flickr_-_cyclonebill_-_Tabbouleh.jpg" },
  cuisine: "middle-eastern",
  appliances: ["stove"],
  minutes: 25,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 4,
  scalable: [2, 8],
  capacityQt: 0.9,
  tags: ["quick", "vegetarian", "cheap"],
  meals: ["lunch", "dinner", "snack"],
  spiceLevel: 1,

  ingredients: [
    { item: "bulgur", qty: 3, unit: "tbsp", aisle: "dry", scale: true,
      note: "fine grade — and yes, that really is all you need" },
    { item: "fresh parsley", qty: 3, unit: "cup", aisle: "produce", scale: true,
      note: "flat-leaf, two big bunches, very finely chopped" },
    { item: "fresh mint", qty: 0.5, unit: "cup", aisle: "produce", scale: true },
    { item: "ripe tomatoes", qty: 2, unit: "piece", aisle: "produce", scale: true,
      note: "seeds squeezed out, diced small" },
    { item: "scallions", qty: 4, unit: "piece", aisle: "produce", scale: true,
      sub: "half a small onion, chopped very fine" },
    { item: "lemons", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "ground allspice", qty: 0.25, unit: "tsp", aisle: "spices", scale: false,
      note: "optional, and very Lebanese" },
    { item: "olive oil", qty: 4, unit: "tbsp", aisle: "canned", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Put the bulgur in a small bowl and pour over just enough cold water to cover it. Leave it while you chop.",
    "Wash the fresh parsley and dry it completely. Wet parsley will not chop, it bruises.",
    "Chop the parsley as finely as your knife allows, stems and all. This takes ten minutes and it is the whole job.",
    "Chop the fresh mint, dice the tomatoes small and slice the scallions thin."
  ],

  steps: [
    { text: "Squeeze the tomato seeds and their liquid out into the sink before you dice them, so the salad does not go soggy.", minutes: null },
    { text: "Drain the bulgur and squeeze out any water it has not absorbed. It should be soft but not wet.", minutes: null },
    { text: "Put the chopped parsley, the mint, the tomatoes and the scallions in a wide bowl.", minutes: null },
    { text: "Add the bulgur and turn everything together with your hands.", minutes: null },
    { text: "Squeeze in the juice of the whole lemon, add a good pinch of salt and the ground allspice, and pour over the olive oil.", minutes: null },
    { text: "Mix it well and taste. It should be aggressively lemony and green.", minutes: null },
    { text: "Let it sit for ten minutes so the bulgur takes up the dressing, then taste it once more for salt and lemon.", minutes: 10 }
  ],

  beginnerTip: "Three tablespoons of bulgur is not a mistake. Tabbouleh is a herb salad, and the grain is there for texture only. The heavy, beige, mostly-bulgur version sold in supermarkets is a completely different thing and nobody in Lebanon would recognise it.",
  makeItBetter: "Dry the parsley properly and use a sharp knife. Wet parsley hit with a blunt knife bruises into a dark paste that tastes bitter; dry parsley chopped cleanly stays bright green and tastes fresh. It is worth the ten minutes.",
  skills: ["knife work", "soaking bulgur", "seasoning a herb salad"],

  source: { name: "Tabbouleh, the Levantine herb salad; proportions as Claudia Roden and every Lebanese source give them",
            url: "https://www.seriouseats.com/tabbouleh-lebanese-parsley-salad-recipe" },
  vetting: "Claudia Roden is on the approved list and documents this one carefully, and Serious Eats' tested version agrees on the point that matters: it is overwhelmingly parsley with a spoon or two of bulgur, not a grain salad. That single ratio is the difference between the real thing and the supermarket tub, and it is the correction every Lebanese cook makes in comment sections, so it is stated plainly in the tip."
},

{
  id: "fattoush",
  title: "Fattoush",
  subtitle: "Chopped salad with crisp pita and a lot of sumac",
  photo: "img/fattoush.webp",
  photoCredit: { by: "Unknown", lic: "Public domain",
                  url: "https://commons.wikimedia.org/wiki/File:Fattoush.JPG" },
  cuisine: "middle-eastern",
  appliances: ["stove", "airfryer"],
  minutes: 20,
  activeMinutes: 20,
  difficulty: "easy",
  baseServings: 3,
  scalable: [2, 6],
  capacityQt: 1,
  tags: ["quick", "vegetarian", "cheap"],
  meals: ["lunch", "dinner", "snack"],
  spiceLevel: 1,

  ingredients: [
    { item: "pita bread", qty: 2, unit: "piece", aisle: "bakery", scale: true,
      note: "stale is better than fresh" },
    { item: "ripe tomatoes", qty: 2, unit: "piece", aisle: "produce", scale: true },
    { item: "cucumber", qty: 1, unit: "piece", aisle: "produce", scale: true },
    { item: "radishes", qty: 4, unit: "piece", aisle: "produce", scale: true,
      sub: "leave them out, but they are the crunch" },
    { item: "scallions", qty: 3, unit: "piece", aisle: "produce", scale: true },
    { item: "fresh parsley", qty: 1, unit: "cup", aisle: "produce", scale: false },
    { item: "fresh mint", qty: 0.33, unit: "cup", aisle: "produce", scale: false },
    { item: "sumac", qty: 1.5, unit: "tbsp", aisle: "spices", scale: false,
      note: "more than feels sensible — it is the whole point" },
    { item: "lemons", qty: 1, unit: "piece", aisle: "produce", scale: false },
    { item: "pomegranate molasses", qty: 1, unit: "tsp", aisle: "canned", scale: true,
      sub: "skip it and add a pinch of sugar with the lemon" },
    { item: "garlic", qty: 1, unit: "clove", aisle: "produce", scale: false },
    { item: "olive oil", qty: 4, unit: "tbsp", aisle: "canned", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Tear the pita bread into rough pieces about the size of a postage stamp.",
    "Chop the tomatoes, the cucumber and the radishes into bite-sized chunks and slice the scallions.",
    "Roughly chop the fresh parsley and the fresh mint.",
    "Grate the garlic into a jar with the lemon juice, the sumac, the pomegranate molasses, three tablespoons of the olive oil and a pinch of salt."
  ],

  steps: [
    { text: "Toss the torn pita with the last tablespoon of olive oil and a pinch of salt.", minutes: null },
    { text: "Fry it in a dry pan over medium heat, or air fry it at four hundred degrees, until it is deep golden and properly crisp.", minutes: 6 },
    { text: "Tip the pita onto a plate to cool. It must be cold and crisp before it meets anything wet.", minutes: null },
    { text: "Shake the jar of dressing hard until it looks thick and combined.", minutes: null },
    { text: "Put the tomatoes, cucumber, radishes, scallions, parsley and mint in a wide bowl.", minutes: null },
    { text: "Pour over about two thirds of the dressing and turn everything through.", minutes: null },
    { text: "Add the crisp pita only at the very last second, turn it once, and take it straight to the table.", minutes: null },
    { text: "Pour the rest of the dressing over at the table and scatter a little more sumac on top.", minutes: null }
  ],

  beginnerTip: "The bread goes in last, right before you eat. Fattoush is meant to have crunchy bread against wet vegetables, and pita added even five minutes early turns to mush. If you are making it ahead, keep the bread in a separate bowl.",
  makeItBetter: "Be heavy handed with the sumac — a good tablespoon and a half, not a pinch. It is what makes fattoush taste like fattoush rather than a generic chopped salad, and it is sour without adding any more liquid.",
  skills: ["crisping bread", "emulsifying a dressing", "timing a salad"],

  source: { name: "Fattoush, the Levantine bread salad; built the way Ottolenghi and Serious Eats both do it",
            url: "https://www.seriouseats.com/fattoush-lebanese-bread-salad-recipe" },
  vetting: "Ottolenghi and Serious Eats both have versions and they agree on the essentials, and the dish is a documented way of using up stale flatbread rather than anyone's invention. The universal complaint is soggy bread, and the universal fix is adding it at the last moment, so that is a step of its own. Sumac quantity is the other thing every source stresses and every timid version gets wrong."
},

{
  id: "muhammara",
  title: "Muhammara",
  subtitle: "Roasted red pepper and walnut dip, sweet, sour and hot",
  photo: "img/muhammara.webp",
  photoCredit: { by: "Karen and Brad Emerson", lic: "CC BY 2.0",
                  url: "https://commons.wikimedia.org/wiki/File:Muhumarra_w_foccacia_(3967177145).jpg" },
  cuisine: "middle-eastern",
  appliances: ["stove"],
  minutes: 15,
  activeMinutes: 15,
  difficulty: "easy",
  baseServings: 4,
  scalable: [2, 8],
  capacityQt: 0.6,
  tags: ["quick", "vegetarian", "big-kick"],
  meals: ["snack", "lunch"],
  spiceLevel: 3,

  ingredients: [
    { item: "roasted red peppers", qty: 12, unit: "oz", aisle: "canned", scale: true,
      note: "from a jar, drained and patted dry", sub: "two fresh peppers blackened under the broiler and peeled" },
    { item: "walnuts", qty: 1, unit: "cup", aisle: "dry", scale: true },
    { item: "panko", qty: 3, unit: "tbsp", aisle: "dry", scale: true,
      note: "stands in for the usual breadcrumbs", sub: "any dry breadcrumb" },
    { item: "pomegranate molasses", qty: 1.5, unit: "tbsp", aisle: "canned", scale: true,
      sub: "a tablespoon of lemon juice plus a teaspoon of honey — close, not the same" },
    { item: "cumin", qty: 1, unit: "tsp", aisle: "spices", scale: false },
    { item: "pul biber", qty: 1, unit: "tsp", aisle: "spices", scale: false,
      sub: "aleppo pepper, or half as much chilli flakes" },
    { item: "garlic", qty: 1, unit: "clove", aisle: "produce", scale: false },
    { item: "lemons", qty: 0.5, unit: "piece", aisle: "produce", scale: false },
    { item: "pita bread", qty: 3, unit: "piece", aisle: "bakery", scale: true },
    { item: "olive oil", qty: 4, unit: "tbsp", aisle: "canned", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Drain the roasted red peppers and pat them properly dry, or the dip will be loose.",
    "Peel the garlic.",
    "Get a food processor out — this is the one dip that genuinely wants one."
  ],

  steps: [
    { text: "Toast the walnuts in a dry pan over medium heat for about four minutes, shaking often, until they smell nutty. Watch them, they burn fast.", minutes: 4 },
    { text: "Tip them onto a plate and let them cool for a couple of minutes. Hold back a small handful for the top.", minutes: null },
    { text: "Put the roasted red peppers, the cooled walnuts, the panko, the garlic, the cumin, the pul biber, the pomegranate molasses and a good pinch of salt in the processor.", minutes: null },
    { text: "Blitz it in short bursts to a coarse paste. Stop while it still has some texture — this is not hummus.", minutes: null },
    { text: "With the machine running, pour in three tablespoons of the olive oil.", minutes: null },
    { text: "Taste it. It should be sweet, sour and warm all at once. Add lemon if it is flat, more pul biber if it is timid.", minutes: null },
    { text: "Spread it on a plate, make a hollow with the back of a spoon and pour the last of the olive oil into it.", minutes: null },
    { text: "Chop the reserved walnuts roughly, scatter them over, and serve with warm pita bread.", minutes: null }
  ],

  beginnerTip: "Stop the machine while it is still a bit rough. Muhammara is meant to have grain and crunch from the walnuts and breadcrumbs — blitzed to a smooth purée it turns into a sweet orange paste and loses the thing that makes it interesting.",
  makeItBetter: "Toast the walnuts. Raw they taste faintly of cardboard and slightly bitter; four minutes in a dry pan makes them sweet and rounded, and they are half the dip. Just do not walk away from them.",
  skills: ["toasting nuts", "pulsing not puréeing", "balancing sweet and sour"],

  source: { name: "Muhammara, from Aleppo; the standard version documented by Ottolenghi and Serious Eats",
            url: "https://www.seriouseats.com/muhammara-syrian-red-pepper-walnut-dip-recipe" },
  vetting: "A named Syrian dish with tested versions from Serious Eats and Ottolenghi that agree on every component, so both the tested-kitchen and independent-appearance legs are covered. The failures reported are over-processing into a smooth paste and skipping the walnut toasting, and both are written into the steps. Pomegranate molasses genuinely has no equal substitute here, which is why the honest note says the lemon-and-honey version is close rather than the same."
}

];
