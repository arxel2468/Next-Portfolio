// src/app/components/ui/PullQuote.js
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function PullQuote({ children, className = '' }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <motion.blockquote 
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className={`pull-quote ${className}`}
    >
      {children}
    </motion.blockquote>
  );
}