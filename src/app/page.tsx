'use client';

import {ChevronRight} from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

import { FlaskIcon } from "@/components/atoms/icons/FlaskIcon";
import { HeartIcon } from "@/components/atoms/icons/HeartIcon";
import { LightbulbIcon } from "@/components/atoms/icons/LightbulbIcon";
import { SunIcon } from "@/components/atoms/icons/SunIcon";

const CATEGORIES = [
  {
    id: 'derm', label: 'Dermatological',
    icon: <SunIcon className="w-6 h-6" />,
    products: ['EmiGlow®', 'Fungizuia®'],
    desc: 'Advanced botanical skin solutions for inflammatory conditions, fungal infections, photo-ageing, and wound healing.',
  },
  {
    id: 'degen', label: 'Degenerative Diseases',
    icon: <HeartIcon className="w-6 h-6" />,
    products: ['Obellite®', 'Cardiollite®'],
    desc: 'Metabolic syndrome, anti-obesity, and cardiovascular formulations for chronic degenerative disease management.',
  },
  {
    id: 'supp', label: 'Supplements',
    icon: <LightbulbIcon className="w-6 h-6" />,
    products: ['Bone Broth'],
    desc: 'Nutritional support for convalescing patients and those managing chronic degenerative conditions.',
  },
  {
    id: 'gen', label: 'Generics',
    icon: <FlaskIcon className="w-6 h-6" />,
    products: ['Flublock®'],
    desc: 'Plant-based bioactive generic alternatives to common pharmaceutical medications.',
  },
];

const FEATURED = [
  {
    id: 'emiglow', name: 'EmiGlow®', tag: 'Dermatological',
    headline: 'Radiant Skin from Nature',
    desc: 'Indicated for acne, psoriasis, eczema, rosacea, and other inflammatory skin conditions. Promotes collagen production and skin repair.',
    outcome: 'Bright, glowing and radiant spotless velvet-like skin.',
    from: 'Grapefruit · Rosemary · Lavender', slug: 'emiglow',
  },
  {
    id: 'obellite', name: 'Obellite®', tag: 'Metabolic',
    headline: 'Natural Weight Management',
    desc: 'Anti-obesity, anti-hyperglycaemic, and anti-hyperlipidaemic formulation. Reduces fat absorption, increases lipolysis and energy expenditure.',
    outcome: 'Improved metabolism, reduced insulin resistance, and weight stabilisation.',
    from: 'Grapefruit · Ginger · Garlic', slug: 'obellite',
  },
  {
    id: 'cardiollite', name: 'Cardiollite®', tag: 'Cardiovascular',
    headline: 'Heart Health, Naturally Protected',
    desc: 'Antihypertensive and cardioprotective. Reduces blood pressure, prevents cardiac fibrosis and dyslipidaemia. Inhibits ACE activity.',
    outcome: 'Reduced systolic/diastolic pressure, improved cholesterol levels.',
    from: 'Grapefruit · Garlic · Ginger · Cucumber', slug: 'cardiollite',
  },
];

const BOTANICALS = [
  { id: 1, emoji: '🍊', name: 'Grapefruit',  sci: 'Citrus paradisi',       note: 'Polyphenols, Nootkatone' },
  { id: 2, emoji: '🌿', name: 'Rosemary',    sci: 'Salvia rosmarinus',      note: 'Carnosic & Rosmarinic acid' },
  { id: 3, emoji: '💜', name: 'Lavender',    sci: 'Lavandula angustifolia', note: 'Anti-inflammatory' },
  { id: 4, emoji: '🧄', name: 'Garlic',      sci: 'Allium sativum',         note: 'Allicin, Ajoene' },
  { id: 5, emoji: '🌵', name: 'Aloe Vera',   sci: 'Aloe barbadensis',       note: 'Anthraquinones, Saponins' },
  { id: 6, emoji: '🫚', name: 'Ginger',      sci: 'Zingiber officinale',    note: '6-Gingerol' },
  { id: 7, emoji: '🥒', name: 'Cucumber',    sci: 'Cucumis sativus',        note: 'Lycopene, Vitamin C' },
];

