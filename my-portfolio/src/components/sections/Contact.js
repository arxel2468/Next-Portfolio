"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconMail,
  IconCopy,
  IconCheck,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconSend,
  IconMapPin,
} from '@tabler/icons-react';
import SectionHeader from '@/components/ui/SectionHeader';

const socials = [
  { icon: IconBrandGithub, href: 'https://github.com/arxel2468', label: 'GitHub' },
  { icon: IconBrandLinkedin, href: 'https://linkedin.com/in/amitpandit2468', label: 'LinkedIn' },
  { icon: IconBrandTwitter, href: 'https://twitter.com/amitpandit2468', label: 'Twitter' },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const email = '1amitpandit2468@gmail.com';

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('https://formspree.io/f/xeojdynq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(null), 5000);
      } else {
        throw new Error();
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="section bg-[var(--bg-tertiary)] relative overflow-hidden">
      {/* Background Elements */}
      <div className="gradient-blob gradient-blob-2" style={{ opacity: 0.3 }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              label="Contact"
              title="Let's build something."
              description="Have a project in mind? I'm available for freelance work and full-time opportunities. Let's talk."
            />

            {/* Email */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
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
                {copied ? (
                  <>
                    <IconCheck size={18} className="text-[var(--accent-green)]" />
                    Copied!
                  </>
                ) : (
                  <>
                    <IconCopy size={18} />
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 mb-8 text-body">
              <IconMapPin size={20} className="text-[var(--brand-primary)]" />
              <span>Mumbai, India · IST (UTC+5:30)</span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl border border-[var(--border-light)] bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] hover:bg-[var(--brand-light)] transition-all"
                  aria-label={s.label}
                >
                  <s.icon size={22} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="card p-8">
              <h3 className="text-title mb-6">Send a message</h3>

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-label block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="input"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-label block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="input"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-label block mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    className="input textarea"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <IconSend size={18} />
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[var(--accent-green)] flex items-center gap-2"
                  >
                    <IconCheck size={18} />
                    Message sent! I'll get back to you soon.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500"
                  >
                    Something went wrong. Please email me directly.
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
