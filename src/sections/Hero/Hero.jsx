import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ROLES } from '../../constants';
import HeroScene3D from '../../components/three/HeroScene3D';
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { HiOutlineArrowRight } from 'react-icons/hi';

const TYPING_SPEED = 65;
const DELETING_SPEED = 35;
const PAUSE = 1800;

const Hero = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.from(headingRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
      .from(subtitleRef.current, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout;

    if (!isDeleting && displayText !== currentRole) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, TYPING_SPEED);
    } else if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE);
    } else if (isDeleting && displayText !== '') {
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, DELETING_SPEED);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="section-container w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* LEFT — Text Content */}
          <div className="flex flex-col gap-8 z-10">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="tag">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for Internships & Opportunities
              </div>
            </motion.div>

            {/* Main heading */}
            <div ref={headingRef}>
              <div
                className="text-sm font-mono mb-3"
                style={{ color: 'var(--text-secondary)', letterSpacing: '0.1em' }}
              >
                Hi, I'm
              </div>
              <h1
                className="font-bold leading-none tracking-tight mb-4"
                style={{
                  fontFamily: 'var(--font-grotesk)',
                  fontSize: 'clamp(52px, 7vw, 88px)',
                  letterSpacing: '-0.03em',
                }}
              >
                Abhishek
                <br />
                <span className="gradient-text">Kumar</span>
              </h1>

              {/* Typewriter */}
              <div
                className="text-xl lg:text-2xl font-medium"
                style={{ fontFamily: 'var(--font-grotesk)', color: 'var(--text-secondary)' }}
              >
                <span style={{ color: 'var(--primary)' }}>{displayText}</span>
                <span
                  className="inline-block w-0.5 h-6 ml-1 align-middle animate-pulse"
                  style={{ background: 'var(--primary)' }}
                />
              </div>
            </div>

            {/* Description */}
            <p
              ref={subtitleRef}
              className="text-base lg:text-lg leading-relaxed max-w-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              Passionate B.Tech student building{' '}
              <span style={{ color: 'white' }}>scalable web applications</span>, solving
              algorithmic challenges with{' '}
              <span style={{ color: 'white' }}>1000+ problems</span> solved, and creating
              modern digital experiences that leave an impression.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <button
                onClick={scrollToProjects}
                className="btn-primary"
                style={{ cursor: 'none' }}
              >
                <span>View Projects</span>
                <HiOutlineArrowRight size={16} />
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ cursor: 'none' }}
              >
                <span>Download Resume</span>
              </a>
              <button
                onClick={scrollToContact}
                className="btn-secondary"
                style={{ cursor: 'none' }}
              >
                <span>Contact Me</span>
              </button>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Find me on
              </span>
              <div className="flex gap-3">
                {[
                  { icon: FiGithub, url: 'https://github.com/abhishek-kumar', label: 'GitHub' },
                  { icon: FiLinkedin, url: 'https://linkedin.com/in/abhishek-kumar', label: 'LinkedIn' },
                  { icon: FiMail, url: 'mailto:abhishek@example.com', label: 'Email' },
                ].map(({ icon: Icon, url, label }) => (
                  <motion.a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'var(--text-secondary)',
                      cursor: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)';
                      e.currentTarget.style.color = 'var(--primary)';
                      e.currentTarget.style.background = 'rgba(0,229,255,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 pt-2">
              {[
                { value: '15+', label: 'Projects' },
                { value: '1K+', label: 'Problems Solved' },
                { value: '3rd', label: 'Year B.Tech' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div
                    className="text-2xl font-bold"
                    style={{ fontFamily: 'var(--font-grotesk)', color: 'var(--primary)' }}
                  >
                    {value}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — 3D Scene */}
          <div className="relative h-[500px] lg:h-[600px] z-10">
            <HeroScene3D />
            {/* Decorative elements */}
            <div
              className="absolute bottom-8 right-0 px-4 py-3 rounded-xl text-sm"
              style={{
                background: 'rgba(5,8,22,0.8)',
                border: '1px solid rgba(0,229,255,0.2)',
                backdropFilter: 'blur(10px)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span style={{ color: 'var(--primary)' }}>const</span> abhishek ={'{'}&nbsp;
              <br />
              &nbsp;&nbsp;role:{' '}
              <span style={{ color: '#FFE66D' }}>"Full Stack Dev"</span>
              <br />
              &nbsp;&nbsp;dsa:{' '}
              <span style={{ color: '#A8E6CF' }}>true</span>
              <br />
              {'}'}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span
            className="text-xs tracking-widest"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
          >
            SCROLL
          </span>
          <FiArrowDown style={{ color: 'var(--primary)' }} size={16} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
