# Koroma Biopharmaceuticals — Frontend Architecture & Component Guide

This document details the Next.js 16 App Router architecture, component design system, theme engine, and data fetching integration for `koroma_biopharmaceuticals_app/frontend`.

---

## 🏗️ 1. Tech Stack Overview

* **Framework**: Next.js 16.3 (Turbopack / Webpack hybrid build support)
* **React Version**: React 19
* **Styling System**: Tailwind CSS v4 (`@import "tailwindcss"`) + CSS Custom Properties (`var(--...)`)
* **Theme Management**: Dynamic client-side theme engine with `localStorage` persistence and zero-flicker hydration
* **Typography**: Google Fonts via `next/font/google` (`Inter` for body text, `DM Sans` for display headlines)

---

## 🎨 2. Dual-Theme Design System

The application uses CSS Custom Properties defined in [`src/app/globals.css`](file:///Users/ian/Workspace/Apps/koroma_biopharmaceuticals_app/frontend/src/app/globals.css) to support instant switching between **Botanical Light Theme** (default) and **Bio-luminescent Dark Theme**.

### Theme Tokens Mapping

| Token Name | Light Theme Purpose | Dark Theme Purpose |
|---|---|---|
| `--bg-page` | `#F5F3EE` (Warm botanical parchment) | `#040C1A` (Deep navy blue) |
| `--bg-card` | `rgba(255, 255, 255, 0.9)` (Elevated white card) | `rgba(13, 30, 53, 0.55)` (Glassmorphic dark card) |
| `--text-primary` | `#1A2016` (Deep charcoal green) | `#EEF2FF` (Crisp white) |
| `--text-secondary` | `#4E6240` (Muted herbal green) | `#94a3b8` (Slate secondary) |
| `--accent` | `#2D6A4F` (Forest green accent) | `#00C896` (Emerald bioluminescent accent) |
| `--accent-shadow` | `rgba(45, 106, 79, 0.22)` | `rgba(0, 200, 150, 0.28)` |
| `--gold` | `#A0692E` (Warm amber gold) | `#F5C842` (Bright yellow gold) |
| `--card-shadow` | `0 2px 16px rgba(0,0,0,0.07)` | `none` (Uses backdrop-filter blur) |

### Theme Switcher Architecture
- **Provider**: [`src/providers/ThemeProvider.tsx`](file:///Users/ian/Workspace/Apps/koroma_biopharmaceuticals_app/frontend/src/providers/ThemeProvider.tsx) wraps the app inside `RootLayout`. It reads the saved preference from `localStorage.getItem('koroma-theme')` and sets the `data-theme` attribute on `document.documentElement`.
- **Toggle Component**: [`src/components/atoms/ThemeToggle.tsx`](file:///Users/ian/Workspace/Apps/koroma_biopharmaceuticals_app/frontend/src/components/atoms/ThemeToggle.tsx) renders an animated slider button in the Navbar that switches between Sun (Light) and Moon (Dark) icons.

---

## 🧩 3. Component Hierarchy (Atomic Design)

```
src/
├── app/
│   ├── layout.tsx              # Root layout with ThemeProvider, fonts, metadata
│   ├── page.tsx                # Homepage (Hero, Trust Strip, Categories, Featured, Botanicals, About, CTA)
│   ├── globals.css             # CSS custom properties, keyframes, Tailwind v4
│   └── products/
│       ├── page.tsx            # Product Catalog listing page
│       └── [slug]/
│           └── page.tsx        # Product Detail page (slug dynamic route)
├── components/
│   ├── atoms/
│   │   ├── Badge.tsx           # Multi-variant pill badge (emerald, gold, indigo, violet, amber, muted)
│   │   ├── Button.tsx          # Reusable styled button
│   │   └── ThemeToggle.tsx     # Animated Sun/Moon theme toggle switch
│   ├── molecules/
│   │   ├── BotanicalTagList.tsx# Horizontal tag list for botanical ingredients
│   │   └── ProductCard.tsx     # Product card featuring 16:9 photo cover, category badge, indicator summary
│   └── organisms/
│       ├── Navbar.tsx          # Scroll-reactive glass navigation bar
│       ├── Footer.tsx          # Multi-column footer with SABS/SAHPRA certification badges & product links
│       └── ProductsFilter.tsx  # Search input & category filter tabs with real-time filtering
├── lib/
│   └── api.ts                  # Strapi v5 fetch client (getProducts, getProductBySlug)
├── providers/
│   └── ThemeProvider.tsx       # Theme Context Provider
└── types/
    └── strapi.ts               # TypeScript interfaces for Product, Category, Botanical, StrapiMedia
```

---

## 📡 4. Data Integration (`lib/api.ts`)

The API client in [`src/lib/api.ts`](file:///Users/ian/Workspace/Apps/koroma_biopharmaceuticals_app/frontend/src/lib/api.ts) handles data fetching from Strapi:

```typescript
// Authentication header helper
function authHeaders(): Record<string, string> {
  const token = process.env.STRAPI_API_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Fetch all products sorted by name with relations & cover photo populated
export async function getProducts(): Promise<Product[]> { ... }

// Fetch single product by unique slug
export async function getProductBySlug(slug: string): Promise<Product | null> { ... }
```

---

## 📸 5. Image Pipeline & Whitelisting

Product cover photos uploaded to Strapi (`http://localhost:1337/uploads/...`) are optimized and served via Next.js `Image`.

Remote pattern configuration in [`next.config.ts`](file:///Users/ian/Workspace/Apps/koroma_biopharmaceuticals_app/frontend/next.config.ts):
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
```
