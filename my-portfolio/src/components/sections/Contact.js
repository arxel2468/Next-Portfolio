"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '../ui/BackButton';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';

export default function Contact({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace 'YOUR_FORMSPREE_ENDPOINT' with your actual Formspree form ID
      const response = await fetch('https://formspree.io/f/xeojdynq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };
  
  return (
    <div className="min-h-screen bg-circuit-bg p-6 md:p-12 section-container">
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
            <div className="bg-circuit-surface border border-circuit-primary/30 p-6 relative">
              <h2 className="text-2xl font-mono font-bold text-circuit-primary mb-6">Send Message</h2>
              
              {/* Status Notification */}
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute top-6 right-6 p-3 font-mono text-sm border ${
                      submitStatus === 'success' 
                        ? 'border-green-500 bg-green-500/10 text-green-500' 
                        : 'border-red-500 bg-red-500/10 text-red-500'
                    }`}
                  >
                    <div className="flex items-center">
                      {submitStatus === 'success' ? (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>message.sent = true;</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span>error.occurred = true;</span>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
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
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 font-mono transition-colors relative overflow-hidden ${
                    isSubmitting 
                      ? 'bg-circuit-primary/50 text-circuit-bg/50 cursor-not-allowed' 
                      : 'bg-circuit-primary text-circuit-bg hover:bg-circuit-primary/80'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-circuit-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      processing...
                    </div>
                  ) : (
                    'sendMessage();'
                  )}
                </button>
                
                {/* Success message that appears after form submission */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 border border-circuit-primary/30 bg-circuit-primary/10"
                    >
                      <div className="font-mono">
                        <div className="text-circuit-primary mb-2">{"// Message sent successfully"}</div>
                        <div className="text-circuit-text">
                        <span className="text-circuit-primary">console.log</span>
                          (<span className="text-green-400">"Thank you for reaching out! I'll get back to you as soon as possible."</span>);
                        </div>
                        <div className="mt-2 text-circuit-text">
                          <span className="text-circuit-primary">return</span> {'{'}
                          <br />
                          &nbsp;&nbsp;<span className="text-circuit-primary">status</span>: <span className="text-green-400">"success"</span>,
                          <br />
                          &nbsp;&nbsp;<span className="text-circuit-primary">message</span>: <span className="text-green-400">"Message delivered to Amit's inbox"</span>
                          <br />
                          {'}'};
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 border border-red-500/30 bg-red-500/10"
                    >
                      <div className="font-mono">
                        <div className="text-red-500 mb-2">{"// Error sending message"}</div>
                        <div className="text-circuit-text">
                          <span className="text-red-500">console.error</span>
                          (<span className="text-red-400">"There was a problem sending your message. Please try again or contact me directly via email."</span>);
                        </div>
                        <div className="mt-2 text-circuit-text">
                          <span className="text-red-500">throw new Error</span>(<span className="text-red-400">"Message delivery failed"</span>);
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}