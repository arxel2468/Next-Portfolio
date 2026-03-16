"use client";

import { useState, useCallback } from 'react';
import { m } from 'framer-motion';
import { IconMail, IconSend, IconCheck, IconCopy, IconArrowUpRight } from '@tabler/icons-react';
import { email, socials } from '@/data/content';
import { RevealText, FadeUp, CharReveal } from '../ui/TextReveal';
import MagneticButton from '../ui/MagneticButton';
import SpotlightCard from '../ui/SpotlightCard';
import Lamp from '../ui/Lamp';

export default function SectionContact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const submit = useCallback(async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const r = await fetch('https://formspree.io/f/xeojdynq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (r.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(null), 5000);
      } else throw 0;
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  }, [form]);

  return (
    <section id="contact" className="py-28 md:py-44 bg-card/30 relative overflow-hidden">
      {/* Lamp effect */}
      <Lamp className="pt-20 pb-10">
        <m.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="f-mono text-accent text-[0.6rem] tracking-[0.3em] block">
            Contact
          </span>
        </m.div>
      </Lamp>

      <div className="wrap relative z-10">
        {/* Big heading */}
        <div className="text-center mb-6">
          <RevealText>
            <h2 className="f-head text-[clamp(2.5rem,8vw,6rem)] leading-[0.9]">
              Let&apos;s build
            </h2>
          </RevealText>
          <RevealText delay={0.08}>
            <h2 className="f-head text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] text-gradient">
              something great.
            </h2>
          </RevealText>
        </div>

        <FadeUp delay={0.2}>
          <p className="text-center text-muted-foreground text-sm md:text-base max-w-md mx-auto mb-16">
            Project, full-time role, or just want to connect — I&apos;m always open.
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 max-w-4xl mx-auto">
          {/* Left — contact info */}
          <FadeUp>
            <div className="space-y-8">
              {/* Email */}
              <SpotlightCard className="p-6">
                <p className="f-mono text-[0.55rem] text-accent mb-4">Email</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <MagneticButton>
                    <a
                      href={`mailto:${email}`}
                      className="group px-5 py-3 bg-gradient-to-r from-accent to-orange-500 text-white rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 transition-shadow flex items-center gap-2"
                    >
                      <IconMail size={15} />
                      {email}
                    </a>
                  </MagneticButton>

                  <button
                    onClick={copy}
                    className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/50 transition-all"
                    aria-label="Copy email"
                  >
                    {copied ? <IconCheck size={14} className="text-emerald-500" /> : <IconCopy size={14} />}
                  </button>
                </div>
              </SpotlightCard>

              {/* Socials */}
              <SpotlightCard className="p-6">
                <p className="f-mono text-[0.55rem] text-accent mb-4">Elsewhere</p>
                <div className="flex gap-2 flex-wrap">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group px-4 py-2.5 rounded-full border border-border/50 text-muted-foreground text-xs font-medium hover:text-accent hover:border-accent/50 transition-all flex items-center gap-1.5"
                    >
                      {s.label}
                      <IconArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </SpotlightCard>

              {/* Location */}
              <SpotlightCard className="p-6">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="f-mono text-[0.5rem] text-accent mb-1">Location</p>
                    <p className="text-sm font-medium">Mumbai, India</p>
                  </div>
                  <div className="w-px h-10 bg-border/30" />
                  <div>
                    <p className="f-mono text-[0.5rem] text-accent mb-1">Timezone</p>
                    <p className="text-sm font-medium">IST (UTC+5:30)</p>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </FadeUp>

          {/* Right — form */}
          <FadeUp delay={0.15}>
            <SpotlightCard className="p-6 md:p-8">
              <p className="f-mono text-[0.55rem] text-accent mb-6">Send a Message</p>

              <form onSubmit={submit} className="space-y-6">
                {[
                  { id: 'name', label: 'Name', type: 'text', ph: 'Your name' },
                  { id: 'email', label: 'Email', type: 'email', ph: 'your@email.com' },
                ].map((f) => (
                  <div key={f.id} className="group">
                    <label htmlFor={`c-${f.id}`} className="f-mono text-[0.5rem] text-muted-foreground group-focus-within:text-accent transition-colors block mb-2">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      id={`c-${f.id}`}
                      value={form[f.id]}
                      onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                      required
                      placeholder={f.ph}
                      className="w-full bg-transparent border-b-2 border-border/50 py-3 text-sm outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/30"
                    />
                  </div>
                ))}

                <div className="group">
                  <label htmlFor="c-message" className="f-mono text-[0.5rem] text-muted-foreground group-focus-within:text-accent transition-colors block mb-2">
                    Message
                  </label>
                  <textarea
                    id="c-message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full bg-transparent border-b-2 border-border/50 py-3 text-sm outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/30 resize-none"
                  />
                </div>

                <MagneticButton>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative px-7 py-3.5 text-sm font-semibold text-white rounded-full overflow-hidden disabled:opacity-40"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-accent to-orange-500" />
                    <span className="absolute inset-0 bg-gradient-to-r from-accent to-orange-500 blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                      {status === 'loading' ? (
                        <>
                          <m.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="inline-block">⟳</m.span>
                          Sending...
                        </>
                      ) : (
                        <>Send message <IconSend size={14} /></>
                      )}
                    </span>
                  </button>
                </MagneticButton>

                {status === 'success' && (
                  <m.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-400 text-sm flex items-center gap-2 font-medium">
                    <IconCheck size={16} /> Sent! I&apos;ll reply soon.
                  </m.p>
                )}
                {status === 'error' && (
                  <m.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-accent text-sm font-medium">
                    Failed — please email me directly.
                  </m.p>
                )}
              </form>
            </SpotlightCard>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
