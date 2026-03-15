"use client";

import { useRef, useEffect, useCallback } from 'react';
import { m, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

export default function PanelHero() {
  const mx = useMotionValue(.5), my = useMotionValue(.5);
  const smx = useSpring(mx, { stiffness: 20, damping: 15 });
  const smy = useSpring(my, { stiffness: 20, damping: 15 });
  const orbX = useTransform(smx, [0, 1], [-50, 50]);
  const orbY = useTransform(smy, [0, 1], [-40, 40]);
  const orbX2 = useTransform(smx, [0, 1], [40, -40]);
  const orbY2 = useTransform(smy, [0, 1], [30, -30]);

  const onMove = useCallback(e => {
    mx.set(e.clientX / window.innerWidth);
    my.set(e.clientY / window.innerHeight);
  }, [mx, my]);

  useEffect(() => {
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [onMove]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Gradient orbs */}
      <m.div style={{ x: orbX, y: orbY }}
        className="absolute top-[5%] right-[-5%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle,var(--rose-glow),transparent 65%)', filter: 'blur(80px)' }} />
      </m.div>
      <m.div style={{ x: orbX2, y: orbY2 }}
        className="absolute bottom-[-8%] left-[-5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full pointer-events-none">
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle,rgba(99,102,241,.05),transparent 60%)', filter: 'blur(100px)' }} />
      </m.div>

      {/* SVG constellation */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" fill="none">
        {[[150,120],[380,80],[620,180],[830,110],[300,420],[680,470],[120,380],[870,350],[500,280]].map(([cx,cy],i) => (
          <m.circle key={i} cx={cx} cy={cy} r={1.5} fill="var(--rose)" opacity={.12}
            animate={{ r: [1.5, 2.5, 1.5], opacity: [.08, .25, .08] }}
            transition={{ duration: 3 + i * .4, repeat: Infinity, delay: i * .2 }} />
        ))}
        {[[150,120,380,80],[380,80,620,180],[620,180,830,110],[300,420,500,280],[500,280,680,470],[120,380,300,420]].map(([x1,y1,x2,y2],i) => (
          <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--rose)" strokeWidth=".3" opacity=".05" />
        ))}
      </svg>

      {/* Rotating ring */}
      <m.svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] pointer-events-none opacity-[.06]"
        viewBox="0 0 400 400" fill="none"
        animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}>
        <circle cx="200" cy="200" r="180" stroke="var(--rose)" strokeWidth=".5" strokeDasharray="5 15" />
        <circle cx="200" cy="200" r="140" stroke="var(--ink3)" strokeWidth=".3" strokeDasharray="2 20" />
      </m.svg>

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 max-w-5xl w-full">
        <m.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: .8 }}
          className="f-label mb-8 tracking-[.2em]">Product Engineer · Mumbai</m.p>

        <div className="overflow-hidden mb-1">
          <m.h1 className="f-display text-[clamp(4rem,14vw,12rem)]"
            initial={{ y: '110%' }} animate={{ y: '0%' }}
            transition={{ delay: 2.2, duration: 1.1, ease: [.76, 0, .24, 1] }}>
            I build
          </m.h1>
        </div>
        <div className="overflow-hidden">
          <m.h1 className="f-display text-[clamp(4rem,14vw,12rem)]" style={{ color: 'var(--rose)' }}
            initial={{ y: '110%' }} animate={{ y: '0%' }}
            transition={{ delay: 2.35, duration: 1.1, ease: [.76, 0, .24, 1] }}>
            products
          </m.h1>
        </div>

        <m.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: .8 }}
          className="mt-10 text-[var(--ink2)] text-base md:text-lg max-w-md font-serif italic leading-relaxed">
          106 sales in 6 days. An entire e-commerce business — brand, store, logistics, ads — shipped from scratch.
        </m.p>

        <m.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: .8 }}
          className="mt-8 flex gap-4 flex-wrap">
          <span className="f-label tracking-[.15em] animate-pulse" style={{ color: 'var(--ink3)' }}>
            Scroll to explore →
          </span>
        </m.div>
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[.015] dark:opacity-[.025]" style={{
        backgroundImage: 'radial-gradient(circle,var(--ink) .5px,transparent .5px)',
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse at 40% 45%,black 15%,transparent 55%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 40% 45%,black 15%,transparent 55%)',
      }} />
    </div>
  );
}
