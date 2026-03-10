import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import WorkCinematic from '@/components/sections/WorkCinematic';
import Projects from '@/components/sections/Projects';
import Process from '@/components/sections/Process';
import Contact from '@/components/sections/Contact';
import { CustomCursorWrapper } from '@/components/ui/CustomCursorWrapper';
import { SourceDrawerWrapper } from '@/components/ui/SourceDrawerWrapper';

export default function Home() {
  return (
    <>
      <CustomCursorWrapper />
      <SourceDrawerWrapper />
      <Header />
      <main>
        <Hero />
        <WorkCinematic />
        <Projects />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
