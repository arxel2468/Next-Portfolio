import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';
export default function Contact() {


  return (
    <section id="contact" className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Let&apos;s Connect</h2>
          <p className="text-lg mt-4">Feel free to reach out for collaboration, questions, or just a friendly chat!</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Contact Information */}
          <div className="space-y-8">
            <ul className="space-y-4 text-lg">
              <li className="flex items-center space-x-4">
                <FaEnvelope className="text-2xl" />
                <a href="mailto:1amitpandit2468@gmail.com" className="hover:text-gray-300 transition-colors">1amitpandit2468@gmail.com</a>
              </li>
              <li className="flex items-center space-x-4">
                <FaPhone className="text-2xl" />
                <a href="tel:+919082881290" className="hover:text-gray-300 transition-colors">+91 90828 81290</a>
              </li>
              <li className="flex items-center space-x-4">
                <FaLinkedin className="text-2xl" />
                <a href="https://www.linkedin.com/in/amitpandit2468" className="hover:text-gray-300 transition-colors">LinkedIn</a>
              </li>
              <li className="flex items-center space-x-4">
                <FaGithub className="text-2xl" />
                <a href="https://www.github.com/arxel2468" className="hover:text-gray-300 transition-colors">GitHub</a>
              </li>
              <li className="flex items-center space-x-4">
                <FaTwitter className="text-2xl" />
                <a href="https://www.x.com/amitpandit2468" className="hover:text-gray-300 transition-colors">Twitter</a>
              </li>
              <li className="flex items-center space-x-4">
                <SiSubstack className="text-2xl" />
                <a href="https://www.substack.com/@amitpandit" className="hover:text-gray-300 transition-colors">Substack</a>
              </li>
            </ul>
          </div>
          {/* Right side - Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Send a Message</h3>
            <form action="https://formspree.io/f/xeojdynq" method="POST" className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="_replyto"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600  text-gray-800"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600  text-gray-800" 
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
