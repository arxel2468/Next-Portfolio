"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      className="group bg-circuit-surface border border-circuit-primary/30 overflow-hidden"
      whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 240, 255, 0.3)' }}
    >
      <div className="relative">
        {/* Project number */}
        <div className="absolute top-3 right-3 z-10 bg-circuit-bg px-2 py-1 font-mono text-xs text-circuit-primary border border-circuit-primary/30">
          #{String(index).padStart(2, '0')}
        </div>
        
        {/* Project image */}
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-circuit-bg to-transparent opacity-70"></div>
        </div>
        
        {/* Overlay with link */}
        <div className="absolute inset-0 bg-circuit-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-circuit-primary text-circuit-primary hover:bg-circuit-primary hover:text-circuit-bg transition-colors font-mono"
          >
            View Project
          </a>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-mono font-bold text-circuit-primary mb-2">
          {project.title}
        </h3>
        
        <p className="text-circuit-text/80 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag, i) => (
            <span 
              key={i}
              className="px-2 py-1 bg-circuit-bg text-circuit-primary text-xs font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}