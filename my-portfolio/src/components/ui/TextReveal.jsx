"use client";

import { m } from 'framer-motion';

export function TextReveal({ children, className = '', delay = 0, once = true }) {
  const words = children.split(' ');

  return (
    <span className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.27em] last:mr-0">
          <m.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.035,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </m.span>
        </span>
      ))}
    </span>
  );
}

export function ScrollTextReveal({ children, className = '', delay = 0 }) {
  const words = children.split(' ');

  return (
    <span className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.27em] last:mr-0">
          <m.span
            className="inline-block"
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.035,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </m.span>
        </span>
      ))}
    </span>
  );
}
