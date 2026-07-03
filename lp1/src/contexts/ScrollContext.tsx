import { createContext, useContext, useRef, useEffect, useState, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollContextType {
  scrollProgress: number;
  currentSection: number;
  totalSections: number;
  kiboY: number;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollProgress: 0,
  currentSection: 0,
  totalSections: 7,
  kiboY: 0,
});

export const useScrollContext = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [kiboY, setKiboY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSections = 7;

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          setKiboY(progress * (window.innerHeight * 0.7));

          const section = Math.min(
            Math.floor(progress * totalSections),
            totalSections - 1
          );
          setCurrentSection(section);
        },
      });

      // Refresh ScrollTrigger on resize
      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    });

    return () => ctx.revert();
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollProgress, currentSection, totalSections, kiboY }}>
      <div ref={containerRef} className="scroll-container">
        {children}
      </div>
    </ScrollContext.Provider>
  );
};
