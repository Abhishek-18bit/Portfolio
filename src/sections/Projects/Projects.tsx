'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';
import { PROJECTS } from '@/constants';
import { Project } from '@/types';
import { FiGithub, FiExternalLink, FiArrowRight, FiCpu, FiTerminal, FiDatabase, FiGrid } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      perspective={1000}
      scale={1.03}
      transitionSpeed={800}
      glareEnable={true}
      glareMaxOpacity={0.03}
      glareColor={project.color}
      className="h-[370px] w-full"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.5 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* The 3D Flipping Card Container */}
        <div
          className="w-full h-full rounded-2xl p-[1px] relative transition-transform duration-700 cursor-none"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.5s ease',
            transform: hovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
            background: hovered
              ? `linear-gradient(to bottom, ${project.color}60, transparent)`
              : 'linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)',
          }}
        >
          {/* FRONT FACE */}
          <div
            className="absolute inset-[1px] rounded-[15px] overflow-hidden bg-[#111113]/95 flex flex-col select-none"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* Glowing Indicator Dot at top center */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse transition-all duration-500"
                style={{
                  backgroundColor: project.color,
                  boxShadow: `0 0 10px ${project.color}, 0 0 20px ${project.color}`,
                }}
              />
            </div>

            {/* Front Face Ambient Glow Orb */}
            <div
              className="absolute right-0 bottom-0 w-32 h-32 rounded-full blur-[50px] pointer-events-none opacity-20 z-0"
              style={{
                background: `radial-gradient(circle, ${project.color}15 0%, transparent 70%)`,
                transform: 'translate(10%, 10%) translateZ(5px)',
              }}
            />

            {/* Mock UI Preview (Front Only) */}
            <div
              className="relative h-40 flex items-center justify-center border-b border-white/5 z-10"
              style={{
                background: `linear-gradient(135deg, ${project.color}05, rgba(124, 58, 237, 0.01))`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Simulated Browser Card */}
              <div className="absolute inset-0 flex items-center justify-center p-5 select-none" style={{ transformStyle: 'preserve-3d' }}>
                <div
                  className={`w-full transition-all duration-500 scale-[1.02] ${
                    project.id === 2 ? 'max-w-[245px]' : 'max-w-[210px]'
                  }`}
                  style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
                >
                  {/* 1. CSV Query Compiler Card (id: 2) */}
                  {project.id === 2 && (
                    <div className="w-full h-[125px] rounded-lg border bg-[#08090C] shadow-2xl overflow-hidden flex flex-col transition-all duration-300 relative" style={{ borderColor: `${project.color}35`, boxShadow: `0 10px 25px -5px ${project.color}15` }}>
                      <div className="flex items-center justify-between px-2 py-1 bg-[#0D0F14] border-b border-white/5 z-10">
                        <div className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-[#EF4444]/80" />
                          <span className="w-1 h-1 rounded-full bg-[#F59E0B]/80" />
                          <span className="w-1 h-1 rounded-full bg-[#10B981]/80" />
                          <span className="ml-1.5 text-[#94A3B8] font-bold text-[5.5px] flex items-center gap-1 font-mono">
                            compiler.app
                          </span>
                        </div>
                        <span className="px-1 py-0.2 rounded bg-sky-500/10 text-sky-400 text-[4.5px] font-mono">LIVE PREVIEW</span>
                      </div>
                      <div className="flex-1 relative overflow-hidden bg-black/40">
                        <img
                          src="/csv-compiler.jpg"
                          alt="CSV Query Compiler"
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                      </div>
                    </div>
                  )}

                  {/* 2. CodeElevate Card (id: 3) */}
                  {project.id === 3 && (
                    <div className="w-full h-[125px] rounded-lg border bg-[#080B10] shadow-2xl overflow-hidden flex flex-col font-sans text-[6px] transition-all duration-300" style={{ borderColor: `${project.color}35`, boxShadow: `0 10px 25px -5px ${project.color}15` }}>
                      <div className="flex items-center justify-between px-2 py-1 bg-[#0D1117] border-b border-white/5">
                        <div className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-[#EF4444]/80" />
                          <span className="w-1 h-1 rounded-full bg-[#F59E0B]/80" />
                          <span className="w-1 h-1 rounded-full bg-[#10B981]/80" />
                          <span className="ml-1 text-neutral-400 font-mono text-[5.5px]">codeelevate.edu/editor</span>
                        </div>
                        <span className="px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 text-[4.5px] font-mono font-semibold">SANDBOX ACTIVE</span>
                      </div>

                      <div className="flex-grow grid grid-cols-[0.8fr_1.2fr] divide-x divide-white/5 overflow-hidden">
                        <div className="p-2 flex flex-col justify-between bg-[#080C14]">
                          <div className="flex flex-col gap-1">
                            <span className="font-bold text-white text-[7px] leading-tight">Reverse String</span>
                            <span className="text-neutral-400 text-[5px] leading-relaxed">
                              Write a function that reverses an input string in-place.
                            </span>
                          </div>

                          <div className="flex flex-col gap-1 pt-1.5 border-t border-white/5">
                            <div className="flex justify-between items-center text-[4.5px]">
                              <span className="text-neutral-500 font-mono">Module 3 / Recursion</span>
                              <span className="text-emerald-400 font-bold">85% Done</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
                            </div>
                          </div>
                        </div>

                        <div className="p-2 flex flex-col justify-between bg-[#05070B] font-mono text-[5px] leading-relaxed text-neutral-300">
                          <div className="space-y-0.5">
                            <div>
                              <span className="text-purple-400 font-semibold">function</span> <span className="text-emerald-400">reverse</span>(s) {'{'}
                            </div>
                            <div className="pl-2.5 text-neutral-400">// Two pointer strategy</div>
                            <div className="pl-2.5">
                              <span className="text-purple-400">let</span> [i, j] = [0, s.length - 1];
                            </div>
                            <div className="pl-2.5">
                              <span className="text-purple-400">while</span> (i &lt; j) {'{'}
                            </div>
                            <div className="pl-5 text-neutral-400">[s[i], s[j]] = [s[j], s[i]];</div>
                            <div className="pl-5 text-neutral-400">i++; j--;</div>
                            <div className="pl-2.5">{'}'}</div>
                            <div>{'}'}</div>
                          </div>

                          <div className="flex items-center justify-between p-1 rounded border" style={{ backgroundColor: `${project.color}12`, borderColor: `${project.color}25`, color: project.color }}>
                            <span className="font-bold flex items-center gap-0.5">🟢 All 12/12 Tests Passed</span>
                            <span className="font-mono opacity-80 text-[4px]">Runtime: 4ms</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. AlgoViz Pro Card (id: 4) */}
                  {project.id === 4 && (
                    <div className="w-full h-[125px] rounded-lg border bg-[#0B0A08] shadow-2xl overflow-hidden flex flex-col font-sans text-[6px] transition-all duration-300" style={{ borderColor: `${project.color}35`, boxShadow: `0 10px 25px -5px ${project.color}15` }}>
                      <div className="flex items-center justify-between px-2 py-1 bg-[#14120F] border-b border-white/5">
                        <div className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-[#EF4444]/80" />
                          <span className="w-1 h-1 rounded-full bg-[#F59E0B]/80" />
                          <span className="w-1 h-1 rounded-full bg-[#10B981]/80" />
                          <span className="ml-1 text-neutral-400 font-mono text-[5.5px]">algoviz.pro/sorting</span>
                        </div>
                        <span className="px-1 py-0.2 rounded bg-amber-500/10 text-amber-400 font-mono text-[4.5px]">Quick Sort</span>
                      </div>
                      <div className="p-2 flex flex-col justify-between flex-grow h-[100px]">
                        <div className="flex items-end justify-between h-[45px] px-2 bg-black/40 rounded border border-white/5 py-1">
                          {[
                            { h: 30, active: false },
                            { h: 15, active: false },
                            { h: 42, active: true },
                            { h: 22, active: false },
                            { h: 48, active: true },
                            { h: 10, active: false },
                            { h: 35, active: false },
                            { h: 26, active: false },
                          ].map((bar, idx) => (
                            <div
                              key={idx}
                              className="w-2.5 rounded-t transition-all duration-300"
                              style={{
                                height: `${bar.h}%`,
                                background: bar.active ? 'linear-gradient(to top, #EF4444, #FB923C)' : 'linear-gradient(to top, #4B5563, #9CA3AF)',
                              }}
                            />
                          ))}
                        </div>

                        <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-1 rounded font-mono">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-neutral-500 text-[4.5px]">COMPARING INDICES</span>
                            <span className="text-amber-400 font-bold text-[5px]">i = 2 (val: 42) ➔ j = 4 (val: 48)</span>
                          </div>
                          <div className="text-right">
                            <span className="text-neutral-500 text-[4.5px] block">SWAPS</span>
                            <span className="text-emerald-400 font-bold text-[5px]">14</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. EduStream Card (id: 5) */}
                  {project.id === 5 && (
                    <div className="w-full h-[125px] rounded-lg border bg-[#0B090E] shadow-2xl overflow-hidden flex flex-col font-sans text-[6px] transition-all duration-300" style={{ borderColor: `${project.color}35`, boxShadow: `0 10px 25px -5px ${project.color}15` }}>
                      <div className="flex items-center justify-between px-2 py-1 bg-[#130F1A] border-b border-white/5">
                        <div className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-[#EF4444]/80" />
                          <span className="w-1 h-1 rounded-full bg-[#F59E0B]/80" />
                          <span className="w-1 h-1 rounded-full bg-[#10B981]/80" />
                          <span className="ml-1 text-neutral-400 font-mono text-[5.5px]">edustream.io/player</span>
                        </div>
                      </div>

                      <div className="flex-1 grid grid-cols-[1.2fr_0.8fr] divide-x divide-white/5 overflow-hidden">
                        <div className="p-2 flex flex-col gap-1 justify-between bg-black">
                          <div className="relative flex-1 rounded bg-[#1A1A1A] border border-white/5 flex items-center justify-center overflow-hidden">
                            <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/35 flex items-center justify-center text-purple-300 font-bold text-[8px] animate-pulse">
                              ▶
                            </div>
                          </div>
                        </div>

                        <div className="p-1.5 flex flex-col gap-1 bg-[#09070C]">
                          <span className="text-[4.5px] text-neutral-500 font-mono">Chapters</span>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1 text-emerald-400 leading-none">
                              <span>✔</span>
                              <span className="text-[4px] font-bold truncate">1. Introduction</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. WeatherAI Card (id: 6) */}
                  {project.id === 6 && (
                    <div className="w-full h-[125px] rounded-lg border bg-[#090B0D] shadow-2xl overflow-hidden flex flex-col font-sans text-[6px] transition-all duration-300" style={{ borderColor: `${project.color}35`, boxShadow: `0 10px 25px -5px ${project.color}15` }}>
                      <div className="flex items-center justify-between px-2 py-1 bg-[#101317] border-b border-white/5">
                        <div className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-[#EF4444]/80" />
                          <span className="w-1 h-1 rounded-full bg-[#F59E0B]/80" />
                          <span className="w-1 h-1 rounded-full bg-[#10B981]/80" />
                          <span className="ml-1 text-neutral-400 font-mono text-[5.5px]">weather_ai_predict</span>
                        </div>
                      </div>

                      <div className="flex-1 grid grid-cols-[1.1fr_0.9fr] divide-x divide-white/5 overflow-hidden">
                        <div className="p-2 flex flex-col justify-between bg-[#08090C]">
                          <div className="flex items-center justify-between">
                            <span className="text-[#EF4444] font-bold text-[7px] leading-none">24°C</span>
                            <span className="text-[8px] leading-none">🌤</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-white text-[5px]">San Francisco</span>
                          </div>
                        </div>

                        <div className="p-2 flex flex-col gap-1 bg-[#060709] justify-between">
                          <div className="p-1 rounded bg-amber-500/5 border border-amber-500/10 text-[4.2px] text-neutral-300 leading-normal italic">
                            "Wind velocities increasing..."
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 6. Fallback */}
                  {project.id !== 2 && project.id !== 3 && project.id !== 4 && project.id !== 5 && project.id !== 6 && (
                    <div className="rounded-lg overflow-hidden bg-[#0A0A0A]/90 shadow-2xl border" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
                        <span className="ml-1 text-[7px] font-mono text-neutral-500">
                          {project.title.toLowerCase().replace(/\s+/g, '')}.ts
                        </span>
                      </div>
                      <div className="p-3 space-y-1.5 font-mono text-[7px]">
                        <div className="flex gap-1">
                          <span className="text-purple-400">const</span>
                          <span className="text-blue-400">spec</span>
                          <span className="text-white">=</span>
                          <span className="text-green-400">"{project.title}"</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Front Info Area */}
            <div className="p-5 flex flex-col justify-between flex-grow z-10" style={{ transformStyle: 'preserve-3d' }}>
              <div style={{ transform: 'translateZ(25px)' }}>
                <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block mb-1">
                  {project.category}
                </span>
                <h4 className="text-base font-bold mb-1 font-sans tracking-tight text-white">
                  {project.title}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                  {project.subtitle}
                </p>
              </div>

              {/* Bottom Hint */}
              <div className="flex items-center justify-between py-2 text-[9px] font-mono text-neutral-500 border-t border-white/5 pt-3 mt-auto">
                <span className="animate-pulse">Hover to reveal details</span>
                <span className="text-[10px]">➜</span>
              </div>
            </div>
          </div>

          {/* BACK FACE */}
          <div
            className="absolute inset-[1px] rounded-[15px] overflow-hidden bg-[#0C0C0E]/98 p-5 flex flex-col justify-between select-none z-10"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(1px)',
              transformStyle: 'preserve-3d',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* Back Face Ambient Glow Orb */}
            <div
              className="absolute right-0 bottom-0 w-36 h-36 rounded-full blur-[60px] pointer-events-none opacity-40 z-0"
              style={{
                background: `radial-gradient(circle, ${project.color}35 0%, transparent 75%)`,
                transform: 'translate(10%, 10%) translateZ(5px)',
              }}
            />

            <div className="flex flex-col gap-3 z-10" style={{ transform: 'translateZ(20px)' }}>
              <div>
                <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block mb-1">
                  {project.category}
                </span>
                <h4
                  className="text-base font-bold mb-1.5 transition-all duration-300 font-sans tracking-tight"
                  style={{
                    color: hovered ? '#FFFFFF' : '#FFFFFF',
                    textShadow: hovered ? `0 0 10px ${project.color}30` : 'none',
                  }}
                >
                  <span 
                    className="transition-all duration-300"
                    style={{
                      color: hovered ? project.color : '#FFFFFF',
                    }}
                  >
                    {project.title}
                  </span>
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 flex-1 items-end" style={{ transform: 'translateZ(20px)' }}>
                {project.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-mono px-2.5 py-0.5 rounded-full border transition-all duration-300"
                    style={{
                      borderColor: hovered ? `${project.color}30` : 'rgba(255, 255, 255, 0.05)',
                      backgroundColor: hovered ? `${project.color}08` : 'rgba(255, 255, 255, 0.02)',
                      color: hovered ? '#FFFFFF' : '#A3A3A3',
                      boxShadow: hovered ? `0 0 8px ${project.color}05` : 'none',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div
              className="flex gap-2.5 pt-3.5 border-t z-20"
              style={{ borderColor: 'rgba(255,255,255,0.05)', transform: 'translateZ(15px)' }}
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold flex-1 border border-white/5 hover:border-white/20 text-neutral-400 hover:text-white bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 scale-100 hover:scale-[1.02] active:scale-[0.98] cursor-none"
              >
                <FiGithub size={12} />
                Code
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold flex-1 transition-all duration-300 scale-100 hover:scale-[1.02] active:scale-[0.98] cursor-none"
                style={{
                  background: hovered ? project.color : `${project.color}15`,
                  border: hovered ? `1px solid ${project.color}` : `1px solid ${project.color}25`,
                  color: hovered ? '#0E0E0F' : project.color,
                  boxShadow: hovered ? `0 0 15px ${project.color}35` : 'none',
                }}
              >
                <FiExternalLink size={12} />
                Demo
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
}

// ===== High-Fidelity Recruiter Showcase Layout for Featured Project =====
interface CaseStudyProps {
  project: Project;
}

function CaseStudy({ project }: CaseStudyProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'metrics'>('overview');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-20 rounded-3xl glass bg-[#111111]/30"
      style={{
        border: '1px solid rgba(124, 58, 237, 0.15)',
        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(124, 58, 237, 0.02)',
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="grid lg:grid-cols-[1.12fr_0.88fr]" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* LEFT PANEL: 3D Code & System Architecture Mockups */}
        <Tilt
          tiltMaxAngleX={6}
          tiltMaxAngleY={6}
          perspective={1200}
          scale={1.01}
          transitionSpeed={800}
          glareEnable={true}
          glareMaxOpacity={0.03}
          glareColor="#A855F7"
          className="p-8 lg:p-12 flex flex-col justify-center gap-8 relative lg:rounded-l-3xl rounded-t-3xl"
          style={{
            background: 'radial-gradient(circle at 10% 10%, rgba(124, 58, 237, 0.03), transparent 50%)',
            borderRight: '1px solid rgba(255, 255, 255, 0.05)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Simulated 3D IDE Workspace */}
          <div
            className="rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-2xl overflow-hidden select-none"
            style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}
          >
            {/* Monaco IDE Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#111111] border-b border-white/5">
              <div className="flex items-center gap-1.5" style={{ transform: 'translateZ(10px)' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-3 text-[10px] font-mono text-neutral-400 flex items-center gap-1.5">
                  <FiTerminal size={10} /> sandbox_engine.go
                </span>
              </div>
              <div className="tag text-[9px] px-2 py-0.5 border-none bg-primary/10 text-primary-light font-mono" style={{ transform: 'translateZ(15px)' }}>
                ACTIVE
              </div>
            </div>

            {/* IDE Workspace body */}
            <div className="p-4 md:p-5 font-mono text-[10px] leading-relaxed text-neutral-300 space-y-2" style={{ transform: 'translateZ(20px)' }}>
              <div>
                <span className="text-purple-400">package</span> main
              </div>
              <div>
                <span className="text-purple-400">import</span> (
                <br />
                &nbsp;&nbsp;<span className="text-green-300">"github.com/docker/docker/client"</span>
                <br />
                &nbsp;&nbsp;<span className="text-green-300">"context"</span>
                <br />
                )
              </div>
              <div>
                <span className="text-purple-400">func</span> <span className="text-yellow-300">RunSandbox</span>(code <span className="text-blue-300">string</span>) <span className="text-blue-300">Result</span> {'{'}
                <br />
                &nbsp;&nbsp;ctx := context.<span className="text-yellow-300">Background</span>()
                <br />
                &nbsp;&nbsp;cli, _ := client.<span className="text-yellow-300">NewClientWithOpts</span>()
                <br />
                &nbsp;&nbsp;<span className="text-neutral-500">// Deploying isolated micro-containers...</span>
                <br />
                &nbsp;&nbsp;resp, _ := cli.<span className="text-yellow-300">ContainerCreate</span>(ctx, &container.Config{'{'}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;Image: <span className="text-green-300">"golang-sandbox"</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;Cmd:   []<span className="text-blue-300">string</span>{'{'}<span className="text-green-300">"run"</span>, code{'}'},
                <br />
                &nbsp;&nbsp;{'}'})
                <br />
                &nbsp;&nbsp;<span className="text-purple-400">return</span> Result{'{'}ExitCode: 0, Output: <span className="text-green-300">"Build OK"</span>{'}'}
                <br />
                {'}'}
              </div>
            </div>
          </div>

          {/* Core System Architecture Blueprint */}
          <div
            className="rounded-2xl border border-white/5 bg-[#161616]/40 p-5 font-mono text-xs text-neutral-400 space-y-3.5"
            style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
          >
            <div className="flex items-center gap-2 text-white font-bold pb-2 border-b border-white/5 text-[10px] uppercase tracking-wider" style={{ transform: 'translateZ(5px)' }}>
              <FiCpu className="text-primary-light" />
              <span>Sandbox Architecture Map</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-1 text-center" style={{ transform: 'translateZ(10px)' }}>
              <div className="flex-1 p-2.5 rounded-lg border border-primary/20 bg-primary/5 text-[9px]">
                <div className="font-bold text-white mb-0.5">Monaco Editor</div>
                <span className="text-[8px] opacity-75">React Client</span>
              </div>
              
              <div className="text-primary text-sm hidden sm:block">➔</div>
              
              <div className="flex-1 p-2.5 rounded-lg border border-white/5 bg-white/[0.01] text-[9px]">
                <div className="font-bold text-white mb-0.5">GraphQL Sub / Redis</div>
                <span className="text-[8px] opacity-75">Submission Queue</span>
              </div>
              
              <div className="text-primary text-sm hidden sm:block">➔</div>

              <div className="flex-1 p-2.5 rounded-lg border border-green-500/10 bg-green-500/5 text-[9px]">
                <div className="font-bold text-white mb-0.5">Docker Sandbox</div>
                <span className="text-[8px] opacity-75">Isolated Container</span>
              </div>
            </div>
          </div>
        </Tilt>

        {/* RIGHT PANEL: Tabbed Case Study Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-between gap-6 bg-[#111111]/25 lg:rounded-r-3xl rounded-b-3xl lg:rounded-bl-none">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="tag border-primary/30 text-primary-light bg-primary/10">Case Study</span>
              <span className="text-[9px] font-mono text-text-secondary uppercase tracking-widest">{project.category}</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
              {project.title}
            </h3>
            <p className="text-xs md:text-sm text-text-secondary mb-6">{project.subtitle}</p>

            {/* Showcase Section Tabs */}
            <div className="flex border-b border-white/5 gap-4 mb-6 select-none text-xs">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'architecture', label: 'Problem & Solution' },
                { id: 'metrics', label: 'System Details' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-2.5 font-semibold transition-all relative cursor-none ${
                    activeTab === tab.id ? 'text-white' : 'text-neutral-500'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="case-study-tab-line"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-light"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content switcher */}
            <div className="min-h-[180px]">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <p className="text-xs md:text-sm leading-relaxed text-text-secondary">
                      {project.longDescription}
                    </p>
                    {/* Performance metrics banner */}
                    {project.stats && (
                      <div className="grid grid-cols-3 gap-3 pt-2">
                        {Object.entries(project.stats).map(([k, v]) => (
                          <div key={k} className="p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                            <div className="text-lg font-bold text-white font-mono leading-none mb-1">
                              {v}
                            </div>
                            <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono">
                              {k}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'architecture' && (
                  <motion.div
                    key="architecture"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <div className="text-[9px] font-mono text-primary-light uppercase tracking-widest mb-1">// THE CHALLENGE</div>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <div className="text-[9px] font-mono text-secondary-light uppercase tracking-widest mb-1">// THE IMPLEMENTATION</div>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'metrics' && (
                  <motion.div
                    key="metrics"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    {project.challenges && (
                      <div>
                        <div className="text-[9px] font-mono text-primary-light uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                          <FiCpu size={10} /> 01 / Key Challenges Overcome
                        </div>
                        <ul className="text-xs text-text-secondary space-y-1 pl-4 list-disc">
                          {project.challenges.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {project.learnings && (
                      <div className="pt-1.5">
                        <div className="text-[9px] font-mono text-secondary-light uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                          <FiDatabase size={10} /> 02 / Engineering Takeaways
                        </div>
                        <ul className="text-xs text-text-secondary space-y-1 pl-4 list-disc">
                          {project.learnings.map((l, i) => (
                            <li key={i}>{l}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs flex items-center justify-center gap-2 cursor-none"
            >
              <FiGithub size={13} className="text-primary-light" />
              <span>Inspect Repositories</span>
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs flex items-center justify-center gap-2 cursor-none"
            >
              <span>Launch Live System</span>
              <FiExternalLink size={12} />
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredProject = PROJECTS.find((p) => p.featured);
  const otherProjects = PROJECTS.filter((p) => !p.featured);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.from('.projects-heading', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        
        {/* Header */}
        <div className="text-center mb-16 projects-heading">
          <div className="section-label">// WORKS</div>
          <h2 className="section-title">
            Projects That <span className="gradient-text">Ship</span>
          </h2>
          <p className="mt-4 text-sm md:text-base max-w-xl mx-auto text-text-secondary">
            Production-grade systems built with scalability, security, and exceptional visual design.
          </p>
        </div>

        {/* Featured Case Study */}
        {featuredProject && <CaseStudy project={featuredProject} />}

        {/* Other Projects Grid */}
        <div className="mb-8 pt-8">
          <div className="flex items-center gap-2 mb-8 select-none">
            <FiGrid className="text-primary-light" size={16} />
            <h3 className="text-base font-bold text-white tracking-wider uppercase font-mono">
              Further Project Archives
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>

        {/* GitHub Call To Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20 border-t border-white/5 pt-16"
        >
          <p className="mb-5 text-xs text-text-secondary">
            Want to explore all my source codes and active contributions?
          </p>
          <motion.a
            href="https://github.com/abhishek-kumar"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold border border-white/10 hover:border-primary/20 bg-white/[0.01] text-white transition-all duration-300 text-xs cursor-none"
          >
            <FiGithub size={16} className="text-primary-light" />
            <span>View Full GitHub Index</span>
            <FiArrowRight size={12} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
