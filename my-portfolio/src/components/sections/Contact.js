"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconMail, IconCopy, IconCheck, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react';

const socials = [
  { icon: IconBrandGithub, href: 'https://github.com/arxel2468', label: 'GitHub' },
  { icon: IconBrandLinkedin, href: 'https://linkedin.com/in/amitpandit2468', label: 'LinkedIn' },
  { icon: IconBrandTwitter, href: 'https://twitter.com/amitpandit2468', label: 'Twitter' },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = '1amitpandit2468@gmail.com';

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section">
      <div className="container max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="label block mb-3">Contact</span>
          <h2 className="h2 mb-6">Let's build something.</h2>
          <p className="body-lg mb-10">
            Have a project in mind? Need someone who ships fast?
            I'm available for freelance work and full-time opportunities.
          </p>

          {/* Email */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href={`mailto:${email}`}
              className="btn btn-primary"
            >
              <IconMail size={18} />
              {email}
            </a>
            <button
              onClick={copyEmail}
              className="btn btn-secondary"
            >
              {copied ? <IconCheck size={18} className="text-success" /> : <IconCopy size={18} />}
              {copied ? 'Copied!' : 'Copy email'}
            </button>
          </div>

          {/* Socials */}
          <div className="flex items-center justify-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-muted hover:text-fg hover:border-subtle transition-all"
                aria-label={s.label}
              >
                <s.icon size={22} />
              </a>
            ))}
          </div>

          {/* Location */}
          <p className="text-muted mt-10">
            Mumbai, India · IST (UTC+5:30)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
