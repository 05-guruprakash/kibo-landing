import { CAT_ANIMATIONS } from '../spriteConfig';
import catSheet from '../assets/Cat-Sheet.png';

interface CatSpriteIconProps {
  size?: number;
  className?: string;
}

const SITTING_FRAME = CAT_ANIMATIONS.sitting.frames[0];
const NATIVE_FRAME = 32;

const CatSpriteIcon = ({ size = 28, className = '' }: CatSpriteIconProps) => {
  const scale = size / NATIVE_FRAME;
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${catSheet})`,
        backgroundPosition: `-${SITTING_FRAME.x * scale}px -${SITTING_FRAME.y * scale}px`,
        backgroundSize: `${256 * scale}px ${1632 * scale}px`,
        imageRendering: 'pixelated',
        flexShrink: 0
      }}
    />
  );
};

export default CatSpriteIcon;