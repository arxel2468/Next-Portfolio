"use client";
import { motion } from 'framer-motion';

export default function CircuitLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-circuit-bg z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <motion.circle
            cx="60"
            cy="60"
            r="40"
            fill="none"
            stroke="var(--circuit-primary)"
            strokeWidth="4"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          <motion.circle
            cx="60"
            cy="60"
            r="30"
            fill="none"
            stroke="var(--circuit-secondary)"
            strokeWidth="4"
            strokeDasharray="188.4"
            initial={{ strokeDashoffset: 188.4 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
          />
          
          <motion.circle
            cx="60"
            cy="60"
            r="20"
            fill="none"
            stroke="var(--circuit-accent)"
            strokeWidth="4"
            strokeDasharray="125.6"
            initial={{ strokeDashoffset: 125.6 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
          />
          
          {/* Circuit lines */}
          <motion.path
            d="M60 20 V10 H100 V40"
            fill="none"
            stroke="var(--circuit-primary)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          <motion.path
            d="M60 100 V110 H20 V80"
            fill="none"
            stroke="var(--circuit-primary)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          />
        </svg>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="w-4 h-4 bg-circuit-primary rounded-full animate-pulse"></div>
        </motion.div>
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-8 text-2xl font-mono text-circuit-text"
      >
        <span className="text-circuit-primary">Initializing</span> System
      </motion.h1>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-4 h-1 bg-circuit-primary rounded-full"
      ></motion.div>
    </div>
  );
}