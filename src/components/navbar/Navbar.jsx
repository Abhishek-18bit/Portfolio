import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { NAV_LINKS } from '../../constants';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';

const Navbar = () => {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);

          // Update active section
          const sections = NAV_LINKS.map((l) => l.id);
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 120) {
                setActiveSection(sections[i]);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP entrance
  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2,
    });
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled ? 'rgba(5,8,22,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 group"
            style={{ cursor: 'none' }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(124,58,237,0.2))',
                border: '1px solid rgba(0,229,255,0.3)',
                fontFamily: 'var(--font-grotesk)',
                color: 'var(--primary)',
              }}
            >
              AK
            </div>
            <span
              className="text-lg font-semibold hidden sm:block transition-colors duration-300"
              style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.01em' }}
            >
              Abhishek<span style={{ color: 'var(--primary)' }}>.</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{ cursor: 'none' }}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group"
              >
                <span
                  className="relative z-10 transition-colors duration-300"
                  style={{
                    color: activeSection === link.id ? 'var(--primary)' : 'var(--text-secondary)',
                  }}
                >
                  {link.label}
                </span>
                {activeSection === link.id && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'rgba(0,229,255,0.1)',
                      border: '1px solid rgba(0,229,255,0.2)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm py-2 px-5"
              style={{ cursor: 'none' }}
            >
              <FiDownload size={14} />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{
              color: 'var(--text-secondary)',
              background: 'rgba(255,255,255,0.05)',
              cursor: 'none',
            }}
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-[60px] left-4 right-4 z-40 rounded-2xl p-4"
            style={{
              background: 'rgba(5,8,22,0.95)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.id)}
                  style={{ cursor: 'none' }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all"
                >
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{
                      background: activeSection === link.id ? 'var(--primary)' : 'rgba(255,255,255,0.3)',
                    }}
                  />
                  <span
                    style={{
                      color: activeSection === link.id ? 'var(--primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {link.label}
                  </span>
                </motion.button>
              ))}
              <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <a
                  href="/resume.pdf"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
                  style={{
                    background: 'rgba(0,229,255,0.1)',
                    border: '1px solid rgba(0,229,255,0.2)',
                    color: 'var(--primary)',
                  }}
                >
                  <FiDownload size={14} />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
