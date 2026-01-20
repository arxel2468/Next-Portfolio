export default function GridBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      {/* The Grid Pattern */}
      <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" />

      {/* A subtle vignette to focus the center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,transparent,var(--bg))]" />
    </div>
  );
}
