"use client";

import { useState, useRef, useCallback } from 'react';
import { m } from 'framer-motion';
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
import { ScrollTextReveal } from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';

const socials = [
  { icon: IconBrandGithub, href: 'https://github.com/arxel2468', label: 'GitHub' },
  { icon: IconBrandLinkedin, href: 'https://linkedin.com/in/amitpandit2468', label: 'LinkedIn' },
  { icon: IconBrandTwitter, href: 'https://twitter.com/amitpandit2468', label: 'Twitter' },
];

function createBurst(el) {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const canvas = document.createElement('canvas');
  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const particles = Array.from({ length: 24 }, () => ({
    x: cx, y: cy,
    vx: (Math.random() - 0.5) * 7,
    vy: (Math.random() - 0.5) * 7 - 2,
    r: Math.random() * 2.5 + 1,
    color: ['#E11D48', '#FB7185', '#1C1917', '#D6D3D1'][Math.floor(Math.random() * 4)],
    life: 1,
    decay: Math.random() * 0.02 + 0.012,
  }));

  let id;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach((p) => {
      if (p.life <= 0) return;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08;
      p.life -= p.decay;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    if (alive) { id = requestAnimationFrame(animate); }
    else { cancelAnimationFrame(id); canvas.remove(); }
  }
  animate();
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const submitRef = useRef(null);
  const email = '1amitpandit2468@gmail.com';

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setStatus('loading');
      try {
        const res = await fetch('https://formspree.io/f/xeojdynq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          setStatus('success');
          setForm({ name: '', email: '', message: '' });
          createBurst(submitRef.current);
          setTimeout(() => setStatus(null), 5000);
        } else throw new Error();
      } catch {
        setStatus('error');
        setTimeout(() => setStatus(null), 5000);
      }
    },
    [form]
  );

  return (
    <section id="contact" className="py-32 md:py-40 relative overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="type-mono block mb-4">Contact</span>
            <h2 className="type-headline mb-6" data-cursor="text">
              <ScrollTextReveal>Let's build something.</ScrollTextReveal>
            </h2>
            <p className="type-body-lg mb-10">
              Have a project in mind or a full-time role? I'd love to hear about it. Reach out and let's talk.
            </p>

            {/* Email */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <MagneticButton strength={0.1}>
                <a
                  href={`mailto:${email}`}
                  className="btn btn-primary text-sm"
                  data-cursor="pointer"
                >
                  <IconMail size={16} />
                  {email}
                </a>
              </MagneticButton>
              <button
                onClick={copyEmail}
                className="btn btn-secondary text-sm"
                data-cursor="pointer"
              >
                {copied ? (
                  <>
                    <IconCheck size={16} className="text-[#22C55E]" />
                    Copied
                  </>
                ) : (
                  <>
                    <IconCopy size={16} />
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 mb-10 type-body text-sm">
              <IconMapPin size={16} className="text-accent" />
              <span>Mumbai, India · IST (UTC+5:30)</span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <MagneticButton key={s.label} strength={0.2}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all"
                    aria-label={s.label}
                    data-cursor="pointer"
                  >
                    <s.icon size={18} />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </m.div>

          {/* Right — Form */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-8"
            >
              <h3 className="type-title mb-8">Send a message</h3>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="type-mono block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="input"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="type-mono block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="input"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="type-mono block mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="input textarea"
                    placeholder="Tell me about your project or role..."
                  />
                </div>

                <button
                  ref={submitRef}
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-primary w-full disabled:opacity-50"
                  data-cursor="pointer"
                >
                  {status === 'loading' ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <IconSend size={16} />
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <m.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[#22C55E] flex items-center gap-2"
                  >
                    <IconCheck size={16} />
                    Sent! I'll reply soon.
                  </m.p>
                )}
                {status === 'error' && (
                  <m.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[#E11D48]"
                  >
                    Something went wrong. Email me directly.
                  </m.p>
                )}
              </div>
            </form>
          </m.div>
        </div>
      </div>
    </section>
  );
}
