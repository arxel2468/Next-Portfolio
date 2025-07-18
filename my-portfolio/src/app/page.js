// src/app/page.js
"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CircuitLoader from '../components/circuit/CircuitLoader';
import CircuitCursor from '../components/ui/CircuitCursor';
import CircuitNav from '../components/ui/CircuitNav';
import CircuitTerminal from '../components/circuit/CircuitTerminal';
import HolographicCircuit from '../components/circuit/HolographicCircuit';

// Section components
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Skills from '../components/sections/Skills';
import Articles from '../components/sections/Articles';
import Contact from '../components/sections/Contact';

// Import these components only after the initial render to avoid issues
import dynamic from 'next/dynamic';

const CircuitAudio = dynamic(() => import('../components/circuit/CircuitAudio'), { ssr: false });
const CircuitInfo = dynamic(() => import('../components/circuit/CircuitInfo'), { ssr: false });
const CircuitTheme = dynamic(() => import('../components/circuit/CircuitTheme'), { ssr: false });
const CircuitNotification = dynamic(() => import('../components/circuit/CircuitNotification'), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showTerminal, setShowTerminal] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [showExtras, setShowExtras] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  
  // Update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Load extra components after main UI is rendered
  useEffect(() => {
    if (!isLoading && !showTerminal) {
      setTimeout(() => {
        setShowExtras(true);
      }, 1000);
    }
  }, [isLoading, showTerminal]);
  
  const handleNodeClick = (section) => {
    setActiveSection(section);
  };
  
  const handleBackClick = () => {
    setActiveSection(null);
  };
  
  const handleNavigation = (section) => {
    setActiveSection(section);
  };
  
  const handleTerminalComplete = () => {
    setShowTerminal(false);
  };
  
  // Optionally skip terminal on very small screens
  useEffect(() => {
    if (windowSize.width < 480 && !isLoading) {
      // Uncomment this if you want to skip terminal on very small screens
      // setShowTerminal(false);
    }
  }, [windowSize.width, isLoading]);
  
  return (
    <>
      <CircuitCursor />
      
      {!isLoading && !showTerminal && (
        <>
          <CircuitNav activeSection={activeSection} onNavigate={handleNavigation} />
          {showExtras && (
            <>
              <CircuitAudio />
              <CircuitInfo />
              <CircuitTheme />
              <CircuitNotification />
            </>
          )}
        </>
      )}
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <CircuitLoader key="loader" />
        ) : showTerminal ? (
          <CircuitTerminal key="terminal" onComplete={handleTerminalComplete} />
        ) : (
          <div className="min-h-screen w-full overflow-hidden">
            <AnimatePresence mode="wait">
              {activeSection ? (
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-screen w-full"
                >
                  {activeSection === 'about' && <About onBack={handleBackClick} />}
                  {activeSection === 'projects' && <Projects onBack={handleBackClick} />}
                  {activeSection === 'experience' && <Experience onBack={handleBackClick} />}
                  {activeSection === 'skills' && <Skills onBack={handleBackClick} />}
                  {activeSection === 'articles' && <Articles onBack={handleBackClick} />}
                  {activeSection === 'contact' && <Contact onBack={handleBackClick} />}
                </motion.div>
              ) : (
                <motion.div
                  key="circuit-board"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-screen w-full relative overflow-hidden"
                >
                  <HolographicCircuit onNodeClick={handleNodeClick} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}