// src/app/components/ui/ProjectCard.js
import Image from 'next/image';

export default function ProjectCard({ project, index }) {
  return (
    <div className="group relative bg-white dark:bg-magazine-dark/50 overflow-hidden">
      <div className="absolute -top-6 -left-6 text-8xl font-serif font-bold text-magazine-accent opacity-10">
        {String(index).padStart(2, '0')}
      </div>
      
      <div className="relative z-10 p-6">
        <div className="aspect-video relative mb-4 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 w-full">
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-white hover:text-magazine-accent transition-colors"
              >
                <span>View Project</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-magazine-accent transition-colors">
          {project.title}
        </h3>
        
        <p className="text-magazine-muted mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span 
              key={i}
              className="px-2 py-1 bg-magazine-light dark:bg-magazine-dark text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}