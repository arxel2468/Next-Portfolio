"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CircuitPulse({ start, end, delay = 0 }) {
  const [path, setPath] = useState("");
  
  useEffect(() => {
    // Calculate path with right angles (same as CircuitPath)
    const startX = parseFloat(start.x) / 100 * window.innerWidth;
    const startY = parseFloat(start.y) / 100 * window.innerHeight;
    const endX = parseFloat(end.x) / 100 * window.innerWidth;
    const endY = parseFloat(end.y) / 100 * window.innerHeight;
    
    const dx = Math.abs(endX - startX);
    const dy = Math.abs(endY - startY);
    
    let pathData;
    if (dx > dy) {
      const midX = startX + (endX - startX) / 2;
      pathData = `M ${startX} ${startY} H ${midX} V ${endY} H ${endX}`;
    } else {
      const midY = startY + (endY - startY) / 2;
      pathData = `M ${startX} ${startY} V ${midY} H ${endX} V ${endY}`;
    }
    
    setPath(pathData);
  }, [start, end]);
  
  if (!path) return null;
  
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
      <motion.circle
        r="4"
        fill="var(--circuit-primary)"
        filter="drop-shadow(0 0 8px var(--circuit-primary))"
        initial={{ offsetDistance: "0%" }}
        animate={{ 
          offsetDistance: ["0%", "100%"],
        }}
        transition={{ 
          duration: 3,
          delay,
          repeat: Infinity,
          repeatDelay: 2
        }}
        style={{
          offsetPath: `path('${path}')`,
        }}
      />
    </svg>
  );
}