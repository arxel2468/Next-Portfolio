export const projects = [
  {
    id: 'interviewgym',
    title: 'InterviewGym',
    tagline: 'Fail safely, not expensively.',
    description:
      'AI-powered interview practice platform with real-time voice conversations. The AI interviewer speaks, listens, and challenges you like the real thing.',
    problem:
      "Students can't afford to fail real interviews — most don't even get to the interview stage.",
    solution:
      'Groq LLM → WebSocket voice pipeline → Next.js 14 App Router with Prisma ORM on Supabase PostgreSQL. Server Actions handle session state.',
    tech: ['Next.js 14', 'TypeScript', 'Groq', 'Prisma', 'PostgreSQL', 'Supabase'],
    image: '/images/interviewgym.png',
    github: 'https://github.com/arxel2468/interviewgym',
    live: 'https://theinterviewgym.vercel.app',
    featured: true,
    color: '#6366F1',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'yoursaas',
    title: 'YourSaaS',
    tagline: 'Enterprise multi-tenant architecture.',
    description:
      'Production-ready SaaS boilerplate with isolated workspaces, role-based access control, magic link invitations, and integrated payments.',
    problem: 'Building multi-tenant systems from scratch takes months of work.',
    solution:
      'Clerk auth → Prisma schema with tenant isolation → Razorpay webhooks for billing → Next.js 15 middleware for workspace routing.',
    tech: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL', 'Razorpay', 'Clerk'],
    image: '/images/yoursaas.png',
    github: 'https://github.com/arxel2468/multi-tenant-saas',
    live: 'https://multi-tenant-saas-phi-indol.vercel.app',
    featured: false,
    color: '#7C3AED',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    id: 'peakfood',
    title: 'Peak Food',
    tagline: 'Find recipes that actually work.',
    description:
      'Recipe platform with AI-powered sentiment analysis. A BiLSTM model analyzes user reviews to surface genuinely good recipes.',
    problem: 'Recipe ratings are often misleading or manipulated.',
    solution:
      'BiLSTM sentiment model (Python/Keras) → Django REST API → PostgreSQL with recipe embeddings → Google Places API for local sourcing.',
    tech: ['Django', 'Python', 'BiLSTM', 'PostgreSQL', 'Google API'],
    image: '/images/peakfood.png',
    github: 'https://github.com/arxel2468/food',
    live: null,
    featured: false,
    color: '#059669',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'automation',
    title: 'Business Automation',
    tagline: 'Automate the boring stuff.',
    description:
      'End-to-end automation pipeline: image processing, sales report generation, and automated email dispatch with health monitoring.',
    problem: 'Manual reporting and data processing wastes hours every week.',
    solution:
      'Python orchestration → PIL for image processing → pandas for report generation → smtplib with retry logic and health checks.',
    tech: ['Python', 'PIL', 'smtplib', 'Automation'],
    image: null,
    github: 'https://github.com/arxel2468/automation-with-python',
    live: null,
    featured: false,
    color: '#D97706',
    gradient: 'from-amber-500 to-orange-600',
  },
];
