import { GeistMono } from 'geist/font/mono';
import { inter, dmSerif } from './fonts';
import { Providers } from './providers';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://amitpandit.vercel.app'),
  title: {
    default: 'Amit Pandit — I build products, not just code',
    template: '%s | Amit Pandit',
  },
  description:
    'Full-stack engineer who ships entire businesses. From zero to 106 sales in 6 days. I build products fast.',
  keywords: [
    'Full-Stack Engineer',
    'Product Engineer',
    'AI Integration',
    'React',
    'Next.js',
    'Freelance Developer',
    'Mumbai',
  ],
  authors: [{ name: 'Amit Pandit', url: 'https://amitpandit.vercel.app' }],
  creator: 'Amit Pandit',
  openGraph: {
    title: 'Amit Pandit — I build products, not just code',
    description:
      'Full-stack engineer who ships entire businesses. From zero to 106 sales in 6 days.',
    url: 'https://amitpandit.vercel.app',
    siteName: 'Amit Pandit',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Amit Pandit — Product Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amit Pandit — I build products, not just code',
    description:
      'Full-stack engineer who ships entire businesses. From zero to 106 sales in 6 days.',
    images: ['/og.png'],
    creator: '@amitpandit2468',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Amit Pandit',
  url: 'https://amitpandit.vercel.app',
  jobTitle: 'Product Engineer',
  description:
    'Full-stack engineer who ships entire businesses, from zero to production.',
  sameAs: [
    'https://github.com/arxel2468',
    'https://linkedin.com/in/amitpandit2468',
    'https://twitter.com/amitpandit2468',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressCountry: 'IN',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerif.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
