import Image from 'next/image';
import heroIllustration from '../../public/images/undraw_under_construction_-46-pa.svg'

export default function Hero() {
  return (
    <section className="flex min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 text-gray-900 dark:text-gray-100">
      {/* Left Side */}
      <div className="flex-1 flex flex-col justify-center p-10 animate-slideInLeft">
        <h1 className="text-6xl font-bold mb-4 text-primary-dark dark:text-white">
          Hi, I'm Amit Pandit
        </h1>
        <p className="text-2xl font-light mb-6 text-primary-light dark:text-gray-400">
          AI/ML Freelancer & Full Stack Developer
        </p>
        <div className="flex space-x-4">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact" className="btn-secondary">Get in touch</a>
        </div>
      </div>
      
      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-10 animate-fadeIn">
        {/* Placeholder for image/illustration */}
        <Image
          src={heroIllustration}
          alt="Hero Illustration"
          width={500}
          height={500}
          className="rounded-xl "
        />
      </div>
    </section>
  );
}
