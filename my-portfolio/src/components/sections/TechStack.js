"use client";

const technologies = [
  'NEXT.JS',
  'REACT',
  'PYTHON',
  'TYPESCRIPT',
  'TENSORFLOW',
  'FASTAPI',
  'NODE.JS',
  'POSTGRESQL',
  'DOCKER',
  'OPENAI',
  'TAILWIND',
  'SHOPIFY',
];

export default function TechStack() {
  // Duplicate array for seamless loop
  const items = [...technologies, ...technologies];

  return (
    <section className="py-12 border-y overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[var(--bg)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none" />

        {/* Scrolling content */}
        <div className="flex animate-marquee">
          {items.map((tech, index) => (
            <span
              key={index}
              className="flex-shrink-0 px-8 text-4xl md:text-6xl font-bold tracking-tighter select-none"
              style={{ color: 'var(--fg-subtle)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
