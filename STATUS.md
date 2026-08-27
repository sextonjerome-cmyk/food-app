# Frigo — where this stands

**Last worked: 2026-08-10.** Read `CLAUDE.md` first, then `.claude/rules/`.

## What Frigo is

Jerome's food app. Check off what's actually in the fridge / freezer / pantry /
spices; it finds something good to cook right now, or tells him the one thing to
buy. Offline web app installed on his Samsung home screen. Nothing leaves the
phone except the optional "invent me something" call.

## Decisions already made — don't re-litigate these

| Decision | Answer |
|---|---|
| Look | **Dark Kitchen** — Jerome picked #4 from a ten-way style picker on 2026-08-09. Tokens are in `.claude/rules/ui-style.md` and are binding. |
| Platform | Web app on **Samsung**, added to home screen. Not iOS, not an app store. |
| Recipes | **Both** — a researched built-in collection *plus* an "Ask AI" button. |
| Recipe quality | Researched and vetted, never invented. Jerome was explicit: no SEO-farm filler with fake 4.8 stars. The bar is in `.claude/rules/recipe-vetting.md`. |
| Servings | Selectable 1–8, quantities scale. |
| Ratings | 1–5 stars; high ones resurface. |
| Name | Working name **Frigo**. Renameable. |

## Built and verified

Everything below was driven end-to-end in headless Chrome at 412×915 with a
probe recipe, console clean, no sideways scroll, state surviving reload:

- `index.html` `styles.css` `app.js` — all five screens: Cook (filters →
  ranked photo cards), Fridge (4 tabs, 44+ items each, search, add-your-own,
  running-low flag), Shopping list (grouped by store aisle), Plan ahead,
  Settings / My Kitchen (appliances are editable, not hard-coded).
- Recipe view: scaled ingredients with have/missing, mise en place, numbered
  steps, tap-to-start timers, star rating, "plan this", "what did I use up?".
- Cook-along: one step at a time, read aloud, big Next, screen stays awake.
- `ai.js` — the Claude API call (`claude-opus-5`, structured outputs so the
  recipe always parses). Raw fetch, no SDK — zero-dependency rule.
- `manifest.json`, `sw.js`, `icons/` — installs and runs offline.
- `style-picker.html` — the ten design directions, kept for reference.

## The collection — 16 recipes, researched and in

`recipes.js` is no longer empty. Every entry was researched against
`.claude/rules/recipe-vetting.md` and carries a `vetting` line naming the actual
evidence, plus all five extras (mise en place, beginner tip, make it better,
substitutions, attribution).

| Recipe | Appliance | Source behind it |
|---|---|---|
| Poulet à la Moutarde | stove | Jacques Pépin (NYT) |
| Shakshuka | stove | America's Test Kitchen |
| Menemen | stove | Turkey's For Life + Foolproof Living |
| Mapo Tofu | stove | Chinese Cooking Demystified + Kenji |
| Smash Burger | stove | Kenji López-Alt, Serious Eats |
| Garlic Lemon Butter Shrimp | stove | America's Test Kitchen |
| Crockpot Beef Stew | crockpot | Budget Bytes |
| Red Lentil Soup with Lemon | instantpot | Melissa Clark (NYT) |
| Air Fryer Salmon | airfryer | America's Test Kitchen |
| Crispy Air Fryer Chickpeas | airfryer | ATK + Skinnytaste |
| Air Fryer Chicken Thighs | airfryer | ATK method + Budget Bytes |
| Za'atar Roast Chicken | oven | Ottolenghi & Tamimi, via The Splendid Table |
| Pasta all'Amatriciana | stove | Saveur + Cook's Country, technique cross-checked |
| Gratin Dauphinois | oven | Jacques Pépin, Essential Pépin (KQED) |
| Slow Cooker Tikka Masala | crockpot | Budget Bytes (their own retested version) |
| Takikomi Gohan | rice cooker | Namiko Chen, Just One Cookbook |

