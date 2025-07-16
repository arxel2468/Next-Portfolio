import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  
  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    
    const mouseDown = () => setCursorVariant('click');
    const mouseUp = () => setCursorVariant('default');
    const mouseEnterLink = () => setCursorVariant('hover');
    const mouseLeaveLink = () => setCursorVariant('default');
    
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    
    // Add hover effect to all links and buttons
    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseenter', mouseEnterLink);
      link.addEventListener('mouseleave', mouseLeaveLink);
    });
    
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      
      links.forEach((link) => {
        link.removeEventListener('mouseenter', mouseEnterLink);
        link.removeEventListener('mouseleave', mouseLeaveLink);
      });
    };
  }, []);
  
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(168, 85, 247, 0.2)',
      mixBlendMode: 'difference',
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'rgba(168, 85, 247, 0.4)',
      mixBlendMode: 'difference',
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(236, 72, 153, 0.6)',
      mixBlendMode: 'difference',
    },
  };
  
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 28 }}
        style={{
          height: 8,
          width: 8,
          backgroundColor: 'rgba(168, 85, 247, 0.8)',
        }}
      />
    </>
  );
}
