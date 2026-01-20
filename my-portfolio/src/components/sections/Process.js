"use client";

import { motion } from 'framer-motion';
import { IconMessageCircle, IconCode, IconRocket, IconArrowRight } from '@tabler/icons-react';
import SectionHeader from '@/components/ui/SectionHeader';

const steps = [
  {
    icon: IconMessageCircle,
    title: 'Discovery',
    description: 'We talk. I understand your goals, constraints, and what success looks like for you.',
    color: '#6366F1',
  },
  {
    icon: IconCode,
    title: 'Build',
    description: 'I work fast with regular updates. We iterate together until it\'s exactly right.',
    color: '#10B981',
  },
  {
    icon: IconRocket,
    title: 'Ship',
    description: 'It goes live. I ensure everything works perfectly, then hand over or continue supporting.',
    color: '#F59E0B',
  },
];

export default function Process() {
  return (
    <section id="process" className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--brand-light)] to-transparent opacity-50" />

      <div className="container relative z-10">
        <SectionHeader
          label="Process"
          title="How I work."
          description="A simple, effective process that respects your time and delivers results."
          align="center"
        />

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-[var(--border-light)]">
                  <IconArrowRight
                    size={16}
                    className="absolute -right-2 -top-2 text-[var(--text-muted)]"
                  />
                </div>
              )}

              <div className="card p-8 text-center h-full">
                {/* Step Number */}
                <div className="text-label mb-4">Step {i + 1}</div>

                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{
                    backgroundColor: `${step.color}15`,
                    color: step.color,
                  }}
                >
                  <step.icon size={32} />
                </div>

                {/* Content */}
                <h3 className="text-title mb-3">{step.title}</h3>
                <p className="text-body">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
