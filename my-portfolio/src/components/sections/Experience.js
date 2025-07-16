import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const experiences = [
    {
      title: "E-commerce Development",
      company: "StealStreet.in",
      period: "2023 - Present",
      description: "Built and launched a complete Shopify store with custom theme modifications, optimized UX/UI elements, and integrated payment gateways.",
      achievements: [
        "Managed Meta ad campaign with 7x ROAS",
        "Increased conversion rate by 35%",
        "Implemented data-driven optimization for product listings"
      ],
      logo: "/images/shopify-logo.png",
      color: "border-blue-500 dark:border-blue-400"
    },
    {
      title: "AI/ML Freelancer",
      company: "Self-employed",
      period: "2022 - Present",
      description: "Developed custom AI/ML solutions for clients across various industries, focusing on practical applications of machine learning.",
      achievements: [
        "Created sentiment analysis system for customer feedback",
        "Built recommendation engines for e-commerce platforms",
        "Developed NLP solutions for content categorization"
      ],
      logo: "/images/ai-freelance.png", // You'll need to create this image
      color: "border-purple-500 dark:border-purple-400"
    },
    {
      title: "Video Editing Entrepreneur",
      company: "NiteSwift",
      period: "2023",
      description: "Launched and managed a video editing business connecting clients with freelancers, enchancing negoation and client management skills",
      achievements: [
        "Consistently delivered quality projects, boosting business growth",
        "Learned workflow refinement and client management"
      ],
      logo: "/images/web-dev.png", // You'll need to create this image
      color: "border-green-500 dark:border-green-400"
    }
  ];
  
  return (
    <section id="experience" ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Professional Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My journey through the tech landscape
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
          
          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.2) }}
                className={`relative flex flex-col md:flex-row items-center md:items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-white dark:bg-gray-800 border-4 border-purple-600 dark:border-purple-500 rounded-full z-10"></div>
                
                {/* Content */}
                <div className="md:w-1/2 pl-10 md:pl-0 md:pr-12 md:text-right space-y-4">
                  <div className="flex items-center md:justify-end space-x-4">
                    <div className="relative w-12 h-12 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md border-2 border-gray-200 dark:border-gray-700">
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                      <p className="text-purple-600 dark:text-purple-400 font-medium">{exp.company}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md border-l-4 md:border-l-0 md:border-r-4 ${exp.color}">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">{exp.period}</span>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{exp.description}</p>
                    
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-center text-gray-600 dark:text-gray-400">
                          <svg className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Empty space for the other side */}
                <div className="md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
