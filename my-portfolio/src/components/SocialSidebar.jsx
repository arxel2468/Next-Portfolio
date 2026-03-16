"use client";

import { m } from 'framer-motion';
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react';
import { socials } from '@/data/content';

const ICONS = { github: IconBrandGithub, linkedin: IconBrandLinkedin, twitter: IconBrandX };

export default function SocialSidebar() {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="fixed bottom-0 left-6 lg:left-12 z-10 hidden md:flex flex-col items-center gap-5"
    >
      {socials.map(s => {
        const Icon = ICONS[s.icon] || IconBrandGithub;
        return (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            className="p-1 transition-all duration-200 hover:-translate-y-1"
            style={{ color: 'var(--text-tertiary)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
          >
            <Icon size={18} stroke={1.5} />
          </a>
        );
      })}
      <div className="w-px h-20 mt-1" style={{ background: 'var(--text-tertiary)' }} />
    </m.div>
  );
}
