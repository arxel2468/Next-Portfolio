"use client";

import { useState, useEffect } from 'react';

export default function LiveTime({ className = '' }) {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata',
      });
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <span className={`font-mono tabular-nums ${className}`}>
        --:--
      </span>
    );
  }

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {time} <span className="text-subtle">IST</span>
    </span>
  );
}
