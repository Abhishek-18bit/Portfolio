'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { ACHIEVEMENTS } from '@/constants';
import { Achievement } from '@/types';

interface AchievementCardProps {
  item: Achievement;
  index: number;
}

function AchievementCard({ item, index }: AchievementCardProps) {
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
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="p-6 rounded-2xl relative overflow-hidden group bg-[#161616]/40 border border-white/5 text-center flex flex-col justify-center items-center min-h-[170px]"
      style={{ cursor: 'none' }}
    >
      {/* Icon */}
      <div 
        className="text-3xl mb-3.5 select-none transition-transform duration-300 group-hover:scale-110" 
        style={{ filter: `drop-shadow(0 0 10px ${item.color}50)` }}
      >
        {item.icon}
      </div>

      {/* Counter */}
      <div
        className="text-3xl font-extrabold font-mono mb-1 text-white"
        style={{ textShadow: `0 0 25px ${item.color}40` }}
      >
        {isVisible ? (
          <CountUp end={item.value} duration={2.2} />
        ) : (
          '0'
        )}
        <span style={{ color: item.color }}>{item.suffix}</span>
      </div>

      {/* Label */}
      <div className="text-xs font-mono uppercase tracking-wider text-text-secondary">
        {item.label}
      </div>

      {/* Bottom sliding glow bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
        }}
      />
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding relative">
      <div className="section-container">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label">// TELEMETRY</div>
          <h2 className="section-title">
            Achievements & <span className="gradient-text">Milestones</span>
          </h2>
          <p className="mt-4 text-sm md:text-base max-w-xl mx-auto text-text-secondary">
            Measurable progress and validated engineering certifications.
          </p>
        </div>

        {/* Aggregate Counters Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {ACHIEVEMENTS.map((item, i) => (
            <AchievementCard key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* Certifications and Hackathons splitting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Certifications Card */}
          <div className="p-6 md:p-8 rounded-2xl border border-white/5 bg-[#111111]/30 backdrop-blur-md">
            <h3 className="text-base font-bold text-white mb-6 uppercase font-mono tracking-wider">
              🏆 Verified Certifications
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Meta Frontend Engineer', org: 'Meta / Coursera', color: '#7C3AED' },
                { name: 'AWS Cloud Practitioner', org: 'Amazon Web Services', color: '#FB923C' },
                { name: 'MongoDB Developer Path', org: 'MongoDB University', color: '#10B981' },
                { name: 'Node.js Certification', org: 'OpenJS Foundation', color: '#7C3AED' },
                { name: 'React Advanced Architecture', org: 'Udemy Academic', color: '#FB923C' },
              ].map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-white/5 bg-[#161616]/30 cursor-none"
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cert.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white truncate">{cert.name}</div>
                    <div className="text-[10px] font-mono mt-0.5" style={{ color: cert.color }}>
                      {cert.org}
                    </div>
                  </div>
                  <span className="text-xs text-green-500 font-mono">✓</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Hackathons Card */}
          <div className="p-6 md:p-8 rounded-2xl border border-white/5 bg-[#111111]/30 backdrop-blur-md">
            <h3 className="text-base font-bold text-white mb-6 uppercase font-mono tracking-wider">
              ⚡ Hackathons & Rankings
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Smart India Hackathon', result: 'Finalist', color: '#FB923C', year: '2024' },
                { name: 'HackWithInfy DSA Challenge', result: 'Top 100', color: '#A855F7', year: '2024' },
                { name: 'Global DevFest Hack', result: '2nd Place', color: '#FB923C', year: '2023' },
                { name: 'University Internal Hackathon', result: 'Winner 🏆', color: '#A855F7', year: '2023' },
                { name: 'State Coding Marathon', result: 'Top 50', color: '#FB923C', year: '2023' },
              ].map((h, i) => (
                <motion.div
                  key={h.name}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: -5 }}
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-white/5 bg-[#161616]/30 cursor-none"
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: h.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white truncate">{h.name}</div>
                    <div className="text-[10px] font-mono text-neutral-500 mt-0.5">
                      {h.year}
                    </div>
                  </div>
                  <span
                    className="text-[9px] font-mono px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      background: `${h.color}15`,
                      color: h.color,
                      border: `1px solid ${h.color}30`,
                    }}
                  >
                    {h.result}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
