import { GeistMono } from 'geist/font/mono';
import { inter, dmSerif } from './fonts';
import { Providers } from './providers';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://amitpandit.vercel.app'),
  title: 'Amit Pandit — I Build Products, Not Just Code',
  description:
    '106 purchases in 6 days. Full-stack product engineer who ships entire businesses from scratch. Next.js, Python, Shopify, Meta Ads.',
  keywords: [
    'Amit Pandit', 'Product Engineer', 'Full Stack Developer',
    'Next.js', 'Shopify Developer', 'E-commerce', 'Mumbai Developer',
    'Freelance Developer India', 'React Developer',
  ],
  authors: [{ name: 'Amit Pandit' }],
  creator: 'Amit Pandit',
  openGraph: {
    title: 'Amit Pandit — I Build Products, Not Just Code',
    description: '106 purchases in 6 days. Full-stack product engineer.',
    url: 'https://amitpandit.vercel.app',
    siteName: 'Amit Pandit',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amit Pandit — I Build Products, Not Just Code',
    description: '106 purchases in 6 days. Full-stack product engineer.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerif.variable} ${GeistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="noise">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
