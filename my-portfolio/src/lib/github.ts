const GITHUB_USERNAME = 'arxel2468';

// GitHub GraphQL endpoint
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

// Query to get pinned repositories
const PINNED_REPOS_QUERY = `
  query {
    user(login: "${GITHUB_USERNAME}") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            repositoryTopics(first: 5) {
              nodes {
                topic {
                  name
                }
              }
            }
            primaryLanguage {
              name
              color
            }
            stargazerCount
          }
        }
      }
    }
  }
`;

export async function getPinnedRepos() {
  // If no GitHub token, return fallback data
  if (!process.env.GITHUB_TOKEN) {
    console.warn('GITHUB_TOKEN not set. Using fallback project data.');
    return getFallbackProjects();
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: PINNED_REPOS_QUERY }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    const pinnedItems = data.data?.user?.pinnedItems?.nodes || [];

    return pinnedItems.map((repo) => ({
      name: repo.name,
      description: repo.description || 'No description provided.',
      url: repo.url,
      liveUrl: repo.homepageUrl || null,
      topics: repo.repositoryTopics.nodes.map((t) => t.topic.name),
      language: repo.primaryLanguage?.name || null,
      languageColor: repo.primaryLanguage?.color || null,
      stars: repo.stargazerCount,
    }));
  } catch (error) {
    console.error('Failed to fetch pinned repos:', error);
    return getFallbackProjects();
  }
}

// Fallback data if GitHub API fails or token not set
function getFallbackProjects() {
  return [
    {
      name: 'voice-website-generator',
      description: 'Create websites with voice commands. Speak, and watch your site come to life.',
      url: 'https://github.com/arxel2468/voice-website-generator',
      liveUrl: null,
      topics: ['python', 'groq', 'fastapi', 'voice'],
      language: 'Python',
      languageColor: '#3572A5',
      stars: 0,
    },
    {
      name: 'food',
      description: 'AI-powered sentiment analysis for recipe ratings.',
      url: 'https://github.com/arxel2468/food',
      liveUrl: null,
      topics: ['python', 'nlp', 'sentiment-analysis'],
      language: 'Python',
      languageColor: '#3572A5',
      stars: 0,
    },
    {
      name: 'movies-recommender',
      description: 'Personalized movie recommendations using content-based filtering.',
      url: 'https://github.com/arxel2468/movies-recommender',
      liveUrl: null,
      topics: ['python', 'recommendation-system'],
      language: 'Python',
      languageColor: '#3572A5',
      stars: 0,
    },
    {
      name: 'automation-with-python',
      description: 'Collection of Python scripts for automating repetitive tasks.',
      url: 'https://github.com/arxel2468/automation-with-python',
      liveUrl: null,
      topics: ['python', 'automation'],
      language: 'Python',
      languageColor: '#3572A5',
      stars: 0,
    },
  ];
}
