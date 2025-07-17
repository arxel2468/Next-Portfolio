"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CircuitNotification() {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    // Initial welcome notification
    setTimeout(() => {
      addNotification({
        title: 'System Online',
        message: 'Welcome to Amit Pandit\'s portfolio interface',
        type: 'info'
      });
    }, 1000);
    
    // Random system notifications
    const messages = [
      { title: 'Connection Secure', message: 'Encrypted channel established', type: 'success' },
      { title: 'Memory Optimized', message: 'System resources allocated efficiently', type: 'info' },
      { title: 'New Project Available', message: 'Check the Projects node for updates', type: 'info' },
      { title: 'System Update', message: 'Portfolio interface v1.0.1 installed', type: 'success' },
      { title: 'Network Activity', message: 'Data transfer in progress', type: 'info' }
    ];
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        addNotification(randomMessage);
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { ...notification, id }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };
  
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  return (
    <div className="fixed bottom-20 right-6 z-50 space-y-2 w-72">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className={`p-4 border font-mono text-sm ${
              notification.type === 'success' 
                ? 'bg-green-900/20 border-green-500 text-green-400' 
                : notification.type === 'error'
                ? 'bg-red-900/20 border-red-500 text-red-400'
                : 'bg-circuit-surface border-circuit-primary/30 text-circuit-primary'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold mb-1">{notification.title}</div>
                <div className="opacity-80">{notification.message}</div>
              </div>
              <button 
                onClick={() => removeNotification(notification.id)}
                className="text-circuit-text/60 hover:text-circuit-primary"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}