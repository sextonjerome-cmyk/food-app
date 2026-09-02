/* ==========================================================================
   Frigo — everything in the app that touches the network

   Three calls live here and nowhere else: invent a recipe, look up a barcode,
   and read a photo of the shelf. All three are things Jerome taps deliberately;
   the rest of the app never opens a socket.

   Raw fetch rather than the Anthropic SDK: this project has a zero-dependency,
   no-build-step rule, so there is nothing to npm install and nothing to bundle.
   The API key is Jerome's own, kept in localStorage, and only sent when he taps
   the button.
   ========================================================================== */
window.FrigoAI = (function () {
'use strict';

const ENDPOINT = 'https://api.anthropic.com/v1/messages';
const MODEL    = 'claude-opus-5';

/* Open Food Facts: an open database, no key, no account, no tracking. Coverage
   is good on branded jars and cans and non-existent on anything loose, which is
   exactly why the camera also has a photo mode. */
const BARCODE_API = 'https://world.openfoodfacts.org/api/v2/product/';

/* Mirrors .claude/rules/recipe-schema.md, trimmed to what the model must
   invent. Structured outputs guarantee this parses — no repair code needed. */
const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['title','cuisine','appliances','minutes','activeMinutes','difficulty',
             'baseServings','capacityQt','spiceLevel','ingredients','misePlace',
             'steps','beginnerTip','makeItBetter'],
  properties: {
    title:         { type: 'string' },
    subtitle:      { type: 'string' },
    cuisine:       { type: 'string', enum: ['french','american','middle-eastern','turkish','asian','other'] },
    appliances:    { type: 'array', items: { type: 'string' } },
    minutes:       { type: 'integer' },
    activeMinutes: { type: 'integer' },
    difficulty:    { type: 'string', enum: ['easy','medium'] },
    baseServings:  { type: 'integer' },
    capacityQt:    { type: 'number' },
    spiceLevel:    { type: 'integer' },
    ingredients: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['item','qty','unit','aisle','scale'],
        properties: {
          item:  { type: 'string' },
          qty:   { type: ['number','null'] },
          unit:  { type: ['string','null'] },
          aisle: { type: 'string', enum: ['produce','bakery','meat','dairy','dry','canned','frozen','spices','other'] },
          scale: { type: 'boolean' },
          staple:{ type: 'boolean' },
          note:  { type: 'string' },
          sub:   { type: 'string' }
        }
      }
    },
    misePlace: { type: 'array', items: { type: 'string' } },
    steps: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['text'],
        properties: {
          text:    { type: 'string' },
          minutes: { type: ['integer','null'] }
        }
      }
    },
    beginnerTip:  { type: 'string' },
    makeItBetter: { type: 'string' }
  }
};

function buildPrompt(o) {
  const gear = o.appliances
    .map(a => a.qt ? `${a.name} (${a.qt} quart)` : a.name)
    .join(', ');
  const want = [];
  if (o.filters.appliance !== 'any') {
    const a = o.appliances.find(x => x.id === o.filters.appliance);
    if (a) want.push(`Use the ${a.name}${a.qt ? ` — only ${a.qt} quarts, so keep the volume down` : ''}.`);
  }
  if (o.filters.cuisine !== 'any') want.push(`Make it ${o.filters.cuisine.replace('-', ' ')}.`);
  if (o.filters.time) want.push(`Hands-on time must be ${o.filters.time} minutes or less.`);

  return `Invent one dinner recipe I can cook right now.

WHAT I ACTUALLY HAVE IN MY KITCHEN:
${o.ingredients.join(', ') || '(almost nothing — say so and keep it very simple)'}

MY GEAR: ${gear}

${want.join('\n')}
Serves ${o.servings}. My spice tolerance is ${o.spice} out of 5 — write it at that level.

RULES:
- Use only what I have, plus at most TWO things I would have to buy. Flag those
  clearly in the ingredient list with a note saying I need to buy them.
- I am a beginner cook who wants to learn, and I want food that is genuinely
  good — not bland. Lean on real technique: brown things properly, bloom spices
  in fat, deglaze, finish with acid.
- The steps get read aloud by a phone. One action per step. Write numbers as
  spoken words ("about ten minutes", not "10-12 min"). No abbreviations, no
  emoji, no URLs, no markdown.
- EVERY ingredient on the list must be named out loud in a step or in misePlace,
  by its own name. Not "add the sauce", not "stir in the seasonings" — say "stir
  in the dijon mustard and the soy sauce". If an ingredient is in the list and
  never named in the method, I stand there holding a jar not knowing what to do
  with it. Check the list against the steps before you answer.
- Write spoon measures in full: "one tablespoon", "two teaspoons". Never tbsp
  or tsp, they are one letter apart and I will use the wrong one.
- misePlace is what I prep before the heat goes on — two to four short items.
- beginnerTip: one technique explained plainly, ideally the thing most people
  get wrong in this dish.
- makeItBetter: the specific move that lifts it above average.
- Set capacityQt to how many quarts the finished dish actually occupies. Be
  honest — a two-quart air fryer really holds about 1.2 quarts of food.
- Mark salt, pepper, oil, butter, flour and sugar with "staple": true.
- Set "scale": false on anything that should not multiply with servings, like a
  bay leaf or the water in a pan.`;
}

