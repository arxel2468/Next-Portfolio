"use client";

import { m } from 'framer-motion';
import { email } from '@/data/content';

export default function EmailSidebar() {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="fixed bottom-0 right-6 lg:right-12 z-10 hidden md:flex flex-col items-center gap-5"
    >
      <a
        href={`mailto:${email}`}
        className="font-mono text-[11px] tracking-[0.15em] transition-all duration-200 hover:-translate-y-1"
        style={{
          color: 'var(--text-tertiary)',
          writingMode: 'vertical-rl',
        }}
        onMouseEnter={e => e.target.style.color = 'var(--accent)'}
        onMouseLeave={e => e.target.style.color = 'var(--text-tertiary)'}
      >
        {email}
      </a>
      <div className="w-px h-20 mt-1" style={{ background: 'var(--text-tertiary)' }} />
    </m.div>
  );
}
