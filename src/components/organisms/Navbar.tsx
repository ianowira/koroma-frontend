'use client';

import {ChevronRight, Menu, X} from "lucide-react";
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import {navLinks} from "@/lib/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 14);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-nav-scrolled backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 bg-accent-bg border border-border-accent"
            >
              <span className="font-black text-sm leading-none text-accent">K</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-black text-sm tracking-widest text-primary">
                KOROMA
              </span>
              <span
                className="font-medium tracking-[0.22em] uppercase text-[8px] text-accent"
              >
                Biopharmaceuticals
              </span>
            </div>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm transition-colors duration-200 relative group text-secondary hover:text-primary"
              >
                {l.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full rounded-full bg-gradient-to-r from-accent to-transparent"
                />
              </Link>
            ))}
          </div>

          {/* ── Right: toggle + CTA + hamburger ── */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              href="/products"
              id="nav-cta-products"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 bg-accent-btn text-on-accent shadow-accent hover:bg-accent-btn-hover hover:shadow-accent-lg"
            >
              View Products
              <ChevronRight className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2.5} />
            </Link>

            <button
              id="nav-mobile-toggle"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="md:hidden p-2 rounded-lg transition-colors text-secondary hover:text-primary"
            >
              {open
                ? <X className="w-5 h-5" stroke="currentColor" strokeWidth={2} />
                : <Menu className="w-5 h-5" stroke="currentColor" strokeWidth={2} />
              }
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        {open && (
          <div
            className="md:hidden -mx-4 px-4 pt-2 pb-5 space-y-1 border-t bg-nav-scrolled backdrop-blur-xl border-border"
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm rounded-xl transition-colors text-secondary hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="block w-full text-center py-3 rounded-xl text-sm font-semibold transition-colors bg-accent-btn text-on-accent hover:bg-accent-btn-hover"
              >
                View Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
