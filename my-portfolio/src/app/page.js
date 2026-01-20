import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Work from '@/components/sections/Work';
import Projects from '@/components/sections/Projects';
import Process from '@/components/sections/Process';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <Projects />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
