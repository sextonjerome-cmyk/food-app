/* ==========================================================================
   Frigo — app logic
   Vanilla JS, no dependencies, no build step. See .claude/rules/code-style.md
   ========================================================================== */
(function () {
'use strict';

/* ---------------------------------------------------------------- aisles */
const AISLES = {
  produce:'Produce', bakery:'Bakery', meat:'Meat & Seafood', dairy:'Dairy & Eggs',
  dry:'Dry Goods & Pasta', canned:'Canned & Jars', frozen:'Frozen',
  spices:'Spices', other:'Other'
};
const AISLE_ORDER = ['produce','bakery','meat','dairy','dry','canned','frozen','spices','other'];

/* --------------------------------------------------- default inventory */
/* The list itself lives in ingredients.js so it can be edited by hand, or
   through items.html, without going anywhere near this file. */
const DEFAULTS = window.FRIGO_INGREDIENTS
              || { fridge:[], freezer:[], pantry:[], spices:[] };

const TABS = ['fridge','freezer','pantry','spices'];
const TAB_LABEL = { fridge:'Fridge', freezer:'Freezer', pantry:'Pantry', spices:'Spices' };

const CUISINES = [
  ['any','Any'],['french','French'],['american','American'],
  ['middle-eastern','Middle Eastern'],['turkish','Turkish'],['asian','Asian'],
  ['other','Other']
];
const TIMES = [[15,'15 min'],[30,'30 min'],[45,'45 min'],[60,'1 hour'],[0,'Any']];

/* ------------------------------------------------------------------ state */
const KEY = 'frigo.v1';

const FRESH = () => ({
  inventory: { fridge:{}, freezer:{}, pantry:{}, spices:{} },
  custom:    { fridge:[], freezer:[], pantry:[], spices:[] },
  hidden:    { fridge:[], freezer:[], pantry:[], spices:[] },
  appliances:[
    { id:'stove',      name:'Stove & Oven', qt:0 },
    { id:'crockpot',   name:'Crockpot',     qt:4.5 },
    { id:'instantpot', name:'Instant Pot',  qt:6 },
    { id:'airfryer',   name:'Air Fryer',    qt:2 },
    { id:'ricecooker', name:'Rice Cooker',  qt:1.5 }
  ],
  ratings:{}, cooked:{}, favorites:[],
  shopping:[], planned:[], aiRecipes:[],
  prefs:{ servings:2, spice:3, theme:'auto', apiKey:'', staplesOn:true }
});

let state = FRESH();

function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(!raw) { seedStaples(); return; }
    const saved = JSON.parse(raw);
    state = deepMerge(FRESH(), saved);
    /* Shopping rows saved before the unit fix carry the quantity as a frozen
       string — "4 piece eggs" — so fixing qtyLabel() never reached them. */
    (state.shopping || []).forEach(s => {
      if (typeof s.qty === 'string') s.qty = s.qty.replace(/\s*\bpieces?\b/gi, '').trim();
    });
  }catch(e){ state = FRESH(); seedStaples(); }
}
function deepMerge(base, over){
  if (over === null || over === undefined) return base;
  if (Array.isArray(base)) return Array.isArray(over) ? over : base;
  if (typeof base !== 'object') return over;
  const out = Object.assign({}, base);
  for (const k in over){
    out[k] = (k in base) ? deepMerge(base[k], over[k]) : over[k];
  }
  return out;
}
function seedStaples(){
  TABS.forEach(tab => DEFAULTS[tab].forEach(([name,, staple]) => {
    if (staple) state.inventory[tab][name] = { have:true, low:false };
  }));
}

let saveTimer = null;
function save(){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(e){}
  }, 250);
}

/* ------------------------------------------------------------- view model */
const view = {
  screen:'cook',
  tab:'fridge',
  search:'',
  recipeId:null,
  cookAlong:null,
  filtersOpen:false,
  filters:{ appliance:'any', cuisine:'any', time:0, difficulty:'any' }
};

/* ------------------------------------------------------------- utilities */
const $ = sel => document.querySelector(sel);
const esc = s => String(s).replace(/[&<>"']/g, c =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
/* Accents are stripped before anything is compared. Jerome dictates, and a
   phone keyboard gives "creme fraiche" for a shelf that says "crème fraîche";
   without this they are two different ingredients and neither ever matches. */
const norm = s => String(s).toLowerCase().trim().replace(/\s+/g,' ')
  .normalize('NFD').replace(/[̀-ͯ]/g, '');
const svg = (id, cls) => `<svg class="${cls||'icon'}" aria-hidden="true"><use href="#${id}"></use></svg>`;

/* A toast can carry one button. Unticking the last of something should offer
   the shopping list right there — a sheet on every untick would be unusable
   when he's clearing out ten things at once. */
function toast(msg, action){
  const t = $('#toast');
  t.textContent = '';
  const label = document.createElement('span');
  label.textContent = msg;
  t.appendChild(label);
  if (action){
    const b = document.createElement('button');
    b.className = 'toast-act';
    b.textContent = action.label;
    b.addEventListener('click', () => {
      clearTimeout(toast._t);
      t.hidden = true;
      action.fn();
    });
    t.appendChild(b);
  }
  t.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { t.hidden = true; }, action ? 5200 : 2400);
}

/* every item across every tab, merged with Jerome's own additions */
function itemsFor(tab){
  const base = DEFAULTS[tab]
    .filter(([n]) => !state.hidden[tab].includes(n))
    .map(([name, aisle, staple]) => ({ name, aisle, staple:!!staple, custom:false }));
  const mine = state.custom[tab].map(o => ({ ...o, custom:true }));
  return base.concat(mine);
}
function allItems(){
  const out = [];
  TABS.forEach(tab => itemsFor(tab).forEach(it => out.push({ ...it, tab })));
  return out;
}
function aisleOf(name, tab){
  const hit = allItems().find(i => norm(i.name) === norm(name))
           || allItems().find(i => sameItem(i.name, name));
  if (hit) return hit.aisle;
  const ing = recipePool().flatMap(r => r.ingredients || [])
                          .find(i => sameItem(i.item, name));
  if (ing && ing.aisle) return ing.aisle;
  const n = norm(name);
  if (/\b(chicken|beef|pork|lamb|sausage|bacon|fish|salmon|shrimp|prawn)\b/.test(n)) return 'meat';
  if (/\b(milk|cream|cheese|yogurt|butter|egg)\b/.test(n)) return 'dairy';
  if (/\b(pasta|rice|flour|noodle|couscous|bulgur|lentil|oat|sugar)\b/.test(n)) return 'dry';
  if (/\b(canned|tinned|stock|broth|paste|oil|vinegar|sauce|honey)\b/.test(n)) return 'canned';
  if (/\b(frozen)\b/.test(n)) return 'frozen';
  if (/\b(bread|pita|tortilla|bun)\b/.test(n)) return 'bakery';
  if (/\b(paprika|cumin|pepper|salt|spice|powder|seed|dried|cinnamon)\b/.test(n)) return 'spices';
  /* Nothing in the name gave it away, so trust the shelf he put it on — that's
     a better guess than assuming every unknown word is a vegetable. */
  return { fridge:'produce', freezer:'frozen', pantry:'canned', spices:'spices' }[tab] || 'produce';
}

/* Correct a name in place. A built-in row can't be edited where it lives —
   ingredients.js is shipped code — so the misspelling is hidden and the fixed
   name added alongside it, which looks the same on screen.
   Returns true when the new name was already on the shelf and the two merged. */
function renameItem(tab, from, to){
  const was = itemsFor(tab).find(i => i.name === from);
  const clash = itemsFor(tab).find(i => i.name !== from && norm(i.name) === norm(to));

  const ci = state.custom[tab].findIndex(o => o.name === from);
  if (ci >= 0){
    if (clash) state.custom[tab].splice(ci, 1);
    else state.custom[tab][ci].name = to;
  } else {
    if (!state.hidden[tab].includes(from)) state.hidden[tab].push(from);
    if (!clash) state.custom[tab].push({
      name: to,
      aisle: (was && was.aisle) || aisleOf(to, tab),
      staple: !!(was && was.staple)
    });
  }

  const inv = state.inventory[tab], old = inv[from];
  if (old){
    const now = inv[to] || { have:false, low:false };
    inv[to] = { have: now.have || old.have, low: now.low || old.low };
    delete inv[from];
  }

  state.shopping.forEach(s => { if (norm(s.item) === norm(from)) s.item = to; });
  return !!clash;
}

/* ------------------------------------------- understanding an item name

   Jerome types what he calls a thing; the recipes call it something else. He's
   French and half of these have a British name too, so "coriandre", "coriander"
   and "cilantro" all have to land on the same shelf.

   Whole-phrase swaps run first, then single words. Left is what someone types,
   right is what the recipes say. */
const SAME_PHRASE = [
  [/\b(spring|green|salad)\s+onions?\b/g, 'scallion'],
  [/\bchilli?\s+bean\s+paste\b/g, 'doubanjiang'],
  [/\bsichuan\s+chilli?\s+bean\s+paste\b/g, 'doubanjiang'],
  [/\bpul\s+biber\b/g, 'aleppo pepper'],
  [/\bgarbanzo\s+beans?\b/g, 'chickpea'],
  [/\bmasoor\s+dal\b/g, 'red lentil'],
  [/\bdouble\s+cream\b/g, 'heavy cream'],
  [/\bwhipping\s+cream\b/g, 'heavy cream'],
  [/\bcreme\s+fraiche\b/g, 'heavy cream'],
  [/\bbell\s+peppers?\b/g, 'bell pepper'],
  [/\bspring\s+onions?\b/g, 'scallion'],
  [/\bcrushed\s+chilli?e?s?\b/g, 'chilli flake'],
  [/\bred\s+pepper\s+flakes?\b/g, 'chilli flake'],
  [/\bstock\s+cubes?\b/g, 'stock']
];
/* Things said as a short name, matched only when that IS the whole name — so
   "dijon" finds the mustard, but "dijon mustard" is left alone. */
const SHORTHAND = {
  dijon:'dijon mustard', soy:'soy sauce', mayo:'mayonnaise', parm:'parmesan',
  worcestershire:'worcestershire sauce', balsamic:'balsamic vinegar',
  'pomme de terre':'potato', 'pommes de terre':'potato',
  lait:'milk', sel:'salt', poivre:'black pepper', sucre:'sugar',
  farine:'all purpose flour', riz:'white rice', crevette:'shrimp',
  crevettes:'shrimp', champignon:'mushroom', champignons:'mushroom',
  epinards:'spinach', carotte:'carrot', carottes:'carrot', tomate:'tomato',
  tomates:'tomato', fromage:'cheese', jambon:'ham', miel:'honey'
};

const SAME_WORD = {
  coriandre:'cilantro', coriander:'cilantro',
  persil:'parsley', ail:'garlic', oignon:'onion', oignons:'onion',
  citron:'lemon', beurre:'butter', creme:'cream', poulet:'chicken',
  boeuf:'beef', porc:'pork', oeuf:'egg', oeufs:'egg', poivron:'bell pepper',
  courgette:'zucchini', aubergine:'eggplant', capsicum:'bell pepper',
  prawn:'shrimp', prawns:'shrimp', langoustine:'shrimp',
  mince:'ground', minced:'ground', broth:'stock', bouillon:'stock',
  tinned:'canned', passata:'tomato', concentrate:'paste',
  scallions:'scallion', chilli:'chili', chillies:'chili', chile:'chili',
  chiles:'chili', capsicums:'bell pepper', rocket:'arugula',
  swede:'turnip', maize:'corn', sultanas:'raisin', gram:'chickpea'
};

/* Words that describe a thing without changing what it is. Dropping these is
   what lets "large ripe tomatoes" find "tomato". Anything that DOES change the
   thing — dried, ground, smoked, black — is deliberately not here. */
const FILLER = new Set(['fresh','raw','whole','large','small','medium','ripe','plain',
  'canned','jarred','boneless','skinless','cooked','uncooked','organic','free','range',
  'extra','virgin','unsalted','salted','peeled','deveined','chopped','sliced','diced',
  'grated','of','a','the','good','quality','some','my','skin','on','bone','in','and',
  'piece','pieces','pack','packet','tub','jar','tin','can','bunch','clove','cloves']);

const singular = w => w.length > 3 ? w.replace(/ies$/,'y').replace(/oes$/,'o').replace(/(ses|xes|zes|ches|shes)$/,m=>m.slice(0,-2)).replace(/s$/,'') : w;

/* Break a name into the thing itself plus the words that qualify it.
   "extra virgin olive oil" -> head "oil", mods {olive}. */
function itemParts(name){
  let s = norm(name).replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g,' ').trim();
  if (SHORTHAND[s]) s = SHORTHAND[s];
  SAME_PHRASE.forEach(([re, to]) => { s = s.replace(re, to); });
  const words = s.split(' ')
    .map(w => SAME_WORD[w] || w)
    .join(' ').split(' ')
    .map(singular)
    .map(w => SAME_WORD[w] || w)
    .filter(w => w && !FILLER.has(w));
  if (!words.length) return null;
  return { head: words[words.length - 1], mods: new Set(words.slice(0, -1)) };
}

