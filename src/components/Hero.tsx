import { useEffect, useRef } from 'react'
import PixelCat from './PixelCat'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.anim-item')
    els?.forEach((el, i) => {
      setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 150 + i * 130)
    })
  }, [])

  return (
    <section
      ref={ref}
      className="grid-bg"
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px 60px', position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Walking cat */}
      <div className="anim-walk" style={{ position: 'absolute', bottom: 80, left: 0, pointerEvents: 'none' }}>
        <PixelCat size={5} color="#c8ff00" className="anim-bob" />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 780 }}>

        {/* Eyebrow */}
        <div
          className="anim-item"
          style={{
            opacity: 0, transform: 'translateY(14px)', transition: 'all 0.6s ease',
            display: 'inline-block', marginBottom: 32,
          }}
        >
          <span className="tag">desktop companion</span>
        </div>

        {/* Headline */}
        <h1
          className="anim-item font-pixel"
          style={{
            opacity: 0, transform: 'translateY(14px)', transition: 'all 0.6s ease',
            fontSize: 'clamp(16px, 3vw, 36px)',
            color: 'var(--cream)',
            lineHeight: 2,
            marginBottom: 24,
            display: 'block',
          }}
        >
          a pet that{' '}
          <span style={{ color: 'var(--lime)' }}>lives on</span>
          <br />your screen
        </h1>

        {/* Sub */}
        <p
          className="anim-item"
          style={{
            opacity: 0, transform: 'translateY(14px)', transition: 'all 0.6s ease',
            color: 'var(--muted-bright)', fontFamily: 'Inter, sans-serif',
            fontSize: 17, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 40px',
          }}
        >
          Pixel-art cat companion with real AI. Chases your cursor,
          reacts to what you do, remembers your conversations.
        </p>

        {/* CTAs */}
        <div
          className="anim-item"
          style={{
            opacity: 0, transform: 'translateY(14px)', transition: 'all 0.6s ease',
            display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#download"
            style={{
              background: 'var(--lime)', color: '#090909',
              fontFamily: 'JetBrains Mono, monospace', fontWeight: 700,
              fontSize: 13, padding: '14px 32px', textDecoration: 'none',
              border: '1px solid var(--lime)', transition: 'opacity 0.15s, transform 0.1s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            download free →
          </a>
          <a
            href="#features"
            style={{
              color: 'var(--muted-bright)', fontFamily: 'Inter, sans-serif',
              fontSize: 14, textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-bright)')}
          >
            see what it does <span style={{ color: 'var(--lime)' }}>↓</span>
          </a>
        </div>

        {/* Platform badges */}
        <div
          className="anim-item"
          style={{
            opacity: 0, transform: 'translateY(14px)', transition: 'all 0.6s ease',
            display: 'flex', gap: 12, justifyContent: 'center', marginTop: 36,
          }}
        >
          {['macOS', 'Windows', 'Linux'].map(p => (
            <span
              key={p}
              style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                color: 'var(--muted)', border: '1px solid var(--border)',
                padding: '4px 12px',
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, transparent, rgba(200,255,0,0.4))' }} />
        <span className="font-pixel anim-blink" style={{ fontSize: 6, color: 'var(--muted)', letterSpacing: '0.15em' }}>scroll</span>
      </div>
    </section>
  )
}
