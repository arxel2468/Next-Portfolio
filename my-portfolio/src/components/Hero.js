import Image from 'next/image';
import heroIllustration from '../../public/images/undraw_under_construction_-46-pa.svg';

export default function Hero() {
  return (
    <section id="hero" className="flex min-h-screen bg-gradient-to-r from-blue-200 to-cyan-400 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      {/* Left Side */}
      <div className="flex-1 flex flex-col justify-center p-10 space-y-6 animate-slideInLeft">
        <h1 className="text-6xl font-bold text-primary-dark dark:text-white">
          Hey, I&apos;m Amit Pandit
        </h1>
        <p className="text-2xl font-light text-primary-light dark:text-gray-400">
          AI Enthusiast & Full Stack Developer.
        </p>
        <p className="text-xl font-medium text-gray-800 dark:text-gray-300">
          Crafting smart solutions with AI/ML, building user-friendly web apps, and automating tasks.
        </p>
        <div className="flex space-x-4 mt-6">
            <a href="#work" className="btn-primary animate-bounce">Explore Work</a>
            <a href="#contact" className="btn-secondary">Let&apos;s Collaborate</a>
        </div>
      </div>
      
      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-10 animate-fadeIn">
        <Image
          src={heroIllustration}
          alt="Creative Hero Illustration"
          width={500}
          height={500}
          className="rounded-xl drop-shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        />
      </div>
    </section>
  );
}