/* Two names mean the same thing when they're the same thing (same head noun)
   and nothing about them disagrees. "chicken stock" matches "chicken broth"
   but not "beef stock"; "black pepper" never matches "red bell pepper". */
/* A vaguer name normally matches a more specific one — "stock" finds chicken
   stock, "flour" finds all-purpose. These words are the exception: they change
   what the ingredient IS, so a sweet potato must never satisfy a recipe asking
   for potatoes, and having milk must never mean having coconut milk. */
const DISTINCT = new Set(['sweet','coconut','sour','fried','crispy','brown',
  'condensed','evaporated','almond','oat','soy','powdered','icing']);

function sameItem(a, b){
  const x = itemParts(a), y = itemParts(b);
  if (!x || !y || x.head !== y.head) return false;
  for (const m of DISTINCT) if (x.mods.has(m) !== y.mods.has(m)) return false;
  const smaller = x.mods.size <= y.mods.size ? x.mods : y.mods;
  const bigger  = smaller === x.mods ? y.mods : x.mods;
  for (const m of smaller) if (!bigger.has(m)) return false;
  return true;
}

/* ------------------------------------------------------- substitutions

   Real swaps a cook would actually make, best option first. This is not a
   thesaurus: every line is something that genuinely works in these recipes,
   and the note says what changes, because "it works" and "it is identical"
   are different claims and Jerome is learning.

   Keys and values are matched with sameItem(), so plurals and loose naming
   sort themselves out. */
const SUBSTITUTES = {
  /* produce */
  'sweet potatoes':  [['potatoes', 'less sweet, and they take a few minutes longer to soften']],
  'potatoes':        [['sweet potatoes', 'sweeter and softer, so watch them near the end']],
  'shallots':        [['onions', 'use half a small one; sharper, so cook it a minute longer']],
  'limes':           [['lemons', 'less floral, but the acid does the same job']],
  'lemons':          [['limes', 'sharper and more perfumed']],
  'fresh cilantro':  [['fresh parsley', 'a different herb, but it keeps the fresh green finish']],
  'fresh parsley':   [['fresh cilantro', 'stronger and more citrussy']],
  'fresh thyme':     [['dried thyme', 'use a third as much, and add it earlier'],
                      ['herbes de provence', 'carries thyme plus rosemary and savoury']],
  'jalapenos':       [['chilli flakes', 'half a teaspoon; you lose the green freshness'],
                      ['harissa', 'a teaspoon, and it brings smoke with it']],
  'green peppers':   [['bell peppers', 'sweeter and thicker-walled']],
  'bell peppers':    [['green peppers', 'thinner and a little more bitter']],
  'cauliflower':     [['broccoli', 'roasts the same way, cooks a touch faster'],
                      ['frozen broccoli', 'roast it straight from frozen, no thawing']],
  'broccoli':        [['frozen broccoli', 'roast from frozen and give it five more minutes'],
                      ['cauliflower', 'milder, browns beautifully']],
  'green beans':     [['frozen green beans', 'straight from the bag, no thawing']],
  'cabbage':         [['spinach', 'wilts instead of charring, so add it at the very end']],
  'garlic':          [['garlic powder', 'half a teaspoon per clove, added later so it does not burn']],
  'tomatoes':        [['canned tomatoes', 'drain them well or the pan goes watery']],

  /* dairy and eggs */
  'heavy cream':     [['crème fraîche', 'tangier, and far less likely to split'],
                      ['sour cream', 'stir it in off the heat or it will split'],
                      ['milk', 'much thinner — reduce it longer']],
  'sour cream':      [['plain yogurt', 'thinner and sharper; drain it if you can'],
                      ['crème fraîche', 'richer and more stable in heat'],
                      ['mayonnaise', 'for a cold sauce only']],
  'crème fraîche':   [['sour cream', 'sharper; keep it off the heat'],
                      ['heavy cream', 'richer, less tang']],
  'parmesan':        [['pecorino romano', 'saltier and sharper, so use a little less']],
  'pecorino romano': [['parmesan', 'nuttier and milder']],
  'gruyère':         [['cheddar', 'sharper and it goes oilier when it melts'],
                      ['mozzarella', 'milder, and it stretches rather than browns']],
  'feta':            [['mozzarella', 'much milder — add salt to make up for it']],
  'cheddar':         [['gruyère', 'nuttier and it melts more smoothly'],
                      ['mozzarella', 'milder and stringier']],
  'milk':            [['heavy cream', 'thin it with water, half and half']],
  'plain yogurt':    [['sour cream', 'richer and less sharp']],

  /* meat and fish */
  'chicken thighs':  [['chicken breast', 'leaner, so take it off the heat sooner or it dries'],
                      ['frozen chicken thighs', 'thaw them properly first']],
  'chicken breast':  [['chicken thighs', 'more forgiving and more flavourful; a little longer to cook']],
  'ground beef':     [['ground pork', 'sweeter and fattier'],
                      ['frozen ground beef', 'thaw it fully or it steams in the pan']],
  'ground pork':     [['ground beef', 'less sweet, a bit firmer']],
  'bacon':           [['pancetta', 'unsmoked, so you lose the smoke but keep the fat'],
                      ['sausage', 'crumble it and brown it hard']],
  'pancetta':        [['bacon', 'smoked, which changes the dish but works']],
  'shrimp':          [['frozen shrimp', 'thaw under cold water and dry them very well']],
  'salmon':          [['frozen fish fillets', 'thaw and dry them thoroughly']],

  /* dry goods */
  'basmati rice':    [['white rice', 'a touch stickier'], ['jasmine rice', 'softer and more fragrant']],
  'jasmine rice':    [['white rice', 'less fragrant, otherwise the same'], ['basmati rice', 'drier and separate']],
  'white rice':      [['basmati rice', 'drier and more separate'], ['jasmine rice', 'softer and fragrant']],
  'short-grain rice':[['white rice', 'less sticky, so it will not clump the same way']],
  'panko':           [['breadcrumbs', 'finer, so the crust is denser and less crunchy']],
  'breadcrumbs':     [['panko', 'coarser and much crunchier']],
  'couscous':        [['bulgur', 'nuttier and it needs real simmering']],
  'bulgur':          [['couscous', 'quicker — just soak it off the heat'], ['quinoa', 'nuttier, and it needs rinsing']],
  'ramen noodles':   [['egg noodles', 'softer'], ['spaghetti', 'break it in half and cook it a minute short']],
  'egg noodles':     [['spaghetti', 'firmer'], ['ramen noodles', 'springier']],
  'spaghetti':       [['penne', 'holds sauce differently but works']],
  'penne':           [['spaghetti', 'less good at catching a chunky sauce']],
  'chicken stock':   [['vegetable stock', 'lighter'], ['beef broth', 'much darker and stronger — use less']],
  'beef broth':      [['chicken stock', 'lighter, so season a little harder']],
  'vegetable stock': [['chicken stock', 'richer']],
  'red wine vinegar':[['white wine vinegar', 'lighter'], ['balsamic vinegar', 'sweeter — use less']],
  'white wine vinegar':[['red wine vinegar', 'fruitier and a shade stronger']],
  'balsamic vinegar':[['red wine vinegar', 'add a little honey to make up the sweetness']],
  'honey':           [['brown sugar', 'no floral note; dissolve it in the liquid'],
                      ['sugar', 'plain sweetness only']],
  'brown sugar':     [['sugar', 'add a spoon of honey for the caramel note']],
  'sriracha':        [['hot sauce', 'sharper and thinner'], ['harissa', 'smokier and less sweet']],
  'hot sauce':       [['sriracha', 'thicker, sweeter, more garlic'], ['harissa', 'smoky and much thicker']],
  'harissa':         [['sriracha', 'sweeter; add smoked paprika for the smoke']],
  'gochujang':       [['sriracha', 'add a teaspoon of miso paste for the depth'],
                      ['harissa', 'wrong country, right heat and thickness']],
  'miso paste':      [['soy sauce', 'thinner and saltier — use half']],
  'thai curry paste':[['curry powder', 'two teaspoons plus chilli flakes; fry it in oil the same way'],
                      ['harissa', 'not Thai, but it fries and blooms the same way']],
  'tahini':          [['peanut butter', 'sweeter and heavier — thin it hard with lemon and water']],
  'canned black beans':[['canned white beans', 'softer and paler'], ['canned chickpeas', 'firmer, holds shape better']],
  'canned chickpeas':[['canned white beans', 'creamier, will not crisp as well']],
  'canned coconut milk':[['heavy cream', 'no coconut flavour at all, but the body is right']],
  'tortillas':       [['pita bread', 'thicker; cut it into wedges']],
  'pita bread':      [['tortillas', 'thinner, warm them briefly'], ['bread', 'toast it instead']],
  'biscuit dough':   [['puff pastry', 'flakier and it browns faster'], ['pie crust', 'less rise, still good']],
  'crispy fried onions':[['panko', 'mix in onion powder; less sweet but it still crunches']],
  'mirin':           [['white wine', 'add half a teaspoon of sugar per spoon']],
  'grits':           [['rolled oats', 'a different grain entirely, but the same creamy bowl']],

  /* spices */
  'aleppo pepper':   [['pul biber', 'the same thing under another name'],
                      ['chilli flakes', 'half as much, and add a pinch of sweet paprika']],
  'chilli flakes':   [['cayenne pepper', 'a third as much — it is much hotter'],
                      ['aleppo pepper', 'twice as much; fruitier and gentler']],
  'cayenne pepper':  [['chilli flakes', 'three times as much']],
  'smoked paprika':  [['sweet paprika', 'you lose the smoke, which is most of the point']],
  'sweet paprika':   [['smoked paprika', 'adds smoke, which changes the dish']],
  'cajun seasoning': [['smoked paprika', 'add garlic powder, cayenne and dried thyme in equal parts']],
  'dried thyme':     [['fresh thyme', 'use three times as much, added later'],
                      ['herbes de provence', 'thyme plus rosemary and savoury']],
  'dried oregano':   [['herbes de provence', 'broader, more floral'], ['dried thyme', 'earthier']],
  'sumac':           [['lemons', 'a squeeze at the end gives the same sourness, not the colour']],
  'ras el hanout':   [['baharat', 'close cousin'], ['garam masala', 'warmer and sweeter']],
  'baharat':         [['ras el hanout', 'more floral'], ['garam masala', 'sweeter']],
  'garam masala':    [['curry powder', 'add a pinch of cinnamon'], ['baharat', 'peppery rather than sweet']],
  'curry powder':    [['garam masala', 'warmer; add turmeric for the colour']],
  'turmeric':        [['curry powder', 'mostly for colour, and it brings other spices with it']],
  'white pepper':    [['black pepper', 'sharper, and you will see the specks']],
  'sesame oil':      [['vegetable oil', 'no nuttiness — add sesame seeds if you have them']],
  'sesame seeds':    [['pine nuts', 'toast them; different, but the same crunch on top']]
};

/* The best stand-in he actually owns, or null. */
function findSubstitute(name){
  const key = Object.keys(SUBSTITUTES).find(k => norm(k) === norm(name) || sameItem(k, name));
  if (!key) return null;
  for (const [alt, note] of SUBSTITUTES[key]){
    if (inventoryHas(alt)) return { item: alt, note };
  }
  return null;
}

