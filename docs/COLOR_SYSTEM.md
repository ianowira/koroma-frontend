# Koroma Biopharmaceuticals — Design System & Color Tokens Guide

This document establishes the official color system, token architecture, and implementation guidelines for `koroma-frontend`. All developers and AI agents must adhere to the design tokens detailed here when building or updating user interfaces.

---

## 🌿 1. Brand Identity & Visual Philosophy

Koroma Biopharmaceuticals bridges the gap between traditional botanical natural healing and modern pharmaceutical science. The visual language conveys credibility, natural purity, and clinical efficacy through a responsive **Dual-Theme Engine**:

* **Botanical Light Theme (Default)**: Evokes natural herbal apothecaries and clinical purity. Features warm parchment surfaces (`#F5F3EE`), deep forest botanical greens (`#2D6A4F`), organic charcoal typography (`#1A2016`), and warm amber gold for certification accolades (`#A0692E`).
* **Bioluminescent Dark Theme**: Evokes deep bioactive nocturnal botanicals and futuristic clinical labs. Features midnight navy backgrounds (`#040C1A`), high-visibility bioluminescent emerald accents (`#00C896`), crisp white typography (`#EEF2FF`), and luminous gold (`#F5C842`).

---

## ⚙️ 2. Token Architecture (Tailwind CSS v4)

The color system operates on a two-tier pipeline:

```
[CSS Custom Properties]  ──►  [Tailwind v4 @theme Engine]  ──►  [Developer Utility Classes]
:root & [data-theme="dark"]     --color-card: var(--bg-card)      bg-card, text-primary,
in src/app/globals.css          --color-primary: var(--...)       border-border, etc.
```

1. **Theme Layer (`:root` / `[data-theme="dark"]`)**: Raw hex and rgba values are scoped to CSS Custom Properties, enabling instant theme toggles without page reload or flash.
2. **Token Layer (`@theme`)**: CSS variables are mapped into Tailwind CSS v4's `@theme` directive, generating atomic utility classes (`bg-*`, `text-*`, `border-*`, `ring-*`, `shadow-*`).
3. **Component Layer**: React components consume Tailwind utility tokens directly with standard hover, focus, and transition modifiers.

---

## 📋 3. Complete Token Reference Table

### Surface & Background Tokens

| Tailwind Class | Token Name | Light Value | Dark Value | Intended Usage |
|---|---|---|---|---|
| `bg-page` | `--color-page` | `#F5F3EE` | `#040C1A` | Main page background |
| `bg-page-deep` | `--color-page-deep` | `#EDE9E1` | `#030A16` | Deep recessed containers & footers |
| `bg-footer` | `--color-footer` | `#E8E3D8` | `#030A16` | Global footer background |
| `bg-section-alt` | `--color-section-alt` | `rgba(0,0,0,0.025)` | `rgba(7,16,32,0.5)` | Alternating section background |
| `bg-trust-strip` | `--color-trust-strip` | `rgba(0,0,0,0.035)` | `rgba(7,16,32,0.6)` | Trust banner background |
| `bg-nav-scrolled` | `--color-nav-scrolled`| `rgba(245,243,238,0.94)`| `rgba(4,12,26,0.88)`| Fixed navbar when scrolled |
| `bg-card` | `--color-card` | `rgba(255,255,255,0.9)` | `rgba(13,30,53,0.55)` | Standard card surface |
| `bg-card-hover` | `--color-card-hover` | `rgba(255,255,255,1)` | `rgba(13,30,53,0.75)` | Card surface on hover |
| `bg-input` | `--color-input` | `rgba(0,0,0,0.04)` | `rgba(255,255,255,0.05)` | Text inputs & search fields |
| `bg-pill` | `--color-pill` | `rgba(0,0,0,0.05)` | `rgba(255,255,255,0.07)` | Inactive filter tabs & neutral tags |
| `bg-stat-card` | `--color-stat-card` | `rgba(255,255,255,0.8)` | `rgba(13,30,53,0.6)` | Metric & statistic cards |
| `bg-info-card` | `--color-info-card` | `rgba(255,255,255,0.75)`| `rgba(13,30,53,0.5)` | Product detail information cards |
| `bg-empty-icon` | `--color-empty-icon` | `rgba(0,0,0,0.04)` | `rgba(255,255,255,0.04)` | Empty state illustration container |
| `bg-botanical-icon`| `--color-botanical-icon`|`rgba(45,106,79,0.08)`| `rgba(0,200,150,0.08)`| Circular icon backdrop |
| `bg-outcome` | `--color-outcome` | `rgba(45,106,79,0.06)` | `rgba(0,200,150,0.07)` | Expected outcome highlight callouts |
| `bg-filter-active`| `--color-filter-active`| `rgba(45,106,79,0.1)` | `rgba(0,200,150,0.15)` | Active category filter tab |
| `bg-cta-link` | `--color-cta-link` | `rgba(45,106,79,0.08)` | `rgba(0,200,150,0.1)` | Card bottom action button |

