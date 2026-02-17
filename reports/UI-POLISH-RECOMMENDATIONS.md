# UI Polish Recommendations — Perpetuals Showcase
## Full Audit by the Front-End Ninjas
**February 2026 — All 6 Pages Reviewed**

---

## EXECUTIVE SUMMARY

The showcase has strong foundations: good typography choices, a distinctive color palette, and solid content hierarchy. But it reads as **B+ Webflow/Framer quality** rather than **$500K agency work**. The gap is in four areas:

1. **Depth** — Cards are flat everywhere. No layered shadows, no subtle gradients, no elevation system.
2. **Motion** — Hover states exist but are repetitive. No entrance animations, no stagger effects, no micro-interactions.
3. **Consistency** — Spacing, gaps, font sizes, and color variables are ad-hoc across pages. No enforced system.
4. **Responsiveness** — Most pages have 1-2 breakpoints. No tablet optimization. Mobile nav is broken on several pages.

**Current score: ~5.5/10 across pages.**
**Target: 8.5/10 — polished enough that Aaron's team can't tell it wasn't built by a funded startup.**

---

## CROSS-SITE ISSUES (Fix These First)

### 1. Color Variable Naming Bug
`--color-blue: #fd8800` is ORANGE, not blue. This appears on Homepage and Features pages. Rename to `--color-primary` or `--color-accent` for maintainability.

**Also:** `#130d90` (deep purple) is hardcoded in 8+ places across pages. Define as `--color-secondary: #130d90` in every `:root`.

### 2. No Focus States (Accessibility)
Zero `:focus-visible` styles across all 6 pages. Keyboard users see nothing. This is a WCAG AA violation — especially ironic given that the Analysis page calls out accessibility as a key insight.

**Fix for all pages:**
```css
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--color-accent, #fd8800);
  outline-offset: 3px;
  border-radius: 4px;
}
```

### 3. No `prefers-reduced-motion`
No page respects this media query. Add to every page:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4. Flat Cards Everywhere
Almost every card across all pages uses `border: 1px solid` with NO default shadow. Only hover states add shadows. Premium design gives cards a resting shadow for depth:
```css
/* Base card elevation */
box-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);

/* Hover elevation */
box-shadow: 0 12px 32px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.06);
```

### 5. Missing Mobile Navigation
Homepage portal, Features, and Vision pages hide desktop nav on mobile with NO hamburger replacement. Users on tablets/phones have no way to navigate between pages.

---

## PAGE-BY-PAGE RECOMMENDATIONS

---

## 1. PORTAL (sites/index.html)

**Current score: 5/10** — Clean but generic. Reads like a template landing page.

### Animations & Motion
| Priority | Recommendation |
|----------|---------------|
| HIGH | Add `@keyframes fadeInUp` entrance animation on hero content (opacity 0→1, translateY 20px→0, 0.8s ease-out) |
| HIGH | Stagger site cards with `animation-delay: calc(var(--i) * 0.1s)` using CSS custom properties on each card |
| MED | Add smooth hover underline on nav links using `::after` pseudo-element with `scaleX(0)→scaleX(1)` |
| MED | Animate SVG previews on card hover — subtle scale or opacity pulse on the illustration |
| LOW | Add subtle background radial gradient that shifts on scroll (parallax feel) |

### Spacing & Layout
| Priority | Fix |
|----------|-----|
| HIGH | Standardize section padding: hero 6rem, all other sections 5rem (currently 4rem feels tight) |
| HIGH | Unify grid gaps: site cards and doc cards should both use `2rem` (docs currently 1.5rem) |
| MED | Increase h2 from `1.5rem` to `1.75rem` with `font-weight: 700` — currently competes with lead text |
| MED | Add `margin-bottom: 2rem` between section h2 and grid content |