**The five added 2026-08-10 were chosen by what the collection didn't have**, not
by what sounded nice. Before them: nothing used the oven, nothing used the rice
cooker at all, there was no pasta, only one French dish for a French cook, and
one lonely crockpot recipe. Every appliance he owns is now used by something.

- **Za'atar Roast Chicken** — one tray, chicken on top, everything else under it.
- **Pasta all'Amatriciana** — the first pasta in the app. Cheese goes in off the
  heat, which is the whole recipe.
- **Gratin Dauphinois** — Pépin's, no cheese in it, and **every ingredient is
  already on his shelf**. This is the one he can cook tonight without shopping.
- **Slow Cooker Tikka Masala** — the second crockpot dish and the first that
  isn't beef.
- **Takikomi Gohan** — turns the 1.5 qt rice cooker into a one-pot dinner. The
  app warns at four servings because that cooker genuinely won't hold it.

**A recipe was rejected out loud:** French onion soup. Cook's Illustrated's
method is three hours in the oven plus forty minutes of stovetop deglazing and
wants a 7-quart Dutch oven. It fails the 45-minutes-active rule and it is not a
beginner's first oven dish. Gratin Dauphinois took the French slot instead.

**Reddit is blocked to the research tool now**, which matters because the vetting
rule leans on it for "real humans discussing it". Substance came from forums,
magazine test kitchens and comment sections instead. One recipe — the Ottolenghi
chicken — clears the bar on two legs rather than three, and its `vetting` line
says so rather than dressing it up.

**One slot was deliberately left empty.** A second crockpot recipe (Moroccan
chickpea stew) was researched and dropped — every result was blog-tier with no
tested kitchen or named cook behind it. The rule says leave it out, so it is out.

**The 2 qt air fryer is honoured, not pretended about.** All three air-fryer
recipes are written as two-serving dishes with `scalable: [1, 2]`, because two
salmon fillets or two bone-in thighs is genuinely what that basket holds.
At 4 servings the app now says *"Tight fit in your 2 qt air fryer at 4 servings —
cook it in two batches"* — verified on screen.

## The Cook screen answers the real question — 2026-08-10

Jerome, once it was on his phone: *"I need the recipes with the stuff I have.
So I don't want recipes to show up unless... we separate the two."*

It used to be one ranked list, so the things he could actually cook sat among
fifteen he couldn't. Now it splits into three headed groups:

- **Cook this now** — nothing missing at all.
- **One thing short** — buy the single missing item and it's on. This is the
  app's whole selling line, and it now has a place on the page.
- **Needs a shop** — everything else.

Filters still apply across all three. Nothing is hidden; the count in each
heading matches the cards under it.

**An empty kitchen used to look broken** — everything landed in "Needs a shop"
and it read as though the app didn't work. It now says why, and gives a button
straight to the Fridge screen. The check for "has he told us anything yet"
**ignores staples**, because seven of them are ticked automatically on first
run and a raw count is never zero.

### The screen leads with food now

The filters were eating **287 px** off the top, so the first recipe card started
**535 px** down a 915 px screen — past halfway, on the one screen whose entire
job is showing him something to cook. Jerome's words were *"the closest thing on
top."*

They fold away. In their place is one 50 px bar: a button that names whatever
filters are on ("All recipes", or "French · 30 min"), and the servings stepper,
which is worth seeing at a glance. Tap it and the full set unfolds exactly as
before. **First card now starts at 244 px** — photo, title and "You have
everything" all above the fold.

Open/closed lives in `view`, not `state`. It is ephemeral UI, not his data, and
it should reset to closed every time he opens the app.

## Filling the kitchen — three ways in

1. **Tap a row.** Each tab holds 45-odd items; tapping ticks it.
2. **Type in the search box.** Finds an item, or offers to add what you typed.
   If the word is a synonym of something already listed it offers to tick *that*
   instead of making a duplicate, and names the tab it lives on.
