import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = Object.keys(SKILLS);

const SkillCard = ({ skill, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="skill-badge group relative overflow-hidden"
      style={{ cursor: 'none' }}
    >
      <span className="text-lg">{skill.icon}</span>
      <span className="font-medium text-sm">{skill.name}</span>

      {/* Progress indicator on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg text-xs whitespace-nowrap z-50"
            style={{
              background: 'rgba(0,229,255,0.15)',
              border: '1px solid rgba(0,229,255,0.3)',
              color: 'var(--primary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {skill.level}% proficiency
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CategorySection = ({ category, skills, isActive }) => {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={category}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Skill level bars */}
          <div className="mb-8 grid gap-4">
            {skills.map((skill, i) => (
              <div key={skill.name} className="group">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{skill.icon}</span>
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                  <span
                    className="text-xs font-mono"
                    style={{ color: 'var(--primary)' }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                      boxShadow: '0 0 10px rgba(0,229,255,0.5)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Skill badges */}
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  useEffect(() => {
    gsap.from('.skills-heading', {
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    });
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 skills-heading">
          <div className="section-label">Skills & Expertise</div>
          <h2 className="section-title">
            My Tech{' '}
            <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            A carefully curated set of technologies I use to build modern, scalable applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          {/* Category Tabs */}
          <div className="flex flex-col gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{ cursor: 'none' }}
                  className="relative flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-300 group"
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="skill-tab"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: 'rgba(0,229,255,0.08)',
                        border: '1px solid rgba(0,229,255,0.2)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Left accent */}
                  <div
                    className="relative z-10 w-1 h-8 rounded-full transition-all duration-300"
                    style={{
                      background: isActive
                        ? 'linear-gradient(to bottom, var(--primary), var(--secondary))'
                        : 'rgba(255,255,255,0.1)',
                    }}
                  />

                  <div className="relative z-10 flex flex-col">
                    <span
                      className="font-semibold text-sm transition-colors duration-300"
                      style={{ color: isActive ? 'white' : 'var(--text-secondary)' }}
                    >
                      {cat}
                    </span>
                    <span
                      className="text-xs mt-0.5"
                      style={{ color: isActive ? 'var(--primary)' : 'rgba(176,183,195,0.6)' }}
                    >
                      {SKILLS[cat].length} skills
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Info card */}
            <div
              className="mt-4 p-4 rounded-xl"
              style={{
                background: 'rgba(0,229,255,0.05)',
                border: '1px solid rgba(0,229,255,0.15)',
              }}
            >
              <div
                className="text-xs font-mono mb-2"
                style={{ color: 'var(--primary)' }}
              >
                // TECH PHILOSOPHY
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                I believe in mastering fundamentals first, then leveraging the right tools for each problem.
              </p>
            </div>
          </div>

          {/* Skill Display */}
          <div
            className="p-8 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              minHeight: '400px',
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3
                className="text-xl font-bold"
                style={{ fontFamily: 'var(--font-grotesk)' }}
              >
                {activeCategory}
              </h3>
              <div className="tag text-xs">
                {SKILLS[activeCategory].length} Technologies
              </div>
            </div>

            <CategorySection
              category={activeCategory}
              skills={SKILLS[activeCategory]}
              isActive={true}
            />
          </div>
        </div>

        {/* All skills cloud */}
        <div className="mt-16 text-center">
          <p
            className="text-xs font-mono mb-6 tracking-widest uppercase"
            style={{ color: 'var(--text-secondary)' }}
          >
            Technologies I work with daily
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.values(SKILLS)
              .flat()
              .filter((skill, i, arr) => arr.findIndex((s) => s.name === skill.name) === i)
              .map((skill, i) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02, duration: 0.3 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-secondary)',
                    cursor: 'none',
                  }}
                  whileHover={{
                    background: 'rgba(0,229,255,0.1)',
                    borderColor: 'rgba(0,229,255,0.3)',
                    color: 'var(--primary)',
                  }}
                >
                  <span>{skill.icon}</span>
                  {skill.name}
                </motion.span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
