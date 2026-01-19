"use client";

import { motion } from 'framer-motion';

export default function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary blob */}
      <motion.div
        className="absolute -top-1/2 -left-1/4 w-full h-full aurora-bg"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 50%, var(--aurora-1), transparent)`,
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary blob */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 aurora-bg"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, var(--aurora-2), transparent)`,
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      {/* Tertiary blob */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-1/2 h-1/2 aurora-bg"
        style={{
          background: `radial-gradient(ellipse 50% 50% at 50% 50%, var(--aurora-3), transparent)`,
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
    </div>
  );
}
