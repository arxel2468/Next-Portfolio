import Shell from '@/components/Shell';
import Hero from '@/components/sections/Hero';
import Work from '@/components/sections/Work';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <Shell>
      <Hero />
      <Work />
      <Projects />
      <About />
      <Contact />
    </Shell>
  );
}
