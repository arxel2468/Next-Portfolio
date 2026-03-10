"use client";

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export function AnimatedNumber({ value, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [display, setDisplay] = useState('0');

  // Parse the value to extract number, prefix, and suffix
  // Examples: "106" → 106, "₹0.48" → 0.48, "7x" → 7, "<1 day" → 1, "4+" → 4
  const parsed = parseValue(value);

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(parsed.number);
    }
  }, [isInView, parsed.number, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => {
      if (parsed.isDecimal) {
        setDisplay(v.toFixed(2));
      } else {
        setDisplay(Math.round(v).toString());
      }
    });
    return unsubscribe;
  }, [spring, parsed.isDecimal]);

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {isInView ? display : '0'}
      {parsed.suffix}
    </span>
  );
}

function parseValue(value) {
  const str = String(value);

  // Match patterns like "<1 day", "₹0.48", "7x", "4+", "106"
  const match = str.match(/^([<>₹$]*)([0-9.]+)(.*)$/);

  if (!match) {
    return { prefix: '', number: 0, suffix: str, isDecimal: false };
  }

  const num = parseFloat(match[2]);

  return {
    prefix: match[1] || '',
    number: num,
    suffix: match[3] || '',
    isDecimal: match[2].includes('.'),
  };
}
