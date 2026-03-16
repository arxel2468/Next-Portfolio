'use client';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function DecryptedText({ text, speed = 50, maxIterations = 10, sequential = false, revealDirection = 'start', characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+', className = '', parentClassName = '', encryptedClassName = '', animateOn = 'view', ...props }) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== 'click');
  const containerRef = useRef(null);
  const availableChars = useMemo(() => characters.split(''), [characters]);

  const shuffleText = useCallback((orig, revealed) => {
    return orig.split('').map((c, i) => {
      if (c === ' ') return ' ';
      if (revealed.has(i)) return orig[i];
      return availableChars[Math.floor(Math.random() * availableChars.length)];
    }).join('');
  }, [availableChars]);

  const triggerDecrypt = useCallback(() => {
    setRevealedIndices(new Set());
    setIsAnimating(true);
  }, []);

  useEffect(() => {
    if (!isAnimating) return;
    let iteration = 0;
    const interval = setInterval(() => {
      if (sequential) {
        setRevealedIndices(prev => {
          if (prev.size >= text.length) { clearInterval(interval); setIsAnimating(false); setIsDecrypted(true); return prev; }
          const next = new Set(prev);
          const idx = revealDirection === 'end' ? text.length - 1 - prev.size : prev.size;
          next.add(idx);
          setDisplayText(shuffleText(text, next));
          return next;
        });
      } else {
        setDisplayText(shuffleText(text, revealedIndices));
        iteration++;
        if (iteration >= maxIterations) { clearInterval(interval); setIsAnimating(false); setDisplayText(text); setIsDecrypted(true); }
      }
    }, speed);
    return () => clearInterval(interval);
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, shuffleText, revealedIndices]);

  useEffect(() => {
    if (animateOn !== 'view') return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting && !hasAnimated) { triggerDecrypt(); setHasAnimated(true); } });
    }, { threshold: 0.1 });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => { if (containerRef.current) observer.unobserve(containerRef.current); };
  }, [animateOn, hasAnimated, triggerDecrypt]);

  useEffect(() => { setDisplayText(text); setIsDecrypted(true); }, [text]);

  const hoverProps = animateOn === 'hover' ? {
    onMouseEnter: () => { if (!isAnimating) { setRevealedIndices(new Set()); setIsDecrypted(false); setIsAnimating(true); } },
    onMouseLeave: () => { setIsAnimating(false); setRevealedIndices(new Set()); setDisplayText(text); setIsDecrypted(true); },
  } : {};

  return (
    <motion.span ref={containerRef} className={`inline-block whitespace-pre-wrap ${parentClassName}`} {...hoverProps} {...props}>
      <span aria-hidden="true">
        {displayText.split('').map((char, i) => {
          const revealed = revealedIndices.has(i) || (!isAnimating && isDecrypted);
          return <span key={i} className={revealed ? className : encryptedClassName}>{char}</span>;
        })}
      </span>
    </motion.span>
  );
}
