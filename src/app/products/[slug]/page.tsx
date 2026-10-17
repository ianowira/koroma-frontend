import {CheckIcon} from "lucide-react";
import Image from 'next/image';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import {BackCta} from "@/components/atoms/BackCta";
import {BackLink} from "@/components/atoms/BackLink";
import {DocumentTextIcon} from "@/components/atoms/icons/DocumentTextIcon";
import {FlaskIcon} from "@/components/atoms/icons/FlaskIcon";
import {LightbulbIcon} from "@/components/atoms/icons/LightbulbIcon";
import { BotanicalTagList } from '@/components/molecules/BotanicalTagList';
import { InfoCard } from "@/components/molecules/InfoCard";
import {ProductBadges} from "@/components/molecules/ProductBadges";
import { getProductBySlug } from '@/lib/api';
import {getStrapiMediaUrl} from "@/lib/utils";
import {BadgeVariant} from "@/types/atoms";


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

export default async function ProductDetailPage({ params }: Readonly<Props>) {
  const { slug }  = await params;
  const product   = await getProductBySlug(slug);

  if (!product) notFound();

  const {
    name, indication, activeIngredients, pharmacologicalEffects,
    outcome, category, botanicals, isGeneric, cover,
  } = product;

  const catVariant = category?.name ? (CATEGORY_VARIANT[category.name] ?? 'sky') : 'sky';

  const rawImgUrl = cover?.formats?.large?.url ?? cover?.formats?.medium?.url ?? cover?.url;
  const coverImgUrl = getStrapiMediaUrl(rawImgUrl);

  return (
    <div className="min-h-screen">
      {/* ── Hero header ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 mesh-bg dot-grid opacity-60" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <BackLink href="/products" label="All Products" />

          {/* Badges */}
          <ProductBadges
              categoryName={category?.name}
              catVariant={catVariant}
              isGeneric={isGeneric}
          />

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
              <DocumentTextIcon className="w-4 h-4" />
            }
          />

          {/* Active Ingredients */}
          <InfoCard
            title="Active Ingredients"
            content={activeIngredients}
            icon={
              <FlaskIcon className="w-4 h-4" />
            }
          />


          {/* Pharmacological Effects */}
          <InfoCard
            title="Pharmacological Effects"
            content={pharmacologicalEffects}
            icon={
              <LightbulbIcon className="w-4 h-4" />
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
                  <CheckIcon className="w-4 h-4" />
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
        <BackCta href="/products" label="Back to all products" />
      </section>
    </div>
  );
}