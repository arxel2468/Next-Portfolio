// src/components/NavBar.js
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-blue-500 shadow-md text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-3xl font-bold">
          <Link href="#hero" legacyBehavior>
            <a className="hover:text-indigo-300 transition-all">Amit Pandit</a>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {['Home', 'Work', 'Projects', 'Articles', 'Contact'].map((section) => (
            <motion.div
              key={section}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <Link href={section === 'Home' ? '#hero' : `#${section.toLowerCase()}`} legacyBehavior>
                <a className="text-lg font-semibold group-hover:text-indigo-300 transition-all">
                  {section}
                </a>
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-300 transition-all duration-300 group-hover:w-full"></span>
            </motion.div>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            className="text-3xl focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
  <div className="md:hidden bg-primary-dark px-6 py-8 space-y-6 text-center flex flex-col items-center rounded-lg shadow-lg">
    {['Home', 'Projects', 'Articles', 'Contact'].map((section) => (
      <Link href={section === 'Home' ? '#hero' : `#${section.toLowerCase()}`} key={section} legacyBehavior>
        <a
          className="text-xl font-semibold text-white hover:text-indigo-300 transition-all py-2"
          onClick={toggleMenu}
        >
          {section}
        </a>
      </Link>
    ))}
  </div>
)}
    </nav>
  );
}
