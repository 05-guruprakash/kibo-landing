import { motion } from 'framer-motion';
import KiboSprite from './KiboSprite';
import { POSE_TO_ANIM } from '../spriteConfig';

type KiboPose = 'sitting' | 'jumpUp' | 'jumpDown';

interface KiboCharacterProps {
  className?: string;
  size?: number;
  pose: KiboPose;
  flip?: boolean;
}

const KiboCharacter = ({ className = '', size = 60, pose, flip = false }: KiboCharacterProps) => {
  const animName = POSE_TO_ANIM[pose] ?? 'sitting';

  return (
    <motion.div
      className={`kibo-character ${className}`}
      style={{ width: size, height: size, opacity: 1, visibility: 'visible' }}
    >
      <KiboSprite anim={animName} size={size} flip={flip} />
    </motion.div>
  );
};

export default KiboCharacter;