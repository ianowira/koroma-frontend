'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Badge, BadgeVariant } from '@/components/atoms/Badge';
import { BotanicalTagList } from '@/components/molecules/BotanicalTagList';
import { Product } from '@/types/strapi';

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? 'http://localhost:1337';

const CATEGORY_VARIANT: Record<string, BadgeVariant> = {
  'Dermatological':        'emerald',
  'Degenerative Diseases': 'indigo',
  'Supplements':           'amber',
  'Generics':              'violet',
};

const placeholderEmoji: Record<string, string> = {
  'Dermatological': '🌿', 'Degenerative Diseases': '💊',
  'Supplements': '🥣', 'Generics': '🧪',
};

export function ProductCard({ product }: { product: Product }) {
  const { name, slug, indication, category, botanicals, isGeneric, cover } = product;
  const catName    = category?.name;
  const catVariant = catName ? (CATEGORY_VARIANT[catName] ?? 'sky') : 'sky';

  const imgUrl     = cover?.formats?.medium?.url ?? cover?.url;
  const fullImgUrl = imgUrl
    ? (imgUrl.startsWith('http') ? imgUrl : `${BASE_URL}${imgUrl}`)
    : null;

  return (
    <article
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(14px)',
        border: '1px solid var(--border-default)',
        boxShadow: 'var(--card-shadow)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--card-shadow-hover)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--card-shadow)';
      }}
    >
      {/* ── Image / placeholder ── */}
      <div className="relative h-48 overflow-hidden">
        {fullImgUrl ? (
          <>
            <Image
              src={fullImgUrl}
              alt={cover?.alternativeText ?? name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0" style={{ background: 'var(--img-overlay-card)' }} />
          </>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'var(--bg-section-alt)' }}
          >
            <span className="text-5xl opacity-30">{placeholderEmoji[catName ?? ''] ?? '💊'}</span>
          </div>
        )}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, var(--accent), transparent)` }}
        />
      </div>

      <div className="flex flex-col flex-1 p-6">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {catName   && <Badge variant={catVariant}>{catName}</Badge>}
          {isGeneric && <Badge variant="muted">Generic</Badge>}
        </div>

        {/* Name */}
        <h3 className="font-bold text-lg leading-snug mb-2 transition-colors" style={{ color: 'var(--text-primary)' }}>
          {name}
        </h3>

        {/* Indication */}
        <p className="text-sm leading-relaxed line-clamp-3 flex-1 mb-4" style={{ color: 'var(--text-secondary)' }}>
          {indication}
        </p>

        {/* Botanicals */}
        <BotanicalTagList items={botanicals} max={3} className="mb-5" />

        {/* CTA */}
        <Link
          href={`/products/${slug}`}
          className="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
          style={{
            background: 'var(--bg-cta-link)',
            border: '1px solid var(--border-cta-link)',
            color: 'var(--accent)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'var(--accent-bg)';
            el.style.borderColor = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'var(--bg-cta-link)';
            el.style.borderColor = 'var(--border-cta-link)';
          }}
        >
          View Details
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
