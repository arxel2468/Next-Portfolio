"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--accents-4)] hover:text-[var(--fg)] transition-colors cursor-pointer group"
      aria-label="Scroll to content"
    >
      <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
      
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-5 h-8 border-2 border-current rounded-full flex justify-center pt-1.5"
      >
        <motion.div
          animate={{ opacity: [1, 0.3, 1], y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1 h-1.5 bg-current rounded-full"
        />
      </motion.div>
    </motion.button>
  );
}
