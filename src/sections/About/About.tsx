'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';
import { ABOUT_CARDS } from '@/constants';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface JourneyItem {
  year: string;
  title: string;
  description: string;
}

const JOURNEY: JourneyItem[] = [
  {
    year: '2023',
    title: 'Competitive Programming & Core DSA',
    description: 'Began solving algorithmic problems in C++. Formed a deep understanding of trees, graphs, sorting models, and space-time optimizations.',
  },
  {
    year: '2024',
    title: 'Full Stack Web Architectures',
    description: 'Transitioned to web development. Built multiple full-stack applications using Node.js, Express, React, and MongoDB, scaling real-time engines.',
  },
  {
    year: '2025',
    title: 'CSV Query Compiler',
    description: 'Developed a high-performance compiler translating SQL queries to Python, implementing AST parsing, tokenizing, and an interactive IDE.',
  },
  {
    year: '2026',
    title: 'CodePrepX Compiler Runtimes',
    description: 'Currently designing sandboxed execution microservices in Go and Docker to run user compilations securely, with latency under 150ms.',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Timeline line growth animation
    const progressLine = lineRef.current;
    if (progressLine && triggerRef.current) {
      gsap.fromTo(
        progressLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top 75%',
            end: 'bottom 70%',
            scrub: true,
          },
        }
      );

      // Milestone points pop-in & glow
      const milestones = document.querySelectorAll('.milestone-node');
      milestones.forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0.6, opacity: 0.3, filter: 'brightness(0.5)' },
          {
            scale: 1.15,
            opacity: 1,
            filter: 'brightness(1.5)',
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: node,
              start: 'top 80%',
              end: 'top 55%',
              scrub: true,
            },
          }
        );
      });

      // Milestone text fade reveals
      const texts = document.querySelectorAll('.milestone-text');
      texts.forEach((text) => {
        gsap.fromTo(
          text,
          { y: 30, opacity: 0, filter: 'blur(4px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.6,
            scrollTrigger: {
              trigger: text,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label">// BIOGRAPHY</div>
          <h2 className="section-title">
            Who I <span className="gradient-text">Am</span>
          </h2>
          <p className="mt-4 text-sm md:text-base max-w-xl mx-auto text-text-secondary">
            Driven by curiosity, algorithms, and the ambition to design performant digital experiences.
          </p>
        </div>

        {/* Main Grid Info */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-28">
          
          {/* Avatar Graphic */}
          <div className="relative flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              
              {/* Spinning Conic Gradient Ring */}
              <div
                className="absolute -inset-4 rounded-full animate-spin-slow opacity-25"
                style={{
                  background:
                    'conic-gradient(from 0deg, var(--primary), var(--secondary), transparent, var(--primary))',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMask:
                    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'xor',
                  padding: '2px',
                }}
              />

              {/* Avatar Shield */}
              <div className="w-full h-full rounded-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-tr from-surface to-card border border-white/5 shadow-2xl">
                <div className="text-7xl mb-2 select-none">👨‍💻</div>
                <div className="text-[10px] font-mono text-primary-light uppercase tracking-widest">
                  &lt;systems_engineer /&gt;
                </div>

                <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-secondary/10 blur-[15px] animate-pulse-slow" />
              </div>

              {/* Badges */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-3 top-8 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold border border-primary/20 bg-primary/5 text-primary-light backdrop-blur-md"
              >
                ⚡ Active Coder
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -left-3 bottom-12 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold border border-secondary/20 bg-secondary/5 text-secondary-light backdrop-blur-md"
              >
                🔥 B.Tech CSE '26
              </motion.div>

            </div>
          </div>

          {/* Bio Text */}
          <div className="flex flex-col gap-4 text-text-secondary text-sm md:text-base leading-relaxed">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Designing platforms at the intersection of <span className="gradient-text">code & infrastructure</span>.
            </h3>
            <p>
              I am Abhishek Kumar, a Computer Science student currently in my 3rd year. My programming path began with competitive coding — building analytical systems and sorting complexes shaped my engineering mindset.
            </p>
            <p>
              I transitioned that technical foundation into building scalable full-stack applications. From handling websocket feeds to containerizing code compilations inside isolated Docker engines, I strive to write secure, optimized code.
            </p>
            
            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5">
              {[
                { label: 'Base', value: 'India' },
                { label: 'Education', value: 'B.Tech CSE' },
                { label: 'DSA Problems', value: '1200+ Solved' },
                { label: 'Platform Focus', value: 'Next.js / Docker / Go' },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#FB923C]">// {label}</span>
                  <span className="text-sm font-semibold text-white mt-0.5">{value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-28">
          {ABOUT_CARDS.map((card, i) => (
            <Tilt
              key={i}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={800}
              scale={1.02}
              transitionSpeed={600}
              glareEnable={true}
              glareMaxOpacity={0.05}
              glareColor={card.color}
              className="h-full"
            >
              <div
                className="h-full p-5 rounded-2xl border border-white/5 bg-card/30 flex flex-col gap-3.5 transition-all duration-300 relative group overflow-hidden"
                style={{ borderTop: `2px solid ${card.color}35` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${card.color}30`;
                  e.currentTarget.style.boxShadow = `0 15px 30px ${card.color}08`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Icon box */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{
                    background: `${card.color}10`,
                    border: `1px solid ${card.color}25`,
                  }}
                >
                  {card.icon}
                </div>
                
                <h4 className="font-bold text-sm text-white tracking-tight">
                  {card.title}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed flex-1">
                  {card.description}
                </p>
                
                <div
                  className="h-[2px] w-6 rounded-full transition-all duration-300 group-hover:w-full"
                  style={{ background: `linear-gradient(to right, ${card.color}, transparent)` }}
                />
              </div>
            </Tilt>
          ))}
        </div>

        {/* Journey Vertical Timeline */}
        <div className="pt-10">
          <div className="text-center mb-16">
            <div className="section-label">// MILESTONES</div>
            <h3 className="section-title text-2xl md:text-3xl font-bold">
              Engineering <span className="gradient-text">Journey</span>
            </h3>
          </div>

          {/* Timeline triggering space */}
          <div ref={triggerRef} className="relative max-w-xl mx-auto px-4 md:px-0">
            {/* Background line */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5" />
            
            {/* Animated growing progress line */}
            <div
              ref={lineRef}
              className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-light to-secondary origin-top transform scale-y-0"
            />

            {/* Journey Items */}
            <div className="space-y-16">
              {JOURNEY.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center">
                    
                    {/* Node Dot on line */}
                    <div className="milestone-node absolute left-6 md:left-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full border-2 border-surface bg-[#0A0A0A] flex items-center justify-center z-10">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: index % 2 === 0 ? 'var(--primary-light)' : 'var(--secondary)' }}
                      />
                    </div>

                    {/* Content Box */}
                    <div className={`milestone-text w-full md:w-[45%] pl-12 md:pl-0 ${
                      isEven ? 'md:text-right md:pr-12 md:ml-0' : 'md:text-left md:pl-12 md:ml-auto'
                    }`}>
                      <div className={`inline-block glass rounded-2xl p-5 bg-[#111111]/30 max-w-sm border-white/5`}>
                        <span className="font-mono text-xs font-black text-secondary mb-1 block">
                          {item.year}
                        </span>
                        <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">
                          {item.title}
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
