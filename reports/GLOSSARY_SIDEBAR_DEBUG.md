# Glossary Sidebar Debug — APPXISH Page

## The Bug
The glossary tab (pulsing orange dot) appears ~230px from the right edge of the viewport instead of being flush against the right edge of the screen. On hover, the full panel slides out correctly — but the default resting position of the tab is wrong.

## File
`sites/appxish/index.html` — all CSS is embedded in `<style>` (line 93+)

---

## Root Cause Analysis

### The layout problem

The glossary sidebar is a flex container with two children laid out left-to-right:

```
[ .glossary-tab (36px) ][ .glossary-panel (220px) ]
```

Even though the panel is visually hidden (via `transform:translateX(100%)`), it still occupies layout space. The flex container's computed width is **256px** (36 + 220).

With `position:fixed; right:0`, the sidebar's **right edge** sits at the viewport's right edge. That means the **left edge** (where the tab starts) is at `viewport_right - 256px` — about 256px from the right. The tab occupies only the leftmost 36px of that 256px container.

Adding `transform:translateX(24px)` shifts the whole thing 24px rightward, putting the tab at `viewport_right - 232px`. Still nowhere near the right edge.

**The tab is on the wrong side of the flex container relative to the anchor point.** `right:0` anchors the right edge, but the tab is on the left edge. The 220px phantom panel sits between the tab and the viewport edge.

### Why previous fixes failed

| Attempt | CSS | Why it didn't work |
|---------|-----|--------------------|
| Original | `right:0; transform:translateX(24px)` | Tab at viewport_right - 232px. Panel layout width pushes tab far left. |
| Fix #1 | `right:0; transform:translateX(calc(100% - 12px))` | Translates by ~244px, so tab is at viewport_right - 12px. But `body { overflow-x:hidden }` propagates to viewport and clips the element, making the transform unreliable. |
| Fix #2 | `right:-220px` with `transition:right` | Should work in theory (tab at viewport_right - 36px). But `overflow-x:hidden` on body propagates to the viewport per CSS spec, clipping fixed elements that extend beyond it. The negative right value pushes part of the element past the viewport boundary where it gets clipped. |
| Fix #3 | `flex-direction:row-reverse; width:36px; overflow:hidden; right:0` | Correct concept but `overflow:hidden` on a `position:fixed` element with `pointer-events:none` creates edge cases. The width transition from 36→256px may also interact poorly with the flex reverse layout when the panel has `overflow-y:auto`. |

### The fundamental constraint
`body { overflow-x: hidden }` (line 35) propagates to the viewport. This means the browser clips any content extending beyond the right edge of the viewport. Any approach that relies on hiding the panel by pushing it off-screen to the right will be unreliable.

---

## What the default state SHOULD look like

```
Viewport
┌──────────────────────────────────────────────┐
│                                              │
│                                          [·] │  ← 36px tab flush against right edge
│                                              │     only the pulsing dot visible
│             page content                     │     icon + label hidden (opacity:0)
│                                              │     tab background matches page (#111)
│                                              │
└──────────────────────────────────────────────┘
```

- The tab is a narrow 36px vertical strip touching the right edge of the browser window
- Only a small pulsing orange dot is visible (icon and "TOC" label are `opacity:0`)
- The tab background (`#111`) nearly blends with the dark page, keeping it subtle
- The panel (220px of section links) is completely invisible — not off-screen-to-the-right, but truly not rendered

### On hover:

```
Viewport
┌──────────────────────────────────────┬───────┐
│                                      │ SECTIONS│
│                                      │         │
│         page content                 │ Research│  ← 220px panel appears to LEFT of tab
│                                      │ Audit   │     slides in from the right
│                                      │ Personas│
│                                      │ ...     │
└──────────────────────────────────────┴───────┘
```

---

## Implemented Solution (Fix #4)

**Don't hide the panel by moving it off-screen. Hide it by not rendering it.**

Abandoned the flex layout entirely. Both children are now `position:absolute` inside a minimal fixed parent:

### Parent (`.glossary-sidebar`)
```css
position:fixed; top:60px; right:0; bottom:0; width:36px; z-index:8000; pointer-events:none;
```
- Fixed 36px-wide zone at the right edge — no flex, no transitions, no transforms
- `pointer-events:none` so it doesn't block page interaction
- Its sole purpose is to be the hover target (via children with `pointer-events:auto`)

### Tab (`.glossary-tab`)
```css
position:absolute; top:0; right:0; bottom:0; width:36px; pointer-events:auto;
```
- Absolutely positioned inside the 36px parent → fills it exactly, flush with viewport right edge
- Full height of the sidebar for maximum hover target area
- Contains the pulsing dot (always visible), icon and label (hidden until hover)
- `pointer-events:auto` so it receives hover events

### Panel (`.glossary-panel`)
```css
position:absolute; top:0; bottom:0; right:36px; width:220px; pointer-events:auto;
opacity:0; visibility:hidden; transform:translateX(20px);
```
- Positioned to the LEFT of the tab via `right:36px`
- Extends OUTSIDE the parent's bounds into the page content area (no `overflow:hidden` to clip it)
- Hidden with `visibility:hidden; opacity:0` — no layout footprint, no phantom width
- `transform:translateX(20px)` for a subtle slide-in animation starting from behind the tab edge

### Hover state (`.glossary-sidebar:hover .glossary-panel`)
```css
opacity:1; visibility:visible; transform:translateX(0);
```
- Hovering the tab (child with `pointer-events:auto`) triggers `:hover` on the parent
- Panel fades in and slides 20px leftward into its final position
- Once visible, the panel itself has `pointer-events:auto`, so moving the mouse onto it maintains the parent's hover state
- Moving mouse away from both tab and panel ends the hover, panel fades out

### Why this works
- **No flex layout** — no phantom widths, no child ordering issues
- **No off-screen hiding** — the panel is hidden via `visibility:hidden`, not by pushing it past the viewport where `overflow-x:hidden` clips it
- **`right:0` means `right:0`** — the parent is exactly 36px, the tab is exactly 36px, both at `right:0`. Nothing else affects the position.
- **Panel extends leftward** — it goes into the page content area (to the LEFT of the parent), not off the right edge. Works perfectly with `overflow-x:hidden`.
- **No transforms on the parent** — the only transform is on the panel child, for animation only, and only a 20px horizontal shift that doesn't affect the parent's containing block behavior

### Hover interaction flow
1. Default: User sees 36px tab (pulsing dot) at right edge. Panel invisible.
2. User hovers tab → parent `:hover` activates → panel fades in to left of tab.
3. User moves mouse to panel → still a child of parent → `:hover` maintained.
4. User clicks link or moves mouse away → `:hover` ends → panel fades out.

---

## HTML structure (unchanged)
```html
<div class="glossary-sidebar" id="glossary-sidebar">
  <div class="glossary-tab">
    <div class="glossary-tab-icon">...</div>
    <span class="glossary-tab-label">TOC</span>
    <div class="glossary-tab-dot"></div>
  </div>
  <div class="glossary-panel">
    <div class="glossary-panel-title">Sections</div>
    <a class="glossary-link" href="#research" data-section="research">Research</a>
    ... more links ...
  </div>
</div>
```

No HTML changes needed. Same class names, same JS selectors, same DOM structure.
