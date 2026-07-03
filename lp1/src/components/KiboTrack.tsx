import { motion } from 'framer-motion';
import { useScrollContext } from '../contexts/ScrollContext';
import KiboCharacter from './KiboCharacter';

const KiboTrack = () => {
  const { kiboY, currentSection } = useScrollContext();

  // Get pose based on current section
  const getPose = () => {
    const poses = ['sleep', 'waking', 'idle', 'curious', 'play', 'celebrate', 'rest'] as const;
    return poses[currentSection] || 'idle';
  };

  return (
    <div className="kibo-track">
      {/* Track path - the visual line */}
      <div className="track-path" />

      {/* Track decorations - stepping stones */}
      <div className="absolute inset-0 pointer-events-none">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#e8d5c4]/50"
            style={{
              top: `${(i / 6) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>

      {/* Kibo character on the track */}
      <motion.div
        className="kibo-character"
        style={{
          top: 0,
          y: kiboY,
        }}
        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 15,
          mass: 1
        }}
      >
        <KiboCharacter
          pose={getPose()}
          eyeFollowMouse={true}
          size={60}
        />
      </motion.div>

      {/* Ambient glow around Kibo */}
      <motion.div
        className="absolute left-1/2 w-20 h-20 rounded-full pointer-events-none"
        style={{
          top: 30,
          y: kiboY,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(254, 243, 226, 0.6), transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
};

export default KiboTrack;
