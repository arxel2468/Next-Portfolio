import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  
  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'web', label: 'Web Dev' },
    { id: 'automation', label: 'Automation' }
  ];
  
  const projects = [
    {
      id: 1,
      title: "Food Recipe Ratings",
      description: "AI-powered sentiment analysis system for recipe ratings, helping users discover top-rated dishes based on real feedback.",
      image: "/images/food.png",
      link: "https://github.com/arxel2468/food",
      category: "ai",
      tags: ["Python", "ML", "NLP", "Sentiment Analysis"],
      color: "from-teal-500 to-emerald-600"
    },
    {
      id: 2,
      title: "Movie Recommender",
      description: "Personalized movie recommendation engine using collaborative filtering and content-based approaches.",
      image: "/images/movie.png",
      link: "https://github.com/arxel2468/movies-recommender",
      category: "ai",
      tags: ["Python", "Data Science", "Recommendation Systems"],
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 3,
      title: "Python Automation Suite",
      description: "Collection of Python scripts for automating repetitive tasks, from image processing to email notifications.",
      image: "/images/automate.jpg",
      link: "https://github.com/arxel2468/automation-with-python",
      category: "automation",
      tags: ["Python", "Automation", "Scripting"],
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 4,
      title: "Voice Website Builder",
      description: "Revolutionary tool that converts voice commands into fully functional websites, making web development accessible to everyone.",
      image: "/images/voice.jpeg",
      link: "https://github.com/arxel2468/voice-website-generator",
      category: "ai",
      tags: ["AI", "Voice Recognition", "Web Development"],
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 5,
      title: "E-commerce Platform",
      description: "Full-featured e-commerce solution with product management, payment processing, and analytics dashboard.",
      image: "/images/shopify-store.jpg",
      link: "https://stealstreet.in",
      category: "web",
      tags: ["Next.js", "React", "E-commerce", "Shopify"],
      color: "from-cyan-500 to-blue-600"
    }
  ];
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  return (
    <section id="projects" ref={ref} className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my latest work across AI/ML, web development, and automation
          </p>
        </motion.div>
        
        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 group"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full text-white bg-gradient-to-r ${project.color}`}>
                        {project.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                {hoveredProject === project.id && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-900/80 flex items-center justify-center"
                  >
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium flex items-center space-x-2"
                    >
                      <span>View Project</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                  </motion.div>
                )}
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
