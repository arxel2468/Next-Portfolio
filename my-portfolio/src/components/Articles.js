"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch the Substack RSS feed and parse it
    fetch('/api/substack')
      .then((res) => res.json())
      .then((data) => setArticles(data.items.slice(0, 3))) // Top 3 articles
      .catch((err) => console.error("Error fetching Substack articles", err));
  }, []);

  return (
    <section id="articles" className="py-20 bg-gradient-to-br from-amber-50 via-slate-50 to-indigo-50 dark:from-amber-950 dark:via-slate-950 dark:to-indigo-950 text-slate-800 dark:text-slate-200 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-amber-200/20 dark:bg-amber-700/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-300/20 dark:bg-indigo-700/10 rounded-full blur-3xl"></div>
        <svg className="absolute -top-24 -right-24 text-blue-100 dark:text-blue-900/20 w-64 h-64 transform rotate-12 opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M46.5,-78.3C59.1,-70.9,67.9,-57.2,74.1,-42.7C80.4,-28.2,84.1,-14.1,83.7,-0.2C83.3,13.6,78.7,27.3,71,39.1C63.2,51,52.3,61.1,39.7,67.7C27.1,74.2,13.6,77.3,-0.3,77.8C-14.1,78.3,-28.2,76.2,-40.9,69.9C-53.7,63.6,-65,53,-72.9,39.9C-80.7,26.7,-85.1,13.4,-83.9,0.7C-82.7,-12,-76,-24,-68.8,-36.2C-61.7,-48.3,-54.1,-60.6,-42.9,-68.6C-31.7,-76.7,-15.8,-80.6,0.3,-81.1C16.4,-81.6,33.9,-78.8,46.5,-78.3Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute -bottom-16 -left-16 text-amber-100 dark:text-amber-900/20 w-56 h-56 transform -rotate-12 opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M39.9,-68.1C52.6,-62.1,64.5,-53.1,72.7,-40.9C80.9,-28.7,85.5,-14.4,85.2,-0.2C84.9,14,79.8,27.9,71.7,39.7C63.7,51.4,52.8,61,40.3,67.7C27.8,74.4,13.9,78.3,-0.5,79.2C-15,80.1,-30,78.1,-43.4,71.9C-56.8,65.7,-68.7,55.4,-77.4,42.1C-86.1,28.8,-91.6,14.4,-91.9,-0.2C-92.2,-14.7,-87.2,-29.5,-78.5,-41.5C-69.8,-53.5,-57.4,-62.8,-44,-68.5C-30.6,-74.2,-15.3,-76.3,-0.5,-75.5C14.4,-74.7,28.7,-71,39.9,-68.1Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-3 text-slate-900 dark:text-white relative inline-block">
            Latest Substack Articles
            <motion.span 
              className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-amber-400 to-indigo-500 rounded-full"
              initial={{ width: 0, left: "50%" }}
              whileInView={{ width: "50%", left: "25%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            ></motion.span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 font-serif italic mt-4">
            Thoughts and insights from my digital journey
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 h-full flex flex-col hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-indigo-500/5 dark:from-amber-500/10 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative h-48 mb-5 rounded-lg overflow-hidden group">
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end">
                      <div className="p-3 w-full">
                        <div className="flex justify-between items-center">
                          <span className="text-white text-xs font-medium px-2 py-1 bg-amber-500/80 backdrop-blur-sm rounded-full">
                            Article
                          </span>
                          <span className="text-white text-xs font-medium">
                            {new Date(article.pubDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white relative">
                    {article.title}
                    <div className="h-0.5 w-0 bg-gradient-to-r from-amber-400 to-indigo-500 absolute -bottom-1 left-0 group-hover:w-full transition-all duration-300"></div>
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow line-clamp-3">{article.description}</p>
                  
                  <a 
                    href={article.link} 
                    className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 mt-auto inline-flex items-center font-medium transition-colors group"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Read More
                    <svg 
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            // Skeleton loading placeholders
            [...Array(3)].map((_, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white/80 dark:bg-slate-800/80 p-6 rounded-xl shadow-lg"
              >
                <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-lg mb-5"></div>
                <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                <div className="mt-4 h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute pointer-events-none inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${Math.floor(Math.random() * 3) + 2} h-${Math.floor(Math.random() * 3) + 2} rounded-full bg-gradient-to-br ${
              i % 2 === 0 
                ? "from-amber-400/20 to-amber-500/30 dark:from-amber-400/10 dark:to-amber-500/20" 
                : "from-indigo-400/20 to-indigo-500/30 dark:from-indigo-400/10 dark:to-indigo-500/20"
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
}
