"use client";

import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconHeart } from '@tabler/icons-react';

const socials = [
  { icon: IconBrandGithub, href: 'https://github.com/arxel2468', label: 'GitHub' },
  { icon: IconBrandLinkedin, href: 'https://linkedin.com/in/amitpandit2468', label: 'LinkedIn' },
  { icon: IconBrandTwitter, href: 'https://twitter.com/amitpandit2468', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[var(--border-light)]">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold">
              amit<span className="text-gradient">.</span>
            </span>
            <span className="text-small">Building products that work.</span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl border border-[var(--border-light)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] hover:bg-[var(--brand-light)] transition-all"
                aria-label={s.label}
              >
                <s.icon size={20} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-small">
            <span>Made with</span>
            <IconHeart size={16} className="text-red-500" />
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
