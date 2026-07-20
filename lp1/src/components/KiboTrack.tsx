import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useScrollContext } from '../contexts/ScrollContext';
import KiboCharacter from './KiboCharacter';
import { CAT_ANIMATIONS } from '../spriteConfig';

type Pose = 'sitting' | 'jumpUp' | 'jumpDown';

const clampArc = (percent: number) => (percent <= 2 || percent >= 98 ? 0 : -18);
const SETTLE_MS = 400; // time to ignore section changes right after mount

const KiboTrack = () => {
  const { currentSection, totalSections } = useScrollContext();
  const [pose, setPose] = useState<Pose>('sitting');
  const [isAnimating, setIsAnimating] = useState(false);
  const [displaySection, setDisplaySection] = useState(0);
  const [side, setSide] = useState<'left' | 'right'>('left');
  const [ready, setReady] = useState(false);
  const prevSectionRef = useRef(0);
  const jumpTimeoutRef = useRef<number | undefined>(undefined);

  // Settling window: ScrollTrigger can fire onUpdate a few times right after
  // mount (initial create, layout settle, restored scroll position). Ignore
  // section changes during this window instead of trying to guess which
  // single effect run is "the real one".
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), SETTLE_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) {
      // Silently track position, no jump animation, however many times this fires.
      prevSectionRef.current = currentSection;
      setDisplaySection(currentSection);
      return;
    }

    const prev = prevSectionRef.current;
    if (currentSection === prev) return;

    const goingDown = currentSection > prev;
    prevSectionRef.current = currentSection;

    const clip = goingDown ? CAT_ANIMATIONS.jumpDown : CAT_ANIMATIONS.jumpUp;
    const duration = (clip.frames.length / clip.fps) * 1000;

    setPose(goingDown ? 'jumpDown' : 'jumpUp');
    setIsAnimating(true);
    setSide((s) => (s === 'left' ? 'right' : 'left'));

    clearTimeout(jumpTimeoutRef.current);
    jumpTimeoutRef.current = window.setTimeout(() => {
      setDisplaySection(currentSection);
      setIsAnimating(false);
    }, duration);

    return () => clearTimeout(jumpTimeoutRef.current);
  }, [currentSection, ready]);

  const divisor = Math.max(totalSections - 1, 1);
  const checkpointPercent = (displaySection / divisor) * 100;
  const targetPercent = (currentSection / divisor) * 100;
  const activePercent = isAnimating ? targetPercent : checkpointPercent;
  const arcHeight = clampArc(targetPercent);
  const sideOffset = isAnimating ? (side === 'left' ? -16 : 16) : 0;

  return (
    <div className="kibo-track">
      <div className="track-path" />

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: totalSections }, (_, i) => (
          <div
            key={i}
            className="absolute left-1/2 w-3 h-3 rounded-full bg-[#e8d5c4]/50"
            style={{ top: `${(i / divisor) * 100}%`, transform: 'translate(-50%, -50%)' }}
          />
        ))}
      </div>

      <motion.div
        className="kibo-character"
        style={{ top: 0, left: '50%', xPercent: -50, yPercent: -50, opacity: 1 }}
        animate={{
          top: `${activePercent}%`,
          x: isAnimating ? [0, sideOffset, 0] : 0,
          y: isAnimating ? [0, arcHeight, 0] : 0,
          opacity: 1
        }}
        transition={{
          top: { duration: 0.5, ease: 'easeInOut' },
          x: { duration: 0.5, ease: 'easeInOut' },
          y: { duration: 0.5, ease: 'easeOut' }
        }}
      >
        <KiboCharacter pose={pose} size={60} flip={side === 'right'} />
      </motion.div>

      <motion.div
        className="absolute left-1/2 w-20 h-20 rounded-full pointer-events-none"
        style={{ top: 0, transform: 'translate(-50%, -50%)' }}
        animate={{
          top: `${activePercent}%`,
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{
          top: { duration: 0.5, ease: 'easeInOut' },
          scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }}
      />
    </div>
  );
};

export default KiboTrack;