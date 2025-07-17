"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CircuitCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseDown = () => {
      setIsClicking(true);
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };
    
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  return (
    <motion.div
      className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-screen"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        opacity: isVisible ? 1 : 0,
        scale: isClicking ? 0.8 : 1,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <div className="w-8 h-8 rounded-full border-2 border-circuit-primary opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-circuit-primary"></div>
    </motion.div>
  );
}