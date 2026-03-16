"use client";

import { m } from 'framer-motion';
import { socials } from '@/data/content';
import { FadeUp } from './ui/TextReveal';

export default function Footer() {
  return (
    <footer className="py-10 border-t border-border/30 bg-background relative">
      <div className="wrap">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <FadeUp>
            <div className="flex items-center gap-4">
              <span className="f-display text-lg">
                A<span className="text-accent">.</span>
              </span>
              <span className="text-muted-foreground text-[0.6rem] font-mono">
                Built with obsession
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="flex items-center gap-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-muted-foreground hover:text-accent transition-colors font-medium"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <span className="text-muted-foreground/50 text-[0.55rem] font-mono">
              © {new Date().getFullYear()} Amit Pandit
            </span>
          </FadeUp>
        </div>
      </div>
    </footer>
  );
}
