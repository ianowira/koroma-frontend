# Koroma Biopharmaceuticals – Frontend

Public website for Koroma Biopharmaceuticals: a searchable product catalog with product detail pages and a light/dark theme. Built with [Next.js](https://nextjs.org) (App Router), React, TypeScript and Tailwind CSS. Content comes from the Strapi backend (`koroma-backend`).

## Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Using the site](#using-the-site)
- [How data is fetched](#how-data-is-fetched)
- [Scripts](#scripts)
- [Running with Docker](#running-with-docker)
- [Project structure](#project-structure)
- [Customising](#customising)
- [CI/CD and releases](#cicd-and-releases)
- [Security notes](#security-notes)
- [Troubleshooting](#troubleshooting)

## Features

- Home page, product catalog (`/products`) and product detail pages (`/products/<slug>`)
- Client-side search (name or indication) and category filter tabs
- Botanical ingredient tags and cover images per product
- Light/dark theme toggle (`ThemeProvider`)
- Server-side data fetching with 60-second revalidation (ISR)
- Graceful fallback: if the backend is unreachable, pages render with an empty list instead of crashing

## Prerequisites

- Node.js 20+ (22 recommended)
- Corepack for pnpm: `corepack enable`
- A running backend. See the backend README. It must have **published** products and an API token (or public `find`/`findOne` permissions).

## Quick start

```bash
# 1. Install dependencies
corepack enable
pnpm install --frozen-lockfile

# 2. Configure the environment
cp .env.example .env.local
#    edit .env.local, see the table below

# 3. Start the dev server (backend should be running on :1337)
pnpm dev
```

Open <http://localhost:3000>.

## Environment variables

Put these in `.env.local` (gitignored). Use [`.env.example`](./.env.example) as a template.

| Variable | Default | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_STRAPI_API_URL` | `http://localhost:1337` | Base URL of the Strapi backend. Exposed to the browser |
| `STRAPI_API_TOKEN` | – | Strapi API token, sent as `Authorization: Bearer`. **Server-only**, never prefix with `NEXT_PUBLIC_` |

To create the token: Strapi admin → **Settings → API Tokens → Create new API Token** (type *Read-only*).

## Using the site

| Route | What it shows |
| --- | --- |
| `/` | Landing page |
| `/products` | Full catalog. Type in the search box to filter by name or indication, and click a category tab to filter by category |
| `/products/<slug>` | Product detail: indication, active ingredients, pharmacological effects, outcome, category and botanicals |

Use the sun/moon button in the navbar to switch themes. The choice is remembered.

### Adding or changing products

Content is managed in the Strapi admin panel (<http://localhost:1337/admin>), not in this repo. After you **publish** a product it appears on the site within about 60 seconds (the revalidation window). Restart the dev server or rebuild if you want to see it immediately.

## How data is fetched

[`src/lib/api.ts`](./src/lib/api.ts) wraps the Strapi REST API:

- `getProducts()` → `GET /api/products?populate[category]=true&populate[botanicals]=true&populate[cover]=true&sort=name:asc`
- `getProductBySlug(slug)` → `GET /api/products?filters[slug][$eq]=<slug>&populate…`

Types for Strapi v5's flat response format are in [`src/types/strapi.ts`](./src/types/strapi.ts).

Cover images are served from the backend's `/uploads/**`. Allowed image hosts are defined in [`next.config.ts`](./next.config.ts), which currently permits `http://localhost:1337`. **Add your production backend host to `images.remotePatterns` before deploying.**

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server with hot reload |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build (run `build` first) |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run component & unit tests with Vitest |
| `pnpm run commit` | Commitizen conventional commit prompt |

## Running with Docker

```bash
docker build -t koroma-frontend .
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337 \
  -e STRAPI_API_TOKEN=<token> \
  koroma-frontend
```

The image installs from the frozen lockfile, runs as the non-root `node` user and starts `pnpm run dev` on port `3000`. In the main `koroma_biopharmaceuticals_app` project use `docker compose up frontend` (it also starts the backend and database).

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # root layout, fonts, theme provider
│   ├── page.tsx              # home page
│   ├── globals.css           # Tailwind + theme variables
│   └── products/
│       ├── page.tsx          # catalog
│       └── [slug]/page.tsx   # product detail
├── components/               # atomic design
│   ├── atoms/                # Badge, Button, ThemeToggle
│   ├── molecules/            # ProductCard, BotanicalTagList
│   └── organisms/            # Navbar, Footer, ProductsFilter
├── lib/api.ts                # Strapi client
├── providers/ThemeProvider.tsx
└── types/strapi.ts           # API types
```

## Customising

- **Colours and theme:** CSS variables in `src/app/globals.css`
- **New fields on products:** add them in the Strapi schema, then update `Product` in `src/types/strapi.ts` and the relevant components
- **New pages:** add a folder under `src/app/` with a `page.tsx`
- **Path alias:** `@/` points to `src/`

> This project uses a recent Next.js release with breaking changes. See [`AGENTS.md`](./AGENTS.md) and `node_modules/next/dist/docs/` before changing framework-level code.

## CI/CD and releases

GitHub Actions workflows in [`.github/workflows`](./.github/workflows):

- **CI** runs lint, production build and a Docker build on every PR and push to `main`.
- **Security** runs gitleaks, dependency review, `pnpm audit`, Trivy and CodeQL, also weekly.
- **Release Please** opens a release PR from [Conventional Commits](https://www.conventionalcommits.org) and tags a release when merged.
- **Dependabot** opens grouped dependency PRs every Monday.

## Security notes

- `.env.local` holds a real API token. Keep it out of Git. If it was ever committed or shared, **rotate it** in Strapi.
- Use a read-only token, and keep it server-side (no `NEXT_PUBLIC_` prefix).
- The container runs as a non-root user.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Product list is empty | Check the backend is running, products are **published**, and the token is valid. Errors are logged as `[api] getProducts:` in the server console |
| `403` in the server log | Token is missing/invalid, or lacks `find` permission |
| Images do not load | Host not in `images.remotePatterns` in `next.config.ts` |
| Changes in Strapi not visible | Wait up to 60 s (ISR) or restart |
| `ERR_PNPM_OUTDATED_LOCKFILE` | Run `pnpm install` locally and commit `pnpm-lock.yaml` |
