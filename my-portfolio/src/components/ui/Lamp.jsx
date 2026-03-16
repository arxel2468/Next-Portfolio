"use client";

import { m } from 'framer-motion';

export default function Lamp({ className = '', children }) {
  return (
    <div className={`relative flex flex-col items-center justify-center overflow-hidden w-full ${className}`}>
      {/* Glow effect — pure CSS, no broken Tailwind classes */}
      <div className="relative flex w-full items-center justify-center">
        {/* Left beam */}
        <m.div
          initial={{ opacity: 0, width: '8rem' }}
          whileInView={{ opacity: 1, width: '20rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }}
          className="absolute h-40 right-1/2"
          style={{
            background: 'linear-gradient(to left, hsla(var(--glow-color), 0.15), transparent)',
            filter: 'blur(40px)',
          }}
        />

        {/* Right beam */}
        <m.div
          initial={{ opacity: 0, width: '8rem' }}
          whileInView={{ opacity: 1, width: '20rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }}
          className="absolute h-40 left-1/2"
          style={{
            background: 'linear-gradient(to right, hsla(var(--glow-color), 0.15), transparent)',
            filter: 'blur(40px)',
          }}
        />

        {/* Center glow line */}
        <m.div
          initial={{ width: '4rem', opacity: 0 }}
          whileInView={{ width: '12rem', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)',
            boxShadow: '0 0 20px 2px hsla(var(--glow-color), 0.3)',
          }}
        />

        {/* Wider subtle glow */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="absolute w-64 h-32"
          style={{
            background: 'radial-gradient(ellipse, hsla(var(--glow-color), 0.08), transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mt-8">
        {children}
      </div>
    </div>
  );
}
