"use client";

import { useState, useRef, useCallback } from 'react';
import { m } from 'framer-motion';
import { IconMail, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconSend, IconCheck, IconCopy } from '@tabler/icons-react';

const emailAddr = '1amitpandit2468@gmail.com';
const socials = [
  { icon: IconBrandGithub, href: 'https://github.com/arxel2468' },
  { icon: IconBrandLinkedin, href: 'https://linkedin.com/in/amitpandit2468' },
  { icon: IconBrandTwitter, href: 'https://twitter.com/amitpandit2468' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(emailAddr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submit = useCallback(async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const r = await fetch('https://formspree.io/f/xeojdynq', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      if (r.ok) { setStatus('success'); setForm({ name: '', email: '', message: '' }); setTimeout(() => setStatus(null), 5000); }
      else throw 0;
    } catch { setStatus('error'); setTimeout(() => setStatus(null), 5000); }
  }, [form]);

  return (
    <section id="contact" className="py-24 md:py-40 bg-[var(--bg-deep)] section-glow">
      <div className="container-wide">
        <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-[var(--accent-color)]" />
          <span className="font-label">Contact</span>
        </m.div>

        <m.h2 initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-[clamp(2.5rem,7vw,5.5rem)] mb-20 max-w-3xl" data-c="hover">
          Let's work together.
        </m.h2>

        <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
          <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-md leading-relaxed">
              Have a project, a full-time role, or just want to talk? Drop a message or reach out directly.
            </p>

            <div className="flex items-center gap-3 mb-8">
              <a href={`mailto:${emailAddr}`}
                className="px-6 py-3 bg-[var(--text)] text-[var(--bg)] rounded-full text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2"
                data-c="hover"><IconMail size={16} />{emailAddr}</a>
              <button onClick={copy} data-c="hover"
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text-muted)] transition-all">
                {copied ? <IconCheck size={14} className="text-green-500" /> : <IconCopy size={14} />}
              </button>
            </div>

            <div className="flex gap-2 mb-10">
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" data-c="hover"
                  className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text-muted)] transition-all">
                  <s.icon size={16} />
                </a>
              ))}
            </div>
            <p className="font-label text-[0.625rem]">Mumbai, India · IST</p>
          </m.div>

          <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <form onSubmit={submit} className="space-y-6">
              {[
                { id: 'name', label: 'Name', type: 'text', ph: 'Your name' },
                { id: 'email', label: 'Email', type: 'email', ph: 'you@email.com' },
              ].map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="font-label block mb-3">{f.label}</label>
                  <input type={f.type} id={f.id} value={form[f.id]}
                    onChange={e => setForm({ ...form, [f.id]: e.target.value })} required placeholder={f.ph}
                    className="w-full bg-transparent border-b border-[var(--border-strong)] py-3 text-sm outline-none focus:border-[var(--accent-color)] transition-colors placeholder:text-[var(--text-muted)]" />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="font-label block mb-3">Message</label>
                <textarea id="message" value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })} required rows={4} placeholder="About your project..."
                  className="w-full bg-transparent border-b border-[var(--border-strong)] py-3 text-sm outline-none focus:border-[var(--accent-color)] transition-colors placeholder:text-[var(--text-muted)] resize-none" />
              </div>
              <button type="submit" disabled={status === 'loading'} data-c="hover"
                className="px-8 py-4 bg-[var(--text)] text-[var(--bg)] rounded-full text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-40 flex items-center gap-2">
                {status === 'loading' ? 'Sending...' : <><span>Send message</span><IconSend size={14} /></>}
              </button>
              {status === 'success' && <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 text-sm flex items-center gap-2"><IconCheck size={14} />Sent!</m.p>}
              {status === 'error' && <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[var(--accent-color)] text-sm">Failed. Email me directly.</m.p>}
            </form>
          </m.div>
        </div>

        <div className="mt-32 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg">amit<span className="text-pop">.</span></span>
          <span className="text-[var(--text-muted)] text-xs">© {new Date().getFullYear()} Amit Pandit</span>
        </div>
      </div>
    </section>
  );
}
