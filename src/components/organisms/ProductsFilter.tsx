'use client';

import { useState, useMemo } from 'react';

import { ProductCard } from '@/components/molecules/ProductCard';
import { Product } from '@/types/strapi';

const ALL = 'All';

export function ProductsFilter({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [search, setSearch] = useState('');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => { if (p.category?.name) cats.add(p.category.name); });
    return [ALL, ...Array.from(cats).sort()];
  }, [products]);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const matchesCat    = activeCategory === ALL || p.category?.name === activeCategory;
        const q             = search.toLowerCase();
        const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.indication.toLowerCase().includes(q);
        return matchesCat && matchesSearch;
      }),
    [products, activeCategory, search],
  );

  return (
    <div>
      {/* ── Search + tabs ── */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        {/* Search input */}
        <div className="relative max-w-xs w-full">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            style={{ color: 'var(--text-muted)' }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            id="products-search"
            type="search"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl transition-all focus:outline-none focus:ring-2"
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-input)',
              color: 'var(--text-primary)',
              focusRingColor: 'var(--accent)',
            } as React.CSSProperties}
          />
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: isActive ? 'var(--bg-filter-active)' : 'var(--bg-pill)',
                  border: isActive ? '1px solid var(--border-filter-active)' : '1px solid var(--border-default)',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result count */}
      {(search || activeCategory !== ALL) ? (
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          Showing <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
        </p>
      ) : null}

      {/* ── Grid or empty state ── */}
      {filtered.length === 0 ? (
        <div className="py-28 text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'var(--bg-empty-icon)', border: '1px solid var(--border-default)' }}
          >
            <svg className="w-7 h-7" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>No products found</p>
          {search && (
            <button
              onClick={() => { setSearch(''); setActiveCategory(ALL); }}
              className="mt-2 text-sm transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
