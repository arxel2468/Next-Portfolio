// src/components/circuit/CircuitMotherboard.js
"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Grid system constants
const GRID_SIZE = 16; // 16x16 grid
const GRID_UNIT = 100 / GRID_SIZE; // Percentage per grid unit

export default function CircuitMotherboard({ onNodeClick }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  
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
  
  // Define sections aligned to grid
  const sections = [
    { id: 'about', label: 'About', position: { x: 3 * GRID_UNIT, y: 4 * GRID_UNIT } },
    { id: 'projects', label: 'Projects', position: { x: 13 * GRID_UNIT, y: 4 * GRID_UNIT } },
    { id: 'experience', label: 'Experience', position: { x: 13 * GRID_UNIT, y: 12 * GRID_UNIT } },
    { id: 'skills', label: 'Skills', position: { x: 3 * GRID_UNIT, y: 12 * GRID_UNIT } },
    { id: 'contact', label: 'Contact', position: { x: 8 * GRID_UNIT, y: 14 * GRID_UNIT } }
  ];
  
  // Define decorative elements
  const decorativeElements = [
    // RAM slots
    { type: 'ram', x: 3 * GRID_UNIT, y: 8 * GRID_UNIT, width: 6 * GRID_UNIT, height: GRID_UNIT },
    { type: 'ram', x: 10 * GRID_UNIT, y: 8 * GRID_UNIT, width: 6 * GRID_UNIT, height: GRID_UNIT },
    
    // Capacitors
    { type: 'capacitor', x: 5 * GRID_UNIT, y: 2 * GRID_UNIT },
    { type: 'capacitor', x: 6 * GRID_UNIT, y: 2 * GRID_UNIT },
    { type: 'capacitor', x: 10 * GRID_UNIT, y: 2 * GRID_UNIT },
    { type: 'capacitor', x: 11 * GRID_UNIT, y: 2 * GRID_UNIT },
    { type: 'capacitor', x: 2 * GRID_UNIT, y: 6 * GRID_UNIT },
    { type: 'capacitor', x: 14 * GRID_UNIT, y: 6 * GRID_UNIT },
    
    // Resistors
    { type: 'resistor', x: 4 * GRID_UNIT, y: 10 * GRID_UNIT, rotation: 0 },
    { type: 'resistor', x: 12 * GRID_UNIT, y: 10 * GRID_UNIT, rotation: 0 },
    { type: 'resistor', x: 6 * GRID_UNIT, y: 6 * GRID_UNIT, rotation: 90 },
    { type: 'resistor', x: 10 * GRID_UNIT, y: 6 * GRID_UNIT, rotation: 90 },
    
    // Vias (connection points)
    ...Array.from({ length: 20 }).map((_, i) => ({
      type: 'via',
      x: (Math.floor(i / 4) + 2) * GRID_UNIT,
      y: (i % 4 + 2) * GRID_UNIT
    })),
    ...Array.from({ length: 20 }).map((_, i) => ({
      type: 'via',
      x: (Math.floor(i / 4) + 9) * GRID_UNIT,
      y: (i % 4 + 2) * GRID_UNIT
    }))
  ];
  
  return (
    <div 
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden bg-circuit-bg"
    >
      {/* PCB grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern"></div>
      
      {/* Decorative circuit elements */}
      {decorativeElements.map((element, index) => (
        <DecorativeElement key={`decor-${index}`} element={element} />
      ))}
      
      {/* CPU socket - Your name */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <CPUSocket />
      </div>
      
      {/* Circuit traces and nodes */}
      {sections.map((section) => (
        <CircuitTrace 
          key={section.id}
          section={section}
          onNodeClick={() => onNodeClick(section.id)}
        />
      ))}
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-circuit-text/60 text-sm">
        <p>Click on a node to explore</p>
      </div>
    </div>
  );
}

// CPU socket component
function CPUSocket() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      {/* CPU socket */}
      <div className="relative w-48 h-48 bg-circuit-surface border-2 border-circuit-primary/50 flex items-center justify-center overflow-hidden">
        {/* Corner notches */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-circuit-bg"></div>
        <div className="absolute top-0 right-0 w-4 h-4 bg-circuit-bg"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-circuit-bg"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-circuit-bg"></div>
        
        {/* CPU pins - grid pattern */}
        <div className="absolute inset-4 grid grid-cols-8 grid-rows-8 gap-1">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={`pin-${i}`} className="w-full h-full bg-circuit-primary/20 rounded-full"></div>
          ))}
        </div>
        
        {/* CPU die */}
        <div className="relative w-32 h-32 bg-circuit-bg border border-circuit-primary/50 flex items-center justify-center z-10">
          {/* Circuit patterns inside */}
          <div className="absolute inset-2">
            <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-px">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={`circuit-${i}`} className="w-full h-full border border-circuit-primary/30"></div>
              ))}
            </div>
          </div>
          
          {/* Name text */}
          <div className="text-center z-10 bg-circuit-bg/80 px-2 py-1">
            <h2 className="text-xl font-mono font-bold text-circuit-primary">
              Amit Pandit
            </h2>
            <p className="text-xs text-circuit-text/70">
              AI Engineer & Developer
            </p>
          </div>
        </div>
        
        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 bg-circuit-primary/5"
          animate={{ 
            boxShadow: ['0 0 10px rgba(57, 255, 20, 0.3) inset', '0 0 20px rgba(57, 255, 20, 0.5) inset', '0 0 10px rgba(57, 255, 20, 0.3) inset'] 
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
      </div>
    </motion.div>
  );
}

