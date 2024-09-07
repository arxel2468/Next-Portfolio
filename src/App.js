import React from'react';
import './App.css';
import Projects from './Projects';
import Writing from './Writing';
import Sketching from './Sketching';
import About from './About';
import Contact from './Contact';

function App() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#writing">Writing</a></li>
            <li><a href="#sketching">Sketching</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <Projects />
        <Writing />
        <Sketching />
        <About />
        <Contact />
      </main>
      <footer>
        <p>&copy; 2023 Arxel</p>
        <p>This website was built with React and hosted on GitHub Pages.</p>
      </footer>
    </div>
  );
}

export default App;