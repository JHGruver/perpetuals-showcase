# Changelog

All notable changes to the Perpetuals Interview Showcase project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project structure and configuration

---

## [1.0.0] - 2024-02-04

### Added

#### Project Infrastructure
- Vite build configuration with multi-page support
- SASS/SCSS architecture with modular organization
- CSS custom properties for runtime theming
- Responsive design system with fluid typography

#### SCSS Framework
- **Utils**: Variables and mixins for consistent styling
  - Design tokens (colors, typography, spacing)
  - Breakpoint mixins for responsive design
  - Animation and transition helpers
  - Utility mixins (flex, grid, glass effects)

- **Base**: Reset and typography foundations
  - Modern CSS reset based on best practices
  - Typography scale with fluid sizing
  - Google Fonts integration (Inter, Space Grotesk, JetBrains Mono)

- **Components**: Reusable UI components
  - Buttons (primary, secondary, accent, ghost, magnetic, glow)
  - Cards (base, hover, glass, dark, icon, stat, feature, testimonial, pricing)
  - Navigation (main nav, dropdowns, mobile menu, tabs, pagination)
  - Forms (inputs, checkboxes, toggles, selects)
  - Particle effects (CSS-only floating particles, glow orbs, starfield, grid)
  - Parallax utilities (scroll reveals, sticky sections, split text)

- **Layouts**: Page structure components
  - Header variants (sticky, transparent, mega menu)
  - Footer variants (full, minimal, CTA)
  - Grid systems (flexbox and CSS Grid)
  - Section layouts (hero, features, stats, testimonials, CTA, split, timeline)

#### Assets
- Downloaded brand logos from perpetuals.com
- Downloaded partner/customer logos
- Downloaded media outlet logos
- Downloaded product screenshots and icons

#### Animation Libraries (package.json)
- GSAP for advanced animations
- Three.js for 3D graphics
- Particles.js for particle effects
- Locomotive Scroll for smooth scrolling
- Lenis for scroll smoothing
- Splitting.js for text animations
- Swiper for touch sliders

### Site Structure
- `/sites/homepage-rebuild/` - Homepage redesign
- `/sites/features-rebuild/` - Features page redesign
- `/sites/competitive-analysis/` - Competitive landscape analysis
- `/sites/design-system/` - Design system documentation
- `/sites/bonus-site/` - Additional showcase site

---

## Bug Fixes & Updates Log

### [Date] - Description
<!-- Template for future entries:
### [YYYY-MM-DD] - Brief Description
- **Fixed**: Issue description
- **Changed**: Change description
- **Added**: Addition description
-->

---

## Notes

### Known Issues
- None currently

### Planned Improvements
- [ ] Add dark mode toggle component
- [ ] Create loading animation system
- [ ] Implement WebGL shader backgrounds
- [ ] Add micro-interactions library

---

## Contributors
- Jacob Gruver - Project Lead
