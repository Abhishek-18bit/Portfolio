'use client';

import Hero from '@/sections/Hero/Hero';
import About from '@/sections/About/About';
import Skills from '@/sections/Skills/Skills';
import Projects from '@/sections/Projects/Projects';
import CodingProfiles from '@/sections/CodingProfiles/CodingProfiles';
import Education from '@/sections/Education/Education';
import Achievements from '@/sections/Achievements/Achievements';
import Contact from '@/sections/Contact/Contact';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CodingProfiles />
      <Education />
      <Achievements />
      <Contact />
    </main>
  );
}
