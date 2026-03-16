'use client';
import ScrollVelocity from '../ui/ScrollVelocity';
import { tickerItems } from '@/data/content';

export default function Ticker() {
  return (
    <div className="py-2 border-y" style={{ borderColor: 'var(--border)' }}>
      <ScrollVelocity
        texts={[tickerItems.join('   ·   ')]}
        velocity={40}
        className="font-mono text-[11px] md:text-xs uppercase tracking-[0.15em] text-[var(--text-3)]"
      />
    </div>
  );
}
