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

/* The same shelves named the way a kitchen is, not a supermarket. The aisle
   order above is for walking a store; this order is for standing in front of
   an open fridge door. */
const SECTION_LABEL = {
  produce:'Vegetables & fruit', meat:'Meat & fish', dairy:'Dairy & eggs',
  canned:'Condiments, sauces & jars', dry:'Dry goods & pasta',
  bakery:'Bread & baking', frozen:'Frozen', spices:'Spices & seasoning',
  other:'Other'
};
const SECTION_SHORT = {
  produce:'Vegetables', meat:'Meat & fish', dairy:'Dairy', canned:'Condiments',
  dry:'Dry goods', bakery:'Bread', frozen:'Frozen', spices:'Spices', other:'Other'
};
const SECTION_ORDER = ['produce','meat','dairy','canned','dry','bakery','frozen','spices','other'];

/* The freezer is one aisle in a shop but four shelves at home, so it says
   where its rows belong. Anything unlisted falls back to its aisle. */
const SECTION_OVERRIDES = window.FRIGO_SECTIONS || {};

function sectionOf(item, tab){
  const map = SECTION_OVERRIDES[tab];
  if (map) for (const sec in map){
    if (map[sec].some(n => norm(n) === norm(item.name))) return sec;
  }
  return SECTION_LABEL[item.aisle] ? item.aisle : 'other';
}

/* --------------------------------------------------- default inventory */
/* The list itself lives in ingredients.js so it can be edited by hand, or
   through items.html, without going anywhere near this file. */
const DEFAULTS = window.FRIGO_INGREDIENTS
              || { fridge:[], freezer:[], pantry:[], spices:[] };

/* Not his kitchen — the world's. Only ever consulted after his own shelves
   have had their go, to break a dictated run into separate foods and to tell
   an ingredient he simply hasn't got from a word the microphone misheard. */
const FOODWORDS = window.FRIGO_FOODWORDS || {};
let FOOD_VOCAB = null;
function foodVocab(){
  if (FOOD_VOCAB) return FOOD_VOCAB;
  FOOD_VOCAB = [];
  for (const aisle in FOODWORDS){
    FOODWORDS[aisle].forEach(name => FOOD_VOCAB.push({ name, aisle, vocab:true }));
  }
  return FOOD_VOCAB;
}

const TABS = ['fridge','freezer','pantry','spices'];
const TAB_LABEL = { fridge:'Fridge', freezer:'Freezer', pantry:'Pantry', spices:'Spices' };

const CUISINES = [
  ['any','Any'],['french','French'],['american','American'],
  ['middle-eastern','Middle Eastern'],['turkish','Turkish'],['asian','Asian'],
  ['other','Other']
];
const TIMES = [[15,'15 min'],[30,'30 min'],[45,'45 min'],[60,'1 hour'],[0,'Any']];

/* The kind of cooking, not the cuisine. Left is what the button sets, right is
   what he reads. A couple of them cover two spellings of the same idea, which
   is what STYLE_TAGS is for. */
const STYLES = [
  ['any','Any'], ['hellofresh-style','HelloFresh style'], ['one-pan','One pan'],
  ['vegetarian','Vegetarian'], ['comfort','Comfort'], ['cheap','Cheap'],
  ['spicy','Big kick'], ['leftovers','Leftovers']
];
const STYLE_TAGS = {
  'one-pan':  ['one-pan','one-pot','sheet-pan'],
  'spicy':    ['spicy','big-kick'],
  'comfort':  ['comfort','crowd-pleaser']
};

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
  ratings:{}, cooked:{}, favorites:[], notes:{},
  shopping:[], planned:[], aiRecipes:[], myRecipes:[],
  prefs:{ servings:2, spice:3, theme:'auto', apiKey:'', staplesOn:true,
          syncUrl:'', syncedAt:0 }
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

/* --------------------------------------------------- merging two copies

   Two phones, one kitchen. Neither copy is the truth, so a merge keeps what
   the other side knows and never quietly drops a tick.

   Inventory is the only place where UNTICKED is real information — he drank
   the milk — so those entries carry `at`, the moment they last changed, and
   the newer one wins. Everything else is added to, never taken away, because
   losing a rating or a shopping row is worse than carrying a stale one.

   `prefs` is never merged and never sent: the API key and the sync address
   belong to one device. */

let stampBase = null;

function rebase(){
  stampBase = JSON.parse(JSON.stringify(state.inventory));
}

function stampInventory(){
  const now = Date.now();
  TABS.forEach(tab => {
    const inv = state.inventory[tab] || {};
    const was = (stampBase && stampBase[tab]) || {};
    for (const k in inv){
      const cur = inv[k], old = was[k];
      if (!cur || typeof cur !== 'object') continue;
      const moved = !old || old.have !== cur.have || old.low !== cur.low
                        || old.useBy !== cur.useBy || old.always !== cur.always;
      if (moved) cur.at = now;
      else if (!cur.at && old.at) cur.at = old.at;
    }
  });
  rebase();
}

function unionBy(mine, theirs, keyOf){
  const out = (mine || []).slice();
  const seen = {};
  out.forEach(x => { const k = keyOf(x); if (k) seen[k] = true; });
  (theirs || []).forEach(x => {
    const k = keyOf(x);
    if (k && !seen[k]) { seen[k] = true; out.push(x); }
  });
  return out;
}

function fillGaps(mine, theirs){
  const out = Object.assign({}, mine);
  for (const k in (theirs || {})) if (!(k in out)) out[k] = theirs[k];
  return out;
}

function mergeStates(mine, theirs){
  if (!theirs || typeof theirs !== 'object') return mine;
  const out = deepMerge(FRESH(), mine);

  TABS.forEach(tab => {
    const ours = out.inventory[tab] || (out.inventory[tab] = {});
    const then = (theirs.inventory || {})[tab] || {};
    for (const k in then){
      const them = then[k];
      if (!them || typeof them !== 'object') continue;
      const us = ours[k];
      if (!us) { ours[k] = them; continue; }
      if ((them.at || 0) > (us.at || 0)) ours[k] = them;
    }
    /* Custom items travel; hidden ones do not. Hiding is a removal, and a
       removal that spreads by itself is how a merge loses something. */
    out.custom[tab] = unionBy(out.custom[tab], (theirs.custom || {})[tab],
                              x => norm(String(x)));
  });

  out.ratings   = fillGaps(out.ratings,   theirs.ratings);
  out.cooked    = fillGaps(out.cooked,    theirs.cooked);
  out.notes     = fillGaps(out.notes,     theirs.notes);
  out.favorites = unionBy(out.favorites, theirs.favorites, x => norm(String(x)));

  out.shopping  = unionBy(out.shopping, theirs.shopping,
                          x => norm(String(x && x.item)) + '|' + (x && x.from || ''));
  out.planned   = unionBy(out.planned, theirs.planned,
                          x => (x && x.recipeId || '') + '|' + (x && x.date || ''));
  out.aiRecipes = unionBy(out.aiRecipes, theirs.aiRecipes, x => x && x.id);
  out.myRecipes = unionBy(out.myRecipes, theirs.myRecipes, x => x && x.id);

  out.prefs = mine.prefs;
  return out;
}

/* ------------------------------------------------------ sync between phones

   The one place Frigo talks to a machine that isn't Anthropic, and only when
   he taps Sync. The far end is a Google Apps Script he deployed himself from
   his own Sheet — see sync-sheet.gs. It holds one blob of JSON and nothing
   else; there is no account and no service in between.

   The POST goes out as text/plain on purpose. An application/json body makes
   the browser send a CORS preflight first, and Apps Script does not answer
   one, so the sync would fail with nothing useful in the console. */

let syncing = false;

