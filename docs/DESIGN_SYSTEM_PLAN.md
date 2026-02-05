# Perpetuals Design System Website Plan

## Overview

This document outlines the architecture for a comprehensive design system website that demonstrates atomic design principles and provides reusable components for the Perpetuals brand ecosystem.

---

## Atomic Design Methodology

The design system follows Brad Frost's Atomic Design methodology:

```
┌─────────────────────────────────────────────────────────────────┐
│                     ATOMIC DESIGN HIERARCHY                     │
│                                                                 │
│   ATOMS         →   MOLECULES    →   ORGANISMS   →   TEMPLATES │
│   ─────────         ──────────       ──────────      ────────── │
│   Colors            Button Group     Header         Homepage    │
│   Typography        Form Field       Footer         Features    │
│   Icons             Card             Nav Menu       Dashboard   │
│   Buttons           Search Bar       Hero           Profile     │
│   Inputs            Stat Display     Feature Grid   Settings    │
│                     Media Object     Testimonials               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Site Structure

```
/design-system
├── index.html              # Overview & Introduction
├── atoms/
│   ├── colors.html         # Color palette & usage
│   ├── typography.html     # Type scale & fonts
│   ├── icons.html          # Icon library
│   ├── buttons.html        # Button variants
│   ├── inputs.html         # Form controls
│   └── spacing.html        # Spacing scale
├── molecules/
│   ├── button-groups.html  # Grouped actions
│   ├── form-fields.html    # Label + input combos
│   ├── cards.html          # Card variants
│   ├── search.html         # Search components
│   └── navigation.html     # Nav items
├── organisms/
│   ├── header.html         # Site headers
│   ├── footer.html         # Site footers
│   ├── hero.html           # Hero sections
│   ├── feature-grid.html   # Feature displays
│   └── testimonials.html   # Social proof
├── templates/
│   ├── homepage.html       # Page templates
│   ├── features.html       # Feature pages
│   └── article.html        # Content pages
└── resources/
    ├── downloads.html      # Design files
    ├── guidelines.html     # Usage rules
    └── changelog.html      # Version history