/* Do we have this ingredient? */
function inventoryHas(name){
  for (const tab of TABS){
    const inv = state.inventory[tab];
    for (const key in inv){
      if (!inv[key] || !inv[key].have) continue;
      if (norm(key) === norm(name) || sameItem(key, name)) return true;
    }
  }
  return false;
}
/* Flagged "always in stock" — salt, oil, the things he never actually runs out
   of. They stay ticked, they never get offered to the shopping list, and the
   "what did you finish?" sheet leaves them alone. */
function isAlways(name){
  for (const tab of TABS){
    const inv = state.inventory[tab];
    for (const key in inv){
      if (!inv[key] || !inv[key].always) continue;
      if (norm(key) === norm(name) || sameItem(key, name)) return true;
    }
  }
  return false;
}
function onShoppingList(name){
  return state.shopping.some(s => !s.done && norm(s.item) === norm(name));
}
function inventoryLow(name){
  for (const tab of TABS){
    const inv = state.inventory[tab];
    for (const key in inv){
      if (inv[key] && inv[key].have && inv[key].low && sameItem(key, name)) return true;
    }
  }
  return false;
}

/* ------------------------------------------------------------ scaling */
const FRACTIONS = [[1,''], [.75,'¾'], [.6667,'⅔'], [.5,'½'], [.3333,'⅓'], [.25,'¼'], [.125,'⅛']];
function prettyQty(q){
  if (q === null || q === undefined) return '';
  if (q < .05) return '';
  const whole = Math.floor(q + 1e-6);
  const rest  = q - whole;
  let frac = '';
  if (rest > .05){
    let best = null, bestD = 1;
    FRACTIONS.forEach(([v, glyph]) => {
      const d = Math.abs(rest - v);
      if (glyph && d < bestD){ bestD = d; best = glyph; }
    });
    frac = (bestD < .09) ? best : '';
    if (!frac) return String(Math.round(q * 10) / 10);
  }
  if (whole && frac) return whole + frac;
  if (frac) return frac;
  return String(whole);
}
const WHOLE_UNITS = ['piece','pieces','egg','eggs','clove','cloves','slice','slices','can','cans'];
function scaleIngredient(ing, factor){
  if (!ing.scale || ing.qty == null) return { qty:ing.qty, unit:ing.unit };
  let q = ing.qty * factor;
  if (!ing.unit || WHOLE_UNITS.includes(ing.unit)) q = Math.max(1, Math.round(q));
  return { qty:q, unit:ing.unit };
}
function qtyLabel(ing, factor){
  const s = scaleIngredient(ing, factor);
  const q = prettyQty(s.qty);
  /* "four piece eggs" is not English. Counted things take no unit at all. */
  const unit = (s.unit === 'piece' || s.unit === 'pieces') ? '' : (s.unit || '');
  if (!q && !unit) return '';
  return (q + ' ' + unit).trim();
}

/* ------------------------------------------------------------ matching */
function recipePool(){
  return (window.RECIPES || []).concat(state.aiRecipes || []);
}
function analyse(recipe, servings){
  const factor = servings / (recipe.baseServings || 2);
  const missing = [], have = [], swaps = [];
  (recipe.ingredients || []).forEach(ing => {
    const isStaple = ing.staple && state.prefs.staplesOn;
    if (inventoryHas(ing.item) || isStaple){ have.push(ing); return; }
    /* Not in the kitchen, but something on his shelves will do the job. That
       counts as cookable — it just has to be said out loud, not hidden. */
    const swap = findSubstitute(ing.item);
    if (swap){ have.push(ing); swaps.push({ ing, swap }); return; }
    missing.push(ing);
  });
  const usesLow = (recipe.ingredients||[]).some(i => inventoryLow(i.item));
  let capacityWarning = null;
  const app = state.appliances.find(a => (recipe.appliances||[]).includes(a.id));
  if (app && app.qt && recipe.capacityQt){
    const needed = recipe.capacityQt * factor;
    if (needed > app.qt * 0.62)
      capacityWarning = `Tight fit in your ${app.qt} qt ${app.name.toLowerCase()} at ${servings} servings — cook it in two batches.`;
  }
  return { factor, missing, have, swaps, usesLow, capacityWarning };
}
function matchRecipes(){
  const f = view.filters, servings = state.prefs.servings;
  const out = [];
  recipePool().forEach(r => {
    if (f.appliance !== 'any' && !(r.appliances||[]).includes(f.appliance)) return;
    if (f.cuisine   !== 'any' && r.cuisine !== f.cuisine) return;
    if (f.time      !== 0     && (r.activeMinutes || r.minutes) > f.time) return;
    if (f.difficulty!== 'any' && r.difficulty !== f.difficulty) return;
    const a = analyse(r, servings);
    out.push({ r, ...a });
  });
  out.sort((x, y) => {
    if (x.missing.length !== y.missing.length) return x.missing.length - y.missing.length;
    if (x.swaps.length !== y.swaps.length) return x.swaps.length - y.swaps.length;
    const rx = state.ratings[x.r.id] || 0, ry = state.ratings[y.r.id] || 0;
    if (rx !== ry) return ry - rx;
    if (x.usesLow !== y.usesLow) return x.usesLow ? -1 : 1;
    const cx = state.cooked[x.r.id] || '', cy = state.cooked[y.r.id] || '';
    return cx.localeCompare(cy);
  });
  return out;
}

/* ------------------------------------------------------------- rendering */
/* If building a screen throws, the old screen stays on the glass and the app
   looks merely unresponsive — a typo in here once read as "the search box is
   broken". Say so out loud instead. */
function render(){
  const bar = $('#topbar'), main = $('#screen');
  if (view.cookAlong){ renderCookAlong(); return; }
  document.querySelectorAll('.cookalong').forEach(n => n.remove());

  let html;
  try{
    html = screenHTML();
  }catch(err){
    console.error('render failed', err);
    html = `<div class="empty"><strong>Something broke on this screen</strong>
      <p>${esc(String(err && err.message || err))}</p></div>`;
  }
  bar.innerHTML = topbar();
  main.innerHTML = html;
  renderTabs();

  /* The page scrolls on the window, not on #screen, so resetting the element's
     scrollTop did nothing — tapping a recipe from far down the Cook list landed
     you a thousand pixels into it, past the photo. Only jump to the top when the
     screen actually changes; ticking a fridge item must not throw you back up. */
  const where = view.screen + ':' + (view.recipeId || '') + ':' + view.tab;
  if (where !== render.last){
    render.last = where;
    window.scrollTo(0, 0);
  }
}

function topbar(){
  if (view.screen === 'recipe'){
    const r = findRecipe(view.recipeId);
    const fav = state.favorites.includes(view.recipeId);
    return `<div class="bar">
      <button class="bar-btn" data-act="back" aria-label="Back">${svg('i-back')}</button>
      <h1>${esc(r ? r.title : 'Recipe')}</h1>
      <button class="bar-btn ${fav?'on':''}" data-act="fav" aria-label="Favourite">${svg('i-star')}</button>
    </div>`;
  }
  const titles = {
    cook:['Cook', 'What can I make right now?'],
    fridge:['My kitchen', 'Check what you actually have'],
    list:['Shopping list', 'Sorted the way you walk the store'],
    plan:['Plan ahead', 'Decide now, shop once'],
    settings:['Settings', null]
  };
  const [t, sub] = titles[view.screen] || ['Frigo', null];
  const gear = view.screen === 'settings'
    ? `<button class="bar-btn" data-act="back" aria-label="Back">${svg('i-back')}</button>`
    : `<button class="bar-btn" data-act="settings" aria-label="Settings">${svg('i-gear')}</button>`;
  const left = view.screen === 'settings' ? gear : '';
  const right = view.screen === 'settings' ? '' : gear;
  return `<div class="bar">${left}
    <h1>${esc(t)}${sub ? `<br><span class="sub">${esc(sub)}</span>` : ''}</h1>${right}</div>`;
}

function renderTabs(){
  const need = state.shopping.filter(s => !s.done).length;
  const items = [
    ['cook','i-cook','Cook'], ['fridge','i-fridge','Fridge'],
    ['list','i-list','List'], ['plan','i-plan','Plan']
  ];
  $('#tabbar').innerHTML = items.map(([id, icon, label]) => {
    const on = view.screen === id || (id === 'cook' && view.screen === 'recipe');
    const badge = (id === 'list' && need) ? `<span class="badge num">${need}</span>` : '';
    return `<button class="tab" data-go="${id}" ${on?'aria-current="page"':''}>
      <span class="tab-wrap">${svg(icon)}${badge}</span><span>${label}</span></button>`;
  }).join('');
}

function screenHTML(){
  switch(view.screen){
    case 'cook':     return screenCook();
    case 'fridge':   return screenFridge();
    case 'list':     return screenList();
    case 'plan':     return screenPlan();
    case 'settings': return screenSettings();
    case 'recipe':   return screenRecipe();
    default:         return '';
  }
}

/* ------------------------------------------------------------- COOK */
function screenCook(){
  const f = view.filters;
  const appOpts = [['any','Any']].concat(state.appliances.map(a => [a.id, a.name]));
  const results = matchRecipes();

  /* The filters used to take 287 px off the top, so the first recipe started
     535 px down a 915 px screen — past the halfway line, on the one screen
     whose whole job is showing food. They fold away now and the summary line
     says what's on, so nothing is hidden, just quiet. */
  const stepper = `<div class="stepper">
      <button data-act="serv-" aria-label="Fewer servings">&minus;</button>
      <span class="val num">${state.prefs.servings}</span>
      <button data-act="serv+" aria-label="More servings">+</button>
    </div>`;

  const on = [];
  if (f.appliance !== 'any'){
    const a = state.appliances.find(x => x.id === f.appliance);
    if (a) on.push(a.name);
  }
  if (f.cuisine !== 'any') on.push(cuisineLabel(f.cuisine));
  if (f.time) on.push((TIMES.find(t => t[0] === f.time) || [0, ''])[1]);
  if (f.difficulty !== 'any') on.push(f.difficulty);

  const bar = `<div class="filterbar">
    <button class="opt fbtn ${on.length?'has':''}" data-act="toggle-filters"
            aria-expanded="${view.filtersOpen ? 'true' : 'false'}">
      ${svg('i-sliders','icon-sm')}
      <span class="fsum">${on.length ? esc(on.join(' &middot; ').replace(/&amp;middot;/g,'·')) : 'All recipes'}</span>
      ${svg('i-chev','icon-sm chev')}
    </button>
    ${stepper}
  </div>`;

  const panel = !view.filtersOpen ? '' : `
  <div class="filter">
    <div class="eyebrow">Cooking with</div>
    <div class="filter-row">${appOpts.map(([v, l]) =>
      `<button class="opt" data-f="appliance" data-v="${v}" aria-pressed="${f.appliance===v}">${esc(l)}</button>`).join('')}</div>
  </div>
  <div class="filter">
    <div class="eyebrow">Mood</div>
    <div class="filter-row">${CUISINES.map(([v, l]) =>
      `<button class="opt" data-f="cuisine" data-v="${v}" aria-pressed="${f.cuisine===v}">${esc(l)}</button>`).join('')}</div>
  </div>
  <div class="filter">
    <div class="eyebrow">Time I've got</div>
    <div class="filter-row">${TIMES.map(([v, l]) =>
      `<button class="opt" data-f="time" data-v="${v}" aria-pressed="${f.time===v}">${esc(l)}</button>`).join('')}</div>
  </div>
  <p class="grouplede">Servings are set above. Quantities scale to match.</p>`;

  const filters = bar + panel;

  const ai = `<button class="btn ghost" data-act="claude-kitchen">${svg('i-speak')} Ask Claude on my phone</button>
    <button class="btn ghost" data-act="ai">${svg('i-sparkle')} Invent me something new</button>`;

  if (!recipePool().length){
    return filters + `<div class="empty"><strong>No recipes loaded yet</strong>
      <p>The collection is still being researched. Every recipe gets checked against real
         cooks before it goes in here.</p></div>` + ai;
  }
  if (!results.length){
    return filters + `<div class="empty"><strong>Nothing matches those filters</strong>
      <p>Try loosening the time or the appliance — or let the AI invent something from
         what you've got.</p></div>` + ai;
  }

  /* Split by how much shopping it needs, because that is the actual question:
     what can I cook right now, versus what needs a trip to the shop. A flat
     ranked list buried the cookable ones among the ones he can't touch. */
  const ready = results.filter(m => m.missing.length === 0);
  const nearly = results.filter(m => m.missing.length === 1);
  const shop   = results.filter(m => m.missing.length > 1);

  /* Staples are ticked for him on first run, so a raw count is never zero and
     "has he told us anything yet" has to ignore them. */
  const ticked = TABS.reduce((n, t) => {
    const staples = itemsFor(t).filter(i => i.staple).map(i => i.name);
    return n + Object.keys(state.inventory[t])
      .filter(k => state.inventory[t][k] && state.inventory[t][k].have && !staples.includes(k))
      .length;
  }, 0);

  const group = (list, label, note) => !list.length ? '' :
    `<div class="eyebrow" style="padding-top:8px">${label} &middot; ${list.length}</div>`
    + (note ? `<p class="grouplede">${note}</p>` : '')
    + `<div class="section" style="gap:16px">${list.map(m => recipeCard(m)).join('')}</div>`;

  /* An empty kitchen puts everything in the last group, which looks broken
     rather than empty. Say why, and point at the screen that fixes it. */
  const nudge = ticked < 3
    ? `<div class="empty"><strong>Tell it what you&rsquo;ve got first</strong>
         <p>Nothing is ticked in your kitchen yet, so every recipe below looks like a
            shopping trip. Open <b>Fridge</b> and tick what you actually have &mdash; or
            tap <b>Say or paste my whole kitchen</b> and just say it out loud.</p>
         <button class="btn" data-go="fridge">Go to my fridge</button></div>`
    : !ready.length && !nearly.length
      ? `<p class="hint" style="margin:10px 2px">Nothing is fully in reach right now.
           Everything below needs two or more things from the shop.</p>`
      : '';

  return filters + nudge
       + group(ready,  'Cook this now',  'Everything for these is already in your kitchen.')
       + group(nearly, 'One thing short', 'Buy the single missing thing and these are on.')
       + group(shop,   'Needs a shop',    null)
       + ai;
}

