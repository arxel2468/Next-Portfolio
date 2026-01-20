"use client";

const techs = [
  "NEXT.JS", "PYTHON", "TENSORFLOW", "FASTAPI", "POSTGRESQL", "REACT", "NODE.JS", "TYPESCRIPT", "OPENAI", "DOCKER", "REDIS", "SHOPIFY"
];

export default function TechStack() {
  return (
    <section className="py-20 border-y border-[var(--accents-2)] overflow-hidden bg-[var(--accents-1)]">
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
          {techs.concat(techs).map((tech, i) => (
            <span
              key={i}
              className="text-4xl md:text-6xl font-bold text-[var(--accents-3)] select-none"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-16 items-center">
          {techs.concat(techs).map((tech, i) => (
            <span
              key={i}
              className="text-4xl md:text-6xl font-bold text-[var(--accents-3)] select-none"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