### Depth & Polish
| Priority | Fix |
|----------|-----|
| HIGH | Add default box-shadow to site cards: `0 2px 8px rgba(0,0,0,0.08)` (currently only on hover) |
| HIGH | Add header shadow on scroll: `box-shadow: 0 1px 4px rgba(0,0,0,0.06)` |
| MED | Add gradient text on hero h1: `background: linear-gradient(135deg, #130d90, #fd8800)` with `background-clip: text` |
| MED | Add subtle body background pattern: `radial-gradient(circle at 20% 50%, rgba(253,136,0,0.03), transparent 50%)` |
| LOW | Status badges: add `box-shadow: 0 2px 8px rgba(51,193,94,0.2)` for depth |

### Responsive
| Priority | Fix |
|----------|-----|
| CRITICAL | Add hamburger menu for mobile — nav currently just disappears |
| HIGH | Add 1024px breakpoint: 2-column grid for site cards |
| MED | Add 480px breakpoint: reduce hero padding to 3rem, h1 to 1.75rem |

---

## 2. HOMEPAGE REBUILD (sites/homepage-rebuild/index.html)

**Current score: 6/10** — Best page overall. Hero with particles is strong. But stat cards, service cards, and trust ticker feel template-y.

### Animations & Motion
| Priority | Recommendation |
|----------|---------------|
| HIGH | Stagger card entrance animations with `animation-delay: calc(var(--index) * 100ms)` on prop cards, stat cards, service cards |
| HIGH | Add text reveal animation on hero title — split lines, animate each with stagger |
| MED | Add parallax scroll effect on hero mesh gradient background (subtle, 0.3x rate) |
| MED | Service link hover: add `→` icon translateX(4px) on hover (currently only gap changes — invisible) |
| MED | Add smooth underline on nav links using `::after` scaleX transition |
| LOW | Add scroll progress indicator (thin orange bar at top of viewport) |
| LOW | CTA section shapes: increase opacity from 0.1 to 0.2 so they're visible |

### Spacing & Layout
| Priority | Fix |
|----------|-----|
| HIGH | Unify card padding: prop cards (2.5rem), service cards (2rem), stat cards (2rem) → all 2.25rem |
| HIGH | Unify grid gaps: services grid (1.5rem) doesn't match prop grid (2rem) or stats grid (2rem) → all 2rem |
| MED | Hero: fix asymmetric vertical padding (top is calc, bottom is 4rem) — use consistent 5rem top/bottom below header |
| MED | Footer at 480px: switch from 2-column to 1-column |
| LOW | Stat dividers: use flex `align-items: center` instead of fixed `height: 40px` |

### Depth & Polish
| Priority | Fix |
|----------|-----|
| HIGH | Add default shadow to stat cards: `0 4px 16px rgba(0,0,0,0.08)` (currently zero shadow) |
| HIGH | Add default shadow to service cards (currently flat until hover) |
| MED | Add subtle gradient overlay on stat card backgrounds: `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))` |
| MED | Add button press/active state: `transform: translateY(0); box-shadow: 0 2px 4px rgba(0,0,0,0.1)` |
| LOW | Add `font-feature-settings: "liga", "kern"` on headlines |

### Template Fixes
| Priority | What to Make Custom |
|----------|-------------------|
| HIGH | **Stat cards**: Add mini sparklines or trend indicators (even faked SVG). 6 identical number boxes = generic |
| MED | **Trust ticker**: Add company logos instead of just text names. A text-only marquee is a template staple. |
| MED | **Value prop cards**: Add unique illustrations or icons per card instead of generic SVG strokes |
| LOW | **CTA section**: Add actual floating UI elements (mini cards, charts) instead of abstract circles |

---

## 3. FEATURES REBUILD (sites/features-rebuild/index.html)

**Current score: 5/10** — Loading screen is polished. Feature cards and compliance sections are very generic.

