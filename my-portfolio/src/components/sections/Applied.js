"use client";

import { appliedWork } from '@/data/applied';

export default function Applied() {
  return (
    <section id="applied" className="py-32 border-b border-[var(--accents-2)]">
      <div className="container-wide">

        <div className="flex items-end justify-between mb-16">
          <h2 className="text-4xl font-bold tracking-tight">Applied Execution</h2>
          <span className="mono-micro hidden md:block">02 — SYSTEMS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {appliedWork.map((work) => (
            <div
              key={work.id}
              className="bg-[var(--accents-1)] p-8 md:p-12 border border-[var(--accents-2)] hover:border-[var(--accents-4)] transition-colors"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{work.title}</h3>
                  <p className="font-mono text-sm text-[var(--accents-5)]">{work.type}</p>
                </div>
                {work.acquisition && (
                  <div className="text-right">
                    <span className="block text-3xl font-bold text-[var(--success)]">{work.acquisition.result}</span>
                    <span className="mono-micro">RETURN</span>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <span className="mono-micro block mb-2">Outcome</span>
                  <p className="text-lg text-[var(--accents-6)]">{work.outcome}</p>
                </div>

                <div className="pt-6 border-t border-[var(--accents-2)]">
                  <ul className="grid grid-cols-1 gap-2">
                    {work.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--accents-5)]">
                        <span className="mt-1.5 w-1 h-1 bg-[var(--accents-4)] rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
