# Frigo

A private, offline recipe app for a phone.

Tick off what's actually in your fridge, freezer, pantry and spice rack, and it tells you
what you can cook **right now** — or the one thing you'd need to buy.

## What it does

- **Cook** — recipes ranked by how few things you're missing, filtered by appliance,
  cuisine and how much time you've got.
- **Fridge** — four tabs of ingredients to tick, plus anything you add yourself, and a
  running-low flag.
- **List** — a shopping list grouped by store aisle.
- **Plan** — put a recipe on a day.
- **Cook-along** — one step at a time, read out loud, big Next button, screen stays awake.
  For reading across a counter with greasy hands.

Quantities scale from one to eight servings. It warns you when a recipe won't physically
fit the appliance you picked — a 2 quart air fryer really holds about 1.2 quarts of food.

## The recipes

Small and researched rather than large and padded. Every recipe traces to a kitchen that
actually tests things — America's Test Kitchen, Serious Eats, NYT Cooking, Budget Bytes —
or to a named cook, and each one carries a note saying what the evidence was and which
common failure the steps fix.

There is no scraped content here. Recipes are rewritten, with the source credited.

## Running it

Open `index.html`. That's it.

Vanilla HTML, CSS and JavaScript — no framework, no dependencies, no build step, no npm.
Everything is bundled, so it works with no network at all.

## Privacy

Nothing leaves the phone. All state lives in `localStorage`.

The single exception is the optional **Ask AI** button, which calls the Claude API using
your own key, only when you tap it. The key is stored on your device and is never sent
anywhere else.

## Install it on a phone

Open the GitHub Pages URL in Chrome on Android and tap **Add to Home Screen**. It installs
as a normal app icon and works offline from then on.