async function syncNow(){
  const url = String(state.prefs.syncUrl || '').trim();
  if (!url){ toast('No sync address set'); return; }
  if (!/^https:\/\/script\.google\.com\//.test(url)){
    toast('That does not look like an Apps Script address'); return;
  }
  if (syncing) return;
  syncing = true; render();

  let theirs = null;
  try{
    const res = await fetch(url, { method:'GET' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const txt = (await res.text()).trim();
    theirs = txt ? JSON.parse(txt) : null;
  }catch(e){
    syncing = false; render();
    toast('Could not reach the sheet. Check the address and the signal');
    return;
  }
  if (theirs && theirs.state) theirs = theirs.state;

  state = mergeStates(state, theirs);
  rebase();

  /* prefs never travels: the API key and this very address are per-device. */
  const send = JSON.parse(JSON.stringify(state));
  delete send.prefs;

  try{
    const res = await fetch(url, {
      method:'POST',
      headers:{ 'Content-Type':'text/plain;charset=utf-8' },
      body: JSON.stringify(send)
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    state.prefs.syncedAt = Date.now();
    syncing = false; save(); render();
    toast('Synced');
  }catch(e){
    syncing = false; save(); render();
    toast('Merged here, but could not send it back');
  }
}

/* ------------------------------------------------------------- the scan log

   Frigo throws the barcode away on purpose — a shelf holds names, not digits —
   so a second tab of the same Sheet is the only place the number survives. That
   turns a pile of scans into a catalogue of the jars he actually buys, with the
   brand and size the app itself has no use for.

   Fire and forget, always. He is standing in front of an open fridge; a scan
   that cannot be logged must never hold up the tick or raise a dialog. */

function logScan(hit, landedAs){
  const url = String(state.prefs.syncUrl || '').trim();
  if (!url || !/^https:\/\/script\.google\.com\//.test(url)) return;

  const shelf = allItems().find(i => norm(i.name) === norm(landedAs))
             || allItems().find(i => sameItem(i.name, landedAs));
  const aisle = shelf ? shelf.aisle : 'other';

  /* The label EXACTLY as the database gave it and exactly as he saw it on the
     confirm screen. `saved` is what the shelf renamed it to; both are kept, and
     this one is never rewritten. */
  const label = [hit.brand, hit.name, hit.size].filter(Boolean).join(' · ');

  const row = {
    label:   String(label),
    code:    String(hit.code || ''),
    product: String(hit.name || ''),
    brand:   String(hit.brand || ''),
    size:    String(hit.size || ''),
    saved:   String(landedAs || ''),
    shelf:   shelf ? (TAB_LABEL[shelf.tab] || shelf.tab) : '',
    section: SECTION_LABEL[aisle] || 'Other',
    at:      new Date().toISOString().slice(0, 10)
  };

  try{
    fetch(url, { method:'POST',
                 headers:{ 'Content-Type':'text/plain;charset=utf-8' },
                 body: JSON.stringify({ log: row }) }).catch(() => {});
  }catch(e){ /* no signal in the kitchen is normal, not an error */ }
}

async function pasteInto(which){
  const box = document.getElementById(which);
  if (!box) return;
  let text = '';
  try{
    text = await navigator.clipboard.readText();
  }catch(e){
    box.focus();
    toast('Your browser will not let me read the clipboard. Long-press the box and paste.');
    return;
  }
  text = String(text || '').trim();
  if (!text){ toast('Nothing on the clipboard'); return; }

  box.value = text;
  if (which === 'apikey') state.prefs.apiKey = text;
  if (which === 'syncurl') state.prefs.syncUrl = text;
  save(); render();
  toast(which === 'apikey' ? 'Key pasted' : 'Address pasted');
}

let saveTimer = null;
function writeState(){
  stampInventory();
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(e){}
}
function save(){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(writeState, 250);
}
/* Android kills a backgrounded web app whenever it feels like it, and a tick
   made in the last quarter second goes with it. Write anything pending the
   moment the app leaves the screen. */
function flushSave(){ clearTimeout(saveTimer); writeState(); }
document.addEventListener('visibilitychange', () => { if (document.hidden) flushSave(); });
window.addEventListener('pagehide', flushSave);
window.addEventListener('blur', flushSave);

/* Chrome can evict a site's storage when the phone runs short. A site that has
   asked to persist is exempt. Asking costs nothing and shows no prompt. */
if (navigator.storage && navigator.storage.persist) {
  try { navigator.storage.persist().catch(() => {}); } catch(e){}
}

/* ------------------------------------------------------------- view model */
const view = {
  screen:'cook',
  tab:'fridge',
  section:'all',
  search:'',
  recipeId:null,
  cookAlong:null,
  filtersOpen:false,
  useByFor:null,
  editingRecipe:null,
  recipeSearch:'',
  onlyReady:false,
  filters:{ appliance:'any', cuisine:'any', time:0, difficulty:'any', style:'any' },
  review:null,
  camera:false
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
  [/\bgreek\s+yogh?u?rt\b/g, 'plain yogurt'],
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
  halfandhalf:'half and half',
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
  'piece','pieces','pack','packet','tub','jar','tin','can','bunch','clove','cloves',
  'fillet','fillets']);

const singular = w => w.length > 3 ? w.replace(/ies$/,'y').replace(/oes$/,'o').replace(/(ses|xes|zes|ches|shes)$/,m=>m.slice(0,-2)).replace(/s$/,'') : w;

/* Brand names, because that is what a jar is called out loud. He says Better
   Than Bouillon, not chicken stock, and Grey Poupon, not dijon.

   These run BEFORE everything else, on the name with its punctuation already
   stripped — an apostrophe is a space by the time this sees it, so "frank's"
   arrives as "frank s". A phrase that maps to a blank simply deletes the
   maker's name and lets the real word behind it match on its own. */
const BRAND_PHRASE = [
  [/\b(chicken|beef|vegetable)\s+(?:better\s+than\s+bouillon|bouillon\s+cubes?|stock\s+pots?)\b/g, '$1 stock'],
  [/\bbetter\s+than\s+bouillon\b/g, 'chicken stock'],
  [/\b(?:goya|knorr|maggi|herb\s*ox|wyler\s*s)\s+(?:cubes?|bouillon|caldo)\b/g, 'chicken stock'],
  [/\bbouillon\s+cubes?\b/g, 'chicken stock'],
  [/\bgrey\s+poupon\b/g, 'dijon mustard'],
  [/\bold\s+bay\b/g, 'old bay seasoning'],
  [/\b(?:tabasco|cholula|valentina|texas\s+pete|frank\s+s?\s*red\s+hot)\b/g, 'hot sauce'],
  [/\bphiladelphia\b/g, 'cream cheese'],
  [/\bkerrygold\b/g, 'butter'],
  [/\bcrisco\b/g, 'vegetable oil'],
  [/\bbisquick\b/g, 'all purpose flour'],
  [/\bkikkoman\b/g, 'soy sauce'],
  [/\b(?:hellmann\s*s?|duke\s+s)\b(?!\s+(?:mayo|mayonnaise))/g, 'mayonnaise'],
  [/\brotel\b/g, 'canned tomatoes'],
  /* Two-word makers, deleted outright — the product word is already there. */
  [/\b(?:la\s+choy|huy\s+fong|san\s+marzano|land\s+o\s*lakes|lee\s+kum\s+kee|mrs\s+dash|old\s+el\s+paso)\b/g, ' ']
];

/* One-word makers. Dropped only while something real is left beside them, so
   "Heinz ketchup" is ketchup and a bare "Goya" still becomes a row he can see
   rather than vanishing on him. */
const BRAND_WORD = new Set(['heinz','hellmann','hellmanns','duke','dukes','kraft',
  'campbell','campbells','swanson','pillsbury','daisy','kikkoman','kewpie','goya',
  'knorr','maggi','barilla','ronzoni','tyson','perdue','sargento','bertolli',
  'progresso','morton','mccormick','hunts','delmonte']);

/* Break a name into the thing itself plus the words that qualify it.
   "extra virgin olive oil" -> head "oil", mods {olive}. */
function keyWords(name){
  let s = norm(name).replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g,' ').trim();
  BRAND_PHRASE.forEach(([re, to]) => { s = s.replace(re, to); });
  s = s.replace(/\s+/g, ' ').trim();
  if (SHORTHAND[s]) s = SHORTHAND[s];
  SAME_PHRASE.forEach(([re, to]) => { s = s.replace(re, to); });
  const words = s.split(' ')
    .map(w => SAME_WORD[w] || w)
    .join(' ').split(' ')
    .map(singular)
    .map(w => SAME_WORD[w] || w)
    .filter(w => w && !FILLER.has(w));
  const real = words.filter(w => !BRAND_WORD.has(w));
  return real.length ? real : words;
}
function itemParts(name){
  const words = keyWords(name);
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

/* ---------------------------------------------------------- make it

   Things worth making rather than buying, when the parts are already on his
   shelves. This beats a substitution where it applies: it produces the actual
   ingredient instead of something near it. Quantities are written out because
   a ratio he has to look up somewhere else is no use with greasy hands. */
const MAKE_IT = {
  'heavy cream': { from: ['milk', 'butter'],
    how: 'Melt a quarter cup of butter, let it cool for a minute, then whisk it slowly into three quarters of a cup of whole milk. Fine for cooking and sauces. It will not whip.' },
  'sour cream': { from: ['heavy cream', 'lemons'],
    how: 'Stir a tablespoon of lemon juice into a cup of cream and leave it somewhere warm for about twenty minutes until it thickens.' },
  'crème fraîche': { from: ['heavy cream', 'plain yogurt'],
    how: 'Stir two tablespoons of yogurt into a cup of cream, cover it loosely and leave it out overnight, then chill it. Thicker and far less likely to split than cream.' },
  'buttermilk': { from: ['milk', 'lemons'],
    how: 'A tablespoon of lemon juice in a cup of milk. Leave it ten minutes until it curdles slightly.' },

  /* ---- the HelloFresh sachets -------------------------------------------
     Half the recipes in here are written HelloFresh-style, and a HelloFresh
     card leans on a named blend rather than a row of separate spices. The
     ratios below are the ones that turn up in more than one place: HelloFresh
     published Tuscan Heat themselves in 2019, and the rest match across the
     Joe's Daily compendium, My Sweet Precision and Fork To Spoon. Where the
     copies disagree, the note says which way this one goes and why. */
  'fry seasoning': { from: ['sweet paprika', 'garlic powder', 'onion powder'],
    how: 'Two teaspoons sweet paprika, one of garlic powder, one of onion powder and half a teaspoon of salt. Most copies online are equal parts with no salt at all, and they taste flat next to the sachet — it is paprika-forward and it is salted.' },
  'tuscan heat spice': { from: ['dried basil', 'dried rosemary', 'dried oregano', 'garlic powder', 'cayenne pepper', 'fennel seeds'],
    how: 'Four teaspoons dried basil, two each of rosemary, oregano and garlic powder, one of cayenne and one of fennel seeds ground fine. This is HelloFresh\u2019s own published ratio.' },
  'southwest spice blend': { from: ['garlic powder', 'cumin', 'chilli powder'],
    how: 'Four teaspoons garlic powder, two of cumin, two of chilli powder.' },
  'shawarma spice blend': { from: ['turmeric', 'cumin', 'coriander', 'garlic powder', 'sweet paprika', 'ground allspice'],
    how: 'Two teaspoons each of turmeric and cumin, one each of coriander, garlic powder and paprika, and half a teaspoon each of allspice and black pepper.' },
  'turkish spice blend': { from: ['cumin', 'garlic powder', 'coriander', 'ground allspice', 'chilli flakes'],
    how: 'Two teaspoons each of cumin and garlic powder, one of coriander, and a quarter teaspoon each of allspice and chilli flakes.' },
  'mediterranean spice blend': { from: ['dried oregano', 'dried mint', 'sumac', 'coriander'],
    how: 'Two teaspoons dried oregano, one each of dried mint, sumac and ground coriander.' },
  'blackening spice': { from: ['smoked paprika', 'garlic powder', 'white pepper', 'dried thyme', 'dried oregano', 'cayenne pepper'],
    how: 'Three teaspoons smoked paprika, one and a half of garlic powder, half a teaspoon each of white pepper and black pepper, a quarter each of thyme and oregano, and a pinch of cayenne.' },
  'mexican spice blend': { from: ['chilli powder', 'dried oregano', 'smoked paprika', 'cumin'],
    how: 'Two teaspoons chilli powder, one each of dried oregano, smoked paprika and cumin.' },
  'italian seasoning': { from: ['garlic powder', 'dried oregano', 'dried basil', 'dried parsley'],
    how: 'Equal parts garlic powder, oregano, basil, parsley and black pepper — a teaspoon of each.' },
  'cajun seasoning': { from: ['smoked paprika', 'garlic powder', 'onion powder', 'cayenne pepper', 'dried thyme'],
    how: 'Two teaspoons smoked paprika, one each of garlic powder, onion powder and dried thyme, half a teaspoon of cayenne, plus black pepper and salt.' },
  'harissa': { from: ['smoked paprika', 'cayenne pepper', 'cumin', 'garlic', 'olive oil'],
    how: 'Two teaspoons smoked paprika, one of cumin, half of cayenne, a crushed clove of garlic, and enough olive oil to make a loose paste.' },
  'ras el hanout': { from: ['cumin', 'coriander', 'cinnamon', 'turmeric', 'black pepper'],
    how: 'Equal parts cumin and coriander, half as much cinnamon and turmeric, and a good grind of black pepper.' },
  'baharat': { from: ['black pepper', 'cumin', 'coriander', 'cinnamon', 'cloves'],
    how: 'Two parts black pepper and cumin, one part coriander and cinnamon, and a pinch of ground cloves.' },
  'garam masala': { from: ['cumin', 'coriander', 'cinnamon', 'cardamom', 'black pepper'],
    how: 'Two teaspoons cumin, two of coriander, one of cinnamon, half of cardamom, and plenty of black pepper. Warm them in a dry pan first.' },
  'curry powder': { from: ['turmeric', 'cumin', 'coriander', 'chilli powder'],
    how: 'Two teaspoons turmeric, two of cumin, two of coriander and half a teaspoon of chilli powder.' },
  'herbes de provence': { from: ['dried thyme', 'dried oregano', 'dried rosemary'],
    how: 'Equal parts dried thyme, oregano and rosemary, crushed together between your palms.' },
  'aleppo pepper': { from: ['chilli flakes', 'sweet paprika'],
    how: 'One part chilli flakes to two parts sweet paprika, with a pinch of salt. Close on heat and colour, gentler than plain flakes.' },
  'thai curry paste': { from: ['curry powder', 'chilli flakes', 'garlic', 'ginger', 'tomato paste'],
    how: 'Two teaspoons curry powder, a teaspoon of chilli flakes, a clove of garlic, a thumb of ginger and a spoon of tomato paste, mashed to a paste. Fry it in oil like the real thing.' },
  'gochujang': { from: ['miso paste', 'sriracha', 'honey'],
    how: 'A tablespoon of miso, a tablespoon of sriracha and a teaspoon of honey. Not authentic, but it behaves the same way in the pan.' },
  'hot sauce': { from: ['cayenne pepper', 'white wine vinegar', 'garlic'],
    how: 'A teaspoon of cayenne, three tablespoons of vinegar, a crushed clove of garlic and a good pinch of salt. Shake it and leave it an hour.' },

  'brown sugar': { from: ['sugar', 'honey'],
    how: 'Rub a tablespoon of honey into a cup of white sugar with your fingers until it clumps and darkens.' },
  'breadcrumbs': { from: ['bread'],
    how: 'Tear up stale bread and blitz or grate it, then dry it in a low oven for ten minutes.' },
  'panko': { from: ['bread'],
    how: 'Grate stale bread on the coarse side of a box grater, crusts off, then dry it in a low oven without letting it colour. Coarser than breadcrumbs, which is the whole point.' },
  'crispy fried onions': { from: ['onions', 'all-purpose flour', 'vegetable oil'],
    how: 'Slice an onion paper thin, toss it in flour, and fry it in a shallow layer of oil until deep gold. Drain it on paper.' },
  'mayonnaise': { from: ['eggs', 'vegetable oil', 'dijon mustard', 'lemons'],
    how: 'One yolk, a teaspoon of mustard and a squeeze of lemon whisked together, then add oil drop by drop at first and in a thin stream once it thickens.' },
  'balsamic vinegar': { from: ['red wine vinegar', 'brown sugar'],
    how: 'Simmer half a cup of red wine vinegar with two tablespoons of brown sugar until it thickens slightly. Sweeter and thinner than the real thing.' },
  'mirin': { from: ['white wine', 'sugar'],
    how: 'Two tablespoons of white wine with a teaspoon of sugar dissolved in it.' },
  'tahini': { from: ['sesame seeds', 'olive oil'],
    how: 'Toast a cup of sesame seeds until they smell nutty, then blend them with three tablespoons of oil until it pours. It takes longer than you expect.' },
  'biscuit dough': { from: ['all-purpose flour', 'baking powder', 'butter', 'milk'],
    how: 'Two cups flour, a tablespoon of baking powder, a teaspoon of salt. Rub in half a stick of cold butter, stir in three quarters of a cup of milk, and pat it out thick.' },
  'tortillas': { from: ['all-purpose flour', 'vegetable oil'],
    how: 'Two cups flour, three tablespoons oil, a teaspoon of salt and three quarters of a cup of warm water. Rest it, roll it thin, and cook them in a dry pan.' }
};

/* Can he make this from what is already on the shelves? */
function findMakeIt(name){
  const key = Object.keys(MAKE_IT).find(k => norm(k) === norm(name) || sameItem(k, name));
  if (!key) return null;
  const rec = MAKE_IT[key];
  if (!rec.from.every(part => inventoryHas(part))) return null;
  return { how: rec.how, from: rec.from };
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
  return (window.RECIPES || []).concat(state.aiRecipes || [], state.myRecipes || []);
}
function isMyRecipe(id){ return (state.myRecipes || []).some(r => r.id === id); }

/* ------------------------------------------------------------ use it soon

   A date on a fridge item, and how many sleeps are left. Dates are stored as
   plain YYYY-MM-DD because that is what a date input gives back and it sorts
   correctly as a string; the clock only comes into it to work out "today". */
function today(){
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
function addDays(n){
  const d = new Date();
  d.setDate(d.getDate() + n);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
function daysLeft(iso){
  if (!iso) return null;
  return Math.round((new Date(iso + 'T00:00:00') - new Date(today() + 'T00:00:00')) / 86400000);
}
function useByLabel(iso){
  const d = daysLeft(iso);
  if (d === null) return '';
  if (d < 0)  return d === -1 ? 'A DAY OVER' : Math.abs(d) + ' DAYS OVER';
  if (d === 0) return 'TODAY';
  if (d === 1) return 'TOMORROW';
  return d + ' DAYS';
}

/* Everything ticked that has a date on it, soonest first. */
function expiringItems(within){
  const out = [];
  TABS.forEach(tab => {
    const inv = state.inventory[tab];
    for (const name in inv){
      const st = inv[name];
      if (!st || !st.have || !st.useBy) continue;
      const d = daysLeft(st.useBy);
      if (within !== undefined && d > within) continue;
      out.push({ name, tab, useBy: st.useBy, days: d });
    }
  });
  out.sort((a, b) => a.days - b.days);
  return out;
}
/* Does a recipe ingredient point at something that needs eating? */
function inventorySoon(name){
  return expiringItems(3).some(e => norm(e.name) === norm(name) || sameItem(e.name, name));
}
function analyse(recipe, servings){
  const factor = servings / (recipe.baseServings || 2);
  const missing = [], have = [], swaps = [], makes = [];
  (recipe.ingredients || []).forEach(ing => {
    const isStaple = ing.staple && state.prefs.staplesOn;
    if (inventoryHas(ing.item) || isStaple){ have.push(ing); return; }
    /* Not in the kitchen, but he can get there from what he owns. Making the
       real thing beats approximating it, so that is checked first. Either way
       it counts as cookable — it just has to be said out loud, not hidden. */
    const make = findMakeIt(ing.item);
    if (make){ have.push(ing); makes.push({ ing, make }); return; }
    const swap = findSubstitute(ing.item);
    if (swap){ have.push(ing); swaps.push({ ing, swap }); return; }
    missing.push(ing);
  });
  const usesLow = (recipe.ingredients||[]).some(i => inventoryLow(i.item));
  const usesSoon = (recipe.ingredients||[]).filter(i => inventorySoon(i.item)).map(i => i.item);
  let capacityWarning = null;
  const app = state.appliances.find(a => (recipe.appliances||[]).includes(a.id));
  if (app && app.qt && recipe.capacityQt){
    const needed = recipe.capacityQt * factor;
    if (needed > app.qt * 0.62)
      capacityWarning = `Tight fit in your ${app.qt} qt ${app.name.toLowerCase()} at ${servings} servings — cook it in two batches.`;
  }
  return { factor, missing, have, swaps, makes, usesLow, usesSoon, capacityWarning };
}
function matchRecipes(){
  const f = view.filters, servings = state.prefs.servings;
  const q = norm(view.recipeSearch);
  const out = [];
  recipePool().forEach(r => {
    if (f.appliance !== 'any' && !(r.appliances||[]).includes(f.appliance)) return;
    if (f.cuisine   !== 'any' && r.cuisine !== f.cuisine) return;
    if (f.time      !== 0     && (r.activeMinutes || r.minutes) > f.time) return;
    if (f.difficulty!== 'any' && r.difficulty !== f.difficulty) return;
    if (f.style !== 'any'){
      const want = STYLE_TAGS[f.style] || [f.style];
      if (!(r.tags || []).some(t => want.includes(t))) return;
    }
    const a = analyse(r, servings);
    if (view.onlyReady && a.missing.length) return;
    if (q){
      const hay = [r.title, r.subtitle || '', (r.tags||[]).join(' '),
                   (r.ingredients||[]).map(i => i.item).join(' ')].join(' ');
      if (!norm(hay).includes(q)) return;
    }
    out.push({ r, ...a });
  });
  out.sort((x, y) => {
    if (x.missing.length !== y.missing.length) return x.missing.length - y.missing.length;
    const wx = x.swaps.length + x.makes.length, wy = y.swaps.length + y.makes.length;
    if (wx !== wy) return wx - wy;
    if (x.usesSoon.length !== y.usesSoon.length) return y.usesSoon.length - x.usesSoon.length;
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
  if (view.camera){ renderCamera(); return; }
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

  /* The title bar is taller on some screens than others, and the shelf headings
     park underneath it. Measure it rather than guessing, or a sliver of the row
     above shows through the gap. */
  document.documentElement.style.setProperty('--topbar-h', bar.offsetHeight + 'px');

  /* Anything Jerome typed is set as a value, not poured into innerHTML. */
  const noteBox = main.querySelector('[data-role=note]');
  if (noteBox) noteBox.value = state.notes[noteBox.dataset.recipe] || '';

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
  if (f.style !== 'any') on.push((STYLES.find(x => x[0] === f.style) || ['','' ])[1]);

  /* Two rows, not four. The first recipe photo has to be reachable without
     scrolling, so search shares its row with the filter button and the shelf
     toggle shares its row with the servings. */
  const bar = `<div class="filterbar">
      <div class="searchbox">${svg('i-search')}
        <input type="text" placeholder="Search recipes" value="${esc(view.recipeSearch)}"
               data-role="rsearch" enterkeyhint="search" autocomplete="off">
        ${view.recipeSearch ? `<button class="bar-btn" data-act="clear-rsearch" aria-label="Clear">${svg('i-x','icon-sm')}</button>` : ''}
      </div>
      <button class="opt fbtn icon-only ${on.length?'has':''}" data-act="toggle-filters"
              aria-label="Filters" aria-expanded="${view.filtersOpen ? 'true' : 'false'}">
        ${svg('i-sliders','icon-sm')}${svg('i-chev','icon-sm chev')}
      </button>
    </div>
    <div class="filterbar">
      <button class="opt fbtn ready" data-act="only-ready" aria-pressed="${view.onlyReady}">
        ${svg('i-check','icon-sm')}<span class="fsum">Only what I can cook now</span>
      </button>
      ${stepper}
    </div>
    ${on.length ? `<p class="grouplede" style="margin:-4px 2px 0">Filtered to
      ${esc(on.join(' &middot; ').replace(/&amp;middot;/g,'·'))}.</p>` : ''}`;

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
    <div class="eyebrow">Kind of thing</div>
    <div class="filter-row">${STYLES.map(([v, l]) =>
      `<button class="opt" data-f="style" data-v="${v}" aria-pressed="${f.style===v}">${esc(l)}</button>`).join('')}</div>
  </div>
  <div class="filter">
    <div class="eyebrow">Time I've got</div>
    <div class="filter-row">${TIMES.map(([v, l]) =>
      `<button class="opt" data-f="time" data-v="${v}" aria-pressed="${f.time===v}">${esc(l)}</button>`).join('')}</div>
  </div>
  <p class="grouplede">Servings are set above. Quantities scale to match.</p>`;

  /* Thirty-one recipes fit in the head; sixty will not. Searching hits the
     title, the tags and the ingredient list, so "harissa" finds the dishes
     that use it. */
  const filters = bar + panel;

  const ai = `<button class="btn ghost" data-act="claude-kitchen">${svg('i-speak')} Ask Claude on my phone</button>
    <button class="btn ghost" data-act="my-recipe">${svg('i-plus')} Write in my own recipe</button>
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

  const soon = expiringItems(3);
  const soonBanner = !soon.length ? '' :
    `<div class="note soon"><span class="label">Use these soon</span>
      ${soon.slice(0, 6).map(e => `${esc(e.name)} (${useByLabel(e.useBy).toLowerCase()})`).join(', ')}${
        soon.length > 6 ? ` and ${soon.length - 6} more` : ''}.
      <span class="hint">Recipes using them are pushed up the list.</span></div>`;

  return filters + soonBanner + nudge
       + group(ready,  'Cook this now',  'Everything for these is already in your kitchen.')
       + group(nearly, 'One thing short', 'Buy the single missing thing and these are on.')
       + group(shop,   'Needs a shop',    null)
       + ai;
}

function recipeCard(m){
  const r = m.r, rating = state.ratings[r.id] || 0;
  const missing = m.missing.length;
  const swaps = (m.swaps || []).length, makes = (m.makes || []).length;
  const bits = [];
  if (makes === 1) bits.push(`make your own ${esc(m.makes[0].ing.item)}`);
  else if (makes > 1) bits.push(`make ${makes} things yourself`);
  if (swaps === 1) bits.push(`use your ${esc(m.swaps[0].swap.item)} instead of ${esc(m.swaps[0].ing.item)}`);
  else if (swaps > 1) bits.push(`${swaps} swaps from your shelves`);
  const swapLine = bits.length
    ? `<span class="swap">${svg('i-check','icon-sm')}You'd ${bits.join(', and ')}.</span>` : '';
  /* "Two ingredients missing" is the thing he wants to read off the card. The
     names come second, smaller — the count is what decides whether he taps. */
  const matchLine = missing === 0
    ? (swaps || makes
        ? `<span class="ok">You can cook this.</span> ${swapLine}`
        : `<span class="ok">You have everything.</span>`)
    : `<span class="short">${missing} ingredient${missing===1?'':'s'} missing</span>
       <span class="needlist">${m.missing.slice(0,3).map(i => esc(i.item)).join(', ')}${missing>3?` and ${missing-3} more`:''}</span>
       ${swapLine}`;
  return `<button class="rcard" data-open="${esc(r.id)}">
    <span class="photo">${photoHTML(r)}${rating ? `<span class="stars">${svg('i-star','icon-sm')}${rating}</span>` : ''}</span>
    <span class="rcard-body">
      <span class="eyebrow">${esc(cuisineLabel(r.cuisine))} &middot; ${esc(applianceLabel(r))} &middot; ${r.activeMinutes||r.minutes} min</span>
      <h3>${esc(r.title)}</h3>
      ${r.subtitle ? `<span class="gloss">${esc(r.subtitle)}</span>` : ''}
      <span class="match">${matchLine}</span>
      ${m.capacityWarning ? `<span class="warnline">${svg('i-timer','icon-sm')}${esc(m.capacityWarning)}</span>` : ''}
      <span class="see">See the recipe ${svg('i-chev','icon-sm')}</span>
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

  /* Which shelves this tab actually has. Built from the full tab, not from the
     search results, so the row doesn't jump around while he types. */
  const present = [];
  itemsFor(tab).forEach(i => {
    const sec = sectionOf(i, tab);
    if (!present.includes(sec)) present.push(sec);
  });
  present.sort((a, b) => SECTION_ORDER.indexOf(a) - SECTION_ORDER.indexOf(b));
  if (!present.includes(view.section)) view.section = 'all';

  /* One shelf at a time. Tapping Vegetables shows the vegetables and nothing
     else, which is how he actually stands at the fridge and ticks things off. */
  /* While he is typing, the search runs across the whole tab — a shelf filter
     that hides the very thing he searched for reads as a broken app. */
  const sectionRow = (present.length < 2 || q) ? '' :
    `<div class="filter-row sects">
      <button class="opt" data-sect="all" aria-pressed="${view.section==='all'}">Everything</button>
      ${present.map(sec =>
        `<button class="opt" data-sect="${sec}" aria-pressed="${view.section===sec}">${esc(SECTION_SHORT[sec])}</button>`).join('')}
    </div>`;

  if (view.section !== 'all' && !q) items = items.filter(i => sectionOf(i, tab) === view.section);

  const search = `<div class="searchbox">${svg('i-search')}
    <input type="text" placeholder="Type anything &mdash; found or not" value="${esc(view.search)}"
           data-role="search" enterkeyhint="done" autocomplete="off">
    ${view.search ? `<button class="bar-btn" data-act="clear-search" aria-label="Clear">${svg('i-x','icon-sm')}</button>` : ''}
  </div>`;

  const inv = state.inventory[tab];
  const rowHTML = i => {
    const st = inv[i.name] || {};
    /* A date beats the other two tags: ALWAYS and LOW can wait, a thing going
       off on Thursday cannot. Past a week out it stops being news. */
    const left = st.have && st.useBy ? daysLeft(st.useBy) : null;
    const flag = (left !== null && left <= 7)
        ? `<span class="useby ${left < 0 ? 'over' : left <= 2 ? 'urgent' : ''}">${useByLabel(st.useBy)}</span>`
        : st.always ? `<span class="always-tag">ALWAYS</span>`
        : st.have && st.low ? `<span class="low">LOW</span>` : '';
    return `<button class="item ${st.have?'on':''} ${st.always?'always':''}" data-item="${esc(i.name)}">
      <span class="box"></span>
      <span class="name">${esc(i.name)}</span>
      ${flag}
      <span class="more" data-more="${esc(i.name)}" role="presentation">${svg('i-plus','icon-sm')}</span>
    </button>`;
  };

  /* Split into shelves. Forty rows in one column meant scrolling past the meat
     to reach the mustard; now each part of the fridge is its own short list,
     and the header says how much of it he has. */
  const bySection = {};
  items.forEach(i => {
    const sec = sectionOf(i, tab);
    (bySection[sec] = bySection[sec] || []).push(i);
  });
  const shown = SECTION_ORDER.filter(sec => bySection[sec]);
  const rows = shown.map(sec => {
    const list = bySection[sec];
    const got = list.filter(i => (inv[i.name] || {}).have).length;
    return `<div class="secthead"><span>${esc(SECTION_LABEL[sec])}</span>
      <span class="n num">${got}/${list.length}</span></div>` + list.map(rowHTML).join('');
  }).join('');

  /* The add button sits directly under the box you typed in. It used to live
     below the whole list, where on a phone it was off the bottom of the screen
     and nobody ever found it. */
  const typed = view.search.trim();
  const already = items.find(i => norm(i.name) === norm(typed));
  const knownAs = !already && typed
    ? allItems().find(i => sameItem(i.name, typed))
    : null;

  /* What actually happens: he taps the search box, hits the microphone on his
     keyboard, and says the whole fridge into it. That used to match no row and
     offer to add the entire sentence as one ingredient called "eggs milk and
     some carrots". If the words hold more than one thing we know, tick them. */
  const heard = (typed && typed.split(/\s+/).length > 1) ? readItemList(typed) : null;
  const spokenNames = heard ? heard.known.concat(heard.fresh) : [];
  const heardAList = spokenNames.length > 1;

  let addBlock = '';
  if (heardAList){
    addBlock = `<button class="btn" data-act="tick-spoken">${svg('i-check')}
         Go through these ${spokenNames.length}
       </button>
       <p class="hint">${esc(spokenNames.map(k => k.name).join(', '))}.${
         heard.fresh.length ? ` ${heard.fresh.length} of those ${heard.fresh.length === 1 ? 'is' : 'are'}
           new &mdash; I&rsquo;ll add ${heard.fresh.length === 1 ? 'it' : 'them'} to your list.` : ''}</p>`;
  } else if (typed && !already){
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
    `<button class="btn" data-act="paste-list">${svg('i-speak')} Say or paste my whole kitchen</button>
     <div class="camrow">
       <button class="btn ghost" data-act="scan-barcode">${svg('i-scan')} Scan a barcode</button>
       <button class="btn ghost" data-act="take-photo">${svg('i-camera')} Photograph a shelf</button>
     </div>`;

  const count = Object.values(inv).filter(v => v && v.have).length;
  const always = Object.values(inv).filter(v => v && v.always).length;

  return tabs + sectionRow + search + addBlock + sayAll
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
    const madeable = (a.makes || []).find(s => s.ing === ing);
    return `<div class="ing ${missing?'missing':''}${(swapped||madeable)?' swapped':''}">
      <span class="q">${esc(qtyLabel(ing, a.factor))}</span>
      <span class="n">${esc(ing.item)}${ing.note ? `<small>${esc(ing.note)}</small>` : ''}${
        madeable ? `<small class="swapnote"><b>Make it:</b> ${esc(madeable.make.how)}</small>` : ''}${
        swapped ? `<small class="swapnote">Use your <b>${esc(swapped.swap.item)}</b> — ${esc(swapped.swap.note)}</small>` : ''}${
        missing && ing.sub ? `<small>Or: ${esc(ing.sub)}</small>` : ''}</span>
      ${missing
        ? `<button class="add" data-buy="${i}">Buy</button>`
        : madeable
          ? `<span class="sub-badge">${svg('i-check','icon-sm')}make</span>`
          : swapped
            ? `<span class="sub-badge">${svg('i-check','icon-sm')}swap</span>`
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
  ${r.vetting ? `<div class="note vetted"><span class="label">Why this one is in here</span>${esc(r.vetting)}${
    r.source && r.source.url ? `<a class="srclink" href="${esc(r.source.url)}" target="_blank" rel="noopener">Read the original &rsaquo;</a>` : ''}</div>` : ''}

  <div class="section"><h2>My notes</h2>
    <textarea class="note-box" rows="3" data-role="note" data-recipe="${esc(r.id)}"
      placeholder="What you changed, what you'd do differently. Saves as you type."></textarea>
  </div>

  <div class="section"><h2>How was it?</h2>
    <div class="rate">${stars}</div>
    <p class="eyebrow" style="text-align:center">${rating ? 'Five-star ones come back to the top' : 'Rate it after you cook it'}</p>
  </div>

  ${isMyRecipe(r.id) ? `<button class="btn ghost" data-act="edit-mine">${svg('i-plus')} Edit this recipe</button>` : ''}
  <button class="btn ghost" data-act="plan-this">${svg('i-plan')} Plan this for another day</button>
  <button class="btn ghost" data-act="used-up">${svg('i-fridge')} I cooked it &mdash; update my kitchen</button>

  ${isMyRecipe(r.id) ? `<button class="btn ghost danger" data-act="delete-mine">Delete this recipe</button>` : ''}
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
      <div class="field-row">
        <input id="apikey" type="password" data-role="apikey" value="${esc(p.apiKey)}"
               placeholder="sk-ant-..." autocomplete="off" spellcheck="false">
        <button class="btn ghost pastebtn" data-act="paste-into" data-target="apikey">Paste</button>
      </div>
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

  <div class="section"><h2>My other phone</h2>
    <button class="btn ghost" data-act="send-kitchen">${svg('i-list')} Copy my kitchen to my other phone</button>
    <p class="hint">Every phone keeps its own kitchen &mdash; nothing is uploaded, so nothing
       syncs on its own. This makes a link out of everything you have ticked. Send it to your
       other phone, open it, and the same boxes tick over there. It only ever
       <b>adds</b>: it will not untick anything.</p>
  </div>

  <div class="section"><h2>This app</h2>
    <div class="card pad" style="padding:4px 16px">
      <div class="row"><div class="lab"><b>Version</b>
        <small>${BUILD ? esc(BUILD) : 'not installed for offline use yet'}</small></div>
      </div>
    </div>
    <button class="btn ghost" data-act="check-update">${svg('i-check')} Check for a new version</button>
    <p class="hint">Frigo keeps itself on the phone so it works with no signal, which also
       means it can sit on an old copy. This fetches the newest one and restarts.</p>
  </div>

  <div class="section"><h2>Keep my phones in step</h2>
    <div class="field">
      <label for="syncurl">Sync address</label>
      <div class="field-row">
        <input id="syncurl" type="url" data-role="syncurl" value="${esc(p.syncUrl)}"
               placeholder="https://script.google.com/macros/s/..." autocomplete="off"
               spellcheck="false">
        <button class="btn ghost pastebtn" data-act="paste-into" data-target="syncurl">Paste</button>
      </div>
    </div>
    <button class="btn" data-act="sync-now" ${syncing ? 'disabled' : ''}>
      ${svg('i-check')} ${syncing ? 'Syncing&hellip;' : 'Sync now'}</button>
    <p class="hint">${p.syncedAt
        ? 'Last synced ' + esc(new Date(p.syncedAt).toLocaleString()) + '.'
        : 'Not synced yet.'}
       Every device with this address shares one kitchen. Syncing only ever
       <b>adds</b> &mdash; ratings, notes, shopping rows and your own recipes are never
       deleted by it. Ticks are the exception: the <b>most recent</b> tap wins, so
       drinking the milk on one phone unticks it on the other.</p>
    <p class="hint">You make the address yourself from a Google Sheet &mdash; the file
       <b>sync-sheet.gs</b> in the app folder has the twenty lines and the steps. Nothing
       goes through anyone else&rsquo;s service. <b>Treat that address like a password</b>:
       anyone holding it can read your kitchen. Your API key is never sent.</p>
  </div>

  <div class="section"><h2>Your data</h2>
    <button class="btn ghost" data-act="export">Save a backup file</button>
    <button class="btn ghost" data-act="import">Restore from a backup</button>
    <p class="hint">Nothing leaves this phone unless you set up syncing above. The backup
       file carries the lot &mdash; ratings, notes, shopping list and all &mdash; including
       your API key, so don&rsquo;t leave it anywhere public. Restoring <b>adds</b> to what
       is here; it never wipes it.</p>
  </div>`;
}

/* ------------------------------------------- reading a list someone wrote

   Free text in, inventory out. The list might come from Claude, from a note,
   or from Jerome talking into the box, so it has to cope with bullets,
   quantities and the word "and". */
const LIST_NOISE = /^[\s\-•*\d.)\]]+|\b(a|an|some|few|couple|of|and|to|i|ive|i've|have|got|there|is|are|my|the)\b/gi;
/* The unit has to end where the word ends, or the l of litres eats the l of
   lemon and "1 lemon" becomes one litre of emon. */
const QTY_LEAD = /^\s*(\d+[\d\/.,]*)\s*(?:(x|kg|g|lb|lbs|oz|ml|l|litres?|liters?|cups?|tbsp|tsp|cloves?|pieces?|packs?|packets?|boxes?|box|bags?|bunch(?:es)?|tins?|cans?|jars?|bottles?)(?![a-z]))?\s*/i;

function tabForAisle(aisle){
  if (aisle === 'frozen') return 'freezer';
  if (aisle === 'spices') return 'spices';
  if (aisle === 'produce' || aisle === 'dairy' || aisle === 'meat') return 'fridge';
  return 'pantry';
}

/* Dictated speech rarely has commas in it — "eggs some milk harissa" arrives as
   one run. These are the words people put between items when they're talking,
   so they mark a boundary as reliably as a comma does. */
/* "comma" and "next" are in here because they are what he SAYS when two
   things run together — Android writes the word rather than the punctuation
   mark, and without this it would become an ingredient called comma. */
const LIST_SPLIT = /[,;\n\r]+|\b(?:and|plus|also|then|next|comma|some|a|an|few|couple)\b/i;

/* A couple of real names have a splitter word sitting inside them. Bolt those
   back together before the text is cut up, or "half and half" arrives as
   "half" and gets added as a brand new thing. */
const LIST_GLUE = [
  [/\bhalf\s+and\s+half\b/gi, 'halfandhalf'],
  [/\bsalt\s+and\s+pepper\b/gi, 'salt, black pepper'],
  [/\boil\s+and\s+vinegar\b/gi, 'olive oil, vinegar'],
  [/\blea\s+(?:and|&)\s+perrins\b/gi, 'worcestershire sauce']
];
/* Spellings a phone keyboard and a French speaker both get wrong. There is
   nothing to guess about these, so they are corrected quietly rather than
   offered back as a question. Sound-alikes are a different matter and go
   through soundsLike, which asks first. */
const MISSPELT = [
  [/\btumeric\b/gi, 'turmeric'],
  [/\bcorriander\b/gi, 'coriander'],
  [/\bcilanto\b/gi, 'cilantro'],
  [/\bbrocoli\b/gi, 'broccoli'],
  [/\bavacado(e?s)?\b/gi, 'avocados'],
  [/\bjalepenos?\b/gi, 'jalapenos'],
  [/\bmozarella\b/gi, 'mozzarella'],
  [/\bparmesean\b/gi, 'parmesan'],
  [/\bworstershire\b/gi, 'worcestershire'],
  [/\bciabbata\b/gi, 'ciabatta'],
  [/\bzucchinis?\b/gi, 'zucchini'],
  [/\bveggies?\b/gi, 'vegetables']
];

function glueList(text){
  let out = String(text);
  MISSPELT.forEach(([re, to]) => { out = out.replace(re, to); });
  LIST_GLUE.forEach(([re, to]) => { out = out.replace(re, to); });
  return out;
}

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
/* What a word sounds like, roughly. Dictation does not mistype, it mishears:
   thyme comes back as "time", chives as "hives", cumin as "coming". Those are
   miles apart as letters and next to identical as sounds, so the comparison
   has to be on the sound. Vowels go, the consonants that a microphone confuses
   are folded together, and a doubled sound counts once.

       cumin -> kmn      coming -> kmnk      (one apart)
       thyme -> tm       time   -> tm        (the same)
       shallots -> slts  "shall lots" -> slts

   It is deliberately crude. Its answers are never applied, only offered. */
const SOUND_CLASS = { b:'b', p:'b', f:'f', v:'f', c:'k', k:'k', q:'k', g:'k',
  j:'j', s:'s', z:'s', x:'s', t:'t', d:'t', l:'l', r:'r', m:'m', n:'n' };

function soundOf(name){
  const flat = norm(name).replace(/[^a-z]/g, '')
    .replace(/ph/g, 'f').replace(/gh/g, '').replace(/ck/g, 'k')
    .replace(/sh/g, 's').replace(/ch/g, 'k').replace(/th/g, 't');
  let out = '';
  for (const ch of flat){
    const c = SOUND_CLASS[ch];
    if (!c || c === out[out.length - 1]) continue;
    out += c;
  }
  return out;
}

/* Plain edit distance, used only to pick between candidates that already
   sound alike. Bails out once it is clearly too far to matter. */
function editDistance(a, b, cap){
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++){
    const row = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++){
      row[j] = Math.min(prev[j] + 1, row[j - 1] + 1,
                        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (row[j] < best) best = row[j];
    }
    if (best > cap) return cap + 1;
    prev = row;
  }
  return prev[b.length];
}

/* The nearest real food to something nobody recognised. Sound first, spelling
   only to break a tie. A one-letter word or a very short sound is refused —
   at that length everything is near everything. */
function soundsLike(phrase, pools){
  const heard = soundOf(phrase);
  if (heard.length < 2) return null;
  const letters = norm(phrase).replace(/[^a-z]/g, '');
  if (letters.length < 4) return null;

  /* One word may be a sound out. Two words may not: a mishear happens per
     word, so a run that only nearly fits is a coincidence. Without this,
     "hives brazil" came back as fresh parsley instead of chives and basil. */
  const cap = phrase.trim().split(/\s+/).length > 1 ? 0 : 1;

  let best = null, bestScore = Infinity;
  pools.forEach(pool => pool.forEach(item => {
    const mine = soundOf(item.name);
    if (!mine || Math.abs(mine.length - heard.length) > cap) return;
    const sound = editDistance(mine, heard, cap);
    if (sound > cap) return;
    const spelt = editDistance(norm(item.name).replace(/[^a-z]/g, ''), letters, 6);
    /* Length has to be in the same country, or "or so" finds harissa. */
    if (spelt > Math.max(3, Math.round(letters.length * 0.6))) return;
    const score = sound * 10 + spelt;
    if (score < bestScore){ bestScore = score; best = item; }
  }));
  return best;
}

function strictMatch(phrase, shelf){
  const weight = sigCount(phrase);
  if (!weight) return null;
  return shelf.find(k => norm(k.name) === phrase)
      || shelf.find(k => sigCount(k.name) === weight && sameItem(k.name, phrase))
      || null;
}

/* He says the short name. The shelf carries the long one — "oregano" is filed
   as "dried oregano", "cayenne" as "cayenne pepper" — and sameItem can join
   neither, because the head noun differs. Without this, saying either one adds
   a duplicate row instead of ticking the box already sitting there.

   So whatever the strict pass could not place gets one more try: every word he
   said must appear in the shelf name, and exactly one shelf name may fit. Two
   candidates and it stays unmatched, because "cream" could be four things. */
/* Words that name a family, not a thing. Anywhere the shelf holds several
   candidates the one-match rule already refuses to guess; these are the ones
   where it holds exactly one and the guess would still be wrong. "cheese"
   fitting only "american cheese" says the list is short, not that he meant
   American. Said on its own, one of these is reported back as not understood
   rather than filed as a new ingredient. */
const GENERIC = new Set(['cheese','meat','fish','bread']);

function looseMatch(phrase, shelf){
  const want = keyWords(phrase);
  if (!want.length) return null;
  if (want.length === 1 && GENERIC.has(want[0])) return null;
  const hits = shelf.filter(k => {
    const have = keyWords(k.name);
    return have.length > want.length && want.every(w => have.includes(w));
  });
  return hits.length === 1 ? hits[0] : null;
}

/* Walk the words and take the longest run that matches. What never matched
   comes back as gaps, so the next pass can try it and anything still left is
   added as a new item rather than silently dropped. */
function walkMatch(words, shelf, match){
  const found = [], gaps = [];
  let i = 0, gap = [];
  const flushGap = () => { if (gap.length){ gaps.push(gap.join(' ')); gap = []; } };
  while (i < words.length){
    let hit = null, span = 0, heard = '';
    for (let n = Math.min(MAX_ITEM_WORDS, words.length - i); n >= 1; n--){
      const phrase = words.slice(i, i + n).join(' ');
      const m = match(phrase, shelf);
      if (m){ hit = m; span = n; heard = phrase; break; }
    }
    if (hit){ flushGap(); found.push({ item:hit, heard }); i += span; }
    else { gap.push(words[i]); i++; }
  }
  flushGap();
  return { found, gaps };
}

/* Work out what the text means and change nothing. The button that offers to
   tick a spoken list counts what this returns, and applying writes exactly
   this — so the label can never promise a different number than it delivers. */
/* Free text in, four answers out.

   Four, because the honest answer to a dictated fridge is not one list. It is:
   things you already have, foods you have that aren't on a shelf yet, words I
   think I misheard, and words I don't believe are food at all. The last two go
   back unticked so nothing bad can land without him agreeing to it. */
function readItemList(text){
  const known = [], fresh = [], guesses = [], unsure = [], unknown = [];
  const shelf = allItems();
  const vocab = foodVocab();

  const addKnown = k => {
    if (!known.some(o => o.name === k.name && o.tab === k.tab)) known.push(k);
  };
  const addFresh = (name, aisle) => {
    /* A vocabulary name can turn out to be a shelf name under another spelling,
       and adding it again would leave him with two rows for one jar. */
    const onShelf = shelf.find(i => norm(i.name) === norm(name));
    if (onShelf){ addKnown(onShelf); return; }
    const tab = tabForAisle(aisle || aisleOf(name));
    if (!fresh.some(o => o.name === name)) {
      fresh.push({ name, tab, aisle: aisle || aisleOf(name, tab) });
    }
  };
  const addGuess = (heard, item) => {
    if (guesses.some(g => g.name === item.name)) return;
    if (known.some(o => o.name === item.name)) return;
    if (fresh.some(o => o.name === item.name)) return;
    const tab = item.tab || tabForAisle(item.aisle);
    guesses.push({ name:item.name, tab, aisle:item.aisle, isNew:!!item.vocab, heard });
  };

  glueList(text).split(LIST_SPLIT).forEach(raw => {
    const s = norm(String(raw).replace(QTY_LEAD, '').replace(LIST_NOISE, ' '))
                .replace(/[^a-z0-9'\s-]/g,' ').replace(/\s+/g,' ').trim();
    if (s.length < 2) return;
    if (!itemParts(s)) { unknown.push(raw.trim()); return; }

    const strict = walkMatch(s.split(' '), shelf, strictMatch);
    strict.found.forEach(f => addKnown(f.item));
    const matchedSomething = strict.found.length > 0;

    strict.gaps.forEach(gap => {
      /* All of the gap or none of it. A loose walk that leaves words behind is
         how "goya cubes" found ice cubes and "old bay" found bay leaves — the
         tail word fitted and the brand in front of it was filed as an
         ingredient of its own. Every word accounted for, though, and it is
         simply two things said in a row: "oregano cayenne". */
      const near = walkMatch(gap.split(' '), shelf, looseMatch);
      if (near.found.length && !near.gaps.length){
        near.found.forEach(f => addKnown(f.item));
        return;
      }

      const words = keyWords(gap);
      if (!words.length) return;
      if (words.length === 1 && GENERIC.has(words[0])){ unknown.push(gap); return; }

      /* One stray word beside something that DID match is usually a word
         describing it — "greek" next to yogurt. Named outright it is still
         fine, which is how a lone "pomegranate" at the end of a spoken run
         survives; what it may not do is get STRETCHED into an ingredient by a
         near match, or come back as a complaint. A sound-alike still counts,
         though: one misheard word sitting between good ones is the most
         ordinary mistake there is, and it arrives unticked anyway. */
      const stray = matchedSomething && words.length < 2;

      /* His shelves have run out of ideas. Walk what is left against the food
         vocabulary — this is the step that turns one unbroken run of dictation,
         "kale swiss chard bok choy daikon", into four separate foods. */
      const found = walkMatch(gap.split(' '), vocab, strictMatch);
      found.found.forEach(f => addFresh(f.item.name, f.item.aisle));

      found.gaps.forEach(rest => {
        if (!stray){
          const vh = looseMatch(rest, vocab);
          if (vh){ addFresh(vh.name, vh.aisle); return; }
        }

        /* Nobody has heard of it. Before writing it off, ask what it sounds
           like — this is where "coming" becomes cumin and "hives" chives. */
        const near = walkMatch(rest.split(' '), null,
                               (phrase) => soundsLike(phrase, [shelf, vocab]));
        near.found.forEach(f => addGuess(f.heard, f.item));
        if (stray) return;
        near.gaps.forEach(left => {
          if (keyWords(left).length) unsure.push(left);
        });
      });
    });
  });
  return { known, fresh, guesses, unsure, unknown };
}

/* Tick without trampling. A row may already carry a use-by date or an always
   flag, and saying its name out loud is no reason to lose either. */
function tickHave(tab, name){
  const inv = state.inventory[tab];
  inv[name] = Object.assign({ low:false }, inv[name], { have:true });
}

function applyItemList(text){
  const r = readItemList(text);
  r.known.forEach(k => tickHave(k.tab, k.name));
  r.fresh.forEach(f => {
    if (!state.custom[f.tab].some(o => norm(o.name) === f.name))
      state.custom[f.tab].push({ name:f.name, aisle:f.aisle, staple:false });
    tickHave(f.tab, f.name);
  });
  /* Guesses and not-sures are deliberately left out. They only ever land
     through the review sheet, where he can see them first. */
  return { ticked: r.known.map(k => k.name), added: r.fresh.map(f => f.name),
           unknown: r.unknown.concat(r.unsure).concat(r.guesses.map(g => g.heard)) };
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

function openUseBy(tab, name){
  view.useByFor = { tab, name };
  const cur = (state.inventory[tab][name] || {}).useBy || '';
  openSheet(`<h2>${esc(name)}</h2>
    <p class="hint">When does it need eating?</p>
    <div class="filter-row">
      <button class="opt" data-useby="${addDays(1)}">Tomorrow</button>
      <button class="opt" data-useby="${addDays(3)}">In 3 days</button>
      <button class="opt" data-useby="${addDays(7)}">In a week</button>
    </div>
    <div class="field">
      <label for="ubdate">Or pick the day</label>
      <input id="ubdate" type="date" data-role="useby-date" value="${esc(cur)}" min="${today()}">
    </div>
    <button class="btn" data-act="useby-save">Save</button>
    ${cur ? '<button class="btn ghost" data-act="useby-clear">Take the date off</button>' : ''}
    <button class="btn ghost" data-act="close-sheet">Cancel</button>`);
}
function setUseBy(iso){
  const w = view.useByFor;
  if (!w) return;
  const inv = state.inventory[w.tab];
  const cur = inv[w.name] || { have:true, low:false };
  cur.have = true;
  if (iso) cur.useBy = iso; else delete cur.useBy;
  inv[w.name] = cur;
  view.useByFor = null;
  closeSheet(); save(); render();
  toast(iso ? w.name + ' — use by ' + useByLabel(iso).toLowerCase() : 'Date taken off ' + w.name);
}

/* --------------------------------------------------- his own recipes

   A recipe he types in himself. It has to end up in the same shape as a
   researched one or nothing downstream works — matching, scaling and the
   shopping list all read the same fields. The quantities are parsed off the
   front of each line with the same reader the spoken kitchen list uses, and
   every ingredient is snapped to a name already on his shelves where one
   fits, so "2 tbsp dijon" counts the dijon he actually owns. */
function parseMyIngredient(line){
  const raw = String(line).trim().replace(/^[-•*]\s*/, '');
  if (raw.length < 2) return null;
  let qty = null, unit = null, item = raw;
  const m = QTY_LEAD.exec(raw);
  if (m && m[1]){
    const n = m[1].includes('/')
      ? parseFloat(m[1].split('/')[0]) / parseFloat(m[1].split('/')[1])
      : parseFloat(m[1].replace(',', '.'));
    if (isFinite(n) && n > 0){
      qty = Math.round(n * 100) / 100;
      unit = (m[2] || 'piece').toLowerCase();
      item = raw.slice(m[0].length).trim();
    }
  }
  if (item.length < 2) item = raw;
  /* Keep the words he wrote — "1 lemon", not "1 lemons". The matcher already
     treats those as the same thing, so snapping the name buys nothing; the
     shelf match is only worth having for the aisle it knows. */
  const known = allItems().find(i => norm(i.name) === norm(item))
             || allItems().find(i => sameItem(i.name, item));
  return { item, qty, unit: qty ? unit : null,
           aisle: known ? known.aisle : aisleOf(item), scale: qty !== null };
}

function parseMyStep(line){
  const text = String(line).trim().replace(/^\s*\d+[.)]\s*/, '').replace(/^[-•*]\s*/, '');
  if (text.length < 2) return null;
  /* Only a written number turns into a timer, because that is the only case
     where the button would say something true. */
  const m = /(\d+)\s*(?:min|minute)/i.exec(text);
  return { text, minutes: m ? Number(m[1]) : null };
}

function openMyRecipe(id){
  const r = id ? (state.myRecipes || []).find(x => x.id === id) : null;
  view.editingRecipe = r ? r.id : null;
  openSheet(`<h2>${r ? 'Edit my recipe' : 'Write in my own recipe'}</h2>
    <div class="field"><label for="mr-title">What's it called</label>
      <input id="mr-title" type="text" data-role="mr-title" placeholder="Mum's roast chicken"></div>
    <div class="row"><div class="lab"><b>Serves</b><small>What the amounts below are for</small></div>
      <input class="small-num" type="number" data-role="mr-serves" min="1" max="12" value="${r ? r.baseServings : 2}"></div>
    <div class="row"><div class="lab"><b>Minutes</b><small>Start to finish</small></div>
      <input class="small-num" type="number" data-role="mr-mins" min="5" max="600" value="${r ? r.minutes : 30}"></div>
    <div class="field"><label for="mr-ings">Ingredients &mdash; one per line</label>
      <textarea id="mr-ings" data-role="mr-ings" rows="6"
        placeholder="4 chicken thighs&#10;2 tbsp dijon mustard&#10;1 lemon"></textarea>
      <p class="hint">Put the amount first. Anything already on your shelves is recognised,
         so these count towards what you can cook.</p></div>
    <div class="field"><label for="mr-steps">Method &mdash; one step per line</label>
      <textarea id="mr-steps" data-role="mr-steps" rows="6"
        placeholder="Heat the oven to two hundred degrees.&#10;Brown the thighs for 8 minutes."></textarea>
      <p class="hint">Say "8 minutes" in a step and it gets a timer button.</p></div>
    <button class="btn" data-act="mr-save">${r ? 'Save the changes' : 'Add it to my recipes'}</button>
    <button class="btn ghost" data-act="close-sheet">Cancel</button>`);
  /* His words are set on the nodes, never poured into innerHTML. */
  const set = (role, val) => {
    const el = document.querySelector('[data-role=' + role + ']');
    if (el) el.value = val;
  };
  set('mr-title', r ? r.title : '');
  set('mr-ings', r ? r.ingredients.map(i =>
        [i.qty || '', i.qty && i.unit !== 'piece' ? i.unit : '', i.item]
          .filter(Boolean).join(' ')).join('\n') : '');
  set('mr-steps', r ? r.steps.map(st => st.text).join('\n') : '');
  const t = document.querySelector('[data-role=mr-title]');
  if (t) t.focus();
}

function saveMyRecipe(){
  const val = role => {
    const el = document.querySelector('[data-role=' + role + ']');
    return el ? el.value : '';
  };
  const title = val('mr-title').trim();
  const ings  = val('mr-ings').split('\n').map(parseMyIngredient).filter(Boolean);
  const steps = val('mr-steps').split('\n').map(parseMyStep).filter(Boolean);
  if (!title){ toast('It needs a name'); return; }
  if (!ings.length){ toast('Add at least one ingredient'); return; }
  if (!steps.length){ toast('Add at least one step'); return; }

  const serves = Math.max(1, Math.min(12, Number(val('mr-serves')) || 2));
  const mins   = Math.max(1, Math.min(600, Number(val('mr-mins')) || 30));
  const old = view.editingRecipe
    ? (state.myRecipes || []).find(x => x.id === view.editingRecipe) : null;

  const recipe = {
    id: old ? old.id
       : 'mine-' + (norm(title).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40)
                    || 'recipe') + '-' + Date.now().toString(36),
    title,
    photo: null,
    cuisine: 'other',
    appliances: ['stove'],
    minutes: mins,
    activeMinutes: mins,
    difficulty: 'easy',
    baseServings: serves,
    scalable: [1, 8],
    capacityQt: null,
    tags: ['mine'],
    spiceLevel: 2,
    ingredients: ings,
    misePlace: [],
    steps,
    source: { name: 'My own kitchen' }
  };

  state.myRecipes = (state.myRecipes || []).filter(x => x.id !== recipe.id);
  state.myRecipes.push(recipe);
  view.editingRecipe = null;
  closeSheet(); save();
  view.screen = 'recipe'; view.recipeId = recipe.id;
  render();
  toast(old ? 'Saved' : title + ' is in your recipes');
}

function deleteMyRecipe(id){
  state.myRecipes = (state.myRecipes || []).filter(x => x.id !== id);
  delete state.notes[id];
  delete state.ratings[id];
  state.favorites = state.favorites.filter(f => f !== id);
  closeSheet(); save();
  view.screen = 'cook'; view.recipeId = null;
  render(); toast('Deleted');
}

/* ------------------------------------------------------- which build is this

   "It still shows the old version" is unanswerable without this. The cache the
   service worker is actually serving from is named after the deploy, and the
   page can read that list directly — no message passing, no constant in two
   files to forget to bump. */
let BUILD = '';

function readBuild(){
  if (!window.caches || !caches.keys) return;
  caches.keys().then(keys => {
    const mine = keys.filter(k => /^frigo-v/.test(k)).sort();
    const found = mine.length ? mine[mine.length - 1] : '';
    if (found && found !== BUILD){
      BUILD = found;
      if (view.screen === 'settings') render();
    }
  }).catch(() => {});
}

/* Chrome only looks for a new worker when the app navigates, which an installed
   app resumed from the background never does. This is the button that asks. */
async function checkForUpdate(){
  if (!('serviceWorker' in navigator)){
    toast('This browser cannot update in the background');
    return;
  }
  toast('Looking for a new version…');
  try{
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg){ location.reload(); return; }
    await reg.update();
  }catch(e){}
  /* Whatever the worker decided, a reload is what swaps the running page for
     the one that was just fetched. */
  setTimeout(() => location.reload(true), 1200);
}

/* ================================================================= camera

   Two jobs, one live view.

   SCAN reads barcodes off jars and tins straight from the video feed, using the
   browser's own BarcodeDetector — no library, nothing bundled, nothing to keep
   up to date. A hit is looked up in Open Food Facts and shown as a question,
   because a scanner that files things silently is a scanner you stop trusting.
   Say yes and it goes in; say no and it keeps looking.

   PHOTO covers everything a barcode cannot, which is most of a fridge: loose
   vegetables, meat in paper, last night's leftovers. The frame is pulled off
   the video into a canvas, shrunk, and sent to Claude. It never reaches the
   camera roll, and it is not kept afterwards either — it exists as a string in
   memory for as long as the request takes.

   Both of these leave the phone, which nothing else in the app does. That is
   the trade, and it is why they are two deliberate buttons rather than
   something running in the background. */

const CAM = {
  stream: null,
  mode: 'scan',        /* scan | photo */
  detector: null,
  timer: null,
  busy: false,
  seen: '',            /* the code being asked about, so it isn't asked twice */
  hit: null,           /* the last lookup, kept for the scan log */
  msg: ''
};

function cameraSupported(){
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}
function barcodeSupported(){
  return typeof window.BarcodeDetector === 'function';
}

function openCamera(mode){
  if (!cameraSupported()){
    toast('This phone will not give the app a camera');
    return;
  }
  if (mode === 'photo' && !state.prefs.apiKey){
    openSheet(`<h2>Reading a photo needs a key</h2>
      <p class="hint">The photo goes to Claude to be read, using an API key of your own that
         lives on this phone only. It costs about <b>a cent a photo</b> &mdash; five dollars of
         credit is around five hundred of them.</p>
      <p class="hint">Scanning barcodes needs no key, and saying your kitchen out loud needs
         nothing at all.</p>
      <button class="btn" data-act="go-settings">Open settings</button>
      <button class="btn ghost" data-act="close-sheet">Not now</button>`);
    return;
  }
  CAM.mode = mode;
  CAM.msg = '';
  CAM.seen = '';
  view.camera = true;
  render();
  startCamera();
}

function closeCamera(){
  stopScanLoop();
  if (CAM.stream){
    CAM.stream.getTracks().forEach(t => { try{ t.stop(); }catch(e){} });
    CAM.stream = null;
  }
  view.camera = false;
  CAM.busy = false;
  document.querySelectorAll('.camera').forEach(n => n.remove());
  render();
}

async function startCamera(){
  try{
    /* environment = the back camera. Phones ignore an exact request when there
       is only one, so this is a preference rather than a demand. */
    CAM.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } }, audio: false
    });
  }catch(err){
    CAM.msg = (err && err.name === 'NotAllowedError')
      ? 'The camera is blocked for this app. Allow it in your browser settings and try again.'
      : 'That camera would not start. You can still say your kitchen out loud.';
    renderCamera();
    return;
  }
  const v = document.querySelector('.camera video');
  if (v){
    v.srcObject = CAM.stream;
    try{ await v.play(); }catch(e){}
  }
  if (CAM.mode === 'scan') startScanLoop();
}

function startScanLoop(){
  if (!barcodeSupported()){
    CAM.msg = 'This browser cannot read barcodes. Take a photo instead, or say it out loud.';
    renderCamera();
    return;
  }
  try{
    CAM.detector = CAM.detector || new window.BarcodeDetector({
      formats: ['ean_13','ean_8','upc_a','upc_e','code_128','itf']
    });
  }catch(e){
    CAM.msg = 'This browser cannot read barcodes. Take a photo instead.';
    renderCamera();
    return;
  }
  stopScanLoop();
  CAM.timer = setInterval(scanTick, 350);
}

function stopScanLoop(){
  if (CAM.timer){ clearInterval(CAM.timer); CAM.timer = null; }
}

async function scanTick(){
  const v = document.querySelector('.camera video');
  if (!v || CAM.busy || !CAM.detector || v.readyState < 2) return;
  let codes = [];
  try{ codes = await CAM.detector.detect(v); }catch(e){ return; }
  if (!codes.length) return;

  const code = String(codes[0].rawValue || '').replace(/[^0-9]/g, '');
  if (!code || code === CAM.seen) return;

  CAM.seen = code;
  CAM.busy = true;
  stopScanLoop();
  CAM.msg = 'Looking that up…';
  renderCamera();

  let hit = null, err = '';
  try{ hit = await window.FrigoAI.lookupBarcode(code); }
  catch(e){ err = e.message; }
  CAM.busy = false;

  if (err){ CAM.msg = err; renderCamera(); return; }
  if (!hit){
    CAM.msg = 'That one is not in the database. Take a photo of it instead, or say it.';
    CAM.seen = '';
    renderCamera();
    startScanLoop();
    return;
  }
  askAboutBarcode(hit);
}

/* A scanned product name is a label, not an ingredient: "Heinz Tomato Ketchup
   397 g". A label names the thing LAST and describes it first, so the longest
   suffix that means something is the answer — read left to right, "tomato"
   matches the tomatoes on his shelf and the ketchup never gets a look in.

   Falls back to the reader the microphone uses, which handles the labels that
   are really a brand ("Better Than Bouillon"). */
function matchLabel(label){
  const words = norm(label).replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\b\d+(\.\d+)?\s*(g|kg|ml|l|oz|lb|lbs|ct|pk|fl)\b/g, ' ')
    .replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
  const shelf = allItems();

  /* What a shop calls it, minus the maker, the stock number, and the orphaned
     "s" an apostrophe leaves behind. This is what he is offered when the shelf
     has no row for it. */
  const clean = words
    .filter(w => !BRAND_WORD.has(singular(w)) && w.length > 1 && !/^\d+$/.test(w))
    .join(' ') || words.join(' ');

  for (let n = Math.min(MAX_ITEM_WORDS, words.length); n >= 1; n--){
    const phrase = words.slice(words.length - n).join(' ');
    if (!itemParts(phrase)) continue;
    /* The suffix has to say at least as much as the shelf row it claims to be,
       or a box of corn flakes matches the chilli flakes: "flakes" on its own
       fits anything with flakes in the name. */
    const hits = shelf.filter(k => sameItem(k.name, phrase)
                                && sigCount(phrase) >= sigCount(k.name));
    if (hits.length){
      hits.sort((a, b) => sigCount(b.name) - sigCount(a.name));
      return { item: hits[0], isNew: false, clean };
    }
  }

  /* Nothing on the shelf lines up with the end of the label, so fall back to
     the reader that knows the brands. It is allowed one clean answer and no
     more — a label that produces a list is a label nobody understood. */
  const read = readItemList(label);
  if (read.known.length === 1 && !read.fresh.length){
    return { item: read.known[0], isNew: false, clean };
  }
  if (!read.known.length && read.fresh.length === 1){
    return { item: read.fresh[0], isNew: true, clean };
  }
  return { item: null, isNew: true, clean };
}

function askAboutBarcode(hit){
  CAM.hit = hit;
  const found = matchLabel(hit.name);
  const match = found.item;
  const label = [hit.brand, hit.name, hit.size].filter(Boolean).join(' · ');
  /* The label as its own ingredient, for the tins the shelf has no row for and
     the ones the matcher gets wrong. A jar of cream of mushroom soup is not
     mushrooms, and he is the one who can see that. */
  const asIs = found.clean;

  CAM.msg = '';
  renderCamera();
  openSheet(`<h2>Is this it?</h2>
    <p class="hint">${esc(label)}</p>
    ${match
      ? `<div class="picklist"><div class="item"><span class="box on-static"></span>
          <span class="name">${esc(match.name)}${found.isNew
            ? '<small class="heard">new to your kitchen</small>' : ''}</span></div></div>
         <button class="btn" data-act="barcode-yes" data-name="${esc(match.name)}">
           Yes, tick it</button>`
      : `<p class="hint">Nothing on your shelves matches that one.</p>`}
    ${asIs && (!match || norm(match.name) !== norm(asIs))
      ? `<button class="btn ${match ? 'ghost' : ''}" data-act="barcode-yes"
                 data-name="${esc(asIs)}">${match ? 'No &mdash; add it as' : 'Add it as'}
           &ldquo;${esc(asIs)}&rdquo;</button>` : ''}
    <button class="btn ghost" data-act="barcode-no">Neither &mdash; keep scanning</button>`);
}

function resumeScanning(){
  closeSheet();
  CAM.seen = '';
  CAM.msg = '';
  if (view.camera){ renderCamera(); startScanLoop(); }
}

/* A phone camera hands over far more pixels than this needs, and every one of
   them is billed. The long side comes down to 1092, which is the point past
   which Claude gains nothing from a bigger picture. */
const PHOTO_MAX = 1092;

function grabFrame(){
  const v = document.querySelector('.camera video');
  if (!v || !v.videoWidth) return null;
  const scale = Math.min(1, PHOTO_MAX / Math.max(v.videoWidth, v.videoHeight));
  const c = document.createElement('canvas');
  c.width  = Math.round(v.videoWidth * scale);
  c.height = Math.round(v.videoHeight * scale);
  c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
  return c.toDataURL('image/jpeg', 0.8);
}

async function shootPhoto(){
  if (CAM.busy) return;
  const shot = grabFrame();
  if (!shot){ CAM.msg = 'The camera is not ready yet.'; renderCamera(); return; }

  CAM.busy = true;
  CAM.msg = 'Reading the photo…';
  renderCamera();

  let names = [], err = '';
  try{
    names = await window.FrigoAI.readPhoto({ apiKey: state.prefs.apiKey, dataUrl: shot });
  }catch(e){ err = e.message; }
  CAM.busy = false;

  /* The picture has done its job. Nothing keeps a reference to it from here,
     and it was never anywhere near his camera roll. */
  if (err){ CAM.msg = err; renderCamera(); return; }
  if (!names.length){
    CAM.msg = 'Nothing I could name in that one. Try getting closer, or more light.';
    renderCamera();
    return;
  }
  closeCamera();
  openReviewList(names.join(', '));
}

function renderCamera(){
  let box = document.querySelector('.camera');
  if (!view.camera){ if (box) box.remove(); return; }
  if (!box){
    box = document.createElement('div');
    box.className = 'camera';
    document.body.appendChild(box);
  }

  const scanning = CAM.mode === 'scan';
  /* The video element is written once and then left alone — rebuilding it
     would drop the stream and restart the camera on every state change. */
  if (!box.querySelector('video')){
    box.innerHTML = `<video playsinline muted></video><div class="cam-ui"></div>`;
    const v = box.querySelector('video');
    if (CAM.stream){ v.srcObject = CAM.stream; try{ v.play(); }catch(e){} }
  }

  box.querySelector('.cam-ui').innerHTML = `
    <div class="cam-top">
      <button class="cam-x" data-act="cam-close" aria-label="Close">${svg('i-x')}</button>
      <div class="cam-modes">
        <button class="opt" data-act="cam-scan" aria-pressed="${scanning}">Barcode</button>
        <button class="opt" data-act="cam-photo" aria-pressed="${!scanning}">Photo</button>
      </div>
    </div>
    ${scanning ? '<div class="cam-frame"></div>' : ''}
    <div class="cam-bottom">
      <p class="cam-msg">${esc(CAM.msg || (scanning
        ? 'Point it at a barcode. It reads on its own.'
        : 'Fill the frame with the shelf, then tap.'))}</p>
      ${scanning ? '' : `<button class="cam-shoot" data-act="cam-shoot"
         ${CAM.busy ? 'disabled' : ''} aria-label="Take the photo"></button>`}
    </div>`;
}

function switchCameraMode(mode){
  if (CAM.mode === mode) return;
  CAM.mode = mode;
  CAM.msg = '';
  CAM.seen = '';
  stopScanLoop();
  renderCamera();
  if (mode === 'scan') startScanLoop();
}

/* ------------------------------------------- putting the kitchen back after

   A fridge that never empties is a fridge that lies. Cook the last of the
   chicken thighs and the Cook screen goes on offering recipes built around
   them, which is the one failure that makes the whole app untrustworthy.

   Counting portions would fix it and would also have to be kept true forever,
   which nobody does. So the question is asked once, at the only moment he
   actually knows the answer: the pan is off the heat and he can see what is
   left. Three states, because that is how a cupboard really is — untouched,
   getting low, gone. */
function openUsedUp(){
  const r = findRecipe(view.recipeId);
  if (!r) return;
  const a = analyse(r, state.prefs.servings);

  /* If he cooked it with a stand-in, the stand-in is what got used up —
     offering the ingredient he never had would untick nothing. */
  const usedNames = ing => {
    const mk = (a.makes || []).find(s => s.ing === ing);
    if (mk) return mk.make.from;
    const sw = (a.swaps || []).find(s => s.ing === ing);
    return [sw ? sw.swap.item : ing.item];
  };
  const seen = new Set();
  const names = a.have.filter(i => !i.staple).flatMap(usedNames)
    .filter(n => !isAlways(n) && !seen.has(norm(n)) && seen.add(norm(n)));

  if (!names.length){
    openSheet(`<h2>Nothing to put back</h2>
      <p class="hint">Everything this used is a staple you keep in all the time.</p>
      <button class="btn" data-act="close-sheet">Done</button>`);
    return;
  }

  const rows = names.map(n => `<div class="item usedrow" data-usedup="${esc(n)}">
      <button class="usedbox" data-pickused="${esc(n)}" aria-label="Used up">
        <span class="box"></span><span class="name">${esc(n)}</span>
      </button>
      <button class="lowbtn" data-act="usedup-low" aria-label="Running low">Low</button>
    </div>`).join('');

  openSheet(`<h2>How is the kitchen now?</h2>
    <p class="hint">Tick anything you <b>finished</b> &mdash; it comes out of your kitchen
       and goes onto the shopping list. Tap <b>Low</b> for what is nearly gone; that stays,
       but recipes using it move up. Leave the rest alone.</p>
    <div class="picklist">${rows}</div>
    <button class="btn" data-act="usedup-done">Done</button>
    <button class="btn ghost" data-act="close-sheet">Nothing changed</button>`);
}

function applyUsedUp(){
  const gone = [], low = [];
  document.querySelectorAll('#sheet [data-usedup]').forEach(row => {
    const name = row.dataset.usedup;
    if (row.querySelector('.usedbox.on')) gone.push(name);
    else if (row.classList.contains('lowpick')) low.push(name);
  });

  const eachRow = (name, fn) => TABS.forEach(tab => {
    for (const k in state.inventory[tab]){
      if (norm(k) === norm(name) && !state.inventory[tab][k].always) fn(tab, k);
    }
  });

  gone.forEach(name => {
    eachRow(name, (tab, k) => { state.inventory[tab][k] = { have:false, low:false }; });
    addToShopping(name, '', '');
  });
  low.forEach(name => {
    eachRow(name, (tab, k) => { state.inventory[tab][k].low = true; });
  });

  closeSheet(); save(); render();
  const bits = [];
  if (gone.length) bits.push(gone.length + ' onto the shopping list');
  if (low.length) bits.push(low.length + ' marked low');
  if (bits.length) toast(bits.join(', '));
}

/* ------------------------------------------- checking a list before it lands

   Everything he says out loud used to go straight into the kitchen, and a
   mis-heard word became a ticked box he then had to hunt down. So the reader
   shows its working now: one row per thing it understood, every one already
   ticked, and nothing is written until he says go.

   Tap a row to leave it out. Hold a row and it comes off the list altogether —
   the same gesture the fridge already uses, so there is only one to learn.
   Rows are marked dropped rather than spliced out, which keeps every data-pick
   index pointing at the same row for the life of the sheet. */
function openReviewList(text){
  const r = readItemList(text);
  /* Ticked by default only where the app is sure. A correction it guessed at,
     and a word it does not think is food at all, both arrive switched off — he
     has to agree to those, they never agree to themselves. */
  const rows = r.known.map(k => ({ name:k.name, tab:k.tab, aisle:k.aisle, isNew:false, on:true }))
    .concat(r.fresh.map(f   => ({ name:f.name, tab:f.tab, aisle:f.aisle, isNew:true,  on:true })))
    .concat(r.guesses.map(g => ({ name:g.name, tab:g.tab, aisle:g.aisle, isNew:g.isNew,
                                  on:false, heard:g.heard })))
    .concat(r.unsure.map(u  => ({ name:u, tab:tabForAisle(aisleOf(u)), aisle:aisleOf(u),
                                  isNew:true, on:false, unsure:true })));

  if (!rows.length){
    openSheet(`<h2>Nothing I could read</h2>
      <p class="hint">${r.unknown.length
        ? 'I could not work out: ' + esc(r.unknown.slice(0, 12).join(', ')) + '.'
        : 'Try naming the things one by one, with a comma between them.'}</p>
      <button class="btn" data-act="close-sheet">Done</button>`);
    return;
  }

  rows.forEach((row, i) => { row.i = i; });
  view.review = { rows, unknown:r.unknown, editing:null };
  renderReviewSheet();
}

/* Rebuilt whole only when a dropped row comes back. Every other change edits
   the rows in place, because rebuilding scrolls him back to the top. */
function renderReviewSheet(){
  const r = view.review;
  if (!r) return;
  const rows = r.rows.filter(x => !x.dropped);

  /* A row in the middle of being corrected is a field, not a button. The
     pencil is a real 44 px target of its own, so tapping it never reads as a
     tap on the row, and the hold gesture skips it for the same reason. */
  const line = row => row.i === r.editing
    ? `<div class="item editing">
        <input type="text" data-role="edit-name" value="${esc(row.name)}"
               enterkeyhint="done" autocomplete="off" spellcheck="false">
        <button class="more" data-act="edit-save" aria-label="Save">${svg('i-check','icon-sm')}</button>
        <button class="more" data-act="edit-cancel" aria-label="Cancel">${svg('i-x','icon-sm')}</button>
      </div>`
    : `<button class="item ${row.on ? 'on' : ''}" data-pick="${row.i}">
        <span class="box"></span>
        <span class="name">${esc(row.name)}${row.heard
          ? `<small class="heard">you said &ldquo;${esc(row.heard)}&rdquo;</small>` : ''}</span>
        ${row.isNew && !row.unsure && !row.heard ? '<span class="newtag">NEW</span>' : ''}
        <span class="more" data-edit="${row.i}" role="presentation">${svg('i-pencil','icon-sm')}</span>
      </button>`;
  const guessed = rows.filter(x => x.heard).map(line).join('');
  const unsure  = rows.filter(x => x.unsure).map(line).join('');
  const plain   = rows.filter(x => !x.heard && !x.unsure);
  const fresh   = plain.filter(x => x.isNew).map(line).join('');
  const known   = plain.filter(x => !x.isNew).map(line).join('');
  const n = rows.filter(x => x.on).length;

  openSheet(`<h2>Is this right?</h2>
    <p class="hint">Tap anything you have not really got. Tap the <b>pencil</b> to fix a
       word it got wrong. <b>Hold</b> a row to take it off the list. Nothing is saved
       until you tap the button.</p>
    ${fresh ? `<div class="eyebrow">New to your kitchen</div>
      <div class="picklist">${fresh}</div>` : ''}
    ${known ? `<div class="eyebrow">Already on your shelves</div>
      <div class="picklist">${known}</div>` : ''}
    ${guessed ? `<div class="eyebrow">Did you mean these?</div>
      <div class="picklist">${guessed}</div>
      <p class="hint">The microphone heard something close to a food. Tap to take it.</p>` : ''}
    ${unsure ? `<div class="eyebrow">I don&rsquo;t think this is food</div>
      <div class="picklist">${unsure}</div>
      <p class="hint">Left off unless you tap it. Tap to add it anyway.</p>` : ''}
    ${r.unknown.length ? `<p class="hint">I could not work out
      <b>${esc(r.unknown.slice(0, 10).join(', '))}</b>, so ${r.unknown.length === 1 ? 'it is' : 'they are'}
      not on the list.</p>` : ''}
    <button class="btn" data-act="review-apply"${n ? '' : ' disabled'}>${svg('i-check')}
      <span data-role="review-n">${n ? 'Tick these ' + n : 'Nothing left to tick'}</span></button>
    <button class="btn ghost" data-act="close-sheet">Cancel</button>`);
}

function reviewRow(i){
  return view.review ? view.review.rows[Number(i)] : null;
}

/* The sheet is edited in place rather than rebuilt. Twenty-odd rows scroll, and
   re-rendering would throw him back to the top on every single tap. */
function refreshReviewCount(){
  const label = document.querySelector('[data-role=review-n]');
  const btn = document.querySelector('[data-act=review-apply]');
  if (!label || !view.review) return;
  const n = view.review.rows.filter(x => x.on && !x.dropped).length;
  label.textContent = n ? 'Tick these ' + n : 'Nothing left to tick';
  if (btn) btn.disabled = !n;
}

function toggleReviewRow(i){
  const row = reviewRow(i);
  if (!row || row.dropped) return;
  row.on = !row.on;
  const el = document.querySelector('#sheet [data-pick="' + i + '"]');
  if (el) el.classList.toggle('on', row.on);
  refreshReviewCount();
}

function dropReviewRow(i){
  const row = reviewRow(i);
  if (!row || row.dropped) return;
  row.dropped = true;
  row.on = false;
  const el = document.querySelector('#sheet [data-pick="' + i + '"]');
  if (el) el.remove();
  refreshReviewCount();
  toast('Took ' + row.name + ' off the list', { label:'Undo', fn: () => {
    row.dropped = false; row.on = true; renderReviewSheet();
  }});
}

/* Correcting a row by hand. Whatever he types goes back through the same
   reader the microphone's output does, so typing "cummin" still lands on cumin
   and typing a real shelf name turns the row from a new ingredient into a tick
   against one he already owns. If the reader makes nothing of it, his words
   stand as they are — he is allowed to know something the app doesn't. */
function openEditRow(i){
  const row = reviewRow(i);
  if (!row || row.dropped || !view.review) return;
  view.review.editing = Number(i);
  renderReviewSheet();
  const box = document.querySelector('[data-role=edit-name]');
  if (box){ box.focus(); box.select(); }
}

function cancelEditRow(){
  if (!view.review) return;
  view.review.editing = null;
  renderReviewSheet();
}

function saveEditRow(){
  const r = view.review;
  if (!r || r.editing === null || r.editing === undefined) return;
  const box = document.querySelector('[data-role=edit-name]');
  const typed = box ? box.value.trim() : '';
  const row = r.rows[r.editing];
  if (!typed || !row){ cancelEditRow(); return; }

  const read = readItemList(typed);
  const hit = read.known[0] || read.fresh[0] || read.guesses[0] || null;
  if (hit){
    row.name  = hit.name;
    row.tab   = hit.tab;
    row.aisle = hit.aisle;
    row.isNew = !read.known.length;
  } else {
    row.name  = norm(typed);
    row.aisle = aisleOf(row.name);
    row.tab   = tabForAisle(row.aisle);
    row.isNew = true;
  }
  /* It was a guess or a doubt until he typed it out himself. Now it is a
     decision, so it stops being flagged and comes on by default. */
  delete row.heard;
  delete row.unsure;
  row.on = true;
  r.editing = null;
  renderReviewSheet();
}

function applyReview(){
  const r = view.review;
  if (!r) return;
  const picked = r.rows.filter(x => x.on && !x.dropped);
  if (!picked.length){ toast('Nothing selected'); return; }
  let added = 0;
  picked.forEach(x => {
    if (x.isNew && !state.custom[x.tab].some(o => norm(o.name) === x.name)){
      state.custom[x.tab].push({ name:x.name, aisle:x.aisle, staple:false });
      added++;
    }
    tickHave(x.tab, x.name);
  });
  view.review = null;
  closeSheet(); save(); render();
  toast(picked.length + ' ticked' + (added ? ', ' + added + ' added as new' : ''));
}

function openPasteList(){
  openSheet(`<h2>Say what you&rsquo;ve got</h2>
    <p class="hint">Tap the box, then the <b>microphone</b> on your keyboard, and just say
       your kitchen out loud. Quantities and the word &ldquo;and&rdquo; are fine &mdash; it
       sorts them out, and it knows brand names too.</p>
    <p class="hint">If two things run into each other, say <b>&ldquo;comma&rdquo;</b> or
       <b>&ldquo;next&rdquo;</b> between them. You get to check the whole list before
       anything is saved.</p>
    <textarea data-role="listbox" rows="7" placeholder="I've got eggs, some milk, harissa,
chicken thighs, a bunch of spring onions and prawns"></textarea>
    <button class="btn" data-act="apply-list">Read it back to me</button>
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
function closeSheet(){
  view.review = null;
  $('#sheet').hidden = true;
  $('#sheet').innerHTML = '';
}

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

/* render() replaces the row, so the click that follows a hold may land nowhere
   useful — or on whatever takes its place. Eat it either way. */
function heldDown(){
  swallowClick = true;
  setTimeout(() => { swallowClick = false; }, 700);
}

document.addEventListener('pointerdown', e => {
  /* The swallow covers the click this same gesture is about to fire, and
     nothing beyond it. Left on a timer it ate the next real tap, which on the
     review sheet is usually the Tick button. */
  swallowClick = false;
  /* One gesture, two lists: on the fridge it means always-in-stock, on the
     review sheet it takes the row off before anything is written. */
  const pick = e.target.closest('#sheet [data-pick]');
  if (pick && !e.target.closest('[data-edit]')){
    hold = { x:e.clientX, y:e.clientY, timer:0 };
    hold.timer = setTimeout(() => {
      hold = null; heldDown();
      dropReviewRow(pick.dataset.pick);
    }, 600);
    return;
  }
  const row = e.target.closest('#screen [data-item]');
  if (!row || e.target.closest('[data-more]')) return;
  const name = row.dataset.item;
  hold = { name, x:e.clientX, y:e.clientY, timer:0 };
  hold.timer = setTimeout(() => {
    hold = null; heldDown();
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
  if (e.target.closest('#screen [data-item], #sheet [data-pick]')) e.preventDefault();
});

/* ------------------------------------------------------------- events */
document.addEventListener('click', e => {
  if (swallowClick){ swallowClick = false; e.preventDefault(); e.stopPropagation(); return; }
  const t = e.target.closest('[data-go],[data-act],[data-open],[data-f],[data-tab],[data-sect],[data-useby],[data-item],[data-more],[data-shop],[data-rate],[data-buy],[data-timer],[data-theme],[data-i],[data-pick],[data-edit],[data-pickused]');
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
  if (t.dataset.tab){ view.tab = t.dataset.tab; view.section = 'all'; view.search = ''; render(); return; }
  if (t.dataset.sect){ view.section = t.dataset.sect; render(); return; }
  if (t.dataset.theme){ state.prefs.theme = t.dataset.theme; setTheme(); save(); render(); return; }

  /* inventory */
  if (t.dataset.useby){ setUseBy(t.dataset.useby); return; }
  if (t.dataset.pickused !== undefined){
    t.classList.toggle('on');
    t.closest('[data-usedup]').classList.remove('lowpick');
    return;
  }
  if (t.dataset.edit !== undefined){ e.stopPropagation(); openEditRow(t.dataset.edit); return; }
  if (t.dataset.pick !== undefined){ toggleReviewRow(t.dataset.pick); return; }
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
      <button class="btn ${cur.useBy?'':'ghost'}" data-act="use-by" data-name="${esc(name)}">
        ${cur.useBy ? 'Use by ' + esc(cur.useBy) + ' — change it' : 'Set a use-by date'}</button>
      <p class="hint">Recipes that use it climb to the top of Cook as the day gets closer.</p>
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
    case 'scan-barcode': openCamera('scan'); break;
    case 'take-photo': openCamera('photo'); break;
    case 'cam-close': closeCamera(); break;
    case 'cam-scan': switchCameraMode('scan'); break;
    case 'cam-photo': switchCameraMode('photo'); break;
    case 'cam-shoot': shootPhoto(); break;
    case 'barcode-no': resumeScanning(); break;
    case 'barcode-yes': {
      const r = applyItemList(t.dataset.name);
      if (CAM.hit) logScan(CAM.hit, t.dataset.name);
      save();
      resumeScanning();
      toast(t.dataset.name + (r.added.length ? ' added' : ' ticked'));
      break;
    }
    case 'apply-list': {
      const box = document.querySelector('[data-role=listbox]');
      openReviewList(box ? box.value : '');
      break;
    }
    case 'review-apply': applyReview(); break;
    case 'edit-save': saveEditRow(); break;
    case 'edit-cancel': cancelEditRow(); break;

    case 'clear-search': view.search = ''; render(); break;
    case 'clear-rsearch': view.recipeSearch = ''; render(); break;
    case 'only-ready': view.onlyReady = !view.onlyReady; render(); break;
    case 'my-recipe': openMyRecipe(null); break;
    case 'mr-save': saveMyRecipe(); break;
    case 'edit-mine': openMyRecipe(view.recipeId); break;
    case 'delete-mine': {
      const r = findRecipe(view.recipeId);
      openSheet(`<h2>Delete ${esc(r ? r.title : 'this recipe')}?</h2>
        <p class="hint">It only exists on this phone, so this cannot be undone.</p>
        <button class="btn" data-act="delete-mine-yes">Delete it</button>
        <button class="btn ghost" data-act="close-sheet">Keep it</button>`);
      break;
    }
    case 'delete-mine-yes': deleteMyRecipe(view.recipeId); break;
    case 'use-by': openUseBy(view.tab, t.dataset.name); break;
    case 'useby-save': {
      const box = document.querySelector('[data-role=useby-date]');
      setUseBy(box && box.value ? box.value : '');
      break;
    }
    case 'useby-clear': setUseBy(''); break;
    /* A whole spoken fridge, dropped in the search box. Same reader the paste
       sheet uses, so "coriandre" and "2 boxes of eggs" land the same way. */
    case 'tick-spoken': {
      const said = view.search;
      view.search = ''; render();
      openReviewList(said);
      break;
    }
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

    case 'used-up': openUsedUp(); break;
    case 'usedup-low': {
      const row = t.closest('[data-usedup]');
      if (row) row.classList.toggle('lowpick');
      break;
    }
    case 'usedup-done': applyUsedUp(); break;

    case 'cookalong': {
      view.cookAlong = { recipeId: view.recipeId, i: 0 };
      requestWakeLock(); render(); break;
    }
    case 'ca-next': view.cookAlong.i++; render(); break;
    case 'ca-repeat': speakCurrent(); break;
    case 'ca-close':
      try{ speechSynthesis.cancel(); }catch(e){}
      releaseWakeLock(); view.cookAlong = null; render(); break;
    case 'ca-done': {
      /* The one moment he can actually see what is left in the pan and the
         packet. Asking here is the difference between a fridge that stays true
         and one that quietly fills up with food he ate a week ago. */
      try{ speechSynthesis.cancel(); }catch(e){}
      releaseWakeLock();
      const done = findRecipe(view.cookAlong && view.cookAlong.recipeId);
      view.cookAlong = null;
      if (done) state.cooked[done.id] = isoPlus(0);
      save(); render();
      openUsedUp();
      break;
    }

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

    case 'send-kitchen': {
      const have = haveList();
      if (!have.length){ toast('Nothing is ticked yet'); break; }
      /* Everything ticked, as a link the app already knows how to read on the
         way back in — see applyLinkList. */
      const url = location.origin + location.pathname
                + '#have=' + encodeURIComponent(have.join(', '));
      sendToClaude(url, 'My kitchen as a link');
      break;
    }

    case 'check-update': checkForUpdate(); break;

    /* Long-pressing a password field to paste is a fight on Android, and an
       API key is 108 characters nobody is going to type. One button instead. */
    case 'paste-into': pasteInto(t.dataset.target); break;

    case 'sync-now': syncNow(); break;

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
          try{
            state = mergeStates(state, JSON.parse(txt));
            rebase(); save(); setTheme(); render();
            toast('Restored — nothing was removed');
          }
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

document.addEventListener('input', e => {
  if (e.target.dataset.role === 'search'){
    view.search = e.target.value;
    const pos = e.target.selectionStart;
    render();
    const box = document.querySelector('[data-role=search]');
    if (box){ box.focus(); box.setSelectionRange(pos, pos); }
  }
  if (e.target.dataset.role === 'rsearch'){
    view.recipeSearch = e.target.value;
    const pos = e.target.selectionStart;
    render();
    const box = document.querySelector('[data-role=rsearch]');
    if (box){ box.focus(); box.setSelectionRange(pos, pos); }
  }
  /* Notes are typed a word at a time between stirs, so they save as he goes
     rather than behind a button he would forget to press. */
  if (e.target.dataset.role === 'note'){
    const id = e.target.dataset.recipe;
    if (id){ state.notes[id] = e.target.value; save(); }
  }
  if (e.target.dataset.role === 'apikey'){ state.prefs.apiKey = e.target.value.trim(); save(); }
  if (e.target.dataset.role === 'syncurl'){ state.prefs.syncUrl = e.target.value.trim(); save(); }
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
rebase();
setTheme();
readBuild();
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
    if (view.camera && $('#sheet').hidden){ closeCamera(); return; }
    if (!$('#sheet').hidden) closeSheet();
    else if (view.cookAlong){ view.cookAlong = null; releaseWakeLock(); render(); }
  }
});

/* The one door into the closure, so the check-phone harness can test the
   name matching against real recipe data instead of me eyeballing it.
   Read-only helpers; nothing here changes state. */
window.FrigoTest = { sameItem, itemParts, aisleOf, inventoryHas, applyItemList, applyLinkList,
                     openCamera, closeCamera, askAboutBarcode, matchLabel, grabFrame, CAM,
                     readItemList, openReviewList, applyReview, dropReviewRow, toggleReviewRow,
                     analyse, findSubstitute, findMakeIt, matchRecipes,
                     kitchenFile, promptCookThis, promptWhatToCook, promptStanding, view, state };

})();
