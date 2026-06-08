'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ROLES } from '@/constants';
import dynamic from 'next/dynamic';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
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
      className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-bg"
    >
      {/* Background neon blobs */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none" />



      <div className="section-container w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Panel: Text & CTAs */}
          <div className="flex flex-col gap-6 z-10">
            
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="tag tag-orange border-orange-500/20 bg-orange-500/5 text-orange-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                Open to Internships & Engineering Roles
              </div>
            </motion.div>

            {/* Title block */}
            <div ref={headingRef}>

              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-4 uppercase font-sans select-none">
                Abhishek
                <br />
                <span className="text-stroke bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 font-black">
                  Kumar
                </span>
              </h1>

              {/* Typewriter */}
              <div className="text-sm md:text-base font-mono min-h-[30px] flex items-center tracking-wider text-neutral-300">
                <span className="text-orange-500 mr-2.5 font-bold">&gt;_</span>
                <span className="text-white font-bold">{displayText}</span>
                <span className="inline-block w-1.5 h-4 ml-1 bg-purple-500 animate-pulse shadow-[0_0_6px_#A855F7]" />
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
              <span className="text-orange-400 font-bold">1200+ solved algorithmic challenges</span> across standard profiles.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-3.5 items-center">
              <button
                onClick={() => handleScroll('projects')}
                className="btn-primary cursor-none border-purple-500/30 bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300"
              >
                <span>Explore Works</span>
                <HiOutlineArrowRight size={15} />
              </button>
              <button
                onClick={() => handleScroll('contact')}
                className="btn-secondary cursor-none border-orange-500/20 text-orange-400 hover:border-orange-500/40 hover:bg-orange-500/5"
              >
                <span>Get In Touch</span>
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary cursor-none text-xs border-orange-500/20 text-orange-400 hover:border-orange-500/40 hover:bg-orange-500/5"
              >
                <span>Resume</span>
              </a>
            </div>

            {/* Social profiles */}
            <div className="flex items-center gap-4 pt-2">

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

          {/* Right Panel: WebGL Scene with Scoping Rings & IDE */}
          <div className="relative w-full h-[450px] lg:h-[550px] flex items-center justify-center">
            
            {/* Concentric rotating scoping rings (HTML/CSS overlays) */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 select-none scale-[0.82] md:scale-100">
              <div className="relative w-[380px] h-[380px] md:w-[460px] md:h-[460px] flex items-center justify-center">
                
                {/* Ring 1: Outer Dashed Scope (Purple) */}
                <div className="absolute w-full h-full border border-dashed border-purple-500/10 rounded-full animate-spin-slow" />
                
                {/* Ring 2: Telemetry Tick Ring */}
                <div className="absolute w-[92%] h-[92%] border border-purple-500/10 rounded-full animate-spin-reverse-slow">
                  <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[6px] font-mono text-purple-400/40">00°</span>
                  <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[6px] font-mono text-purple-400/40">90°</span>
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[6px] font-mono text-purple-400/40">180°</span>
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[6px] font-mono text-purple-400/40">270°</span>
                </div>
                
                {/* Ring 3: Inner Solid Scope (Orange) */}
                <div className="absolute w-[80%] h-[80%] border border-orange-500/10 rounded-full animate-spin-fast" />
                
                {/* Crosshair Target Locked overlay */}
                <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 flex items-center gap-1.5 font-mono text-[7px] text-orange-400/60 tracking-widest whitespace-nowrap bg-[#0A0A0A]/95 px-2.5 py-0.5 border border-orange-500/20 rounded">
                  <span className="w-1 h-1 rounded-full bg-orange-400 animate-ping" />
                  <span>CORE_LOCK_A // ON</span>
                </div>
              </div>
            </div>

            {/* 3D Canvas */}
            <div className="w-full h-full z-10 relative">
              <HeroScene3D />
            </div>
            
            {/* Holographic Developer IDE Console */}
            <div className="absolute bottom-2 right-2 sm:right-6 p-4 rounded-xl border border-white/5 bg-[#0D0D0D]/90 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md font-mono text-[9px] relative overflow-hidden select-none z-20 w-[240px] md:w-[270px] hover:border-purple-500/20 transition-colors duration-300">
              {/* Editor top header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2.5 text-[8px] text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <div className="w-2 h-2 rounded-full bg-green-500/60" />
                  
                  {/* File tab */}
                  <div className="ml-2 px-1.5 py-0.5 border border-white/5 bg-white/[0.02] rounded text-neutral-300 flex items-center gap-1">
                    <span>engineer.json</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-[7px] text-purple-400">
                  <span>JSON</span>
                </div>
              </div>

              {/* Editor code area */}
              <div className="flex gap-3 text-left">
                <div className="flex flex-col text-neutral-600 text-right select-none w-3 font-mono">
                  <span>01</span>
                  <span>02</span>
                  <span>03</span>
                  <span>04</span>
                  <span>05</span>
                </div>
                <div className="text-neutral-400 w-full font-mono">
                  <div>{'{'}</div>
                  <div>&nbsp;&nbsp;<span className="text-purple-400">"name"</span>: <span className="text-orange-400">"Abhishek Kumar"</span>,</div>
                  <div>&nbsp;&nbsp;<span className="text-purple-400">"focus"</span>: <span className="text-orange-400">"Full Stack / Systems"</span>,</div>
                  <div>&nbsp;&nbsp;<span className="text-purple-400">"solved"</span>: <span className="text-orange-400">"1200+ DSA"</span>,</div>
                  <div>&nbsp;&nbsp;<span className="text-purple-400">"status"</span>: <span className="text-orange-400">"Open for Roles"</span></div>
                  <div>{'}'}</div>
                </div>
              </div>

              {/* Editor live logs footer */}
              <div className="border-t border-white/5 pt-2 mt-2.5 text-[7px] text-neutral-500 flex flex-col gap-0.5">
                <span className="text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_4px_#10b981]" /> Live Telemetry
                </span>
                <span>&gt; compiling sandbox environment... done</span>
                <span>&gt; connection link: nominal (V8)</span>
              </div>
            </div>

          </div>

        </div>


      </div>
    </section>
  );
}