```

---

## Section Details

### 1. Atoms

#### 1.1 Colors

| Token | Value | Usage |
|-------|-------|-------|
| `$primary-black` | #000000 | Headlines, primary text |
| `$primary-white` | #FFFFFF | Backgrounds, inverse text |
| `$accent-blue` | #0066FF | Links, CTAs, highlights |
| `$accent-green` | #00C853 | Success, positive values |
| `$accent-red` | #FF3D00 | Error, negative values |
| `$gray-100` | #F5F5F5 | Light backgrounds |
| `$gray-500` | #6B6B6B | Secondary text |
| `$gray-900` | #1A1A1A | Dark backgrounds |

**Interactive Features:**
- Color swatch click-to-copy
- Contrast ratio checker
- Dark/light mode preview
- Accessibility warnings

---

#### 1.2 Typography

**Font Stack:**
```scss
$font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
$font-secondary: 'Space Grotesk', sans-serif;
$font-mono: 'JetBrains Mono', monospace;
```

**Type Scale:**
| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `hero` | 64-96px | 700 | 1.1 | Hero headlines |
| `h1` | 48-64px | 700 | 1.1 | Page titles |
| `h2` | 32-40px | 600 | 1.2 | Section headers |
| `h3` | 24-28px | 600 | 1.25 | Card titles |
| `h4` | 20-24px | 600 | 1.3 | Subheadings |
| `body-lg` | 18-20px | 400 | 1.6 | Lead paragraphs |
| `body` | 16px | 400 | 1.5 | Body text |
| `body-sm` | 14px | 400 | 1.5 | Secondary text |
| `caption` | 12px | 500 | 1.4 | Labels, captions |

**Interactive Features:**
- Live type tester
- Font loading demo
- Responsive preview

---

#### 1.3 Icons

**Icon Library:**
- Custom SVG icon set
- Consistent 24x24 base size
- 1.5px stroke weight
- Rounded line caps

**Categories:**
| Category | Icons |
|----------|-------|
| Navigation | Home, Menu, Search, Close, Arrow |
| Actions | Add, Edit, Delete, Copy, Download |
| Status | Check, Warning, Error, Info, Loading |
| Finance | Chart, Wallet, Exchange, Secure, Trade |
| Social | Twitter/X, LinkedIn, GitHub |

**Interactive Features:**
- Search/filter icons
- Copy SVG code
- React/Vue component export
- Size/color customization

---

#### 1.4 Buttons

**Variants:**

| Variant | Class | Usage |
|---------|-------|-------|
| Primary | `.btn-primary` | Main CTAs |
| Secondary | `.btn-secondary` | Alternative actions |
| Accent | `.btn-accent` | Promotional actions |
| Ghost | `.btn-ghost` | Tertiary actions |
| Link | `.btn-link` | Inline text links |

**States:**
- Default
- Hover
- Focus
- Active
- Disabled
- Loading

**Sizes:**
- Small (32px height)
- Medium (40px height) - default
- Large (48px height)

**Interactive Features:**
- State preview on hover
- Code snippet copy
- Accessibility audit results

---

#### 1.5 Form Inputs

**Components:**
| Component | Variants |
|-----------|----------|
| Text Input | Default, Disabled, Error, Success |
| Textarea | Resizable, Fixed |
| Select | Single, Multi, Searchable |
| Checkbox | Default, Indeterminate |
| Radio | Default, Button style |
| Toggle | Default, Labeled |
| Range | Slider, Dual handle |

**Interactive Features:**
- Live form demo
- Validation examples
- Error message patterns

---

#### 1.6 Spacing

**Scale:**
```scss
$spacing-unit: 8px;

$spacing-xs:  4px   // 0.5 units
$spacing-sm:  8px   // 1 unit
$spacing-md:  16px  // 2 units
$spacing-lg:  24px  // 3 units
$spacing-xl:  32px  // 4 units
$spacing-2xl: 48px  // 6 units
$spacing-3xl: 64px  // 8 units
$spacing-4xl: 96px  // 12 units
```

**Interactive Features:**
- Visual spacing demo
- Component spacing examples

---

### 2. Molecules

#### 2.1 Button Groups

**Patterns:**
```html
<!-- Horizontal Group -->
<div class="btn-group">
  <button class="btn-primary">Primary</button>
  <button class="btn-secondary">Secondary</button>
</div>

<!-- Split Button -->
<div class="btn-group btn-split">
  <button class="btn-primary">Action</button>
  <button class="btn-primary btn-icon">▼</button>
</div>
```

---

#### 2.2 Form Fields

**Patterns:**
```html
<!-- Standard Field -->
<div class="form-field">
  <label class="form-label">Email Address</label>
  <input type="email" class="form-input" />
  <span class="form-hint">We'll never share your email</span>
</div>

<!-- Field with Icon -->
<div class="form-field input-icon">
  <label class="form-label">Search</label>
  <span class="icon">🔍</span>
  <input type="search" class="form-input" />
