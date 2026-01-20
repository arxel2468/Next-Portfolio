"use client";

export default function Footer() {
  return (
    <footer className="py-20 bg-[var(--fg)] text-[var(--bg)]">
      <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-6">Amit Pandit.</h3>
          <p className="text-[var(--accents-4)] max-w-sm">
            Engineering robust solutions for complex problems.
            Based in India, working globally.
          </p>
        </div>

        <div className="flex flex-col md:items-end justify-between">
          <div className="flex gap-8 font-mono text-sm">
            <a href="https://github.com/arxel2468" className="hover:text-[var(--accents-4)] transition-colors">GITHUB</a>
            <a href="https://linkedin.com/in/amitpandit2468" className="hover:text-[var(--accents-4)] transition-colors">LINKEDIN</a>
            <a href="mailto:1amitpandit2468@gmail.com" className="hover:text-[var(--accents-4)] transition-colors">EMAIL</a>
          </div>
          <p className="text-[var(--accents-6)] text-sm mt-8">
            © {new Date().getFullYear()} — SYSTEM.VER.2.0
          </p>
        </div>
      </div>
    </footer>
  );
}
