'use client';

import { ChevronRight } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/atoms/Badge';
import { BotanicalTagList } from '@/components/molecules/BotanicalTagList';
import { getStrapiMediaUrl } from "@/lib/utils";
import { BadgeVariant } from "@/types/atoms";
import { Product } from '@/types/strapi';

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

export function ProductCard({ product }: Readonly<{ product: Product }>) {
  const { name, slug, indication, category, botanicals, isGeneric, cover } = product;
  const catName    = category?.name;
  const catVariant = catName ? (CATEGORY_VARIANT[catName] ?? 'sky') : 'sky';

  const imgUrl     = cover?.formats?.medium?.url ?? cover?.url;
  const fullImgUrl = getStrapiMediaUrl(imgUrl);

  return (
    <article
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 bg-card backdrop-blur-md border border-border hover:border-border-hover shadow-card hover:shadow-card-hover"
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
            <div className="absolute inset-0 img-overlay-card" />
          </>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-section-alt"
          >
            <span className="text-5xl opacity-30">{placeholderEmoji[catName ?? ''] ?? '💊'}</span>
          </div>
        )}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-transparent"
        />
      </div>

      <div className="flex flex-col flex-1 p-6">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {catName   && <Badge variant={catVariant}>{catName}</Badge>}
          {isGeneric && <Badge variant="muted">Generic</Badge>}
        </div>

        {/* Name */}
        <h3 className="font-bold text-lg leading-snug mb-2 transition-colors text-primary">
          {name}
        </h3>

        {/* Indication */}
        <p className="text-sm leading-relaxed line-clamp-3 flex-1 mb-4 text-secondary">
          {indication}
        </p>

        {/* Botanicals */}
        <BotanicalTagList items={botanicals} max={3} className="mb-5" />

        {/* CTA */}
        <Link
          href={`/products/${slug}`}
          className="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200 bg-cta-link border border-border-cta-link text-accent hover:bg-accent-bg hover:border-accent"
        >
          View Details
          <ChevronRight className="w-4 h-4 shrink-0" />
        </Link>
      </div>
    </article>
  );
}
