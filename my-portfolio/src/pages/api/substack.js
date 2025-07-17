// src/pages/api/substack.js
import Parser from 'rss-parser';

const parser = new Parser();

export default async function handler(req, res) {
  try {
    // Ensure the correct Substack feed URL is used
    const feed = await parser.parseURL('https://amitpandit.substack.com/feed/'); // Change to your RSS URL
    
    // Create a more structured JSON response with necessary fields
    const articles = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      description: item.contentSnippet,
      thumbnail: item.enclosure ? item.enclosure.url : '/images/article-placeholder.jpg', // Check if there's an image
      pubDate: item.pubDate
    }));

    res.status(200).json({ items: articles });
  } catch (error) {
    console.error("Error fetching Substack feed:", error);
    res.status(500).json({ error: 'Failed to fetch Substack feed' });
  }
}