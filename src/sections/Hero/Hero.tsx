'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ROLES } from '@/constants';
import dynamic from 'next/dynamic';
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { HiOutlineArrowRight } from 'react-icons/hi';

// Dynamically load the WebGL scene to isolate Three.js canvas on the client side
const HeroScene3D = dynamic(() => import('@/components/three/HeroScene3D'), { ssr: false });

const TYPING_SPEED = 60;
const DELETING_SPEED = 30;
const PAUSE = 1600;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // GSAP Entrance timeline
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
      .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
  }, []);

  // Typewriter loop
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

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

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background neon blobs */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />

      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
          
          {/* Left Panel: Text & CTAs */}
          <div className="flex flex-col gap-6 z-10">
            
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="tag tag-orange">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Open to Internships & Engineering Roles
              </div>
            </motion.div>

            {/* Title block */}
            <div ref={headingRef}>
              <div className="text-xs font-mono mb-2 tracking-widest text-text-secondary uppercase">
                // Hello, World. I am
              </div>
              <h1 className="section-title mb-3 leading-none">
                Abhishek
                <br />
                <span className="gradient-text">Kumar</span>
              </h1>

              {/* Typewriter */}
              <div className="text-lg md:text-xl font-mono min-h-[30px] flex items-center">
                <span className="text-text-secondary mr-2">&gt;</span>
                <span className="text-primary-light font-bold">{displayText}</span>
                <span className="inline-block w-1.5 h-5 ml-1 bg-secondary animate-pulse" />
              </div>
            </div>

            {/* Description */}
            <p
              ref={subtitleRef}
              className="text-sm md:text-base leading-relaxed text-text-secondary max-w-lg"
            >
              A systems engineer and full-stack developer specializing in building{' '}
              <span className="text-white font-semibold">isolated execution runtimes</span> and{' '}
              <span className="text-white font-semibold">highly interactive interfaces</span>. Backed by{' '}
              <span className="text-secondary-light font-bold">1200+ solved algorithmic challenges</span> across standard profiles.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-3.5 items-center">
              <button
                onClick={() => handleScroll('projects')}
                className="btn-primary cursor-none"
              >
                <span>Explore Works</span>
                <HiOutlineArrowRight size={15} />
              </button>
              <button
                onClick={() => handleScroll('contact')}
                className="btn-secondary cursor-none"
              >
                <span>Get In Touch</span>
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary cursor-none text-xs"
              >
                <span>Resume</span>
              </a>
            </div>

            {/* Social profiles */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-mono text-text-secondary">
                // CONNECT
              </span>
              <div className="flex gap-2.5">
                {[
                  { icon: FiGithub, url: 'https://github.com/abhishek-kumar', label: 'GitHub', color: '#A855F7' },
                  { icon: FiLinkedin, url: 'https://linkedin.com/in/abhishek-kumar', label: 'LinkedIn', color: '#FB923C' },
                  { icon: FiMail, url: 'mailto:abhishek@example.com', label: 'Email', color: '#A855F7' },
                ].map(({ icon: Icon, url, label, color }) => (
                  <motion.a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/5 bg-white/[0.02] text-neutral-400 hover:text-white transition-colors duration-300 cursor-none"
                    style={{ borderColor: 'var(--border)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${color}40`;
                      e.currentTarget.style.background = `${color}08`;
                      e.currentTarget.style.color = color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      e.currentTarget.style.color = '#A3A3A3';
                    }}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Panel: WebGL Scene */}
          <div className="relative w-full h-[450px] lg:h-[550px] flex items-center justify-center">
            <HeroScene3D />
            
            {/* Holographic terminal card */}
            <div className="absolute bottom-6 right-2 sm:right-6 p-4 rounded-xl border border-white/5 bg-[#0A0A0A]/95 shadow-2xl backdrop-blur-md font-mono text-[10px] text-text-secondary select-none">
              <span className="text-primary-light">const</span> engineer = {'{'}
              <br />
              &nbsp;&nbsp;name: <span className="text-secondary-light">"Abhishek Kumar"</span>,
              <br />
              &nbsp;&nbsp;focus: <span className="text-secondary-light">"Full Stack / Systems"</span>,
              <br />
              &nbsp;&nbsp;dsa_solved: <span className="text-primary-light">1200</span>
              <br />
              {'}'};
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          onClick={() => handleScroll('about')}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-none"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[9px] font-mono tracking-[0.25em] text-text-secondary">
            SCROLL
          </span>
          <FiArrowDown className="text-secondary" size={14} />
        </motion.div>
      </div>
    </section>
  );
}
