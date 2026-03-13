"use client";

import { m } from 'framer-motion';

const capabilities = [
  { area: 'Frontend', items: 'React, Next.js, TypeScript, Framer Motion, Tailwind' },
  { area: 'Backend', items: 'Python, Django, Node.js, PostgreSQL, Prisma' },
  { area: 'AI / ML', items: 'Groq, LLM Integration, BiLSTM, NLP Pipelines' },
  { area: 'Commerce', items: 'Shopify, Liquid, PageFly, Meta Ads, GA4' },
  { area: 'Operations', items: 'CI/CD, Vercel, Supabase, Shiprocket, DNS' },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-40 section-glow">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-[var(--accent-color)]" />
              <span className="font-label">About</span>
            </m.div>

            <m.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="font-display text-[clamp(2rem,5vw,3.5rem)] mb-8" data-c="hover">
              I think in products,<br />not features.
            </m.h2>

            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="space-y-5 text-[var(--text-secondary)] text-[15px] leading-relaxed">
              <p>I've never worked at a company. Everything I know, I taught myself by shipping things that needed to work in the real world.</p>
              <p>When a client gives me a product idea, I don't just write code. I think about the brand, the user, the business model, the logistics. Then I build all of it.</p>
              <p>I'm not a developer who ships features. I'm an engineer who ships businesses.</p>
            </m.div>
          </div>

          <div>
            <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-[var(--accent-color)]" />
              <span className="font-label">Capabilities</span>
            </m.div>

            {capabilities.map((cap, i) => (
              <m.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="py-5 border-b border-[var(--border)] group">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-medium group-hover:text-[var(--accent-color)] transition-colors duration-300">{cap.area}</span>
                  <span className="text-xs text-[var(--text-muted)] text-right flex-1 max-w-[65%]">{cap.items}</span>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
