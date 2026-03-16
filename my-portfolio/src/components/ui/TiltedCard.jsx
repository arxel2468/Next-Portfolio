'use client';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const springValues = { damping: 30, stiffness: 100, mass: 2 };

export default function TiltedCard({ children, containerHeight = '300px', containerWidth = '100%', rotateAmplitude = 14, scaleOnHover = 1.05, className = '' }) {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
  }

  return (
    <figure ref={ref} className={`relative [perspective:800px] ${className}`} style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouse} onMouseEnter={() => scale.set(scaleOnHover)} onMouseLeave={() => { scale.set(1); rotateX.set(0); rotateY.set(0); }}>
      <motion.div className="relative [transform-style:preserve-3d] w-full h-full" style={{ rotateX, rotateY, scale }}>
        {children}
      </motion.div>
    </figure>
  );
}
