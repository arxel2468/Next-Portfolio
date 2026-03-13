import { GeistMono } from 'geist/font/mono';
import { inter, dmSerif } from './fonts';
import { Providers } from './providers';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://amitpandit.vercel.app'),
  title: 'Amit Pandit — Product Engineer',
  description: 'I build products, not just code. 106 sales in 6 days.',
  openGraph: {
    title: 'Amit Pandit — Product Engineer',
    description: 'I build products, not just code. 106 sales in 6 days.',
    url: 'https://amitpandit.vercel.app',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
