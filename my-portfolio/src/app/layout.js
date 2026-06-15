// src/app/layout.js
//
// ─── ROOT LAYOUT ────────────────────────────────────────────────────────────
//
// This is the single HTML document shell for the entire application.
// It injects font CSS variables into the :root element via className,
// making them available to every component through CSS cascade.
//
// Font variable injection works like this:
//   fonts.js loads the font from Google Fonts
//   → generates a unique CSS class with --font-[name] variable
//   → that class is added to <html>
//   → the variable is now available globally via var(--font-[name])
//   → globals.css font-family declarations consume those variables
//   → every component inherits the correct font family
//
// ────────────────────────────────────────────────────────────────────────────

import { playfair, garamond, inter, mono } from './fonts';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://amitpandit.vercel.app'),

  title: {
    default: 'Amit Pandit — Builder. Writer.',
    template: '%s | Amit Pandit',
  },

  description:
    'I build AI-first products and write about what it means to make things. Based in Mumbai.',

  keywords: [
    'Amit Pandit',
    'Full Stack Developer',
    'AI Developer',
    'Mumbai',
    'Next.js',
    'React',
    'Portfolio',
  ],

  authors: [{ name: 'Amit Pandit', url: 'https://amitpandit.vercel.app' }],

  openGraph: {
    title: 'Amit Pandit — Builder. Writer.',
    description:
      'I build AI-first products and write about what it means to make things.',
    url: 'https://amitpandit.vercel.app',
    siteName: 'Amit Pandit',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Amit Pandit — Builder. Writer. Mumbai.',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Amit Pandit — Builder. Writer.',
    description:
      'I build AI-first products and write about what it means to make things.',
    images: ['/og.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: 'https://amitpandit.vercel.app',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={[
        playfair.variable, // → injects --font-playfair
        garamond.variable, // → injects --font-garamond
        inter.variable,    // → injects --font-inter   ← THIS WAS MISSING
        mono.variable,     // → injects --font-mono
      ].join(' ')}
    >
      {/*
        No className on body — font-family is set in globals.css on the
        body selector. Tailwind's font-* utilities work via the variables
        injected on <html> above.
      */}
      <body>{children}</body>
    </html>
  );
}