function recipeCard(m){
  const r = m.r, rating = state.ratings[r.id] || 0;
  const missing = m.missing.length;
  const swaps = (m.swaps || []).length;
  const swapLine = swaps === 1
    ? `<span class="swap">Use your ${esc(m.swaps[0].swap.item)} instead of ${esc(m.swaps[0].ing.item)}.</span>`
    : swaps > 1
      ? `<span class="swap">${swaps} swaps from your shelves: ${m.swaps.slice(0,2).map(s => esc(s.swap.item)).join(', ')}${swaps>2?' and more':''}.</span>`
      : '';
  const matchLine = missing === 0
    ? (swaps
        ? `<span class="ok">You can cook this.</span> ${swapLine}`
        : `<span class="ok">You have everything.</span>`)
    : `You have <b>${r.ingredients.length - missing} of ${r.ingredients.length}</b> —
       still need ${m.missing.slice(0,3).map(i => esc(i.item)).join(', ')}${missing>3?` and ${missing-3} more`:''}.
       ${swapLine}`;
  return `<button class="rcard" data-open="${esc(r.id)}">
    <span class="photo">${photoHTML(r)}${rating ? `<span class="stars">${svg('i-star','icon-sm')}${rating}</span>` : ''}</span>
    <span class="rcard-body">
      <span class="eyebrow">${esc(cuisineLabel(r.cuisine))} &middot; ${esc(applianceLabel(r))} &middot; ${r.activeMinutes||r.minutes} min</span>
      <h3>${esc(r.title)}</h3>
      ${r.subtitle ? `<span class="gloss">${esc(r.subtitle)}</span>` : ''}
      <span class="match">${matchLine}</span>
      ${m.capacityWarning ? `<span class="warnline">${svg('i-timer','icon-sm')}${esc(m.capacityWarning)}</span>` : ''}
    </span></button>`;
}

function photoHTML(r){
  if (r.photo) return `<img src="${esc(r.photo)}" alt="" loading="lazy">`;
  return `<span class="fallback">${dishSVG(r)}</span>`;
}
/* Deterministic placeholder so a recipe always looks the same, never a fake photo. */
function dishSVG(r){
  let h = 0; for (const c of (r.id || 'x')) h = (h * 31 + c.charCodeAt(0)) % 360;
  return `<svg class="dish" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="320" height="180" fill="var(--surface-2)"/>
    <circle cx="160" cy="96" r="66" fill="none" stroke="var(--line-2)" stroke-width="1.5"/>
    <circle cx="160" cy="96" r="52" fill="none" stroke="var(--line-2)" stroke-width="1"/>
    <ellipse cx="142" cy="88" rx="19" ry="12" transform="rotate(-14 142 88)" fill="var(--accent)" opacity=".55"/>
    <ellipse cx="180" cy="83" rx="21" ry="13" transform="rotate(9 180 83)" fill="var(--accent)" opacity=".38"/>
    <path d="M124 106c14-15 32-21 42-21s28 6 42 21c-12 12-27 18-42 18s-30-6-42-18z"
          fill="var(--accent)" opacity=".28"/>
    <circle cx="${130 + (h % 40)}" cy="118" r="4" fill="var(--accent)" opacity=".5"/>
  </svg>`;
}
function cuisineLabel(c){ const hit = CUISINES.find(x => x[0] === c); return hit ? hit[1] : 'Food'; }
function applianceLabel(r){
  const first = (r.appliances || [])[0];
  const a = state.appliances.find(x => x.id === first);
  return a ? a.name : 'Stove';
}
function findRecipe(id){ return recipePool().find(r => r.id === id) || null; }

/* ------------------------------------------------------------- FRIDGE */
function screenFridge(){
  const tab = view.tab;
  const q = norm(view.search);
  let items = itemsFor(tab);
  if (q) items = items.filter(i => norm(i.name).includes(q));

  const tabs = `<div class="filter-row">${TABS.map(t =>
    `<button class="opt" data-tab="${t}" aria-pressed="${tab===t}">${TAB_LABEL[t]}</button>`).join('')}</div>`;

  const search = `<div class="searchbox">${svg('i-search')}
    <input type="text" placeholder="Type anything &mdash; found or not" value="${esc(view.search)}"
           data-role="search" enterkeyhint="done" autocomplete="off">
    ${view.search ? `<button class="bar-btn" data-act="clear-search" aria-label="Clear">${svg('i-x','icon-sm')}</button>` : ''}
  </div>`;

  const inv = state.inventory[tab];
  const rows = items.map(i => {
    const st = inv[i.name] || {};
    const flag = st.always ? `<span class="always-tag">ALWAYS</span>`
               : st.have && st.low ? `<span class="low">LOW</span>` : '';
    return `<button class="item ${st.have?'on':''} ${st.always?'always':''}" data-item="${esc(i.name)}">
      <span class="box"></span>
      <span class="name">${esc(i.name)}</span>
      ${flag}
      <span class="more" data-more="${esc(i.name)}" role="presentation">${svg('i-plus','icon-sm')}</span>
    </button>`;
  }).join('');

  /* The add button sits directly under the box you typed in. It used to live
     below the whole list, where on a phone it was off the bottom of the screen
     and nobody ever found it. */
  const typed = view.search.trim();
  const already = items.find(i => norm(i.name) === norm(typed));
  const knownAs = !already && typed
    ? allItems().find(i => sameItem(i.name, typed))
    : null;

  let addBlock = '';
  if (typed && !already){
    addBlock = knownAs
      ? `<button class="btn" data-act="add-known" data-name="${esc(knownAs.name)}"
                 data-ktab="${knownAs.tab}">
           ${svg('i-plus')} Tick &ldquo;${esc(knownAs.name)}&rdquo;
         </button>
         <p class="hint">You typed &ldquo;${esc(typed)}&rdquo; &mdash; same thing, already on your
           ${TAB_LABEL[knownAs.tab].toLowerCase()} list.</p>`
      : `<button class="btn" data-act="add-item">
           ${svg('i-plus')} Add &ldquo;${esc(typed)}&rdquo; to ${TAB_LABEL[tab].toLowerCase()}
         </button>
         <p class="hint">Goes in ${AISLES[aisleOf(typed, tab)].toLowerCase()}. Recipes asking for it will
           count it, whatever they call it.</p>`;
  }

  const addAlways = typed ? '' :
    `<button class="btn ghost" data-act="focus-search">${svg('i-plus')} Add something that isn&rsquo;t listed</button>`;

  /* Above the list, not below it. Each tab holds forty-odd rows, so anything
     placed after them lands a couple of thousand pixels off the bottom of a
     phone screen — which is exactly how the last two affordances got lost. */
  const sayAll = typed ? '' :
    `<button class="btn" data-act="paste-list">${svg('i-speak')} Say or paste my whole kitchen</button>`;

  const count = Object.values(inv).filter(v => v && v.have).length;
  const always = Object.values(inv).filter(v => v && v.always).length;

  return tabs + search + addBlock + sayAll
    + (items.length
        ? `<div class="group">${rows}</div>`
        : typed
          ? ''
          : `<div class="empty"><strong>Nothing here yet</strong><p>Type a name above to add your first item.</p></div>`)
    + addAlways
    /* No "hold a row to…" line down here. Forty-odd rows above it means nobody
       ever reads it — the ⊕ menu is where that gets taught instead. */
    + `<p class="eyebrow" style="text-align:center;padding-top:6px">${count} item${count===1?'':'s'} in your ${TAB_LABEL[tab].toLowerCase()}${always ? ` &middot; ${always} always in stock` : ''}</p>`;
}

/* ------------------------------------------------------------- LIST */
function screenList(){
  if (!state.shopping.length){
    return `<div class="empty">${svg('i-cart')}<strong>Your list is empty</strong>
      <p>Open a recipe and tap the missing ingredients, or plan a meal for later —
         everything you need collects here, sorted by aisle.</p></div>`;
  }
  const byAisle = {};
  state.shopping.forEach((s, idx) => {
    const a = s.aisle || 'other';
    (byAisle[a] = byAisle[a] || []).push({ ...s, idx });
  });
  const sections = AISLE_ORDER.filter(a => byAisle[a]).map(a => {
    const rows = byAisle[a].map(s => `
      <button class="shop ${s.done?'done':''}" data-shop="${s.idx}">
        <span class="box"></span>
        <span class="name">${esc(s.item)}${s.from ? `<span class="from">for ${esc(s.from)}</span>` : ''}</span>
        ${s.qty ? `<span class="q">${esc(s.qty)}</span>` : ''}
      </button>`).join('');
    const left = byAisle[a].filter(s => !s.done).length;
    return `<div class="aisle"><div class="eyebrow">${AISLES[a]} <span>${left} left</span></div>${rows}</div>`;
  }).join('');

  const done = state.shopping.filter(s => s.done).length;
  const clear = done
    ? `<button class="btn ghost" data-act="clear-done">Clear ${done} ticked item${done===1?'':'s'} &amp; stock my kitchen</button>`
    : '';
  return sections + clear;
}

/* ------------------------------------------------------------- PLAN */
function screenPlan(){
  if (!state.planned.length){
    return `<div class="empty">${svg('i-plan')}<strong>Nothing planned</strong>
      <p>Open any recipe and tap <b>Plan this</b> to line it up for tomorrow or later.
         Frigo works out what you'd still need to buy.</p></div>`;
  }
  const rows = state.planned.map((p, idx) => {
    const r = findRecipe(p.recipeId);
    if (!r) return '';
    const a = analyse(r, p.servings || state.prefs.servings);
    return `<div class="plan-row">
      <div class="thumb">${photoHTML(r)}</div>
      <div class="info">
        <span class="when">${esc(whenLabel(p.date))}</span>
        <span class="t">${esc(r.title)}</span>
        <span class="n">${a.missing.length
          ? `${a.missing.length} thing${a.missing.length===1?'':'s'} to buy`
          : 'You have everything'}</span>
      </div>
      ${a.missing.length
        ? `<button class="btn sm" data-act="plan-buy" data-i="${idx}">Add to list</button>`
        : `<button class="btn sm ghost" data-open="${esc(r.id)}">Cook</button>`}
    </div>`;
  }).join('');
  return `<div class="section">${rows}</div>`;
}
function whenLabel(iso){
  const today = new Date(); today.setHours(0,0,0,0);
  const d = new Date(iso + 'T00:00:00');
  const days = Math.round((d - today) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days === 2) return 'Day after tomorrow';
  if (days < 0) return 'Overdue';
  return d.toLocaleDateString(undefined, { weekday:'long', month:'short', day:'numeric' });
}

