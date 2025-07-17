"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CircuitNode({ 
  x, 
  y, 
  size = "medium", 
  label, 
  sublabel,
  primary = false,
  onClick 
}) {
  const [position, setPosition] = useState({ x, y });
  
  // Adjust position to align with grid
  useEffect(() => {
    const adjustToGrid = () => {
      const board = document.querySelector('[data-grid-size]');
      if (!board) return;
      
      const gridSize = parseInt(board.dataset.gridSize || '50');
      const boardRect = board.getBoundingClientRect();
      
      // Calculate the nearest grid intersection
      const percentX = parseFloat(x) / 100;
      const percentY = parseFloat(y) / 100;
      
      const pixelX = percentX * boardRect.width;
      const pixelY = percentY * boardRect.height;
      
      // Round to nearest grid intersection
      const gridX = Math.round(pixelX / gridSize) * gridSize;
      const gridY = Math.round(pixelY / gridSize) * gridSize;
      
      // Convert back to percentage
      const adjustedX = (gridX / boardRect.width) * 100 + '%';
      const adjustedY = (gridY / boardRect.height) * 100 + '%';
      
      setPosition({ x: adjustedX, y: adjustedY });
    };
    
    adjustToGrid();
    window.addEventListener('resize', adjustToGrid);
    
    return () => window.removeEventListener('resize', adjustToGrid);
  }, [x, y]);
  
  const sizeMap = {
    small: { outer: 40, inner: 16 },
    medium: { outer: 60, inner: 24 },
    large: { outer: 80, inner: 32 },
  };
  
  const nodeSize = sizeMap[size];
  
  return (
    <motion.div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center ${onClick ? 'cursor-pointer' : ''}`}
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      whileHover={onClick ? { scale: 1.1 } : {}}
      onClick={onClick}
    >
      {/* Rest of the component remains the same */}
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className={`rounded-full ${primary ? 'bg-circuit-primary/20' : 'bg-circuit-surface'} flex items-center justify-center`}
          style={{ 
            width: nodeSize.outer, 
            height: nodeSize.outer,
            boxShadow: primary ? '0 0 20px var(--circuit-primary)' : 'none'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {/* Inner circle */}
          <div 
            className={`rounded-full ${primary ? 'bg-circuit-primary' : 'bg-circuit-secondary'} flex items-center justify-center`}
            style={{ width: nodeSize.inner, height: nodeSize.inner }}
          >
            {primary && (
              <div className="w-2 h-2 bg-white rounded-full"></div>
            )}
          </div>
          
          {/* Decorative dots around the circle for primary node */}
          {primary && Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-circuit-primary rounded-full"
              style={{ 
                transform: `rotate(${i * 45}deg) translateY(-${nodeSize.outer / 2}px)`,
              }}
            ></div>
          ))}
        </motion.div>
        
        {/* Pulse effect */}
        {onClick && (
          <div 
            className="absolute top-0 left-0 w-full h-full rounded-full animate-pulse"
            style={{ 
              boxShadow: '0 0 10px var(--circuit-primary)',
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        )}
      </div>
      
            {/* Label */}
            {label && (
        <motion.div 
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className={`font-mono ${primary ? 'text-xl font-bold text-circuit-primary' : 'text-circuit-text'}`}>
            {label}
          </div>
          {sublabel && (
            <div className="text-sm text-circuit-text/60 mt-1">
              {sublabel}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}