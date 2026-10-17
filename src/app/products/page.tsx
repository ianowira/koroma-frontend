import type { Metadata } from 'next';

import { FlaskIcon } from "@/components/atoms/icons/FlaskIcon";
import { PageHeader } from '@/components/organisms/PageHeader';
import { ProductsFilter } from '@/components/organisms/ProductsFilter';
import { getProducts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Products',
  description:
      'Browse the full Koroma Biopharmaceuticals product catalog — dermatological, cardiovascular, metabolic, and supplement formulations certified by SABS and SAHPRA.',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
      <div className="min-h-screen">
        <PageHeader
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Products' },
            ]}
            sectionLabel="Product Catalog"
            title={
              <>
                Our Pharmaceutical<br />
                <span className="gradient-text-emerald">Range</span>
              </>
            }
            description={
              <>
                All products are derived from natural botanical sources and certified by{' '}
                <span className="font-medium text-primary">SABS</span> and{' '}
                <span className="font-medium text-primary">SAHPRA</span>.
              </>
            }
        />

        {/* ── Products grid ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
          {products.length === 0 ? (
              <div className="py-28 text-center">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 bg-botanical-icon border border-border-accent">
                  <FlaskIcon className="w-9 h-9 text-accent" strokeWidth={1.2} />
                </div>
                <h2 className="font-display font-black text-2xl mb-3 text-primary">No Products Yet</h2>
                <p className="text-sm leading-relaxed max-w-sm mx-auto mb-6 text-secondary">
                  The product catalog is being populated. Add entries via the Strapi admin panel to see them here.
                </p>
                <a
                    href="http://localhost:1337/admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="empty-state-admin-link"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-accent-bg border border-border-accent text-accent hover:bg-accent hover:text-on-accent"
                >
                  Open Strapi Admin
                </a>
              </div>
          ) : (
              <ProductsFilter products={products} />
          )}
        </section>
      </div>
  );
}