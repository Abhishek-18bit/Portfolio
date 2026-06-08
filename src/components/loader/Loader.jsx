import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);
  const logoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Entrance animation
    tl.from(logoRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Simulate loading progress
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 12 + 3;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);

        // Complete animation
        gsap.to(progressRef.current, {
          width: '100%',
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            setTimeout(() => {
              gsap.to(loaderRef.current, {
                opacity: 0,
                scale: 0.95,
                duration: 0.8,
                ease: 'power3.inOut',
                onComplete: () => {
                  onComplete?.();
                },
              });
            }, 400);
          },
        });
      } else {
        gsap.to(progressRef.current, {
          width: `${prog}%`,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
      setProgress(Math.round(prog));
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: 'var(--bg)' }}
    >
      {/* Particle canvas background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              background: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 4 + 4 + 's',
            }}
          />
        ))}
      </div>

      {/* Glow rings */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10 animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.4) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-5 animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',
          animationDelay: '1s',
        }}
      />

      {/* Content */}
      <div ref={logoRef} className="relative z-10 flex flex-col items-center gap-10">
        {/* Logo */}
        <div className="relative">
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold"
            style={{
              background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(124,58,237,0.2))',
              border: '1px solid rgba(0,229,255,0.3)',
              boxShadow: '0 0 40px rgba(0,229,255,0.2), 0 0 80px rgba(124,58,237,0.1)',
              fontFamily: 'var(--font-grotesk)',
              color: 'var(--primary)',
            }}
          >
            AK
          </div>
          {/* Rotating border */}
          <div
            className="absolute -inset-2 rounded-2xl opacity-60"
            style={{
              background:
                'conic-gradient(from 0deg, var(--primary), var(--secondary), transparent, var(--primary))',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'xor',
              padding: '1px',
              animation: 'rotate-slow 3s linear infinite',
            }}
          />
        </div>

        {/* Name */}
        <div className="text-center">
          <h1
            className="text-3xl font-bold mb-1"
            style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}
          >
            Abhishek Kumar
          </h1>
          <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '0.1em' }}>
            LOADING PORTFOLIO...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-72">
          <div
            className="w-full h-[2px] rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <div ref={progressRef} className="loader-progress-bar h-full w-0" />
          </div>
          <div className="flex justify-between mt-2" style={{ color: 'var(--text-secondary)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
            <span>Initializing</span>
            <span ref={percentRef}>{progress}%</span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full animate-bounce"
              style={{
                background: 'var(--primary)',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
