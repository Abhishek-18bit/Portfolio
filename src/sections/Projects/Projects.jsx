import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';
import { PROJECTS } from '../../constants';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      perspective={1000}
      scale={1.02}
      transitionSpeed={400}
      glareEnable={true}
      glareMaxOpacity={0.06}
      glareColor={project.color}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative group rounded-2xl overflow-hidden h-full flex flex-col"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          transition: 'all 0.4s ease',
        }}
        whileHover={{
          borderColor: `${project.color}40`,
          boxShadow: `0 30px 80px ${project.color}15, 0 0 0 1px ${project.color}20`,
        }}
      >
        {/* Thumbnail */}
        <div
          className="relative h-48 flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}15, rgba(124,58,237,0.08))`,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Mock UI preview */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="w-full max-w-[200px]">
              {/* Browser mockup */}
              <div
                className="rounded-lg overflow-hidden"
                style={{
                  background: 'rgba(5,8,22,0.8)',
                  border: `1px solid ${project.color}30`,
                }}
              >
                <div
                  className="flex items-center gap-1.5 px-3 py-2"
                  style={{ borderBottom: `1px solid ${project.color}20` }}
                >
                  <div className="w-2 h-2 rounded-full bg-red-500 opacity-70" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-70" />
                  <div className="w-2 h-2 rounded-full bg-green-500 opacity-70" />
                  <div
                    className="ml-2 flex-1 h-3 rounded-full text-[7px] font-mono flex items-center px-2"
                    style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}
                  >
                    {project.title.toLowerCase()}.app
                  </div>
                </div>
                <div className="p-3 space-y-1.5">
                  <div
                    className="h-2.5 w-3/4 rounded-full"
                    style={{ background: `${project.color}40` }}
                  />
                  <div
                    className="h-2 w-1/2 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  />
                  <div
                    className="h-2 w-2/3 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  />
                  <div className="flex gap-1.5 mt-2">
                    <div
                      className="h-5 w-12 rounded"
                      style={{ background: `${project.color}40` }}
                    />
                    <div
                      className="h-5 w-10 rounded"
                      style={{ background: 'rgba(255,255,255,0.08)' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${project.color}15 0%, transparent 70%)`,
            }}
          />

          {/* Featured badge */}
          {project.featured && (
            <div
              className="absolute top-3 right-3 tag text-xs"
              style={{
                background: `${project.color}15`,
                borderColor: `${project.color}40`,
                color: project.color,
              }}
            >
              ⭐ Featured
            </div>
          )}

          {/* Category */}
          <div
            className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-mono"
            style={{
              background: 'rgba(5,8,22,0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-secondary)',
            }}
          >
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1 gap-4">
          <div>
            <h3
              className="text-xl font-bold mb-1 transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-grotesk)',
                color: hovered ? project.color : 'white',
              }}
            >
              {project.title}
            </h3>
            <p
              className="text-xs font-mono mb-3"
              style={{ color: project.color, opacity: 0.8 }}
            >
              {project.subtitle}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {project.description}
            </p>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 flex-1">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-full font-mono"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--text-secondary)',
                }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span
                className="text-xs px-2.5 py-1 rounded-full font-mono"
                style={{
                  background: `${project.color}10`,
                  border: `1px solid ${project.color}25`,
                  color: project.color,
                }}
              >
                +{project.tech.length - 5}
              </span>
            )}
          </div>

          {/* Actions */}
          <div
            className="flex gap-3 pt-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium flex-1 justify-center"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--text-secondary)',
                cursor: 'none',
              }}
            >
              <FiGithub size={15} />
              Code
            </motion.a>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold flex-1 justify-center"
              style={{
                background: `${project.color}15`,
                border: `1px solid ${project.color}30`,
                color: project.color,
                cursor: 'none',
              }}
            >
              <FiExternalLink size={15} />
              Live Demo
            </motion.a>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

// ===== Featured Case Study =====
const CaseStudy = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-20 rounded-3xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(0,229,255,0.15)',
        boxShadow: '0 40px 100px rgba(0,229,255,0.08)',
      }}
    >
      <div className="grid lg:grid-cols-2">
        {/* Left — Info */}
        <div className="p-10 lg:p-14 flex flex-col gap-8">
          <div>
            <div className="tag mb-4">🌟 Featured Project</div>
            <h3
              className="text-4xl font-bold mb-2"
              style={{ fontFamily: 'var(--font-grotesk)', color: 'var(--primary)' }}
            >
              {project.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>{project.subtitle}</p>
          </div>

          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {project.longDescription}
          </p>

          {/* Stats */}
          {project.stats && (
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(project.stats).map(([key, val]) => (
                <div
                  key={key}
                  className="text-center p-4 rounded-xl"
                  style={{
                    background: 'rgba(0,229,255,0.05)',
                    border: '1px solid rgba(0,229,255,0.15)',
                  }}
                >
                  <div
                    className="text-2xl font-bold"
                    style={{ fontFamily: 'var(--font-grotesk)', color: 'var(--primary)' }}
                  >
                    {val}
                  </div>
                  <div
                    className="text-xs capitalize mt-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {key}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 rounded-full font-mono"
                style={{
                  background: 'rgba(0,229,255,0.08)',
                  border: '1px solid rgba(0,229,255,0.2)',
                  color: 'var(--primary)',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
              style={{ cursor: 'none' }}
            >
              <FiGithub size={15} />
              <span>View Code</span>
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
              style={{ cursor: 'none' }}
            >
              <span>Live Demo</span>
              <FiExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Right — Case Study */}
        <div
          className="p-10 lg:p-14 flex flex-col gap-8"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Problem */}
          <div>
            <div
              className="text-xs font-mono uppercase tracking-widest mb-3"
              style={{ color: 'var(--primary)' }}
            >
              01 / Problem
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div>
            <div
              className="text-xs font-mono uppercase tracking-widest mb-3"
              style={{ color: '#A78BFA' }}
            >
              02 / Solution
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {project.solution}
            </p>
          </div>

          {/* Challenges */}
          <div>
            <div
              className="text-xs font-mono uppercase tracking-widest mb-3"
              style={{ color: '#FFE66D' }}
            >
              03 / Key Challenges
            </div>
            <div className="grid grid-cols-2 gap-2">
              {project.challenges?.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: 'var(--primary)' }}
                  />
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Learnings */}
          <div>
            <div
              className="text-xs font-mono uppercase tracking-widest mb-3"
              style={{ color: '#4ECDC4' }}
            >
              04 / Key Learnings
            </div>
            <div className="grid grid-cols-2 gap-2">
              {project.learnings?.map((l) => (
                <div
                  key={l}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: '#4ECDC4' }}
                  />
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const featuredProject = PROJECTS.find((p) => p.featured);
  const otherProjects = PROJECTS.filter((p) => !p.featured);

  useEffect(() => {
    gsap.from('.projects-heading', {
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
    <section id="projects" ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 projects-heading">
          <div className="section-label">Featured Work</div>
          <h2 className="section-title">
            Projects That{' '}
            <span className="gradient-text">Ship</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Real-world applications built with production-grade architecture and modern engineering practices.
          </p>
        </div>

        {/* Featured Case Study */}
        {featuredProject && <CaseStudy project={featuredProject} />}

        {/* Other Projects Grid */}
        <div className="mb-8">
          <h3
            className="text-xl font-bold mb-8"
            style={{ fontFamily: 'var(--font-grotesk)', color: 'var(--text-secondary)' }}
          >
            More Projects
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Want to see more? Check out my GitHub for all repositories.
          </p>
          <motion.a
            href="https://github.com/abhishek-kumar"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              cursor: 'none',
            }}
          >
            <FiGithub size={20} />
            View GitHub Profile
            <FiArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