/* ------------------------------------------------------------- RECIPE */
function screenRecipe(){
  const r = findRecipe(view.recipeId);
  if (!r) return `<div class="empty"><strong>Recipe not found</strong></div>`;
  const servings = state.prefs.servings;
  const a = analyse(r, servings);
  const rating = state.ratings[r.id] || 0;

  const ings = r.ingredients.map((ing, i) => {
    const missing = a.missing.includes(ing);
    const swapped = (a.swaps || []).find(s => s.ing === ing);
    return `<div class="ing ${missing?'missing':''}${swapped?' swapped':''}">
      <span class="q">${esc(qtyLabel(ing, a.factor))}</span>
      <span class="n">${esc(ing.item)}${ing.note ? `<small>${esc(ing.note)}</small>` : ''}${
        swapped ? `<small class="swapnote">Use your <b>${esc(swapped.swap.item)}</b> — ${esc(swapped.swap.note)}</small>` : ''}${
        missing && ing.sub ? `<small>Or: ${esc(ing.sub)}</small>` : ''}</span>
      ${missing
        ? `<button class="add" data-buy="${i}">Buy</button>`
        : swapped
          ? `<span class="sub-badge">swap</span>`
          : `<span class="have">${svg('i-star','icon-sm')}</span>`}
    </div>`;
  }).join('');

  const steps = r.steps.map((s, i) => `<li>
      <div><div class="txt">${esc(s.text)}</div>
      ${s.minutes ? `<button class="timer" data-timer="${s.minutes}">${svg('i-timer','icon-sm')} Start ${s.minutes} min</button>` : ''}
      </div></li>`).join('');

  const stars = [1,2,3,4,5].map(n =>
    `<button data-rate="${n}" class="${n<=rating?'on':''}" aria-label="${n} stars">${svg('i-star')}</button>`).join('');

  return `
  <div class="hero"><div class="photo">${photoHTML(r)}</div></div>

  <div class="section">
    <span class="eyebrow">${esc(cuisineLabel(r.cuisine))} &middot; ${esc(applianceLabel(r))}</span>
    <h2 style="font-size:26px">${esc(r.title)}</h2>
    ${r.subtitle ? `<p class="muted">${esc(r.subtitle)}</p>` : ''}
    <div class="chips">
      <span class="chip">${r.minutes} min total</span>
      <span class="chip">${r.activeMinutes||r.minutes} min hands-on</span>
      <span class="chip">${esc(r.difficulty)}</span>
      <span class="chip accent">${servings} serving${servings===1?'':'s'}</span>
    </div>
    ${a.capacityWarning ? `<p class="warnline" style="color:var(--warn);font-size:13px">${esc(a.capacityWarning)}</p>` : ''}
  </div>

  <div class="row">
    <div class="lab"><b>Cooking for</b><small>Everything below rescales</small></div>
    <div class="stepper">
      <button data-act="serv-" aria-label="Fewer">&minus;</button>
      <span class="val num">${servings}</span>
      <button data-act="serv+" aria-label="More">+</button>
    </div>
  </div>

  <button class="btn" data-act="cookalong">${svg('i-speak')} Read it to me, step by step</button>
  <button class="btn ghost" data-act="claude-recipe">${svg('i-sparkle')} Talk it through with Claude</button>

  <div class="section"><h2>Ingredients</h2><div>${ings}</div>
    ${a.missing.length
      ? `<button class="btn ghost" data-act="buy-all">${svg('i-cart')} Add all ${a.missing.length} missing to my list</button>`
      : ''}
  </div>

  ${r.misePlace && r.misePlace.length ? `<div class="section">
    <h2>Before you turn on the heat</h2>
    <ul class="mise">${r.misePlace.map(m => `<li>${esc(m)}</li>`).join('')}</ul>
  </div>` : ''}

  <div class="section"><h2>Method</h2><ol class="steps">${steps}</ol></div>

  ${r.beginnerTip ? `<div class="note tip"><span class="label">Beginner tip</span>${esc(r.beginnerTip)}</div>` : ''}
  ${r.makeItBetter ? `<div class="note better"><span class="label">Make it better</span>${esc(r.makeItBetter)}</div>` : ''}

  <div class="section"><h2>How was it?</h2>
    <div class="rate">${stars}</div>
    <p class="eyebrow" style="text-align:center">${rating ? 'Five-star ones come back to the top' : 'Rate it after you cook it'}</p>
  </div>

  <button class="btn ghost" data-act="plan-this">${svg('i-plan')} Plan this for another day</button>
  <button class="btn ghost" data-act="used-up">${svg('i-fridge')} I cooked it &mdash; what did I use up?</button>

  ${r.source ? `<p class="eyebrow" style="text-align:center;line-height:1.6">
    Adapted from ${esc(r.source.name)}</p>` : ''}
  ${r.photoCredit ? `<p class="eyebrow" style="text-align:center;line-height:1.6">
    Photo by ${esc(r.photoCredit.by)} &middot; ${esc(r.photoCredit.lic)}</p>` : ''}`;
}

/* ------------------------------------------------------- COOK-ALONG */
function renderCookAlong(){
  const c = view.cookAlong, r = findRecipe(c.recipeId);
  if (!r){ view.cookAlong = null; render(); return; }
  const total = r.steps.length + 1;
  const isMise = c.i === 0;
  const step = isMise ? null : r.steps[c.i - 1];

  const body = isMise
    ? `<div class="ca-step">Get everything ready first.</div>
       <ul class="mise">${(r.misePlace||[]).map(m => `<li>${esc(m)}</li>`).join('')}</ul>`
    : `<div class="ca-step">${esc(step.text)}</div>
       ${step.minutes ? `<button class="timer" data-timer="${step.minutes}">${svg('i-timer','icon-sm')} Start ${step.minutes} min</button>` : ''}`;

  let el = document.querySelector('.cookalong');
  if (!el){ el = document.createElement('div'); el.className = 'cookalong'; document.body.appendChild(el); }
  el.innerHTML = `
    <div class="ca-top">
      <span class="eyebrow">${esc(r.title)} &middot; ${c.i + 1} of ${total}</span>
      <button class="bar-btn" data-act="ca-close" aria-label="Close">${svg('i-x')}</button>
    </div>
    <div class="progress">${Array.from({length:total},(_,i)=>`<i class="${i<=c.i?'done':''}"></i>`).join('')}</div>
    <div class="ca-body">${body}</div>
    <div class="ca-nav">
      <button class="btn ghost" data-act="ca-repeat" aria-label="Read again">${svg('i-speak')}</button>
      ${c.i < total - 1
        ? `<button class="btn" data-act="ca-next">Next step</button>`
        : `<button class="btn" data-act="ca-done">Done &mdash; rate it</button>`}
    </div>`;
  speakCurrent();
}
function speakCurrent(){
  const c = view.cookAlong, r = findRecipe(c && c.recipeId);
  if (!c || !r || !('speechSynthesis' in window)) return;
  const text = c.i === 0
    ? 'Before you start. ' + (r.misePlace || []).join('. ')
    : r.steps[c.i - 1].text;
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = .95; u.pitch = 1;
    speechSynthesis.speak(u);
  }catch(e){}
}

/* ------------------------------------------------------------- SETTINGS */
function screenSettings(){
  const p = state.prefs;
  const apps = state.appliances.map((a, i) => `
    <div class="row">
      <div class="lab"><b>${esc(a.name)}</b><small>${a.qt ? a.qt + ' quart' : 'No size limit'}</small></div>
      <button class="bar-btn" data-act="del-app" data-i="${i}" aria-label="Remove">${svg('i-x','icon-sm')}</button>
    </div>`).join('');

  return `
  <div class="section"><h2>My kitchen</h2>
    <div class="card pad" style="padding:4px 16px">${apps}</div>
    <button class="btn ghost" data-act="add-app">${svg('i-plus')} Add an appliance</button>
    <p class="hint">Sizes matter — Frigo warns you when a recipe won&rsquo;t fit.</p>
  </div>

  <div class="section"><h2>How I like it</h2>
    <div class="card pad" style="padding:4px 16px">
      <div class="row"><div class="lab"><b>Usual servings</b><small>Starting point on every recipe</small></div>
        <div class="stepper">
          <button data-act="serv-">&minus;</button><span class="val num">${p.servings}</span>
          <button data-act="serv+">+</button>
        </div></div>
      <div class="row"><div class="lab"><b>Spice level</b><small>1 is gentle, 5 has a real kick</small></div>
        <div class="stepper">
          <button data-act="spice-">&minus;</button><span class="val num">${p.spice}</span>
          <button data-act="spice+">+</button>
        </div></div>
      <div class="row"><div class="lab"><b>Assume staples</b><small>Salt, oil, butter, flour always counted as in stock</small></div>
        <button class="opt" data-act="toggle-staples" aria-pressed="${p.staplesOn}">${p.staplesOn?'On':'Off'}</button>
      </div>
    </div>
  </div>

  <div class="section"><h2>Appearance</h2>
    <div class="filter-row">${[['auto','Follow phone'],['dark','Dark'],['light','Light']].map(([v,l]) =>
      `<button class="opt" data-theme="${v}" aria-pressed="${p.theme===v}">${l}</button>`).join('')}</div>
  </div>

  <div class="section"><h2>Talking to Claude by voice</h2>
    <button class="btn ghost" data-act="claude-kitchen">${svg('i-speak')} Send my kitchen to Claude</button>
    <button class="btn ghost" data-act="claude-standing">${svg('i-sparkle')} Copy my standing cook&rsquo;s prompt</button>
    <button class="btn ghost" data-act="claude-file">${svg('i-list')} Save my kitchen as a file</button>
    <p class="hint">Frigo hands the text to your phone and you pick Claude from the share list.
       It lands as your first message &mdash; then tap the <b>microphone</b> and talk.</p>
    <p class="hint">Set it up once: in the Claude app make a <b>Project</b> called Cooking,
       paste the standing prompt into its instructions, and upload the file. After that every
       chat in there already knows your gear, your shelves and the recipes you own.
       The file is a <b>snapshot</b> &mdash; save it again when your kitchen has really
       changed. For tonight, the buttons above are always live.</p>
  </div>

  <div class="section"><h2>Invent-a-recipe</h2>
    <div class="field">
      <label for="apikey">Claude API key</label>
      <input id="apikey" type="password" data-role="apikey" value="${esc(p.apiKey)}"
             placeholder="sk-ant-..." autocomplete="off" spellcheck="false">
      <p class="hint">Only needed for the &ldquo;invent me something&rdquo; button. Stored on this
         phone and nowhere else. You get a key at console.anthropic.com, and it is billed
         separately from a Claude subscription &mdash; having one does not give you the other.
         Each invented recipe costs <b>roughly five cents</b>, so five dollars of credit is
         about a hundred of them.</p>
    </div>
  </div>

  <div class="section"><h2>Update from a list</h2>
    <button class="btn" data-act="paste-list">${svg('i-plus')} Paste what I&rsquo;ve got</button>
    <p class="hint">Say your fridge out loud to Claude, or to anything else, and drop the list
       in here. Commas or one per line, both fine. It works out what each thing is, so
       &ldquo;coriandre&rdquo; and &ldquo;2 boxes of eggs&rdquo; both land in the right place.</p>
  </div>

  <div class="section"><h2>Your data</h2>
    <button class="btn ghost" data-act="export">Save a backup file</button>
    <button class="btn ghost" data-act="import">Restore from a backup</button>
    <p class="hint">Everything lives on this phone only. Nothing is uploaded, ever.</p>
  </div>`;
}

