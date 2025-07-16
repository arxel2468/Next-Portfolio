// src/app/providers.js
"use client";

import { ThemeProvider } from 'next-themes';
import { Analytics } from "@vercel/analytics/react";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
      <Analytics />
    </ThemeProvider>
  );
}
