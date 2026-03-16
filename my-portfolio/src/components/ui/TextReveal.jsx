"use client";

import { m } from 'framer-motion';

export function RevealText({ children, delay = 0, className = '' }) {
  return (
    <div className="overflow-hidden">
      <m.div
        initial={{ y: '115%', rotate: 3 }}
        whileInView={{ y: '0%', rotate: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </m.div>
    </div>
  );
}

export function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function StaggerText({ text, className = '', delay = 0 }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <m.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </m.span>
        </span>
      ))}
    </span>
  );
}

export function CharReveal({ text, className = '', delay = 0 }) {
  const chars = text.split('');
  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <m.span
            className="inline-block"
            initial={{ y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.025,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </m.span>
        </span>
      ))}
    </span>
  );
}