// Decorative circuit elements
function DecorativeElement({ element }) {
  switch (element.type) {
    case 'ram':
      return (
        <div 
          className="absolute bg-circuit-surface border border-circuit-primary/50"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.width}%`,
            height: `${element.height}%`,
          }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-1/2 bg-circuit-bg flex items-center justify-center">
              <div className="w-3/4 h-1/2 border-t border-b border-circuit-primary/30"></div>
            </div>
          </div>
        </div>
      );
    
    case 'capacitor':
      return (
        <div 
          className="absolute w-2 h-2 bg-circuit-surface border border-circuit-primary/50 rounded-full"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="absolute -bottom-2 left-1/2 w-px h-2 bg-circuit-primary/50"></div>
          <div className="absolute -top-2 left-1/2 w-px h-2 bg-circuit-primary/50"></div>
        </div>
      );
    
    case 'resistor':
      return (
        <div 
          className="absolute w-4 h-2 bg-circuit-surface border border-circuit-primary/50"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`
          }}
        >
          <div className="absolute inset-0 flex justify-around items-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-px h-full bg-circuit-primary/30"></div>
            ))}
          </div>
        </div>
      );
    
    case 'via':
      return (
        <div 
          className="absolute w-1 h-1 bg-circuit-primary/30 rounded-full"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        ></div>
      );
    
    default:
      return null;
  }
}

