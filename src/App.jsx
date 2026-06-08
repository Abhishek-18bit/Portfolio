import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import CustomCursor from './components/cursor/CustomCursor';
import Loader from './components/loader/Loader';
import Navbar from './components/navbar/Navbar';
import ParticleBackground from './components/background/ParticleBackground';
import Footer from './components/common/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';

// Sections (lazy loaded for performance)
import Hero from './sections/Hero/Hero';
const About = lazy(() => import('./sections/About/About'));
const Skills = lazy(() => import('./sections/Skills/Skills'));
const Projects = lazy(() => import('./sections/Projects/Projects'));
const CodingProfiles = lazy(() => import('./sections/CodingProfiles/CodingProfiles'));
const Education = lazy(() => import('./sections/Education/Education'));
const Achievements = lazy(() => import('./sections/Achievements/Achievements'));
const Contact = lazy(() => import('./sections/Contact/Contact'));

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Section loading fallback
function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex gap-2">
        <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--primary)', animationDelay: '0s' }} />
        <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--primary)', animationDelay: '0.15s' }} />
        <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--primary)', animationDelay: '0.3s' }} />
      </div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Use native scroll with CSS smooth scrolling
  useEffect(() => {
    if (isLoading) return;
    // Refresh ScrollTrigger to ensure scroll animations align correctly
    ScrollTrigger.refresh();
  }, [isLoading]);

  return (
    <>
      <CustomCursor />

      <AnimatePresence>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <ParticleBackground />
          <Navbar />

          <main className="relative z-10">
            <ErrorBoundary fallbackMessage="Hero section failed to load">
              <Hero />
            </ErrorBoundary>

            <Suspense fallback={<SectionFallback />}>
              <ErrorBoundary fallbackMessage="About section failed to load">
                <About />
              </ErrorBoundary>
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <ErrorBoundary fallbackMessage="Skills section failed to load">
                <Skills />
              </ErrorBoundary>
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <ErrorBoundary fallbackMessage="Projects section failed to load">
                <Projects />
              </ErrorBoundary>
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <ErrorBoundary fallbackMessage="Coding Profiles section failed to load">
                <CodingProfiles />
              </ErrorBoundary>
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <ErrorBoundary fallbackMessage="Education section failed to load">
                <Education />
              </ErrorBoundary>
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <ErrorBoundary fallbackMessage="Achievements section failed to load">
                <Achievements />
              </ErrorBoundary>
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <ErrorBoundary fallbackMessage="Contact section failed to load">
                <Contact />
              </ErrorBoundary>
            </Suspense>
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
