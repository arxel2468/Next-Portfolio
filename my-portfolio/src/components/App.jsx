// src/components/App.jsx
'use client';
import Cursor   from './Cursor';
import Nav      from './Nav';
import Opening  from './sections/Opening';
import Work     from './sections/Work';
import Index    from './sections/Index';
import Archive  from './sections/Archive';
import Contact  from './sections/Contact';
import Footer   from './sections/Footer';
import Grain    from './ui/Grain';

export default function App({ substackPosts = [] }) {
  return (
    <>
      <Grain />
      <Cursor />
      <Nav />
      <main>
        <Opening />
        <Work />
        <Index />
        <Archive posts={substackPosts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}