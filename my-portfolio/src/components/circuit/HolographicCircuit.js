// src/components/circuit/HolographicCircuit.js
"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function HolographicCircuit({ onNodeClick }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  const [hoveredSection, setHoveredSection] = useState(null);
  const [scale, setScale] = useState(1);
  const { theme } = useTheme();
  
  // Update dimensions on window resize and calculate appropriate scale
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        
        // Calculate scale based on screen size
        // Base design is for 1440px width, scale down proportionally for smaller screens
        const baseWidth = 1440;
        const newScale = Math.max(0.5, Math.min(1, width / baseWidth));
        setScale(newScale);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Define sections - now including Articles
  const sections = [
    { id: 'about', label: 'About', description: 'Learn about my background and expertise' },
    { id: 'projects', label: 'Projects', description: 'Explore my featured work and case studies' },
    { id: 'experience', label: 'Experience', description: 'My professional journey and achievements' },
    { id: 'skills', label: 'Skills', description: 'Technical abilities and competencies' },
    { id: 'articles', label: 'Articles', description: 'Read my thoughts and insights on technology' },
    { id: 'contact', label: 'Contact', description: 'Get in touch for collaborations' }
  ];
  
  // Create random floating particles - adjust count based on screen size
  const particleCount = dimensions.width < 768 ? 40 : 80;
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 0.5 + 0.2,
    delay: Math.random() * 5
  }));
  
  // Colors based on theme
  const colors = {
    primary: theme === 'dark' ? 'rgb(56, 189, 248)' : 'rgb(14, 165, 233)',
    text: theme === 'dark' ? 'rgb(241, 245, 249)' : 'rgb(15, 23, 42)',
    background: theme === 'dark' ? 'rgb(15, 23, 42)' : 'rgb(241, 245, 249)',
  };
  
  return (
    <div 
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: colors.background }}
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/3 right-1/3 w-1/3 h-1/3 bg-cyan-500/10 rounded-full blur-[100px]"></div>
      </div>
      
      {/* Floating particles */}
      {particles.map(particle => (
        <FloatingParticle key={particle.id} particle={particle} />
      ))}
      
      {/* Holographic grid */}
      <div className="absolute inset-0 holographic-grid"></div>
      
      {/* Central holographic display */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <HolographicDisplay scale={scale} />
      </div>
      
      {/* Navigation nodes */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ 
          width: `${600 * scale}px`, 
          height: `${600 * scale}px` 
        }}>
          {sections.map((section, index) => {
            // Position nodes in a hexagon around the center (6 sections)
            const angle = (index * (2 * Math.PI / sections.length)) - Math.PI / 2;
            const radius = 250 * scale; // Distance from center, scaled
            const x = 300 * scale + radius * Math.cos(angle);
            const y = 300 * scale + radius * Math.sin(angle);
            
            return (
              <div
                key={section.id}
                className="absolute"
                style={{ 
                  left: x,
                  top: y,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <HolographicNode 
                  section={section}
                  isHovered={hoveredSection === section.id}
                  onHover={() => setHoveredSection(section.id)}
                  onLeave={() => setHoveredSection(null)}
                  onClick={() => onNodeClick(section.id)}
                  scale={scale}
                />
              </div>
            );
          })}
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {sections.map((section, index) => {
              const angle = (index * (2 * Math.PI / sections.length)) - Math.PI / 2;
              const radius = 250 * scale;
              const x = 300 * scale + radius * Math.cos(angle);
              const y = 300 * scale + radius * Math.sin(angle);
              
              return (
                <motion.line
                  key={`line-${section.id}`}
                  x1={300 * scale}
                  y1={300 * scale}
                  x2={x}
                  y2={y}
                  stroke="rgba(96, 165, 250, 0.3)"
                  strokeWidth={scale}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                  className={hoveredSection === section.id ? "holographic-line-active" : "holographic-line"}
                />
              );
            })}
          </svg>
        </div>
      </div>
      
      {/* Info panel for hovered section */}
      <AnimatePresence>
  {hoveredSection && (
    <motion.div
      key={`info-${hoveredSection}`}
      className="absolute left-1 transform -translate-x-1/2"
      style={{ 
        width: `${Math.min(320, dimensions.width * 0.8)}px`,
        bottom: dimensions.width < 768 ? '5rem' : '4rem' // Higher on mobile
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="holographic-panel p-4">
        <h3 className="text-blue-300 font-mono text-lg mb-1">
          {sections.find(s => s.id === hoveredSection)?.label}
        </h3>
        <p className="text-blue-200/70 text-sm">
          {sections.find(s => s.id === hoveredSection)?.description}
        </p>
      </div>
    </motion.div>
  )}
</AnimatePresence>


<div 
  className="absolute left-1/2 transform -translate-x-1/2 text-center text-blue-300/60 text-sm"
  style={{ bottom: dimensions.width < 768 ? '7rem' : '2rem' }} // Much higher on mobile
>
  <p className="px-4">
    {dimensions.width < 768 
      ? "Tap nodes to navigate" 
      : "Hover to explore, click to view details"}
  </p>
</div>
    </div>
  );
}

// Floating particle component
function FloatingParticle({ particle }) {
  const [position, setPosition] = useState({ y: particle.y });
  
  useEffect(() => {
    // Add a delay before starting animation
    const startTimer = setTimeout(() => {
      const floatAnimation = () => {
        setPosition(prev => ({
          y: (prev.y - particle.speed / 10) % 100
        }));
        
        requestAnimationFrame(floatAnimation);
      };
      
      const animationId = requestAnimationFrame(floatAnimation);
      return () => cancelAnimationFrame(animationId);
    }, particle.delay * 1000);
    
    return () => clearTimeout(startTimer);
  }, [particle.speed, particle.delay]);
  
  return (
    <div 
      className="absolute rounded-full bg-blue-400/30"
      style={{
        left: `${particle.x}%`,
        top: `${position.y}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        boxShadow: `0 0 ${particle.size * 2}px rgba(96, 165, 250, 0.5)`,
        transition: 'top 0.1s linear'
      }}
    ></div>
  );
}

// Central holographic display
function HolographicDisplay({ scale = 1 }) {
  // Scale sizes based on screen size
  const size = `${64 * scale}rem`;
  const innerSize = `${32 * scale}rem`;
  
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, type: "spring" }}
    >
      {/* Main hologram container */}
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Rotating rings */}
        <motion.div 
          className="absolute w-full h-full rounded-full border-2 border-blue-400/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        
        <motion.div 
          className="absolute rounded-full border border-blue-400/20"
          style={{ width: '90%', height: '90%' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        
        <motion.div 
          className="absolute rounded-full border border-blue-400/40"
          style={{ width: '70%', height: '70%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        
        {/* Central sphere */}
        <div className="relative rounded-full holographic-sphere flex items-center justify-center" 
          style={{ width: innerSize, height: innerSize }}>
          {/* Scan line effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute inset-0 holographic-scanline"></div>
          </div>
          
          {/* Content */}
          <div className="text-center z-10 p-4">
            <h2 className={`text-${Math.max(1, Math.round(2 * scale))}xl font-mono font-bold text-blue-300`}>
              Amit Pandit
            </h2>
            <p className={`text-${scale < 0.7 ? 'xs' : 'sm'} text-blue-300/70 mt-1`}>
              AI Engineer & Developer
            </p>
          </div>
        </div>
        
        {/* Orbiting dots */}
        {Array.from({ length: 3 }).map((_, i) => {
          const orbitRadius = 120 * scale;
          return (
            <motion.div
              key={`orbit-${i}`}
              className="absolute rounded-full bg-blue-400"
              style={{
                width: `${3 * scale}px`,
                height: `${3 * scale}px`,
                boxShadow: `0 0 ${10 * scale}px rgba(96, 165, 250, 0.8)`
              }}
              animate={{
                x: Math.cos((i * 120) * (Math.PI / 180)) * orbitRadius,
                y: Math.sin((i * 120) * (Math.PI / 180)) * orbitRadius,
                rotate: 360
              }}
              transition={{
                x: { duration: 8, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut", delay: i * 0.5 },
                y: { duration: 8, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut", delay: i * 0.5 },
                rotate: { duration: 2, repeat: Infinity, ease: "linear" }
              }}
            ></motion.div>
          );
        })}
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full" 
          style={{ boxShadow: `0 0 ${40 * scale}px rgba(96, 165, 250, 0.4)` }}></div>
      </div>
    </motion.div>
  );
}

// Holographic navigation node
function HolographicNode({ section, isHovered, onHover, onLeave, onClick, scale = 1 }) {
  // Scale sizes based on screen size
  const nodeSize = `${16 * scale}px`;
  const innerSize = `${8 * scale}px`;
  const dotSize = `${4 * scale}px`;
  
  return (
    <motion.div
      className="relative cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Node container */}
      <div className="relative flex items-center justify-center" style={{ width: nodeSize, height: nodeSize }}>
        {/* Outer ring */}
        <motion.div 
          className="absolute w-full h-full rounded-full border border-blue-400/50"
          animate={{ 
            scale: isHovered ? [1, 1.1, 1] : 1,
            boxShadow: isHovered 
              ? [`0 0 ${10 * scale}px rgba(96, 165, 250, 0.5)`, `0 0 ${20 * scale}px rgba(96, 165, 250, 0.7)`, `0 0 ${10 * scale}px rgba(96, 165, 250, 0.5)`] 
              : `0 0 ${10 * scale}px rgba(96, 165, 250, 0.3)`
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
        ></motion.div>
        
        {/* Inner circle */}
        <div className="rounded-full bg-blue-500/20 flex items-center justify-center" 
          style={{ width: innerSize, height: innerSize }}>
          <div className="rounded-full bg-blue-400/80" 
            style={{ width: dotSize, height: dotSize }}></div>
        </div>
        
        {/* Label */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center"
          style={{ bottom: `-${8 * scale}px` }}>
          <div className="font-mono text-blue-300" 
            style={{ fontSize: `${Math.max(10, 14 * scale)}px` }}>
            {section.label}
          </div>
        </div>
        
        {/* Pulse effect when hovered */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ border: '1px solid rgba(96, 165, 250, 0.5)' }}
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}