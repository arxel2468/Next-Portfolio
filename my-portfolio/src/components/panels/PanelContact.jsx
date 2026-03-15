"use client";

import { useState, useCallback } from 'react';
import { m } from 'framer-motion';
import { IconMail, IconSend, IconCheck, IconCopy } from '@tabler/icons-react';
import { email, socials } from '@/data/content';

export default function PanelContact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => { await navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const submit = useCallback(async e => {
    e.preventDefault(); setStatus('loading');
    try {
      const r = await fetch('https://formspree.io/f/xeojdynq', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (r.ok) { setStatus('success'); setForm({ name: '', email: '', message: '' }); setTimeout(() => setStatus(null), 5000); } else throw 0;
    } catch { setStatus('error'); setTimeout(() => setStatus(null), 5000); }
  }, [form]);

  return (
    <div className="w-full h-full flex flex-col md:flex-row relative overflow-hidden bg-[var(--bg2)]">
      {/* Decorative arcs */}
      <svg className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none opacity-[.03] dark:opacity-[.05]" viewBox="0 0 400 400" fill="none">
        <m.circle cx="400" cy="400" r="200" stroke="var(--rose)" strokeWidth=".5"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 2 }} />
        <m.circle cx="400" cy="400" r="280" stroke="var(--ink3)" strokeWidth=".3"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 2.5, delay: .3 }} />
        <m.circle cx="400" cy="400" r="350" stroke="var(--rose)" strokeWidth=".2"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 3, delay: .5 }} />
      </svg>

      {/* Left — statement */}
      <div className="md:w-[45%] h-full flex flex-col justify-center px-8 md:px-16 py-16">
        <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-[var(--rose)]" />
          <span className="f-label">Contact</span>
        </m.div>

        <div className="overflow-hidden mb-8">
          <m.h2 initial={{ y: '100%' }} whileInView={{ y: '0%' }} viewport={{ once: true }}
            transition={{ duration: .9, ease: [.76, 0, .24, 1] }}
            className="f-head text-[clamp(2.5rem,5vw,4.5rem)]" data-c="hover">
            Let's build<br />something.
          </m.h2>
        </div>

        <m.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-[var(--ink2)] text-sm mb-8 max-w-sm leading-relaxed">
          Project, role, or just want to connect — I'm always open.
        </m.p>

        <div className="flex items-center gap-3 mb-6">
          <a href={`mailto:${email}`} data-c="hover"
            className="px-4 py-2.5 bg-[var(--rose)] text-white rounded-full text-xs font-medium hover:opacity-85 transition-opacity flex items-center gap-2">
            <IconMail size={13} />{email}
          </a>
          <button onClick={copy} data-c="hover"
            className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--ink3)] hover:text-[var(--ink)] transition-colors">
            {copied ? <IconCheck size={12} className="text-green-500" /> : <IconCopy size={12} />}
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          {socials.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" data-c="hover"
              className="px-3 py-1.5 rounded-full border border-[var(--line)] text-[var(--ink3)] text-[.625rem] font-medium hover:text-[var(--ink)] hover:border-[var(--rose)] transition-all">
              {s.label}
            </a>
          ))}
        </div>

        <div className="mt-auto pt-8 border-t border-[var(--line)] flex items-center justify-between">
          <span className="f-display text-base">A<span style={{ color: 'var(--rose)' }}>.</span></span>
          <span className="text-[var(--ink3)] text-[.625rem]">© {new Date().getFullYear()} Amit Pandit</span>
        </div>
      </div>

      {/* Right — form */}
      <div className="md:w-[55%] h-full flex items-center px-8 md:px-16 py-16">
        <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="w-full max-w-md">
          <form onSubmit={submit} className="space-y-6">
            {[{ id: 'name', l: 'Name', t: 'text', ph: 'Name' }, { id: 'email', l: 'Email', t: 'email', ph: 'Email' }].map(f => (
              <div key={f.id}>
                <label htmlFor={f.id} className="f-label block mb-2">{f.l}</label>
                <input type={f.t} id={f.id} value={form[f.id]} onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                  required placeholder={f.ph}
                  className="w-full bg-transparent border-b border-[var(--line2)] py-3 text-sm outline-none focus:border-[var(--rose)] transition-colors placeholder:text-[var(--ink3)]" />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="f-label block mb-2">Message</label>
              <textarea id="message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                required rows={3} placeholder="About your project..."
                className="w-full bg-transparent border-b border-[var(--line2)] py-3 text-sm outline-none focus:border-[var(--rose)] transition-colors placeholder:text-[var(--ink3)] resize-none" />
            </div>
            <button type="submit" disabled={status === 'loading'} data-c="hover"
              className="px-6 py-3 bg-[var(--ink)] text-[var(--bg)] rounded-full text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-40 flex items-center gap-2">
              {status === 'loading' ? 'Sending...' : <>Send<IconSend size={12} /></>}
            </button>
            {status === 'success' && <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 text-xs flex items-center gap-2"><IconCheck size={12} />Sent!</m.p>}
            {status === 'error' && <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs" style={{ color: 'var(--rose)' }}>Failed — email directly.</m.p>}
          </form>
        </m.div>
      </div>
    </div>
  );
}
