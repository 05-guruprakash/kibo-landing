import { useEffect, useRef, useState } from 'react'
import type { AnimationDef, Frame } from '../spriteConfig'

// Steps through an AnimationDef's frames at its fps.
// Returns the current Frame {x,y} to use as backgroundPosition.
export function useSpriteAnimator(anim: AnimationDef): Frame {
  const [index, setIndex] = useState(0)
  const animRef = useRef(anim)
  animRef.current = anim

  useEffect(() => {
    setIndex(0) // reset to first frame whenever the animation changes
    const interval = 1000 / anim.fps
    const id = setInterval(() => {
      setIndex(i => {
        const total = animRef.current.frames.length
        const next = i + 1
        if (next >= total) {
          return animRef.current.loop ? 0 : total - 1
        }
        return next
      })
    }, interval)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anim])

  return anim.frames[Math.min(index, anim.frames.length - 1)]
}