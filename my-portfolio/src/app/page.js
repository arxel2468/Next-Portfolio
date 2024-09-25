import Image from 'next/image'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-700">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fadeIn">
            Welcome to My Portfolio!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            I am Amit Pandit, an AI/ML Freelancer and Full Stack Developer.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact" className="btn-secondary">Contact Me</a>
          </div>
        </div>
      </div>

      {/* Projects Section */}
        <section id="projects" className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">AI/ML Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
             <Image
              src="/food.png"
              alt="Automating Real-World Tasks with Python"
              width={600}
              height={400}
              className="mb-4 w-full h-48 object-cover rounded-lg"
            />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Food Recipes Rating System</h3>
              <p className="text-gray-700 dark:text-gray-300">A sentiment analysis-based system where users can post recipes and reviews. Recipes are rated based on user feedback to help others find the best ones. Built using Django and PostgreSQL.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <img src="/movie.png" alt="Movies Recommender" className="mb-4 w-full h-48 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Movies Recommender</h3>
              <p className="text-gray-700 dark:text-gray-300">
              A content-based movie recommender system that provides five recommendations based on the movie selected from a dropdown menu. Deployed using Streamlit.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <Image
              src="/automate.jpg"
              alt="Automating Real-World Tasks with Python"
              width={600}
              height={400}
              className="mb-4 w-full h-48 object-cover rounded-lg"
            />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Automating Real-World Tasks with Python</h3>
              <p className="text-gray-700 dark:text-gray-300">
              Real-world automation using Python. The project includes image modification using PIL, data serialization for communication between programs, and sending email messages. </p>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
<section id="contact" className="py-12 bg-gray-100 dark:bg-gray-900">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Contact Me</h2>
    <form action="https://formspree.io/f/xeojdynq" method="POST" className="max-w-lg mx-auto">
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          name="_replyto"
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <textarea
          name="message"
          placeholder="Your Message"
          required
          className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
        ></textarea>
      </div>
      <button
        type="submit"
        className="btn-primary w-full"
      >
        Send Message
      </button>
    </form>
  </div>
</section>

    </div>
  );
}
