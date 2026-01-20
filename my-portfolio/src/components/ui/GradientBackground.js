export default function GradientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--accent)] mesh-blob opacity-20"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-purple-500 mesh-blob opacity-10"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] rounded-full bg-cyan-500 mesh-blob opacity-10"
        style={{ animationDelay: '4s' }}
      />
      {/* Noise Overlay using SVG filter from globals.css or simple image */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMzMzIiAvPgo8L3N2Zz4=')]"></div>
    </div>
  );
}
