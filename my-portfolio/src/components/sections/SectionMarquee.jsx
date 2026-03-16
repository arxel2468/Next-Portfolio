"use client";

const ITEMS = [
  'Next.js', 'React', 'TypeScript', 'Python', 'Django', 'Shopify',
  'PostgreSQL', 'Prisma', 'Meta Ads', 'AI/ML', 'E-commerce',
  'Full-Stack', 'Supabase', 'Node.js', 'Tailwind',
];

export default function SectionMarquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <section className="py-6 border-y border-border/30 overflow-hidden relative">
      <div className="mask-fade-edges">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((item, i) => (
            <span key={i} className="mx-6 md:mx-10 text-sm md:text-base font-medium text-muted-foreground/40 hover:text-accent/60 transition-colors duration-300 flex items-center gap-6">
              {item}
              <span className="w-1.5 h-1.5 rounded-full bg-accent/20" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
