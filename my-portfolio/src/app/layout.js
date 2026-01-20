import { Inter, JetBrains_Mono } from 'next/font/google';
import { Providers } from './providers';
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
  description: 'Full-stack engineer building high-performance systems. Specialized in AI integration and scalable architecture.',
  openGraph: {
    title: 'Amit Pandit — Engineer',
    description: 'Full-stack engineer building high-performance systems.',
    url: 'https://amitpandit.vercel.app',
    siteName: 'Amit Pandit',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amit Pandit — Engineer',
    description: 'Full-stack engineer building high-performance systems.',
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
      <body>
        <Providers>
          {/* Background Grid */}
          <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
          <div className="fixed inset-0 bg-gradient-fade pointer-events-none z-0 h-32" />

          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
