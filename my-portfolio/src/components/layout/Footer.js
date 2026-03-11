"use client";

import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react';
import MagneticButton from '@/components/ui/MagneticButton';

const socials = [
  { icon: IconBrandGithub, href: 'https://github.com/arxel2468', label: 'GitHub' },
  { icon: IconBrandLinkedin, href: 'https://linkedin.com/in/amitpandit2468', label: 'LinkedIn' },
  { icon: IconBrandTwitter, href: 'https://twitter.com/amitpandit2468', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="py-16 border-t border-[var(--border)]">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <span className="font-serif text-lg">
              amit<span className="text-accent">.</span>
            </span>
            <span className="type-small">Mumbai, India</span>
          </div>

          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <MagneticButton key={s.label} strength={0.2}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all"
                  aria-label={s.label}
                  data-cursor="pointer"
                >
                  <s.icon size={18} />
                </a>
              </MagneticButton>
            ))}
          </div>

          <p className="type-small">
            © {new Date().getFullYear()} Amit Pandit
          </p>
        </div>
      </div>
    </footer>
  );
}
