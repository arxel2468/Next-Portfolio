"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function StatusBlock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata'
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="inline-flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 py-3 px-5 rounded-lg border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          Available for work
        </span>
      </div>

      <div className="hidden md:block w-px h-4 bg-[var(--border)]" />

      <div className="flex items-center gap-6 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span>Mumbai, IN</span>
        </div>
        <div>
          IST {time}
        </div>
      </div>
    </motion.div>
  );
}
