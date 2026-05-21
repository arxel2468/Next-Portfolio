'use client';
import { useEffect, useRef } from 'react';
import styles from './RevealText.module.css';

/**
 * Splits text into lines wrapped in overflow-hidden containers.
 * Each line slides up on intersection.
 */
export default function RevealText({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  stagger = 80,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const lines = el.querySelectorAll(`.${styles.lineInner}`);
          lines.forEach((line, i) => {
            setTimeout(() => {
              line.style.transform = 'translateY(0)';
              line.style.opacity   = '1';
            }, delay + i * stagger);
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, stagger]);

  return (
    <Tag ref={ref} className={`${styles.root} ${className}`}>
      <span className={styles.lineWrap}>
        <span className={styles.lineInner}>{children}</span>
      </span>
    </Tag>
  );
}