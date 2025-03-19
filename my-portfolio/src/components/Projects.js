"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'; 
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import Voice from '../../public/images/voice.jpeg';
import Food from '../../public/images/food.png';
import Automate from '../../public/images/automate.jpg';
import Movie from '../../public/images/movie.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Projects() {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const projects = [
    {
      title: "Food Recipe Ratings",
      description: "Discover top recipes rated by real user feedback, powered by sentiment analysis.",
      image: Food,
      link: "https://github.com/arxel2468/food",
      tags: ["Python", "ML"],
      badge: "AI/ML",
      color: "from-teal-500 to-emerald-600",
      tagColors: ["bg-teal-100 text-teal-800 border-teal-200", "bg-emerald-100 text-emerald-800 border-emerald-200"],
      darkTagColors: ["dark:bg-teal-900/40 dark:text-teal-300 dark:border-teal-800/50", "dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800/50"]
    },
    {
      title: "Movie Recommender",
      description: "Get personalized movie recommendations based on your favorite picks.",
      image: Movie,
      link: "https://github.com/arxel2468/movies-recommender",
      tags: ["Python", "Data Science"],
      badge: "AI/ML",
      color: "from-blue-500 to-indigo-600",
      tagColors: ["bg-blue-100 text-blue-800 border-blue-200", "bg-indigo-100 text-indigo-800 border-indigo-200"],
      darkTagColors: ["dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/50", "dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-800/50"]
    },
    {
      title: "Python Automation",
      description: "Automating tasks with Python—from image edits to email alerts.",
      image: Automate,
      link: "https://github.com/arxel2468/automation-with-python",
      tags: ["Python", "Automation"],
      badge: "Automation",
      color: "from-amber-500 to-orange-600",
      tagColors: ["bg-amber-100 text-amber-800 border-amber-200", "bg-orange-100 text-orange-800 border-orange-200"],
      darkTagColors: ["dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800/50", "dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800/50"]
    },
    {
      title: "Voice Website Builder",
      description: "Create websites with your voice—quick, easy, and tailored.",
      image: Voice,
      link: "https://github.com/arxel2468/voice-website-generator",
      tags: ["AI", "Voice"],
      badge: "AI",
      color: "from-purple-500 to-pink-600",
      tagColors: ["bg-purple-100 text-purple-800 border-purple-200", "bg-pink-100 text-pink-800 border-pink-200"],
      darkTagColors: ["dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800/50", "dark:bg-pink-900/40 dark:text-pink-300 dark:border-pink-800/50"]
    }
  ];

  return (
    <section id="projects" className="py-24 bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 dark:from-teal-950 dark:via-cyan-950 dark:to-blue-950 text-slate-800 dark:text-slate-200 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-emerald-200/20 to-blue-200/10 dark:from-emerald-500/10 dark:to-blue-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-teal-200/10 to-indigo-200/20 dark:from-teal-500/5 dark:to-indigo-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.03, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 dark:from-teal-400 dark:via-cyan-400 dark:to-blue-400 text-transparent bg-clip-text">AI/ML Creations</h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 font-serif italic">
            Intelligent solutions crafted with innovation and purpose
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            effect="coverflow"
            loop={true}
            centeredSlides={true}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            coverflowEffect={{
              rotate: 8,
              stretch: 0,
              depth: 100,
              modifier: 1.5,
              slideShadows: false,
            }}
            navigation
            pagination={{ clickable: true }}
            className="swiper-container !pb-16"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  className="m-4 transform-gpu"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                      <div className="relative h-52 rounded-lg overflow-hidden mb-5 group">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex items-end justify-between p-3">
                          <motion.span 
                            className={`text-white text-xs font-medium px-2 py-1 bg-gradient-to-r ${project.color} backdrop-blur-sm rounded-full`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {project.badge}
                          </motion.span>
                          <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            viewport={{ once: true }}
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white ring-2 ring-white/30"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        </div>
                        
                        {hoveredIndex === index && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-black/60 backdrop-blur-[2px] flex items-center justify-center"
                          >
                            <motion.div 
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.4, delay: 0.1 }}
                              className="text-white text-center p-4"
                            >
                              <div className="text-lg font-bold mb-2">View Project</div>
                              <div className="text-sm opacity-90">Explore the code and implementation</div>
                            </motion.div>
                          </motion.div>
                        )}
                      </div>
                      
                      <motion.h3 
                        className="text-xl font-bold mb-2 text-slate-900 dark:text-white relative inline-block"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {project.title}
                        <motion.span 
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400"
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.h3>
                      
                      <p className="text-slate-600 dark:text-slate-400 mb-4 flex-grow">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag, i) => (
                          <motion.span 
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 + (i * 0.1) }}
                            viewport={{ once: true }}
                            whileHover={{ y: -2, scale: 1.05 }}
                            className={`px-2 py-1 rounded-full text-xs font-medium border shadow-sm ${project.tagColors[i]} ${project.darkTagColors[i]}`}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </a>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
      
      {/* Subtle background particle animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 4 === 0 
                ? "bg-gradient-to-r from-teal-400/10 to-teal-500/5" 
                : i % 4 === 1 
                  ? "bg-gradient-to-r from-cyan-400/10 to-cyan-500/5" 
                  : i % 4 === 2
                    ? "bg-gradient-to-r from-blue-400/10 to-blue-500/5"
                    : "bg-gradient-to-r from-indigo-400/10 to-indigo-500/5"
            } dark:opacity-50`}
            style={{
              width: `${Math.random() * 12 + 5}px`, 
              height: `${Math.random() * 12 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 40 - 20],
              x: [0, Math.random() * 40 - 20],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <style jsx global>{`
        /* Custom Scrollbar for Webkit browsers */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(226, 232, 240, 0.6);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #0d9488, #0ea5e9);
          border-radius: 10px;
          border: 2px solid rgba(226, 232, 240, 0.6);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0f766e, #0284c7);
        }
        
        .dark ::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.6);
        }
        
        .dark ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #14b8a6, #3b82f6);
          border: 2px solid rgba(30, 41, 59, 0.6);
        }
        
        .dark ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2dd4bf, #60a5fa);
        }

        /* Swiper customization */
        .swiper-pagination-bullet {
          background: rgba(94, 234, 212, 0.5);
          opacity: 1;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
          background: linear-gradient(to right, #0d9488, #0ea5e9);
          width: 24px;
          border-radius: 4px;
        }
        
        .swiper-button-next,
        .swiper-button-prev {
          color: #0ea5e9;
          background: rgba(255, 255, 255, 0.9);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }
        
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.1);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        
        .dark .swiper-button-next,
        .dark .swiper-button-prev {
          background: rgba(30, 41, 59, 0.9);
          color: #38bdf8;
        }
        
        .dark .swiper-button-next:hover,
        .dark .swiper-button-prev:hover {
          background: rgba(30, 41, 59, 1);
        }
        
        .dark .swiper-pagination-bullet {
          background: rgba(45, 212, 191, 0.5);
        }
        
        .dark .swiper-pagination-bullet-active {
          background: linear-gradient(to right, #14b8a6, #3b82f6);
        }
      `}</style>
    </section>
  );
}
