// src/app/components/layout/Footer.js
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-magazine-ink text-white py-12">
      <div className="magazine-grid">
      <div className="col-start-2 col-end-14 md:col-start-4 md:col-end-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2 space-y-4">
            <Link href="#top" className="text-2xl font-serif font-bold">
              <span className="text-magazine-accent">A.</span>Pandit
            </Link>
            <p className="text-gray-400 max-w-md">
              AI Engineer & Full Stack Developer specializing in intelligent solutions and user-friendly applications.
            </p>
            <div className="flex space-x-4 pt-4">
              {[
                { icon: <FaGithub className="w-5 h-5" />, url: "https://github.com/arxel2468", label: "GitHub" },
                { icon: <FaLinkedin className="w-5 h-5" />, url: "https://www.linkedin.com/in/amitpandit2468", label: "LinkedIn" },
                { icon: <FaTwitter className="w-5 h-5" />, url: "https://twitter.com/amitpandit2468", label: "Twitter" },
                { icon: <SiSubstack className="w-5 h-5" />, url: "https://amitpandit.substack.com", label: "Substack" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-magazine-accent transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '#projects' },
                { name: 'Experience', href: '#experience' },
                { name: 'Contact', href: '#contact' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-magazine-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>1amitpandit2468@gmail.com</li>
              <li>+91 90828 81290</li>
              <li>Mumbai, India</li>
            </ul>
          </div>
        </div>
        
        <div className="col-start-2 col-end-14 md:col-start-4 md:col-end-12 border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Amit Pandit. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            Designed & Built with ❤️ using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}