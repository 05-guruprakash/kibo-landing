import { motion } from 'framer-motion';
import { useScrollContext } from '../contexts/ScrollContext';
import { useEffect, useState } from 'react';
import KiboSprite from './KiboSprite';
import { POSE_TO_ANIM } from '../spriteConfig';

type KiboPose = 'sleep' | 'waking' | 'idle' | 'curious' | 'play' | 'celebrate' | 'rest';

interface KiboCharacterProps {
  className?: string;
  size?: number;
  pose?: KiboPose;
  eyeFollowMouse?: boolean; // kept for API compatibility — used for a subtle look-toward-cursor drift
}

const KiboCharacter = ({
  className = '',
  size = 60,
  pose: forcedPose,
  eyeFollowMouse = true
}: KiboCharacterProps) => {
  const { currentSection } = useScrollContext();
  const [naturalPose, setNaturalPose] = useState<KiboPose>('sleep');
  const [drift, setDrift] = useState({ x: 0, y: 0 });

  const pose = forcedPose ?? naturalPose;

  useEffect(() => {
    if (!eyeFollowMouse) return;
    const handleMouseMove = (e: MouseEvent) => {
      // Subtle whole-sprite drift toward the cursor — cheap substitute for
      // per-pupil eye tracking, since the sprite is a fixed-frame image.
      setDrift({
        x: Math.max(-3, Math.min(3, (e.clientX - window.innerWidth / 2) / 200)),
        y: Math.max(-2, Math.min(2, (e.clientY - window.innerHeight / 2) / 250)),
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [eyeFollowMouse]);

  useEffect(() => {
    const sectionPoses: KiboPose[] = ['sleep', 'waking', 'idle', 'curious', 'play', 'celebrate', 'rest'];
    setNaturalPose(sectionPoses[currentSection] || 'idle');
  }, [currentSection]);

  const animName = POSE_TO_ANIM[pose] ?? 'idle';

  return (
    <motion.div
      className={`kibo-character ${className}`}
      style={{ width: size, height: size }}
      animate={{
        y: pose === 'play' ? [0, -5, 0] : drift.y,
        x: drift.x,
      }}
      transition={{
        y: pose === 'play' ? { duration: 0.5, repeat: Infinity } : { duration: 0.3 },
        x: { duration: 0.3 },
      }}
    >
      <KiboSprite anim={animName} size={size} />
    </motion.div>
  );
};

export default KiboCharacter;