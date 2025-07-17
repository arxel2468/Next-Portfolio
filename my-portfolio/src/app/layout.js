// src/app/layout.js
import { Providers } from './provider.js';
import './globals.css';

export const metadata = {
  title: 'Amit Pandit - AI Engineer & Full Stack Developer',
  description: 'Portfolio of Amit Pandit, AI Engineer and Full Stack Developer specializing in machine learning applications and user-friendly interfaces.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Fira+Code&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}