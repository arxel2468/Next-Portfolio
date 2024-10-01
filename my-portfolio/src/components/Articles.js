"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch the Substack RSS feed and parse it
    fetch('/api/substack')
      .then((res) => res.json())
      .then((data) => setArticles(data.items.slice(0, 3))) // Top 3 articles
      .catch((err) => console.error("Error fetching Substack articles", err));
  }, []);

  return (
    <section id="articles" className="py-16 bg-indigo-100 text-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Latest Substack Articles</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <Image
                src={article.thumbnail} // Assuming article has a thumbnail
                alt={article.title}
                width={600}
                height={400}
                className="mb-4 w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{article.description}</p>
              <a href={article.link} className="text-blue-500 hover:underline mt-4 inline-block" target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