3. **"Say or paste my whole kitchen"** — the fast one. Under the search box on
   the Fridge screen. Tap it, tap the **keyboard's microphone**, say the kitchen
   out loud. One spoken sentence ticked seven items in testing. No link, no
   server, no API key, works offline.

A `#have=eggs,harissa,prawns` link also works (Claude can generate one; tapping
it ticks the lot) — kept because it costs nothing, but the microphone is the
route to show people.

### Fixing a name that's spelt wrong

Two routes, because the list lives in two places.

- **On the phone** — tap the ⊕ on any row, then **Fix the spelling**. The ticked
  state, the running-low flag and anything already on the shopping list all
  follow the new name. Renaming a built-in row hides the original and adds the
  corrected one beside it, so it looks like an edit in place. Renaming onto a
  name that already exists merges the two instead of making a duplicate.
- **On the computer** — open **`items.html`**. It shows **two** lists, and the
  difference matters:
  - **Your own items** — what he added inside the app. These live in
    `localStorage`, so the page only sees them when it's opened at the *same
    origin* he uses the app at. Editing them saves straight back to the app. A
    button moves them into the built-in list for good.
  - **The built-in list** — all 157 rows from `ingredients.js`, each with its
    name, aisle and staple toggle. It refuses to hand you a file with a
    duplicate or an empty name. **Download ingredients.js**, drop it in the
    folder; a round trip through it was verified byte-identical.

  **This caught him out once.** He opened the page expecting the items he'd added
  and saw only the shipped list. If the page finds no Frigo data at that address
  it now says so, names the address, and points out that phone data stays on the
  phone.

The list itself moved out of `app.js` into **`ingredients.js`**, one item per
line — that alone makes it editable in VS Code without hunting through code.

### Running out, and never running out — added 2026-08-10

Two things Jerome asked for on the Fridge screen.

- **Untick something and it offers the shopping list.** Tapping a ticked row off
  raises a toast that says *"Out of eggs"* with an **Add to list** button beside
  it. Tap it and the item lands on the list under its proper aisle. It stays
  quiet if the item is already on the list, and it's a toast rather than a sheet
  on purpose — he clears out five things at once and a dialog each time would be
  unusable. Deleting an item outright is still ⊕ → *Remove from my list*.
- **Always in stock.** For salt, oil, the things he never actually runs out of.
  **Hold a row for half a second** and it turns green with an `ALWAYS` badge; hold
  again to undo. The same switch is the first entry in the ⊕ menu, because a
  gesture nobody can see is not a feature on its own. Always-items stay ticked,
  a tap won't untick them (it offers to change the flag instead), they're left
  out of *"what did you finish?"*, and `usedup-done` can't clear them.

Stored as `always: true` alongside `have`/`low` in the same inventory entry, so
old saves merge forward untouched.

**Three things that had to be got right and were verified by finger:**
a 200 ms press still just ticks; dragging a scroll over a row changes nothing;
and the click that follows a completed hold is swallowed, or the hold would tick
the row on its way out.

### It understands his words

Names reduce to a head noun plus qualifying words, through a synonym table
covering the French and British names Jerome actually uses: coriandre/coriander →
cilantro, courgette, aubergine, prawns, double cream, mince, pul biber,
doubanjiang, garbanzo, spring onions/scallions.

**Deliberately narrow as well as wide** — "chicken stock" matches "chicken broth"
but **not** "beef stock"; "black pepper" never matches "red bell pepper".
31 cases including every false-positive guard are verified against real recipe
data via `window.FrigoTest`.

## Bugs found and fixed — the ones worth remembering

- **An always-on overlay swallowed every tap.** `.sheet{display:flex}` outranks
  the browser's `[hidden]{display:none}`, so the bottom sheet sat permanently at
  `inset:0, z-index:70` over the whole app. Two symptoms, one cause: nothing was
  tappable, and both themes looked washed out (that was its scrim).
  **It shipped because the phone check used synthetic `.click()`, which skips
  hit-testing entirely.** `check-phone` now requires real touch events.
