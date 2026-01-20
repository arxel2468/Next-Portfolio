"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const socials = [
  { icon: FaGithub, href: 'https://github.com/arxel2468', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/amitpandit2468', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://twitter.com/amitpandit2468', label: 'Twitter' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('https://formspree.io/f/xeojdynq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(null), 5000);
      } else {
        throw new Error('Failed');
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-wide">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <span className="label block mb-4">03 — Contact</span>
            <h2 className="text-headline">Let's Work Together</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl leading-relaxed mb-8" style={{ color: 'var(--fg-muted)' }}>
              Available for freelance projects, consulting, and full-time opportunities.
              I typically respond within 24 hours.
            </p>

            <div className="space-y-4 mb-12">
              <a
                href="mailto:1amitpandit2468@gmail.com"
                className="block text-lg hover:text-[var(--accent)] transition-colors"
              >
                1amitpandit2468@gmail.com
              </a>
              <p style={{ color: 'var(--fg-muted)' }}>Mumbai, India · IST (UTC+5:30)</p>
            </div>

            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-12 h-12 border transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)]"
                  style={{ borderColor: 'var(--border)' }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="label block mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border bg-transparent transition-colors focus:outline-none focus:border-[var(--fg)]"
                style={{ borderColor: 'var(--border)' }}
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="label block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 border bg-transparent transition-colors focus:outline-none focus:border-[var(--fg)]"
                style={{ borderColor: 'var(--border)' }}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="label block mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 border bg-transparent transition-colors focus:outline-none focus:border-[var(--fg)] resize-none"
                style={{ borderColor: 'var(--border)' }}
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-sm text-green-600">Message sent successfully. I'll respond soon.</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-600">Something went wrong. Please email me directly.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
