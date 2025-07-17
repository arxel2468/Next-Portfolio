"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CircuitTheme() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('cyan'); // Default theme
  
  const themes = [
    { id: 'cyan', name: 'Cyan', primary: '#00f0ff', secondary: '#7928ca' },
    { id: 'green', name: 'Matrix', primary: '#00ff66', secondary: '#004d00' },
    { id: 'purple', name: 'Neon', primary: '#bb00ff', secondary: '#ff0080' },
    { id: 'orange', name: 'Amber', primary: '#ff9900', secondary: '#ff0000' },
    { id: 'blue', name: 'Azure', primary: '#0066ff', secondary: '#00ccff' },
  ];
  
  const changeTheme = (themeId) => {
    const selectedTheme = themes.find(t => t.id === themeId);
    if (!selectedTheme) return;
    
    // Update CSS variables
    document.documentElement.style.setProperty('--circuit-primary', selectedTheme.primary);
    document.documentElement.style.setProperty('--circuit-secondary', selectedTheme.secondary);
    
    setTheme(themeId);
    setIsOpen(false);
  };
  
  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-20 z-50 w-10 h-10 flex items-center justify-center bg-circuit-surface border border-circuit-primary/30 text-circuit-primary hover:bg-circuit-primary hover:text-circuit-bg transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Change theme"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 right-6 z-50 w-48 bg-circuit-surface border border-circuit-primary/30 p-4 font-mono"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-circuit-primary font-bold text-sm">Select Theme</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-circuit-text/60 hover:text-circuit-primary"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-2">
              {themes.map(themeOption => (
                <button
                  key={themeOption.id}
                  onClick={() => changeTheme(themeOption.id)}
                  className={`w-full flex items-center p-2 text-left text-sm hover:bg-circuit-bg ${
                    theme === themeOption.id ? 'bg-circuit-bg' : ''
                  }`}
                >
                  <div 
                    className="w-4 h-4 mr-2 rounded-full border border-white/20"
                    style={{ background: themeOption.primary }}
                  ></div>
                  <span>{themeOption.name}</span>
                  {theme === themeOption.id && (
                    <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}