- **Anything rendered after a long list is off the bottom of the screen.** Three
  separate affordances got lost this way (y≈2824 on a 915-tall screen). Put
  actions *above* the list.
- **`render()` swallowed exceptions**, leaving the previous screen on the glass —
  a typo read as "the app is unresponsive". Failures are shown now.
- **A tapped `#have=` link did nothing when the app was already open**, because
  changing only the hash is a same-document navigation. Handled on `hashchange`.
- **`sameItem`'s subset rule ate words.** "eggs milk butter garlic" matched plain
  *garlic* and swallowed the three words in front of it — nine spoken items came
  back as three. Window matching now requires equal significant-word weight.
- **`CUISINES` had no `other` entry**, so two recipes rendered as "FOOD" and
  couldn't be filtered to.
- **The shopping list guessed each item's aisle** from its name while every
  ingredient already declares a hand-checked one.
- **Opening a recipe left you a thousand pixels down it.** `render()` reset
  `#screen.scrollTop`, but the page scrolls on the *window* — so the reset was
  a no-op and tapping a card from far down the Cook list dropped you into the
  middle of the ingredients, past the photo. Now the window scrolls to the top
  when the screen changes, and only then: ticking a fridge item must not throw
  you back up. Invisible until photos arrived and there was something to miss.
- **The toast could only ever be half the screen wide.** `position:fixed` with
  `left:50%` leaves the box just the right-hand half to shrink into, so as soon
  as it carried a button beside the text, "Out of eggs" broke across two lines.
  Invisible while every toast was one short line. Both edges are pinned now and
  it centres by `margin-inline:auto`.
- **The README described the app in detail and never gave its address.** Jerome
  opened the repo page, read the feature list — Cook, Fridge, List, Plan — and
  thought that was the app. The two URLs differ by four characters. The live link
  is now the first line on the page.
- **A recipe contradicted itself out loud.** Amatriciana's ingredient list was
  changed from guanciale to pancetta (guanciale is not buyable in Charleston) but
  the mise en place and step one still said guanciale — so the shopping list said
  one thing and **cook-along literally read "cut the guanciale" aloud**. Renaming
  an ingredient means grepping the prose, not just the `ingredients` array.
- **Two recipes listed an ingredient the method never used.** Shakshuka had you
  buy crusty bread and never mentioned it again; Garlic Lemon Shrimp listed red
  pepper flakes and used them nowhere — in a dish sold on its kick. Both
  pre-existing, both found by a script that checks every non-staple ingredient is
  named somewhere in the mise or the steps. **Worth re-running after any recipe
  edit**; it is about fifteen lines of node.
- **`.btn.sm` was 40 px** — the Cook and Add-to-list buttons on the Plan screen.
  The 44 px audit had only ever measured the bottom nav, the filter chips and the
  ⊕, so a whole button class slipped through. The audit now sweeps every screen.
- **The app quoted the wrong price for an AI recipe** — twice, in the settings
  hint and in the sheet that opens when you tap Invent with no key. Both said
  "a fraction of a penny". Opus 5 is $5 in and $25 out per million tokens, so a
  recipe is nearer **five cents** — out by roughly twenty times, on a number
  Jerome was using to decide whether to pay at all. Both now say five cents, and
  both spell out that an API key is billed separately from a Claude subscription,
  because that is the thing he actually got wrong.
- **The Cook screen only ever showed eight cards** while the line above them
  said how many matched. With eleven recipes you barely noticed; at sixteen the
  header read "16 matches" over eight cards and half the collection could not be
  reached at all. The cap is gone — they're ranked best-first anyway, so what he
  can actually cook is still at the top.
