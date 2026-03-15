"use client";

import { m } from 'framer-motion';
import { skills } from '@/data/content';

export default function PanelAbout() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row relative overflow-hidden">
      {/* Left — skills wall */}
      <div className="md:w-[40%] h-full bg-[var(--bg2)] flex items-center justify-center relative overflow-hidden">
        {/* Vertical scrolling skills */}
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden opacity-[.06] dark:opacity-[.1]">
          {[0, 1, 2].map(col => (
            <m.div key={col}
              animate={{ y: col % 2 === 0 ? [0, -600] : [-600, 0] }}
              transition={{ duration: 20 + col * 5, repeat: Infinity, ease: 'linear' }}
              className="flex flex-col items-center gap-6 py-6">
              {[...skills, ...skills].map((s, i) => (
                <span key={`${col}-${i}`} className="f-display text-[clamp(2rem,6vw,4rem)] whitespace-nowrap">{s}</span>
              ))}
            </m.div>
          ))}
        </div>

        {/* Foreground label */}
        <div className="relative z-10 text-center px-8">
          <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex items-center gap-3 justify-center mb-6">
            <div className="w-6 h-px bg-[var(--rose)]" />
            <span className="f-label">Capabilities</span>
            <div className="w-6 h-px bg-[var(--rose)]" />
          </m.div>
          <m.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="f-head text-[clamp(1.5rem,3vw,2.5rem)]" data-c="hover">
            Full-stack.<br />AI-native.<br />Self-taught.
          </m.p>
        </div>
      </div>

      {/* Right — story */}
      <div className="md:w-[60%] h-full flex items-center px-8 md:px-16 py-16">
        <div className="max-w-lg">
          <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[var(--rose)]" />
            <span className="f-label">About</span>
          </m.div>

          <div className="overflow-hidden mb-6">
            <m.h2 initial={{ y: '100%' }} whileInView={{ y: '0%' }} viewport={{ once: true }}
              transition={{ duration: .8, ease: [.76, 0, .24, 1] }}
              className="f-head text-[clamp(2rem,4vw,3rem)]" data-c="hover">
              I think in products,<br />not features.
            </m.h2>
          </div>

          <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="space-y-4 text-[var(--ink2)] text-[15px] leading-relaxed">
            <p>I've never worked at a company. Everything I know comes from shipping things that needed to work in the real world — not in a classroom.</p>
            <p>When someone gives me a product idea, I don't just write code. I think about the brand, the user, the business model, the ad creative, the logistics. Then I build all of it.</p>
            <p>That's the difference. I ship <em>businesses</em>, not repos.</p>
          </m.div>

          <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: .2 }}
            className="mt-8 flex flex-wrap gap-2">
            {skills.slice(0, 8).map(s => (
              <span key={s} className="px-3 py-1 text-[.625rem] font-medium rounded-full border border-[var(--line)] text-[var(--ink3)]">{s}</span>
            ))}
          </m.div>
        </div>
      </div>
    </div>
  );
}
