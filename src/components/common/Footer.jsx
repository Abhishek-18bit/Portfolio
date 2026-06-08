import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp } from 'react-icons/fi';
import { NAV_LINKS } from '../../constants';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer
      className="relative pt-16 pb-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
          opacity: 0.5,
        }}
      />

      <div className="section-container">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(124,58,237,0.2))',
                  border: '1px solid rgba(0,229,255,0.25)',
                  color: 'var(--primary)',
                  fontFamily: 'var(--font-grotesk)',
                }}
              >
                AK
              </div>
              <div>
                <div
                  className="font-bold"
                  style={{ fontFamily: 'var(--font-grotesk)' }}
                >
                  Abhishek Kumar
                </div>
                <div
                  className="text-xs font-mono"
                  style={{ color: 'var(--primary)' }}
                >
                  Full Stack Developer
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-secondary)' }}>
              Building scalable applications, solving complex problems, and crafting exceptional digital experiences.
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-5">
              {[
                { icon: FiGithub, url: 'https://github.com/abhishek-kumar', label: 'GitHub' },
                { icon: FiLinkedin, url: 'https://linkedin.com/in/abhishek-kumar', label: 'LinkedIn' },
                { icon: FiTwitter, url: 'https://twitter.com/abhishek_kumar', label: 'Twitter' },
                { icon: FiMail, url: 'mailto:abhishek@example.com', label: 'Email' },
              ].map(({ icon: Icon, url, label }) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-secondary)',
                    cursor: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--primary)';
                    e.currentTarget.style.background = 'rgba(0,229,255,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs font-mono uppercase tracking-widest mb-4"
              style={{ color: 'var(--primary)' }}
            >
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{ cursor: 'none' }}
                  className="text-sm text-left hover-link w-fit"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="text-xs font-mono uppercase tracking-widest mb-4"
              style={{ color: 'var(--primary)' }}
            >
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: 'GitHub Profile', href: 'https://github.com/abhishek-kumar' },
                { label: 'LinkedIn Profile', href: 'https://linkedin.com/in/abhishek-kumar' },
                { label: 'Download Resume', href: '/resume.pdf' },
                { label: 'LeetCode Profile', href: 'https://leetcode.com/abhishek_kumar' },
                { label: 'GeeksforGeeks', href: 'https://geeksforgeeks.org/user/abhishek_kumar' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover-link w-fit"
                  style={{ cursor: 'none' }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            © {new Date().getFullYear()} Abhishek Kumar. Crafted with{' '}
            <span style={{ color: '#FF6B6B' }}>♥</span> and lots of{' '}
            <span style={{ color: 'var(--primary)' }}>☕</span>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="text-xs font-mono"
              style={{ color: 'var(--text-secondary)' }}
            >
              Built with React + Three.js + GSAP
            </div>

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: 'rgba(0,229,255,0.1)',
                border: '1px solid rgba(0,229,255,0.25)',
                color: 'var(--primary)',
                cursor: 'none',
              }}
            >
              <FiArrowUp size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
