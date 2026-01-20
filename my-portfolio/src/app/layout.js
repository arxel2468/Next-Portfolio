import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: 'Amit Pandit — Full-Stack Engineer',
  description: 'I build products fast. AI integration, automation, full-stack systems — from zero to shipped.',
  keywords: ['Full-Stack Engineer', 'AI', 'Web Development', 'React', 'Next.js', 'Python', 'Automation'],
  authors: [{ name: 'Amit Pandit' }],
  openGraph: {
    title: 'Amit Pandit — Full-Stack Engineer',
    description: 'I build products fast. AI integration, automation, full-stack systems — from zero to shipped.',
    url: 'https://amitpandit.vercel.app',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amit Pandit — Full-Stack Engineer',
    description: 'I build products fast. AI integration, automation, full-stack systems — from zero to shipped.',
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
