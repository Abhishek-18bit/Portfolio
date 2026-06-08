'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { CODING_PROFILES } from '@/constants';
import { CodingProfile } from '@/types';

const PLATFORM_ICONS: { [key: string]: string } = {
  LeetCode: '🔥',
  GitHub: '🐙',
  CodeChef: '👨‍🍳',
  GeeksforGeeks: '🌿',
  'Coding Ninjas': '🥷',
};

interface PlatformCardProps {
  profile: CodingProfile;
  index: number;
}

function PlatformCard({ profile, index }: PlatformCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl overflow-hidden flex flex-col justify-between h-full bg-[#161616]/40 border border-white/5"
      style={{
        background: profile.bgColor,
        borderColor: profile.borderColor,
      }}
    >
      {/* Top glowing boundary */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${profile.color}70, transparent)`,
        }}
      />

      <div className="p-6 flex flex-col gap-6 h-full justify-between">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{
                background: `${profile.color}15`,
                border: `1px solid ${profile.color}25`,
              }}
            >
              {PLATFORM_ICONS[profile.platform] || '💻'}
            </div>
            <div>
              <h3 className="font-bold text-sm text-white" style={{ color: profile.color }}>
                {profile.platform}
              </h3>
              <p className="text-[10px] font-mono text-text-secondary">
                @{profile.username}
              </p>
            </div>
          </div>
          <a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs border border-white/5 bg-white/[0.01] transition-all duration-300 hover:text-white cursor-none"
            style={{
              background: `${profile.color}10`,
              borderColor: `${profile.color}20`,
              color: profile.color,
            }}
          >
            ↗
          </a>
        </div>

        {/* Bio Description */}
        <p className="text-xs text-text-secondary leading-relaxed">
          {profile.description}
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {Object.entries(profile.stats).map(([key, val]) => (
            <div
              key={key}
              className="p-2.5 rounded-xl border border-white/5 bg-white/[0.01]"
            >
              <div className="text-base font-bold font-mono text-white" style={{ color: profile.color }}>
                {isVisible && typeof val === 'number' ? (
                  <CountUp end={val} duration={1.8} />
                ) : (
                  typeof val === 'number' ? 0 : String(val)
                )}
              </div>
              <div className="text-[9px] font-mono capitalize text-neutral-500 mt-0.5">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <a
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-none mt-2"
          style={{
            background: `${profile.color}15`,
            border: `1px solid ${profile.color}25`,
            color: profile.color,
          }}
        >
          Inspect Profile
        </a>
      </div>

      {/* Bottom glowing center */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${profile.color}10 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

export default function CodingProfiles() {
  return (
    <section id="coding-profiles" className="section-padding relative">
      <div className="section-container">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label">// TELEMETRY</div>
          <h2 className="section-title">
            Coding <span className="gradient-text">Profiles</span>
          </h2>
          <p className="mt-4 text-sm md:text-base max-w-xl mx-auto text-text-secondary">
            Continuous algorithmic problem solving and repository contributions.
          </p>
        </div>

        {/* Aggregate Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 p-6 rounded-2xl flex flex-wrap justify-around gap-6 border border-white/5"
          style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05), rgba(249, 115, 22, 0.05))',
            borderColor: 'rgba(168, 85, 247, 0.15)',
          }}
        >
          {[
            { label: 'Total Problems Solved', value: 1290, suffix: '+', color: '#A855F7' },
            { label: 'Active Platforms', value: 5, suffix: '', color: '#FB923C' },
            { label: 'DSA Master Rate', value: 92, suffix: '%', color: '#A855F7' },
            { label: 'Max Solved Streak', value: 72, suffix: ' Days', color: '#FB923C' },
          ].map(({ label, value, suffix, color }) => (
            <div key={label} className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold font-mono text-white" style={{ color }}>
                <CountUp end={value} duration={2.0} enableScrollSpy scrollSpyOnce />
                {suffix}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-text-secondary mt-1.5">
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Grid Platform Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {CODING_PROFILES.map((profile, i) => (
            <PlatformCard key={profile.platform} profile={profile} index={i} />
          ))}
        </div>

        {/* DSA Mastered Topics Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl border border-white/5 bg-[#111111]/30"
        >
          <h3 className="text-sm font-bold font-mono tracking-wider text-white mb-6 text-center uppercase">
            Data Structure & Algorithm Competency Map
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              'Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues',
              'Binary Trees', 'BST', 'Graphs', 'BFS/DFS', 'Dynamic Programming',
              'Greedy Algorithms', 'Backtracking', 'Heaps/Priority Queues', 'Tries', 
              'Segment Trees', 'Sliding Window', 'Two Pointers', 'Binary Search', 
              'Hashing Complexes', 'Recursion Models',
            ].map((topic, i) => (
              <motion.span
                key={topic}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="text-[10px] px-3.5 py-1.5 rounded-full font-mono border border-white/5 bg-white/[0.01] text-text-secondary cursor-none"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.25)';
                  e.currentTarget.style.color = 'var(--secondary-light)';
                  e.currentTarget.style.background = 'rgba(249, 115, 22, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = '#A3A3A3';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
                }}
              >
                {topic}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
