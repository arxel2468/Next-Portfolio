"use client";

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export default function AnimatedNumber({ value, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState('0');

  const parsed = parseValue(value);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20, restDelta: 0.01 });

  useEffect(() => {
    if (isInView) motionVal.set(parsed.number);
  }, [isInView, parsed.number, motionVal]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => {
      setDisplay(parsed.isDecimal ? v.toFixed(2) : Math.round(v).toString());
    });
    return unsub;
  }, [spring, parsed.isDecimal]);

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}{isInView ? display : '0'}{parsed.suffix}
    </span>
  );
}

function parseValue(value) {
  const str = String(value);
  const match = str.match(/^([<>₹$]*)([0-9.]+)(.*)$/);
  if (!match) return { prefix: '', number: 0, suffix: str, isDecimal: false };
  return {
    prefix: match[1] || '',
    number: parseFloat(match[2]),
    suffix: match[3] || '',
    isDecimal: match[2].includes('.'),
  };
}