// Circuit trace with node
function CircuitTrace({ section, onNodeClick }) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Start animation after a delay based on section id
    const delay = ['about', 'projects', 'experience', 'skills', 'contact'].indexOf(section.id) * 0.3;
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 1000 + delay * 1000);
    
    return () => clearTimeout(timer);
  }, [section.id]);
  
  // Calculate path points for L-shaped trace from center to node
  const generateOrthogonalPath = () => {
    const centerX = 8 * GRID_UNIT;
    const centerY = 8 * GRID_UNIT;
    const { x, y } = section.position;
    
    // Create L-shaped path with 90-degree angles
    const points = [];
    points.push({ x: centerX, y: centerY }); // Start from center
    
    // Determine which direction to go first (horizontal or vertical)
    if (section.id === 'about' || section.id === 'projects') {
      // Go horizontal first, then vertical
      points.push({ x, y: centerY });
    } else if (section.id === 'skills' || section.id === 'experience') {
      // Go vertical first, then horizontal
      points.push({ x: centerX, y });
    } else {
      // For contact, create a T-junction
      points.push({ x: centerX, y: 12 * GRID_UNIT });
      points.push({ x: 8 * GRID_UNIT, y: 12 * GRID_UNIT });
    }
    
    points.push({ x, y }); // End point
    return points;
  };
  
  const pathPoints = generateOrthogonalPath();
  
  return (
    <>
      {/* Circuit trace */}
      <CircuitPath 
        points={pathPoints} 
        isAnimating={isAnimating} 
        sectionId={section.id}
      />
      
      {/* End node - IC chip */}
      <motion.div
        className="absolute cursor-pointer"
        style={{ 
          left: `${section.position.x}%`, 
          top: `${section.position.y}%`, 
          transform: 'translate(-50%, -50%)' 
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={isAnimating ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        onClick={onNodeClick}
      >
        <div className="relative">
          {/* IC chip */}
          <div className="w-12 h-8 bg-circuit-surface border border-circuit-primary/50 flex items-center justify-center">
            {/* Pin indicators */}
            <div className="absolute -top-px left-1 right-1 flex justify-between">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`pin-t-${i}`} className="w-px h-1 bg-circuit-primary/70"></div>
              ))}
            </div>
            <div className="absolute -bottom-px left-1 right-1 flex justify-between">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`pin-b-${i}`} className="w-px h-1 bg-circuit-primary/70"></div>
              ))}
            </div>
            
            {/* Notch indicator */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-circuit-bg"></div>
            
            {/* Label */}
            <div className="font-mono text-xs text-circuit-primary">
              {section.label}
            </div>
          </div>
                    {/* Pulse effect */}
                    <motion.div 
            className="absolute inset-0"
            animate={{ 
              boxShadow: ['0 0 0 0 rgba(57, 255, 20, 0)', '0 0 0 4px rgba(57, 255, 20, 0.3)', '0 0 0 0 rgba(57, 255, 20, 0)'] 
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
        </div>
      </motion.div>
    </>
  );
}

// Circuit path with pulse animation
function CircuitPath({ points, isAnimating, sectionId }) {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [pulsePosition, setPulsePosition] = useState(0);
  const [showPulse, setShowPulse] = useState(false);
  
  useEffect(() => {
    if (!isAnimating) return;
    
    // Animate the path drawing
    let startTime;
    const duration = 800; // ms
    
    const animatePath = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      setAnimationProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animatePath);
      } else {
        // Start pulse animation after path is drawn
        setShowPulse(true);
      }
    };
    
    requestAnimationFrame(animatePath);
  }, [isAnimating]);
  
  useEffect(() => {
    if (!showPulse) return;
    
    // Animate the pulse along the path
    let animationId;
    let startTime;
    
    const animatePulse = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % 3000; // 3 second cycle
      const progress = elapsed / 3000;
      
      setPulsePosition(progress);
      animationId = requestAnimationFrame(animatePulse);
    };
    
    animationId = requestAnimationFrame(animatePulse);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [showPulse]);
  
  // Calculate visible segments based on animation progress
  const visiblePoints = points.slice(0, Math.ceil(points.length * animationProgress));
  
  // Calculate pulse position
  const getPulseCoordinates = () => {
    if (visiblePoints.length < 2) return { x: 0, y: 0 };
    
    // Find which segment the pulse is on
    const segmentCount = points.length - 1;
    const segmentIndex = Math.min(
      Math.floor(pulsePosition * segmentCount),
      segmentCount - 1
    );
    
    // Calculate position within the segment
    const segmentProgress = (pulsePosition * segmentCount) % 1;
    const start = points[segmentIndex];
    const end = points[segmentIndex + 1];
    
    const x = start.x + (end.x - start.x) * segmentProgress;
    const y = start.y + (end.y - start.y) * segmentProgress;
    
    return { x, y };
  };
  
  const pulseCoords = getPulseCoordinates();
  
  return (
    <>
      {/* Draw path segments */}
      {visiblePoints.slice(0, -1).map((point, index) => {
        const nextPoint = visiblePoints[index + 1];
        return (
          <div 
            key={`${sectionId}-segment-${index}`}
            className="absolute bg-circuit-primary"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: `${Math.sqrt(Math.pow(nextPoint.x - point.x, 2) + Math.pow(nextPoint.y - point.y, 2))}%`,
              height: '2px',
              transformOrigin: 'left center',
              transform: `rotate(${Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI)}deg)`,
            }}
          ></div>
        );
      })}
      
      {/* Pulse dot */}
      {showPulse && (
        <div 
          className="absolute w-3 h-3 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ 
            left: `${pulseCoords.x}%`, 
            top: `${pulseCoords.y}%` 
          }}
        >
          <div className="w-3 h-3 rounded-full bg-circuit-primary animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white"></div>
        </div>
      )}
    </>
  );
}