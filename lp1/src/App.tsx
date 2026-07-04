import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollProvider } from './contexts/ScrollContext';
import GhibliBackground from './components/GhibliBackground';
import CursorCat from './components/CursorCat';
import Navbar from './components/Navbar';
import KiboTrack from './components/KiboTrack';
import HeroSection from './components/sections/HeroSection';
import MeetSection from './components/sections/MeetSection';
import RemembersSection from './components/sections/RemembersSection';
import PlaysSection from './components/sections/PlaysSection';
import FAQSection from './components/sections/FAQSection';
import CelebratesSection from './components/sections/CelebratesSection';
import EveningSection from './components/sections/EveningSection';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  useEffect(() => {
    ScrollTrigger.refresh();
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ghibli-style illustrated background */}
      <GhibliBackground />

      {/* Fixed navbar */}
      <Navbar />

      {/* Kibo track companion */}
      <KiboTrack />

      {/* Sections */}
      <main className="relative z-10">
        <CursorCat />
        <HeroSection />
        <MeetSection />
        <RemembersSection />
        <PlaysSection />
        <FAQSection />
        <CelebratesSection />
        <EveningSection />
      </main>
    </div>
  );
}

function App() {
  return (
    <ScrollProvider>
      <AppContent />
    </ScrollProvider>
  );
}

export default App;