---

### Typography Tokens

| Tailwind Class | Token Name | Light Value | Dark Value | Intended Usage |
|---|---|---|---|---|
| `text-primary` | `--color-primary` | `#1A2016` | `#EEF2FF` | Headings, titles, active labels, high-emphasis text |
| `text-secondary` | `--color-secondary` | `#4E6240` | `#94a3b8` | Body copy, descriptions, subheadings |
| `text-muted` | `--color-muted` | `#7D9470` | `#64748b` | Captions, timestamps, breadcrumbs, search placeholders |
| `text-subtle` | `--color-subtle` | `#A8BEA0` | `#475569` | Footer slogans, inactive indicators, subtle legal copy |
| `text-on-accent` | `--color-on-accent` | `#ffffff` | `#ffffff` | High contrast text placed on top of `bg-accent` or buttons |

---

### Accent & Brand Tokens

| Tailwind Class | Token Name | Light Value | Dark Value | Intended Usage |
|---|---|---|---|---|
| `bg-accent` / `text-accent` | `--color-accent` | `#2D6A4F` | `#00C896` | Primary brand botanical color, active icons, focus rings |
| `bg-accent-hover` | `--color-accent-hover` | `#245840` | `#33D4A8` | Accent hover state |
| `text-accent-light` | `--color-accent-light` | `#52B788` | `#33D4A8` | Pulse indicators, secondary highlights |
| `bg-accent-bg` | `--color-accent-bg` | `rgba(45,106,79,0.1)` | `rgba(0,200,150,0.1)` | Subtle accent washes & pills |
| `bg-accent-btn` | `--color-accent-btn` | `#2D6A4F` | `#00C896` | Solid primary CTA buttons |
| `bg-accent-btn-hover`| `--color-accent-btn-hover`| `#245840` | `#33D4A8` | Solid primary CTA button hover |

---

### Certification & Accolade Tokens (Gold / Amber)

| Tailwind Class | Token Name | Light Value | Dark Value | Intended Usage |
|---|---|---|---|---|
| `text-gold` / `bg-gold` | `--color-gold` | `#A0692E` | `#F5C842` | Standards authority checkmarks, gold accents |
| `text-gold-text` | `--color-gold-text` | `#B5773A` | `#F5C842` | High-contrast gold text labels |
| `bg-gold-bg` | `--color-gold-bg` | `rgba(160,105,46,0.08)`| `rgba(245,200,66,0.08)`| Subtle gold chip background |
| `bg-cert-sabs` | `--color-cert-sabs` | `rgba(160,105,46,0.07)`| `rgba(234,179,8,0.08)` | SABS certification badge fill |
| `border-border-cert-sabs` | `--color-border-cert-sabs` | `rgba(160,105,46,0.2)` | `rgba(234,179,8,0.2)` | SABS certification badge outline |
| `bg-cert-sahpra` | `--color-cert-sahpra` | `rgba(45,106,79,0.07)` | `rgba(0,200,150,0.08)` | SAHPRA certification badge fill |
| `border-border-cert-sahpra`| `--color-border-cert-sahpra`| `rgba(45,106,79,0.2)` | `rgba(0,200,150,0.2)` | SAHPRA certification badge outline |

---

### Border Tokens

