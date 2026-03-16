'use client';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useCallback } from 'react';

export default function CountUp({ to, from = 0, direction = 'up', delay = 0, duration = 2, className = '', startWhen = true, separator = '', onStart, onEnd }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, { damping, stiffness });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const getDecimalPlaces = num => {
    const str = num.toString();
    if (str.includes('.')) { const d = str.split('.')[1]; if (parseInt(d) !== 0) return d.length; }
    return 0;
  };
  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(latest => {
    const opts = { useGrouping: !!separator, minimumFractionDigits: maxDecimals, maximumFractionDigits: maxDecimals };
    const formatted = Intl.NumberFormat('en-US', opts).format(latest);
    return separator ? formatted.replace(/,/g, separator) : formatted;
  }, [maxDecimals, separator]);

  useEffect(() => { if (ref.current) ref.current.textContent = formatValue(direction === 'down' ? to : from); }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (isInView && startWhen) {
      onStart?.();
      const t1 = setTimeout(() => motionValue.set(direction === 'down' ? from : to), delay * 1000);
      const t2 = setTimeout(() => onEnd?.(), delay * 1000 + duration * 1000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  useEffect(() => {
    const unsub = springValue.on('change', latest => { if (ref.current) ref.current.textContent = formatValue(latest); });
    return () => unsub();
  }, [springValue, formatValue]);

  return <span className={`tabular-nums ${className}`} ref={ref} />;
}
