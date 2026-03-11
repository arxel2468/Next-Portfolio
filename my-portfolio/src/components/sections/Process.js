"use client";

import { m } from 'framer-motion';
import { ScrollTextReveal } from '@/components/ui/TextReveal';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    timeline: 'Day 1',
    description:
      'We talk. I learn your goals, constraints, and what success looks like. I ask hard questions upfront — no surprises later.',
  },
  {
    number: '02',
    title: 'Build',
    timeline: 'Days 2–7',
    description:
      'Daily updates with live previews. We iterate in real-time. I work fast but never sloppy. You see progress every day.',
  },
  {
    number: '03',
    title: 'Ship',
    timeline: 'Day 7+',
    description:
      'It goes live. I monitor, fix edge cases, and hand over documentation. I stay available because launching is just the beginning.',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-32 md:py-40 bg-[var(--bg-tertiary)]">
      <div className="container">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <span className="type-mono block mb-4">Process</span>
          <h2 className="type-headline mb-6" data-cursor="text">
            <ScrollTextReveal>Simple process. Fast results.</ScrollTextReveal>
          </h2>
          <p className="type-body-lg">
            Most projects ship within a week. Here's how I make that happen without cutting corners.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid md:grid-cols-12 gap-6 md:gap-10 py-12 border-t border-[var(--border)]"
            >
              {/* Number + Timeline */}
              <div className="md:col-span-3 flex items-baseline gap-4">
                <span className="font-serif text-4xl md:text-5xl text-[var(--accent)] opacity-40">
                  {step.number}
                </span>
                <span className="tag tag-accent text-[0.6875rem]">
                  {step.timeline}
                </span>
              </div>

              {/* Content */}
              <div className="md:col-span-4">
                <h3 className="type-title mb-3">{step.title}</h3>
              </div>

              <div className="md:col-span-5">
                <p className="type-body">{step.description}</p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
