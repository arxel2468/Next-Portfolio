'use client';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { IconMail, IconSend, IconCheck, IconCopy } from '@tabler/icons-react';
import { email, socials } from '@/data/content';
import SpotlightCard from '../ui/SpotlightCard';
import StarBorder from '../ui/StarBorder';
import ScrollFloat from '../ui/ScrollFloat';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => { await navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const submit = useCallback(async (e) => {
    e.preventDefault(); setStatus('loading');
    try {
      const r = await fetch('https://formspree.io/f/xeojdynq', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (r.ok) { setStatus('success'); setForm({ name: '', email: '', message: '' }); setTimeout(() => setStatus(null), 5000); } else throw new Error();
    } catch { setStatus('error'); setTimeout(() => setStatus(null), 5000); }
  }, [form]);

  return (
    <section id="contact" className="py-20 md:py-32 px-6 md:px-12 lg:px-16 max-w-[1200px] mx-auto">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3 block" style={{ color: 'var(--accent)' }}>04 · Contact</span>

      <ScrollFloat containerClassName="mb-8" textClassName="font-serif text-[clamp(2rem,6vw,4rem)] text-[var(--text)]" animationDuration={0.8} stagger={0.02}>
        Let&apos;s build something.
      </ScrollFloat>

      <p className="text-[15px] max-w-[480px] leading-relaxed mb-12">
        Project, full-time role, or just want to connect — I&apos;m always open.
      </p>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="space-y-6">
          <SpotlightCard className="p-5" spotlightColor="rgba(100,255,218,0.06)">
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] mb-3 block" style={{ color: 'var(--accent)' }}>Email</span>
            <div className="flex items-center gap-3 flex-wrap">
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 font-mono text-sm transition-colors" style={{ color: 'var(--accent)' }}>
                <IconMail size={15} /> {email}
              </a>
              <button onClick={copy} className="w-8 h-8 rounded-lg border flex items-center justify-center transition-colors"
                style={{ borderColor: 'var(--border)', color: 'var(--text-3)' }}>
                {copied ? <IconCheck size={13} className="text-emerald-400" /> : <IconCopy size={13} />}
              </button>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-5" spotlightColor="rgba(100,255,218,0.06)">
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] mb-3 block" style={{ color: 'var(--accent)' }}>Elsewhere</span>
            <div className="flex gap-2 flex-wrap">
              {socials.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg font-mono text-[11px] border transition-colors"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
                  onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-2)'; }}>
                  {s.name}
                </a>
              ))}
            </div>
          </SpotlightCard>

          <div className="flex gap-8">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider block mb-1" style={{ color: 'var(--accent)' }}>Location</span>
              <span className="text-sm" style={{ color: 'var(--text)' }}>Mumbai, India</span>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider block mb-1" style={{ color: 'var(--accent)' }}>Timezone</span>
              <span className="text-sm" style={{ color: 'var(--text)' }}>IST (UTC+5:30)</span>
            </div>
          </div>
        </div>

        <SpotlightCard className="p-6 md:p-8" spotlightColor="rgba(100,255,218,0.06)">
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] mb-6 block" style={{ color: 'var(--accent)' }}>Send a Message</span>
          <form onSubmit={submit} className="space-y-5">
            {[{ id: 'name', label: 'Name', type: 'text', ph: 'Your name' }, { id: 'email', label: 'Email', type: 'email', ph: 'your@email.com' }].map(f => (
              <div key={f.id}>
                <label htmlFor={`c-${f.id}`} className="font-mono text-[9px] uppercase tracking-wider block mb-2" style={{ color: 'var(--text-3)' }}>{f.label}</label>
                <input type={f.type} id={`c-${f.id}`} value={form[f.id]} onChange={e => setForm({ ...form, [f.id]: e.target.value })} required placeholder={f.ph}
                  className="w-full bg-transparent py-2.5 text-sm outline-none transition-colors border-b"
                  style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
            ))}
            <div>
              <label htmlFor="c-msg" className="font-mono text-[9px] uppercase tracking-wider block mb-2" style={{ color: 'var(--text-3)' }}>Message</label>
              <textarea id="c-msg" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={3} placeholder="About your project..."
                className="w-full bg-transparent py-2.5 text-sm outline-none resize-none transition-colors border-b"
                style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
            <StarBorder color="rgba(100,255,218,0.5)" speed="5s">
              <button type="submit" disabled={status === 'loading'} className="flex items-center gap-2 px-5 py-2.5 font-mono text-[12px] disabled:opacity-40" style={{ color: 'var(--accent)' }}>
                {status === 'loading' ? 'Sending...' : <><span>Send</span><IconSend size={13} /></>}
              </button>
            </StarBorder>
            {status === 'success' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400 text-sm flex items-center gap-1.5 font-mono"><IconCheck size={14} /> Sent!</motion.p>}
            {status === 'error' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-mono" style={{ color: 'var(--accent)' }}>Failed — email me directly.</motion.p>}
          </form>
        </SpotlightCard>
      </div>
    </section>
  );
}
