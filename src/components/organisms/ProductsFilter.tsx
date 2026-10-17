'use client';

import { FaceSlightlyFrowning, Search } from "lucide-react";
import { useState, useMemo } from 'react';

import { ProductCard } from '@/components/molecules/ProductCard';
import { Product } from '@/types/strapi';

const ALL = 'All';

export function ProductsFilter({ products }: Readonly<{ products: Product[] }>) {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [search, setSearch] = useState('');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => { if (p.category?.name) cats.add(p.category.name); });
    return [ALL, ...Array.from(cats).sort((a, b) => a.localeCompare(b))];
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted" stroke="currentColor" strokeWidth={2} />
          <input
            id="products-search"
            type="search"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-accent bg-input border border-border-input text-primary placeholder:text-muted"
          />
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                type="button"
                key={cat}
                id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? 'bg-filter-active border-border-filter-active text-accent'
                    : 'bg-pill border-border text-secondary hover:border-border-hover'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result count */}
      {(search || activeCategory !== ALL) ? (
        <p className="text-sm mb-6 text-muted">
          Showing <span className="font-medium text-primary">{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
        </p>
      ) : null}

      {/* ── Grid or empty state ── */}
      {filtered.length === 0 ? (
        <div className="py-28 text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-empty-icon border border-border"
          >
            <FaceSlightlyFrowning className="w-7 h-7 text-muted" stroke="currentColor" strokeWidth={1.5} />
          </div>
          <p className="font-medium mb-1 text-secondary">No products found</p>
          {search && (
            <button
              type="button"
              onClick={() => { setSearch(''); setActiveCategory(ALL); }}
              className="mt-2 text-sm transition-colors text-accent hover:text-accent-hover cursor-pointer"
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
