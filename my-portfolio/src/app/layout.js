// src/app/layout.js
import './globals.css';
import { Providers } from './providers.js';

export const metadata = {
  title: 'Amit Pandit | AI Engineer & Full Stack Developer',
  description: 'Portfolio of Amit Pandit, an AI Engineer and Full Stack Developer specializing in intelligent solutions and user-friendly applications.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
