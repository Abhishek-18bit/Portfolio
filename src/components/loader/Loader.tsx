'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1200; // 1.2s loading simulation
    const intervalTime = 25;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400); // 400ms delay for visual exit
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100vh',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0A0A0A]"
    >
      {/* Decorative Technical Grid Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      {/* Subtle Background Radial Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated Cybernetic Ring */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth="2"
              fill="transparent"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              stroke="url(#loader-gradient)"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray="251.2"
              animate={{ strokeDashoffset: 251.2 - (251.2 * progress) / 100 }}
              transition={{ ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="loader-gradient" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute font-mono text-xs font-bold text-white tracking-widest">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Text Loading details */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xs font-mono tracking-[0.25em] text-[#FB923C] uppercase animate-pulse-slow">
            SYSTEM DISPATCH
          </h2>
          <span className="text-[9px] font-mono text-neutral-500 mt-2 tracking-widest uppercase">
            Loading interactive WebGL matrices...
          </span>
        </div>
      </div>
    </motion.div>
  );
}
