// src/app/components/sections/About.js
"use client";
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '../ui/SectionHeading';
import PullQuote from '../ui/PullQuote';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <section id="about" ref={ref} className="py-20 bg-magazine-paper dark:bg-magazine-dark">
      <div className="magazine-grid">
        <div className="col-start-2 col-end-14 md:col-start-4 md:col-end-12">
          <SectionHeading>About the Author</SectionHeading>
        </div>
        
        <div className="col-start-2 col-end-14 md:col-start-4 md:col-end-8 mb-8 md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg mb-6 leading-relaxed">
              I'm Amit Pandit, an AI Engineer and Full Stack Developer with a passion for creating intelligent solutions that solve real-world problems. My journey in technology began with a fascination for how AI can transform businesses and enhance human experiences.
            </p>
            
            <p className="text-lg mb-6 leading-relaxed">
              Today, I specialize in developing AI-powered applications, building responsive web interfaces, and automating complex workflows. My approach combines technical expertise with a deep understanding of user needs to create solutions that are both powerful and accessible.
            </p>
            
            <p className="text-lg leading-relaxed">
              When I'm not coding, you can find me exploring the latest advancements in machine learning, contributing to open-source projects, or writing about technology on my Substack.
            </p>
          </motion.div>
        </div>
        
        <div className="col-start-2 col-end-14 md:col-start-9 md:col-end-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[3/4] relative">
              <Image
                src="/images/about-portrait.jpg" // You'll need to create this image
                alt="Amit Pandit"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-magazine-accent text-white py-2 px-4">
              <span className="text-sm font-medium">AI Engineer & Developer</span>
            </div>
          </motion.div>
        </div>
        
        <PullQuote className="col-start-2 col-end-14 md:col-start-4 md:col-end-12 my-16">
          I believe in creating technology that not only works well but also enhances human capabilities and improves lives.
        </PullQuote>
        
        <div className="col-start-2 col-end-14 md:col-start-4 md:col-end-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-serif font-bold mb-4">Technical Expertise</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-magazine-accent mr-2"></span>
                <span>Machine Learning & Deep Learning</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-magazine-accent mr-2"></span>
                <span>Natural Language Processing</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-magazine-accent mr-2"></span>
                <span>Full Stack Web Development</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-magazine-accent mr-2"></span>
                <span>Cloud Infrastructure & DevOps</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-magazine-accent mr-2"></span>
                <span>Data Analysis & Visualization</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-xl font-serif font-bold mb-4">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'TensorFlow', 'PyTorch', 'JavaScript', 'React', 'Next.js', 'Node.js', 'AWS', 'Docker', 'Git'].map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-magazine-light dark:bg-magazine-dark/50 text-magazine-ink dark:text-white text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}