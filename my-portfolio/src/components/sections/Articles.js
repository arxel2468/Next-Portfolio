// src/components/sections/Articles.js
"use client";
import { useEffect, useState, useRef } from "react";
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import BackButton from '../ui/BackButton';

export default function Articles({ onBack }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  // Fallback placeholder image
  const placeholderImage = '/images/article-placeholder.jpg';

  useEffect(() => {
    // Prevent duplicate fetches
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    
    setIsLoading(true);
    
    fetch('/api/substack')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Substack data:", data);
        if (data.items && Array.isArray(data.items)) {
          // Limit to 6 articles
          setArticles(data.items.slice(0, 6));
        } else {
          throw new Error("Invalid data format received");
        }
      })
      .catch((err) => {
        console.error("Error fetching Substack articles", err);
        setError(err.message);
        
        // Only set fallback articles if there was an error
        setArticles([
          {
            title: "The Future of AI in Everyday Applications",
            description: "Exploring how artificial intelligence is becoming an integral part of our daily lives and what that means for developers.",
            link: "https://amitpandit.substack.com",
            pubDate: "May 15, 2023",
            thumbnail: placeholderImage
          },
          {
            title: "Building Robust Machine Learning Pipelines",
            description: "A practical guide to creating reliable and scalable ML pipelines for production environments.",
            link: "https://amitpandit.substack.com",
            pubDate: "April 22, 2023",
            thumbnail: placeholderImage
          },
          {
            title: "The Developer's Guide to Effective Technical Writing",
            description: "Tips and strategies for engineers who want to improve their documentation and technical communication skills.",
            link: "https://amitpandit.substack.com",
            pubDate: "March 10, 2023",
            thumbnail: placeholderImage
          }
        ]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-circuit-bg p-6 md:p-12 section-container">
      <BackButton onClick={onBack} />
      
      <div className="max-w-5xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-circuit-primary mb-2">
            <span className="text-circuit-text">&lt;</span>
            Latest Articles
            <span className="text-circuit-text">/&gt;</span>
          </h1>
          
          <div className="h-1 w-24 bg-circuit-primary mb-8"></div>
          
          <p className="text-lg mb-12 leading-relaxed max-w-3xl">
            Thoughts and insights on AI, development, and technology. 
            Dive into my latest writings on the intersection of artificial intelligence, 
            software development, and the future of technology.
          </p>
        </motion.div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-4 border border-circuit-primary/30 bg-circuit-surface rounded-lg mb-8"
          >
            <p className="text-circuit-primary font-mono">
              $ error: {error}
            </p>
            <p className="text-circuit-text/80 mt-2">
              Showing fallback content instead. Please try again later.
            </p>
          </motion.div>
        )}
        
        {isLoading ? (
          // Skeleton loading placeholders with circuit theme
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <motion.div 
                key={`skeleton-${index}`}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-circuit-surface p-6 rounded-lg border border-circuit-primary/20"
              >
                <div className="aspect-video bg-circuit-primary/10 rounded-lg mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-circuit-primary/5 to-transparent animate-pulse"></div>
                </div>
                <div className="h-6 bg-circuit-primary/10 rounded w-3/4 mb-3"></div>
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
                key={`article-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className="group bg-circuit-surface rounded-lg overflow-hidden border border-circuit-primary/30 hover:border-circuit-primary/60 transition-all duration-300"
              >
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block h-full flex flex-col"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <div className="w-full h-full relative bg-circuit-primary/10">
                      <Image
                        src={article.thumbnail}
                        alt={article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          // Set a fallback image if loading fails
                          e.currentTarget.src = placeholderImage;
                          e.currentTarget.onerror = null; // Prevent infinite loop
                        }}
                      />
                    </div>
                    
                    {/* Circuit decorations */}
                    <svg className="absolute top-2 left-2 w-8 h-8 text-circuit-primary" viewBox="0 0 100 100">
                      <path d="M0 20 H20 V0" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    
                    <svg className="absolute bottom-2 right-2 w-8 h-8 text-circuit-primary" viewBox="0 0 100 100">
                      <path d="M100 80 H80 V100" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-circuit-bg to-transparent opacity-50"></div>
                    
                    <div className="absolute bottom-0 right-0 bg-circuit-surface px-3 py-1 font-mono text-xs text-circuit-primary border-l border-t border-circuit-primary/50">
                      {new Date(article.pubDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-mono font-bold mb-3 group-hover:text-circuit-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-circuit-text/70 line-clamp-3 mb-4 flex-grow">
                      {article.description}
                    </p>
                    
                    <div className="inline-flex items-center text-circuit-primary mt-auto font-mono">
                      <span>$ read_article</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a 
            href="https://amitpandit.substack.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-circuit-surface border border-circuit-primary/50 rounded-lg text-circuit-primary hover:bg-circuit-primary/10 transition-colors font-mono"
          >
            <span>$ view_all_articles</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
}