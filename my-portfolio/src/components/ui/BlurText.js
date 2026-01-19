"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function BlurText({ 
  children, 
  className = '',
  delay = 0,
  duration = 0.8,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        filter: 'blur(10px)',
        y: 10,
      }}
      animate={isInView ? { 
        opacity: 1, 
        filter: 'blur(0px)',
        y: 0,
      } : {}}
      transition={{ 
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.span>
  );
}
