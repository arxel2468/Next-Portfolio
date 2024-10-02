"use client";
import "./globals.css";
import { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }) {
  useEffect(() => {
    // Apply smooth scrolling to anchor links
    const handleScroll = (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // Ensures the section starts from the top of the viewport
          });
        }
      }
    };

    // Attach event listeners to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', handleScroll);
    });

    // Cleanup event listeners
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener('click', handleScroll);
      });
    };
  }, []);

  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
