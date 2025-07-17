// src/app/components/layout/TableOfContents.js
"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  const sections = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      // Show TOC after scrolling past the hero
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
      
      // Determine active section
      const currentSection = sections
        .map(section => {
          const element = document.getElementById(section.id);
          if (!element) return { id: section.id, position: -Infinity };
          
          const rect = element.getBoundingClientRect();
          return {
            id: section.id,
            position: rect.top + window.scrollY - 200, // Offset for header
          };
        })
        .filter(section => section.position > 0)
        .sort((a, b) => a.position - b.position)[0];
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed left-4 top-1/2 transform -translate-y-1/2 hidden lg:block z-40"
    >
      <div className="bg-white dark:bg-magazine-dark/90 shadow-lg p-4 backdrop-blur-sm">
        <h3 className="text-xs uppercase tracking-wider text-magazine-muted mb-4">Contents</h3>
        <ul className="space-y-3">
          {sections.map((section) => (
            <li key={section.id}>
              <a 
                href={`#${section.id}`}
                className={`text-sm flex items-center ${
                  activeSection === section.id 
                    ? 'text-magazine-accent font-medium' 
                    : 'text-magazine-muted hover:text-magazine-ink dark:hover:text-white'
                } transition-colors`}
              >
                <span 
                  className={`w-1 h-6 mr-2 ${
                    activeSection === section.id 
                      ? 'bg-magazine-accent' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                ></span>
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}