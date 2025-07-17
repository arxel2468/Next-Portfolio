// src/app/components/sections/Cover.js
"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Cover() {
  return (
    <section id="top" className="relative min-h-screen flex items-center">
      <div className="magazine-grid w-full">
                {/* Cover image */}
                <div className="full-bleed relative h-screen">
          <Image
            src="/images/cover-bg.jpg" // You'll need to create this image
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>
        
        {/* Cover content */}
        <div className="absolute inset-0 magazine-grid items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-start-2 col-end-10 md:col-start-3 md:col-end-8 text-white z-10"
          >
            <div className="mb-4 inline-block px-3 py-1 border border-magazine-accent text-magazine-accent text-sm tracking-wider uppercase">
              Issue 01 — 2023
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Crafting <span className="text-magazine-accent">Intelligent</span> Solutions
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
              AI Engineer & Full Stack Developer specializing in machine learning applications and user-friendly interfaces.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#projects" 
                className="px-6 py-3 bg-magazine-accent text-white font-medium rounded-none hover:bg-magazine-accent/90 transition-colors"
              >
                View Portfolio
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 border border-white text-white font-medium rounded-none hover:bg-white/10 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
          
          {/* Issue details - magazine style */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-8 left-0 right-0 flex justify-between items-center px-6 md:px-12 text-white/80 text-sm"
          >
            <div>Amit Pandit</div>
            <div>Portfolio Edition</div>
            <div>2023</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}