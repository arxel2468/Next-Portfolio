import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/xeojdynq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <section id="contact" ref={ref} className="py-20 bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <svg className="absolute top-0 right-0 w-80 h-80 text-purple-500/10 dark:text-purple-400/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M46.5,-78.3C59.1,-70.9,67.9,-57.2,74.1,-42.7C80.4,-28.2,84.1,-14.1,83.7,-0.2C83.3,13.6,78.7,27.3,71,39.1C63.2,51,52.3,61.1,39.7,67.7C27.1,74.2,13.6,77.3,-0.3,77.8C-14.1,78.3,-28.2,76.2,-40.9,69.9C-53.7,63.6,-65,53,-72.9,39.9C-80.7,26.7,-85.1,13.4,-83.9,0.7C-82.7,-12,-76,-24,-68.8,-36.2C-61.7,-48.3,-54.1,-60.6,-42.9,-68.6C-31.7,-76.7,-15.8,-80.6,0.3,-81.1C16.4,-81.6,33.9,-78.8,46.5,-78.3Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute bottom-0 left-0 w-80 h-80 text-pink-500/10 dark:text-pink-400/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M39.9,-68.1C52.6,-62.1,64.5,-53.1,72.7,-40.9C80.9,-28.7,85.5,-14.4,85.2,-0.2C84.9,14,79.8,27.9,71.7,39.7C63.7,51.4,52.8,61,40.3,67.7C27.8,74.4,13.9,78.3,-0.5,79.2C-15,80.1,-30,78.1,-43.4,71.9C-56.8,65.7,-68.7,55.4,-77.4,42.1C-86.1,28.8,-91.6,14.4,-91.9,-0.2C-92.2,-14.7,-87.2,-29.5,-78.5,-41.5C-69.8,-53.5,-57.4,-62.8,-44,-68.5C-30.6,-74.2,-15.3,-76.3,-0.5,-75.5C14.4,-74.7,28.7,-71,39.9,-68.1Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              
              <ul className="space-y-6">
                {[
                  { icon: <FaEnvelope className="w-5 h-5" />, label: "Email", value: "1amitpandit2468@gmail.com", href: "mailto:1amitpandit2468@gmail.com" },
                  { icon: <FaPhone className="w-5 h-5" />, label: "Phone", value: "+91 90828 81290", href: "tel:+919082881290" },
                  { icon: <FaLinkedin className="w-5 h-5" />, label: "LinkedIn", value: "amitpandit2468", href: "https://www.linkedin.com/in/amitpandit2468" },
                  { icon: <FaGithub className="w-5 h-5" />, label: "GitHub", value: "arxel2468", href: "https://github.com/arxel2468" },
                  { icon: <FaTwitter className="w-5 h-5" />, label: "Twitter", value: "@amitpandit2468", href: "https://twitter.com/amitpandit2468" },
                  { icon: <SiSubstack className="w-5 h-5" />, label: "Substack", value: "amitpandit", href: "https://amitpandit.substack.com" }
                ].map((contact, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                      {contact.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{contact.label}</p>
                      <a 
                        href={contact.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-xl text-white"
            >
              <h3 className="text-xl font-bold mb-4">Let's Build Something Amazing Together</h3>
              <p className="opacity-90">
                Whether you need a custom AI solution, a responsive web application, or automation for your business processes, I'm here to help turn your ideas into reality.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>
            
            {submitStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-4 rounded-lg mb-6"
              >
                <p className="font-medium">Thank you for your message!</p>
                <p className="text-sm mt-1">I'll get back to you as soon as possible.</p>
              </motion.div>
            ) : submitStatus === 'error' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg mb-6"
              >
                <p className="font-medium">Oops! Something went wrong.</p>
                <p className="text-sm mt-1">Please try again or contact me directly via email.</p>
              </motion.div>
            ) : null}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white"
                  placeholder="Hello, I'd like to talk about..."
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 px-6 rounded-lg text-white font-medium shadow-lg ${
                  isSubmitting 
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                } transition-all duration-300`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
