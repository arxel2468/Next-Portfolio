const GITHUB_USERNAME = 'arxel2468';
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

// Enhanced project data with custom descriptions and metadata
const PROJECT_ENHANCEMENTS = {
  'voice-website-generator': {
    description: 'Voice-controlled website generator. Speak commands, get a deployed site instantly using Groq and Python.',
    featured: true,
    image: '/images/projects/voice-generator.png',
    color: '#3B82F6',
  },
  'food': {
    description: 'AI-powered sentiment analysis for recipe ratings. Extracts flavor profiles from thousands of reviews.',
    featured: false,
    image: '/images/projects/food-analysis.png',
    color: '#10B981',
  },
  'movies-recommender': {
    description: 'Content-based movie recommendation engine using cosine similarity on high-dimensional vectors.',
    featured: false,
    image: '/images/projects/movie-recommender.png',
    color: '#8B5CF6',
  },
  'automation-with-python': {
    description: 'Production-grade automation scripts for OS operations, image processing, and data pipelines.',
    featured: false,
    image: '/images/projects/automation.png',
    color: '#F59E0B',
  },
  'Next-Portfolio': {
    description: 'This portfolio. Built with Next.js 14, Geist font, and engineered for performance.',
    featured: false,
    image: '/images/projects/portfolio.png',
    color: '#EC4899',
  },
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
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error('GitHub API Error:', response.status);
      return getFallbackProjects();
    }

    const json = await response.json();

    if (json.errors) {
      console.error('GitHub GraphQL Errors:', json.errors);
      return getFallbackProjects();
    }

    const nodes = json.data?.user?.pinnedItems?.nodes;

    if (!nodes || nodes.length === 0) {
      return getFallbackProjects();
    }

    return nodes.map((repo) => {
      const enhancements = PROJECT_ENHANCEMENTS[repo.name] || {};

      return {
        name: formatRepoName(repo.name),
        slug: repo.name,
        description: enhancements.description || repo.description || 'A project built with care.',
        url: repo.url,
        liveUrl: repo.homepageUrl || null,
        stars: repo.stargazerCount || 0,
        forks: repo.forkCount || 0,
        language: repo.primaryLanguage?.name || 'Code',
        languageColor: repo.primaryLanguage?.color || '#666666',
        updatedAt: repo.pushedAt,
        topics: repo.repositoryTopics?.nodes?.map((t) => t.topic.name) || [],
        featured: enhancements.featured || false,
        image: enhancements.image || null,
        color: enhancements.color || repo.primaryLanguage?.color || '#666666',
      };
    });
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
  return Object.entries(PROJECT_ENHANCEMENTS).map(([slug, data]) => ({
    name: formatRepoName(slug),
    slug,
    description: data.description,
    url: `https://github.com/${GITHUB_USERNAME}/${slug}`,
    liveUrl: null,
    stars: 0,
    forks: 0,
    language: 'Python',
    languageColor: '#3572A5',
    updatedAt: new Date().toISOString(),
    topics: ['python', 'ai'],
    featured: data.featured,
    image: data.image,
    color: data.color,
  }));
}
