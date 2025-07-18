"use client";
import { motion } from 'framer-motion';
import BackButton from '../ui/BackButton';
import SkillCard from '../ui/SkillCard';

export default function Skills({ onBack }) {
  const skillCategories = [
    {
      name: "Programming Languages",
      skills: [
        { name: "Python", level: 95 },
        { name: "JavaScript", level: 70 },
        { name: "TypeScript", level: 60 },
        { name: "SQL", level: 80 },
        { name: "C++", level: 70 }
      ]
    },
    {
      name: "AI & Machine Learning",
      skills: [
        { name: "TensorFlow", level: 75 },
        { name: "Scikit-Learn", level: 90 },
        { name: "NLP", level: 85 },
        { name: "PyTorch", level: 60 },
        { name: "Computer Vision", level: 70 }
      ]
    },
    {
      name: "Web Development",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "HTML/CSS", level: 90 },
        { name: "Tailwind CSS", level: 85 }
      ]
    },
    {
      name: "DevOps & Cloud",
      skills: [
        { name: "Linux", level: 85 },
        { name: "Git", level: 90 },
        { name: "Docker", level: 70 },
        { name: "AWS", level: 60 },
        { name: "CI/CD", level: 75 },
      ]
    }
  ];
  
  return (
    <div className="min-h-screen bg-circuit-bg p-6 md:p-12 section-container">
      <BackButton onClick={onBack} />
      
      <div className="max-w-6xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-circuit-primary mb-2">
            <span className="text-circuit-text">&lt;</span>
            Skills
            <span className="text-circuit-text">/&gt;</span>
          </h1>
          
          <div className="h-1 w-24 bg-circuit-primary mb-8"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
            >
              <SkillCard category={category} />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-mono font-bold text-circuit-primary mb-6">Tools & Technologies</h2>
          
          <div className="flex flex-wrap gap-3">
            {[
              "Python", "JavaScript", "React", "Next.js", "Node.js", 
              "TensorFlow", "PyTorch", "Scikit-Learn", "Pandas", "NumPy",
              "AWS", "Docker", "Git", "CI/CD", "MongoDB", "PostgreSQL",
              "REST API", "GraphQL", "Tailwind CSS", "Jupyter"
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + (index * 0.02) }}
                className="px-4 py-2 bg-circuit-surface border border-circuit-primary/30 font-mono text-sm"
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 p-6 bg-circuit-surface border border-circuit-primary/30"
        >
          <h2 className="text-2xl font-mono font-bold text-circuit-primary mb-4">Continuous Learning</h2>
          <p className="mb-4">
            I believe in continuous improvement and regularly update my skills through online courses, workshops, and hands-on projects. Some recent learning achievements:
          </p>
          
          <ul className="space-y-2">
            {[
              "Machine Learning to Deep Learning: A Journery for Remote Sensing Data Collection by ISRO",
              "Back-End Engineering Virtual Experience by Lyft",
              "Advanced C++ Course by SkillUP",
              "Fundamentals of Digital Marketing by Google"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-circuit-primary mr-2">❯</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}