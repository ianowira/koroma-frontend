@AGENTS.md

Connecting a Strapi backend to a frontend starts with establishing a clean data-fetching pattern. Pairing that with Atomic (Molecular) Design principles and creating an AI-agent-friendly system context document ensures AI assistants can build frontend components that map cleanly to your Strapi schemas.

---

### Phase 1: Architectural System Context

Create a top-level context file (e.g., `frontend/ai-design-system.md` or `CLAUDE.md`) in your repository. AI coding assistants read this document to understand design constraints and folder mappings.

```markdown
# Design System & Architecture Rules

## Core Principles
1. Atomic/Molecular Design Methodology:
   - Atoms: Native UI elements (Button, Input, Badge, Typography).
   - Molecules: Combinations of atoms (SearchBar, CardHeader, BotanicalBadgeList).
   - Organisms: Distinct UI sections (ProductCard, Navbar, Footer).
   - Templates: Layout structures page components slot into.
   - Pages: Route components that fetch data and populate Templates.

2. Design System Tokens:
   - Modern, clean, minimal aesthetic.
   - Primary: Deep Slate (`#0f172a`), Accent: Emerald/Sage (`#059669`).
   - Border Radius: Rounded-lg (`0.5rem`) default.
   - Spacing: 8-point grid scale (`p-2`, `p-4`, `p-8`).

3. Data Fetching & Strapi Integration:
   - Fetch using Next.js App Router Server Components / Fetch API.
   - Strapi API v5 responses output nested attributes directly.
   - Use `qs` library to construct populate queries.
```

---

### Phase 2: Connecting Front End to Back End

1. **Configure Environment Variables**
   In your frontend root, create `.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_generated_api_token_here
```


2. **Setup API Fetcher Utility** (`src/lib/strapi.ts`)
```typescript
import qs from 'qs';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchStrapi<T>(path: string, urlParams: Record<string, any> = {}): Promise<T> {
  const queryString = qs.stringify(urlParams, { encodeValuesOnly: true });
  const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(requestUrl, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 }, // ISR caching interval
  });

  if (!res.ok) throw new Error(`Failed to fetch Strapi data from ${path}`);
  const json = await res.json();
  return json.data;
}
```



---

### Phase 3: Molecular Design Folder Structure

Organize component files directly reflecting your atomic architecture:

```text
frontend/
└── src/
    ├── app/
    │   └── products/
    │       └── page.tsx              # Page Component
    ├── components/
    │   ├── atoms/
    │   │   ├── Badge.tsx             # Atom
    │   │   └── Button.tsx            # Atom
    │   ├── molecules/
    │   │   └── BotanicalTagList.tsx  # Molecule
    │   └── organisms/
    │       └── ProductCard.tsx       # Organism
    └── lib/
        └── strapi.ts                 # API Client
```

---

### Phase 4: Atomic Component Implementation Example

**1. Molecule: `BotanicalTagList.tsx**`

```tsx
import { Badge } from '@/components/atoms/Badge';

interface Botanical {
  id: number;
  name: string;
  scientificName?: string;
}

export function BotanicalTagList({ items }: { items: Botanical[] }) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {items.map((botanical) => (
        <Badge key={botanical.id} variant="emerald">
          {botanical.name}
        </Badge>
      ))}
    </div>
  );
}

```

**2. Organism: `ProductCard.tsx**`

```tsx
import { BotanicalTagList } from '@/components/molecules/BotanicalTagList';

export function ProductCard({ product }: { product: any }) {
  return (
    <div className="border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
      <p className="text-slate-600 text-sm mt-1">{product.description}</p>
      <BotanicalTagList items={product.botanicals} />
    </div>
  );
}
```

**3. Page Component: `app/products/page.tsx**`

```tsx
import { fetchStrapi } from '@/lib/strapi';
import { ProductCard } from '@/components/organisms/ProductCard';

export default async function ProductsPage() {
  // Query Strapi and populate the "botanicals" relation
  const products = await fetchStrapi<any[]>('/products', {
    populate: ['botanicals'],
  });

  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Biopharmaceutical Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
```