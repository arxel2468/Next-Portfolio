// src/components/sections/Articles.js
"use client";
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '../ui/SectionHeading';

export default function Articles() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // src/components/sections/Articles.js (continued)
  useEffect(() => {
    // Fetch articles from Substack
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/substack');
        const data = await response.json();
        setArticles(data.items.slice(0, 3)); // Get only the first 3 articles
      } catch (error) {
        console.error('Error fetching articles:', error);
        // Fallback articles if API fails
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
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticles();
  }, []);
  
  return (
    <section id="articles" ref={ref} className="py-20 bg-white dark:bg-magazine-dark">
      <div className="magazine-grid">
        <div className="col-start-2 col-end-14 md:col-start-4 md:col-end-12">
          <SectionHeading>Latest Articles</SectionHeading>
          <p className="text-lg mb-12">
            Thoughts and insights on AI, development, and technology.
          </p>
        </div>
        
        {isLoading ? (
          <div className="col-start-2 col-end-14 md:col-start-4 md:col-end-12 flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-magazine-light border-t-magazine-accent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="col-start-2 col-end-14 md:col-start-4 md:col-end-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                className="group"
              >
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="aspect-[16/9] relative mb-4 overflow-hidden">
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="mb-2 text-sm text-magazine-muted">
                    {new Date(article.pubDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-magazine-accent transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-magazine-muted line-clamp-3">
                    {article.description}
                  </p>
                  
                  <div className="mt-4 inline-flex items-center text-magazine-accent">
                    <span>Read Article</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        )}
        
        <div className="col-start-2 col-end-14 md:col-start-4 md:col-end-12 text-center mt-12">
          <a 
            href="https://amitpandit.substack.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-magazine-accent hover:text-magazine-accent/80 transition-colors"
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