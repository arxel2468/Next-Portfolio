// src/components/sections/Contact.jsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import s from './Contact.module.css';
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

      <motion.div
        className={s.inner}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* The whole section is mostly empty space — intentional */}
        <h2 className={s.heading}>
          Let's figure<br />something out.
        </h2>

        <div className={s.options}>
          <div className={s.option}>
            <span className={s.optionLabel}>Write</span>
            <a
              href={`mailto:${about.email}`}
              className={s.optionValue}
              data-hover
            >
              {about.email}
            </a>
          </div>
          <div className={s.divider} aria-hidden="true" />
          <div className={s.option}>
            <span className={s.optionLabel}>Schedule</span>
            <a
              href={about.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className={s.optionValue}
              data-hover
            >
              calendly.com/amitpandit2468
            </a>
          </div>
        </div>

        {/* Optional form — for those who want to say more */}
        <div className={s.formWrap}>
          <p className={s.formIntro}>
            Or leave a note here.
          </p>

          {status === 'sent' ? (
            <motion.p
              className={s.sent}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Got it. I'll write back if it resonates.
            </motion.p>
          ) : (
            <form className={s.form} onSubmit={submit}>
              <div className={s.row}>
                <div className={s.field}>
                  <input
                    type="text"
                    placeholder="Name"
                    className={s.input}
                    required
                    value={form.name}
                    onChange={set('name')}
                    disabled={status === 'sending'}
                  />
                </div>
                <div className={s.field}>
                  <input
                    type="email"
                    placeholder="Email"
                    className={s.input}
                    required
                    value={form.email}
                    onChange={set('email')}
                    disabled={status === 'sending'}
                  />
                </div>
              </div>

              <div className={s.field}>
                <textarea
                  placeholder="What's on your mind."
                  className={s.textarea}
                  rows={5}
                  required
                  value={form.message}
                  onChange={set('message')}
                  disabled={status === 'sending'}
                />
              </div>

              {status === 'error' && (
                <p className={s.error}>
                  Something broke. Email directly:{' '}
                  <a href={`mailto:${about.email}`}>{about.email}</a>
                </p>
              )}

              <button
                type="submit"
                className={s.submit}
                disabled={status === 'sending'}
                data-hover
              >
                {status === 'sending' ? 'Sending…' : 'Send'}
              </button>
            </form>
          )}
        </div>

      </motion.div>

    </section>
  );
}