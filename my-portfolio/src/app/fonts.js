
import {
  Playfair_Display,
  EB_Garamond,
  Inter,
  JetBrains_Mono,
} from 'next/font/google';

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair', // → Tailwind: font-display
  preload: true,               // Hero font — preload is correct here
});

export const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-garamond', // → Tailwind: font-body
  preload: false,              // Body font — loaded after hero
});

export const inter = Inter({
  subsets: ['latin'],
  axes: ['opsz'], // Optical size axis — improves rendering at small UI sizes
  display: 'swap',
  variable: '--font-inter', // → Tailwind: font-sans
  preload: false,
});


export const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-mono', // → Tailwind: font-mono
  preload: false,
});