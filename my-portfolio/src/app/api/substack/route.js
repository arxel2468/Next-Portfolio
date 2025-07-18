// src/app/api/substack/route.js
import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['enclosure', 'content']
  }
});

export async function GET() {
  try {
    // Ensure the correct Substack feed URL is used
    const feed = await parser.parseURL('https://amitpandit.substack.com/feed/');
    
    // Extract image from content if enclosure is not available
    const articles = feed.items.map(item => {
      // Try to extract image from content if no enclosure
      let thumbnail = '/images/article-placeholder.jpg';
      
      if (item.enclosure && item.enclosure.url) {
        thumbnail = item.enclosure.url;
      } else if (item.content) {
        // Try to extract image from HTML content
        const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch && imgMatch[1]) {
          thumbnail = imgMatch[1];
        }
      }
      
      // Clean up description
      let description = item.contentSnippet || '';
      // Remove any HTML tags
      description = description.replace(/<[^>]*>?/gm, '');
      // Limit length
      description = description.length > 200 ? description.substring(0, 200) + '...' : description;
      
      return {
        title: item.title,
        link: item.link,
        description: description,
        thumbnail: thumbnail,
        pubDate: item.pubDate
      };
    });

    // Limit to 6 articles
    const limitedArticles = articles.slice(0, 4);

    // Add a small delay to simulate network latency (remove in production)
    // This helps ensure the loading state is visible
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ items: limitedArticles });
  } catch (error) {
    console.error("Error fetching Substack feed:", error);
    return NextResponse.json(
      { error: 'Failed to fetch Substack feed' },
      { status: 500 }
    );
  }
}