| Tailwind Class | Token Name | Light Value | Dark Value | Intended Usage |
|---|---|---|---|---|
| `border-border` | `--color-border` | `rgba(0,0,0,0.09)` | `rgba(255,255,255,0.08)` | Default subtle card and divider border |
| `border-border-hover` | `--color-border-hover` | `rgba(0,0,0,0.16)` | `rgba(255,255,255,0.14)` | Hover outline on interactive cards |
| `border-border-accent` | `--color-border-accent` | `rgba(45,106,79,0.25)` | `rgba(0,200,150,0.22)` | Accent element borders and tags |
| `border-border-input` | `--color-border-input` | `rgba(0,0,0,0.1)` | `rgba(255,255,255,0.1)` | Text inputs & search fields |
| `border-border-outcome` | `--color-border-outcome`| `rgba(45,106,79,0.18)` | `rgba(0,200,150,0.2)` | Expected outcome callout border |
| `border-border-filter-active`| `--color-border-filter-active`| `rgba(45,106,79,0.35)`| `rgba(0,200,150,0.35)`| Active filter tab border |
| `border-border-dashed` | `--color-border-dashed` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.07)` | Dashed placeholder outline |
| `border-border-cta-link` | `--color-border-cta-link` | `rgba(45,106,79,0.25)` | `rgba(0,200,150,0.25)` | Card CTA button border |

---

### Elevation & Shadow Tokens

| Tailwind Class | Token Name | Light Value | Dark Value |
|---|---|---|---|
| `shadow-card` | `--shadow-card` | `0 2px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)` | `none` (relies on backdrop blur) |
| `shadow-card-hover` | `--shadow-card-hover` | `0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)` | `0 20px 40px rgba(0,0,0,0.4)` |
| `shadow-accent` | `--shadow-accent` | `0 4px 15px rgba(45,106,79,0.22)` | `0 4px 15px rgba(0,200,150,0.28)` |
| `shadow-accent-lg` | `--shadow-accent-lg` | `0 6px 20px rgba(45,106,79,0.22)` | `0 6px 20px rgba(0,200,150,0.28)` |
| `shadow-accent-hero` | `--shadow-accent-hero` | `0 6px 24px rgba(45,106,79,0.22)` | `0 6px 24px rgba(0,200,150,0.28)` |
| `shadow-accent-cta` | `--shadow-accent-cta` | `0 8px 30px rgba(45,106,79,0.22)` | `0 8px 30px rgba(0,200,150,0.28)` |

---

## 🚫 4. Strict Developer & Agent Rules

1. **NO Arbitrary Hex / RGBA Values in Components**:
   * ❌ `bg-[#00C896]`
   * ❌ `text-[#2D6A4F]`
   * ❌ `border-[rgba(0,0,0,0.1)]`
   * ✅ `bg-accent`
   * ✅ `text-accent`
   * ✅ `border-border`

2. **NO Inline CSS Style Objects for Colors**:
   * ❌ `<h3 style={{ color: 'var(--text-primary)' }}>Title</h3>`
   * ❌ `<div style={{ background: 'var(--bg-card)' }}>Card</div>`
   * ✅ `<h3 className="text-primary font-bold">Title</h3>`
   * ✅ `<div className="bg-card border border-border shadow-card">Card</div>`

3. **NO Imperative Mouse Event Listeners for Hover Colors**:
   * ❌ `onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}`
   * ✅ `className="text-muted hover:text-accent transition-colors"`

4. **Opacity Modifiers with Design Tokens**:
   * Tailwind tokens support opacity modifiers natively: `bg-accent/20`, `border-border/40`.

---

## 🏗️ 5. Component Token Recipes

### Card Recipe
```tsx
<article className="bg-card backdrop-blur-md border border-border hover:border-border-hover shadow-card hover:shadow-card-hover rounded-2xl transition-all duration-300">
  <h3 className="text-primary font-bold text-lg">Product Name</h3>
  <p className="text-secondary text-sm">Therapeutic indication summary...</p>
</article>
```

### Action Button Recipe
```tsx
<button className="bg-accent-btn hover:bg-accent-btn-hover text-on-accent shadow-accent hover:shadow-accent-lg px-5 py-2.5 rounded-xl font-semibold transition-all">
  Explore Catalog
</button>
```

### Search / Input Recipe
```tsx
<input
  type="search"
  placeholder="Search products..."
  className="w-full bg-input border border-border-input text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent rounded-xl px-4 py-2.5 text-sm"
/>
```
