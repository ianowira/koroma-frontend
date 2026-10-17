'use client';

import Link from 'next/link';

const productLinks = [
  { label: 'EmiGlow®',     href: '/products/emiglow'      },
  { label: 'Fungizuia®',   href: '/products/fungizuia'    },
  { label: 'Obellite®',    href: '/products/obellite'     },
  { label: 'Cardiollite®', href: '/products/cardiollite'  },
  { label: 'Bone Broth',   href: '/products/bone-broth'   },
  { label: 'Flublock®',    href: '/products/flublock'     },
];

const companyLinks = [
  { href: '/#about',      label: 'About Us'        },
  { href: '/#botanicals', label: 'Our Botanicals'  },
  { href: '/products',    label: 'Product Catalog' },
];

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export function Footer() {
  return (
    <footer
      id="contact"
      className="border-t mt-auto bg-footer border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* ── Brand ── */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-accent-bg border border-border-accent"
              >
                <span className="font-black text-base text-accent">K</span>
              </div>
              <div>
                <p className="font-black text-sm tracking-widest leading-tight text-primary">KOROMA</p>
                <p className="font-medium tracking-[0.22em] uppercase leading-tight text-[8px] text-accent">
                  Biopharmaceuticals
                </p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed max-w-xs mb-2 text-secondary">
              Manufacturers and distributors of pharmaceutical products derived entirely from natural botanical sources. Rigorously tested. Certified safe.
            </p>
            <p className="text-xs mb-6 text-muted">Reg: 2026/252880/07 · South Africa</p>

            {/* Certification badges */}
            <div className="flex flex-wrap gap-3">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cert-sabs border border-border-cert-sabs text-gold-text"
              >
                <CheckIcon />
                <span className="text-xs font-medium text-secondary">SABS Certified</span>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cert-sahpra border border-border-cert-sahpra text-accent"
              >
                <CheckIcon />
                <span className="text-xs font-medium text-secondary">SAHPRA Certified</span>
              </div>
            </div>
          </div>

          {/* ── Products ── */}
          <div>
            <h3 className="text-xs font-bold mb-5 tracking-[0.15em] uppercase text-primary">Products</h3>
            <ul className="space-y-2.5">
              {productLinks.map((p) => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    className="text-sm transition-colors duration-200 text-muted hover:text-accent"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company ── */}
          <div>
            <h3 className="text-xs font-bold mb-5 tracking-[0.15em] uppercase text-primary">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors duration-200 text-muted hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-border"
        >
          <p className="text-sm text-muted">
            © 2026 Koroma Biopharmaceuticals (Pty) Ltd. All rights reserved.
          </p>
          <p className="text-xs italic text-subtle">Natural. Certified. Effective.</p>
        </div>
      </div>
    </footer>
  );
}