export default function HomePage() {
  return (
    <>
      {/* ══ HERO ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 dot-grid opacity-40" />

        {/* Ambient orbs */}
        <div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none animate-orb bg-orb-accent"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none animate-orb-r bg-orb-indigo"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          {/* ── Left: Text ── */}
          <div>
            {/* Status pill */}
            <div
              className="animate-fade-up inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-8 text-sm font-medium bg-accent-bg border border-border-accent text-accent"
            >
              <span className="w-2 h-2 rounded-full animate-pulse-dot bg-accent" />{" "}
              SABS &amp; SAHPRA Certified · South Africa
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-up delay-100 font-display font-black tracking-tight leading-[1.04] mb-6 text-primary text-[clamp(2.8rem,6vw,4.75rem)]"
            >
              Nature&rsquo;s
              <br />
              <span className="gradient-text-emerald">Science.</span>
              <br />
              Proven Results.
            </h1>

            <p
              className="animate-fade-up delay-200 text-lg leading-relaxed max-w-lg mb-8 text-secondary"
            >
              Koroma Biopharmaceuticals manufactures pharmaceutical-grade medicines entirely derived from botanical natural sources — rigorously tested and certified for safety.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-300 flex flex-wrap gap-4 mb-12">
              <Link
                href="/products"
                id="hero-cta-products"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 bg-accent-btn text-on-accent shadow-accent-hero hover:bg-accent-btn-hover"
              >
                Explore Products
                <ChevronRight className="w-4 h-4" stroke="currentColor"  strokeWidth={2.5}/>
              </Link>
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 border border-border text-secondary hover:border-border-hover hover:text-primary"
              >
                Our Story
              </a>
            </div>

            {/* Stats */}
            <div className="animate-fade-up delay-400 flex gap-10">
              {[
                { num: '6+',   label: 'Products'       },
                { num: '100%', label: 'Natural'         },
                { num: '2',    label: 'Certifications'  },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display font-black text-3xl text-accent">{s.num}</p>
                  <p className="text-xs mt-0.5 uppercase tracking-wider text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Hero botanical image ── */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in delay-500">
            <div className="relative w-full max-w-md">
              <div
                className="absolute inset-8 rounded-full blur-3xl bg-orb-accent"
              />
              <div
                className="relative rounded-3xl overflow-hidden animate-float-a border border-border-accent"
              >
                <Image
                  src="/botanicals-hero.jpg"
                  alt="Botanical ingredients used in Koroma Biopharmaceuticals products"
                  width={520} height={693}
                  className="w-full h-auto"
                  priority
                />
                <div
                  className="absolute inset-0 img-overlay-detail"
                />
              </div>

              {/* Floating label chip */}
              <div
                className="absolute -bottom-4 -left-4 flex items-center gap-3 px-4 py-3 rounded-2xl animate-float-b bg-card backdrop-blur-xl border border-border-accent shadow-card"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-botanical-icon">
                  <span className="text-lg">🌿</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-primary">7 Botanical Sources</p>
                  <p className="text-[10px] text-accent">100% Natural Extracts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-xs tracking-widest uppercase text-muted">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-muted to-transparent" />
        </div>
      </section>

      {/* ══ TRUST STRIP ═════════════════════════════════════════════════ */}
      <section className="border-y border-border bg-trust-strip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-3">
            {[
              { icon: '✓', label: 'SABS Certified',               tintClass: 'text-gold' },
              { icon: '✓', label: 'SAHPRA Certified',              tintClass: 'text-accent' },
              { icon: '🌿', label: '100% Natural Botanical Sources', tintClass: 'text-secondary' },
              { icon: '🇿🇦', label: 'Proudly South African',         tintClass: 'text-secondary' },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-2.5">
                <span className={`${t.tintClass} text-[0.9rem]`}>{t.icon}</span>
                <span className="text-sm font-medium text-secondary">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRODUCT CATEGORIES ══════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <span className="accent-line mb-4" />
            <p className="section-label">Our Pharmaceutical Range</p>
            <h2 className="font-display font-black text-4xl lg:text-5xl leading-tight text-primary">
              Solutions for Every<br />
              <span className="gradient-text-emerald">Health Challenge</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href="/products"
                id={`category-${cat.id}`}
                className="group relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 bg-card border border-border hover:border-border-accent shadow-card hover:shadow-card-hover"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 bg-botanical-icon text-accent"
                >
                  {cat.icon}
                </div>

                {/* Product pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cat.products.map((p) => (
                    <span
                      key={p}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-pill text-secondary"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <h3 className="font-bold text-base mb-2 text-primary">{cat.label}</h3>
                <p className="text-sm leading-relaxed flex-1 text-secondary">{cat.desc}</p>

                <div
                  className="inline-flex items-center gap-1.5 mt-5 text-xs font-semibold transition-all duration-200 group-hover:gap-2.5 text-accent"
                >
                  Explore
                  <ChevronRight className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2.5} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PRODUCTS ═══════════════════════════════════════════ */}
      <section className="py-24 relative bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <span className="accent-line mb-4" />
              <p className="section-label">Flagship Solutions</p>
              <h2 className="font-display font-black text-4xl lg:text-5xl leading-tight text-primary">
                Leading Products
              </h2>
            </div>
            <Link
              href="/products"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold transition-colors text-accent hover:text-accent-hover"
            >
              View full catalog
              <ChevronRight className="w-4 h-4" stroke="currentColor" strokeWidth={2.5} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED.map((f) => (
              <article
                key={f.id}
                className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 bg-card border border-border shadow-card hover:shadow-card-hover"
              >
                <div className="h-0.5 w-full bg-gradient-to-r from-accent to-transparent" />

                <div className="p-6 flex flex-col flex-1">
                  <span
                    className="self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-4 bg-accent-bg text-accent border border-border-accent"
                  >
                    {f.tag}
                  </span>

                  <h3 className="font-display font-black text-2xl mb-1 text-primary">{f.name}</h3>
                  <p className="text-xs font-medium mb-4 tracking-wide text-accent">{f.headline}</p>
                  <p className="text-sm leading-relaxed flex-1 mb-4 text-secondary">{f.desc}</p>

                  {/* Outcome */}
                  <div
                    className="rounded-xl p-3.5 mb-4 bg-outcome border border-border-outcome"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-accent">Outcome</p>
                    <p className="text-xs leading-relaxed text-secondary">{f.outcome}</p>
                  </div>

                  <p className="text-xs mb-5 text-muted">
                    <span>Derived from: </span>{f.from}
                  </p>

                  <Link
                    href={`/products/${f.slug}`}
                    className="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200 bg-cta-link border border-border-cta-link text-accent hover:bg-accent-bg hover:border-accent"
                  >
                    Learn More
                    <ChevronRight className={"w-4 h-4"} stroke="currentColor" strokeWidth={2.5} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BOTANICALS ══════════════════════════════════════════════════ */}
      <section id="botanicals" className="py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="accent-line mx-auto mb-4" />
            <p className="section-label justify-center">Botanical Sources</p>
            <h2 className="font-display font-black text-4xl lg:text-5xl mb-4 text-primary">
              Sourced from <span className="gradient-text-emerald">Nature</span>
            </h2>
            <p className="max-w-xl mx-auto leading-relaxed text-secondary">
              Seven carefully selected botanical species power our entire product range — each chosen for its scientifically validated bioactive properties.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {BOTANICALS.map((b, i) => (
              <div
                key={b.id}
                className="group flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 bg-card border border-border hover:border-border-accent shadow-card"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-all duration-300 group-hover:scale-110 bg-botanical-icon border border-border-accent"
                >
                  {b.emoji}
                </div>
                <h3 className="font-bold text-sm mb-1 text-primary">{b.name}</h3>
                <p className="text-xs italic mb-2 leading-snug text-muted">{b.sci}</p>
                <p className="text-[10px] font-medium text-accent">{b.note}</p>
              </div>
            ))}
            <div
              className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-section-alt border border-dashed border-border-dashed"
            >
              <p className="text-xs text-subtle">More ingredients<br />being researched</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ═══════════════════════════════════════════════════ */}
      <section
        id="about"
        className="py-28 relative border-t bg-section-alt border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { num: '2026',   label: 'Founded' },
                { num: '6+',     label: 'Products in Pipeline' },
                { num: 'SABS',   label: 'Standards Certified' },
                { num: 'SAHPRA', label: 'Health Authority' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-6 bg-stat-card border border-border shadow-card"
                >
                  <p className="font-display font-black text-4xl mb-1 text-accent">{s.num}</p>
                  <p className="text-sm text-secondary">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Text */}
            <div>
              <span className="accent-line mb-4" />
              <p className="section-label">About Koroma</p>
              <h2 className="font-display font-black text-4xl lg:text-5xl leading-tight mb-6 text-primary">
                Where <span className="gradient-text-emerald">Botany</span><br />Meets Science
              </h2>
              <div className="space-y-4 leading-relaxed text-secondary">
                <p>
                  Koroma Biopharmaceuticals (Pty) Ltd (Reg: 2026/252880/07) is a South African company specialising in the manufacture and distribution of pharmaceutical products derived entirely from natural botanical sources.
                </p>
                <p>
                  Our formulations are certified by the{' '}
                  <strong className="text-primary font-semibold">South African Bureau of Standards (SABS)</strong> and the{' '}
                  <strong className="text-primary font-semibold">South African Health Products Regulatory Authority (SAHPRA)</strong>, ensuring every product meets the highest safety and efficacy standards.
                </p>
                <p>
                  We bridge the gap between traditional botanical knowledge and modern pharmaceutical science — extracting, purifying, and formulating bioactive compounds for maximum therapeutic effect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div
          className="absolute inset-0 bg-banner-cta"
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-black text-4xl lg:text-5xl mb-4 leading-tight text-primary">
            Ready to Explore<br />
            <span className="gradient-text">Our Full Catalog?</span>
          </h2>
          <p className="text-lg mb-10 leading-relaxed text-secondary">
            Browse all SABS &amp; SAHPRA certified natural pharmaceutical products. Filter by category or search by condition.
          </p>
          <Link
            href="/products"
            id="cta-explore-catalog"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:-translate-y-0.5 bg-accent-btn text-on-accent shadow-accent-cta hover:bg-accent-btn-hover"
          >
            Browse Products
            <ChevronRight className="w-5 h-5" stroke="currentColor" strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </>
  );
}
