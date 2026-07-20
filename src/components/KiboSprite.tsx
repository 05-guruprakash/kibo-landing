import catSheet from '../assets/Cat-Sheet.png'
import { CAT_ANIMATIONS, SHEET_WIDTH, SHEET_HEIGHT, FRAME_SIZE, type SpriteAnimName } from '../spriteConfig'
import { useSpriteAnimator } from '../hooks/useSpriteAnimator'

interface Props {
  anim: SpriteAnimName
  size?: number       // rendered width/height in px
  flip?: boolean      // mirror horizontally
  style?: React.CSSProperties
  className?: string
}

export default function KiboSprite({ anim, size = 60, flip = false, style, className }: Props) {
  const def = CAT_ANIMATIONS[anim]
  const frame = useSpriteAnimator(def)
  const scale = size / FRAME_SIZE

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        overflow: 'hidden',
        transform: flip ? 'scaleX(-1)' : undefined,
        ...style,
      }}
    >
      <div
        style={{
          width: FRAME_SIZE,
          height: FRAME_SIZE,
          backgroundImage: `url(${catSheet})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `-${frame.x}px -${frame.y}px`,
          backgroundSize: `${SHEET_WIDTH}px ${SHEET_HEIGHT}px`,
          imageRendering: 'pixelated',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  )
}