// src/components/ui/CircuitNav.js
"use client";
import { motion } from 'framer-motion';

export default function CircuitNav({ activeSection, onNavigate }) {
  const sections = [
    { id: null, label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'about', label: 'About', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'projects', label: 'Projects', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' },
    { id: 'experience', label: 'Experience', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'skills', label: 'Skills', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { id: 'contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];
  
  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50 bg-circuit-surface border border-circuit-primary/30 px-2 py-1 rounded-full shadow-lg"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="flex items-center space-x-1">
        {sections.map((section) => (
          <motion.button
            key={section.id ?? 'home'}
            onClick={() => onNavigate(section.id)}
            className={`relative p-2 rounded-full ${
              activeSection === section.id 
                ? 'text-circuit-bg bg-circuit-primary' 
                : 'text-circuit-primary hover:bg-circuit-primary/10'
            } transition-colors`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
            </svg>
            
            <motion.span 
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-circuit-surface border border-circuit-primary/30 px-2 py-1 text-xs font-mono whitespace-nowrap"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              whileHover={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {section.label}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}