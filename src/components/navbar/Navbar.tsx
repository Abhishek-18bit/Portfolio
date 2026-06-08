'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '@/constants';
import { FiHome, FiUser, FiCpu, FiFolder, FiAward, FiMail, FiBookOpen } from 'react-icons/fi';

const ICON_MAP: { [key: string]: any } = {
  home: FiHome,
  about: FiUser,
  skills: FiCpu,
  projects: FiFolder,
  'coding-profiles': FiAward,
  education: FiBookOpen,
  contact: FiMail,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollPos = window.scrollY + 150;
      for (const link of NAV_LINKS) {
        const section = document.getElementById(link.id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveLink(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    setActiveLink(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
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
    <div className="fixed top-0 left-0 right-0 z-[40] flex justify-center p-4 md:p-6 transition-all duration-300">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center gap-1 px-4 py-2 rounded-full glass transition-all duration-300 ${
          scrolled ? 'bg-[#0A0A0A]/80 shadow-2xl py-2' : 'bg-transparent border-transparent shadow-none'
        }`}
        style={{
          borderColor: scrolled ? 'var(--border)' : 'transparent',
        }}
      >
        {/* Brand Logo */}
        <div className="hidden sm:flex items-center pl-2 pr-4 border-r border-white/5 mr-2">
          <span 
            className="font-mono text-xs font-black tracking-widest text-[#FB923C] uppercase cursor-none" 
            onClick={() => handleClick('home')}
          >
            AK<span className="text-[#A855F7]">.</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const Icon = ICON_MAP[link.id] || FiHome;
            const isActive = activeLink === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2 transition-all duration-300 cursor-none ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {/* Spring layout active container indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/[0.04] border border-white/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {/* Underline indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-underline"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-primary-light to-secondary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon size={12} className={isActive ? 'text-[#A855F7]' : 'text-neutral-500'} />
                <span className="hidden md:inline">{link.label}</span>
              </button>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
}
