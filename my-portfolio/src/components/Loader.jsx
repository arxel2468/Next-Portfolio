'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let c = 0;
    const id = setInterval(() => {
      c += Math.random() * 15 + 5;
      if (c >= 100) { c = 100; clearInterval(id); setTimeout(onComplete, 500); }
      setP(Math.min(c, 100));
    }, 60);
    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <motion.div exit={{ y: '-100%' }} transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center" style={{ background: 'var(--bg)' }}>
      <svg width="60" height="68" viewBox="0 0 84 96" fill="none" className="mb-8">
        <motion.path d="M42 3L78 24V72L42 93L6 72V24L42 3Z" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: p / 100 }} transition={{ ease: 'easeOut' }} />
        <motion.text x="42" y="58" textAnchor="middle" fill="var(--accent)" fontFamily="var(--font-dm-serif)" fontSize="34"
          initial={{ opacity: 0 }} animate={{ opacity: p > 30 ? 1 : 0 }}>A</motion.text>
      </svg>
      <div className="w-32 h-px overflow-hidden" style={{ background: 'var(--border)' }}>
        <motion.div className="h-full" style={{ background: 'var(--accent)', width: `${p}%` }} />
      </div>
    </motion.div>
  );
}
