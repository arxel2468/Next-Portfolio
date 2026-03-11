"use client";

import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onComplete?.(), 600);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--bg-primary)]"
        >
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <m.div
              className="font-serif text-3xl mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              amit<span className="text-accent">.</span>
            </m.div>

            {/* Loading bar */}
            <div className="w-48 h-[2px] bg-[var(--border)] rounded-full overflow-hidden">
              <m.div
                className="h-full bg-[var(--accent)] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
