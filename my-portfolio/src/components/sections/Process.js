"use client";

import { m } from 'framer-motion';
import { IconMessageCircle, IconCode, IconRocket } from '@tabler/icons-react';
import SectionHeader from '@/components/ui/SectionHeader';

const steps = [
  {
    icon: IconMessageCircle,
    title: 'Discovery',
    timeline: 'Day 1',
    description:
      'We align on your goals, constraints, and what "done" looks like. I ask the hard questions upfront so there are zero surprises later.',
    color: '#6366F1',
  },
  {
    icon: IconCode,
    title: 'Build',
    timeline: 'Days 2–7',
    description:
      'You get daily updates with live previews. We iterate in real-time until every detail is bulletproof. No vanishing acts.',
    color: '#059669',
  },
  {
    icon: IconRocket,
    title: 'Ship',
    timeline: 'Day 7+',
    description:
      'It goes live. I monitor performance, fix edge cases, and hand over complete documentation. I stay available for support.',
    color: '#D97706',
  },
];

export default function Process() {
  return (
    <section id="process" className="section section-tight relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--brand-light)] to-transparent opacity-30" />

      <div className="container relative z-10">
        <SectionHeader
          label="Process"
          title="How I work."
          description="A simple, effective process that respects your time and delivers results. Most projects ship within a week."
          align="center"
        />

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex gap-6 md:gap-10 mb-12 last:mb-0"
            >
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 relative z-10"
                  style={{
                    backgroundColor: `${step.color}12`,
                    color: step.color,
                  }}
                >
                  <step.icon size={28} />
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="w-px flex-1 mt-3"
                    style={{ backgroundColor: `${step.color}25` }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="pb-12 last:pb-0 pt-2">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-md"
                    style={{
                      backgroundColor: `${step.color}12`,
                      color: step.color,
                    }}
                  >
                    {step.timeline}
                  </span>
                </div>
                <h3 className="text-title mb-2">{step.title}</h3>
                <p className="text-body max-w-lg">{step.description}</p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
