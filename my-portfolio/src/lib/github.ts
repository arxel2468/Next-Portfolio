const GITHUB_USERNAME = 'arxel2468';
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

// Fallback descriptions for repos that might not have descriptions on GitHub
const FALLBACK_DESCRIPTIONS = {
  'voice-website-generator': 'Voice-controlled website generator. Speak commands, get a deployed site instantly using Groq and Python.',
  'food': 'AI-powered sentiment analysis for recipe ratings. Extracts flavor profiles from thousands of reviews.',
  'movies-recommender': 'Content-based movie recommendation engine using cosine similarity on high-dimensional vectors.',
  'automation-with-python': 'Production-grade automation scripts for OS operations, image processing, and data pipelines.',
  'Next-Portfolio': 'This portfolio. Built with Next.js 14, engineered for performance and clarity.',
};

const PINNED_REPOS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            pushedAt
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            repositoryTopics(first: 6) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getPinnedRepos() {
  // Check for GitHub token
  if (!process.env.GITHUB_TOKEN) {
    console.warn('GITHUB_TOKEN not found. Using fallback data.');
    return getFallbackProjects();
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-App',
      },
      body: JSON.stringify({
        query: PINNED_REPOS_QUERY,
        variables: { username: GITHUB_USERNAME },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('GitHub API HTTP Error:', response.status);
      return getFallbackProjects();
    }

    const json = await response.json();

    if (json.errors) {
      console.error('GitHub GraphQL Errors:', json.errors);
      return getFallbackProjects();
    }

    const nodes = json.data?.user?.pinnedItems?.nodes;

    if (!nodes || nodes.length === 0) {
      console.warn('No pinned repos found. Using fallback data.');
      return getFallbackProjects();
    }

    return nodes.map((repo) => ({
      name: formatRepoName(repo.name),
      slug: repo.name,
      description: repo.description || FALLBACK_DESCRIPTIONS[repo.name] || 'A project built with care.',
      url: repo.url,
      liveUrl: repo.homepageUrl || null,
      stars: repo.stargazerCount || 0,
      forks: repo.forkCount || 0,
      language: repo.primaryLanguage?.name || 'Code',
      languageColor: repo.primaryLanguage?.color || '#666666',
      updatedAt: repo.pushedAt,
      topics: repo.repositoryTopics?.nodes?.map((t) => t.topic.name) || [],
    }));
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    return getFallbackProjects();
  }
}

function formatRepoName(name) {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getFallbackProjects() {
  const fallbackRepos = [
    {
      name: 'Voice Website Generator',
      slug: 'voice-website-generator',
      description: FALLBACK_DESCRIPTIONS['voice-website-generator'],
      url: `https://github.com/${GITHUB_USERNAME}/voice-website-generator`,
      liveUrl: null,
      stars: 0,
      forks: 0,
      language: 'Python',
      languageColor: '#3572A5',
      updatedAt: new Date().toISOString(),
      topics: ['python', 'groq', 'voice', 'ai'],
    },
    {
      name: 'Food Sentiment Analysis',
      slug: 'food',
      description: FALLBACK_DESCRIPTIONS['food'],
      url: `https://github.com/${GITHUB_USERNAME}/food`,
      liveUrl: null,
      stars: 0,
      forks: 0,
      language: 'Python',
      languageColor: '#3572A5',
      updatedAt: new Date().toISOString(),
      topics: ['python', 'nlp', 'sentiment-analysis'],
    },
    {
      name: 'Movies Recommender',
      slug: 'movies-recommender',
      description: FALLBACK_DESCRIPTIONS['movies-recommender'],
      url: `https://github.com/${GITHUB_USERNAME}/movies-recommender`,
      liveUrl: null,
      stars: 0,
      forks: 0,
      language: 'Python',
      languageColor: '#3572A5',
      updatedAt: new Date().toISOString(),
      topics: ['python', 'recommendation-system'],
    },
    {
      name: 'Automation With Python',
      slug: 'automation-with-python',
      description: FALLBACK_DESCRIPTIONS['automation-with-python'],
      url: `https://github.com/${GITHUB_USERNAME}/automation-with-python`,
      liveUrl: null,
      stars: 0,
      forks: 0,
      language: 'Python',
      languageColor: '#3572A5',
      updatedAt: new Date().toISOString(),
      topics: ['python', 'automation'],
    },
  ];

  return fallbackRepos;
}