</div>
```

---

#### 2.3 Cards

**Variants:**
| Variant | Features |
|---------|----------|
| Base Card | Padding, shadow, radius |
| Hover Card | Lift animation on hover |
| Glass Card | Backdrop blur effect |
| Dark Card | Inverted colors |
| Media Card | Image + content |
| Stat Card | Large number display |
| Feature Card | Icon + title + description |

---

#### 2.4 Search Components

**Patterns:**
- Basic search input
- Search with suggestions
- Search with filters
- Command palette style

---

#### 2.5 Navigation Items

**Patterns:**
- Nav link with underline animation
- Dropdown trigger
- Breadcrumb item
- Tab item
- Pagination item

---

### 3. Organisms

#### 3.1 Header

**Variants:**
| Variant | Features |
|---------|----------|
| Default | Logo, nav, CTA |
| Transparent | For hero overlays |
| Sticky | Fixed on scroll |
| Mega Menu | Expanded dropdowns |
| Mobile | Hamburger + drawer |

---

#### 3.2 Footer

**Variants:**
| Variant | Features |
|---------|----------|
| Full | Logo, links, newsletter, legal |
| Minimal | Logo, copyright, links |
| CTA | Call-to-action focused |
| Dark | Inverted color scheme |

---

#### 3.3 Hero Sections

**Variants:**
| Variant | Features |
|---------|----------|
| Centered | Title, description, CTAs |
| Split | Content + media side by side |
| Video | Background video |
| Particles | Animated particle background |
| Gradient | Animated gradient background |

---

#### 3.4 Feature Grids

**Variants:**
| Variant | Features |
|---------|----------|
| Icon Grid | Icon + title + description |
| Bento | Mixed size cards |
| Comparison | Side-by-side features |
| Timeline | Sequential features |

---

#### 3.5 Testimonials

**Variants:**
| Variant | Features |
|---------|----------|
| Card | Quote + author in card |
| Carousel | Sliding testimonials |
| Featured | Large quote with image |
| Logo Cloud | Partner/press logos |

---

### 4. Templates

#### 4.1 Homepage Template

```
┌─────────────────────────────────────────┐
│              HEADER                      │
├─────────────────────────────────────────┤
│              HERO                        │
│         (Particles BG)                   │
├─────────────────────────────────────────┤
│         VALUE PROPOSITIONS              │
│         (3-column cards)                │
├─────────────────────────────────────────┤
│          STATISTICS                      │
│         (Counter animation)             │
├─────────────────────────────────────────┤
│          FEATURES                        │
│         (Bento grid)                    │
├─────────────────────────────────────────┤
│        TESTIMONIALS                      │
│         (Carousel)                       │
├─────────────────────────────────────────┤
│           CTA                            │
├─────────────────────────────────────────┤
│          FOOTER                          │
└─────────────────────────────────────────┘
```

---

## Interactive Documentation Features

### 1. Live Code Playground

Each component includes:
- Editable HTML/CSS/JS
- Real-time preview
- Copy code button
- Framework-specific exports (React, Vue)

### 2. Design Token Export

Export formats:
- CSS custom properties
- SCSS variables
- JSON (for tools)
- Tailwind config
- Figma variables

### 3. Accessibility Checker

Each component shows:
- WCAG compliance status
- Contrast ratios
- Screen reader behavior
- Keyboard navigation

### 4. Version Control

- Changelog for each component
- Migration guides
- Deprecation notices
- Semantic versioning

---

## Implementation Notes

### Technology Stack

```javascript
// Recommended for design system site
{
  "framework": "Vite + Vanilla JS",
  "styling": "SCSS (our system)",
  "documentation": "Custom (lightweight)",
  "code highlighting": "Prism.js",
  "search": "Fuse.js (client-side)",
  "copy to clipboard": "clipboard.js"
}
```

### File Organization

```
/sites/design-system/
├── index.html
├── css/
│   └── design-system.css
├── js/
│   ├── app.js
│   ├── code-preview.js
│   ├── theme-toggle.js
│   └── search.js
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
└── assets/
    ├── icons/
    └── images/
```

---

## Benefits for Interview

This design system demonstrates:

1. **Systems Thinking** - Scalable, modular architecture
2. **Design Knowledge** - Atomic design methodology
3. **Technical Skill** - Production-ready implementation
4. **Documentation** - Clear, usable guidelines
5. **Accessibility** - Built-in compliance
6. **Developer Experience** - Copy-paste ready code

---

*This design system would enable Perpetuals.com to maintain brand consistency across all digital touchpoints while empowering teams to build rapidly.*
