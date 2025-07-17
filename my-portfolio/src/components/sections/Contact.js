"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import BackButton from '../ui/BackButton';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';

export default function Contact({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
  };
  
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
            Contact
            <span className="text-circuit-text">/&gt;</span>
          </h1>
          
          <div className="h-1 w-24 bg-circuit-primary mb-8"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-mono font-bold text-circuit-primary mb-6">Get In Touch</h2>
            
            <p className="text-lg mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-circuit-surface border border-circuit-primary/30 mr-4">
                  <svg className="w-5 h-5 text-circuit-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-mono text-circuit-primary">Email</h3>
                  <a href="mailto:1amitpandit2468@gmail.com" className="text-circuit-text hover:text-circuit-primary transition-colors">
                    1amitpandit2468@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-circuit-surface border border-circuit-primary/30 mr-4">
                  <svg className="w-5 h-5 text-circuit-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-mono text-circuit-primary">Phone</h3>
                  <a href="tel:+919082881290" className="text-circuit-text hover:text-circuit-primary transition-colors">
                    +91 90828 81290
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-circuit-surface border border-circuit-primary/30 mr-4">
                  <svg className="w-5 h-5 text-circuit-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-mono text-circuit-primary">Location</h3>
                  <p>Mumbai, India</p>
                </div>
              </div>
            </div>
            
            <h3 className="font-mono text-circuit-primary mb-4">Connect With Me</h3>
            <div className="flex space-x-4">
              {[
                { icon: <FaGithub className="w-5 h-5" />, url: "https://github.com/arxel2468", label: "GitHub" },
                { icon: <FaLinkedin className="w-5 h-5" />, url: "https://www.linkedin.com/in/amitpandit2468", label: "LinkedIn" },
                { icon: <FaTwitter className="w-5 h-5" />, url: "https://twitter.com/amitpandit2468", label: "Twitter" },
                { icon: <SiSubstack className="w-5 h-5" />, url: "https://amitpandit.substack.com", label: "Substack" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-circuit-surface border border-circuit-primary/30 text-circuit-primary hover:bg-circuit-primary hover:text-circuit-bg transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-circuit-surface border border-circuit-primary/30 p-6">
              <h2 className="text-2xl font-mono font-bold text-circuit-primary mb-6">Send Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-mono text-sm">
                    <span className="text-circuit-primary">const</span> name = 
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-circuit-bg border border-circuit-primary/30 focus:border-circuit-primary focus:outline-none font-mono"
                    placeholder='"Your Name"'
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-mono text-sm">
                    <span className="text-circuit-primary">const</span> email = 
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-circuit-bg border border-circuit-primary/30 focus:border-circuit-primary focus:outline-none font-mono"
                    placeholder='"your.email@example.com"'
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-mono text-sm">
                    <span className="text-circuit-primary">const</span> message = 
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full p-3 bg-circuit-bg border border-circuit-primary/30 focus:border-circuit-primary focus:outline-none font-mono"
                    placeholder='"Your message here..."'
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-circuit-primary text-circuit-bg font-mono hover:bg-circuit-primary/80 transition-colors"
                >
                  sendMessage();
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}