import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Applied from '@/components/sections/Applied';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import { getPinnedRepos } from '@/lib/github';

export default async function Home() {
  const pinnedRepos = await getPinnedRepos();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects repos={pinnedRepos} />
        <Applied />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
