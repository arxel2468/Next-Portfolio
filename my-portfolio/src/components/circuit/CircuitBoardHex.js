// src/components/circuit/CircuitBoardHex.js
"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CircuitBoardHex({ onNodeClick }) {
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
  
  // Define node positions in a hexagonal pattern
  const nodes = [
    { id: 'center', x: 50, y: 50, label: 'Amit Pandit', sublabel: 'AI Engineer & Developer', primary: true },
    { id: 'about', x: 30, y: 25, label: 'About' },
    { id: 'projects', x: 70, y: 25, label: 'Projects' },
    { id: 'experience', x: 80, y: 50, label: 'Experience' },
    { id: 'skills', x: 20, y: 50, label: 'Skills' },
    { id: 'contact', x: 50, y: 75, label: 'Contact' }
  ];
  
  // Define connections between nodes to form a hexagon
  const connections = [
    { from: 'center', to: 'about' },
    { from: 'center', to: 'projects' },
    { from: 'center', to: 'experience' },
    { from: 'center', to: 'skills' },
    { from: 'center', to: 'contact' },
    { from: 'about', to: 'skills' },
    { from: 'about', to: 'projects' },
    { from: 'projects', to: 'experience' },
    { from: 'experience', to: 'contact' },
    { from: 'skills', to: 'contact' }
  ];
  
  // Convert percentage to pixel values
  const percentToPixel = (percentX, percentY) => {
    const pixelX = (percentX / 100) * dimensions.width;
    const pixelY = (percentY / 100) * dimensions.height;
    return { x: pixelX, y: pixelY };
  };
  
  // Generate curved path between two nodes
  const generatePath = (fromNode, toNode) => {
    const from = nodes.find(n => n.id === fromNode);
    const to = nodes.find(n => n.id === toNode);
    
    if (!from || !to) return '';
    
    const fromPos = percentToPixel(from.x, from.y);
    const toPos = percentToPixel(to.x, to.y);
    
    // For paths to/from center, make them curved
    if (from.id === 'center' || to.id === 'center') {
      // Calculate control point for curve
      const dx = toPos.x - fromPos.x;
      const dy = toPos.y - fromPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Control point perpendicular to the line between nodes
      const cpX = (fromPos.x + toPos.x) / 2 - dy * 0.2;
      const cpY = (fromPos.y + toPos.y) / 2 + dx * 0.2;
      
      return `M${fromPos.x},${fromPos.y} Q${cpX},${cpY} ${toPos.x},${toPos.y}`;
    }
    
    // For outer connections, use straight lines
    return `M${fromPos.x},${fromPos.y} L${toPos.x},${toPos.y}`;
  };
  
  // Generate hexagonal grid pattern
  const generateHexGrid = () => {
    const hexSize = Math.min(dimensions.width, dimensions.height) / 20;
    const rows = Math.ceil(dimensions.height / (hexSize * 1.5));
    const cols = Math.ceil(dimensions.width / (hexSize * Math.sqrt(3)));
    
    const hexagons = [];
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * hexSize * Math.sqrt(3);
        const y = r * hexSize * 1.5 + (c % 2 === 0 ? 0 : hexSize * 0.75);
        
        if (x < 0 || x > dimensions.width || y < 0 || y > dimensions.height) continue;
        
        const points = [];
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const px = x + hexSize * Math.cos(angle);
          const py = y + hexSize * Math.sin(angle);
          points.push(`${px},${py}`);
        }
        
        hexagons.push(
          <polygon
            key={`hex-${r}-${c}`}
            points={points.join(' ')}
            fill="none"
            stroke="var(--circuit-primary)"
            strokeWidth="0.5"
            strokeOpacity="0.1"
          />
        );
      }
    }
    
    return hexagons;
  };
  
  return (
    <div className="w-full h-screen relative overflow-hidden bg-circuit-bg">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-circuit-primary/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-circuit-secondary/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      {/* SVG for grid and connections */}
      <svg ref={svgRef} width="100%" height="100%" className="absolute inset-0">
        {/* Hexagonal grid */}
        {generateHexGrid()}
        
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
        
        {/* Debug dots for node positions */}
        {nodes.map((node, index) => {
          const pos = percentToPixel(node.x, node.y);
          return (
            <circle
              key={`debug-${index}`}
              cx={pos.x}
              cy={pos.y}
              r="2"
              fill="red"
              className="opacity-50"
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
              transform: 'translate(-50%, -50%)' 
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            whileHover={node.id !== 'center' ? { scale: 1.1 } : {}}
            onClick={() => node.id !== 'center' && onNodeClick(node.id)}
          >
            <div className="relative">
              {/* Hexagonal outer shape for primary node */}
              {node.primary ? (
                <motion.div
                  className="relative flex items-center justify-center"
                  style={{ 
                    width: nodeSize.outer, 
                    height: nodeSize.outer,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <svg width={nodeSize.outer} height={nodeSize.outer} viewBox="0 0 100 100" className="absolute inset-0">
                    <polygon 
                      points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" 
                      fill="rgba(0, 240, 255, 0.2)"
                      stroke="var(--circuit-primary)"
                      strokeWidth="2"
                    />
                    <polygon 
                      points="50,20 79.6,35 79.6,65 50,80 20.4,65 20.4,35" 
                      fill="rgba(0, 240, 255, 0.1)"
                      stroke="var(--circuit-primary)"
                      strokeWidth="1"
                    />
                  </svg>
                  
                  {/* Inner circle */}
                  <div 
                    className="rounded-full bg-circuit-primary flex items-center justify-center z-10"
                    style={{ width: nodeSize.inner, height: nodeSize.inner }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </motion.div>
              ) : (
                // Regular nodes
                <motion.div
                  className="rounded-full bg-circuit-surface flex items-center justify-center"
                  style={{ 
                    width: nodeSize.outer, 
                    height: nodeSize.outer,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {/* Inner circle */}
                  <div 
                    className="rounded-full bg-circuit-secondary flex items-center justify-center"
                    style={{ width: nodeSize.inner, height: nodeSize.inner }}
                  />
                  
                  {/* Decorative elements */}
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-2 h-2 bg-circuit-primary rounded-full"
                      style={{ 
                        transform: `rotate(${i * 120}deg) translateY(-${nodeSize.outer / 2}px)`,
                      }}
                    ></div>
                  ))}
                </motion.div>
              )}
              
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
            curved={from.id === 'center' || to.id === 'center'}
          />
        );
      })}
    </div>
  );
}

// Separate component for pulse animations
function PulseDot({ from, to, delay = 0, curved = false }) {
    const [position, setPosition] = useState({ x: from.x, y: from.y });
    const [isAnimating, setIsAnimating] = useState(false);
    const animationRef = useRef(null);
    
    useEffect(() => {
      // Start animation after delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }, [delay]);
    
    useEffect(() => {
      if (!isAnimating) return;
      
      let progress = 0;
      let lastTime = performance.now();
      
      const animate = (time) => {
        const deltaTime = time - lastTime;
        lastTime = time;
        
        // Increment progress (adjust speed as needed)
        progress += deltaTime * 0.0003;
        
        if (progress >= 1) {
          // Reset animation
          progress = 0;
          setTimeout(() => {
            animationRef.current = requestAnimationFrame(animate);
          }, 2000); // Delay before restarting
          return;
        }
        
        // Calculate position along the path
        let x, y;
        
        if (curved) {
          // For curved paths (to/from center)
          // Use quadratic bezier curve formula: B(t) = (1-t)²P₀ + 2(1-t)tP₁ + t²P₂
          const t = progress;
          const cp = {
            x: (from.x + to.x) / 2 - (to.y - from.y) * 0.2,
            y: (from.y + to.y) / 2 + (to.x - from.x) * 0.2
          };
          
          x = Math.pow(1-t, 2) * from.x + 2 * (1-t) * t * cp.x + Math.pow(t, 2) * to.x;
          y = Math.pow(1-t, 2) * from.y + 2 * (1-t) * t * cp.y + Math.pow(t, 2) * to.y;
        } else {
          // For straight lines
          x = from.x + (to.x - from.x) * progress;
          y = from.y + (to.y - from.y) * progress;
        }
        
        setPosition({ x, y });
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [from, to, isAnimating, curved]);
    
    return (
      <div 
        className="absolute w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ 
          left: `${position.x}%`, 
          top: `${position.y}%`
        }}
      >
        <div className="w-4 h-4 rounded-full bg-circuit-primary/50 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-circuit-primary"></div>
      </div>
    );
  }