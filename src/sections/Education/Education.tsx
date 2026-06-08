'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '@/constants';

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="education" ref={sectionRef} className="section-padding relative">
      {/* Background radial highlight */}
      <div className="absolute top-[40%] right-[-10%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="section-container">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label">// ACADEMIA</div>
          <h2 className="section-title">
            My <span className="gradient-text">Education</span>
          </h2>
          <p className="mt-4 text-sm md:text-base max-w-xl mx-auto text-text-secondary">
            Building a strong foundation in computer science core principles and practical systems engineering.
          </p>
        </div>

        {/* Timeline List */}
        <div className="max-w-3xl mx-auto">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative mb-10 last:mb-0"
            >
              <div
                className="p-6 md:p-8 rounded-2xl relative overflow-hidden group bg-[#161616]/40 border border-white/5"
                style={{
                  borderLeft: i === 0
                    ? '3px solid var(--secondary)'
                    : '3px solid var(--primary)',
                }}
              >
                {/* Active Course Status badge */}
                {i === 0 && (
                  <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono border border-secondary/20 bg-secondary/5 text-secondary-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Currently Enrolled
                  </div>
                )}

                <div className="grid gap-4">
                  {/* Degree Year institution */}
                  <div>
                    <div
                      className="text-[10px] font-mono uppercase tracking-widest mb-1.5"
                      style={{ color: i === 0 ? 'var(--secondary-light)' : 'var(--primary-light)' }}
                    >
                      {edu.year}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-text-secondary">{edu.institution}</p>
                  </div>

                  {/* Highlights or Stats Row */}
                  <div className="flex flex-wrap gap-3">
                    {edu.cgpa && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs border border-primary/20 bg-primary/5 text-primary-light">
                        <span>🎯</span>
                        <span>CGPA:</span>
                        <strong className="text-white">{edu.cgpa} / 10</strong>
                      </div>
                    )}
                    {edu.score && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs border border-secondary/20 bg-secondary/5 text-secondary-light">
                        <span>📊</span>
                        <span>Score:</span>
                        <strong className="text-white">{edu.score}</strong>
                      </div>
                    )}
                    {edu.current && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs border border-white/5 bg-white/[0.01] text-text-secondary">
                        <span>📅</span>
                        <span>{edu.current}</span>
                      </div>
                    )}
                    {edu.stream && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs border border-white/5 bg-white/[0.01] text-text-secondary">
                        <span>📚</span>
                        <span>{edu.stream}</span>
                      </div>
                    )}
                  </div>

                  {/* Highlights */}
                  {edu.highlights && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {edu.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-[10px] px-3 py-1 rounded-full border border-white/5 bg-white/[0.01] text-text-secondary"
                        >
                          ✨ {h}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Coursework mapping */}
                  {edu.courses && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-[10px] font-mono uppercase tracking-widest mb-3 text-secondary-light">
                        // Relevant Coursework
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                        {edu.courses.map((course, ci) => (
                          <motion.div
                            key={course}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: ci * 0.04 }}
                            whileHover={{ scale: 1.03, y: -1 }}
                            className="flex items-center gap-2 p-2 rounded-xl text-[10px] font-mono border border-white/5 bg-white/[0.01] text-text-secondary cursor-none"
                          >
                            <div className="w-1 h-1 rounded-full bg-primary-light flex-shrink-0" />
                            <span className="truncate">{course}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Ambient dynamic card hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: i === 0
                      ? 'radial-gradient(circle at 10% 50%, rgba(249, 115, 22, 0.03) 0%, transparent 60%)'
                      : 'radial-gradient(circle at 10% 50%, rgba(168, 85, 247, 0.03) 0%, transparent 60%)',
                  }}
                />
              </div>

              {/* Vertical connector line */}
              {i < EDUCATION.length - 1 && (
                <div className="flex justify-center my-3">
                  <div className="w-px h-6 bg-gradient-to-b from-primary to-secondary opacity-25" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CS Foundations tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="tag tag-orange mb-6">
            📚 Core Computer Science Competencies
          </div>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl mx-auto">
            {[
              'Algorithmic Complexity', 'Database System Designs', 'Operating System Architectures',
              'Computer Network Protocols', 'OOP Modeling', 'Memory Management Schemes',
              'Distributed Cache (Redis)', 'Containerized sandboxing', 'Prisma ORM models',
              'REST API Pipelines', 'Multi-thread execution', 'Microservice Telemetry',
            ].map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -2, scale: 1.05 }}
                className="text-[10px] px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.01] text-text-secondary cursor-none"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.25)';
                  e.currentTarget.style.color = 'var(--primary-light)';
                  e.currentTarget.style.background = 'rgba(168, 85, 247, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = '#A3A3A3';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
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
}
