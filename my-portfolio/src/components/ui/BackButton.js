"use client";
import { motion } from 'framer-motion';

export default function BackButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed top-6 left-6 z-50 flex items-center justify-center w-10 h-10 bg-circuit-surface border border-circuit-primary/30 text-circuit-primary hover:bg-circuit-primary hover:text-circuit-bg transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </motion.button>
  );
}