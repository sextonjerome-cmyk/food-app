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
    { text: "Scatter the feta and the cilantro over the top and bring the pan to the table.", minutes: null }
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
  photo: null,
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

  ingredients: [
    { item: "green peppers", qty: 2, unit: "piece", aisle: "produce", scale: true,
      note: "long thin Turkish or Italian frying peppers if you can get them",
      sub: "one green bell pepper, but the flavour is milder" },
    { item: "ripe tomatoes", qty: 3, unit: "piece", aisle: "produce", scale: true,
      sub: "a fourteen ounce can of chopped tomatoes, drained of most of its juice" },
    { item: "eggs", qty: 4, unit: "piece", aisle: "dairy", scale: true },
    { item: "aleppo pepper", qty: 1, unit: "tsp", aisle: "spices", scale: true,
      note: "pul biber", sub: "half a teaspoon of paprika and a pinch of chilli flakes" },
    { item: "white cheese", qty: 2, unit: "oz", aisle: "dairy", scale: true,
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
    { text: "Take the pan off the heat straight away and crumble the cheese over the top.", minutes: null }
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
    { item: "neutral oil", qty: 2, unit: "tbsp", aisle: "other", scale: true, staple: true },
    { item: "salt", qty: null, unit: null, aisle: "spices", scale: false, staple: true }
  ],

  misePlace: [
    "Start the rice first. Everything else takes less time than it does.",
    "Toast the sichuan peppercorns in a dry pan over medium-low heat for about two minutes, until you can smell them, then grind them to a powder and set them aside.",
    "Cut the tofu into half-inch cubes and slide them into a pot of gently salted, barely simmering water. Leave them there until you need them.",
    "Mince the garlic. Slice the spring onions.",
    "Stir the cornstarch into one tablespoon of cold water in a small cup.",
    "Measure the stock, the wine, the soy sauce and the sugar into one bowl together."
  ],

  steps: [
    { text: "Heat the neutral oil in a wok or a wide pan over medium-high heat and cook the pork, breaking it up, for about two minutes until it is no longer pink.", minutes: 2 },
    { text: "Turn the heat down to medium and add the chilli bean paste.", minutes: null },
    { text: "Fry the paste slowly for about three minutes, until the oil in the pan turns deep red. This is the most important minute of the dish.", minutes: 3 },
    { text: "Add the garlic and stir it around for one minute.", minutes: 1 },
    { text: "Pour in the stock mixture and let it simmer for two minutes. Taste it — it should be slightly under-salted.", minutes: 2 },
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
    { text: "Lay a slice of cheese on each patty and cook for thirty seconds more, then stack one patty on the other.", minutes: null },
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
    "Soften the butter in a small bowl and mash the garlic, zest and parsley into it."
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
    "Cut the guanciale into strips about as thick as your little finger.",
    "Tip the tomatoes into a bowl and crush them with your hands. Pull out any hard white cores.",
    "Grate the cheese finely and leave it in a bowl by the stove.",
    "Put a big pot of water on to boil and salt it like the sea."
  ],

  steps: [
    { text: "Put the guanciale in a cold, dry pan and only then turn the heat to medium.", minutes: null },
    { text: "Let it cook for about six minutes, until the fat has run out and the meat is browned and crisp at the edges.", minutes: 6 },
    { text: "Lift the meat out with a slotted spoon and put it on a plate.", minutes: null },
    { text: "Pour the fat into a small bowl, wipe any burnt specks out of the pan, then pour the clean fat back in.", minutes: null },
    { text: "Add the chilli flakes and let them sizzle in the fat for about thirty seconds.", minutes: null },
    { text: "Pour in the wine and let it bubble away to almost nothing.", minutes: null },
    { text: "Add the crushed tomatoes and simmer gently for about twelve minutes, until the sauce is thick and darker red.", minutes: 12 },
    { text: "Meanwhile, boil the pasta one minute less than the packet says.", minutes: 9 },
    { text: "Scoop out a mug of the pasta water before you drain anything.", minutes: null },
    { text: "Drop the drained pasta straight into the sauce with a splash of the pasta water and toss it over medium heat for one minute.", minutes: 1 },
    { text: "Now take the pan completely off the heat and count slowly to ten.", minutes: null },
    { text: "Add the cheese a handful at a time, tossing the pan rather than stirring, until the sauce turns glossy and clings to the pasta.", minutes: null },
    { text: "Loosen it with a little more pasta water if it looks tight, then fold the crisp meat back in and grind pepper over the top.", minutes: null }
  ],

  beginnerTip: "The cheese goes in off the heat, and that is not fussiness. Pecorino hitting a hot pan seizes into stringy knots instead of melting, and once it has done that you cannot bring it back. Take the pan off the stove, wait ten seconds, then add the cheese in handfuls and keep the pasta moving.",
  makeItBetter: "Toss the pan instead of stirring it. Sliding the pasta up the side and back down is what whips the starchy water and the cheese fat into an actual sauce — stirring in circles just moves it around. Grate the cheese yourself too: the anti-caking powder on pre-grated cheese is exactly what makes a sauce go grainy.",
  skills: ["rendering fat", "emulsifying a pan sauce", "using pasta water"],

  source: { name: "Pasta all'Amatriciana — the Roman classic; technique cross-checked against Saveur, America's Test Kitchen's Cook's Country and several independent write-ups",
            url: "https://www.americastestkitchen.com/cookscountry/recipes/14020-bucatini-all-amatriciana" },
  vetting: "The dish clears on independence and on real discussion. It carries tested versions at Saveur and Cook's Country and turns up in a dozen unconnected kitchens, and the failure everybody reports is the same one: the pecorino seizes into strings instead of melting. Several unrelated sources — including a physics write-up on the sauce — land on the same fix, which is off the heat, cooler starchy water, and tossing rather than stirring. That fix is written into the steps. The cold-pan render and wiping the burnt fat out before the tomatoes go in come from cooks who found the sauce turned bitter otherwise. Guanciale is hard to buy in Charleston, so bacon is offered as a substitution with an honest note that it makes the dish smoky."
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
    { item: "cooking oil", qty: 2, unit: "tbsp", aisle: "other", scale: true, staple: true },
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
    "Pat the thighs bone dry with paper towel.",
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

];
