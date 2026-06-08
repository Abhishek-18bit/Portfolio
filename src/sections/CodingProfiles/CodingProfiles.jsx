import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUpComponent from 'react-countup';
import { CODING_PROFILES } from '../../constants';

const CountUp = typeof CountUpComponent === 'function' ? CountUpComponent : (CountUpComponent.default || CountUpComponent);

const PLATFORM_ICONS = {
  LeetCode: '🔥',
  CodeChef: '👨‍🍳',
  GeeksforGeeks: '🌿',
  'Coding Ninjas': '🥷',
};

const PlatformCard = ({ profile, index }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: profile.bgColor,
        border: `1px solid ${profile.borderColor}`,
        cursor: 'none',
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${profile.color}80, transparent)`,
        }}
      />

      <div className="p-8 flex flex-col gap-6 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{
                background: `${profile.color}15`,
                border: `1px solid ${profile.color}30`,
              }}
            >
              {PLATFORM_ICONS[profile.platform] || '💻'}
            </div>
            <div>
              <h3
                className="font-bold text-lg"
                style={{ fontFamily: 'var(--font-grotesk)', color: profile.color }}
              >
                {profile.platform}
              </h3>
              <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                @{profile.username}
              </p>
            </div>
          </div>
          <a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-xs"
            style={{
              background: `${profile.color}15`,
              border: `1px solid ${profile.color}25`,
              color: profile.color,
              cursor: 'none',
            }}
          >
            ↗
          </a>
        </div>

        {/* Description */}
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {profile.description}
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {Object.entries(profile.stats).map(([key, val]) => (
            <div
              key={key}
              className="p-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="text-xl font-bold"
                style={{ fontFamily: 'var(--font-grotesk)', color: profile.color }}
              >
                {isVisible && typeof val === 'number' ? (
                  <CountUp end={val} duration={2} delay={index * 0.15} />
                ) : (
                  typeof val === 'number' ? 0 : String(val)
                )}
              </div>
              <div className="text-xs capitalize mt-1" style={{ color: 'var(--text-secondary)' }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
          style={{
            background: `${profile.color}15`,
            border: `1px solid ${profile.color}30`,
            color: profile.color,
            cursor: 'none',
          }}
        >
          View Profile →
        </a>
      </div>

      {/* Bottom hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${profile.color}10 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );
};

const CodingProfiles = () => {
  return (
    <section id="coding-profiles" className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label">Competitive Programming</div>
          <h2 className="section-title">
            Coding{' '}
            <span className="gradient-text">Profiles</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Consistent algorithmic problem solving across multiple competitive programming platforms.
          </p>
        </div>

        {/* Total stats banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-6 rounded-2xl flex flex-wrap justify-center gap-8"
          style={{
            background: 'linear-gradient(135deg, rgba(0,229,255,0.08), rgba(124,58,237,0.08))',
            border: '1px solid rgba(0,229,255,0.15)',
          }}
        >
          {[
            { label: 'Total Problems Solved', value: 1250, suffix: '+', color: '#00E5FF' },
            { label: 'Platforms Active', value: 4, suffix: '', color: '#7C3AED' },
            { label: 'Best Rating', value: 2100, suffix: '+', color: '#FFE66D' },
            { label: 'Day Streak', value: 90, suffix: '+', color: '#4ECDC4' },
          ].map(({ label, value, suffix, color }) => (
            <div key={label} className="text-center">
              <div
                className="text-3xl font-bold"
                style={{ fontFamily: 'var(--font-grotesk)', color }}
              >
                <CountUp end={value} duration={2.5} enableScrollSpy scrollSpyOnce />
                {suffix}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Platform Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CODING_PROFILES.map((profile, i) => (
            <PlatformCard key={profile.platform} profile={profile} index={i} />
          ))}
        </div>

        {/* DSA Topics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <h3 className="text-lg font-bold mb-6 text-center" style={{ fontFamily: 'var(--font-grotesk)' }}>
            DSA Topics Mastered
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues',
              'Binary Trees', 'BST', 'Graphs', 'BFS/DFS', 'Dynamic Programming',
              'Greedy', 'Backtracking', 'Heaps', 'Tries', 'Segment Trees',
              'Sliding Window', 'Two Pointers', 'Binary Search', 'Hashing', 'Recursion',
            ].map((topic, i) => (
              <motion.span
                key={topic}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-xs px-3 py-1.5 rounded-full font-mono"
                style={{
                  background: 'rgba(0,229,255,0.06)',
                  border: '1px solid rgba(0,229,255,0.15)',
                  color: 'var(--text-secondary)',
                  cursor: 'none',
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
};

export default CodingProfiles;
