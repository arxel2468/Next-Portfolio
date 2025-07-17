// src/components/sections/FeaturedProject.js
"use client";
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

export default function FeaturedProject() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <section ref={ref} className="py-20 bg-magazine-light dark:bg-black">
      <div className="magazine-grid">
        <div className="col-start-2 col-end-14 md:col-start-4 md:col-end-12">
          <SectionHeading>Featured Project</SectionHeading>
        </div>
        
        <div className="col-start-2 col-end-14 md:col-start-4 md:col-end-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 order-2 md:order-1"
          >
            <span className="text-magazine-accent text-sm font-medium uppercase tracking-wider">
              AI-Powered Solution
            </span>
            <h3 className="text-3xl font-serif font-bold mt-2 mb-4">
              Intelligent Content Recommendation Engine
            </h3>
            <p className="text-lg mb-6 leading-relaxed">
              A sophisticated recommendation system that analyzes user behavior and content characteristics to deliver personalized suggestions. Built with Python, TensorFlow, and deployed on AWS, this project demonstrates the power of machine learning in enhancing user experience.
            </p>
            <div className="space-y-4 mb-8">
              <div>
                <h4 className="font-medium mb-2">Key Features:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-magazine-accent mt-2 mr-2 flex-shrink-0"></span>
                    <span>Hybrid recommendation approach combining collaborative filtering and content-based methods</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-magazine-accent mt-2 mr-2 flex-shrink-0"></span>
                    <span>Real-time processing of user interactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-magazine-accent mt-2 mr-2 flex-shrink-0"></span>
                    <span>A/B testing framework for algorithm optimization</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'TensorFlow', 'AWS', 'Docker', 'FastAPI', 'Redis'].map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-magazine-paper dark:bg-magazine-dark/50 text-magazine-ink dark:text-white text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Button href="https://github.com/arxel2468/recommendation-engine" variant="primary">
              View Project
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5 order-1 md:order-2"
          >
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="/images/featured-project.jpg"
                  alt="Recommendation Engine Project"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-magazine-accent text-white py-2 px-4 text-sm">
                01
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}