import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollProvider } from './contexts/ScrollContext';
import { WaitlistProvider } from './contexts/WaitlistContext';
import GhibliBackground from './components/GhibliBackground';
import Navbar from './components/Navbar';
import KiboTrack from './components/KiboTrack';
import HeroSection from './components/sections/HeroSection';
import MeetSection from './components/sections/MeetSection';
import LiveSection from './components/sections/LiveSection';
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
      <GhibliBackground />
      <Navbar />
      <KiboTrack />

      <main className="relative z-10">
        <HeroSection />
        <MeetSection />
        <LiveSection />
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
      <WaitlistProvider>
        <AppContent />
      </WaitlistProvider>
    </ScrollProvider>
  );
}

export default App;