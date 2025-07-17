// src/app/layout.js
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
  title: 'Amit Pandit - AI Engineer & Full Stack Developer',
  description: 'Portfolio of Amit Pandit, AI Engineer and Full Stack Developer specializing in machine learning applications and user-friendly interfaces.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="bg-slate-900 text-slate-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}