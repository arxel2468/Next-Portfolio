"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import BackButton from '../ui/BackButton';
import ProjectCard from '../ui/ProjectCard';

export default function Projects({ onBack }) {
  const projects = [
    {
      title: "Voice Website Generator",
      description: "Create websites as you sit and relax, just voice out commands and a website of your desires will come to reality.",
      image: "/images/voice.jpeg",
      tags: ["Python", "Groq", "FastAPI"],
      link: "https://github.com/arxel2468/voice-website-generator"
    },
    {
      title: "Food Recipe Ratings",
      description: "AI-powered sentiment analysis system for recipe ratings, helping users discover top-rated dishes based on real feedback.",
      image: "/images/food.png",
      tags: ["Python", "ML", "NLP", "Sentiment Analysis"],
      link: "https://github.com/arxel2468/food"
    },
    {
      title: "Movie Recommender",
      description: "Personalized movie recommendation engine using content-based filtering approach.",
      image: "/images/movie.png",
      tags: ["Python", "Data Science", "Recommendation Systems"],
      link: "https://github.com/arxel2468/movies-recommender"
    },
    {
      title: "Python Automation Suite",
      description: "Collection of Python scripts for automating repetitive tasks, from image processing to email notifications.",
      image: "/images/automate.jpg",
      tags: ["Python", "Automation", "Scripting"],
      link: "https://github.com/arxel2468/automation-with-python"
    },
    {
      title: "E-commerce Platform",
      description: "Full-featured e-commerce solution with product management, payment processing, and analytics dashboard.",
      image: "/images/shopify-store.jpg",
      tags: ["Next.js", "React", "E-commerce", "Shopify"],
      link: "https://stealstreet.in"
    }
  ];
  
  return (
    <div className="min-h-screen bg-circuit-bg p-6 md:p-12 v">
      <BackButton onClick={onBack} />
      
      <div className="max-w-6xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-circuit-primary mb-2">
            <span className="text-circuit-text">&lt;</span>
            Projects
            <span className="text-circuit-text">/&gt;</span>
          </h1>
          
          <div className="h-1 w-24 bg-circuit-primary mb-8"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
            >
              <ProjectCard project={project} index={index + 1} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}