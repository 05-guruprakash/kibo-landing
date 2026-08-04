import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionMeta {
  id: string;
  label: string;
  blurb: string;
}

// Order must match the actual <section data-section="..."> order in App.tsx
const SECTIONS: SectionMeta[] = [
  { id: 'hero', label: 'Meet Kibo', blurb: 'Say hello to your new companion' },
  { id: 'meet', label: 'A Companion', blurb: 'Not a tool — a presence' },
  { id: 'features-hover', label: 'Features', blurb: 'What Kibo can do for you' },
  { id: 'live', label: 'See it Live', blurb: 'Three steps, zero friction' },
  { id: 'plays', label: 'Plays & Remembers', blurb: 'It notices. It never forgets.' },
  { id: 'faq', label: 'Questions', blurb: 'Everything you wondered' },
  { id: 'celebrates', label: 'Celebrates You', blurb: 'Your small wins matter' },
  { id: 'evening', label: 'Bring Kibo Home', blurb: 'Join the waitlist' },
];

const SectionNav = () => {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = SECTIONS
      .map((s) => document.querySelector(`[data-section="${s.id}"]`))
      .filter((el): el is Element => !!el);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest visible ratio currently on screen
        let best: { id: string; ratio: number } | null = null;
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-section');
          if (!id) return;
          if (entry.isIntersecting && (!best || entry.intersectionRatio > best.ratio)) {
            best = { id, ratio: entry.intersectionRatio };
          }
        });
        if (best) setActiveId(best.id);
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    elements.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(`[data-section="${id}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className="section-nav"
      aria-label="Page sections"
      onMouseLeave={() => setHoveredId(null)}
    >
      {SECTIONS.map((s) => {
        const isActive = activeId === s.id;
        const isHovered = hoveredId === s.id;

        return (
          <div key={s.id} className="section-nav-item">
            <button
              onClick={() => scrollToSection(s.id)}
              onMouseEnter={() => setHoveredId(s.id)}
              aria-label={`Go to ${s.label}`}
              aria-current={isActive ? 'true' : undefined}
              className="section-nav-dot-btn"
            >
              <motion.span
                className="section-nav-dot"
                animate={{
                  scale: isActive ? 1.4 : isHovered ? 1.2 : 1,
                  backgroundColor: isActive ? '#22e07c' : 'rgba(255,255,255,0.35)',
                }}
                transition={{ duration: 0.25 }}
              />
            </button>

            {/* PiP hover preview */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="section-nav-pip"
                  initial={{ opacity: 0, x: -8, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -8, scale: 0.9 }}
                  transition={{ duration: 0.18 }}
                >
                  <p className="section-nav-pip-label">{s.label}</p>
                  <p className="section-nav-pip-blurb">{s.blurb}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
};

export default SectionNav;