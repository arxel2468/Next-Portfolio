// src/components/holographic/HolographicInterface.js
"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HolographicInterface({ onNodeClick }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  const [hoveredSection, setHoveredSection] = useState(null);
  
  // Update dimensions on window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Define sections
  const sections = [
    { id: 'about', label: 'About', description: 'Learn about my background and expertise' },
    { id: 'projects', label: 'Projects', description: 'Explore my featured work and case studies' },
    { id: 'experience', label: 'Experience', description: 'My professional journey and achievements' },
    { id: 'skills', label: 'Skills', description: 'Technical abilities and competencies' },
    { id: 'contact', label: 'Contact', description: 'Get in touch for collaborations' }
  ];
  
  // Create random floating particles
  const particles = Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 0.5 + 0.2,
    delay: Math.random() * 5
  }));
  
  return (
    <div 
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden bg-slate-900"
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
        <HolographicDisplay />
      </div>
      
      {/* Navigation nodes */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[600px] h-[600px]">
          {sections.map((section, index) => {
            // Position nodes in a pentagon around the center
            const angle = (index * (2 * Math.PI / sections.length)) - Math.PI / 2;
            const radius = 250; // Distance from center
            const x = 300 + radius * Math.cos(angle);
            const y = 300 + radius * Math.sin(angle);
            
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
                />
              </div>
            );
          })}
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {sections.map((section, index) => {
              const angle = (index * (2 * Math.PI / sections.length)) - Math.PI / 2;
              const radius = 250;
              const x = 300 + radius * Math.cos(angle);
              const y = 300 + radius * Math.sin(angle);
              
              return (
                <motion.line
                  key={`line-${section.id}`}
                  x1="300"
                  y1="300"
                  x2={x}
                  y2={y}
                  stroke="rgba(96, 165, 250, 0.3)"
                  strokeWidth="1"
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
            className="absolute bottom-16 left-1 transform -translate-x-1/2 w-80"
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
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-blue-300/60 text-sm">
        <p>Hover to explore, click to view details</p>
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
function HolographicDisplay() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, type: "spring" }}
    >
      {/* Main hologram container */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Rotating rings */}
        <motion.div 
          className="absolute w-full h-full rounded-full border-2 border-blue-400/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        
        <motion.div 
          className="absolute w-[90%] h-[90%] rounded-full border border-blue-400/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        
        <motion.div 
          className="absolute w-[70%] h-[70%] rounded-full border border-blue-400/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        
        {/* Central sphere */}
        <div className="relative w-32 h-32 rounded-full holographic-sphere flex items-center justify-center">
          {/* Scan line effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute inset-0 holographic-scanline"></div>
          </div>
          
          {/* Content */}
          <div className="text-center z-10 p-4">
            <h2 className="text-2xl font-mono font-bold text-blue-300">
              Amit Pandit
            </h2>
            <p className="text-sm text-blue-300/70 mt-1">
              AI Engineer & Developer
            </p>
          </div>
        </div>
        
        {/* Orbiting dots */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`orbit-${i}`}
            className="absolute w-3 h-3 rounded-full bg-blue-400"
            style={{
              boxShadow: '0 0 10px rgba(96, 165, 250, 0.8)'
            }}
            animate={{
              x: Math.cos((i * 120) * (Math.PI / 180)) * 120,
              y: Math.sin((i * 120) * (Math.PI / 180)) * 120,
              rotate: 360
            }}
            transition={{
              x: { duration: 8, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut", delay: i * 0.5 },
              y: { duration: 8, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut", delay: i * 0.5 },
              rotate: { duration: 2, repeat: Infinity, ease: "linear" }
            }}
          ></motion.div>
        ))}
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 40px rgba(96, 165, 250, 0.4)' }}></div>
      </div>
    </motion.div>
  );
}

// Holographic navigation node
function HolographicNode({ section, isHovered, onHover, onLeave, onClick }) {
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
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Outer ring */}
        <motion.div 
          className="absolute w-full h-full rounded-full border border-blue-400/50"
          animate={{ 
            scale: isHovered ? [1, 1.1, 1] : 1,
            boxShadow: isHovered 
              ? ['0 0 10px rgba(96, 165, 250, 0.5)', '0 0 20px rgba(96, 165, 250, 0.7)', '0 0 10px rgba(96, 165, 250, 0.5)'] 
              : '0 0 10px rgba(96, 165, 250, 0.3)'
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
        ></motion.div>
        
        {/* Inner circle */}
        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-blue-400/80"></div>
        </div>
        
        {/* Label */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="font-mono text-sm text-blue-300">
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