import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const skills = [
    { category: "Languages", items: ["Python", "JavaScript", "TypeScript", "HTML/CSS"] },
    { category: "Frameworks", items: ["React", "Next.js", "Node.js", "Express", "Django"] },
    { category: "AI/ML", items: ["TensorFlow", "PyTorch", "Scikit-learn", "NLP", "Computer Vision"] },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Firebase", "MongoDB"] }
  ];
  
  return (
    <section id="about" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image and background */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur-lg"></div>
              <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-2 shadow-xl">
                <Image
                  src="/images/about-me.jpg" // You'll need to create this image
                  alt="Amit Pandit - About Me"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl opacity-70 z-0"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200 dark:bg-pink-900/30 rounded-full blur-3xl opacity-70 z-0"></div>
          </motion.div>
          
          {/* Right side - Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Engineer & Full Stack Developer
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300">
              I'm passionate about creating intelligent solutions that solve real-world problems. With expertise in both AI/ML and full-stack development, I bridge the gap between cutting-edge AI research and practical applications.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              My journey began with a fascination for how technology can transform businesses and enhance human experiences. Today, I specialize in developing AI-powered applications, building responsive web interfaces, and automating complex workflows.
            </p>
            
            <div className="pt-4">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">My Skills</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skillGroup, groupIndex) => (
                  <motion.div 
                    key={groupIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + (groupIndex * 0.1) }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <h5 className="font-medium text-purple-600 dark:text-purple-400 mb-3">{skillGroup.category}</h5>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <motion.span 
                          key={skillIndex}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm rounded-full"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.a 
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-5 py-2.5 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Download Resume
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
