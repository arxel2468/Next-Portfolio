'use client';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import SplitText from '../ui/SplitText';
import CountUp from '../ui/CountUp';
import StarBorder from '../ui/StarBorder';

const Silk = dynamic(() => import('../ui/Silk'), { ssr: false });

const STATS = [
  { to: 106, label: 'Sales shipped', suffix: '+' },
  { to: 46.4, label: 'Best ROAS', suffix: 'x' },
  { to: 24, label: 'Hrs to launch', prefix: '<' },
  { to: 4, label: 'Products built', suffix: '+' },
];

const scrollTo = id => {
  const el = document.getElementById(id);
  if (el && window.lenis) window.lenis.scrollTo(el, { offset: -60, duration: 1.2 });
};

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <Suspense fallback={null}>
          <Silk speed={3} scale={1.5} color="#64ffda" noiseIntensity={1.2} rotation={0} />
        </Suspense>
      </div>

      <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, var(--bg) 75%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[1]" style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }} />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 max-w-[1200px] mx-auto pt-28 pb-20">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
          className="font-mono text-sm mb-8" style={{ color: 'var(--accent)' }}>
          Hi, I&apos;m
        </motion.p>

        <div className="mb-4">
          <SplitText text="Amit Pandit."
            className="font-serif text-[clamp(3rem,10vw,7rem)] leading-[0.9] tracking-[-0.04em]"
            delay={30} duration={1} ease="power3.out" textAlign="left"
            from={{ opacity: 0, y: 60 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="0px" />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.6 }}>
          <p className="text-[clamp(1.5rem,4vw,2.5rem)] font-serif leading-[1.15] max-w-[600px] mb-10" style={{ color: 'var(--text-2)' }}>
            I build products that{' '}
            <span style={{ color: 'var(--accent)' }}>make money.</span>
          </p>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.5 }}
          className="text-base max-w-[460px] leading-relaxed mb-10">
          Product engineer who ships entire businesses from scratch. Last build:{' '}
          <span style={{ color: 'var(--accent)' }}>106 purchases in 6 days</span> with a{' '}
          <span style={{ color: 'var(--accent)' }}>46.4x ROAS</span>.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1, duration: 0.5 }}
          className="flex gap-4 flex-wrap mb-16 md:mb-24">
          <StarBorder color="rgba(100,255,218,0.6)" speed="4s">
            <button onClick={() => scrollTo('work')} className="px-6 py-3 font-mono text-sm" style={{ color: 'var(--accent)' }}>
              See my work →
            </button>
          </StarBorder>
          <button onClick={() => scrollTo('contact')}
            className="px-6 py-3 font-mono text-sm rounded-[20px] border transition-colors"
            style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-2)'; }}>
            Get in touch
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          {STATS.map((s, i) => (
            <div key={i}>
              <span className="font-serif text-3xl md:text-4xl block mb-1" style={{ color: 'var(--text)' }}>
                {s.prefix || ''}<CountUp to={s.to} duration={2.5} delay={0.3} />{s.suffix || ''}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
