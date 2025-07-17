// src/app/providers.js
"use client";

import { ThemeProvider } from 'next-themes';
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from 'react';

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      {children}
      <Analytics />
    </ThemeProvider>
  );
}