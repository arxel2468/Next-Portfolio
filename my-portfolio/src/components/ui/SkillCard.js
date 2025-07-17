"use client";
import { motion } from 'framer-motion';

export default function SkillCard({ category }) {
  return (
    <div className="bg-circuit-surface border border-circuit-primary/30 p-6">
      <h3 className="text-xl font-mono font-bold text-circuit-primary mb-6">
        {category.name}
      </h3>
      
      <div className="space-y-4">
        {category.skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="font-mono">{skill.name}</span>
              <span className="font-mono text-xs text-circuit-primary">{skill.level}%</span>
            </div>
            <div className="h-2 bg-circuit-bg rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-circuit-primary"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}