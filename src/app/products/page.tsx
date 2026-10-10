import type { Metadata } from 'next';
import { getProducts } from '@/lib/api';
import { ProductsFilter } from '@/components/organisms/ProductsFilter';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse the full Koroma Biopharmaceuticals product catalog — dermatological, cardiovascular, metabolic, and supplement formulations certified by SABS and SAHPRA.',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen">
      {/* ── Page header ── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 mesh-bg dot-grid opacity-70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
            <Link href="/" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-muted)' }}>
              Home
            </Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span style={{ color: 'var(--text-primary)' }}>Products</span>
          </div>

          <span className="accent-line mb-4" />
          <p className="section-label">Product Catalog</p>
          <h1 className="font-display font-black text-4xl lg:text-5xl mb-4 leading-tight" style={{ color: 'var(--text-primary)' }}>
            Our Pharmaceutical<br />
            <span className="gradient-text-emerald">Range</span>
          </h1>
          <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            All products are derived from natural botanical sources and certified by{' '}
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>SABS</span> and{' '}
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>SAHPRA</span>.
          </p>
        </div>
      </section>

      {/* ── Products grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        {products.length === 0 ? (
          <div className="py-28 text-center">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'var(--bg-botanical-icon)', border: '1px solid var(--border-accent)' }}
            >
              <svg className="w-9 h-9" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h2 className="font-display font-black text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>No Products Yet</h2>
            <p className="text-sm leading-relaxed max-w-sm mx-auto mb-6" style={{ color: 'var(--text-secondary)' }}>
              The product catalog is being populated. Add entries via the Strapi admin panel to see them here.
            </p>
            <a
              href="http://localhost:1337/admin"
              target="_blank"
              rel="noopener noreferrer"
              id="empty-state-admin-link"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ background: 'var(--accent-bg)', border: '1px solid var(--border-accent)', color: 'var(--accent)' }}
            >
              Open Strapi Admin
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        ) : (
          <ProductsFilter products={products} />
        )}
      </section>
    </div>
  );
}