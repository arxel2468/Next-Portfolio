// src/components/sections/Contact.jsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import s from './Contact.module.css';
import { RevealSection, RevealItem } from '@/components/ui/RevealSection';
import MagneticButton from '@/components/ui/MagneticButton';
import { about } from '@/data/content';

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const r = await fetch('https://formspree.io/f/xeojdynq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      });
      setStatus(r.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className={s.root} aria-label="Contact">

      {/* ── Header ── */}
      <RevealSection>
        <div className={s.header}>
          <RevealItem>
            <div className={s.headerMeta}>
              <span className={s.headerIdx}>03</span>
              <span className={s.headerRule} aria-hidden="true" />
              <span className={s.headerLabel}>An Invitation</span>
            </div>
          </RevealItem>
          <RevealItem>
            <h2 className={s.heading}>
              If something here<br />
              made you <em>curious —</em>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className={s.sub}>
              Bring a question. A half-formed idea. Something you noticed.
              That's enough.
              <br /><br />
              I read everything. I reply to the ones that spark something.
            </p>
          </RevealItem>
        </div>
      </RevealSection>

      {/* ── Two-panel layout ── */}
      <RevealSection>
        <RevealItem>
          <div className={s.panels}>

            {/* Left: Calendly */}
            <div className={s.panelLeft}>
              <p className={s.panelLabel}>Book a call</p>
              <p className={s.panelNote}>Thirty minutes. No agenda required.</p>
              <div className={s.calendlyBox}>
                <div
                  className="calendly-inline-widget"
                  data-url={about.calendly}
                  style={{ minWidth: '280px', height: '520px' }}
                />
                <script
                  type="text/javascript"
                  src="https://assets.calendly.com/assets/external/widget.js"
                  async
                />
              </div>
            </div>

            {/* Divider */}
            <div className={s.divider} aria-hidden="true">
              <div className={s.dividerLine} />
              <span className={s.dividerOr}>or</span>
              <div className={s.dividerLine} />
            </div>

            {/* Right: Form */}
            <div className={s.panelRight}>
              <p className={s.panelLabel}>Write to me</p>
              <p className={s.panelNote}>Async is fine. Preferred, even.</p>

              {status === 'sent' ? (
                <motion.div
                  className={s.sent}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className={s.sentMark}>✓</span>
                  <div>
                    <p className={s.sentHead}>Got it.</p>
                    <p className={s.sentSub}>
                      I'll write back if it resonates.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form
                  className={s.form}
                  onSubmit={submit}
                  aria-label="Contact form"
                >
                  <div className={s.row}>
                    <div className={s.field}>
                      <label htmlFor="c-name" className={s.label}>
                        Name
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        className={s.input}
                        placeholder="Who are you"
                        required
                        value={form.name}
                        onChange={set('name')}
                        disabled={status === 'sending'}
                      />
                    </div>
                    <div className={s.field}>
                      <label htmlFor="c-email" className={s.label}>
                        Email
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        className={s.input}
                        placeholder="Where to reach you"
                        required
                        value={form.email}
                        onChange={set('email')}
                        disabled={status === 'sending'}
                      />
                    </div>
                  </div>

                  <div className={s.field}>
                    <label htmlFor="c-msg" className={s.label}>
                      What's on your mind
                    </label>
                    <textarea
                      id="c-msg"
                      className={s.textarea}
                      rows={8}
                      placeholder="A question. An idea. Something you want to build."
                      required
                      value={form.message}
                      onChange={set('message')}
                      disabled={status === 'sending'}
                    />
                  </div>

                  {status === 'error' && (
                    <p className={s.error}>
                      Something broke. Email me directly:{' '}
                      <a href={`mailto:${about.email}`}>{about.email}</a>
                    </p>
                  )}

                  <div className={s.formFoot}>
                    <MagneticButton
                      type="submit"
                      className={s.submit}
                      disabled={status === 'sending'}
                      strength={0.25}
                    >
                      <span>
                        {status === 'sending' ? 'Sending…' : 'Send it'}
                      </span>
                      {status !== 'sending' && (
                        <span className={s.submitArr} aria-hidden="true">
                          <span className={s.submitLine} />
                          <span className={s.submitHead} />
                        </span>
                      )}
                    </MagneticButton>

                    <span className={s.alt}>
                      or{' '}
                      <a
                        href={`mailto:${about.email}`}
                        className={s.emailLink}
                      >
                        {about.email}
                      </a>
                    </span>
                  </div>
                </form>
              )}
            </div>

          </div>
        </RevealItem>
      </RevealSection>

    </section>
  );
}