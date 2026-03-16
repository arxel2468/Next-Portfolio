import { GeistMono } from 'geist/font/mono';
import { inter, dmSerif } from './fonts';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://amitpandit.vercel.app'),
  title: 'Amit Pandit — Product Engineer',
  description: 'I build entire businesses from scratch. 106 purchases in 6 days.',
  openGraph: { title: 'Amit Pandit — Product Engineer', description: 'I build entire businesses from scratch.', url: 'https://amitpandit.vercel.app', images: [{ url: '/og.png', width: 1200, height: 630 }], type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Amit Pandit', images: ['/og.png'] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
