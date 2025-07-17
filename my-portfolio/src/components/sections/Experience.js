// src/app/components/sections/Experience.js
"use client";
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '../ui/SectionHeading';

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
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
      logo: "/images/ai-freelance.png" // You'll need to create this image
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
      logo: "/images/web-dev.png" // You'll need to create this image
    }
  ];
  
  return (
    <section id="experience" ref={ref} className="py-20 bg-magazine-light dark:bg-black">
      <div className="magazine-grid">
        <div className="col-start-2 col-end-14 md:col-start-4 md:col-end-12">
          <SectionHeading>Professional Experience</SectionHeading>
        </div>
        
        <div className="col-start-2 col-end-14 md:col-start-4 md:col-end-12 space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              <div className="md:col-span-4 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 relative mr-4">
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold">{exp.company}</h3>
                    <p className="text-magazine-accent">{exp.role}</p>
                  </div>
                </div>
                <p className="text-sm text-magazine-muted mb-4">{exp.period}</p>
              </div>
              
              <div className="md:col-span-8">
                <p className="text-lg mb-4">{exp.description}</p>
                <h4 className="font-medium mb-2">Key Achievements:</h4>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-2 h-2 bg-magazine-accent mt-2 mr-2 flex-shrink-0"></span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}