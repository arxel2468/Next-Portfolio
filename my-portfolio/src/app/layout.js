import { Inter, JetBrains_Mono } from 'next/font/google';
import { Providers } from './providers';
import Noise from '@/components/ui/Noise';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata = {
  title: 'Amit Pandit — Engineer',
  description: 'I build complete systems. AI, web, automation — end to end.',
  openGraph: {
    title: 'Amit Pandit — Engineer',
    description: 'I build complete systems. AI, web, automation — end to end.',
    url: 'https://amitpandit.vercel.app',
    siteName: 'Amit Pandit',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amit Pandit — Engineer',
    description: 'I build complete systems. AI, web, automation — end to end.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--bg)] text-[var(--text-primary)] antialiased">
        <Providers>
          {children}
          <Noise />
        </Providers>
      </body>
    </html>
  );
}