- **Two ingredients could never match what was on his shelf.** A recipe asked for
  `salmon fillets` while the list says `salmon`, and another for `cayenne` while
  the list says `cayenne pepper` — near-misses the head-noun matcher won't bridge.
  Both were silently counted as missing. Found by ticking every single item on the
  master list and seeing what recipes still claimed to need.
- **The ⊕ on an inventory row was a 34 px target** and the 44 px audit never saw
  it, because the audit only measured `button`, `input` and `.tab` — the ⊕ is a
  `span`. It's 44 px now, and the row height is unchanged because the padding
  above it paid for the difference.
- **A cache-first service worker will hand you yesterday's file.** Two rounds of
  "the fix didn't work" were the worker serving the old `styles.css` and
  `items.html`. The phone check now unregisters the worker and drops every cache
  before it tests anything. `items.html` loads `ingredients.js` with a
  cache-busting query for the same reason.

## Verified 2026-08-09

Driven in headless Chrome at 412 × 915, device pixel ratio 3, with all 11
recipes loaded:

- Cook screen ranks and matches — 11 matches, missing-ingredient counts correct.
- Recipe screen renders scaled quantities, subs, mise en place, numbered steps
  with tap-to-start timers, beginner tip, make-it-better, rating, attribution.
- **No sideways scroll** — `scrollWidth` 412 = `clientWidth` 412 on every screen.
- **Both themes checked.** Dark is primary and right; light is warm, not clinical.
- **State survives reload** — ratings, shopping list and ticked inventory all came
  back.
- **Console clean**, zero errors, zero warnings.
- **Driven with real taps**, not synthetic clicks — filters, bottom nav, ticking
  an ingredient, opening a recipe, the servings stepper, star rating, cook-along,
  and the say-your-kitchen sheet, all confirmed by finger at real coordinates.
- **Every touch target measured ≥ 44 px.** Chips and bar buttons were 40, steppers
  38 — all raised.
- `sw.js` `CACHE_VERSION` is at **`frigo-v17`** (seventeen deploys). Bump it every time.

## Photos — all 16, last worked 2026-08-10

**Every recipe has a photo.** 720 × 540 WebP, 34–82 KB each, **788 KB for the
lot**. Credits are in `CREDITS.md` and on screen at the bottom of each recipe.
`sw.js` precaches all of them, so the Cook screen is complete offline.

**Fifteen are freely licensed. One is not, and that was Jerome's decision.**
Za'atar Roast Chicken uses Panning the Globe's own photo, credited and linked
but without a licence. He was told plainly that the repo is public, under his
name, and that this can draw a takedown; he chose the picture over the blank.
`CREDITS.md` records it and says exactly how to reverse it — delete the file,
set `photo: null`, the placeholder comes back and nothing breaks.

