'use client';
import { useRef, useLayoutEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const update = () => { if (ref.current) setWidth(ref.current.offsetWidth); };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [ref]);
  return width;
}

function VelocityRow({ children, baseVelocity = 100, className = '' }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const copyRef = useRef(null);
  const copyWidth = useElementWidth(copyRef);
  const x = useTransform(baseX, v => {
    if (copyWidth === 0) return '0px';
    const range = copyWidth;
    const mod = ((v % range) + range) % range;
    return `${-mod}px`;
  });
  const directionFactor = useRef(1);
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });
  return (
    <div className="relative overflow-hidden">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <span className={`flex-shrink-0 ${className}`} key={i} ref={i === 0 ? copyRef : null}>
            {children}&nbsp;&nbsp;&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function ScrollVelocity({ texts = [], velocity = 100, className = '' }) {
  return (
    <section>
      {texts.map((text, i) => (
        <VelocityRow key={i} className={className} baseVelocity={i % 2 !== 0 ? -velocity : velocity}>
          {text}
        </VelocityRow>
      ))}
    </section>
  );
}
