---
name: add-recipe
description: Research, vet, and add one new recipe to the Frigo collection in recipes.js. Use whenever a recipe needs to be added, replaced, or a slot filled — it enforces the sourcing standard so no SEO-farm filler gets in. Triggers on "add a recipe", "we need more crockpot recipes", "find a Turkish dish", "fill the air fryer slots".
---

# Add a recipe to Frigo

One recipe per run. Slow and vetted beats fast and padded.

## 1. Know the slot

Before searching, be clear what's missing: which **appliance**, which **cuisine**, what
**time budget**. Read `recipes.js` first and count what's already there — don't add a fourth
chicken-and-rice when the crockpot has no vegetarian option.

## 2. Research — this is the real work

Follow `@.claude/rules/recipe-vetting.md`. The bar: **two of three** —
a kitchen that tests recipes, real humans discussing it, or independent cross-reference.

Search deliberately:
- `"<dish>" serious eats` / `america's test kitchen` / `kenji`
- `"<dish>" site:reddit.com` — and read the **complaints**, not the praise
- `"<dish>" recipe reviews what went wrong`

**Read the failure reports.** They are the most valuable thing on the page. Every fix you
find goes into the steps or the beginner tip.

Reject and move on if: the comments are all "can't wait to try this", there's no named
author, or you can't trace it to a real cook. Say out loud that you rejected it and why.

## 3. Check it fits Jerome

- ≤ 45 min active, beginner-doable, honestly scales 1–4
- **Fits the appliance.** The air fryer is 2 qt — about 1.2 qt of actual food. Most air
  fryer recipes online assume 5–6 qt. Scale down or pick something else.
- Has room for a kick. Bland dishes don't go in.

## 4. Write it

Exact shape in `@.claude/rules/recipe-schema.md`. All five extras are required:
**mise en place**, **beginner tip**, **make it better**, **substitutions**, **source**.

- Your own words throughout. Ingredient lists are fine to reuse; **never copy step prose**.
- Fold the common failure into the steps, then name it in the beginner tip.
- Steps get **read aloud** — one action each, numbers as spoken words, no abbreviations,
  no emoji, no URLs.
- Fill `vetting` with a real sentence about what the evidence was. If you can't write that
  sentence honestly, the recipe doesn't go in.

## 5. Photo

Find a free-licence photo (Pexels, Unsplash, Wikimedia Commons). Download it, resize to
600 px wide WebP, roughly 40 KB, save to `img/<id>.webp`. **No hotlinking** — the app is
offline-first. If there's no good free photo, leave `photo: null`; the app draws a
placeholder rather than showing something misleading.

## 6. Verify

- `id` is unique and won't change (ratings are keyed to it)
- Every ingredient has a valid `aisle` and a correct `scale` flag — a bay leaf must not
  multiply
- `capacityQt` is honest
- `recipes.js` still parses; the recipe appears under the filters you tagged it with
- Run the `check-phone` skill and look at the card at phone width

## 7. Report back

Tell Jerome, in plain English: what you added, where it came from, what the evidence was,
and what you changed from the original and why.
