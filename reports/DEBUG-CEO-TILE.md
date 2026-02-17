# DEBUG: CEO Market Thesis Tile Not Showing on Portal

## Problem
The 6th site card (Market Thesis) is not visible on the portal page at `sites/index.html`.

## Hypotheses
1. [ ] HTML card is outside the `.site-grid` container
2. [ ] HTML syntax error breaking the card
3. [ ] CSS hiding/collapsing the card
4. [ ] `.featured` class causing layout issue
5. [ ] Changes not deployed to GitHub Pages
6. [ ] File not actually saved

## Investigation Log

### Check 1: Is the card HTML inside `.site-grid`?
- `.site-grid` opens at line 54
- `.site-grid` closes at line 349 (`</div>`)
- Market Thesis card is at lines 308-347
- **PASS** — card is inside the grid container

### Check 2: HTML syntax
- Card opens with `<a>` at line 308, closes with `</a>` at line 347
- All child divs properly nested
- **PASS** — no syntax issues

### Check 3: CSS hiding the card?
- `.site-card` has no `display: none` or `max-height: 0`
- `.site-card.featured` only sets `border-color` — no layout impact
- `.site-card:nth-child(6)` animation delay defined at line 638
- Grid: `repeat(auto-fit, minmax(350px, 1fr))` — no card count limit
- **PASS** — CSS is fine

### Check 4: `.featured` class issue?
- Only sets `border-color: var(--color-accent)` — cosmetic only
- **PASS**

### Check 5: Is the file actually saved?
- Verified via grep: card exists at line 308
- **PASS**

### Check 6: Changes deployed to GitHub Pages?
- Screenshot URL: `jhgruver.github.io/perpetuals-showcase/sites/index.html`
- User is viewing the DEPLOYED version
- Local changes have NOT been committed or pushed
- **ROOT CAUSE FOUND**

## Root Cause
All changes are local only. The deployed GitHub Pages site has not been updated. Need to commit and push all changes.

## Fix
- `git add` all new/modified files
- `git commit`
- `git push` to trigger GitHub Pages deployment
