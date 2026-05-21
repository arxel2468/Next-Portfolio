import { playfair, garamond, mono } from './fonts';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://amitpandit.vercel.app'),
  title: 'Amit Pandit',
  description: 'Builder. Writer. Mumbai.',
  openGraph: {
    title: 'Amit Pandit — Builder. Writer.',
    description: 'I build things. I write about what it means.',
    url: 'https://amitpandit.vercel.app',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${garamond.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}