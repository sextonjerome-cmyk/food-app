/* ==========================================================================
   Frigo — the food vocabulary
   --------------------------------------------------------------------------
   This is NOT Jerome's kitchen. `ingredients.js` is the tick-box list he
   starts from; this is the much longer list of things the world calls food.

   It has one job: when he says his fridge out loud, Android hands over one
   unbroken run of words with no commas in it. His own shelves are checked
   first, and whatever is left over gets walked against this list, longest
   match first. That is what turns

       "kale swiss chard bok choy daikon"

   into four ingredients instead of one, and it is what lets the app tell a
   food it simply hasn't got on a shelf yet from a word the microphone
   misheard. Anything matching nothing here is offered back as a correction
   or flagged as probably-not-food, rather than filed as an ingredient.

   Data only. No logic. Safe to edit by hand.

   Keep names in the singular or the form a person says out loud, lower case.
   The aisle a name sits under decides which shelf it lands on and where it
   appears in the shopping list.
   ========================================================================== */
window.FRIGO_FOODWORDS = {

  produce: [
    'kale', 'swiss chard', 'bok choy', 'napa cabbage', 'red cabbage', 'daikon',
    'radishes', 'turnips', 'parsnips', 'beets', 'leeks', 'fennel', 'asparagus',
    'brussels sprouts', 'artichokes', 'eggplant', 'zucchini', 'yellow squash',
    'butternut squash', 'acorn squash', 'spaghetti squash', 'pumpkin',
    'sweet corn', 'corn on the cob', 'green onions', 'red onion', 'white onion',
    'yellow onion', 'pearl onions', 'chives', 'fresh dill', 'fresh mint',
    'fresh basil', 'fresh rosemary', 'fresh sage', 'fresh oregano',
    'fresh chives', 'watercress', 'arugula', 'romaine', 'iceberg lettuce',
    'butter lettuce', 'mixed greens', 'baby spinach', 'collard greens',
    'mustard greens', 'snap peas', 'snow peas', 'edamame', 'okra', 'plantains',
    'avocados', 'tomatillos', 'poblano peppers', 'serrano peppers',
    'habanero peppers', 'thai chillies', 'shishito peppers', 'banana peppers',
    'cherry tomatoes', 'roma tomatoes', 'heirloom tomatoes', 'cucumbers',
    'celery root', 'yams', 'red potatoes', 'yukon gold potatoes',
    'russet potatoes', 'new potatoes', 'galangal', 'lemongrass',
    'horseradish', 'apples', 'pears', 'bananas', 'oranges', 'grapefruit',
    'clementines', 'grapes', 'strawberries', 'blueberries', 'raspberries',
    'blackberries', 'cherries', 'peaches', 'nectarines', 'plums', 'apricots',
    'mangoes', 'pineapple', 'watermelon', 'cantaloupe', 'honeydew', 'kiwi',
    'figs', 'dates', 'pomegranate', 'persimmon', 'papaya', 'cranberries',
    'rhubarb', 'cremini mushrooms', 'shiitake mushrooms', 'portobello mushrooms',
    'oyster mushrooms', 'button mushrooms', 'enoki mushrooms', 'sprouts',
    'micro greens', 'curry leaves', 'kaffir lime leaves', 'shiso'
  ],

  meat: [
    'ground turkey', 'ground lamb', 'ground veal', 'ground chicken',
    'chicken wings', 'chicken drumsticks', 'chicken legs', 'roasting chicken',
    'chicken tenders', 'turkey breast', 'pork belly', 'pork shoulder',
    'pork tenderloin', 'pork ribs', 'baby back ribs', 'spare ribs', 'ham',
    'prosciutto', 'salami', 'pepperoni', 'chorizo', 'andouille', 'bratwurst',
    'italian sausage', 'breakfast sausage', 'hot dogs', 'steak', 'ribeye',
    'sirloin', 'flank steak', 'skirt steak', 'hanger steak', 'brisket',
    'short ribs', 'chuck roast', 'oxtail', 'lamb chops', 'lamb shoulder',
    'leg of lamb', 'veal', 'duck', 'duck breast', 'rabbit', 'cod', 'haddock',
    'halibut', 'tilapia', 'sea bass', 'snapper', 'trout', 'mackerel',
    'sardines', 'anchovies', 'tuna steak', 'swordfish', 'scallops', 'mussels',
    'clams', 'oysters', 'squid', 'calamari', 'octopus', 'crab', 'crab meat',
    'lobster', 'crawfish', 'catfish', 'sole', 'monkfish', 'liver', 'pancetta',
    'guanciale', 'merguez', 'sujuk', 'pastrami', 'corned beef'
  ],

  dairy: [
    'whole milk', 'skim milk', 'buttermilk', 'evaporated milk',
    'condensed milk', 'ricotta', 'mascarpone', 'cottage cheese', 'goat cheese',
    'chevre', 'brie', 'camembert', 'comte', 'gouda', 'swiss cheese',
    'provolone', 'monterey jack', 'pepper jack', 'blue cheese', 'roquefort',
    'halloumi', 'manchego', 'burrata', 'fresh mozzarella', 'cheese curds',
    'clotted cream', 'whipped cream', 'greek yogurt', 'labneh', 'kefir',
    'ghee', 'margarine', 'egg whites', 'quail eggs', 'duck eggs', 'oat milk',
    'almond milk', 'soy milk', 'kaymak', 'queso fresco', 'cotija',
    'boursin', 'gruyere', 'emmental', 'raclette', 'stilton', 'gorgonzola'
  ],

  dry: [
    'brown rice', 'wild rice', 'sushi rice', 'bulgur', 'israeli couscous',
    'farro', 'barley', 'freekeh', 'millet', 'buckwheat', 'polenta',
    'cornmeal', 'semolina', 'oats', 'rolled oats', 'steel cut oats',
    'granola', 'muesli', 'bread flour', 'whole wheat flour', 'cake flour',
    'cornstarch', 'baking powder', 'baking soda', 'yeast', 'powdered sugar',
    'maple syrup', 'molasses', 'corn syrup', 'cocoa powder', 'chocolate chips',
    'dark chocolate', 'marshmallows', 'breadcrumbs', 'panko', 'tortilla chips',
    'pretzels', 'popcorn', 'green lentils', 'split peas', 'pinto beans',
    'kidney beans', 'cannellini beans', 'navy beans', 'butter beans',
    'lima beans', 'fava beans', 'black eyed peas', 'almonds', 'walnuts',
    'pecans', 'cashews', 'pistachios', 'hazelnuts', 'peanuts', 'pine nuts',
    'macadamia nuts', 'sunflower seeds', 'pumpkin seeds', 'chia seeds',
    'flax seeds', 'raisins', 'dried cranberries', 'dried apricots', 'prunes',
    'shredded coconut', 'rice noodles', 'soba noodles', 'udon noodles',
    'rice vermicelli', 'glass noodles', 'lasagna sheets', 'fettuccine',
    'linguine', 'rigatoni', 'farfalle', 'macaroni', 'gnocchi', 'tortellini',
    'ravioli', 'vermicelli', 'angel hair', 'bucatini', 'pappardelle', 'ziti',
    'pasta shells', 'orecchiette', 'cous cous', 'quinoa flakes', 'wheat berries'
  ],

  canned: [
    'tomato paste', 'crushed tomatoes', 'diced tomatoes', 'tomato sauce',
    'marinara', 'passata', 'coconut cream', 'chipotle in adobo', 'salsa',
    'enchilada sauce', 'hoisin sauce', 'oyster sauce', 'fish sauce', 'ponzu',
    'mirin', 'rice vinegar', 'sesame oil', 'chilli oil', 'chilli crisp',
    'sambal oelek', 'black bean sauce', 'tamari', 'teriyaki sauce',
    'bbq sauce', 'ranch dressing', 'italian dressing', 'vinaigrette',
    'apple cider vinegar', 'white vinegar', 'sherry vinegar',
    'champagne vinegar', 'malt vinegar', 'peanut butter', 'almond butter',
    'jam', 'jelly', 'marmalade', 'apple sauce', 'cranberry sauce',
    'pickled jalapenos', 'capers', 'cornichons', 'sauerkraut', 'kimchi',
    'anchovy paste', 'tomato puree', 'pomegranate molasses', 'date syrup',
    'rose water', 'orange blossom water', 'preserved lemons', 'zhoug',
    'chimichurri', 'pesto', 'tapenade', 'hummus', 'baba ganoush', 'tzatziki',
    'avocado oil', 'canola oil', 'sunflower oil', 'peanut oil', 'coconut oil',
    'cooking spray', 'white wine', 'red wine', 'dry vermouth', 'brandy',
    'sherry', 'marsala', 'bone broth', 'clam juice', 'ajvar', 'muhammara',
    'toum', 'skhug', 'nduja', 'calabrian chillies', 'giardiniera',
    'roasted red peppers', 'artichoke hearts', 'hearts of palm',
    'sun dried tomatoes', 'canned corn', 'canned salmon', 'canned sardines',
    'refried beans', 'evaporated cane sugar', 'pickled onions'
  ],

  spices: [
    'allspice', 'anise', 'caraway', 'celery salt', 'chinese five spice',
    'coriander seeds', 'cream of tartar', 'dill seed',
    'everything bagel seasoning', 'fenugreek', 'file powder', 'ginger powder',
    'gochugaru', 'juniper berries', 'kosher salt', 'sea salt', 'flaky salt',
    'lemon pepper', 'mace', 'marjoram', 'mustard powder', 'nigella seeds',
    'onion flakes', 'paprika', 'peppercorns', 'poppy seeds',
    'poultry seasoning', 'savory', 'seasoned salt', 'urfa biber', 'berbere',
    'dukkah', 'shichimi togarashi', 'furikake', 'jerk seasoning',
    'taco seasoning', 'adobo seasoning', 'sazon', 'vanilla bean',
    'dried sage', 'dried dill', 'dried tarragon', 'dried chives',
    /* The bare herb names. His shelves only ever say fresh or dried, so
       without these a misheard "time" had no thyme to find. */
    'thyme', 'basil', 'oregano', 'rosemary', 'sage', 'parsley', 'cilantro',
    'mint', 'dill', 'tarragon', 'chervil', 'bay leaf',
    'ground ginger', 'ground cloves', 'ground coriander', 'ground cumin',
    'chilli powder', 'ancho chilli', 'chipotle powder', 'harissa powder',
    'baharat', 'advieh', 'hawaij', 'panch phoron', 'kala namak'
  ],

  bakery: [
    'baguette', 'sourdough', 'ciabatta', 'focaccia', 'brioche', 'challah',
    'rye bread', 'whole wheat bread', 'white bread', 'english muffins',
    'bagels', 'croissants', 'naan', 'pita bread', 'tortillas',
    'corn tortillas', 'flour tortillas', 'hamburger buns', 'hot dog buns',
    'dinner rolls', 'cornbread', 'crackers', 'breadsticks', 'pizza dough',
    'phyllo dough', 'lavash', 'flatbread', 'simit', 'crumpets'
  ],

  frozen: [
    'frozen edamame', 'frozen mango', 'frozen pizza', 'frozen waffles',
    'ice cream', 'frozen yogurt', 'tater tots', 'fish sticks',
    'frozen okra', 'frozen artichoke hearts', 'frozen pastry',
    'frozen naan', 'frozen meatballs', 'frozen hash browns'
  ],

  other: [
    'firm tofu', 'silken tofu', 'tempeh', 'seitan', 'miso', 'natto',
    'seaweed', 'nori', 'kombu', 'wakame', 'agar', 'gelatin',
    'protein powder', 'coffee', 'espresso', 'tea', 'green tea', 'black tea',
    'matcha', 'chai', 'hot chocolate', 'sparkling water', 'tonic water',
    'club soda', 'orange juice', 'apple juice', 'lemonade', 'kombucha',
    'coconut water', 'ayran', 'tahini halva', 'bee pollen'
  ]

};
