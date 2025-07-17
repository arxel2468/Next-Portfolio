// src/components/circuit/CircuitTerminal.js
"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CircuitTerminal({ onComplete }) {
  const [displayText, setDisplayText] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { text: '> Initializing system...', delay: 1000 },
    { text: '> Loading portfolio data...', delay: 1000 },
    { text: '> Establishing connection...', delay: 1000 },
    { text: '> Access granted. Welcome to Amit Pandit\'s portfolio.', delay: 1500 },
    { text: '> Click anywhere to continue...', delay: 0, final: true }
  ];
  
  useEffect(() => {
    if (currentStep >= steps.length) return;
    
    const timer = setTimeout(() => {
      setDisplayText(prev => prev + '\n' + steps[currentStep].text);
      
      if (!steps[currentStep].final) {
        setCurrentStep(prev => prev + 1);
      }
    }, currentStep === 0 ? 500 : steps[currentStep - 1].delay);
    
    return () => clearTimeout(timer);
  }, [currentStep, steps]);
  
  const handleClick = () => {
    if (currentStep === steps.length - 1) {
      onComplete();
    }
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-circuit-bg p-6 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
    >
      <motion.div
        className="w-full max-w-2xl bg-black/80 border border-circuit-primary/30 p-6 font-mono text-circuit-primary"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs">terminal@amit-pandit:~</div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        <div className="h-64 overflow-auto mb-4 whitespace-pre-line">
          {displayText}
        </div>
        
        {currentStep === steps.length - 1 && (
          <div className="text-center text-xs text-circuit-text/60 mt-4">
            Click anywhere to continue
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}