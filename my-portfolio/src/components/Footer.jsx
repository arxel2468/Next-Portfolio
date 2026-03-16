"use client";

export default function Footer() {
  return (
    <footer className="py-6 text-center">
      <a
        href="https://github.com/arxel2468"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-xs transition-colors"
        style={{ color: 'var(--text-tertiary)' }}
        onMouseEnter={e => e.target.style.color = 'var(--accent)'}
        onMouseLeave={e => e.target.style.color = 'var(--text-tertiary)'}
      >
        Designed & Built by Amit Pandit
      </a>
    </footer>
  );
}
