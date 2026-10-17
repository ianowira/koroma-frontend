import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import { Badge, BadgeVariant } from '@/components/atoms/Badge';
import { BotanicalTagList } from '@/components/molecules/BotanicalTagList';
import { getProductBySlug } from '@/lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? 'http://localhost:1337';

const CATEGORY_VARIANT: Record<string, BadgeVariant> = {
  'Dermatological':        'emerald',
  'Degenerative Diseases': 'indigo',
  'Supplements':           'amber',
  'Generics':              'violet',
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.indication,
  };
}

function InfoCard({ title, content, icon }: { title: string; content: string; icon: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6 transition-all duration-200 bg-info-card border border-border shadow-card"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-botanical-icon text-accent"
        >
          {icon}
        </div>
        <h2 className="font-bold text-sm uppercase tracking-wider text-primary">{title}</h2>
      </div>
      <p className="text-sm leading-relaxed whitespace-pre-line text-secondary">{content}</p>
    </div>
  );
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug }  = await params;
  const product   = await getProductBySlug(slug);

  if (!product) notFound();

  const {
    name, indication, activeIngredients, pharmacologicalEffects,
    outcome, category, botanicals, isGeneric, cover,
  } = product;

  const catVariant = category?.name ? (CATEGORY_VARIANT[category.name] ?? 'sky') : 'sky';

  const rawImgUrl  = cover?.formats?.large?.url ?? cover?.formats?.medium?.url ?? cover?.url;
  const coverImgUrl = rawImgUrl
    ? (rawImgUrl.startsWith('http') ? rawImgUrl : `${BASE_URL}${rawImgUrl}`)
    : null;

  return (
    <div className="min-h-screen">
      {/* ── Hero header ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 mesh-bg dot-grid opacity-60" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/products"
            id="product-back-link"
            className="inline-flex items-center gap-2 text-sm transition-colors mb-8 group text-muted hover:text-primary"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Products
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap gap-2.5 mb-5">
            {category?.name && <Badge variant={catVariant}>{category.name}</Badge>}
            {isGeneric && <Badge variant="muted">Generic</Badge>}
            <Badge variant="gold">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              SABS Certified
            </Badge>
          </div>

          {/* Product name */}
          <h1 className="font-display font-black text-5xl lg:text-6xl leading-tight mb-5 text-primary">
            {name}
          </h1>

          {/* Botanicals strip */}
          {botanicals && botanicals.length > 0 && (
            <BotanicalTagList items={botanicals} max={6} />
          )}
        </div>
      </section>

      {/* ── Cover image ── */}
      {coverImgUrl && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8">
          <div
            className="relative w-full h-72 lg:h-96 rounded-2xl overflow-hidden border border-border shadow-card-hover"
          >
            <Image
              src={coverImgUrl}
              alt={cover?.alternativeText ?? name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
            <div className="absolute inset-0 img-overlay-detail" />
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="grid gap-5">

          {/* Indication */}
          <InfoCard
            title="Indication"
            content={indication}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />

          {/* Active Ingredients */}
          <InfoCard
            title="Active Ingredients"
            content={activeIngredients}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            }
          />

          {/* Pharmacological Effects */}
          <InfoCard
            title="Pharmacological Effects"
            content={pharmacologicalEffects}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
          />

          {/* Expected Outcome */}
          {outcome && (
            <div
              className="rounded-2xl p-6 bg-outcome border border-border-outcome shadow-card"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-botanical-icon text-accent"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-bold text-sm uppercase tracking-wider text-accent">Expected Outcome</h2>
              </div>
              <p className="text-sm leading-relaxed text-primary">{outcome}</p>
            </div>
          )}

          {/* Botanical Sources */}
          {botanicals && botanicals.length > 0 && (
            <div
              className="rounded-2xl p-6 bg-info-card border border-border shadow-card"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-botanical-icon text-accent"
                >
                  <span className="text-sm">🌿</span>
                </div>
                <h2 className="font-bold text-sm uppercase tracking-wider text-primary">Botanical Sources</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {botanicals.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-outcome border border-border-outcome"
                  >
                    <span className="mt-0.5 text-lg shrink-0 text-accent">🌱</span>
                    <div>
                      <p className="text-sm font-semibold text-primary">{b.name}</p>
                      {b.scientificName && (
                        <p className="text-xs italic mt-0.5 text-muted">{b.scientificName}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Back CTA */}
        <div className="mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-pill border border-border text-secondary hover:border-border-hover hover:text-primary"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to all products
          </Link>
        </div>
      </section>
    </div>
  );
}