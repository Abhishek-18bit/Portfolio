import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUpComponent from 'react-countup';
import { ACHIEVEMENTS } from '../../constants';

const CountUp = typeof CountUpComponent === 'function' ? CountUpComponent : (CountUpComponent.default || CountUpComponent);

const AchievementCard = ({ item, index }) => {
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
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="counter-card group"
      style={{ cursor: 'none' }}
    >
      {/* Icon */}
      <div className="text-4xl mb-4" style={{ filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.4))' }}>
        {item.icon}
      </div>

      {/* Counter */}
      <div
        className="text-4xl font-bold mb-2"
        style={{
          fontFamily: 'var(--font-grotesk)',
          color: item.color,
          textShadow: `0 0 30px ${item.color}60`,
        }}
      >
        {isVisible ? (
          <CountUp end={item.value} duration={2.5} delay={index * 0.1} />
        ) : (
          '0'
        )}
        {item.suffix}
      </div>

      {/* Label */}
      <div className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
        {item.label}
      </div>

      {/* Decorative line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{
          background: `linear-gradient(to right, transparent, ${item.color}, transparent)`,
        }}
      />
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <section id="achievements" className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label">Numbers That Matter</div>
          <h2 className="section-title">
            Achievements &{' '}
            <span className="gradient-text">Milestones</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Consistent effort, measurable results, and continuous growth in every dimension.
          </p>
        </div>

        {/* Achievement grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {ACHIEVEMENTS.map((item, i) => (
            <AchievementCard key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* Certifications & Hackathons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {/* Certifications */}
          <div
            className="p-8 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <h3 className="text-lg font-bold mb-6" style={{ fontFamily: 'var(--font-grotesk)' }}>
              🏆 Certifications
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Meta Frontend Developer', org: 'Meta / Coursera', color: '#0081FB' },
                { name: 'AWS Cloud Practitioner', org: 'Amazon Web Services', color: '#FF9900' },
                { name: 'MongoDB Developer Path', org: 'MongoDB University', color: '#2F8D46' },
                { name: 'Node.js Certification', org: 'OpenJS Foundation', color: '#339933' },
                { name: 'React Advanced Concepts', org: 'Udemy', color: '#EC5252' },
              ].map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'none',
                  }}
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cert.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{cert.name}</div>
                    <div className="text-xs" style={{ color: cert.color, opacity: 0.8 }}>
                      {cert.org}
                    </div>
                  </div>
                  <span className="text-xs opacity-50">✓</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Hackathons */}
          <div
            className="p-8 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <h3 className="text-lg font-bold mb-6" style={{ fontFamily: 'var(--font-grotesk)' }}>
              ⚡ Hackathons & Competitions
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Smart India Hackathon', result: 'Finalist', color: '#FF6B6B', year: '2024' },
                { name: 'HackWithInfy', result: 'Top 100', color: '#FFE66D', year: '2024' },
                { name: 'DevFest Hack', result: '2nd Place', color: '#00E5FF', year: '2023' },
                { name: 'Internal Hackathon', result: '1st Place 🏆', color: '#4ECDC4', year: '2023' },
                { name: 'Code-A-Thon', result: 'Top 50', color: '#A78BFA', year: '2023' },
              ].map((h, i) => (
                <motion.div
                  key={h.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: -5 }}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'none',
                  }}
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: h.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{h.name}</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {h.year}
                    </div>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-mono flex-shrink-0"
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
};

export default Achievements;
