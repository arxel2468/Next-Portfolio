"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CircuitPath({ start, end, animated = true }) {
  const [path, setPath] = useState("");
  
  useEffect(() => {
    // Calculate path with right angles
    const startX = parseFloat(start.x) / 100 * window.innerWidth;
    const startY = parseFloat(start.y) / 100 * window.innerHeight;
    const endX = parseFloat(end.x) / 100 * window.innerWidth;
    const endY = parseFloat(end.y) / 100 * window.innerHeight;
    
    // Determine if we should go horizontal first or vertical first
    const dx = Math.abs(endX - startX);
    const dy = Math.abs(endY - startY);
    
    let pathData;
    if (dx > dy) {
      // Go horizontal first
      const midX = startX + (endX - startX) / 2;
      pathData = `M ${startX} ${startY} H ${midX} V ${endY} H ${endX}`;
    } else {
      // Go vertical first
      const midY = startY + (endY - startY) / 2;
      pathData = `M ${startX} ${startY} V ${midY} H ${endX} V ${endY}`;
    }
    
    setPath(pathData);
  }, [start, end]);
  
  if (!path) return null;
  
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
      <motion.path
        d={path}
        fill="none"
        stroke="var(--circuit-primary)"
        strokeWidth="2"
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </svg>
  );
}