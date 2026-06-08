import { useRef } from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '../../constants';

const Education = () => {
  const sectionRef = useRef(null);

  return (
    <section id="education" ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label">Academic Journey</div>
          <h2 className="section-title">
            My{' '}
            <span className="gradient-text">Education</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Building a strong foundation in computer science fundamentals and modern software engineering.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative mb-12 last:mb-0"
            >
              <div
                className="p-8 rounded-2xl relative overflow-hidden group"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: i === 0
                    ? '1px solid rgba(0,229,255,0.2)'
                    : '1px solid rgba(255,255,255,0.07)',
                  borderLeft: i === 0
                    ? '3px solid var(--primary)'
                    : '3px solid rgba(124,58,237,0.5)',
                }}
              >
                {/* Current indicator */}
                {i === 0 && (
                  <div
                    className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
                    style={{
                      background: 'rgba(0,229,255,0.1)',
                      border: '1px solid rgba(0,229,255,0.3)',
                      color: 'var(--primary)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Currently Enrolled
                  </div>
                )}

                <div className="grid lg:grid-cols-[1fr_auto] gap-6">
                  <div className="flex flex-col gap-4">
                    {/* Degree */}
                    <div>
                      <div
                        className="text-xs font-mono uppercase tracking-widest mb-2"
                        style={{ color: i === 0 ? 'var(--primary)' : '#A78BFA' }}
                      >
                        {edu.year}
                      </div>
                      <h3
                        className="text-xl font-bold mb-1"
                        style={{ fontFamily: 'var(--font-grotesk)' }}
                      >
                        {edu.degree}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)' }}>{edu.institution}</p>
                    </div>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-4">
                      {edu.cgpa && (
                        <div
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                          style={{
                            background: 'rgba(0,229,255,0.08)',
                            border: '1px solid rgba(0,229,255,0.2)',
                          }}
                        >
                          <span>🎯</span>
                          <span style={{ color: 'var(--text-secondary)' }}>CGPA:</span>
                          <strong style={{ color: 'var(--primary)' }}>{edu.cgpa}/10</strong>
                        </div>
                      )}
                      {edu.score && (
                        <div
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                          style={{
                            background: 'rgba(124,58,237,0.08)',
                            border: '1px solid rgba(124,58,237,0.2)',
                          }}
                        >
                          <span>📊</span>
                          <span style={{ color: 'var(--text-secondary)' }}>Score:</span>
                          <strong style={{ color: '#A78BFA' }}>{edu.score}</strong>
                        </div>
                      )}
                      {edu.current && (
                        <div
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                          style={{
                            background: 'rgba(0,229,255,0.05)',
                            border: '1px solid rgba(0,229,255,0.15)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          <span>📅</span>
                          {edu.current}
                        </div>
                      )}
                      {edu.stream && (
                        <div
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          <span>📚</span>
                          {edu.stream}
                        </div>
                      )}
                    </div>

                    {/* Highlights */}
                    {edu.highlights && (
                      <div className="flex flex-wrap gap-2">
                        {edu.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-xs px-3 py-1 rounded-full"
                            style={{
                              background: 'rgba(0,229,255,0.06)',
                              border: '1px solid rgba(0,229,255,0.15)',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            ✨ {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Relevant Coursework */}
                {edu.courses && (
                  <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p
                      className="text-xs font-mono uppercase tracking-widest mb-4"
                      style={{ color: 'var(--primary)' }}
                    >
                      Relevant Coursework
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {edu.courses.map((course, ci) => (
                        <motion.div
                          key={course}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: ci * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="flex items-center gap-2 p-3 rounded-xl text-xs font-medium"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            color: 'var(--text-secondary)',
                            cursor: 'none',
                          }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: 'var(--primary)' }}
                          />
                          {course}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: i === 0
                      ? 'radial-gradient(circle at 20% 50%, rgba(0,229,255,0.04) 0%, transparent 60%)'
                      : 'radial-gradient(circle at 20% 50%, rgba(124,58,237,0.04) 0%, transparent 60%)',
                  }}
                />
              </div>

              {/* Timeline connector */}
              {i < EDUCATION.length - 1 && (
                <div className="flex justify-center my-4">
                  <div
                    className="w-px h-8"
                    style={{
                      background: 'linear-gradient(to bottom, var(--primary), var(--secondary))',
                      opacity: 0.4,
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Skills from education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="tag mb-8">
            📚 Core Computer Science Fundamentals
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Time Complexity Analysis', 'Space Complexity', 'System Design',
              'Database Design', 'Network Protocols', 'Process Scheduling',
              'Memory Management', 'OOP Principles', 'ACID Properties',
              'CAP Theorem', 'REST Architecture', 'Concurrency',
            ].map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="text-xs px-3 py-1.5 rounded-full transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--text-secondary)',
                  cursor: 'none',
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
