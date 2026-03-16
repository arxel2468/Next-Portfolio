"use client";

import { cn } from '@/lib/utils';

export default function GlowingBorder({ children, className, containerClassName }) {
  return (
    <div className={cn('relative group', containerClassName)}>
      {/* Animated gradient border */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]"
        style={{
          background: `linear-gradient(135deg, hsl(var(--accent)), hsl(30, 100%, 65%), hsl(var(--accent)))`,
          backgroundSize: '200% 200%',
          animation: 'border-glow 4s ease infinite',
        }}
      />
      <div className={cn('relative rounded-2xl bg-card', className)}>
        {children}
      </div>
    </div>
  );
}
