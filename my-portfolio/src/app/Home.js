import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Contact from '../components/sections/Contact';
import Projects from '../components/sections/Projects';
import Articles from '../components/sections/Articles';
import Work from '../components/sections/Work';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Hero />
      <Work />
      <Projects />
      <Articles />
      <Contact />
      <Footer /> 
    </div>
  );
}
