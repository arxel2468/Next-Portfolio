export const caseStudy = {
  client: 'StealStreet.in',
  year: '2024',
  image: '/images/shopify.jpg',
  link: 'https://stealstreet.in',
  quote: 'Built it really fast. Only took a day of our time to ship.',
  quoteAuthor: 'Anurag & Parth — Founders, StealStreet',
  metrics: [
    { n: '106', l: 'Purchases', sub: 'In 6 days' },
    { n: '46.4', l: 'ROAS', sub: 'Return on ad spend', suffix: 'x' },
    { n: '0.48', l: 'CPR', sub: 'Cost per result', prefix: '₹' },
    { n: '1', l: 'Day', sub: 'Client time invested', prefix: '<' },
  ],
  scope: [
    'Shopify store design & development',
    'Brand identity & visual direction',
    'Shiprocket logistics integration',
    'Payment gateway setup',
    'Meta Pixel & GA4 analytics',
    'Meta Ads strategy & A/B testing',
    'Domain & DNS configuration',
  ],
  body: `The founders had a product idea and zero digital presence. No store, no brand, no audience. I built everything — the Shopify store with a conversion-optimized layout, integrated Shiprocket for logistics, set up payments, configured analytics with Meta Pixel and GA4, then designed and launched a Meta Ads campaign. The result: 106 purchases in 6 days with a 46.4x ROAS. Profitable from day one.`,
  process: [
    { phase: '01', title: 'Discovery', desc: 'Product, audience, and competitive landscape — mapped in a single call.' },
    { phase: '02', title: 'Build', desc: 'Complete Shopify store with optimized product pages shipped in under 24 hours.' },
    { phase: '03', title: 'Integrate', desc: 'Shiprocket, payments, Meta Pixel, GA4 — full operational stack configured.' },
    { phase: '04', title: 'Launch', desc: 'Meta Ads with A/B testing live. 106 purchases. ₹0.48 CPR. Profitable day one.' },
  ],
};

export const projects = [
  {
    title: 'InterviewGym',
    desc: 'AI-powered mock interview platform with real-time voice transcription, synthesis, and personalized feedback.',
    tech: ['Next.js 14', 'TypeScript', 'Prisma', 'Supabase', 'Groq AI'],
    gh: 'https://github.com/arxel2468/interviewgym',
    live: 'https://theinterviewgym.vercel.app',
    img: '/images/interviewgym.png',
    color: '#6366F1',
    year: '2024',
  },
  {
    title: 'YourSaaS',
    desc: 'Enterprise multi-tenant SaaS with isolated workspaces, RBAC, magic link invitations, and Razorpay billing.',
    tech: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL', 'Razorpay'],
    gh: 'https://github.com/arxel2468/multi-tenant-saas',
    live: 'https://multi-tenant-saas-phi-indol.vercel.app',
    img: '/images/yoursaas.png',
    color: '#7C3AED',
    year: '2024',
  },
  {
    title: 'Peak Food',
    desc: 'Recipe platform with BiLSTM sentiment analysis, GitHub auth, Google API, and MySQL to PostgreSQL migration.',
    tech: ['Django', 'Keras', 'PostgreSQL', 'Google API'],
    gh: 'https://github.com/arxel2468/food',
    live: null,
    img: '/images/peakfood.png',
    color: '#059669',
    year: '2023',
  },
  {
    title: 'Automation Suite',
    desc: 'Python scripts eliminating manual workflows — batch image processing, report generation, email automation.',
    tech: ['Python', 'PIL', 'smtplib', 'Automation'],
    gh: 'https://github.com/arxel2468/automation-with-python',
    live: null,
    img: null,
    color: '#D97706',
    year: '2023',
  },
];

export const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'] },
  { category: 'Backend', items: ['Python', 'Django', 'Node.js', 'REST APIs', 'PostgreSQL'] },
  { category: 'Tools', items: ['Git', 'Docker', 'Vercel', 'Supabase', 'Prisma'] },
  { category: 'Commerce', items: ['Shopify', 'Liquid', 'Meta Ads', 'GA4', 'SEO'] },
  { category: 'AI / ML', items: ['Groq', 'Keras', 'LSTM', 'NLP', 'Sentiment Analysis'] },
];

export const socials = [
  { label: 'GitHub', href: 'https://github.com/arxel2468' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/amitpandit2468' },
  { label: 'X / Twitter', href: 'https://twitter.com/amitpandit2468' },
];

export const email = '1amitpandit2468@gmail.com';
