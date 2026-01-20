"use client";

import { motion } from 'framer-motion';
import { IconMessageDots, IconCode, IconRocket } from '@tabler/icons-react';

const steps = [
  {
    icon: IconMessageDots,
    title: 'Discovery',
    description: 'We talk. I understand what you need, what success looks like, and what constraints exist.',
  },
  {
    icon: IconCode,
    title: 'Build',
    description: 'I work fast. You get updates. We iterate until it\'s right.',
  },
  {
    icon: IconRocket,
    title: 'Ship',
    description: 'It goes live. I make sure everything works. Then I hand it over or keep supporting.',
  },
];

export default function Process() {
  return (
    <section className="section bg-bg-elevated">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="label block mb-3">Process</span>
          <h2 className="h2">How I work.</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <step.icon size={28} className="text-accent" />
              </div>
              <div className="label mb-2">Step {i + 1}</div>
              <h3 className="h3 mb-3">{step.title}</h3>
              <p className="text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
