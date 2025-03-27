"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import ShopifyStore from '../../public/images/shopify-store.jpg';
import { motion } from 'framer-motion';

export default function Work() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeMetric, setActiveMetric] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Simplified Meta ad metrics
  const metaMetrics = [
    { label: "ROAS", value: "7x", width: "70%" },
    { label: "Conversion Rate", value: "35%", width: "35%" },
    { label: "CTR", value: "10.9%", width: "55%" },
    { label: "Reach", value: "14.7k+", width: "85%" },
  ];

  return (
    <section id="work" className="py-24 bg-gradient-to-r from-blue-200 to-cyan-400 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-3 text-primary-dark dark:text-white">Professional Experience</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-800 dark:text-gray-400">
            From concept to conversion — crafting digital experiences with purpose
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-blue-100 dark:border-gray-700"
        >
          <div className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full md:w-2/3"
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    initial={{ scale: 0.8, rotate: -5 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    viewport={{ once: true }}
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl mr-5 shadow-sm border border-blue-200/50 dark:border-blue-700/30"
                  >
                    <Image
                      src={ShopifyStore}
                      alt="Shopify Logo"
                      width={48}
                      height={48}
                      className="h-12 w-12"
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">StealStreet.in</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">E-commerce Development</p>
                  </div>
                </div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed"
                >
                  Built and launched a complete Shopify store that combines stellar UX with effective marketing strategies, 
                  resulting in measurable growth and consistent conversions.
                </motion.p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  {[
                    {
                      title: "Store Design",
                      description: "Custom theme modifications with optimized UX/UI elements",
                      icon: (
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      )
                    },
                    {
                      title: "Meta Ads Campaign",
                      description: "7x return on ad spend with targeted campaigns",
                      icon: (
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
          </svg>
        )
      },
      {
        title: "Integrations",
        description: "Payment gateways, shipping solutions & inventory tools",
        icon: (
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        )
      },
      {
        title: "Analytics",
        description: "Data-driven optimization for product listings & marketing",
        icon: (
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      }
    ].map((item, index) => (
      <motion.div 
        key={index}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
        viewport={{ once: true }}
        className="flex items-start group"
      >
        <motion.div 
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
          }}
          className="flex-shrink-0 mt-1 p-2 bg-blue-50 dark:bg-gray-700 rounded-lg shadow-sm border border-blue-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-all duration-300"
        >
          {item.icon}
        </motion.div>
        <div className="ml-4">
          <p className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
  
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
    viewport={{ once: true }}
    className="flex flex-wrap gap-2 mb-8"
  >
    {[
      { text: "Shopify", color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/50" },
      { text: "E-commerce", color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/50" },
      { text: "Meta Ads", color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/50" },
      { text: "Marketing", color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/50" },
      { text: "Analytics", color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/50" }
    ].map((tag, index) => (
      <motion.span 
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.7 + (index * 0.05) }}
        whileHover={{ 
          y: -3, 
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
        className={`px-3 py-1 rounded-full text-sm font-medium ${tag.color} border shadow-sm hover:shadow transition-all duration-300`}
      >
        {tag.text}
      </motion.span>
    ))}
  </motion.div>
  
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.8 }}
    viewport={{ once: true }}
  >
    <motion.a 
      href="https://stealstreet.in" 
      target="_blank" 
      rel="noopener noreferrer"
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300/50 dark:focus:ring-blue-800/50 transition-all shadow-md"
    >
      Visit StealStreet
      <motion.svg 
        className="w-5 h-5 ml-2" 
        fill="currentColor" 
        viewBox="0 0 20 20"
        animate={{
          x: [0, 4, 0],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </motion.svg>
    </motion.a>
  </motion.div>
</motion.div>

<motion.div 
  initial={{ opacity: 0, x: 20 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, delay: 0.3 }}
  viewport={{ once: true }}
  className="w-full md:w-1/3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-7 text-white shadow-lg border border-blue-400/20"
>
  <motion.div 
    className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10 pointer-events-none"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 0.1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="absolute top-5 right-5 w-20 h-20 bg-white rounded-full blur-xl"></div>
    <div className="absolute bottom-10 left-5 w-16 h-16 bg-white rounded-full blur-xl"></div>
  </motion.div>

  <motion.h4 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.3, delay: 0.4 }}
    viewport={{ once: true }}
    className="text-xl font-bold mb-5 flex items-center"
  >
    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
    </svg>
    Campaign Performance
  </motion.h4>
  
  <div className="mb-5 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      className="text-center mb-2"
    >
      <div className="text-xs font-medium text-blue-200 mb-1">Hot Wheels Campaign</div>
      <div className="flex justify-between items-center">
        <motion.div 
          className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 mx-auto"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
        >
          <span className="text-2xl font-bold">7x</span>
        </motion.div>
        <span className="text-sm opacity-80">Return On<br/>Ad Spend</span>
      </div>
    </motion.div>
  </div>
  
  <div className="space-y-5">
    {metaMetrics.map((metric, index) => (
      <motion.div 
        key={index}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
        viewport={{ once: true }}
        whileHover={{ 
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderColor: "rgba(255, 255, 255, 0.3)" 
        }}
        className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 transition-all duration-300"
        onMouseEnter={() => setActiveMetric(index)}
        onMouseLeave={() => setActiveMetric(null)}
      >
        <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-blue-100">{metric.label}</span>
                        <span className="text-sm font-bold">{metric.value}</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: metric.width }}
                          transition={{ duration: 0.8, delay: 0.7 + (index * 0.1), ease: "easeOut" }}
                          viewport={{ once: true }}
                          className={`h-2 rounded-full ${
                            activeMetric === index 
                              ? 'bg-white' 
                              : 'bg-gradient-to-r from-blue-300/70 to-cyan-300/90'
                          }`}
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                  viewport={{ once: true }}
                  className="mt-6"
                >
                  <div className="text-xs text-center text-white/80 italic">
                    Managed Meta ad campaign with 10.9% CTR,<br/>driving 4,000+ monthly visitors
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-cyan-500/5 dark:opacity-50"
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
    </section>
  );
}