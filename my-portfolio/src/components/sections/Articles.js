// src/components/sections/Articles.js
"use client";
import { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import BackButton from '../ui/BackButton';
import SectionHeading from '../ui/SectionHeading';

export default function Articles({ onBack }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the Substack RSS feed and parse it
    fetch('/api/substack')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.items);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Substack articles", err);
        setIsLoading(false);
        // Fallback articles
        setArticles([
          {
            title: "The Future of AI in Everyday Applications",
            description: "Exploring how artificial intelligence is becoming an integral part of our daily lives and what that means for developers.",
            link: "https://amitpandit.substack.com",
            pubDate: "May 15, 2023",
            thumbnail: "/images/article1.jpg"
          },
          {
            title: "Building Robust Machine Learning Pipelines",
            description: "A practical guide to creating reliable and scalable ML pipelines for production environments.",
            link: "https://amitpandit.substack.com",
            pubDate: "April 22, 2023",
            thumbnail: "/images/article2.jpg"
          },
          {
            title: "The Developer's Guide to Effective Technical Writing",
            description: "Tips and strategies for engineers who want to improve their documentation and technical communication skills.",
            link: "https://amitpandit.substack.com",
            pubDate: "March 10, 2023",
            thumbnail: "/images/article3.jpg"
          }
        ]);
      });
  }, []);

  return (
    <section id="articles" ref={ref} className="py-20 bg-circuit-bg">
      <BackButton onClick={onBack} />
      
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading>Latest Articles</SectionHeading>
          <p className="text-lg mb-12 text-circuit-text/80">
            Thoughts and insights on AI, development, and technology.
          </p>
        </motion.div>
        
        {isLoading ? (
          // Skeleton loading placeholders
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-circuit-surface p-6 rounded-xl"
              >
                <div className="h-48 bg-circuit-primary/10 rounded-lg mb-5"></div>
                <div className="h-7 bg-circuit-primary/10 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-circuit-primary/10 rounded mb-2"></div>
                <div className="h-4 bg-circuit-primary/10 rounded mb-2"></div>
                <div className="h-4 bg-circuit-primary/10 rounded w-2/3"></div>
                <div className="mt-4 h-5 bg-circuit-primary/10 rounded w-1/3"></div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className="group"
              >
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="aspect-video relative mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={article.thumbnail || '/images/article-placeholder.jpg'}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-3 w-full">
                        <div className="flex justify-between items-center">
                          <span className="text-white text-xs font-medium px-2 py-1 bg-circuit-primary/80 backdrop-blur-sm rounded-full">
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
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-circuit-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-circuit-text/70 line-clamp-3 mb-4">
                    {article.description}
                  </p>
                  
                  <div className="inline-flex items-center text-circuit-primary">
                    <span>Read Article</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <a 
            href="https://amitpandit.substack.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-circuit-primary hover:text-circuit-primary/80 transition-colors"
          >
            <span>View All Articles</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}