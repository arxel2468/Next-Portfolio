"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  y = 30,
  once = true,
  blur = false,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y,
        filter: blur ? 'blur(8px)' : 'blur(0px)',
      }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      } : {}}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
