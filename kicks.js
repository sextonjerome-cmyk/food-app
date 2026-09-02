/* ==========================================================================
   Frigo — the kicks.

   A standard recipe, and one button that says "make it braver". Every entry
   here is a real finishing move a cook would recognise, not "add more chilli":
   fat carries chilli, acid wakes a heavy sauce, a bloomed spice tastes of the
   spice instead of dust. That is the whole point of the button.

   Data only. No logic. Shape:

     name      what it is called, in plain words
     needs     ingredient names, spelled EXACTLY as in ingredients.js — a kick
               is only ever offered if all of these are ticked in the kitchen
     cuisines  which cuisines it suits; ['any'] means it always fits
     heat      1-5. Sorted so the ones nearest his spice dial come first
     how       what to do. Written as an instruction, no measurements he'd have
               to convert, and readable with one hand on a pan
     why       the one line that says what it does to the food
     notWith   skip the suggestion if the recipe already has any of these

   A kick is never offered for a recipe that already contains everything it
   needs — telling him to add chilli flakes to a chilli-flake recipe is how a
   feature stops being trusted.
   ========================================================================== */
window.KICKS = [

/* ------------------------------------------------------------ butter and fat */
{
  name: "Harissa butter, spooned over at the end",
  needs: ["harissa"],
  cuisines: ["middle-eastern", "turkish", "french", "american"],
  heat: 3,
  how: "Melt a big knob of butter in a small pan, stir in a spoonful of harissa, let it bubble for about thirty seconds and spoon it over the finished dish.",
  why: "Chilli is fat-soluble, so warming harissa in butter spreads the heat evenly instead of leaving raw hot spots.",
  notWith: ["harissa", "aleppo pepper", "pul biber"]
},
{
  name: "Chilli crisp, straight from the jar",
  needs: ["chilli crisp"],
  cuisines: ["asian", "american"],
  heat: 3,
  how: "Spoon a teaspoon over each plate right before it goes to the table. Don't stir it in — you want the crunch.",
  why: "It adds heat, salt, crunch and toasted garlic in one move, and it lands on top so every bite is different.",
  notWith: ["chilli crisp"]
},
{
  name: "Black pepper and butter, off the heat",
  needs: ["butter"],
  cuisines: ["french", "american", "any"],
  heat: 1,
  how: "Take the pan off the heat. Drop in a cold knob of butter and swirl the pan until it disappears into the sauce, then grind in far more black pepper than feels sensible.",
  why: "Cold butter swirled off the heat thickens a sauce and makes it glossy. This is what restaurant sauces are doing that yours isn't.",
  notWith: []
},
{
  name: "Brown the butter first",
  needs: ["butter"],
  cuisines: ["french", "american", "any"],
  heat: 1,
  how: "Before anything else goes in, let the butter keep cooking past the foaming stage until it smells nutty and the flecks at the bottom turn golden brown. Then carry on with the recipe.",
  why: "Browning turns the milk solids toasty. It costs you two minutes and tastes like it took an hour.",
  notWith: []
},

/* --------------------------------------------------------- blooming spices */
{
  name: "Bloom the cumin and coriander",
  needs: ["cumin", "coriander"],
  cuisines: ["middle-eastern", "turkish", "asian", "other"],
  heat: 1,
  how: "Warm a spoon of oil in a small pan, add a teaspoon of cumin and half as much coriander, and swirl for about forty seconds until it smells like a spice shop. Pour the lot in near the end.",
  why: "Ground spice tipped into liquid tastes dusty. Thirty seconds in hot fat is what actually wakes it up.",
  notWith: []
},
{
  name: "Smoked paprika, bloomed in oil",
  needs: ["smoked paprika"],
  cuisines: ["american", "french", "middle-eastern", "other"],
  heat: 1,
  how: "Off the heat, stir a teaspoon of smoked paprika into a spoon of warm oil, then swirl that through the dish. Off the heat matters — paprika burns fast and turns bitter.",
  why: "It puts a smoky, almost barbecued edge into a dish that never went near a fire.",
  notWith: ["smoked paprika"]
},
{
  name: "Sizzled garlic and chilli oil",
  needs: ["garlic", "chilli flakes"],
  cuisines: ["any"],
  heat: 3,
  how: "Slice two cloves of garlic thin. Fry them gently in a few spoons of oil until they're pale gold, take the pan off the heat, throw in a big pinch of chilli flakes and pour it all over the dish.",
  why: "The classic finishing oil. Pull the garlic while it's still pale — it keeps browning in the hot oil after the heat is off.",
  notWith: []
},
{
  name: "Toasted sichuan peppercorns",
  needs: ["sichuan peppercorns"],
  cuisines: ["asian"],
  heat: 3,
  how: "Toast a teaspoon of peppercorns in a dry pan for a minute until they smell citrusy, crush them roughly, and scatter over at the end.",
  why: "It isn't heat, it's the numbing tingle underneath the heat. That buzz is what makes Sichuan food taste like Sichuan food.",
  notWith: ["sichuan peppercorns"]
},
{
  name: "Whole fennel seeds, cracked",
  needs: ["fennel seeds"],
  cuisines: ["french", "american", "other"],
  heat: 1,
  how: "Toast a teaspoon of fennel seeds in a dry pan for a minute, crush them under the flat of a knife, and stir them in with the aromatics.",
  why: "Fennel and pork or tomato is one of those pairings that tastes deliberate. It's the flavour in good Italian sausage.",
  notWith: ["fennel"]
},

/* ------------------------------------------------------------ pastes and jars */
{
  name: "A spoon of gochujang in the sauce",
  needs: ["gochujang"],
  cuisines: ["asian", "american"],
  heat: 3,
  how: "Whisk a heaped teaspoon into the sauce while it's still simmering, and taste before you add a second.",
  why: "It brings sweet, funky and hot all at once, and it thickens a thin sauce at the same time.",
  notWith: ["gochujang"]
},
{
  name: "Miso, stirred in off the heat",
  needs: ["miso paste"],
  cuisines: ["asian", "french", "american"],
  heat: 1,
  how: "Take the pan off the heat, loosen a teaspoon of miso with a spoon of the hot cooking liquid in a small bowl, then stir that back in.",
  why: "Deep savoury depth with no fish and no meat. Boiling it kills the flavour, which is why it goes in last.",
  notWith: ["miso"]
},
{
  name: "Sichuan chilli bean paste, fried in first",
  needs: ["sichuan chilli bean paste"],
  cuisines: ["asian"],
  heat: 4,
  how: "Fry a heaped teaspoon in the oil for a good minute before anything else goes in, until the oil turns red.",
  why: "The red oil is the flavour. Adding the paste at the end leaves it tasting raw and salty.",
  notWith: ["chilli bean paste", "doubanjiang"]
},
{
  name: "Thai curry paste, fried in the fat",
  needs: ["thai curry paste"],
  cuisines: ["asian"],
  heat: 3,
  how: "Fry a spoon of the paste in oil for a minute or two before the liquid goes in, until it darkens and smells strong.",
  why: "Curry paste dropped into liquid tastes flat. Fried in fat first, it opens right up.",
  notWith: ["curry paste"]
},
{
  name: "Sriracha and honey, brushed on at the end",
  needs: ["sriracha", "honey"],
  cuisines: ["asian", "american"],
  heat: 3,
  how: "Mix equal spoons of sriracha and honey. Brush it on in the last two minutes of cooking, not before, or the sugar burns.",
  why: "Sweet and hot with a lacquered finish. Every sticky-glaze recipe is doing some version of this.",
  notWith: ["sriracha", "hot honey"]
},

/* --------------------------------------------------------------- acid at the end */
{
  name: "A squeeze of lemon, right at the end",
  needs: ["lemons"],
  cuisines: ["any"],
  heat: 1,
  how: "Off the heat, squeeze in half a lemon and taste. If it tastes brighter but not sour, that was the right amount.",
  why: "The single most reliable fix for food that tastes heavy or flat. Acid isn't a flavour here, it's a volume knob for everything else.",
  notWith: []
},
{
  name: "Lime and fresh cilantro over the top",
  needs: ["limes", "fresh cilantro"],
  cuisines: ["asian", "american", "other"],
  heat: 1,
  how: "Squeeze lime over the finished plate and throw on a rough handful of torn cilantro. Stems included — they have more flavour than the leaves.",
  why: "A hot, rich dish needs something raw and sharp landing on top of it.",
  notWith: []
},
{
  name: "Sumac over the finished plate",
  needs: ["sumac"],
  cuisines: ["middle-eastern", "turkish"],
  heat: 1,
  how: "Scatter a generous pinch over everything just before it goes to the table.",
  why: "Sour and fruity without any liquid, so it sharpens the dish without loosening the sauce. It's why Turkish grills taste like they do.",
  notWith: ["sumac"]
},
{
  name: "A splash of vinegar in the pan",
  needs: ["red wine vinegar"],
  cuisines: ["french", "american", "any"],
  heat: 1,
  how: "In the last minute, splash a tablespoon into the hot pan and let it hiss away for twenty seconds before you stir it through.",
  why: "Cooking it off for a moment takes away the raw sting and leaves the brightness behind.",
  notWith: ["vinegar"]
},
{
  name: "Pickle juice, believe it or not",
  needs: ["pickles"],
  cuisines: ["american"],
  heat: 1,
  how: "Stir a tablespoon of the brine straight from the pickle jar into the sauce at the end, and taste.",
  why: "Sour and salty at once. It's the trick behind a lot of American diner food tasting more addictive than it should.",
  notWith: []
},

/* ------------------------------------------------------- chilli, plain and simple */
{
  name: "Aleppo pepper, over the top",
  needs: ["aleppo pepper"],
  cuisines: ["middle-eastern", "turkish"],
  heat: 2,
  how: "Scatter a good pinch over the finished dish, and another pinch into any yogurt or sauce going alongside.",
  why: "Fruity and raisin-sweet with a slow, gentle warmth. It flavours the food instead of just burning it.",
  notWith: ["aleppo", "pul biber", "harissa"]
},
{
  name: "Pul biber, warmed in oil",
  needs: ["pul biber"],
  cuisines: ["turkish", "middle-eastern"],
  heat: 2,
  how: "Warm a spoon of oil or butter, take it off the heat, stir in a teaspoon of pul biber until the oil turns red, and drizzle it over.",
  why: "The Turkish red-oil finish. It makes the plate look like it came out of a proper kitchen, and it carries the heat evenly.",
  notWith: ["pul biber", "aleppo", "harissa"]
},
{
  name: "Fresh jalapeno, sliced raw",
  needs: ["jalapenos"],
  cuisines: ["american", "asian", "other"],
  heat: 3,
  how: "Slice one thin and scatter it raw over the top. Seeds in for the full hit, scraped out if you'd rather it stayed friendly.",
  why: "Raw chilli is a completely different heat from cooked — sharp and green, and it cuts through anything rich.",
  notWith: ["jalapeno"]
},
{
  name: "Cayenne, in with the salt",
  needs: ["cayenne pepper"],
  cuisines: ["any"],
  heat: 4,
  how: "Add a quarter teaspoon along with the salt, early on. Start there — cayenne is roughly six times hotter than chilli flakes.",
  why: "Seasoning early puts the heat inside the food rather than sitting on top of it.",
  notWith: ["cayenne"]
},
{
  name: "Hot sauce stirred through, not shaken on",
  needs: ["hot sauce"],
  cuisines: ["american"],
  heat: 2,
  how: "Stir a teaspoon into the sauce while it cooks instead of splashing it on the plate at the end.",
  why: "Most hot sauce is mainly vinegar, so it seasons the whole dish. Shaken on afterwards it only ever hits the top layer.",
  notWith: ["hot sauce"]
},

/* ---------------------------------------------------------- savoury depth */
{
  name: "A dash of fish sauce",
  needs: ["fish sauce"],
  cuisines: ["asian"],
  heat: 1,
  how: "Stir in a teaspoon near the end. It'll smell alarming for a second and then vanish into the dish.",
  why: "It doesn't taste fishy in the finished food — it just makes everything taste more of itself. Use it anywhere you'd reach for extra salt.",
  notWith: ["fish sauce"]
},
{
  name: "Soy sauce and a scrape of the pan",
  needs: ["soy sauce"],
  cuisines: ["asian", "american"],
  heat: 1,
  how: "Splash a tablespoon into the hot empty pan and scrape up every brown bit with a wooden spoon before the sauce goes back in.",
  why: "Those brown bits are the best flavour in the pan, and they're the thing beginners tip down the sink.",
  notWith: ["soy sauce"]
},
{
  name: "Worcestershire, half a spoon",
  needs: ["worcestershire sauce"],
  cuisines: ["american", "french"],
  heat: 1,
  how: "Stir half a tablespoon into anything beefy, tomatoey or brown, about five minutes before the end.",
  why: "Anchovy, tamarind and vinegar in one bottle. Nobody tastes Worcestershire — they just say the stew tastes better than usual.",
  notWith: ["worcestershire"]
},
{
  name: "Anchovy, melted into the fat",
  needs: ["anchovies"],
  cuisines: ["french", "american", "other"],
  heat: 1,
  how: "Drop one fillet into the hot oil with the garlic and mash it with the back of the spoon until it dissolves completely.",
  why: "Once it melts, there is no fish left to taste — only savoury depth. This is the oldest trick in the Mediterranean.",
  notWith: ["anchov"]
},
{
  name: "Parmesan rind in the pot",
  needs: ["parmesan"],
  cuisines: ["french", "american", "other"],
  heat: 1,
  how: "Drop the hard rind off a wedge of parmesan into any soup, stew or sauce as it simmers, and fish it out before serving.",
  why: "It gives up savoury depth into the liquid for free, out of a piece most people throw away.",
  notWith: []
},

/* --------------------------------------------------------- herbs and finishes */
{
  name: "Za'atar and good oil over the top",
  needs: ["za'atar"],
  cuisines: ["middle-eastern", "turkish"],
  heat: 1,
  how: "Drizzle olive oil over the finished dish, then scatter za'atar across it so it sticks.",
  why: "Herby, sour and sesame-nutty all at once. The oil is what makes it cling instead of blowing off the plate.",
  notWith: ["za'atar"]
},
{
  name: "Dried mint, rubbed between your palms",
  needs: ["dried mint"],
  cuisines: ["turkish", "middle-eastern"],
  heat: 1,
  how: "Rub a good pinch between your palms over the pan so it crumbles as it falls.",
  why: "Crushing it releases the oils. Dried mint is a savoury spice in Turkish cooking, not a sweet one — it lifts yogurt, lentils and lamb.",
  notWith: ["mint"]
},
{
  name: "A whole handful of parsley, not a garnish",
  needs: ["fresh parsley"],
  cuisines: ["french", "middle-eastern", "turkish", "american"],
  heat: 1,
  how: "Chop a proper fistful, stems and all, and stir it through at the very end. Ten times what a recipe photo would show.",
  why: "In quantity, parsley stops being decoration and becomes an ingredient — fresh and grassy against anything rich.",
  notWith: []
},
{
  name: "Toasted sesame seeds",
  needs: ["sesame seeds"],
  cuisines: ["asian", "middle-eastern"],
  heat: 1,
  how: "Toast a spoonful in a dry pan, shaking constantly, until they're golden and start popping. Scatter over at the end.",
  why: "Untoasted they taste of nothing. Two minutes in a dry pan and they're nutty and worth the plate space.",
  notWith: []
},
{
  name: "Grate in some raw garlic at the end",
  needs: ["garlic"],
  cuisines: ["middle-eastern", "turkish", "american"],
  heat: 2,
  how: "Grate half a clove into the yogurt, the sauce or the dressing after everything is cooked.",
  why: "Cooked garlic is sweet and mellow; raw garlic is sharp and loud. Adding a little raw at the end gives you both at once.",
  notWith: []
},
{
  name: "Ras el hanout instead of plain paprika",
  needs: ["ras el hanout"],
  cuisines: ["middle-eastern", "turkish"],
  heat: 2,
  how: "Swap a teaspoon of it in wherever the recipe asks for a single warm spice, and bloom it in the fat.",
  why: "It's a dozen spices already balanced for you, so one spoon does what a shelf of jars would.",
  notWith: ["ras el hanout"]
},
{
  name: "Baharat in the browning stage",
  needs: ["baharat"],
  cuisines: ["middle-eastern", "turkish"],
  heat: 2,
  how: "Add a teaspoon to the meat or onions while they're still browning, so it toasts rather than steams.",
  why: "Warm and slightly sweet — black pepper, allspice and cinnamon. It makes plain mince taste like it came off a Turkish grill.",
  notWith: ["baharat"]
},

/* ----------------------------------------------------------------- texture */
{
  name: "Something crunchy on top",
  needs: ["panko"],
  cuisines: ["any"],
  heat: 1,
  how: "Fry a handful of panko in butter or oil with a pinch of salt until deep golden, and scatter it over just before serving.",
  why: "Soft food gets boring by the fourth mouthful. A crunchy layer on top fixes that faster than any extra seasoning.",
  notWith: ["panko"]
},
{
  name: "Cold yogurt against the heat",
  needs: ["plain yogurt"],
  cuisines: ["middle-eastern", "turkish", "asian"],
  heat: 1,
  how: "Stir a pinch of salt and a scrape of garlic into a few spoons of cold yogurt and put a dollop on the side of the plate.",
  why: "Cool and sour beside something hot and spicy makes the heat land harder, not softer — you keep going back for another bite.",
  notWith: ["yogurt"]
},
{
  name: "Pickled red onion on the side",
  needs: ["red wine vinegar"],
  cuisines: ["any"],
  heat: 1,
  how: "Slice half a red onion thin, cover it with vinegar and a big pinch each of salt and sugar, and leave it while you cook. It's ready in twenty minutes.",
  why: "Sharp, crunchy and bright pink. It takes two minutes of work and makes almost any plate look and taste finished.",
  notWith: ["pickled onion"]
}

];
