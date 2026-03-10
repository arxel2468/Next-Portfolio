"use client";

import { useRef, useState } from 'react';
import { m } from 'framer-motion';

export function MagneticCard({ children, className = '', intensity = 4 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0, spotX: 50, spotY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setPosition({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY,
      spotX: (x / rect.width) * 100,
      spotY: (y / rect.height) * 100,
    });
  };

  return (
    <m.div
      ref={ref}
      data-magnetic
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0, spotX: 50, spotY: 50 });
      }}
      animate={{
        rotateX: isHovered ? position.y * -intensity : 0,
        rotateY: isHovered ? position.x * intensity : 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
      className={`relative ${className}`}
    >
      {/* Spotlight gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[20px] transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(500px circle at ${position.spotX}% ${position.spotY}%, var(--brand-primary), transparent 50%)`
            : 'none',
          opacity: isHovered ? 0.07 : 0,
        }}
      />
      {children}
    </m.div>
  );
}
