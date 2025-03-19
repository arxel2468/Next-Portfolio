import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Contact from '../components/Contact';
import Projects from '../components/Projects';
import Articles from '../components/Articles';
import Work from '../components/Work';
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
