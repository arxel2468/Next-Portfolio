"use client";
import { useEffect } from 'react';

export function useTimeAccent() {
  useEffect(() => {
    const hour = new Date().getHours();
    const root = document.documentElement;

    // Logic:
    // Morning (6-12): Orange/Amber (Energy)
    // Afternoon (12-18): Blue (Focus)
    // Evening (18-22): Indigo/Violet (Creativity)
    // Night (22-6): Cyan/Teal (Deep Work)

    if (hour >= 6 && hour < 12) {
      root.style.setProperty('--accent', '#EA580C');
      root.style.setProperty('--accent-glow', 'rgba(234, 88, 12, 0.15)');
    } else if (hour >= 12 && hour < 18) {
      root.style.setProperty('--accent', '#2563EB');
      root.style.setProperty('--accent-glow', 'rgba(37, 99, 235, 0.15)');
    } else if (hour >= 18 && hour < 22) {
      root.style.setProperty('--accent', '#7C3AED');
      root.style.setProperty('--accent-glow', 'rgba(124, 58, 237, 0.15)');
    } else {
      root.style.setProperty('--accent', '#0891B2');
      root.style.setProperty('--accent-glow', 'rgba(8, 145, 178, 0.15)');
    }
  }, []);
}
