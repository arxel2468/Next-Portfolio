import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: 'Amit Pandit — I Build Products Fast',
  description: 'Full-stack engineer specializing in AI integration, automation, and shipping products from zero to production.',
  keywords: ['Full-Stack Engineer', 'AI', 'Web Development', 'React', 'Next.js', 'Python', 'Automation'],
  authors: [{ name: 'Amit Pandit' }],
  openGraph: {
    title: 'Amit Pandit — I Build Products Fast',
    description: 'Full-stack engineer specializing in AI integration, automation, and shipping products from zero to production.',
    url: 'https://amitpandit.vercel.app',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
