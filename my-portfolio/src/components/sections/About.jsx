'use client';
import { skills } from '@/data/content';
import DecryptedText from '../ui/DecryptedText';
import SpotlightCard from '../ui/SpotlightCard';
import ScrollFloat from '../ui/ScrollFloat';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-6 md:px-12 lg:px-16 max-w-[1200px] mx-auto">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3 block" style={{ color: 'var(--accent)' }}>03 · About</span>
      <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] mb-10" style={{ color: 'var(--text)' }}>
        <DecryptedText text="I think in products, not features." animateOn="view" speed={35} className="text-[var(--text)]" encryptedClassName="text-[var(--text-3)]" />
      </h2>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 mb-16">
        <div className="space-y-5 text-[15px] leading-[1.8]">
          <p>I don&apos;t just write code — I build products that work in the real world. When someone comes to me with an idea, I think about the <span style={{ color: 'var(--accent)' }}>brand</span>, the <span style={{ color: 'var(--accent)' }}>user journey</span>, the <span style={{ color: 'var(--accent)' }}>business model</span>, and the <span style={{ color: 'var(--accent)' }}>logistics</span>. Then I build all of it.</p>
          <p>Most recently I shipped <a href="https://stealstreet.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }} className="hover:underline">StealStreet</a> — from zero to 106 purchases in 6 days. Profitable from day one.</p>
          <p className="font-serif italic" style={{ color: 'var(--text)' }}>I ship businesses, not repositories.</p>

          <div className="grid grid-cols-2 gap-4 pt-6">
            {[{ l: 'Location', v: 'Mumbai, India' }, { l: 'Education', v: 'B.Sc IT · 8.9 CGPA' }, { l: 'Focus', v: 'Full-Stack · E-commerce' }, { l: 'Status', v: 'Available' }].map((f, i) => (
              <div key={i} className="py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="font-mono text-[9px] uppercase tracking-wider block mb-1" style={{ color: 'var(--accent)' }}>{f.l}</span>
                <span className="text-sm" style={{ color: 'var(--text)' }}>{f.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          {skills.map((g, i) => (
            <SpotlightCard key={i} className="p-5" spotlightColor="rgba(100,255,218,0.06)">
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] mb-3 block" style={{ color: 'var(--accent)' }}>{g.group}</span>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {g.items.map((s, j) => (
                  <span key={s} className="text-[13px] transition-colors cursor-default" style={{ color: 'var(--text-2)' }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent)'} onMouseLeave={e => e.target.style.color = 'var(--text-2)'}>
                    {s}{j < g.items.length - 1 && <span className="mx-1 opacity-20">·</span>}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
