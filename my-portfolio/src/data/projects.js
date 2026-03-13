export const caseStudy = {
  client: 'StealStreet.in',
  year: '2024',
  headline: '106 purchases in 6 days.',
  description: 'Anurag and Parth had a product idea and zero digital presence. I built the entire business — Shopify store, brand identity, logistics, payments, and a Meta Ads campaign that hit 7x ROAS. Store was built in a day. Total client time: less than one day.',
  image: '/images/shopify.jpg',
  link: 'https://stealstreet.in',
  testimonial: {
    quote: 'Built it really fast. Only took a day of our time to ship. Efficient and effective.',
    author: 'Anurag & Parth',
    role: 'Founders',
  },
  metrics: [
    { value: '106', label: 'Purchases' },
    { value: '₹0.48', label: 'CPR' },
    { value: '7x', label: 'ROAS' },
    { value: '<1', label: 'Day needed', suffix: ' day' },
  ],
  scope: ['Shopify Store', 'Brand Identity', 'Logistics Setup', 'Analytics Pipeline', 'Meta Ads Campaign', 'A/B Testing'],
};

export const projects = [
  {
    title: 'InterviewGym',
    description: 'AI interview simulator with real-time voice. Groq LLM, WebSocket, Next.js 14, Prisma, Supabase.',
    tags: ['Next.js', 'AI', 'TypeScript'],
    github: 'https://github.com/arxel2468/interviewgym',
    live: 'https://theinterviewgym.vercel.app',
    image: '/images/interviewgym.png',
    color: '#6366F1',
  },
  {
    title: 'YourSaaS',
    description: 'Multi-tenant SaaS boilerplate. Clerk auth, Prisma, Razorpay, workspace isolation.',
    tags: ['Next.js 15', 'Prisma', 'Clerk'],
    github: 'https://github.com/arxel2468/multi-tenant-saas',
    live: 'https://multi-tenant-saas-phi-indol.vercel.app',
    image: '/images/yoursaas.png',
    color: '#7C3AED',
  },
  {
    title: 'Peak Food',
    description: 'BiLSTM sentiment analysis on recipe reviews. Django, Keras, PostgreSQL.',
    tags: ['Python', 'ML', 'Django'],
    github: 'https://github.com/arxel2468/food',
    live: null,
    image: '/images/peakfood.png',
    color: '#059669',
  },
  {
    title: 'Automation Suite',
    description: 'Image processing, report generation, email automation with health monitoring.',
    tags: ['Python', 'Automation'],
    github: 'https://github.com/arxel2468/automation-with-python',
    live: null,
    image: null,
    color: '#D97706',
  },
];
