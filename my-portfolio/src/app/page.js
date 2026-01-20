import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Applied from '@/components/sections/Applied';
import TechStack from '@/components/sections/TechStack';
import Contact from '@/components/sections/Contact';
import { getPinnedRepos } from '@/lib/github';

export default async function Home() {
  const pinnedRepos = await getPinnedRepos();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TechStack />
        <Projects repos={pinnedRepos} />
        <Applied />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
