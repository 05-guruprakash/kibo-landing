// Cat-Sheet.png is a 256x1632 grid of 32x32 frames (8 columns x 51 rows).
// Each animation below is a named slice of that grid.

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

export type SpriteAnimName =
  | 'idle' | 'walking' | 'running' | 'runStop'
  | 'sitting' | 'sleeping' | 'sleepingIdle' | 'waking'
  | 'jumpStart' | 'jumpMid' | 'jumpLand'

export const CAT_ANIMATIONS: Record<SpriteAnimName, AnimationDef> = {
  idle:         { frames: row(0, 3, 8),  fps: 8,  loop: true  },
  walking:      { frames: row(3, 1, 8),  fps: 10, loop: true  },
  running:      { frames: row(5, 1, 8),  fps: 14, loop: true  },
  runStop:      { frames: row(7, 1, 8),  fps: 12, loop: false },
  sitting:      { frames: row(10, 1, 8), fps: 4,  loop: true  },
  sleeping:     { frames: row(11, 1, 8), fps: 4,  loop: true  },
  sleepingIdle: { frames: row(12, 1, 8), fps: 3,  loop: true  },
  waking:       { frames: row(15, 2, 8), fps: 10, loop: false },
  jumpStart:    { frames: row(18, 1, 8), fps: 12, loop: false },
  jumpMid:      { frames: row(19, 1, 8), fps: 10, loop: true  },
  jumpLand:     { frames: row(20, 1, 8), fps: 12, loop: false },
}

// Maps your existing KiboPose names -> sprite animation to play.
export const POSE_TO_ANIM: Record<string, SpriteAnimName> = {
  sleep: 'sleeping',
  waking: 'waking',
  idle: 'idle',
  curious: 'sitting',
  play: 'running',
  celebrate: 'jumpMid',
  rest: 'sleepingIdle',
}