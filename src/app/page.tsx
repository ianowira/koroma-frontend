'use client';

import Image from 'next/image';
import Link from 'next/link';

const CATEGORIES = [
  {
    id: 'derm', label: 'Dermatological',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.02 12.02.707.707M3 12h1m16 0h1M4.927 19.073l.707-.707M18.364 5.636l.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" /></svg>,
    products: ['EmiGlow®', 'Fungizuia®'],
    desc: 'Advanced botanical skin solutions for inflammatory conditions, fungal infections, photo-ageing, and wound healing.',
  },
  {
    id: 'degen', label: 'Degenerative Diseases',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>,
    products: ['Obellite®', 'Cardiollite®'],
    desc: 'Metabolic syndrome, anti-obesity, and cardiovascular formulations for chronic degenerative disease management.',
  },
  {
    id: 'supp', label: 'Supplements',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    products: ['Bone Broth'],
    desc: 'Nutritional support for convalescing patients and those managing chronic degenerative conditions.',
  },
  {
    id: 'gen', label: 'Generics',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
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
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none animate-orb"
          style={{ background: 'radial-gradient(circle, var(--accent-bg) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none animate-orb-r"
          style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.04) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          {/* ── Left: Text ── */}
          <div>
            {/* Status pill */}
            <div
              className="animate-fade-up inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-8 text-sm font-medium"
              style={{ background: 'var(--accent-bg)', border: '1px solid var(--border-accent)', color: 'var(--accent)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: 'var(--accent)' }} />
              SABS &amp; SAHPRA Certified · South Africa
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-up delay-100 font-display font-black tracking-tight leading-[1.04] mb-6"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 4.75rem)', color: 'var(--text-primary)' }}
            >
              Nature&rsquo;s
              <br />
              <span className="gradient-text-emerald">Science.</span>
              <br />
              Proven Results.
            </h1>

            <p
              className="animate-fade-up delay-200 text-lg leading-relaxed max-w-lg mb-8"
              style={{ color: 'var(--text-secondary)' }}
            >
              Koroma Biopharmaceuticals manufactures pharmaceutical-grade medicines entirely derived from botanical natural sources — rigorously tested and certified for safety.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-300 flex flex-wrap gap-4 mb-12">
              <Link
                href="/products"
                id="hero-cta-products"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'var(--accent-btn-bg)',
                  color: 'var(--text-on-accent)',
                  boxShadow: '0 6px 24px var(--accent-shadow)',
                }}
              >
                Explore Products
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200"
                style={{
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)',
                }}
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
                  <p className="font-display font-black text-3xl" style={{ color: 'var(--accent)' }}>{s.num}</p>
                  <p className="text-xs mt-0.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Hero botanical image ── */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in delay-500">
            <div className="relative w-full max-w-md">
              <div
                className="absolute inset-8 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, var(--accent-bg), transparent 70%)' }}
              />
              <div
                className="relative rounded-3xl overflow-hidden animate-float-a"
                style={{ border: '1px solid var(--border-accent)' }}
              >
                <Image
                  src="/botanicals-hero.jpg"
                  alt="Botanical ingredients used in Koroma Biopharmaceuticals products"
                  width={520} height={693}
                  className="w-full h-auto"
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'var(--img-overlay-detail)' }}
                />
              </div>

              {/* Floating label chip */}
              <div
                className="absolute -bottom-4 -left-4 flex items-center gap-3 px-4 py-3 rounded-2xl animate-float-b"
                style={{
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-accent)',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--bg-botanical-icon)' }}>
                  <span className="text-lg">🌿</span>
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>7 Botanical Sources</p>
                  <p className="text-[10px]" style={{ color: 'var(--accent)' }}>100% Natural Extracts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Scroll</span>
          <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }} />
        </div>
      </section>

      {/* ══ TRUST STRIP ═════════════════════════════════════════════════ */}
      <section className="border-y" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-trust-strip)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-3">
            {[
              { icon: '✓', label: 'SABS Certified',               tint: 'var(--gold)' },
              { icon: '✓', label: 'SAHPRA Certified',              tint: 'var(--accent)' },
              { icon: '🌿', label: '100% Natural Botanical Sources', tint: 'var(--text-secondary)' },
              { icon: '🇿🇦', label: 'Proudly South African',         tint: 'var(--text-secondary)' },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-2.5">
                <span style={{ color: t.tint, fontSize: '0.9rem' }}>{t.icon}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{t.label}</span>
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
            <h2 className="font-display font-black text-4xl lg:text-5xl leading-tight" style={{ color: 'var(--text-primary)' }}>
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
                className="group relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-default)',
                  boxShadow: 'var(--card-shadow)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--card-shadow-hover)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--card-shadow)';
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'var(--bg-botanical-icon)', color: 'var(--accent)' }}
                >
                  {cat.icon}
                </div>

                {/* Product pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cat.products.map((p) => (
                    <span
                      key={p}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--bg-pill)', color: 'var(--text-secondary)' }}
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text-primary)' }}>{cat.label}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>{cat.desc}</p>

                <div
                  className="inline-flex items-center gap-1.5 mt-5 text-xs font-semibold transition-all duration-200 group-hover:gap-2.5"
                  style={{ color: 'var(--accent)' }}
                >
                  Explore
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PRODUCTS ═══════════════════════════════════════════ */}
      <section className="py-24 relative" style={{ background: 'var(--bg-section-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <span className="accent-line mb-4" />
              <p className="section-label">Flagship Solutions</p>
              <h2 className="font-display font-black text-4xl lg:text-5xl leading-tight" style={{ color: 'var(--text-primary)' }}>
                Leading Products
              </h2>
            </div>
            <Link
              href="/products"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              View full catalog
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED.map((f) => (
              <article
                key={f.id}
                className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-default)',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }} />

                <div className="p-6 flex flex-col flex-1">
                  <span
                    className="self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-4"
                    style={{ background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid var(--border-accent)' }}
                  >
                    {f.tag}
                  </span>

                  <h3 className="font-display font-black text-2xl mb-1" style={{ color: 'var(--text-primary)' }}>{f.name}</h3>
                  <p className="text-xs font-medium mb-4 tracking-wide" style={{ color: 'var(--accent)' }}>{f.headline}</p>
                  <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>

                  {/* Outcome */}
                  <div
                    className="rounded-xl p-3.5 mb-4"
                    style={{ background: 'var(--bg-outcome)', border: '1px solid var(--border-outcome)' }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--accent)' }}>Outcome</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.outcome}</p>
                  </div>

                  <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
                    <span>Derived from: </span>{f.from}
                  </p>

                  <Link
                    href={`/products/${f.slug}`}
                    className="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      background: 'var(--bg-cta-link)',
                      border: '1px solid var(--border-cta-link)',
                      color: 'var(--accent)',
                    }}
                  >
                    Learn More
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
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
            <h2 className="font-display font-black text-4xl lg:text-5xl mb-4" style={{ color: 'var(--text-primary)' }}>
              Sourced from <span className="gradient-text-emerald">Nature</span>
            </h2>
            <p className="max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Seven carefully selected botanical species power our entire product range — each chosen for its scientifically validated bioactive properties.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {BOTANICALS.map((b, i) => (
              <div
                key={b.id}
                className="group flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-default)',
                  boxShadow: 'var(--card-shadow)',
                  animationDelay: `${i * 80}ms`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'var(--bg-botanical-icon)', border: '1px solid var(--border-accent)' }}
                >
                  {b.emoji}
                </div>
                <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{b.name}</h3>
                <p className="text-xs italic mb-2 leading-snug" style={{ color: 'var(--text-muted)' }}>{b.sci}</p>
                <p className="text-[10px] font-medium" style={{ color: 'var(--accent)' }}>{b.note}</p>
              </div>
            ))}
            <div
              className="flex flex-col items-center justify-center text-center p-6 rounded-2xl"
              style={{ background: 'var(--bg-section-alt)', border: '1px dashed var(--border-dashed)' }}
            >
              <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>More ingredients<br />being researched</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ═══════════════════════════════════════════════════════ */}
      <section
        id="about"
        className="py-28 relative border-t"
        style={{ background: 'var(--bg-section-alt)', borderColor: 'var(--border-default)' }}
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
                  className="rounded-2xl p-6"
                  style={{ background: 'var(--bg-stat-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--card-shadow)' }}
                >
                  <p className="font-display font-black text-4xl mb-1" style={{ color: 'var(--accent)' }}>{s.num}</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Text */}
            <div>
              <span className="accent-line mb-4" />
              <p className="section-label">About Koroma</p>
              <h2 className="font-display font-black text-4xl lg:text-5xl leading-tight mb-6" style={{ color: 'var(--text-primary)' }}>
                Where <span className="gradient-text-emerald">Botany</span><br />Meets Science
              </h2>
              <div className="space-y-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  Koroma Biopharmaceuticals (Pty) Ltd (Reg: 2026/252880/07) is a South African company specialising in the manufacture and distribution of pharmaceutical products derived entirely from natural botanical sources.
                </p>
                <p>
                  Our formulations are certified by the{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>South African Bureau of Standards (SABS)</strong> and the{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>South African Health Products Regulatory Authority (SAHPRA)</strong>, ensuring every product meets the highest safety and efficacy standards.
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
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, var(--accent-bg) 0%, rgba(79,70,229,0.03) 50%, var(--gold-bg) 100%)' }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-black text-4xl lg:text-5xl mb-4 leading-tight" style={{ color: 'var(--text-primary)' }}>
            Ready to Explore<br />
            <span className="gradient-text">Our Full Catalog?</span>
          </h2>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Browse all SABS &amp; SAHPRA certified natural pharmaceutical products. Filter by category or search by condition.
          </p>
          <Link
            href="/products"
            id="cta-explore-catalog"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'var(--accent-btn-bg)',
              color: 'var(--text-on-accent)',
              boxShadow: '0 8px 30px var(--accent-shadow)',
            }}
          >
            Browse Products
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
