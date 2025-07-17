// src/components/circuit/CircuitBoardSVG.js
"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CircuitBoardSVG({ onNodeClick }) {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  
  // Update dimensions on window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Define node positions as percentages (easier to work with)
  const nodes = [
    { id: 'center', x: 50, y: 50, label: 'Amit Pandit', sublabel: 'AI Engineer & Developer', primary: true },
    { id: 'about', x: 25, y: 25, label: 'About' },
    { id: 'projects', x: 75, y: 25, label: 'Projects' },
    { id: 'experience', x: 75, y: 70, label: 'Experience' },
    { id: 'skills', x: 25, y: 70, label: 'Skills' },
    { id: 'contact', x: 50, y: 70, label: 'Contact' }
  ];
  
  // Define connections between nodes
  const connections = [
    { from: 'center', to: 'about' },
    { from: 'center', to: 'projects' },
    { from: 'center', to: 'experience' },
    { from: 'center', to: 'skills' },
    { from: 'center', to: 'contact' },
    { from: 'about', to: 'skills' },
    { from: 'projects', to: 'experience' },
    { from: 'skills', to: 'contact' },
    { from: 'experience', to: 'contact' }
  ];
  
  // Convert percentage to pixel values
  const percentToPixel = (percentX, percentY) => {
    const pixelX = (percentX / 100) * dimensions.width;
    const pixelY = (percentY / 100) * dimensions.height;
    return { x: pixelX, y: pixelY };
  };
  
  // Generate path between two nodes with right angles
  const generatePath = (fromNode, toNode) => {
    const from = nodes.find(n => n.id === fromNode);
    const to = nodes.find(n => n.id === toNode);
    
    if (!from || !to) return '';
    
    const fromPos = percentToPixel(from.x, from.y);
    const toPos = percentToPixel(to.x, to.y);
    
    // Create a path with right angles
    if (Math.abs(from.x - to.x) > Math.abs(from.y - to.y)) {
      // Go horizontal first
      const midX = (from.x + to.x) / 2;
      const midPos = percentToPixel(midX, from.y);
      return `M${fromPos.x},${fromPos.y} L${midPos.x},${fromPos.y} L${midPos.x},${toPos.y} L${toPos.x},${toPos.y}`;
    } else {
      // Go vertical first
      const midY = (from.y + to.y) / 2;
      const midPos = percentToPixel(from.x, midY);
      return `M${fromPos.x},${fromPos.y} L${fromPos.x},${midPos.y} L${toPos.x},${midPos.y} L${toPos.x},${toPos.y}`;
    }
  };

  const debugNodePosition = (node) => {
    // Add a small visible dot at the exact position where the path should connect
    return (
      <div 
        className="absolute w-2 h-2 bg-red-500 rounded-full z-50 transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: `${node.x}%`, 
          top: `${node.y}%`,
          pointerEvents: 'none'
        }}
      ></div>
    );
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-circuit-bg">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-circuit-primary/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-circuit-secondary/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      {/* SVG for grid and connections */}
      <svg ref={svgRef} width="100%" height="100%" className="absolute inset-0">
        {/* Grid lines */}
        {Array.from({ length: 11 }).map((_, i) => (
          <line 
            key={`vertical-${i}`}
            x1={`${i * 10}%`} 
            y1="0" 
            x2={`${i * 10}%`} 
            y2="100%"
            stroke="var(--circuit-primary)"
            strokeWidth="0.5"
            strokeOpacity="0.15"
          />
        ))}
        
        {Array.from({ length: 11 }).map((_, i) => (
          <line 
            key={`horizontal-${i}`}
            x1="0" 
            y1={`${i * 10}%`} 
            x2="100%" 
            y2={`${i * 10}%`}
            stroke="var(--circuit-primary)"
            strokeWidth="0.5"
            strokeOpacity="0.15"
          />
        ))}
        
        {/* Connection paths */}
        {connections.map((conn, index) => {
          const pathData = generatePath(conn.from, conn.to);
          return (
            <motion.path
              key={`path-${index}`}
              d={pathData}
              stroke="var(--circuit-primary)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: index * 0.1 }}
            />
          );
        })}
      </svg>
      
      {/* Nodes */}
      {nodes.map((node) => {
        const size = node.primary ? 'large' : 'medium';
        const sizeMap = {
          small: { outer: 40, inner: 16 },
          medium: { outer: 60, inner: 24 },
          large: { outer: 80, inner: 32 },
        };
        const nodeSize = sizeMap[size];
        
        return (
            <motion.div
            key={node.id}
            className="absolute flex flex-col items-center"
            style={{ 
              left: `${node.x}%`, 
              top: `${node.y}%`, 
              transform: 'translate(-50%, -50%)' // Make sure this is applied correctly
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            whileHover={node.id !== 'center' ? { scale: 1.1 } : {}}
            onClick={() => node.id !== 'center' && onNodeClick(node.id)}
          >
            <div className="relative">
              {/* Outer ring */}
              <motion.div
                className={`rounded-full ${node.primary ? 'bg-circuit-primary/20' : 'bg-circuit-surface'} flex items-center justify-center`}
                style={{ 
                  width: nodeSize.outer, 
                  height: nodeSize.outer,
                  boxShadow: node.primary ? '0 0 20px var(--circuit-primary)' : 'none'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {/* Inner circle */}
                <div 
                  className={`rounded-full ${node.primary ? 'bg-circuit-primary' : 'bg-circuit-secondary'} flex items-center justify-center`}
                  style={{ width: nodeSize.inner, height: nodeSize.inner }}
                >
                  {node.primary && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                
                {/* Decorative dots around the circle for primary node */}
                {node.primary && Array.from({ length: 8 }).map((_, i) => (
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
              {node.id !== 'center' && (
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
            {node.label && (
              <motion.div 
                className="mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className={`font-mono ${node.primary ? 'text-xl font-bold text-circuit-primary' : 'text-circuit-text'}`}>
                  {node.label}
                </div>
                {node.sublabel && (
                  <div className="text-sm text-circuit-text/60 mt-1">
                    {node.sublabel}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        );
      })}
      
      {/* Pulse animations along paths */}
      {connections.map((conn, index) => {
        const from = nodes.find(n => n.id === conn.from);
        const to = nodes.find(n => n.id === conn.to);
        
        if (!from || !to) return null;
        
        return (
          <PulseDot 
            key={`pulse-${index}`}
            from={{ x: from.x, y: from.y }}
            to={{ x: to.x, y: to.y }}
            delay={index * 0.5}
          />
        );
      })}
    </div>
  );
}

// Separate component for pulse animations
function PulseDot({ from, to, delay = 0 }) {
  const [position, setPosition] = useState({ x: from.x, y: from.y });
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Start animation after delay
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  useEffect(() => {
    if (!isAnimating) return;
    
    // Determine if we should go horizontal first or vertical first
    const goHorizontalFirst = Math.abs(from.x - to.x) > Math.abs(from.y - to.y);
    
    // Animation sequence
    let step = 0;
    let animationFrame;
    
    const animate = () => {
      // Calculate midpoints for right-angle path
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;
      
      // Animation steps
      if (goHorizontalFirst) {
        if (step === 0) {
          // Move horizontally to midpoint
          const progress = Math.min(1, step / 100);
          const x = from.x + (midX - from.x) * progress;
          setPosition({ x, y: from.y });
          step++;
        } else if (step <= 100) {
          // Move vertically to target y
          const progress = (step - 0) / 100;
          const y = from.y + (to.y - from.y) * progress;
          setPosition({ x: midX, y });
          step++;
        } else if (step <= 200) {
          // Move horizontally to target x
          const progress = (step - 100) / 100;
          const x = midX + (to.x - midX) * progress;
          setPosition({ x, y: to.y });
          step++;
        } else {
          // Reset animation
          step = 0;
          setPosition({ x: from.x, y: from.y });
          
          // Add delay before restarting
          setTimeout(() => {
            animationFrame = requestAnimationFrame(animate);
          }, 2000);
          return;
        }
      } else {
        if (step === 0) {
          // Move vertically to midpoint
          const progress = Math.min(1, step / 100);
          const y = from.y + (midY - from.y) * progress;
          setPosition({ x: from.x, y });
          step++;
        } else if (step <= 100) {
          // Move horizontally to target x
          const progress = (step - 0) / 100;
          const x = from.x + (to.x - from.x) * progress;
          setPosition({ x, y: midY });
          step++;
        } else if (step <= 200) {
          // Move vertically to target y
          const progress = (step - 100) / 100;
          const y = midY + (to.y - midY) * progress;
          setPosition({ x: to.x, y });
          step++;
        } else {
          // Reset animation
          step = 0;
          setPosition({ x: from.x, y: from.y });
          
          // Add delay before restarting
          setTimeout(() => {
            animationFrame = requestAnimationFrame(animate);
          }, 2000);
          return;
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [from, to, isAnimating]);
  
  return (
    <div 
      className="absolute w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transition: 'left 0.01s linear, top 0.01s linear'
      }}
    >
      <div className="w-4 h-4 rounded-full bg-circuit-primary/50 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-circuit-primary"></div>
      {nodes.map(node => debugNodePosition(node))}
    </div>
  );
}