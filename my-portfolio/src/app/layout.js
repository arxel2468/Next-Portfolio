// layout.js
"use client";
import "./globals.css";
import { useEffect } from 'react';

// export const metadata = {
//   title: "Amit Pandit | Work",
//   description: "I'm here to help",
// };

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
          block: 'start',
        });
      }
    }
  };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', handleScroll);
    });

    return () => {
      // Cleanup event listeners
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
