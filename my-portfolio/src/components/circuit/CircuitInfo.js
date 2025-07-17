"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CircuitInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [stats, setStats] = useState({
    memory: Math.floor(Math.random() * 30) + 70, // 70-100%
    cpu: Math.floor(Math.random() * 40) + 20, // 20-60%
    temperature: Math.floor(Math.random() * 15) + 40, // 40-55°C
    uptime: Math.floor(Math.random() * 100) + 100, // 100-200 hours
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      
      // Simulate changing system stats
      setStats(prev => ({
        memory: Math.min(100, Math.max(70, prev.memory + (Math.random() * 6 - 3))),
        cpu: Math.min(80, Math.max(10, prev.cpu + (Math.random() * 10 - 5))),
        temperature: Math.min(60, Math.max(35, prev.temperature + (Math.random() * 2 - 1))),
        uptime: prev.uptime + 1/3600, // Add 1 second in hours
      }));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 w-10 h-10 flex items-center justify-center bg-circuit-surface border border-circuit-primary/30 text-circuit-primary hover:bg-circuit-primary hover:text-circuit-bg transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="System information"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-6 z-50 w-64 bg-circuit-surface border border-circuit-primary/30 p-4 font-mono text-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-circuit-primary font-bold">System Info</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-circuit-text/60 hover:text-circuit-primary"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="text-circuit-text/60 mb-1">Time</div>
                <div className="text-circuit-text">
                  {time.toLocaleTimeString()} - {time.toLocaleDateString()}
                </div>
              </div>
              
              <div>
                <div className="text-circuit-text/60 mb-1">Memory Usage</div>
                <div className="w-full h-2 bg-circuit-bg rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-circuit-primary"
                    style={{ width: `${stats.memory}%` }}
                  ></div>
                </div>
                <div className="text-right text-xs mt-1">{Math.round(stats.memory)}%</div>
              </div>
              
              <div>
                <div className="text-circuit-text/60 mb-1">CPU Load</div>
                <div className="w-full h-2 bg-circuit-bg rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-circuit-primary"
                    style={{ width: `${stats.cpu}%` }}
                  ></div>
                </div>
                <div className="text-right text-xs mt-1">{Math.round(stats.cpu)}%</div>
              </div>
              
              <div>
                <div className="text-circuit-text/60 mb-1">System Temperature</div>
                <div className="w-full h-2 bg-circuit-bg rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-circuit-primary"
                    style={{ width: `${(stats.temperature / 60) * 100}%` }}
                  ></div>
                </div>
                <div className="text-right text-xs mt-1">{Math.round(stats.temperature)}°C</div>
              </div>
              
              <div>
                <div className="text-circuit-text/60 mb-1">System Uptime</div>
                <div className="text-circuit-text">
                  {Math.floor(stats.uptime)}h {Math.floor((stats.uptime % 1) * 60)}m
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-circuit-primary/30 text-xs text-circuit-text/60">
              <div>Portfolio v1.0.0</div>
              <div>Amit Pandit © {new Date().getFullYear()}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}