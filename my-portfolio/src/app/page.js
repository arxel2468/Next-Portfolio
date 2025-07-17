"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CircuitBoard from '../components/circuit/CircuitBoard';
import CircuitLoader from '../components/circuit/CircuitLoader';
import CircuitNode from '../components/circuit/CircuitNode';
import CircuitPath from '../components/circuit/CircuitPath';
import CircuitPulse from '../components/circuit/CircuitPulse';
import CircuitCursor from '../components/ui/CircuitCursor';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';
import Skills from '../components/sections/Skills';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleNodeClick = (section) => {
    setActiveSection(section);
  };
  
  const handleBackClick = () => {
    setActiveSection(null);
  };
  
  return (
    <>
    <CircuitCursor />
    <AnimatePresence mode="wait">
      {isLoading ? (
        <CircuitLoader key="loader" />
      ) : (
        <div className="min-h-screen">
          <AnimatePresence mode="wait">
            {activeSection ? (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen"
              >
                {activeSection === 'about' && <About onBack={handleBackClick} />}
                {activeSection === 'projects' && <Projects onBack={handleBackClick} />}
                {activeSection === 'experience' && <Experience onBack={handleBackClick} />}
                {activeSection === 'skills' && <Skills onBack={handleBackClick} />}
                {activeSection === 'contact' && <Contact onBack={handleBackClick} />}
              </motion.div>
            ) : (
              <motion.div
                key="circuit-board"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen relative overflow-hidden"
              >
                <CircuitBoard>
                  {/* Central node - Profile */}
                  <CircuitNode
                    x="50%"
                    y="50%"
                    size="large"
                    label="Amit Pandit"
                    sublabel="AI Engineer & Developer"
                    primary
                  />
                  
                  {/* About node */}
                  <CircuitNode
                    x="25%"
                    y="30%"
                    label="About"
                    onClick={() => handleNodeClick('about')}
                  />
                  <CircuitPath start={{ x: "50%", y: "50%" }} end={{ x: "25%", y: "30%" }} />
                  <CircuitPulse start={{ x: "50%", y: "50%" }} end={{ x: "25%", y: "30%" }} />
                  
                  {/* Projects node */}
                  <CircuitNode
                    x="75%"
                    y="30%"
                    label="Projects"
                    onClick={() => handleNodeClick('projects')}
                  />
                  <CircuitPath start={{ x: "50%", y: "50%" }} end={{ x: "75%", y: "30%" }} />
                  <CircuitPulse start={{ x: "50%", y: "50%" }} end={{ x: "75%", y: "30%" }} delay={0.5} />
                  
                  {/* Experience node */}
                  <CircuitNode
                    x="75%"
                    y="70%"
                    label="Experience"
                    onClick={() => handleNodeClick('experience')}
                  />
                  <CircuitPath start={{ x: "50%", y: "50%" }} end={{ x: "75%", y: "70%" }} />
                  <CircuitPath start={{ x: "75%", y: "30%" }} end={{ x: "75%", y: "70%" }} />
                  <CircuitPulse start={{ x: "50%", y: "50%" }} end={{ x: "75%", y: "70%" }} delay={1} />
                  
                  {/* Skills node */}
                  <CircuitNode
                    x="25%"
                    y="70%"
                    label="Skills"
                    onClick={() => handleNodeClick('skills')}
                  />
                  <CircuitPath start={{ x: "50%", y: "50%" }} end={{ x: "25%", y: "70%" }} />
                  <CircuitPath start={{ x: "25%", y: "30%" }} end={{ x: "25%", y: "70%" }} />
                  <CircuitPulse start={{ x: "50%", y: "50%" }} end={{ x: "25%", y: "70%" }} delay={1.5} />
                  
                  {/* Contact node */}
                  <CircuitNode
                    x="50%"
                    y="85%"
                    label="Contact"
                    onClick={() => handleNodeClick('contact')}
                  />
                  <CircuitPath start={{ x: "50%", y: "50%" }} end={{ x: "50%", y: "85%" }} />
                  <CircuitPath start={{ x: "25%", y: "70%" }} end={{ x: "50%", y: "85%" }} />
                  <CircuitPath start={{ x: "75%", y: "70%" }} end={{ x: "50%", y: "85%" }} />
                  <CircuitPulse start={{ x: "50%", y: "50%" }} end={{ x: "50%", y: "85%" }} delay={2} />
                </CircuitBoard>
                
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-circuit-text/60 text-sm">
                  <p>Click on a node to explore</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}