### Animations & Motion
| Priority | Recommendation |
|----------|---------------|
| CRITICAL | Define missing `@keyframes bounce` (referenced on `.arch-arrow svg` but never defined — animation is broken) |
| HIGH | Add stagger on feature card entrance (all appear at once currently) |
| HIGH | Replace generic `ease` with custom `cubic-bezier(0.16, 1, 0.3, 1)` on card hovers for spring feel |
| MED | Add subtle rotation on module hover icons |
| MED | Add number counting animation on any metric displays |
| LOW | Add parallax on hero floating shapes (currently basic float up/down) |

### Spacing & Layout
| Priority | Fix |
|----------|-----|
| HIGH | Feature cards gap: increase from 1.5rem to 2rem (matches other grids) |
| HIGH | Section header `margin-bottom: 4rem` is excessive — reduce to 2.5rem |
| MED | Pattern card minimum width: reduce from 350px to 280px for 4-column at 1280px |
| MED | Order book rows: increase padding from `0.2rem 0.5rem` to `0.4rem 0.6rem` — currently unreadable |
| LOW | Module label `bottom: -30px`: use `margin-top: 0.5rem` instead of absolute positioning |

### Depth & Polish
| Priority | Fix |
|----------|-----|
| HIGH | Add base shadow to feature cards: `0 4px 16px rgba(0,0,0,0.06)` |
| HIGH | Add base shadow to compliance cards |
| MED | Order book: add subtle inner glow or gradient to bid/ask bars |
| MED | Architecture diagram: add subtle shadows on layer boxes |
| LOW | Increase floating shape opacity on hero (currently too transparent to see) |

### Template Fixes
| Priority | What to Make Custom |
|----------|-------------------|
| HIGH | **Feature cards**: Add unique visual per card (mini diagram, chart, or icon illustration) instead of identical layouts |
| HIGH | **Testimonial cards**: Add asymmetric layout or card sizes — 3 identical centered cards is the most clichéd pattern |
| MED | **Getting Started steps**: Add a connecting line/path between steps instead of 3 isolated boxes |
| MED | **Compliance cards**: Add visual status indicators (green checkmarks, progress bars) instead of plain lists |

---

## 4. COMPETITIVE ANALYSIS (sites/competitive-analysis/index.html)

**Current score: 6.5/10** — Executive dashboard is genuinely polished (8/10). Everything below the hero is template-y (4/10). Big quality gap.

### Animations & Motion
| Priority | Recommendation |
|----------|---------------|
| HIGH | Add stagger entrance on finding cards, platform cards, pattern cards (all snap in without animation) |
| HIGH | Speed up pulse animation from 2s to 1.4s for more energy |
| MED | Add underline animation on nav links and tab buttons |
| MED | Add entrance animation on dashboard (slide up + fade on page load) |
| LOW | Add subtle parallax on hero gradient background |

### Dashboard Polish (Already Good — Make Great)
| Priority | Fix |
|----------|-----|
| HIGH | Increase insight grid gap from 0.6rem to 1rem and card padding from 0.75rem to 1rem — currently cramped |
| HIGH | Increase insight headline font from 0.8rem to 0.95rem — too small for a "headline" |
| HIGH | Increase dashboard panel backgrounds from `rgba(255,255,255,0.03)` to `0.06` — currently invisible |
| MED | Add subtle box-shadow to dashboard panels: `0 8px 32px rgba(0,0,0,0.15)` |
| MED | Increase Perpetuals dot glow — add second animated ring |
| MED | Increase quadrant glow opacity from 0.06 to 0.1 |
| LOW | Animate roadmap progress bar on page load (width from 0% to 52%) |

### Spacing & Layout
| Priority | Fix |
|----------|-----|
| HIGH | Add 1024px breakpoint for tablet (currently only 768px — pattern cards at 350px min break badly) |
| HIGH | Balance footer padding: increase from 2rem to 4rem (matches other sections) |
| MED | Platform card list item padding: increase from 0.25rem to 0.4rem |
| MED | Pattern card list item padding: increase from 0.3rem to 0.5rem |

