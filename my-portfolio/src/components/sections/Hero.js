import { useState, useEffect, useRef, useMemo} from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  

  // Use useMemo for roles array to avoid dependency issues
  const roles = useMemo(() => ["AI Engineer", "Full Stack Developer", "ML Specialist", "Automation Expert"], []);
  
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentRole = roles[roleIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        
        if (displayText.length === currentRole.length) {
          // Wait before starting to delete
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);
  
  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black"
    >
      {/* Interactive background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-purple-500/5 to-transparent opacity-70 dark:opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.15), transparent 40%)`,
        }}
      ></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500 dark:bg-purple-400"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-6 text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium"
            >
              Welcome to my digital space
            </motion.div>
            
            <motion.h1 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white"
                          >
                            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">Amit Pandit</span>
                            <motion.span 
                              initial={{ rotate: 0 }}
                              animate={{ rotate: [0, 20, 0, 20, 0] }}
                              transition={{ delay: 1, duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
                              className="inline-block ml-2"
                            >
                              👋
                            </motion.span>
                          </motion.h1>
                          
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="h-8 font-mono text-xl text-gray-700 dark:text-gray-300"
                          >
                            I'm a <span className="text-purple-600 dark:text-purple-400 font-semibold">{displayText}</span>
                            <span className="animate-pulse">|</span>
                          </motion.div>
                          
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0"
                          >
                            Crafting intelligent solutions with AI/ML, building user-friendly web applications, and automating tasks to solve real-world problems.
                          </motion.p>
                          
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                          >
                            <motion.a 
                              href="#projects" 
                              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.5)" }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg shadow-lg transition-all duration-300"
                            >
                              View My Work
                            </motion.a>
                            <motion.a 
                              href="#contact" 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300"
                            >
                              Get In Touch
                            </motion.a>
                          </motion.div>
                          
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="flex space-x-5 justify-center lg:justify-start pt-4"
                          >
                            {[
                              { icon: <FaGithub className="w-5 h-5" />, url: "https://github.com/arxel2468", label: "GitHub" },
                              { icon: <FaLinkedin className="w-5 h-5" />, url: "https://www.linkedin.com/in/amitpandit2468", label: "LinkedIn" },
                              { icon: <FaTwitter className="w-5 h-5" />, url: "https://twitter.com/amitpandit2468", label: "Twitter" },
                              { icon: <SiSubstack className="w-5 h-5" />, url: "https://amitpandit.substack.com", label: "Substack" }
                            ].map((social, index) => (
                              <motion.a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5, scale: 1.1 }}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 shadow-md hover:shadow-lg transition-all duration-300"
                                aria-label={social.label}
                              >
                                {social.icon}
                              </motion.a>
                            ))}
                          </motion.div>
                        </motion.div>
                        
                        {/* Right Content - 3D or Animated Illustration */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className="lg:w-1/2 flex justify-center"
                        >
                          <div className="relative w-80 h-80 md:w-96 md:h-96">
                            {/* Glowing background effect */}
                            <motion.div 
                              animate={{ 
                                scale: [1, 1.05, 1],
                                opacity: [0.5, 0.8, 0.5]
                              }}
                              transition={{ 
                                duration: 4, 
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
                            />
                            
                            {/* Main image with animated container */}
                            <motion.div 
                              animate={{ 
                                y: [0, -20, 0],
                                rotate: [0, 5, 0, -5, 0]
                              }}
                              transition={{ 
                                duration: 10, 
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                              className="relative z-10 w-full h-full"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-md"></div>
                              <div className="relative bg-white dark:bg-gray-900 p-2 rounded-full overflow-hidden border-2 border-purple-500/30 dark:border-purple-500/20">
                                <Image
                                  src="/images/profile-3d.png" // You'll need to create this image
                                  alt="Amit Pandit - 3D Avatar"
                                  width={400}
                                  height={400}
                                  className="rounded-full"
                                />
                              </div>
                              
                              {/* Floating tech icons */}
                              {[
                                { icon: "/images/tech/python.svg", top: "0%", left: "70%", delay: 0 },
                                { icon: "/images/tech/react.svg", top: "70%", left: "10%", delay: 1 },
                                { icon: "/images/tech/tensorflow.svg", top: "20%", left: "0%", delay: 2 },
                                { icon: "/images/tech/nextjs.svg", top: "80%", left: "80%", delay: 3 }
                              ].map((tech, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center p-2"
                                  style={{ top: tech.top, left: tech.left }}
                                  animate={{ 
                                    y: [0, -10, 0],
                                    x: [0, 5, 0, -5, 0],
                                    rotate: [0, 10, 0, -10, 0]
                                  }}
                                  transition={{ 
                                    duration: 5, 
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: tech.delay
                                  }}
                                >
                                  <Image
                                    src={tech.icon}
                                    alt="Technology icon"
                                    width={30}
                                    height={30}
                                  />
                                </motion.div>
                              ))}
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Scroll indicator */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                      className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    >
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex flex-col items-center"
                      >
                        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
                        <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  </section>
                );
              }
              
