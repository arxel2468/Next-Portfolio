"use client";

import { m } from 'framer-motion';

export default function SectionLabel({ text }) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-6"
    >
      <m.div
        initial={{ width: 0 }}
        whileInView={{ width: 32 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="h-px"
        style={{ background: 'var(--accent)' }}
      />
      <span className="f-label tracking-[0.2em]">{text}</span>
    </m.div>
  );
}
