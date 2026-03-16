'use client';
import Image from 'next/image';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { projects } from '@/data/content';
import DecryptedText from '../ui/DecryptedText';
import TiltedCard from '../ui/TiltedCard';
import SpotlightCard from '../ui/SpotlightCard';

export default function Projects() {
  const others = projects.slice(1);
  return (
    <section id="projects" className="py-20 md:py-32 px-6 md:px-12 lg:px-16 max-w-[1200px] mx-auto" style={{ background: 'var(--bg)' }}>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3 block" style={{ color: 'var(--accent)' }}>02 · Selected Projects</span>
      <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] mb-12" style={{ color: 'var(--text)' }}>
        <DecryptedText text="Other things I've built." animateOn="view" speed={40} className="text-[var(--text)]" encryptedClassName="text-[var(--text-3)]" />
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {others.map((p, i) => (
          <TiltedCard key={p.title} containerHeight="100%" containerWidth="100%" rotateAmplitude={8} scaleOnHover={1.02} className="h-full">
            <SpotlightCard className="h-full flex flex-col p-0" spotlightColor="rgba(100,255,218,0.08)">
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                {p.image ? (
                  <Image src={p.image} alt={p.title} fill className="object-cover object-top" sizes="(max-width:768px) 100vw, 33vw" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'var(--elevated)' }}>
                    <span className="font-serif text-4xl" style={{ color: 'var(--text-3)' }}>{p.title[0]}</span>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'var(--accent)' }}>{p.subtitle}</span>
                  <div className="flex gap-2">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: 'var(--text-3)' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}>
                        <IconBrandGithub size={16} stroke={1.5} />
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: 'var(--text-3)' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}>
                        <IconExternalLink size={16} stroke={1.5} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-serif text-lg mb-2" style={{ color: 'var(--text)' }}>{p.title}</h3>
                <p className="text-[13px] leading-relaxed mb-4 flex-1">{p.description}</p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {p.tech.map(t => (
                    <span key={t} className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded" style={{ color: 'var(--accent)', background: 'var(--accent-dim)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </TiltedCard>
        ))}
      </div>
    </section>
  );
}
