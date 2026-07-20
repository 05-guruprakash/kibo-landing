import { useEffect, useRef } from 'react'
import KiboSprite from './KiboSprite'

// A tiny sprite cat that follows the mouse with a soft lag, facing the
// direction it's moving. Mount this once near the root of your app
// (e.g. in App.tsx) to replace a plain cursor-ball effect.
export default function CursorCat({ size = 28 }: { size?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const facingLeft = useRef(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    if (reduceMotion) {
      // snap instantly, no rAF loop, respects reduced-motion
      const onMoveInstant = (e: MouseEvent) => {
        if (wrapRef.current) {
          wrapRef.current.style.transform = `translate3d(${e.clientX + 14}px, ${e.clientY + 14}px, 0)`
        }
      }
      window.addEventListener('mousemove', onMoveInstant, { passive: true })
      return () => {
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mousemove', onMoveInstant)
      }
    }

    let rafId = 0
    const tick = () => {
      const dx = target.current.x - pos.current.x
      const dy = target.current.y - pos.current.y
      pos.current.x += dx * 0.15
      pos.current.y += dy * 0.15

      if (Math.abs(dx) > 1) facingLeft.current = dx < 0

      if (wrapRef.current) {
        wrapRef.current.style.transform =
          `translate3d(${pos.current.x + 14}px, ${pos.current.y + 14}px, 0) scaleX(${facingLeft.current ? -1 : 1})`
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      <KiboSprite anim="walking" size={size} />
    </div>
  )
}