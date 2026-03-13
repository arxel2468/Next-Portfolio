"use client";

import { useState, useCallback, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import Cursor from '@/components/Cursor';
import Nav from '@/components/Nav';

export default function Shell({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Cursor />

      {/* Loader */}
      <AnimatePresence>
        {loading && (
          <m.div
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--bg)]"
          >
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="font-display text-4xl md:text-5xl text-center">
                <m.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2, times: [0, 0.3, 0.7, 1] }}
                >
                  amit<span className="text-accent">.</span>
                </m.span>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Nav />
        <main>{children}</main>
      </m.div>
    </>
  );
}
