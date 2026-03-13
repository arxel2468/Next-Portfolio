"use client";

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export default function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(null);
  const p = parse(String(value));
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 20 });

  useEffect(() => { if (inView) mv.set(p.num); }, [inView, p.num, mv]);
  useEffect(() => {
    const u = spring.on('change', v => setDisplay(p.dec ? v.toFixed(p.dp) : String(Math.round(v))));
    return u;
  }, [spring, p.dec, p.dp]);

  return <span ref={ref}>{p.pre}{display ?? '0'}{p.suf}</span>;
}

function parse(s) {
  let pre = '', num = '', suf = '', found = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (!found && ((c >= '0' && c <= '9') || (c === '.' && s[i+1] >= '0'))) { found = true; num += c; }
    else if (!found) pre += c;
    else if ((c >= '0' && c <= '9') || c === '.') num += c;
    else { suf = s.slice(i); break; }
  }
  return { pre, num: parseFloat(num) || 0, suf, dec: num.includes('.'), dp: num.includes('.') ? (num.split('.')[1]||'').length : 0 };
}
