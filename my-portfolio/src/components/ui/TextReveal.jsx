"use client";

import { m } from 'framer-motion';

export function TextReveal({ children, className = '', delay = 0 }) {
  const words = children.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <m.span
            className="inline-block"
            initial={{ y: '120%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.04,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {word}
          </m.span>
        </span>
      ))}
    </span>
  );
}

export function TextRevealOnScroll({ children, className = '', delay = 0 }) {
  const words = children.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <m.span
            className="inline-block"
            initial={{ y: '120%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.04,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {word}
          </m.span>
        </span>
      ))}
    </span>
  );
}
