// src/app/components/sections/Projects.js
"use client";
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../ui/ProjectCard';

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const projects = [
    {
      title: "Food Recipe Ratings",
      description: "AI-powered sentiment analysis system for recipe ratings, helping users discover top-rated dishes based on real feedback.",
      image: "/images/food.png",
      link: "https://github.com/arxel2468/food",
      tags: ["Python", "ML", "NLP", "Sentiment Analysis"],
    },
    {
      title: "Movie Recommender",
      description: "Personalized movie recommendation engine using collaborative filtering and content-based approaches.",
      image: "/images/movie.png",
      link: "https://github.com/arxel2468/movies-recommender",
      tags: ["Python", "Data Science", "Recommendation Systems"],
    },
    {
      title: "Python Automation Suite",
      description: "Collection of Python scripts for automating repetitive tasks, from image processing to email notifications.",
      image: "/images/automate.jpg",
      link: "https://github.com/arxel2468/automation-with-python",
      tags: ["Python", "Automation", "Scripting"],
    },
    {
      title: "E-commerce Platform",
      description: "Full-featured e-commerce solution with product management, payment processing, and analytics dashboard.",
      image: "/images/shopify-store.jpg",
      link: "https://stealstreet.in",
      tags: ["Next.js", "React", "E-commerce", "Shopify"],
    },
  ];
  
  return (
    <section id="projects" ref={ref} className="py-20 bg-magazine-paper dark:bg-magazine-dark">
      <div className="magazine-grid">
        <div className="col-start-2 col-end-14 md:col-start-4 md:col-end-12">
          <SectionHeading>More Projects</SectionHeading>
        </div>
        
        <div className="col-start-2 col-end-14 md:col-start-4 md:col-end-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
            >
              <ProjectCard project={project} index={index + 2} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}