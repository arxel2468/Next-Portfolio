import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Providers } from './providers';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://amitpandit.vercel.app'),
  title: {
    default: 'Amit Pandit — Full-Stack Engineer',
    template: '%s | Amit Pandit',
  },
  description:
    'Full-stack engineer specializing in AI integration, automation, and shipping products from zero to production. I build fast, ship faster.',
  keywords: [
    'Full-Stack Engineer',
    'AI Integration',
    'Web Development',
    'React',
    'Next.js',
    'Python',
    'Automation',
    'Freelance Developer',
    'Mumbai',
  ],
  authors: [{ name: 'Amit Pandit', url: 'https://amitpandit.vercel.app' }],
  creator: 'Amit Pandit',
  openGraph: {
    title: 'Amit Pandit — Full-Stack Engineer',
    description:
      'I build products fast. Full-stack engineer specializing in AI, automation, and shipping complete systems.',
    url: 'https://amitpandit.vercel.app',
    siteName: 'Amit Pandit',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Amit Pandit — Full-Stack Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amit Pandit — Full-Stack Engineer',
    description:
      'I build products fast. Full-stack engineer specializing in AI, automation, and shipping complete systems.',
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

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Amit Pandit',
  url: 'https://amitpandit.vercel.app',
  jobTitle: 'Full-Stack Engineer',
  description:
    'Full-stack engineer specializing in AI integration, automation, and shipping products from zero to production.',
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
  knowsAbout: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Python',
    'AI Integration',
    'Full-Stack Development',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
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
