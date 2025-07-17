"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import BackButton from '../ui/BackButton';

export default function Experience({ onBack }) {
  const experiences = [
    {
      company: "StealStreet.in",
      role: "E-commerce Development",
      period: "2023 - Present",
      description: "Built and launched a complete Shopify store with custom theme modifications, optimized UX/UI elements, and integrated payment gateways.",
      achievements: [
        "Managed Meta ad campaign with 7x ROAS",
        "Increased conversion rate by 35%",
        "Implemented data-driven optimization for product listings"
      ],
      logo: "/images/shopify-logo.png"
    },
    {
      company: "Self-employed",
      role: "AI/ML Freelancer",
      period: "2022 - Present",
      description: "Developed custom AI/ML solutions for clients across various industries, focusing on practical applications of machine learning.",
      achievements: [
        "Created sentiment analysis system for customer feedback",
        "Built recommendation engines for e-commerce platforms",
        "Developed NLP solutions for content categorization"
      ],
      logo: "/images/ai-freelance.png"
    },
    {
      company: "Tech Startup",
      role: "Web Development Intern",
      period: "2021 - 2022",
      description: "Worked on front-end development using React and Next.js, contributing to the company's main product and internal tools.",
      achievements: [
        "Implemented responsive UI components",
        "Optimized website performance",
        "Collaborated with design team on UX improvements"
      ],
      logo: "/images/web-dev.png"
    }
  ];
  
  return (
    <div className="min-h-screen bg-circuit-bg p-6 md:p-12">
      <BackButton onClick={onBack} />
      
      <div className="max-w-5xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-circuit-primary mb-2">
            <span className="text-circuit-text">&lt;</span>
            Experience
            <span className="text-circuit-text">/&gt;</span>
          </h1>
          
          <div className="h-1 w-24 bg-circuit-primary mb-8"></div>
        </motion.div>
        
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              className="relative"
            >
              {/* Timeline connector */}
              {index < experiences.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-circuit-primary/30"></div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4 flex flex-col relative">
                  {/* Timeline node */}
                  <div className="absolute left-6 top-6 w-3 h-3 rounded-full bg-circuit-primary transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                  
                  <div className="flex items-center mb-4 pl-12">
                    <div className="w-12 h-12 relative mr-4 border border-circuit-primary/30 p-2 bg-circuit-surface">
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-mono text-xl font-bold text-circuit-primary">{exp.company}</h3>
                      <p className="text-circuit-text/80">{exp.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-circuit-text/60 mb-4 pl-12">{exp.period}</p>
                </div>
                
                <div className="md:col-span-8 bg-circuit-surface p-6 border border-circuit-primary/30">
                  <p className="text-lg mb-4">{exp.description}</p>
                  <h4 className="font-mono text-circuit-primary mb-2">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-circuit-primary mr-2">❯</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}