/* ------------------------------------------- reading a list someone wrote

   Free text in, inventory out. The list might come from Claude, from a note,
   or from Jerome talking into the box, so it has to cope with bullets,
   quantities and the word "and". */
const LIST_NOISE = /^[\s\-•*\d.)\]]+|\b(a|an|some|few|couple|of|and|i|ive|i've|have|got|there|is|are|my|the)\b/gi;
const QTY_LEAD = /^\s*(\d+[\d\/.,]*)\s*(x|kg|g|lb|lbs|oz|ml|l|litres?|liters?|cups?|tbsp|tsp|cloves?|pieces?|packs?|packets?|boxes?|box|bags?|bunch(es)?|tins?|cans?|jars?|bottles?)?\s*/i;

function tabForAisle(aisle){
  if (aisle === 'frozen') return 'freezer';
  if (aisle === 'spices') return 'spices';
  if (aisle === 'produce' || aisle === 'dairy' || aisle === 'meat') return 'fridge';
  return 'pantry';
}

/* Dictated speech rarely has commas in it — "eggs some milk harissa" arrives as
   one run. These are the words people put between items when they're talking,
   so they mark a boundary as reliably as a comma does. */
const LIST_SPLIT = /[,;\n\r]+|\b(?:and|plus|also|then|some|a|an|few|couple)\b/i;

/* Even after splitting, one fragment often holds several things — someone
   reeling off "eggs milk harissa chicken thighs" pauses for none of it. So
   rather than trusting the separators, walk the words and take the longest
   run that matches something we know. Longest-first matters: "double cream"
   has to win over the "cream" sitting inside it. */
const MAX_ITEM_WORDS = 4;

/* How many words actually carry meaning, once filler is dropped. */
function sigCount(name){
  const p = itemParts(name);
  return p ? p.mods.size + 1 : 0;
}

/* sameItem lets a name match when one side's qualifiers are a subset of the
   other's — right for "tomatoes" vs "ripe tomatoes", disastrous here, because
   "eggs milk butter garlic" would match plain "garlic" and eat the three words
   in front of it. Inside a window, both sides must weigh the same. */
function harvestKnown(words, shelf){
  const found = [];
  let i = 0;
  while (i < words.length){
    let hit = null, span = 0;
    for (let n = Math.min(MAX_ITEM_WORDS, words.length - i); n >= 1; n--){
      const phrase = words.slice(i, i + n).join(' ');
      const weight = sigCount(phrase);
      if (!weight) continue;
      const match = shelf.find(k => norm(k.name) === phrase)
                 || shelf.find(k => sigCount(k.name) === weight && sameItem(k.name, phrase));
      if (match){ hit = match; span = n; break; }
    }
    if (hit){ found.push(hit); i += span; }
    else i++;
  }
  return found;
}

function applyItemList(text){
  const ticked = [], added = [], unknown = [];
  const shelf = allItems();
  String(text).split(LIST_SPLIT).forEach(raw => {
    const s = norm(String(raw).replace(QTY_LEAD, '').replace(LIST_NOISE, ' '))
                .replace(/[^a-z0-9'\s-]/g,' ').replace(/\s+/g,' ').trim();
    if (s.length < 2) return;
    if (!itemParts(s)) { unknown.push(raw.trim()); return; }

    const hits = harvestKnown(s.split(' '), shelf);
    if (hits.length){
      hits.forEach(k => {
        if (ticked.includes(k.name)) return;
        state.inventory[k.tab][k.name] = { have:true, low:false };
        ticked.push(k.name);
      });
      return;
    }
    /* Nothing in the fragment is recognised, so take it whole — that's how a
       genuinely new item like "urfa biber" survives instead of being chopped. */
    const tab = tabForAisle(aisleOf(s));
    if (!state.custom[tab].some(o => norm(o.name) === s))
      state.custom[tab].push({ name:s, aisle:aisleOf(s, tab), staple:false });
    state.inventory[tab][s] = { have:true, low:false };
    added.push(s);
  });
  return { ticked, added, unknown };
}

function reportList(r){
  const line = (label, arr) => arr.length
    ? `<p><b>${arr.length} ${label}</b><br><span class="hint">${esc(arr.slice(0,12).join(', '))}${arr.length>12?` and ${arr.length-12} more`:''}</span></p>`
    : '';
  const nothing = !r.ticked.length && !r.added.length;
  openSheet(`<h2>${nothing ? 'Nothing I could read' : 'Kitchen updated'}</h2>
    ${line('ticked', r.ticked)}
    ${line('added as new', r.added)}
    ${r.unknown.length ? line('I couldn&rsquo;t work out', r.unknown) : ''}
    <button class="btn" data-act="close-sheet">Done</button>`);
}

function openPasteList(){
  openSheet(`<h2>Say what you&rsquo;ve got</h2>
    <p class="hint">Tap the box, then the <b>microphone</b> on your keyboard, and just say
       your kitchen out loud. Or paste a list. Quantities and the word &ldquo;and&rdquo; are
       fine &mdash; it sorts them out.</p>
    <textarea data-role="listbox" rows="7" placeholder="I've got eggs, some milk, harissa,
chicken thighs, a bunch of spring onions and prawns"></textarea>
    <button class="btn" data-act="apply-list">Add all of it</button>
    <button class="btn ghost" data-act="close-sheet">Cancel</button>`);
  const box = document.querySelector('[data-role=listbox]');
  if (box) box.focus();
}

/* ------------------------------------------------------------- sheets */
function openSheet(html){
  const s = $('#sheet');
  s.innerHTML = `<div class="sheet-inner"><div class="grab"></div>${html}</div>`;
  s.hidden = false;
}
function closeSheet(){ $('#sheet').hidden = true; $('#sheet').innerHTML = ''; }

/* ------------------------------------------------------------- actions */
/* Every recipe ingredient already declares the aisle it belongs to, and that
   hand-checked value beats guessing from the name. Only fall back to a guess
   when the item came from somewhere without one. */
function addToShopping(item, qty, fromTitle, aisle){
  const exists = state.shopping.find(s => norm(s.item) === norm(item) && !s.done);
  if (exists) return false;
  state.shopping.push({ item, qty: qty || '', aisle: aisle || aisleOf(item),
                        from: fromTitle || '', done:false });
  return true;
}

function toggleAlways(tab, name){
  const inv = state.inventory[tab];
  const cur = inv[name] || { have:false, low:false };
  const on = !cur.always;
  inv[name] = on ? { have:true, low:false, always:true }
                 : { have:cur.have, low:cur.low };
  /* A held row changes state with nothing under the finger to show it — the
     buzz is the only feedback until the render lands. */
  try{ navigator.vibrate && navigator.vibrate(on ? 18 : 8); }catch(e){}
  save(); render();
  toast(on ? name + ' — always in stock' : name + ' — back to normal');
}

function setTheme(){
  const t = state.prefs.theme;
  if (t === 'auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', t);
  const meta = document.querySelector('meta[name=theme-color]');
  if (meta) meta.setAttribute('content', t === 'light' ? '#FAF7F2' : '#111010');
}

function beep(){
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = 880; o.type = 'sine';
    g.gain.setValueAtTime(.001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(.3, ctx.currentTime + .02);
    g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + 1.1);
    o.start(); o.stop(ctx.currentTime + 1.2);
  }catch(e){}
  if (navigator.vibrate) navigator.vibrate([220, 120, 220]);
}
function startTimer(mins, btn){
  if (btn.classList.contains('running')) return;
  btn.classList.add('running');
  const end = Date.now() + mins * 60000;
  const tick = () => {
    const left = Math.max(0, end - Date.now());
    const m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
    btn.innerHTML = svg('i-timer','icon-sm') + ` ${m}:${String(s).padStart(2,'0')}`;
    if (left <= 0){ clearInterval(id); beep(); toast('Timer done'); btn.classList.remove('running'); }
  };
  const id = setInterval(tick, 250); tick();
}

function isoPlus(days){
  const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate() + days);
  return d.toISOString().slice(0,10);
}

/* -------------------------------------------------- hold to keep in stock */
/* The same switch lives in the ⊕ menu. A gesture nobody can see isn't a
   feature on its own, so the hold is the shortcut, not the only way in. */
let hold = null;
let swallowClick = false;

function cancelHold(){
  if (!hold) return;
  clearTimeout(hold.timer);
  hold = null;
}

document.addEventListener('pointerdown', e => {
  const row = e.target.closest('#screen [data-item]');
  if (!row || e.target.closest('[data-more]')) return;
  const name = row.dataset.item;
  hold = { name, x:e.clientX, y:e.clientY, timer:0 };
  hold.timer = setTimeout(() => {
    hold = null;
    /* render() replaces the row, so the click that follows may land nowhere
       useful — or on whatever takes its place. Eat it either way. */
    swallowClick = true;
    setTimeout(() => { swallowClick = false; }, 700);
    toggleAlways(view.tab, name);
  }, 500);
});
document.addEventListener('pointermove', e => {
  if (hold && Math.hypot(e.clientX - hold.x, e.clientY - hold.y) > 12) cancelHold();
});
document.addEventListener('pointerup', cancelHold);
document.addEventListener('pointercancel', cancelHold);
document.addEventListener('scroll', cancelHold, true);
document.addEventListener('contextmenu', e => {
  if (e.target.closest('#screen [data-item]')) e.preventDefault();
});

/* ------------------------------------------------------------- events */
document.addEventListener('click', e => {
  if (swallowClick){ swallowClick = false; e.preventDefault(); e.stopPropagation(); return; }
  const t = e.target.closest('[data-go],[data-act],[data-open],[data-f],[data-tab],[data-item],[data-more],[data-shop],[data-rate],[data-buy],[data-timer],[data-theme],[data-i]');
  if (!t) {
    if (e.target.id === 'sheet') closeSheet();
    return;
  }

  /* nav */
  if (t.dataset.go){ view.screen = t.dataset.go; view.recipeId = null; render(); return; }
  if (t.dataset.open){ view.screen = 'recipe'; view.recipeId = t.dataset.open; render(); return; }

  /* cook filters */
  if (t.dataset.f){
    const v = t.dataset.f === 'time' ? Number(t.dataset.v) : t.dataset.v;
    view.filters[t.dataset.f] = v; render(); return;
  }
  if (t.dataset.tab){ view.tab = t.dataset.tab; view.search = ''; render(); return; }
  if (t.dataset.theme){ state.prefs.theme = t.dataset.theme; setTheme(); save(); render(); return; }

  /* inventory */
  if (t.dataset.more){
    e.stopPropagation();
    const name = t.dataset.more, cur = state.inventory[view.tab][name] || {};
    openSheet(`<h2>${esc(name)}</h2>
      <button class="btn ghost" data-act="toggle-always" data-name="${esc(name)}">
        ${cur.always ? 'Not always in stock any more' : 'Always in stock'}</button>
      <p class="hint">${cur.always
        ? 'It stays ticked and never lands on the shopping list. Holding the row does this too.'
        : 'For the things you never run out of. Hold the row on the list to do this without opening this menu.'}</p>
      <button class="btn ${cur.low?'':'ghost'}" data-act="toggle-low" data-name="${esc(name)}">
        ${cur.low ? 'Not running low any more' : 'Mark as running low'}</button>
      <button class="btn ghost" data-act="to-list" data-name="${esc(name)}">Add to shopping list</button>
      <button class="btn ghost" data-act="rename-item" data-name="${esc(name)}">Fix the spelling</button>
      <button class="btn ghost" data-act="hide-item" data-name="${esc(name)}">Remove from my list</button>
      <button class="btn ghost" data-act="close-sheet">Cancel</button>`);
    return;
  }
  if (t.dataset.item){
    const name = t.dataset.item, inv = state.inventory[view.tab];
    const cur = inv[name] || { have:false, low:false };
    if (cur.always){
      toast(name + ' is always in stock', { label:'Change that', fn:() => toggleAlways(view.tab, name) });
      return;
    }
    const nowHave = !cur.have;
    inv[name] = { have: nowHave, low: nowHave ? cur.low : false };
    save(); render();
    /* Ran out of something — the next thing he wants is it on the list. */
    if (!nowHave && !onShoppingList(name)){
      toast('Out of ' + name, { label:'Add to list', fn:() => {
        addToShopping(name, '', '', aisleOf(name, view.tab));
        save(); render(); toast(name + ' is on your shopping list');
      }});
    }
    return;
  }
  if (t.dataset.shop !== undefined && t.dataset.shop !== ''){
    const s = state.shopping[Number(t.dataset.shop)];
    if (s){ s.done = !s.done; save(); render(); }
    return;
  }
  if (t.dataset.rate){
    const r = findRecipe(view.recipeId);
    if (r){
      state.ratings[r.id] = Number(t.dataset.rate);
      state.cooked[r.id] = isoPlus(0);
      save(); render();
      toast(Number(t.dataset.rate) >= 4 ? 'Noted — this one comes back to the top' : 'Noted');
    }
    return;
  }
  if (t.dataset.buy !== undefined && t.dataset.buy !== ''){
    const r = findRecipe(view.recipeId);
    const ing = r && r.ingredients[Number(t.dataset.buy)];
    if (ing){
      const a = analyse(r, state.prefs.servings);
      addToShopping(ing.item, qtyLabel(ing, a.factor), r.title, ing.aisle);
      save(); render(); toast(ing.item + ' added to your list');
    }
    return;
  }
  if (t.dataset.timer){ startTimer(Number(t.dataset.timer), t); return; }

  /* named actions */
  const act = t.dataset.act;
  if (!act) return;

  switch(act){
    case 'back':
      view.screen = view.recipeId ? 'cook' : 'cook'; view.recipeId = null; render(); break;
    case 'settings': view.screen = 'settings'; render(); break;
    case 'close-sheet': closeSheet(); break;

    case 'fav': {
      const id = view.recipeId, i = state.favorites.indexOf(id);
      if (i >= 0) state.favorites.splice(i,1); else state.favorites.push(id);
      save(); render(); break;
    }
    case 'serv+': state.prefs.servings = Math.min(8, state.prefs.servings + 1); save(); render(); break;
    case 'serv-': state.prefs.servings = Math.max(1, state.prefs.servings - 1); save(); render(); break;
    case 'spice+': state.prefs.spice = Math.min(5, state.prefs.spice + 1); save(); render(); break;
    case 'spice-': state.prefs.spice = Math.max(1, state.prefs.spice - 1); save(); render(); break;
    case 'toggle-staples': state.prefs.staplesOn = !state.prefs.staplesOn; save(); render(); break;

    case 'toggle-filters': view.filtersOpen = !view.filtersOpen; render(); break;

    case 'paste-list': openPasteList(); break;
    case 'apply-list': {
      const box = document.querySelector('[data-role=listbox]');
      const r = applyItemList(box ? box.value : '');
      save(); render(); reportList(r);
      break;
    }

    case 'clear-search': view.search = ''; render(); break;
    case 'add-item': {
      const name = view.search.trim();
      if (!name) break;
      if (!state.custom[view.tab].some(o => norm(o.name) === norm(name)))
        state.custom[view.tab].push({ name, aisle: aisleOf(name, view.tab), staple:false });
      state.inventory[view.tab][name] = { have:true, low:false };
      view.search = ''; save(); render(); toast(name + ' added — you have it');
      break;
    }
    /* Typed a different word for something already on the list — tick that
       instead of creating a duplicate row that says the same thing. */
    case 'add-known': {
      const name = t.dataset.name, ktab = t.dataset.ktab || view.tab;
      state.inventory[ktab][name] = { have:true, low:false };
      view.search = ''; view.tab = ktab; save(); render();
      toast(name + ' ticked in ' + TAB_LABEL[ktab].toLowerCase());
      break;
    }
    case 'focus-search': {
      const box = document.querySelector('[data-role=search]');
      if (box) box.focus();
      break;
    }
    case 'toggle-low': {
      const n = t.dataset.name, inv = state.inventory[view.tab];
      inv[n] = inv[n] || { have:true, low:false };
      inv[n].low = !inv[n].low; inv[n].have = true;
      closeSheet(); save(); render(); break;
    }
    case 'toggle-always': {
      closeSheet(); toggleAlways(view.tab, t.dataset.name); break;
    }
    case 'to-list': {
      addToShopping(t.dataset.name, '', '', aisleOf(t.dataset.name, view.tab));
      closeSheet(); save(); render(); toast('Added to your list'); break;
    }
    case 'rename-item': {
      const name = t.dataset.name;
      openSheet(`<h2>What should it be called?</h2>
        <input type="text" data-role="renamebox" value="${esc(name)}"
               enterkeyhint="done" autocomplete="off" autocapitalize="none" spellcheck="false">
        <p class="hint">Ticked or not, running low, and anything already on your shopping
           list all follow the new name.</p>
        <button class="btn" data-act="rename-save" data-name="${esc(name)}">Save</button>
        <button class="btn ghost" data-act="close-sheet">Cancel</button>`);
      const box = document.querySelector('[data-role=renamebox]');
      if (box){ box.focus(); box.select(); }
      break;
    }
    case 'rename-save': {
      const box = document.querySelector('[data-role=renamebox]');
      const from = t.dataset.name, to = box ? box.value.trim().replace(/\s+/g,' ') : '';
      if (!to || to === from){ closeSheet(); break; }
      const merged = renameItem(view.tab, from, to);
      closeSheet(); save(); render();
      toast(merged ? `Merged into “${to}”` : `Now called “${to}”`);
      break;
    }
    case 'hide-item': {
      const n = t.dataset.name;
      const ci = state.custom[view.tab].findIndex(o => o.name === n);
      if (ci >= 0) state.custom[view.tab].splice(ci,1);
      else state.hidden[view.tab].push(n);
      delete state.inventory[view.tab][n];
      closeSheet(); save(); render(); break;
    }

    case 'buy-all': {
      const r = findRecipe(view.recipeId);
      const a = analyse(r, state.prefs.servings);
      let n = 0;
      a.missing.forEach(ing => { if (addToShopping(ing.item, qtyLabel(ing, a.factor), r.title, ing.aisle)) n++; });
      save(); render(); toast(n + ' item' + (n===1?'':'s') + ' added to your list'); break;
    }
    case 'clear-done': {
      const done = state.shopping.filter(s => s.done);
      done.forEach(s => {
        const tab = s.aisle === 'frozen' ? 'freezer'
                  : s.aisle === 'spices' ? 'spices'
                  : ['dry','canned','bakery'].includes(s.aisle) ? 'pantry' : 'fridge';
        state.inventory[tab][s.item] = { have:true, low:false };
        if (!DEFAULTS[tab].some(([n]) => norm(n) === norm(s.item)) &&
            !state.custom[tab].some(o => norm(o.name) === norm(s.item)))
          state.custom[tab].push({ name:s.item, aisle:s.aisle, staple:false });
      });
      state.shopping = state.shopping.filter(s => !s.done);
      save(); render(); toast(done.length + ' item' + (done.length===1?'':'s') + ' stocked'); break;
    }

    case 'plan-this': {
      const r = findRecipe(view.recipeId);
      openSheet(`<h2>When are you cooking ${esc(r.title)}?</h2>
        ${[[0,'Today'],[1,'Tomorrow'],[2,'Day after tomorrow'],[3,'In three days']].map(([d,l]) =>
          `<button class="btn ghost" data-act="plan-set" data-d="${d}">${l}</button>`).join('')}
        <button class="btn ghost" data-act="close-sheet">Cancel</button>`);
      break;
    }
    case 'plan-set': {
      const r = findRecipe(view.recipeId);
      state.planned.push({ recipeId:r.id, date: isoPlus(Number(t.dataset.d)), servings: state.prefs.servings });
      state.planned.sort((a,b) => a.date.localeCompare(b.date));
      closeSheet(); save();
      view.screen = 'plan'; view.recipeId = null; render();
      toast('Planned — Frigo will tell you what to buy');
      break;
    }
    case 'plan-buy': {
      const p = state.planned[Number(t.dataset.i)], r = findRecipe(p.recipeId);
      const a = analyse(r, p.servings || state.prefs.servings);
      let n = 0;
      a.missing.forEach(ing => { if (addToShopping(ing.item, qtyLabel(ing, a.factor), r.title, ing.aisle)) n++; });
      save(); view.screen = 'list'; render();
      toast(n + ' item' + (n===1?'':'s') + ' added for ' + r.title);
      break;
    }

    case 'used-up': {
      const r = findRecipe(view.recipeId);
      const a = analyse(r, state.prefs.servings);
      /* If he cooked it with a stand-in, the stand-in is what got used up —
         offering the ingredient he never had would untick nothing. */
      const usedName = ing => {
        const sw = (a.swaps || []).find(s => s.ing === ing);
        return sw ? sw.swap.item : ing.item;
      };
      const rows = a.have.filter(i => !i.staple && !isAlways(usedName(i))).map(ing =>
        `<button class="item" data-usedup="${esc(usedName(ing))}"><span class="box"></span>
          <span class="name">${esc(usedName(ing))}</span></button>`).join('');
      openSheet(`<h2>What did you finish?</h2>
        <p class="hint">Tick anything you used up. It comes out of your kitchen and goes
           straight onto the shopping list.</p>
        <div class="group">${rows}</div>
        <button class="btn" data-act="usedup-done">Done</button>`);
      break;
    }
    case 'usedup-done': {
      const picked = Array.from(document.querySelectorAll('#sheet .item.on'))
        .map(el => el.dataset.usedup);
      picked.forEach(name => {
        TABS.forEach(tab => {
          for (const k in state.inventory[tab])
            if (norm(k) === norm(name) && !state.inventory[tab][k].always)
              state.inventory[tab][k] = { have:false, low:false };
        });
        addToShopping(name, '', '');
      });
      closeSheet(); save(); render();
      if (picked.length) toast(picked.length + ' moved to your shopping list');
      break;
    }

    case 'cookalong': {
      view.cookAlong = { recipeId: view.recipeId, i: 0 };
      requestWakeLock(); render(); break;
    }
    case 'ca-next': view.cookAlong.i++; render(); break;
    case 'ca-repeat': speakCurrent(); break;
    case 'ca-close':
      try{ speechSynthesis.cancel(); }catch(e){}
      releaseWakeLock(); view.cookAlong = null; render(); break;
    case 'ca-done':
      try{ speechSynthesis.cancel(); }catch(e){}
      releaseWakeLock(); view.cookAlong = null; render();
      document.querySelector('.rate')?.scrollIntoView({ block:'center' });
      break;

    case 'add-app': {
      openSheet(`<h2>Add an appliance</h2>
        <div class="field"><label for="an">What is it?</label>
          <input id="an" type="text" placeholder="Bread maker" data-role="appname"></div>
        <div class="field"><label for="aq">How big, in quarts?</label>
          <input id="aq" type="number" step="0.5" min="0" placeholder="2" data-role="appqt">
          <p class="hint">Leave blank if size doesn&rsquo;t matter, like a stove.</p></div>
        <button class="btn" data-act="add-app-save">Add it</button>
        <button class="btn ghost" data-act="close-sheet">Cancel</button>`);
      break;
    }
    case 'add-app-save': {
      const name = ($('[data-role=appname]').value || '').trim();
      const qt = Number($('[data-role=appqt]').value) || 0;
      if (name){
        state.appliances.push({ id:'a' + Date.now(), name, qt });
        save();
      }
      closeSheet(); render(); break;
    }
    case 'del-app':
      state.appliances.splice(Number(t.dataset.i), 1); save(); render(); break;

    case 'export': {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type:'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'frigo-backup-' + isoPlus(0) + '.json';
      a.click(); URL.revokeObjectURL(a.href);
      break;
    }
    case 'import': {
      const inp = document.createElement('input');
      inp.type = 'file'; inp.accept = 'application/json';
      inp.onchange = () => {
        const f = inp.files[0]; if (!f) return;
        f.text().then(txt => {
          try{ state = deepMerge(FRESH(), JSON.parse(txt)); save(); setTheme(); render(); toast('Restored'); }
          catch(err){ toast('That file could not be read'); }
        });
      };
      inp.click(); break;
    }

    case 'ai': {
      if (!state.prefs.apiKey){
        openSheet(`<h2>Invent me something</h2>
          <p class="hint">This one asks Claude to make up a recipe from exactly what&rsquo;s in
             your kitchen right now. It needs an API key of your own, which lives on this phone
             only. That is a separate thing from a Claude subscription, and it is billed
             separately &mdash; about five cents a recipe.</p>
          <p class="hint">Everything else in Frigo works without it, offline, forever.</p>
          <button class="btn" data-act="go-settings">Open settings</button>
          <button class="btn ghost" data-act="close-sheet">Not now</button>`);
        break;
      }
      runAI(); break;
    }
    case 'go-settings': closeSheet(); view.screen = 'settings'; render(); break;

    case 'claude-recipe': {
      const r = findRecipe(view.recipeId);
      if (r) sendToClaude(promptCookThis(r, state.prefs.servings), r.title);
      break;
    }
    case 'claude-kitchen':
      sendToClaude(promptWhatToCook(), 'What should I cook?'); break;
    case 'claude-standing':
      sendToClaude(promptStanding(), 'My cooking coach'); break;
    case 'claude-file': {
      const blob = new Blob([kitchenFile()], { type:'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'my-kitchen.txt';
      a.click(); URL.revokeObjectURL(a.href);
      toast('Saved as my-kitchen.txt');
      break;
    }
  }
});

/* sheet checkbox rows toggle in place */
document.addEventListener('click', e => {
  const row = e.target.closest('#sheet .item[data-usedup]');
  if (row) row.classList.toggle('on');
});

document.addEventListener('input', e => {
  if (e.target.dataset.role === 'search'){
    view.search = e.target.value;
    const pos = e.target.selectionStart;
    render();
    const box = document.querySelector('[data-role=search]');
    if (box){ box.focus(); box.setSelectionRange(pos, pos); }
  }
  if (e.target.dataset.role === 'apikey'){ state.prefs.apiKey = e.target.value.trim(); save(); }
});

/* ------------------------------------------------------------ wake lock */
let wakeLock = null;
async function requestWakeLock(){
  try{ if ('wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen'); }catch(e){}
}
function releaseWakeLock(){ try{ wakeLock && wakeLock.release(); }catch(e){} wakeLock = null; }

/* --------------------------------------------- handing off to Claude

   The Claude phone app cannot be embedded — a web page has no way to open it,
   fill it, or drive its voice mode. Android's share sheet is the entire bridge:
   Frigo writes the text, the system hands it to whichever app he picks, and it
   arrives as the first message of a new chat. Then he taps the microphone.
   Nothing here goes over the network; it is a string handed to the OS. */

const COACH_RULES =
`How I want you to do this:
Talk to me like a patient cook standing next to me. I am a beginner and my hands are busy.
Give me ONE step at a time, then stop and wait for me. Never read the whole method at once.
When I say next, give me the next step. When I say again, repeat the last one.
One action per step, one or two sentences, no lists.
Say numbers as words, so about ten minutes, not ten to twelve min.
Tell me how to know it is done by what it looks, smells and sounds like, not just the clock.
If I ask something in the middle, answer it in a sentence and then put me back where I was.`;

function haveList(){
  return allItems()
    .filter(i => (state.inventory[i.tab][i.name] || {}).have)
    .map(i => i.name);
}
function gearList(){
  return state.appliances.map(a => a.qt ? `${a.name} (${a.qt} quart)` : a.name).join(', ');
}

function promptCookThis(r, servings){
  const a = analyse(r, servings);
  const ings = (r.ingredients || []).map(i => {
    const q = qtyLabel(i, a.factor);
    return '- ' + (q ? q + ' ' : '') + i.item + (i.note ? ' (' + i.note + ')' : '');
  }).join('\n');
  const mise = (r.misePlace || []).map(m => '- ' + m).join('\n');
  const steps = (r.steps || []).map((s, i) => (i + 1) + '. ' + s.text).join('\n');

  /* A recipe with no tip and no make-it-better leaves a stack of blank lines
     where those two paragraphs would have been. */
  const squash = t => t.replace(/\n{3,}/g, '\n\n');

  return squash(`I am cooking this now and I want you to talk me through it out loud.

${r.title}${r.subtitle ? ' — ' + r.subtitle : ''}
For ${servings} ${servings === 1 ? 'person' : 'people'}. ${r.minutes} minutes in total.

INGREDIENTS
${ings}

BEFORE THE HEAT GOES ON
${mise || '- nothing to prep'}

METHOD
${steps}
${r.beginnerTip ? '\nThe thing beginners get wrong here: ' + r.beginnerTip : ''}
${r.makeItBetter ? '\nTo lift it above average: ' + r.makeItBetter : ''}

${COACH_RULES}

Start by telling me what to get ready before the heat goes on, then wait for me to say I am ready.`);
}

function promptWhatToCook(){
  const have = haveList();
  return `Tell me what to cook tonight, using what I actually have.

IN MY KITCHEN RIGHT NOW
${have.length ? have.join(', ') : '(almost nothing — say so and keep it very simple)'}

MY GEAR: ${gearList()}
Cooking for ${state.prefs.servings}. My spice tolerance is ${state.prefs.spice} out of five, and I would rather it had a kick than be bland.

Give me three ideas in one or two sentences each, and nothing else yet. Use only what is on that list, or at most one thing I would have to go and buy — and say plainly which one that is. I am a beginner who wants to learn, so lean on real technique rather than shortcuts. When I pick one, walk me through it one step at a time and wait for me between steps.`;
}

function promptStanding(){
  return `You are my cooking coach. I am Jerome, a beginner cook in Charleston who wants to get good. I like French, American comfort, Middle Eastern, Turkish and simple Asian food, and I would always rather food had a kick than be bland.

My gear: ${gearList()}
I usually cook for ${state.prefs.servings}.

Whenever I ask you for something to cook, ask me what I have before you suggest anything, unless I have already told you.

${COACH_RULES}`;
}

/* The whole kitchen as one file, for uploading into a Claude Project so every
   chat starts already knowing it. A snapshot, not a link — it is right on the
   day it is saved and drifts after that, which the Settings note says plainly. */
function kitchenFile(){
  const label = { fridge:'FRIDGE', freezer:'FREEZER', pantry:'PANTRY', spices:'SPICE RACK' };
  const have = [], low = [], always = [], rest = [];
  TABS.forEach(tab => {
    itemsFor(tab).forEach(it => {
      const s = state.inventory[tab][it.name] || {};
      /* Same assumption the matcher makes: with staples on, salt and oil count
         as present. Without this the file tells Claude he owns no butter. */
      const assumed = it.staple && state.prefs.staplesOn;
      if (s.always) always.push(it.name);
      else if (s.have && s.low) low.push(it.name);
      else if (s.have || assumed) have.push(label[tab] + ': ' + it.name);
      else rest.push(it.name);
    });
  });
  const byTab = {};
  have.forEach(h => {
    const [k, v] = h.split(': ');
    (byTab[k] = byTab[k] || []).push(v);
  });
  const stock = Object.keys(byTab).map(k => k + '\n  ' + byTab[k].join(', ')).join('\n\n');

  const recipes = recipePool().map(r =>
    `${r.title}${r.subtitle ? ' (' + r.subtitle + ')' : ''} — ${cuisineLabel(r.cuisine)}, ${r.minutes} minutes\n  ` +
    (r.ingredients || []).map(i => i.item).join(', ')).join('\n\n');

  return `MY KITCHEN — saved from Frigo on ${isoPlus(0)}

I am Jerome, a beginner cook in Charleston who wants to get good. I like French,
American comfort, Middle Eastern, Turkish and simple Asian food, and I would
always rather food had a kick than be bland. I usually cook for ${state.prefs.servings}, and my
spice tolerance is ${state.prefs.spice} out of five.

MY GEAR
  ${gearList()}

WHAT I HAVE RIGHT NOW
${stock || '  (nothing ticked yet)'}

ALWAYS IN STOCK, ASSUME I HAVE THESE
  ${always.join(', ') || '(none set)'}

RUNNING LOW, DO NOT BUILD A DISH AROUND THESE
  ${low.join(', ') || '(none)'}

THINGS I BUY BUT DO NOT HAVE TODAY
  ${rest.join(', ') || '(none)'}

RECIPES ALREADY IN MY APP — suggest these before inventing something new
${recipes}

${COACH_RULES}

This file is a snapshot of the day it says at the top. If I tell you something
different about what is in my kitchen, believe me over this file.`;
}

/* share first, clipboard second, show-me-the-text last */
async function sendToClaude(text, title){
  if (navigator.share){
    try{ await navigator.share({ text }); return; }
    catch(err){ if (err && err.name === 'AbortError') return; }
  }
  try{
    await navigator.clipboard.writeText(text);
    toast('Copied — paste it into Claude');
    return;
  }catch(err){}
  openSheet(`<h2>${esc(title)}</h2>
    <p class="hint">Your phone would not let me copy it for you. Press and hold in the box,
       choose Select all, then Copy.</p>
    <textarea data-role="handoff" rows="8" readonly>${esc(text)}</textarea>
    <button class="btn" data-act="close-sheet">Done</button>`);
  const box = document.querySelector('[data-role=handoff]');
  if (box){ box.focus(); box.select(); }
}

/* ------------------------------------------------------------------ AI */
async function runAI(){
  openSheet(`<h2>Thinking&hellip;</h2><p class="hint">Claude is looking at what&rsquo;s actually in
    your kitchen and inventing something. Give it a few seconds.</p>`);
  try{
    const pantry = allItems()
      .filter(i => (state.inventory[i.tab][i.name] || {}).have)
      .map(i => i.name);
    const recipe = await window.FrigoAI.invent({
      apiKey: state.prefs.apiKey,
      ingredients: pantry,
      filters: view.filters,
      appliances: state.appliances,
      servings: state.prefs.servings,
      spice: state.prefs.spice
    });
    state.aiRecipes.unshift(recipe);
    state.aiRecipes = state.aiRecipes.slice(0, 40);
    save(); closeSheet();
    view.screen = 'recipe'; view.recipeId = recipe.id; render();
  }catch(err){
    openSheet(`<h2>That didn&rsquo;t work</h2>
      <p class="hint">${esc(err.message || 'Could not reach Claude.')}</p>
      <button class="btn ghost" data-act="close-sheet">Close</button>`);
  }
}

/* ------------------------------------------------------------------ boot */
/* A link can carry a shopping trip's worth of kitchen in it:
     …/food-app/#have=eggs,harissa,spring onions
   Tap it and the app ticks the lot. That's how a list from a chat gets in
   without a server, an account, or anything leaving the phone. */
function applyLinkList(){
  const m = /[#&]have=([^&]*)/.exec(location.hash || '');
  if (!m) return null;
  let text = '';
  try { text = decodeURIComponent(m[1].replace(/\+/g,' ')); } catch(e){ text = m[1]; }
  history.replaceState(null, '', location.pathname + location.search);
  if (!text.trim()) return null;
  return applyItemList(text);
}

load();
setTheme();
const fromLink = applyLinkList();
if (fromLink) save();
render();
if (fromLink) reportList(fromLink);

/* Tapping a #have= link while the app is ALREADY open only changes the hash —
   the page never reloads, so the boot call above never runs. That is the normal
   case for an installed app, and without this the link silently does nothing. */
window.addEventListener('hashchange', () => {
  const r = applyLinkList();
  if (!r) return;
  save(); render(); reportList(r);
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape'){
    if (!$('#sheet').hidden) closeSheet();
    else if (view.cookAlong){ view.cookAlong = null; releaseWakeLock(); render(); }
  }
});

/* The one door into the closure, so the check-phone harness can test the
   name matching against real recipe data instead of me eyeballing it.
   Read-only helpers; nothing here changes state. */
window.FrigoTest = { sameItem, itemParts, aisleOf, inventoryHas, applyItemList, applyLinkList,
                     analyse, findSubstitute, matchRecipes,
                     kitchenFile, promptCookThis, promptWhatToCook, promptStanding, view, state };

})();
