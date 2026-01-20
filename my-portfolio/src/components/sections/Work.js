"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { IconExternalLink, IconQuote } from '@tabler/icons-react';
import { appliedWork } from '@/data/applied';

export default function Work() {
  const work = appliedWork[0]; // StealStreet

  return (
    <section id="work" className="section bg-bg-elevated">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="label block mb-3">Featured Work</span>
          <h2 className="h2">Real results, not just projects.</h2>
        </motion.div>

        {/* Case Study Card */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-bg border border-border rounded-2xl overflow-hidden"
        >
          {/* Image */}
          <div className="relative h-64 md:h-80 bg-bg-elevated">
            {work.image && (
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
            
            {/* Overlay Title */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="h3 text-fg mb-2">{work.title}</h3>
                  <p className="text-muted">{work.tagline}</p>
                </div>
                {work.link && (
                  <a
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary shrink-0"
                  >
                    Visit Site
                    <IconExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-border">
              {work.metrics.map((m, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold text-accent">{m.value}</div>
                  <div className="text-sm font-medium text-fg">{m.label}</div>
                  <div className="text-xs text-muted">{m.detail}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="body-lg mb-10">{work.description}</p>

            {/* Testimonial */}
            {work.testimonial && (
              <div className="bg-bg-elevated border border-border rounded-xl p-6 mb-10">
                <IconQuote size={24} className="text-accent mb-4" />
                <p className="text-lg mb-4">"{work.testimonial.quote}"</p>
                <p className="text-sm text-muted">— {work.testimonial.author}</p>
              </div>
            )}

            {/* Scope Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {work.scope.map((section, i) => (
                <div key={i}>
                  <h4 className="font-semibold mb-4">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
