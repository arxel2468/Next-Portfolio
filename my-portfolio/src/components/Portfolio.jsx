"use client";

import { useState, useEffect } from 'react';
import { m, AnimatePresence, useScroll } from 'framer-motion';
import { IconArrowUp } from '@tabler/icons-react';
import Navbar from './Navbar';
import Loader from './Loader';
import SectionHero from './sections/SectionHero';
import SectionMarquee from './sections/SectionMarquee';
import SectionCase from './sections/SectionCase';
import SectionProjects from './sections/SectionProjects';
import SectionAbout from './sections/SectionAbout';
import SectionContact from './sections/SectionContact';
import Footer from './Footer';

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > window.innerHeight * 1.5);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* Loader */}
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Progress line */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        className="fixed top-0 left-0 right-0 h-px z-[201]"
      >
        <m.div
          className="h-full origin-left"
          style={{
            scaleX: scrollYProgress,
            background: 'linear-gradient(90deg, hsl(var(--accent)), hsl(30, 100%, 65%))',
          }}
        />
      </m.div>

      {/* Nav */}
      <Navbar loading={loading} />

      {/* Content */}
      <m.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <SectionHero />
        <SectionMarquee />
        <SectionCase />
        <SectionProjects />
        <SectionAbout />
        <SectionContact />
        <Footer />
      </m.main>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <m.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-[100] w-11 h-11 rounded-full flex items-center justify-center border border-border/50 bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-accent hover:border-accent/50 transition-all shadow-lg"
            aria-label="Back to top"
          >
            <IconArrowUp size={16} />
          </m.button>
        )}
      </AnimatePresence>
    </>
  );
}
