// src/app/page.js
"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout components
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TableOfContents from '../components/layout/TableOfContents';

// Section components
import Cover from '../components/sections/Cover';
import About from '../components/sections/About';
import FeaturedProject from '../components/sections/FeaturedProject';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Articles from '../components/sections/Articles';
import Contact from '../components/sections/Contact';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-magazine-paper dark:bg-magazine-dark z-50"
        >
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">
              <span className="text-magazine-accent">A.</span>Pandit
            </h1>
            <div className="w-64 h-0.5 bg-gray-200 dark:bg-gray-700 relative overflow-hidden mx-auto">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-magazine-accent"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5 }}
              />
            </div>
            <p className="mt-4 text-magazine-muted">Portfolio Edition</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Header />
          <TableOfContents />
          <main>
            <Cover />
            <About />
            <FeaturedProject />
            <Projects />
            <Experience />
            <Articles />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}