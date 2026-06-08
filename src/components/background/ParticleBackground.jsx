// CSS-only particle background - no Three.js canvas needed
// This avoids WebGL context limit issues with multiple canvases

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Floating particles - pure CSS */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 2 === 0 ? 'rgba(0,229,255,0.7)' : 'rgba(124,58,237,0.7)',
              left: `${(i * 37 + 5) % 100}%`,
              top: `${(i * 23 + 10) % 100}%`,
              opacity: 0.3 + (i % 5) * 0.1,
              animationDelay: `${(i * 0.4) % 6}s`,
              animationDuration: `${4 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* Radial gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(0,229,255,0.07) 0%, transparent 50%),
            radial-gradient(ellipse 60% 60% at 80% 60%, rgba(124,58,237,0.09) 0%, transparent 50%),
            radial-gradient(ellipse 100% 100% at 50% 100%, rgba(0,229,255,0.04) 0%, transparent 60%)
          `,
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* Animated glow orbs - CSS only */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animationDuration: '6s',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animationDuration: '8s',
          animationDelay: '2s',
        }}
      />
    </div>
  );
};

export default ParticleBackground;