/* ------------------------------------------------------------- barcodes */

/* One scanned number in, a product name out, or null when the database has
   never heard of it. Deliberately quiet about failure: a miss is the normal
   case, not an error worth a dialog. */
async function lookupBarcode(code) {
  const clean = String(code).replace(/[^0-9]/g, '');
  if (clean.length < 6) return null;

  let res;
  try {
    res = await fetch(BARCODE_API + encodeURIComponent(clean)
                      + '.json?fields=product_name,brands,quantity');
  } catch (e) {
    throw new Error('No connection — a barcode needs the internet. Say it out loud instead.');
  }
  if (!res.ok) return null;

  let data;
  try { data = await res.json(); } catch (e) { return null; }
  if (!data || data.status !== 1 || !data.product) return null;

  const p = data.product;
  const name = String(p.product_name || '').trim();
  if (!name) return null;
  return {
    code:  clean,
    name:  name,
    brand: String(p.brands || '').split(',')[0].trim(),
    size:  String(p.quantity || '').trim()
  };
}

/* ---------------------------------------------------------------- photos */

const PHOTO_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['items'],
  properties: {
    items: { type: 'array', items: { type: 'string' } }
  }
};

const PHOTO_PROMPT = `Name every food ingredient you can actually see in this photo.

RULES:
- One entry per ingredient, using the ordinary name a cook would say out loud:
  "chicken thighs", "dijon mustard", "spring onions".
- Read the labels on jars, packets and tins. If a label names the food, use the
  food, not the brand — a bottle of Heinz is "ketchup".
- Only what is actually visible. Do not guess at what might be behind something,
  and do not pad the list with things a kitchen usually has.
- Skip anything that is not food: plates, pans, cloths, the shelf itself.
- If you cannot tell what something is, leave it out rather than guessing.
- No quantities, no adjectives, no sentences. Just the names.`;

/* A phone photo is far bigger than this needs to be, and every pixel is billed,
   so the caller shrinks it first. Costs roughly a cent a shot. */
async function readPhoto(o) {
  if (!o.apiKey) throw new Error('No API key set. Add one in Settings.');

  const comma = String(o.dataUrl || '').indexOf(',');
  if (comma < 0) throw new Error('That photo did not come out. Try again.');
  const b64 = o.dataUrl.slice(comma + 1);

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': o.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1500,
      output_config: {
        effort: 'low',
        format: { type: 'json_schema', schema: PHOTO_SCHEMA }
      },
      messages: [{
        role: 'user',
        content: [
          { type: 'image',
            source: { type: 'base64', media_type: 'image/jpeg', data: b64 } },
          { type: 'text', text: PHOTO_PROMPT }
        ]
      }]
    })
  });

  if (!res.ok) {
    let msg = 'Claude returned ' + res.status + '.';
    try {
      const body = await res.json();
      if (body && body.error && body.error.message) msg = body.error.message;
    } catch (e) {}
    if (res.status === 401) msg = 'That API key was rejected. Check it in Settings.';
    if (res.status === 429) msg = 'Too many requests just now. Try again in a minute.';
    throw new Error(msg);
  }

  const data = await res.json();
  if (data.stop_reason === 'refusal') throw new Error('Claude would not read that one.');

  const text = (data.content || []).find(b => b.type === 'text');
  if (!text) throw new Error('Claude sent nothing back.');

  const out = JSON.parse(text.text);
  return (out.items || []).map(x => String(x).trim()).filter(Boolean);
}

async function invent(o) {
  if (!o.apiKey) throw new Error('No API key set. Add one in Settings.');

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': o.apiKey,
      'anthropic-version': '2023-06-01',
      /* Required for calls made straight from a browser. */
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      output_config: {
        effort: 'low',
        format: { type: 'json_schema', schema: SCHEMA }
      },
      messages: [{ role: 'user', content: buildPrompt(o) }]
    })
  });

  if (!res.ok) {
    let msg = 'Claude returned ' + res.status + '.';
    try {
      const body = await res.json();
      if (body && body.error && body.error.message) msg = body.error.message;
    } catch (e) {}
    if (res.status === 401) msg = 'That API key was rejected. Check it in Settings.';
    if (res.status === 429) msg = 'Too many requests just now. Try again in a minute.';
    throw new Error(msg);
  }

  const data = await res.json();

  if (data.stop_reason === 'refusal') throw new Error('Claude declined that one. Try different filters.');
  if (data.stop_reason === 'max_tokens') throw new Error('The recipe got cut off. Try again.');

  const text = (data.content || []).find(b => b.type === 'text');
  if (!text) throw new Error('Claude sent nothing back.');

  const r = JSON.parse(text.text);

  r.id     = 'ai-' + Date.now().toString(36);
  r.photo  = null;                       // never fake a photo of an invented dish
  r.tags   = ['invented'];
  r.source = { name: 'Invented by Claude from your kitchen', url: '' };
  r.scalable = [1, 8];
  return r;
}

return { invent, lookupBarcode, readPhoto };
})();
