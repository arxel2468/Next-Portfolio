// src/components/sections/About.js
"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import BackButton from '../ui/BackButton';

export default function About({ onBack }) {
  return (
    <div className="min-h-screen bg-circuit-bg p-6 md:p-12">
      <BackButton onClick={onBack} />
      
      <div className="max-w-5xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-circuit-primary mb-2">
            <span className="text-circuit-text">&lt;</span>
            About
            <span className="text-circuit-text">/&gt;</span>
          </h1>
          
          <div className="h-1 w-24 bg-circuit-primary mb-8"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg mb-6 leading-relaxed">
              I'm Amit Pandit, an AI Engineer and Full Stack Developer with a passion for creating intelligent solutions that solve real-world problems. My journey in technology began with a fascination for how AI can transform businesses and enhance human experiences.
            </p>
            
            <p className="text-lg mb-6 leading-relaxed">
              Today, I specialize in developing AI-powered applications, building responsive web interfaces, and automating complex workflows. My approach combines technical expertise with a deep understanding of user needs to create solutions that are both powerful and accessible.
            </p>
            
            <p className="text-lg leading-relaxed">
              When I'm not coding, you can find me exploring some philosphical topics and voicing out my opinions on some fundamental questions on my Substack.
            </p>
            
            <div className="mt-8 p-6 bg-circuit-surface rounded-lg border border-circuit-primary/30">
              <h3 className="text-xl font-mono font-bold text-circuit-primary mb-4">
                $ cat personal_info.json
              </h3>
              <pre className="font-mono text-sm text-circuit-text/80 whitespace-pre-wrap">
{`{
  "name": "Amit Pandit",
  "role": "AI Engineer & Full Stack Developer",
  "location": "Mumbai, India",
  "education": "BSc Information Technology",
  "interests": [
    "Artificial Intelligence",
    "Web Development",
    "Open Source",
    "Writing"
  ]
}`}
              </pre>
            </div>
          </motion.div>
          
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative">
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden border-2 border-circuit-primary glow">
                <Image
                  src="/images/about-portrait.jpg"
                  alt="Amit Pandit"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-circuit-bg to-transparent opacity-50"></div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-circuit-surface p-4 border border-circuit-primary">
                <div className="font-mono text-circuit-primary">
                  {/* --- FIX IS HERE --- */}
                  <div className="text-xs opacity-70">{/* ROLE */}</div>
                  <div>AI Engineer & Developer</div>
                </div>
              </div>
              
              {/* Circuit decorations */}
              <svg className="absolute -top-4 -left-4 w-16 h-16 text-circuit-primary" viewBox="0 0 100 100">
                <path d="M0 20 H20 V0" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              
              <svg className="absolute -bottom-4 -left-4 w-16 h-16 text-circuit-primary" viewBox="0 0 100 100">
                <path d="M0 80 H20 V100" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              
              <svg className="absolute -top-4 -right-4 w-16 h-16 text-circuit-primary" viewBox="0 0 100 100">
                <path d="M100 20 H80 V0" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            
            <div className="mt-12 space-y-6">
              <h3 className="text-xl font-mono font-bold text-circuit-primary mb-4">
                Technical Expertise
              </h3>
              
              <div className="space-y-3">
                {[
                  { skill: "Machine Learning & Deep Learning", level: 90 },
                  { skill: "Natural Language Processing", level: 85 },
                  { skill: "Full Stack Web Development", level: 80 },
                  { skill: "Cloud Infrastructure & DevOps", level: 75 },
                  { skill: "Data Analysis & Visualization", level: 85 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-sm">{item.skill}</span>
                      <span className="font-mono text-xs text-circuit-primary">{item.level}%</span>
                    </div>
                    <div className="h-2 bg-circuit-surface rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-circuit-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.level}%` }}
                        transition={{ duration: 1, delay: 0.6 + (index * 0.1) }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}