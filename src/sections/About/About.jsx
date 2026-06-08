import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';
import { ABOUT_CARDS } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from('.about-heading', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      // Text reveal
      gsap.from('.about-text-block', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
      });

      // Cards stagger
      gsap.from('.about-card', {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-cards-grid',
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16 about-heading">
          <div className="section-label">About Me</div>
          <h2 className="section-title">
            Who I{' '}
            <span className="gradient-text">Am</span>
          </h2>
          <p
            className="mt-4 text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            A passionate developer driven by curiosity, code, and the desire to build things that matter.
          </p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Profile Image Area */}
          <div ref={imageRef} className="relative flex justify-center">
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              {/* Rotating ring */}
              <div
                className="absolute -inset-4 rounded-full animate-rotate-slow opacity-30"
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

              {/* Profile image placeholder */}
              <div
                className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden"
                style={{
                  background:
                    'radial-gradient(circle at 30% 30%, rgba(0,229,255,0.15), rgba(124,58,237,0.1))',
                  border: '2px solid rgba(0,229,255,0.2)',
                  boxShadow: '0 0 60px rgba(0,229,255,0.15), 0 0 120px rgba(124,58,237,0.1)',
                }}
              >
                <div className="text-center">
                  <div className="text-8xl mb-4">👨‍💻</div>
                  <div
                    className="text-sm font-mono"
                    style={{ color: 'var(--primary)' }}
                  >
                    &lt;developer /&gt;
                  </div>
                </div>

                {/* Animated glow orb */}
                <div
                  className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full animate-pulse-slow"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(0,229,255,0.3) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-4 top-8 px-3 py-2 rounded-xl text-xs font-semibold"
                style={{
                  background: 'rgba(0,229,255,0.1)',
                  border: '1px solid rgba(0,229,255,0.3)',
                  color: 'var(--primary)',
                  backdropFilter: 'blur(10px)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                🚀 Open to Work
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -left-4 bottom-12 px-3 py-2 rounded-xl text-xs"
                style={{
                  background: 'rgba(124,58,237,0.1)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  color: '#A78BFA',
                  backdropFilter: 'blur(10px)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                ⚡ B.Tech CSE '26
              </motion.div>
            </div>
          </div>

          {/* Text Content */}
          <div ref={textRef} className="flex flex-col gap-6">
            <div className="about-text-block">
              <h3
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: 'var(--font-grotesk)' }}
              >
                Crafting digital experiences with{' '}
                <span className="gradient-text">passion & precision</span>
              </h3>
            </div>

            <div className="about-text-block">
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                I'm Abhishek Kumar, a <strong style={{ color: 'white' }}>B.Tech Computer Science student</strong> in my 3rd year, deeply passionate about building scalable full-stack applications and solving complex algorithmic problems.
              </p>
            </div>

            <div className="about-text-block">
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                My journey started with competitive programming — grinding hundreds of DSA problems shaped my problem-solving mindset. I then channeled that into building real-world projects like <strong style={{ color: 'var(--primary)' }}>Gignest</strong>, a full-scale freelancer marketplace.
              </p>
            </div>

            <div className="about-text-block">
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                I believe great software is built at the intersection of <strong style={{ color: 'white' }}>technical excellence</strong> and <strong style={{ color: 'white' }}>beautiful user experience</strong>. I'm actively seeking internship opportunities where I can contribute meaningfully and grow exponentially.
              </p>
            </div>

            {/* Quick facts */}
            <div className="about-text-block grid grid-cols-2 gap-4 mt-2">
              {[
                { label: 'Location', value: 'India 🇮🇳' },
                { label: 'Degree', value: 'B.Tech CSE' },
                { label: 'Year', value: '3rd Year (2022-2026)' },
                { label: 'Focus', value: 'Full Stack + DSA' },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span
                    className="text-xs font-mono uppercase tracking-wider"
                    style={{ color: 'var(--primary)' }}
                  >
                    {label}
                  </span>
                  <span className="text-sm font-medium" style={{ color: 'white' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="about-cards-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ABOUT_CARDS.map((card, i) => (
            <div key={i} className="about-card">
              <Tilt
                tiltMaxAngleX={12}
                tiltMaxAngleY={12}
                perspective={800}
                scale={1.02}
                transitionSpeed={500}
                glareEnable={true}
                glareMaxOpacity={0.08}
                glareColor="rgba(0,229,255,0.3)"
                glarePosition="all"
                className="h-full"
              >
                <div
                  className="h-full p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300 group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderTop: `2px solid ${card.color}40`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 60px ${card.color}20, 0 0 0 1px ${card.color}20`;
                    e.currentTarget.style.borderColor = `${card.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{
                      background: `${card.color}15`,
                      border: `1px solid ${card.color}30`,
                    }}
                  >
                    {card.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-base" style={{ fontFamily: 'var(--font-grotesk)' }}>
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                    {card.description}
                  </p>

                  {/* Color accent */}
                  <div
                    className="h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-full"
                    style={{ background: `linear-gradient(to right, ${card.color}, transparent)` }}
                  />
                </div>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
