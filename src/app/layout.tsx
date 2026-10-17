import { Inter, DM_Sans } from 'next/font/google';
import React from "react";

import type { Metadata } from 'next';

import { Footer } from '@/components/organisms/Footer';
import { Navbar } from '@/components/organisms/Navbar';
import { ThemeProvider } from '@/providers/ThemeProvider';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'Koroma Biopharmaceuticals | Natural Pharmaceutical Solutions',
    template: '%s | Koroma Biopharmaceuticals',
  },
  description:
    'Koroma Biopharmaceuticals (Pty) Ltd — manufacturers and distributors of pharmaceutical products derived from natural botanical sources. Certified by SABS and SAHPRA.',
  keywords: [
    'biopharmaceuticals', 'natural pharmaceuticals', 'SABS certified',
    'SAHPRA certified', 'South Africa', 'botanical medicine',
    'EmiGlow', 'Fungizuia', 'Obellite', 'Cardiollite',
  ],
  icons: {
    icon: '/favicon.svg',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${inter.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
