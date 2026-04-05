'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Home from '@/components/sections/Home';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import TechStack from '@/components/sections/TechStack';
import Portfolio from '@/components/sections/Portfolio';
import FeaturedBlog from '@/components/sections/FeaturedBlog';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

// Dynamically import Scene3D to disable SSR for Three.js
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 -z-10 bg-darker">
      <div className="absolute inset-0 bg-gradient-to-br from-darker via-dark to-darker animate-pulse" />
    </div>
  ),
});

export default function Page() {
  return (
    <main className="relative">
      {/* <Scene3D /> */}
      <Navbar />
      <Home />
      <About />
      <Experience />
      <TechStack />
      <Portfolio />
      <FeaturedBlog />
      <Contact />
      <Footer />
    </main>
  );
}
