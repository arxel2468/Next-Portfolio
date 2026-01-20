"use client";

import { motion } from 'framer-motion';

export default function SectionHeader({ label, title, description, align = 'left' }) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`max-w-2xl mb-16 ${alignmentClasses[align]}`}
    >
      {label && (
        <span className="inline-block text-label badge badge-brand mb-4">
          {label}
        </span>
      )}
      <h2 className="text-headline mb-4">{title}</h2>
      {description && (
        <p className="text-body-lg">{description}</p>
      )}
    </motion.div>
  );
}
