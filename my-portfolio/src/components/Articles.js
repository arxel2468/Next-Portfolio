"use client";

import Image from 'next/image';

export default function Articles() {
  return (
    <section id="articles" className="py-16 bg-indigo-100 text-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Latest Substack Articles</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Article 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <Image
              src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9df33da4-1618-4fa4-99f7-4091c826b2f8_1024x629.webp"
              alt="Refining Thoughts into Actions"
              width={600}
              height={400}
              className="mb-4 w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-2">Refining Thoughts into Actions</h3>
            <p className="text-gray-700 dark:text-gray-300">
              The Art of Writing and Self-Reflection
            </p>
            <a href="https://open.substack.com/pub/amitpandit/p/embrace-the-storm-why-facing-problems" 
              className="text-blue-500 hover:underline mt-4 inline-block"
              target="_blank" 
              rel="noopener noreferrer">
              Read More
            </a>
          </div>
          {/* Article 2*/}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <Image
              src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8e0fa3eb-c25c-473f-8b9e-87b71bae89e3_1024x536.jpeg"
              alt="Embrace the Storm: Why Facing Problems is the Key to Personal Growth"
              width={600}
              height={400}
              className="mb-4 w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-2">Embrace the Storm: Why Facing Problems is the Key to Personal Growth</h3>
            <p className="text-gray-700 dark:text-gray-300">How Embracing Challenges Can Transform Your Mindset and Strengthen Resilience
            </p>
            <a href="https://open.substack.com/pub/amitpandit/p/embrace-the-storm-why-facing-problems" 
              className="text-blue-500 hover:underline mt-4 inline-block"
              target="_blank" 
              rel="noopener noreferrer">
              Read More
            </a>
          </div>
          {/* Article 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <Image
              src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F610aac14-61e3-4a25-b16a-a9389d3cf204_1024x768.jpeg"
              alt="Train Your Brain: How to Build a Mental Gym for Mental Health Mastery"
              width={600}
              height={400}
              className="mb-4 w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-2">Train Your Brain: How to Build a Mental Gym for Mental Health Mastery</h3>
            <p className="text-gray-700 dark:text-gray-300">Master the Tools of Mental Health with a Simple, Actionable Daily Routine
            </p>
            <a href="https://open.substack.com/pub/amitpandit/p/train-your-brain-how-to-build-a-mental" 
              className="text-blue-500 hover:underline mt-4 inline-block"
              target="_blank" 
              rel="noopener noreferrer">
              Read More
            </a>
          </div>
          {/* You can add more articles in the same way */}
        </div>
      </div>
    </section>
  );
}
