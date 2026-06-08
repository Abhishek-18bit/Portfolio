'use client';

import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from '@/components/cursor/CustomCursor';
import Loader from '@/components/loader/Loader';
import Navbar from '@/components/navbar/Navbar';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <CustomCursor />
          <Navbar />
          <div className="relative z-10">{children}</div>
        </>
      )}
    </>
  );
}
