"use client";

import { m } from 'framer-motion';
import { skills } from '@/data/content';
import SpotlightCard from '../ui/SpotlightCard';
import { RevealText, FadeUp } from '../ui/TextReveal';

const FACTS = [
  { label: 'Location', value: 'Mumbai, India' },
  { label: 'Education', value: 'B.Sc IT · 8.9 CGPA' },
  { label: 'Focus', value: 'Full-Stack & E-commerce' },
  { label: 'Status', value: 'Open to work' },
];

export default function SectionAbout() {
  return (
    <section id="about" className="py-28 md:py-44 relative overflow-hidden">
      {/* Decorative gradient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle, hsla(var(--glow-color), 0.06), transparent 60%)',
        }}
      />

      <div className="wrap relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <m.span
            className="f-mono text-accent text-[0.6rem] tracking-[0.3em] mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            About
          </m.span>

          <RevealText>
            <h2 className="f-head text-[clamp(2.5rem,6vw,4.5rem)]">
              I think in <span className="text-gradient">products</span>,
            </h2>
          </RevealText>
          <RevealText delay={0.08}>
            <h2 className="f-head text-[clamp(2.5rem,6vw,4.5rem)] text-muted-foreground">
              not features.
            </h2>
          </RevealText>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-14 md:gap-20 mb-20">
          {/* Story */}
          <div>
            <FadeUp>
              <p className="text-muted-foreground text-[15px] leading-[1.9] mb-5">
                I&apos;ve never worked at a big company. Everything I know comes from shipping
                things that work in the real world — stores that generate revenue, platforms
                that handle real users, tools that solve actual problems.
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-muted-foreground text-[15px] leading-[1.9] mb-5">
                When someone gives me a product idea, I don&apos;t just think about the code.
                I think about the <span className="text-foreground font-medium">brand</span>, the{' '}
                <span className="text-foreground font-medium">user journey</span>, the{' '}
                <span className="text-foreground font-medium">business model</span>, the{' '}
                <span className="text-foreground font-medium">logistics</span>. Then I build all of it.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-foreground text-lg font-medium font-serif italic">
                I ship businesses, not repositories.
              </p>
            </FadeUp>
          </div>

          {/* Quick facts — Bento */}
          <div className="grid grid-cols-2 gap-3">
            {FACTS.map((fact, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <SpotlightCard className="p-5">
                  <p className="f-mono text-[0.5rem] text-accent mb-2">{fact.label}</p>
                  <p className="text-sm font-medium">{fact.value}</p>
                </SpotlightCard>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Skills — bento grid */}
        <FadeUp>
          <h3 className="f-mono text-accent text-[0.6rem] tracking-[0.3em] mb-8 text-center">
            Stack & Technologies
          </h3>
        </FadeUp>

        <div className="grid md:grid-cols-5 gap-3">
          {skills.map((group, gi) => (
            <FadeUp key={gi} delay={gi * 0.06}>
              <SpotlightCard className="p-5 h-full">
                <h4 className="f-mono text-[0.55rem] text-accent mb-4 tracking-wider">
                  {group.category}
                </h4>
                <div className="space-y-2">
                  {group.items.map((skill) => (
                    <m.div
                      key={skill}
                      whileHover={{ x: 4 }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-default flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent/40" />
                      {skill}
                    </m.div>
                  ))}
                </div>
              </SpotlightCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
