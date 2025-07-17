"use client";
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CircuitBoard({ children }) {
  const boardRef = useRef(null);
  
  useEffect(() => {
    // Create background circuit patterns
    if (!boardRef.current) return;
    
    const createBackgroundCircuits = () => {
      const board = boardRef.current;
      const width = board.offsetWidth;
      const height = board.offsetHeight;
      
      // Create SVG element
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.style.position = "absolute";
      svg.style.top = "0";
      svg.style.left = "0";
      svg.style.zIndex = "-1";
      svg.style.opacity = "0.15";
      
      // Create grid lines
      for (let i = 0; i < width; i += 50) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", i);
        line.setAttribute("y1", 0);
        line.setAttribute("x2", i);
        line.setAttribute("y2", height);
        line.setAttribute("stroke", "#00f0ff");
        line.setAttribute("stroke-width", "0.5");
        svg.appendChild(line);
      }
      
      for (let i = 0; i < height; i += 50) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", 0);
        line.setAttribute("y1", i);
        line.setAttribute("x2", width);
        line.setAttribute("y2", i);
        line.setAttribute("stroke", "#00f0ff");
        line.setAttribute("stroke-width", "0.5");
        svg.appendChild(line);
      }
      
      // Create random circuit paths
      for (let i = 0; i < 20; i++) {
        const startX = Math.random() * width;
        const startY = Math.random() * height;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        let d = `M ${startX} ${startY}`;
        let currentX = startX;
        let currentY = startY;
        
        // Create random path with 3-5 segments
        const segments = Math.floor(Math.random() * 3) + 3;
        for (let j = 0; j < segments; j++) {
          const nextX = currentX + (Math.random() * 200 - 100);
          const nextY = currentY + (Math.random() * 200 - 100);
          
          // 50% chance of horizontal then vertical, 50% chance of vertical then horizontal
          if (Math.random() > 0.5) {
            d += ` H ${nextX} V ${nextY}`;
          } else {
            d += ` V ${nextY} H ${nextX}`;
          }
          
          currentX = nextX;
          currentY = nextY;
        }
        
        path.setAttribute("d", d);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "#00f0ff");
        path.setAttribute("stroke-width", "1");
        path.setAttribute("stroke-dasharray", "5,5");
        svg.appendChild(path);
      }
      
      // Add to board
      board.appendChild(svg);
    };
    
    createBackgroundCircuits();
    
    // Cleanup
    return () => {
      if (boardRef.current) {
        const svg = boardRef.current.querySelector("svg");
        if (svg) svg.remove();
      }
    };
  }, []);
  
  return (
    <motion.div
      ref={boardRef}
      className="w-full h-screen relative overflow-hidden bg-circuit-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-circuit-primary/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-circuit-secondary/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      {children}
    </motion.div>
  );
}