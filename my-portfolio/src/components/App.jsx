'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IconBriefcase, IconCode, IconUser, IconMail, IconBrandGithub } from '@tabler/icons-react';
import Noise from './ui/Noise';
import ClickSpark from './ui/ClickSpark';
import Dock from './ui/Dock';
import Loader from './Loader';
import Hero from './sections/Hero';
import Ticker from './sections/Ticker';
import CaseStudy from './sections/CaseStudy';
import Projects from './sections/Projects';
import About from './sections/About';
import Contact from './sections/Contact';

const scrollTo = id => {
  const el = document.getElementById(id);
  if (el && window.lenis) window.lenis.scrollTo(el, { offset: -60, duration: 1.2 });
  else if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const DOCK_ITEMS = [
  { icon: <IconBriefcase size={18} />, label: 'Work', onClick: () => scrollTo('work') },
  { icon: <IconCode size={18} />, label: 'Projects', onClick: () => scrollTo('projects') },
  { icon: <IconUser size={18} />, label: 'About', onClick: () => scrollTo('about') },
  { icon: <IconMail size={18} />, label: 'Contact', onClick: () => scrollTo('contact') },
  { icon: <IconBrandGithub size={18} />, label: 'GitHub', onClick: () => window.open('https://github.com/arxel2468', '_blank') },
];

export default function App() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Noise patternAlpha={12} patternRefreshInterval={3} />
      <AnimatePresence mode="wait">
        {!loaded && <Loader key="loader" onComplete={() => setLoaded(true)} />}
      </AnimatePresence>
      {loaded && (
        <ClickSpark sparkColor="rgba(100,255,218,0.6)" sparkRadius={20} sparkCount={10} duration={500}>
          <Hero />
          <Ticker />
          <CaseStudy />
          <Projects />
          <About />
          <Contact />
          <footer className="py-8 text-center border-t border-white/[0.04]">
            <p className="font-mono text-[11px]" style={{ color: 'var(--text-3)' }}>
              Designed & Built by Amit Pandit · {new Date().getFullYear()}
            </p>
          </footer>
          <Dock items={DOCK_ITEMS} panelHeight={64} baseItemSize={44} magnification={64} distance={150} />
          <div className="h-20" />
        </ClickSpark>
      )}
    </>
  );
}
