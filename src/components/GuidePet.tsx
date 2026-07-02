import { useEffect, useRef, useState } from 'react'
import PixelCat from './PixelCat'

// Messages the guide says as the visitor scrolls through each section.
// Keyed by the section's `id` attribute — add a new id below to extend it.
const SECTION_MESSAGES: Record<string, string> = {
  hero: "hi! i'm pixel 🐾",
  features: 'i chase your cursor for real!',
  showcase: 'click me sometime, i love pats',
  download: 'take me home?',
}

const SECTION_IDS = Object.keys(SECTION_MESSAGES)

export default function GuidePet() {
  const trackRef = useRef<HTMLDivElement>(null)
  const catRef = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState(SECTION_MESSAGES.hero)
  const [facingLeft, setFacingLeft] = useState(false)
  const [bounce, setBounce] = useState(false)

  const lastProgress = useRef(0)
  const reduceMotion = useRef(false)

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Walk across the screen as the page scrolls (rAF-throttled) ──────────
    let ticking = false
    const updatePosition = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0

      if (catRef.current) {
        const trackWidth = window.innerWidth - catRef.current.offsetWidth - 24
        const x = Math.max(0, Math.min(trackWidth, progress * trackWidth))
        catRef.current.style.transform = `translate3d(${x}px, 0, 0)`
      }

      if (!reduceMotion.current) {
        setFacingLeft(progress < lastProgress.current)
      }
      lastProgress.current = progress
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updatePosition)
        ticking = true
      }
    }

    updatePosition()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    // ── Swap speech bubble + do a little hop when a new section arrives ────
    const sections = SECTION_IDS
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.id in SECTION_MESSAGES) {
            setMessage(SECTION_MESSAGES[entry.target.id])
            if (!reduceMotion.current) {
              setBounce(true)
              setTimeout(() => setBounce(false), 500)
            }
          }
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach(s => obs.observe(s))

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      obs.disconnect()
    }
  }, [])

  return (
    <div
      ref={trackRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        bottom: 'clamp(12px, 3vw, 24px)',
        left: 12,
        right: 12,
        zIndex: 90,
        pointerEvents: 'none',
        height: 0,
      }}
    >
      <div
        ref={catRef}
        className={bounce ? 'guide-hop' : 'anim-bob'}
        style={{
          position: 'relative',
          width: 'clamp(48px, 8vw, 72px)',
          transition: 'transform 0.05s linear',
        }}
      >
        {/* Speech bubble */}
        <div
          className="guide-bubble"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: 8,
            whiteSpace: 'nowrap',
            background: '#fdf6e3',
            border: '1.5px solid rgba(135,168,120,0.4)',
            borderRadius: 12,
            padding: '6px 12px',
            fontSize: 'clamp(10px, 2.2vw, 12px)',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 600,
            color: '#1a3a0f',
            boxShadow: '0 4px 14px rgba(26,58,15,0.15)',
          }}
        >
          {message}
          <div
            style={{
              position: 'absolute', top: '100%', left: '50%',
              transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid rgba(135,168,120,0.4)',
            }}
          />
        </div>

        {/* Cat — sized to roughly fill the clamp()'d wrapper width */}
        <div style={{
          transform: `scaleX(${facingLeft ? -1 : 1})`,
          transformOrigin: facingLeft ? 'right bottom' : 'left bottom',
        }}>
          <PixelCat size={4} />
        </div>
      </div>
    </div>
  )
}