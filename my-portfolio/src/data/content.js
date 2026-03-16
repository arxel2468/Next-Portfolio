export const projects = [
  {
    title: 'StealStreet.in',
    subtitle: 'E-commerce Business · From Zero to Profitable',
    description: 'Complete e-commerce operation — Shopify store, brand identity, Shiprocket logistics, payment gateway, Meta Pixel & GA4, and Meta Ads. 106 purchases in 6 days. 46.4x ROAS. Profitable from day one.',
    tech: ['Shopify', 'Liquid', 'Meta Ads', 'GA4', 'Shiprocket'],
    live: 'https://stealstreet.in',
    github: null,
    image: '/images/shopify.jpg',
    stats: [{ value: 106, label: 'Purchases', suffix: '' }, { value: 46.4, label: 'ROAS', suffix: 'x' }, { value: 0.48, label: 'CPR', prefix: '₹' }],
    quote: 'Built it really fast. Only took a day of our time to ship.',
    quoteBy: 'Anurag & Parth, Founders',
    scope: ['Shopify store design & build', 'Brand identity direction', 'Shiprocket logistics setup', 'Payment gateway integration', 'Meta Pixel & GA4 analytics', 'Meta Ads campaign & A/B tests', 'Domain & DNS configuration'],
  },
  {
    title: 'InterviewGym',
    subtitle: 'AI Mock Interview Platform',
    description: 'Real-time voice transcription, speech synthesis, and personalized feedback. Users practice with AI conversations and track progress.',
    tech: ['Next.js 14', 'TypeScript', 'Prisma', 'Supabase', 'Groq AI'],
    live: 'https://theinterviewgym.vercel.app',
    github: 'https://github.com/arxel2468/interviewgym',
    image: '/images/interviewgym.png',
  },
  {
    title: 'YourSaaS',
    subtitle: 'Multi-Tenant SaaS Platform',
    description: 'Isolated workspaces, RBAC, magic link invitations, and Razorpay billing. Solved Next.js 15 async data fetching challenges.',
    tech: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL', 'Razorpay'],
    live: 'https://multi-tenant-saas-phi-indol.vercel.app',
    github: 'https://github.com/arxel2468/multi-tenant-saas',
    image: '/images/yoursaas.png',
  },
  {
    title: 'Peak Food',
    subtitle: 'ML-Powered Recipe Platform',
    description: 'BiLSTM sentiment analysis on reviews. GitHub OAuth, Google API, MySQL to PostgreSQL migration.',
    tech: ['Django', 'Keras', 'PostgreSQL', 'Google API'],
    live: null,
    github: 'https://github.com/arxel2468/food',
    image: '/images/peakfood.png',
  },
];

export const skills = [
  { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'] },
  { group: 'Backend', items: ['Python', 'Django', 'Node.js', 'REST APIs', 'PostgreSQL'] },
  { group: 'Commerce', items: ['Shopify', 'Liquid', 'Meta Ads', 'GA4', 'SEO'] },
  { group: 'Tools', items: ['Git', 'Docker', 'Prisma', 'Supabase', 'Vercel'] },
  { group: 'AI/ML', items: ['Groq', 'Keras', 'LSTM', 'NLP'] },
];

export const socials = [
  { name: 'GitHub', url: 'https://github.com/arxel2468' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/amitpandit2468' },
  { name: 'X', url: 'https://twitter.com/amitpandit2468' },
];

export const email = '1amitpandit2468@gmail.com';

export const tickerItems = ['106 Purchases in 6 Days', '46.4x ROAS', '₹0.48 Cost Per Result', '<24h Store to Live', '4+ Products Shipped', 'Open to Work'];
