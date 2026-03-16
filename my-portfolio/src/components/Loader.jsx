"use client";

import { useState, useEffect, useCallback } from 'react';
import { m } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    let frame;
    let current = 0;

    const tick = () => {
      if (current >= 100) {
        setCount(100);
        setTimeout(handleComplete, 500);
        return;
      }
      const step = current < 40 ? Math.random() * 8 + 4
        : current < 80 ? Math.random() * 5 + 2
        : Math.random() * 2 + 1;
      current = Math.min(Math.round(current + step), 100);
      setCount(current);
      frame = setTimeout(tick, 50);
    };

    frame = setTimeout(tick, 100);
    return () => clearTimeout(frame);
  }, [handleComplete]);

  return (
    <m.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'hsl(var(--background))' }}
    >
      <div className="text-center">
        <h1 className="f-display text-4xl md:text-5xl mb-8">
          Amit<span style={{ color: 'hsl(var(--accent))' }}>.</span>
        </h1>

        <div className="w-40 h-px mx-auto relative overflow-hidden" style={{ background: 'hsl(var(--border))' }}>
          <m.div
            className="absolute inset-y-0 left-0"
            style={{ background: 'linear-gradient(90deg, hsl(var(--accent)), hsl(30, 100%, 65%))' }}
            animate={{ width: `${count}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        <p className="font-mono text-2xl mt-6 tabular-nums" style={{ color: 'hsl(var(--accent))' }}>
          {count}
        </p>
      </div>
    </m.div>
  );
}
