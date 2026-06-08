'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp } from 'react-icons/fi';
import { NAV_LINKS } from '@/constants';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer
      className="relative pt-16 pb-8 bg-bg"
      style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
    >
      {/* Top glowing boundary line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
          opacity: 0.4,
        }}
      />

      <div className="section-container">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm bg-gradient-to-tr from-primary/25 to-secondary/25 border border-primary/25 text-white"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                AK
              </div>
              <div>
                <div className="font-bold text-white tracking-wide">
                  Abhishek Kumar
                </div>
                <div className="text-[10px] font-mono text-secondary-light uppercase tracking-wider">
                  Systems & Web Engineer
                </div>
              </div>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed max-w-xs">
              Designing isolated execution engines, scaling backend pipelines, and crafting premium, Awwwards-quality interfaces.
            </p>

            {/* Social Routers */}
            <div className="flex gap-2.5 mt-2">
              {[
                { icon: FiGithub, url: 'https://github.com/abhishek-kumar', label: 'GitHub', color: '#A855F7' },
                { icon: FiLinkedin, url: 'https://linkedin.com/in/abhishek-kumar', label: 'LinkedIn', color: '#FB923C' },
                { icon: FiTwitter, url: 'https://twitter.com/abhishek_kumar', label: 'Twitter', color: '#A855F7' },
                { icon: FiMail, url: 'mailto:abhishek@example.com', label: 'Email', color: '#FB923C' },
              ].map(({ icon: Icon, url, label, color }) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/5 bg-white/[0.01] text-neutral-400 hover:text-white transition-all duration-300 cursor-none"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.borderColor = `${color}30`;
                    e.currentTarget.style.background = `${color}05`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#A3A3A3';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
                  }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-secondary-light mb-4">
              // Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-xs text-left text-text-secondary hover:text-white transition-colors cursor-none w-fit"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-primary-light mb-4">
              // Quick Routing
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: 'GitHub Index', href: 'https://github.com/abhishek-kumar' },
                { label: 'LinkedIn profile', href: 'https://linkedin.com/in/abhishek-kumar' },
                { label: 'LeetCode profile', href: 'https://leetcode.com/abhishek_kumar' },
                { label: 'Download Resume', href: '/resume.pdf' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-text-secondary hover:text-white transition-colors cursor-none w-fit"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-4"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
        >
          <div className="text-[10px] text-neutral-500 font-mono">
            © {new Date().getFullYear()} ABHISHEK KUMAR. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <div className="text-[10px] text-neutral-500 font-mono">
              NEXT.JS 15 + R3F + GSAP + TAILWIND
            </div>

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/5 bg-white/[0.01] text-neutral-400 hover:text-white cursor-none"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--secondary)';
                e.currentTarget.style.color = 'var(--secondary-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.color = '#A3A3A3';
              }}
            >
              <FiArrowUp size={13} />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
}
