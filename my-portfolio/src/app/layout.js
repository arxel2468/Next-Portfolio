import { GeistMono } from 'geist/font/mono';
import { inter, dmSerif } from './fonts';
import { Providers } from './providers';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://amitpandit.vercel.app'),
  title: 'Amit Pandit',
  description: 'I build products, not just code.',
  openGraph: { title: 'Amit Pandit', description: 'I build products, not just code.', images: ['/og.png'] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
