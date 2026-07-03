import { motion } from 'framer-motion';
import { useScrollContext } from '../contexts/ScrollContext';
import { useEffect, useState } from 'react';

type KiboPose = 'sleep' | 'waking' | 'idle' | 'curious' | 'play' | 'celebrate' | 'rest';

interface KiboCharacterProps {
  className?: string;
  size?: number;
  pose?: KiboPose;
  eyeFollowMouse?: boolean;
}

const KiboCharacter = ({
  className = '',
  size = 60,
  pose: forcedPose,
  eyeFollowMouse = true
}: KiboCharacterProps) => {
  const { currentSection, scrollProgress } = useScrollContext();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [naturalPose, setNaturalPose] = useState<KiboPose>('sleep');
  const [isBlinking, setIsBlinking] = useState(false);

  const pose = forcedPose ?? naturalPose;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Auto-blink
    const blinkInterval = setInterval(() => {
      if (pose !== 'sleep') {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, [pose]);

  useEffect(() => {
    const sectionPoses: KiboPose[] = ['sleep', 'waking', 'idle', 'curious', 'play', 'celebrate', 'rest'];
    setNaturalPose(sectionPoses[currentSection] || 'idle');
  }, [currentSection]);

  const getEyeOffset = () => {
    if (!eyeFollowMouse) return { x: 0, y: 0 };
    return {
      x: Math.max(-2, Math.min(2, (mousePos.x - window.innerWidth / 2) / 200)),
      y: Math.max(-1, Math.min(1, (mousePos.y - window.innerHeight / 2) / 200))
    };
  };

  const eyeOffset = getEyeOffset();

  // Ear animation based on pose
  const getEarTransform = () => {
    switch (pose) {
      case 'curious':
        return { left: 'rotate(-15deg)', right: 'rotate(15deg)' };
      case 'play':
        return { left: 'rotate(-30deg) translateY(-2px)', right: 'rotate(30deg) translateY(-2px)' };
      case 'celebrate':
        return { left: 'rotate(-20deg)', right: 'rotate(20deg)' };
      default:
        return { left: 'rotate(0deg)', right: 'rotate(0deg)' };
    }
  };

  const earTransform = getEarTransform();

  return (
    <motion.div
      className={`kibo-character ${className}`}
      style={{ width: size, height: size }}
      animate={{
        y: pose === 'play' ? [0, -5, 0] : 0,
      }}
      transition={{
        y: pose === 'play' ? { duration: 0.5, repeat: Infinity } : { duration: 0 }
      }}
    >
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Body */}
        <motion.ellipse
          cx="30"
          cy="42"
          rx="18"
          ry="14"
          fill="#f5e6d3"
          stroke="#e8d5c4"
          strokeWidth="1"
          animate={{
            scaleY: pose === 'sleep' ? 0.85 : 1,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Head */}
        <motion.ellipse
          cx="30"
          cy="24"
          rx="16"
          ry="14"
          fill="#f5e6d3"
          stroke="#e8d5c4"
          strokeWidth="1"
          animate={{
            y: pose === 'sleep' ? 3 : 0,
            rotate: pose === 'curious' ? 3 : pose === 'play' ? [-2, 2, -2] : 0,
          }}
          transition={{
            y: { duration: 0.3 },
            rotate: pose === 'play' ? { duration: 0.6, repeat: Infinity } : { duration: 0.3 }
          }}
        />

        {/* Left Ear */}
        <motion.path
          d="M14 18 Q10 8 18 12 Q22 14 20 20"
          fill="#f5e6d3"
          stroke="#e8d5c4"
          strokeWidth="1"
          style={{ transform: earTransform.left }}
          transform-origin="18px 18px"
        />
        <path d="M16 16 Q14 12 18 14" fill="#fcd5ce" />

        {/* Right Ear */}
        <motion.path
          d="M46 18 Q50 8 42 12 Q38 14 40 20"
          fill="#f5e6d3"
          stroke="#e8d5c4"
          strokeWidth="1"
          style={{ transform: earTransform.right }}
          transform-origin="42px 18px"
        />
        <path d="M44 16 Q46 12 42 14" fill="#fcd5ce" />

        {/* Eyes */}
        {pose === 'sleep' ? (
          <>
            {/* Closed eyes */}
            <path d="M22 24 Q26 22 30 24" stroke="#5a4a3a" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M38 24 Q34 22 30 24" stroke="#5a4a3a" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Z's for sleeping */}
            <motion.text
              x="42"
              y="12"
              fontSize="8"
              fill="#8b7355"
              opacity="0.6"
              animate={{ y: [0, -4, 0], opacity: [0.6, 0.3, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              z
            </motion.text>
          </>
        ) : (
          <>
            {/* Eye whites */}
            <ellipse cx="24" cy="23" rx="4" ry="4.5" fill="white" />
            <ellipse cx="36" cy="23" rx="4" ry="4.5" fill="white" />

            {/* Pupils */}
            {isBlinking ? (
              <>
                <path d="M20 23 L28 23" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" />
                <path d="M32 23 L40 23" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <motion.ellipse
                  cx={24 + eyeOffset.x}
                  cy={23 + eyeOffset.y}
                  rx="2.5"
                  ry={pose === 'curious' ? 3.5 : pose === 'play' ? 4 : 3}
                  fill="#3a3a3a"
                  animate={{
                    scaleY: pose === 'celebrate' ? [1, 0.5, 1] : 1
                  }}
                  transition={{ duration: 0.3, repeat: pose === 'celebrate' ? Infinity : 0 }}
                />
                <motion.ellipse
                  cx={36 + eyeOffset.x}
                  cy={23 + eyeOffset.y}
                  rx="2.5"
                  ry={pose === 'curious' ? 3.5 : pose === 'play' ? 4 : 3}
                  fill="#3a3a3a"
                  animate={{
                    scaleY: pose === 'celebrate' ? [1, 0.5, 1] : 1
                  }}
                  transition={{ duration: 0.3, repeat: pose === 'celebrate' ? Infinity : 0 }}
                />
                {/* Eye shine */}
                <circle cx={25 + eyeOffset.x} cy={22 + eyeOffset.y} r="1" fill="white" />
                <circle cx={37 + eyeOffset.x} cy={22 + eyeOffset.y} r="1" fill="white" />
              </>
            )}
          </>
        )}

        {/* Nose */}
        <ellipse cx="30" cy="28" rx="2" ry="1.5" fill="#fcd5ce" />

        {/* Mouth */}
        {pose === 'play' || pose === 'celebrate' ? (
          <motion.path
            d="M26 32 Q30 36 34 32"
            stroke="#d4a574"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            animate={{
              scaleY: [1, 1.2, 1]
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        ) : (
          <path d="M28 30 Q30 32 32 30" stroke="#d4a574" strokeWidth="1" strokeLinecap="round" fill="none" />
        )}

        {/* Whiskers */}
        <g opacity="0.4">
          <line x1="10" y1="26" x2="20" y2="28" stroke="#c4a484" strokeWidth="0.5" />
          <line x1="10" y1="30" x2="20" y2="30" stroke="#c4a484" strokeWidth="0.5" />
          <line x1="40" y1="28" x2="50" y2="26" stroke="#c4a484" strokeWidth="0.5" />
          <line x1="40" y1="30" x2="50" y2="30" stroke="#c4a484" strokeWidth="0.5" />
        </g>

        {/* Tail */}
        <motion.path
          d="M46 45 Q54 40 52 50 Q50 55 46 52"
          fill="#f5e6d3"
          stroke="#e8d5c4"
          strokeWidth="1"
          animate={{
            d: pose === 'play'
              ? 'M46 45 Q62 35 58 48 Q55 58 46 52'
              : pose === 'celebrate'
                ? 'M46 45 Q60 38 56 52 Q52 60 46 52'
                : 'M46 45 Q54 40 52 50 Q50 55 46 52'
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Blush cheeks for happy poses */}
        {(pose === 'play' || pose === 'celebrate' || pose === 'curious') && (
          <>
            <ellipse cx="20" cy="28" rx="3" ry="2" fill="#fcd5ce" opacity="0.5" />
            <ellipse cx="40" cy="28" rx="3" ry="2" fill="#fcd5ce" opacity="0.5" />
          </>
        )}
      </svg>
    </motion.div>
  );
};

export default KiboCharacter;
