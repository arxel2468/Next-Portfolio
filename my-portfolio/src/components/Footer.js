import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0A2540] to-[#1A2B6B] text-gray-200 py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold">Connect with Me</h2>
            <p className="text-sm">Feel free to reach out through any of the platforms below:</p>
            <div className="flex space-x-4 text-blue-400">
              <a href="https://github.com/arxel2468" className="hover:text-blue-300">
                <FaGithub size={28} />
              </a>
              <a href="https://linkedin.com/in/amitpandit2468" className="hover:text-blue-300">
                <FaLinkedin size={28} />
              </a>
              <a href="https://twitter.com/amitpandit2468" className="hover:text-blue-300">
                <FaTwitter size={28} />
              </a>
              <a href="https://substack.com/amitpandit" className="hover:text-blue-300">
                <SiSubstack size={28} />
              </a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h2 className="text-lg font-semibold mb-4">© 2024 Amit Pandit</h2>
            <p className="text-sm">AI/ML Freelancer & Full Stack Developer</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
