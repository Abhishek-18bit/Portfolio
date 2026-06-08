'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS } from '@/constants';
import dynamic from 'next/dynamic';
import { 
  FiMonitor, 
  FiServer, 
  FiCode, 
  FiCpu, 
  FiSettings, 
  FiActivity,
  FiTerminal,
  FiShield,
  FiDatabase,
  FiLayers
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = Object.keys(SKILLS);

const SkillsScene3D = dynamic(() => import('@/components/three/SkillsScene3D'), { ssr: false });

const CATEGORY_ICONS: Record<string, React.ComponentType<any>> = {
  Frontend: FiMonitor,
  Backend: FiServer,
  Languages: FiCode,
  'DSA & Algorithms': FiCpu,
  Tools: FiSettings,
};

const CATEGORY_CODES: Record<string, string> = {
  Frontend: 'SYS.FE_CORE',
  Backend: 'SYS.BE_CORE',
  Languages: 'SYS.LANG_INV',
  'DSA & Algorithms': 'SYS.ALGO_DS',
  Tools: 'SYS.DEV_ENG',
};

function getProficiencyLabel(level: number): string {
  if (level >= 90) return 'Expert';
  if (level >= 80) return 'Proficient';
  return 'Familiar';
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.from('.skills-heading', {
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

  const activeSkills = SKILLS[activeCategory];
  const activeIconColor = activeCategory === 'Frontend' || activeCategory === 'Languages' || activeCategory === 'Tools' 
    ? 'text-purple-400' 
    : 'text-orange-400';

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative overflow-hidden bg-bg">
      {/* Background glowing decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 skills-heading">
          <div className="section-label tracking-[0.25em] font-mono text-purple-400">// SYSTEM CORES</div>
          <h2 className="section-title mt-2 font-mono">
            Tech <span className="gradient-text">Matrix</span>
          </h2>
          <p className="mt-4 text-sm md:text-base max-w-xl mx-auto text-text-secondary font-sans">
            Diagnostic telemetry of languages, database clusters, runtime architectures, and algorithms.
          </p>
        </div>

        <div className="grid lg:grid-cols-[300px_1.1fr_1fr] gap-8 items-stretch">
          
          {/* Category Tabs (Console Panels) */}
          <div className="flex flex-col gap-3 justify-between">
            <div className="flex flex-col gap-2.5">
              <div className="px-3 py-1 text-[10px] font-mono text-neutral-500 uppercase tracking-widest border-b border-white/5 mb-1">
                Active Modules
              </div>
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                const IconComponent = CATEGORY_ICONS[cat] || FiLayers;
                const sysCode = CATEGORY_CODES[cat] || 'SYS.CORE';
                const nodeCount = SKILLS[cat].length;
                
                // Color configuration based on category
                const isPurpleAccent = cat === 'Frontend' || cat === 'Languages' || cat === 'Tools';
                const accentClass = isPurpleAccent ? 'group-hover:text-purple-400' : 'group-hover:text-orange-400';
                
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative flex items-center justify-between w-full p-4 rounded-xl text-left transition-all duration-300 group cursor-none border ${
                      isActive 
                        ? isPurpleAccent
                          ? 'border-purple-500/30 bg-[#141021]/60 shadow-[0_0_20px_rgba(168,85,247,0.08)]' 
                          : 'border-orange-500/30 bg-[#211610]/60 shadow-[0_0_20px_rgba(249,115,22,0.08)]'
                        : 'border-white/5 bg-[#111111]/30 hover:border-white/10 hover:bg-white/[0.02]'
                    }`}
                  >
                    {/* Active Gradient Side Bar */}
                    {isActive && (
                      <motion.div
                        layoutId="active-skill-bar"
                        className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-r ${
                          isPurpleAccent ? 'bg-purple-500' : 'bg-orange-500'
                        }`}
                      />
                    )}

                    <div className="relative z-10 flex items-center gap-3.5">
                      <div className={`p-2 rounded-lg bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-colors duration-300 ${
                        isActive 
                          ? isPurpleAccent ? 'text-purple-400 bg-purple-500/10' : 'text-orange-400 bg-orange-500/10' 
                          : 'text-neutral-500'
                      }`}>
                        <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      <div className="flex flex-col">
                        <span
                          className={`font-mono text-[11px] font-bold tracking-wider transition-colors duration-300 uppercase ${
                            isActive ? 'text-white' : 'text-neutral-400 ' + accentClass
                          }`}
                        >
                          {cat}
                        </span>
                        <span className="text-[9px] text-neutral-600 font-mono mt-0.5 tracking-wider">
                          {sysCode}
                        </span>
                      </div>
                    </div>

                    <div className="relative z-10 flex flex-col items-end font-mono">
                      <span className={`text-[10px] font-bold ${isActive ? 'text-white' : 'text-neutral-500'}`}>
                        {String(nodeCount).padStart(2, '0')}
                      </span>
                      {/* Segmented meter blocks */}
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, idx) => {
                          const isFilled = idx < Math.ceil(nodeCount / 1.3);
                          return (
                            <span 
                              key={idx} 
                              className={`w-1.5 h-1.5 rounded-[1px] transition-all duration-300 ${
                                isFilled 
                                  ? isActive
                                    ? isPurpleAccent ? 'bg-purple-500/80 shadow-[0_0_4px_#A855F7]' : 'bg-orange-500/80 shadow-[0_0_4px_#F97316]'
                                    : 'bg-neutral-600'
                                  : 'bg-neutral-800'
                              }`} 
                            />
                          );
                        })}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Info Philosophy Card */}
            <div className="p-4 rounded-xl border border-white/5 bg-[#111111]/30 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full filter blur-xl group-hover:bg-purple-500/10 transition-colors duration-300" />
              <div className="flex items-center gap-2 text-[10px] font-mono text-purple-400 mb-2 uppercase tracking-widest">
                <FiActivity className="w-3.5 h-3.5 animate-pulse" />
                <span>// COMPILER TELEMETRY</span>
              </div>
              <p className="text-[11px] leading-relaxed text-neutral-400 font-mono">
                System map maps live capabilities. Connecting pathways represent pipeline latency & compilation bindings across sandboxed modules.
              </p>
            </div>
          </div>

          {/* Skill Lists display (Quantum Diagnostics Matrix) */}
          <div className="p-6 md:p-8 rounded-2xl border border-white/5 bg-[#111111]/40 flex flex-col justify-between z-10 backdrop-blur-md relative overflow-hidden shadow-2xl">
            {/* Grid background effect */}
            <div className="absolute inset-0 grid-pattern pointer-events-none opacity-5" />
            
            <div className="relative z-10 w-full">
              {/* Telemetry Header */}
              <div className="mb-6 border-b border-white/5 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase font-mono flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full animate-ping ${
                      activeCategory === 'Frontend' || activeCategory === 'Languages' || activeCategory === 'Tools' ? 'bg-purple-500' : 'bg-orange-500'
                    }`} />
                    {activeCategory}
                  </h3>
                  <p className="text-[9px] text-neutral-500 font-mono mt-1">STATUS: OPERATIONAL // DATA STREAMS: NOMINAL</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-[10px] font-mono text-neutral-500 px-2 py-0.5 border border-white/5 rounded bg-white/[0.01]">
                    LNK: 99.8%
                  </div>
                  <span className="tag text-[9px] font-mono uppercase tracking-wider">
                    {activeSkills.length} Units
                  </span>
                </div>
              </div>

              {/* Skills Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-4"
                >
                  {activeSkills.map((skill, index) => {
                    const label = getProficiencyLabel(skill.level);
                    const filledSegments = Math.round(skill.level / 10);
                    const isPurple = activeCategory === 'Frontend' || activeCategory === 'Languages' || activeCategory === 'Tools';
                    
                    return (
                      <div
                        key={skill.name}
                        className="flex flex-col gap-2 p-3.5 rounded-xl border border-white/[0.02] bg-[#161616]/40 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg select-none filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-300">{skill.icon}</span>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-white tracking-wide font-mono">{skill.name}</span>
                              <span className="text-[8px] text-neutral-600 font-mono uppercase tracking-widest mt-0.5">
                                {isPurple ? 'CORE.LIBR_M' : 'CORE.SERV_D'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 font-mono">
                            <span className="text-[9px] text-neutral-500 uppercase tracking-widest">
                              {label}
                            </span>
                            <span className={`text-[10px] font-bold ${isPurple ? 'text-purple-400' : 'text-orange-400'}`}>
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        {/* Staggered Segmented Progress Bar */}
                        <div className="flex gap-1 mt-1.5 w-full">
                          {[...Array(10)].map((_, i) => {
                            const active = i < filledSegments;
                            return (
                              <motion.div
                                key={i}
                                initial={{ scaleY: 0.3, opacity: 0.2 }}
                                animate={{ 
                                  scaleY: active ? 1.0 : 0.6, 
                                  opacity: active ? 1.0 : 0.15 
                                }}
                                transition={{ 
                                  delay: index * 0.05 + i * 0.03,
                                  type: 'spring',
                                  stiffness: 300,
                                  damping: 15
                                }}
                                className={`h-2 flex-1 rounded-[1.5px] transition-all duration-300 ${
                                  active 
                                    ? isPurple
                                      ? 'bg-gradient-to-t from-purple-600 to-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.4)]'
                                      : 'bg-gradient-to-t from-orange-600 to-orange-400 shadow-[0_0_6px_rgba(249,115,22,0.4)]'
                                    : 'bg-neutral-700'
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* System details line */}
            <div className="mt-6 border-t border-white/5 pt-4 text-[9px] font-mono text-neutral-600 flex items-center justify-between relative z-10">
              <span>SECURITY: SANDBOXED</span>
              <span>COMPILER: V8_ENGINE</span>
              <span>PORT: 8080</span>
            </div>
          </div>

          {/* Interactive WebGL 3D Skill Network */}
          <div className="relative flex items-center justify-center min-h-[350px] lg:min-h-full rounded-2xl border border-white/5 bg-[#111111]/20 overflow-hidden shadow-2xl">
            <div className="absolute top-4 left-4 z-10 font-mono text-[9px] text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span>Network Topology // Interactive</span>
            </div>
            <SkillsScene3D activeCategory={activeCategory} />
          </div>

        </div>

      </div>
    </section>
  );
}
