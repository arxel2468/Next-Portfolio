"use client";

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export default function AnimatedCounter({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState('0');
  const parsed = parseValue(String(value));
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 40, damping: 18, mass: 1 });

  useEffect(() => {
    if (inView) mv.set(parsed.num);
  }, [inView, parsed.num, mv]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => {
      setDisplay(parsed.dec ? v.toFixed(parsed.dp) : String(Math.round(v)));
    });
    return unsub;
  }, [spring, parsed.dec, parsed.dp]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix || parsed.pre}
      {display}
      {suffix || parsed.suf}
    </span>
  );
}

function parseValue(s) {
  let pre = '', num = '', suf = '', found = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (!found && ((c >= '0' && c <= '9') || (c === '.' && s[i + 1] >= '0'))) {
      found = true; num += c;
    } else if (!found) pre += c;
    else if ((c >= '0' && c <= '9') || c === '.') num += c;
    else { suf = s.slice(i); break; }
  }
  return { pre, num: parseFloat(num) || 0, suf, dec: num.includes('.'), dp: num.includes('.') ? (num.split('.')[1] || '').length : 0 };
}
