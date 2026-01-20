"use client";

import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react';

const socials = [
  { icon: IconBrandGithub, href: 'https://github.com/arxel2468', label: 'GitHub' },
  { icon: IconBrandLinkedin, href: 'https://linkedin.com/in/amitpandit2468', label: 'LinkedIn' },
  { icon: IconBrandTwitter, href: 'https://twitter.com/amitpandit2468', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-semibold">amit<span className="text-accent">.</span></span>
          <span className="text-sm text-muted">Building things that work.</span>
        </div>

        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-fg transition-colors"
              aria-label={s.label}
            >
              <s.icon size={20} />
            </a>
          ))}
          <span className="text-sm text-subtle ml-4">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
