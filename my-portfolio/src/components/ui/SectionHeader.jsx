"use client";

import { m } from 'framer-motion';
import { TextRevealOnScroll } from '@/components/ui/TextReveal';

export default function SectionHeader({ label, title, description, align = 'left' }) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
  };

  return (
    <div className={`max-w-2xl mb-16 ${alignmentClasses[align]}`}>
      {label && (
        <m.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
          className="inline-block text-label badge badge-brand mb-4"
        >
          {label}
        </m.span>
      )}
      <h2 className="text-headline mb-4">
        <TextRevealOnScroll>{title}</TextRevealOnScroll>
      </h2>
      {description && (
        <m.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`text-body-lg ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {description}
        </m.p>
      )}
    </div>
  );
}
