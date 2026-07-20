export interface Frame { x: number; y: number }
export interface AnimationDef {
  frames: Frame[]
  fps: number
  loop: boolean
}

const FRAME = 32
export const SHEET_WIDTH = 256
export const SHEET_HEIGHT = 1632
export const FRAME_SIZE = FRAME

function row(startRow: number, rowCount: number, framesPerRow: number): Frame[] {
  const out: Frame[] = []
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < framesPerRow; c++) {
      out.push({ x: c * FRAME, y: (startRow + r) * FRAME })
    }
  }
  return out
}

export type SpriteAnimName = 'sitting' | 'jumpUp' | 'jumpDown'

// Only using the first 6 of 8 columns — if the sheet's last 1-2 columns
// in these rows are blank/transparent, that's what caused the flicker.
// If it still flickers, drop the "6" below to "5".
const JUMP_COLS = 6

export const CAT_ANIMATIONS: Record<SpriteAnimName, AnimationDef> = {
  sitting: { frames: row(9, 1, 8), fps: 4, loop: true },
  // Row 20 (1-indexed) = index 19 → used when jumping UP (bottom to top, scroll up)
  jumpUp: { frames: row(19, 1, JUMP_COLS), fps: 12, loop: false },
  // Row 21 (1-indexed) = index 20 → used when jumping DOWN (top to bottom, scroll down)
  jumpDown: { frames: row(20, 1, JUMP_COLS), fps: 12, loop: false },
}

export const POSE_TO_ANIM: Record<string, SpriteAnimName> = {
  sitting: 'sitting',
  jumpUp: 'jumpUp',
  jumpDown: 'jumpDown',
}