**Look wider than Wikimedia.** Fourteen came from Commons; one from Flickr via
**[Openverse](https://api.openverse.org)**, which aggregates Flickr, Commons,
Nappy and Rawpixel behind one API, filters by licence, and needs no key.
Commons alone came up dry twice for crispy chickpeas; Openverse found it first
try. **Start there next time.**

**When free sources genuinely fail**, the trick that worked was going to the
blogs that cooked the exact recipe and reading their `og:image` — the photo then
matches the method, because it came from the same kitchen. That is how the
chicken was solved, and it is the last resort, not the first.

How it is done: search by licence, then build **contact sheets and actually look
at them**. A filename is not evidence the photo shows the dish — roughly half of
every plausible title turned out to be the wrong food, and one "roast chicken
tray" was a catering pan of chicken breast in bell peppers.

Two traps worth knowing:
- **Python can't reach Commons here** — its cert bundle has expired
  (`CERTIFICATE_VERIFY_FAILED`). PowerShell's `Invoke-RestMethod` uses the
  Windows store and works. Do network in PowerShell, image work in Python/PIL.
- **Commons rate-limits hard** (HTTP 429). Sleep ~2 s between downloads and
  back off, or you lose most of a batch.

## Then

1. More recipes when wanted. Sixteen covers every appliance he owns; the
   `add-recipe` skill does one start to finish.
2. ~~A photo for every recipe.~~ **Done 2026-08-10** — all sixteen.
3. ~~Publish.~~ **Done 2026-08-09.**

## It's live

**https://sextonjerome-cmyk.github.io/food-app/**

Public repo `sextonjerome-cmyk/food-app`, GitHub Pages on from `main` at root,
HTTPS enforced. Every file verified served from the live URL, all 11 recipes
included.

**Jerome's one manual step:** open that URL in Chrome on the Samsung and tap
**Add to Home Screen**. After that, every `git push` updates his phone.

**Bump `CACHE_VERSION` in `sw.js` on every deploy** or his phone runs old code.
Currently `frigo-v22`.

## Talking to Claude by voice (2026-08-11)

Jerome wanted a two-way spoken conversation while cooking — the Claude phone app
reading him one step and waiting — and asked whether the Claude app could be built
into Frigo. It can't: an installed Android app cannot be embedded in a web page, and
there is no URL scheme to open it with a prompt already loaded. **Android's share
sheet is the whole bridge.** Frigo builds the text, hands it to `navigator.share()`,
he picks Claude, and it arrives as the first message of a new chat.

Three hand-offs, all offline (a string given to the OS, no network):

- **Talk it through with Claude** — on any recipe. Sends the scaled ingredients,
  the mise en place, the numbered method, the beginner tip and the make-it-better
  note, followed by coaching rules: one step at a time, wait for "next", say
  numbers as words, describe doneness by look and smell.
- **Ask Claude on my phone** — on the Cook screen. Sends his ticked inventory, his
  gear with quart sizes, servings and spice level, and asks for three ideas using
  only what he has plus at most one thing to buy.
- **Copy my standing cook's prompt** — in Settings. The reusable one, meant to be
  pasted into a Claude **Project** so every chat starts already knowing his kitchen.

Fallback chain: `navigator.share` → `clipboard.writeText` + toast → a sheet with the
text in a selectable box. Verified all three paths.

**Save my kitchen as a file** (Settings) downloads `my-kitchen.txt` — who he is,
his gear, what is on each shelf, what is running low, what he buys but hasn't got,
and every recipe in the app with its ingredients. Roughly 7 KB. It goes into a
Claude **Project** once, so every chat there starts knowing the kitchen. Staples
count as present in it when "Assume staples" is on, matching the matcher — otherwise
the file claims he owns no butter. It is a snapshot and says so at the top, with a
line telling Claude to believe him over the file.

**Also fixed:** `qtyLabel()` was printing the unit `piece`, so the app said
"4 piece eggs" on the recipe screen and the shopping list. Counted things now take
no unit at all. It was always wrong on screen; the read-aloud hand-off is what made
it obvious. The audit afterwards found the other half of it: shopping rows store
the quantity as a **frozen string** at the moment they are added, so any row
already on his phone still said "4 piece eggs". `load()` now strips the unit from
saved rows.

## Fifteen HelloFresh favourites, vetted through Reddit (2026-08-27)

Jerome pointed at an r/hellofresh search for "10" and asked for the dishes people
actually rate nine or ten out of ten, linked to what is in his fridge.

**Reddit is still blocked to WebSearch, but Tavily reaches it.** That is the
workaround worth remembering — `tavily_search` with `include_domains: reddit.com`
returns the threads; `tavily_extract` on individual threads is flaky, and plain
curl to reddit.com or old.reddit.com is a hard 403.

Five cleared the vetting bar and went in, taking the collection from 16 to 21:

| Recipe | Why it earned a place |
|---|---|
| Firecracker Meatballs | Named a ten out of ten in several threads |
| Street Cart Chicken Bowl | Top meal in multiple threads; a home halal-cart dish Serious Eats documents |
| Peruvian Chicken with Green Sauce | Serious Eats' own recipe, so it clears the tested-kitchen leg alone |
| Hot Honey Chicken | Reviews describe crust and honey separately; rebuilt for the 2 qt air fryer |
| Steakhouse Pork Chops | Named in r/hellofresh's hall-of-fame thread |

Every one folds in the failure people actually report, which is the point of the
vetting rule: no added salt in the meatballs (reviewers say the soy plus salt
makes them inedible), a temperature instead of a clock on the pork (thin chops
were being cooked for the time a thick one needs), and the Peruvian chicken
seared rather than roasted (their own top review asks for it).

**Linking to the fridge** — six rows added to `ingredients.js` so nothing in the
new recipes is unmatchable: sriracha, jasmine rice, green beans, jalapenos,
canned black beans, pork chops. Verified programmatically that every ingredient
in all five resolves against the shelf list. The rice was deliberately written as
generic `white rice` rather than `jasmine rice`, because the matcher does not read
the `sub` field and would have called the dish three short for a man who owns rice.

**Photos** — all five from Openverse under CC BY or CC BY-SA. Attribution was
nearly wrong: a background Wikimedia job overwrote the candidate catalogue, and
four of the five recorded authors then described a different photograph. Each
shipped image was re-matched against a fresh search and only credited on an exact
fingerprint match. **If a photo catalogue is written by two jobs at once, do not
trust it — verify by pixels before crediting anyone.**


**Ten more went in the same day**, after Jerome pointed out — correctly — that far
more than five are rated ten out of ten in those threads. The collection is now
**31 recipes**.

| Recipe | Why it earned a place |
|---|---|
| Shrimp and Grits | Called the best meal they ever had on HelloFresh's own page; a real Charleston dish with an r/Charleston thread behind it |
| Chicken and Biscuit Pot Pie | Posted as a ten out of ten, and "slaps every time" in another thread |
| Spicy Pork Dan Dan Noodles | Repeatedly a favourite of the box; complaints are all about watery broth |
| Korean Beef Bibimbap | On HelloFresh's own highest-rated list; one cook's son called it his number one |
| Thai Coconut Curry Chicken | HelloFresh's highest-rated list, and a hall-of-fame thread mention |
| Buffalo Cauliflower Tacos | Named in the best-meal-ever thread |
| Honey Miso Broccoli Donburi | Named in a favourites thread; documented Japanese format |
| Onion Crunch Chicken | Named in the best-meal-ever thread |
| Middle Eastern Chickpea Bowls | HelloFresh's highest-rated list |
| Pecan-Crusted Chicken | HelloFresh's highest-rated list; a standard Southern preparation |

Each one again folds in the failure people actually report: the pot pie biscuits are
split thin because cooks keep reporting raw dough underneath, the dan dan starts with
less stock because everyone says the broth comes out watery, the pecan crust is
cooked at medium because nut oil scorches, and the bibimbap gets the fried egg that
is the single most repeated addition.

**A real bug fell out of this.** Ticking the entire shelf list and asking the app what
it still could not match showed that **menemen and mapo tofu could never reach "Cook
this now"** — six ingredients (green peppers, and mapo tofu's four Sichuan specialty
items) existed in no shelf row, so those two recipes were permanently unreachable no
matter what Jerome owned. Both are fixed; menemen's "white cheese" is now "feta",
which is what he actually has. **That check — tick everything, then see what still
reads as missing — is worth re-running whenever recipes are added.**

Twelve more shelf rows went in for this batch: cabbage, cauliflower, broccoli,
gochujang, miso paste, thai curry paste, ramen noodles, grits, pecans, crispy fried
onions, biscuit dough, cajun seasoning. The shelf list is now 180 items.

## How to look at it

```
python -m http.server 8777       # from this folder
```
Then Chrome at 412×915. The `check-phone` skill does this properly.
