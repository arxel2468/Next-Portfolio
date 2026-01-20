"use client";

import { useEffect, useState } from 'react';

export default function Footer() {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="py-12 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <span className="font-semibold">Amit Pandit</span>
            <span className="hidden md:block w-px h-4" style={{ backgroundColor: 'var(--border)' }} />
            <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>
              Building systems that work.
            </span>
          </div>

          {/* Right */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            {mounted && (
              <span className="font-mono text-sm tabular-nums" style={{ color: 'var(--fg-subtle)' }}>
                {time} IST
              </span>
            )}
            <span className="hidden md:block w-px h-4" style={{ backgroundColor: 'var(--border)' }} />
            <span className="text-sm" style={{ color: 'var(--fg-subtle)' }}>
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