### Depth & Polish
| Priority | Fix |
|----------|-----|
| HIGH | Add shadows to pattern cards, finding cards, recommendation cards (all flat) |
| HIGH | Add gradient to spectrum sections (currently flat solid colors) |
| MED | Color swatch `.blue` is labeled blue but shows orange (#fd8800) — fix label or color |
| MED | Define `#130d90` as `--accent-purple` CSS variable (used 3+ times, hardcoded) |

### Template Fixes
| Priority | What to Make Custom |
|----------|-------------------|
| HIGH | **Design patterns section**: 6 identical card layouts — add unique mini-visualizations per pattern (hierarchy tree, nav diagram, color wheel, etc.) |
| MED | **Recommendations section**: Numbered cards look like Bootstrap docs — add timeline or priority indicator visual |
| MED | **Sources section**: 3 plain link lists — add icons or categorization visual |

---

## 5. DESIGN SYSTEM (sites/design-system/index.html)

**Current score: 5.5/10** — Well-organized documentation. But components look like Bootstrap defaults. Primary buttons are BLACK instead of brand orange.

### Critical Bugs
| Priority | Fix |
|----------|-----|
| CRITICAL | `.btn-primary` uses `background: #000` (black) — should be brand orange `#fd8800`. This is the showcase's own design system showing the wrong brand color. |
| CRITICAL | `.principle-number` uses `color: var(--color-border)` which is `#e9e9e9` — nearly invisible on white background. Change to `rgba(253,136,0,0.3)` |
| HIGH | `.badge-warning` and `.alert-warning` use hardcoded `#b37a00` — should be CSS variable |
| HIGH | Loading spinner border `rgba(255,255,255,0.3)` only works on dark buttons — breaks on secondary |

### Animations & Motion
| Priority | Recommendation |
|----------|---------------|
| HIGH | Add section entrance animations when navigating sidebar (currently just display: block/none) |
| HIGH | Code copy button: animate success state (checkmark icon + green flash instead of just text swap) |
| MED | Add hover scale on buttons: `transform: scale(1.02)` |
| MED | Sidebar active link: animate indicator slide between items |
| LOW | Theme toggle: add rotation animation on sun/moon icon |

### Depth & Polish
| Priority | Fix |
|----------|-----|
| HIGH | Add shadows to component preview cards (currently completely flat) |
| HIGH | Use brand gradient on primary buttons: `linear-gradient(135deg, #fd8800, #d97300)` |
| MED | Add inset shadow on form inputs for depth |
| MED | Code blocks: add subtle top gradient (dark → slightly less dark) |
| LOW | Use defined shadow variables `--shadow-sm/md/lg` more broadly (currently barely used) |

### Typography
| Priority | Fix |
|----------|-----|
| HIGH | Fix `.method-card h3` at 1.25rem competing with `.lead` at 1.25rem — reduce method h3 to 1.1rem or increase lead |
| MED | Add `font-weight: 600` explicitly to pillar card headings |
| MED | Feature item h4 at 1rem is too small — increase to 1.1rem |

---

## 6. PRODUCT VISION (sites/product-vision/)

**Current score: 6.5/10** — Hero with canvas particles is strong. Dashboard is decent. Pillar and future cards need work.

### Animations & Motion
| Priority | Recommendation |
|----------|---------------|
| HIGH | Add hover transforms to pillar cards: `transform: translateY(-4px) scale(1.01)` + shadow (currently only border-color changes) |
| HIGH | Add hover transforms to future cards (same treatment — currently flat) |
| HIGH | Stagger pillar card entrances with cascade delay |
| MED | Animate roadmap progress bar from 0% to 52% on page load |
| MED | Add number counting animation on metric values |
| MED | Timeline items: add hover state (currently zero hover interaction) |
| LOW | Vision quote mark: increase opacity from 0.3 to 0.5 so it's visible |
| LOW | CTA orb: increase layer opacity from 0.1 to 0.2 so orb is visible |

### Dashboard Polish
| Priority | Fix |
|----------|-----|
| HIGH | Add default box-shadow to metric cards (currently shadow only on hover) |
| MED | Increase metric card hover: add `scale(1.02)` alongside translateY |
| MED | Dev target card: increase background from `rgba(253,136,0,0.05)` to `0.08` — currently barely distinguishable |
| MED | Increase milestone hover dot scale from 1.35x to 1.5x |
| LOW | Add subtle pulse animation to roadmap progress endpoint |

### Spacing
| Priority | Fix |
|----------|-----|
| HIGH | Replace fractional spacing (0.15rem, 0.4rem, 0.6rem) with spacing system variables |
| HIGH | Metric card internal gap: increase from 0.15rem to 0.35rem between value/label/detail |
| MED | Support metric cards: match hero padding (currently noticeably tighter) |
| MED | Vision section content gap: reduce from 80px to 48px |

### Responsive
| Priority | Fix |
|----------|-----|
| CRITICAL | Add hamburger menu for mobile navigation (nav disappears entirely on tablet) |
| HIGH | Hero stats: center on mobile instead of left-align |
| MED | Tooltip: add mobile-safe positioning (160px width overflows on small screens) |

---

## GLOBAL ANIMATION SYSTEM

Every page should share these base animations. Define once, import everywhere:

### Entrance Animations
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```

### Stagger Pattern
```css
.stagger > * {
  opacity: 0;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.stagger > *:nth-child(1) { animation-delay: 0.05s; }
.stagger > *:nth-child(2) { animation-delay: 0.1s; }
.stagger > *:nth-child(3) { animation-delay: 0.15s; }
.stagger > *:nth-child(4) { animation-delay: 0.2s; }
.stagger > *:nth-child(5) { animation-delay: 0.25s; }
.stagger > *:nth-child(6) { animation-delay: 0.3s; }
```

### Hover System
```css
/* Card hover — use everywhere */
.card-hover {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s ease,
              border-color 0.25s ease;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.12);
  border-color: var(--color-accent, #fd8800);
}

/* Button hover */
.btn-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.btn-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.btn-hover:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Link underline */
.link-underline {
  position: relative;
}
.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.link-underline:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

### Scroll Reveal (JavaScript)
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```
```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## ELEVATION SYSTEM (Standardize Shadows)

```css
--shadow-xs: 0 1px 2px rgba(0,0,0,0.05);
--shadow-sm: 0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
--shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
--shadow-lg: 0 12px 32px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.06);
--shadow-xl: 0 20px 48px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.06);

/* Dark theme variants */
--shadow-sm-dark: 0 2px 8px rgba(0,0,0,0.3);
--shadow-md-dark: 0 4px 16px rgba(0,0,0,0.4);
--shadow-lg-dark: 0 12px 32px rgba(0,0,0,0.5);
```

**Usage:** Cards get `--shadow-sm` at rest, `--shadow-lg` on hover. Buttons get `--shadow-xs` at rest, `--shadow-md` on hover.

---

## SPACING SYSTEM (Standardize Gaps)

Every page should use these values and nothing else:

```
4px   — micro (icon gaps, badge padding)
8px   — xs (list item spacing, inline gaps)
16px  — sm (card internal spacing, form gaps)
24px  — md (card padding, section headers to content)
32px  — lg (grid gaps between cards)
48px  — xl (section internal padding)
80px  — 2xl (section top/bottom padding)
120px — 3xl (hero section padding)
```

**Enforce:** Grid gaps should be 32px (lg). Card padding should be 24px (md). Section padding should be 80px (2xl). No more mixing 1.5rem/2rem/2.5rem arbitrarily.

---

## TYPOGRAPHY SCALE (Standardize Sizes)

```
Display:  clamp(3rem, 8vw, 5rem)    — Hero titles only
H1:       clamp(2rem, 5vw, 3rem)     — Section page titles
H2:       1.75rem                     — Section headings
H3:       1.25rem                     — Card titles
H4:       1rem, weight 600            — Sub-headings
Body:     1rem                        — Paragraph text
Small:    0.875rem                    — Supporting text, meta
Micro:    0.75rem                     — Labels, badges, tags
Mono:     0.8rem                      — Code, data values
```

**Enforce:** No more 11 different small sizes (0.55rem through 0.95rem). Consolidate to Small (0.875rem), Micro (0.75rem), and Mono (0.8rem).

---

## PRIORITY IMPLEMENTATION ORDER

### Phase 1: Critical Fixes (Do First)
1. Fix color variable naming (`--color-blue` → `--color-primary`)
2. Define `--color-secondary: #130d90` on all pages
3. Fix Design System primary button color (black → orange)
4. Fix invisible principle numbers on Design System
5. Add focus-visible states to all pages
6. Add `prefers-reduced-motion` to all pages
7. Fix missing `@keyframes bounce` on Features page
8. Add mobile hamburger navigation to all pages

### Phase 2: Depth & Shadow (Visual Impact)
1. Add elevation system CSS variables to all pages
2. Apply default shadows to all cards (not just hover)
3. Add shadows to dashboard panels on Analysis and Vision
4. Increase dashboard panel background opacity (0.03 → 0.06)
5. Add gradient text on hero titles where appropriate
6. Increase insight grid spacing on Analysis dashboard

### Phase 3: Animation & Motion (Feel Premium)
1. Add fadeInUp entrance animation system
2. Apply stagger to all card grids
3. Add scroll-reveal to all sections below the fold
4. Add smooth link underline animation to all nav
5. Add button hover/active states with scale + shadow
6. Add roadmap progress bar entrance animation
7. Speed up pulse animations (2s → 1.4s)

### Phase 4: Consistency & Responsive (Polish)
1. Standardize spacing system (enforce 8px grid)
2. Standardize typography scale (reduce to 8 sizes)
3. Standardize grid gaps (32px everywhere)
4. Add 1024px tablet breakpoint to all pages
5. Add 480px small-mobile breakpoint
6. Fix all responsive font sizing

### Phase 5: Template → Custom (Differentiation)
1. Add mini-visualizations to stat cards (Homepage)
2. Add unique icons/illustrations per feature card (Features)
3. Add mini-diagrams to Design Pattern cards (Analysis)
4. Replace text-only trust ticker with logos (Homepage)
5. Add connecting path between Getting Started steps (Features)
6. Make testimonial cards asymmetric layout (Features)

---

## PAGES RANKED BY CURRENT QUALITY

| Rank | Page | Score | Biggest Win |
|------|------|-------|------------|
| 1 | Homepage Rebuild | 6/10 | Hero particles are strong. Fix stat card flatness + stagger animations. |
| 2 | Product Vision | 6.5/10 | Canvas animation + dashboard are solid. Fix flat pillar/future cards. |
| 3 | Competitive Analysis | 6.5/10 | Dashboard is 8/10 but below-the-fold is 4/10. Add shadows + stagger to main content. |
| 4 | Design System | 5.5/10 | Fix critical button/principle bugs. Add shadows to component cards. |
| 5 | Features Rebuild | 5/10 | Loading screen is polished. Everything else is template-y. Fix bounce bug, add card depth. |
| 6 | Portal | 5/10 | Clean but minimal. Entrance animations + card shadows = immediate upgrade. |

---

## THE 80/20 — If You Only Do 5 Things

1. **Add default shadows to all cards** across all 6 pages (biggest visual upgrade)
2. **Add fadeInUp + stagger entrance animation** to all card grids (makes it feel alive)
3. **Fix focus-visible states** on all pages (accessibility credibility)
4. **Add hamburger menu** to all mobile breakpoints (functional necessity)
5. **Increase Analysis dashboard insight grid spacing** (the page Aaron will see most)

These five changes take the showcase from "competent developer portfolio" to "this person understands craft."

---

*Audit compiled February 10, 2026*
