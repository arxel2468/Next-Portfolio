// src/components/App.jsx
'use client';
import Cursor from './Cursor';
import Nav from './Nav';
import Hero from './sections/Hero';
import StealStreet from './sections/StealStreet';
import Projects from './sections/Projects';
import Writing from './sections/Writing';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Grain from './ui/Grain';

export default function App({ substackPosts = [] }) {
  return (
    <>
      <Grain />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <StealStreet />
        <Projects />
        <Writing posts={substackPosts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}