import { useEffect, useRef } from 'react'
import PixelCat from './PixelCat'

export default function BentoGrid() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        ref.current?.querySelectorAll<HTMLElement>('.bento-card').forEach((el, i) => {
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }, i * 90)
        })
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const cardBase: React.CSSProperties = {
    opacity: 0,
    transform: 'translateY(18px)',
    transition: 'opacity 0.5s ease, transform 0.5s ease, border-color 0.2s, translate 0.2s',
  }

  return (
    <section id="features" ref={ref} style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: 56 }}>
        <span className="tag">features</span>
        <h2 className="font-pixel" style={{ color: 'var(--cream)', fontSize: 20, marginTop: 20, lineHeight: 2 }}>
          more than a pet.<br />
          <span style={{ color: 'var(--lime)' }}>a companion.</span>
        </h2>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>

        {/* AI Chat — spans 2 cols */}
        <div
          className="bento-card bento-card-accent"
          style={{ ...cardBase, gridColumn: 'span 2', minHeight: 300 }}
        >
          <span className="tag">ai brain</span>
          <h3 className="font-pixel" style={{ color: 'var(--cream)', fontSize: 11, marginTop: 16, marginBottom: 12, lineHeight: 2 }}>
            actually talks back
          </h3>
          <p style={{ color: 'var(--muted-bright)', fontFamily: 'Inter,sans-serif', fontSize: 13, lineHeight: 1.7, maxWidth: 420 }}>
            Full AI conversation memory. Ask it things, vent to it, get advice.
            It remembers your last chat and builds a personality over time.
          </p>
          {/* Fake chat */}
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { user: true,  msg: 'how do i fix this bug 😭' },
              { user: false, msg: "meow... have you tried turning it off?" },
            ].map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.user ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                  padding: '8px 12px', maxWidth: 260,
                  background: m.user ? 'rgba(200,255,0,0.08)' : 'var(--surface)',
                  border: `1px solid ${m.user ? 'rgba(200,255,0,0.2)' : 'var(--border)'}`,
                  color: m.user ? 'var(--lime)' : 'var(--cream)',
                }}>
                  {m.msg}
                </div>
              </div>
            ))}
          </div>
          {/* Corner cat */}
          <div style={{ position: 'absolute', bottom: 16, right: 16, opacity: 0.15 }}>
            <PixelCat size={3} color="#c8ff00" />
          </div>
        </div>

        {/* Cursor chase */}
        <div className="bento-card" style={{ ...cardBase, minHeight: 300 }}>
          <span className="tag">reactive</span>
          <h3 className="font-pixel" style={{ color: 'var(--cream)', fontSize: 10, marginTop: 16, marginBottom: 12, lineHeight: 2 }}>
            chases your cursor
          </h3>
          <p style={{ color: 'var(--muted-bright)', fontFamily: 'Inter,sans-serif', fontSize: 13, lineHeight: 1.6 }}>
            Move fast and it sprints. Circle the mouse and it gets dizzy-happy.
          </p>
          <div style={{ marginTop: 32, position: 'relative', height: 80 }}>
            <div className="anim-bob" style={{ position: 'absolute', bottom: 0, left: 8 }}>
              <PixelCat size={4} color="#c8ff00" />
            </div>
            <div className="anim-pulse" style={{ position: 'absolute', top: 8, right: 20, width: 8, height: 8, background: 'var(--lime)' }} />
            <div style={{ position: 'absolute', top: 16, right: 32, width: 4, height: 4, background: 'rgba(200,255,0,0.4)' }} />
            <div style={{ position: 'absolute', top: 24, right: 48, width: 3, height: 3, background: 'rgba(200,255,0,0.2)' }} />
          </div>
        </div>

        {/* Emotions */}
        <div className="bento-card" style={cardBase}>
          <span className="tag">emotions</span>
          <h3 className="font-pixel" style={{ color: 'var(--cream)', fontSize: 10, marginTop: 16, marginBottom: 10, lineHeight: 2 }}>
            real feelings
          </h3>
          <p style={{ color: 'var(--muted-bright)', fontFamily: 'Inter,sans-serif', fontSize: 12, lineHeight: 1.6, marginBottom: 16 }}>
            Hunger, energy, happiness — they decay in real time.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[{ label: 'happy', val: 82 }, { label: 'energy', val: 55 }, { label: 'hunger', val: 31 }].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'var(--muted)', width: 44 }}>{s.label}</span>
                <div className="stat-bar-track">
                  <div className="stat-bar-fill" style={{ width: `${s.val}%` }} />
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'var(--muted-bright)', width: 20, textAlign: 'right' }}>{s.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clipboard AI */}
        <div className="bento-card" style={cardBase}>
          <span className="tag">clipboard ai</span>
          <h3 className="font-pixel" style={{ color: 'var(--cream)', fontSize: 10, marginTop: 16, marginBottom: 10, lineHeight: 2 }}>
            watches what you copy
          </h3>
          <p style={{ color: 'var(--muted-bright)', fontFamily: 'Inter,sans-serif', fontSize: 12, lineHeight: 1.6 }}>
            Copy code or text and the cat reacts — explains, translates, or roasts it.
          </p>
          <div style={{
            marginTop: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: 'rgba(200,255,0,0.5)', border: '1px solid rgba(200,255,0,0.1)',
            background: 'var(--surface)', padding: '10px 12px', lineHeight: 1.8,
          }}>
            <span style={{ color: 'var(--muted)' }}>$ </span>copied 3 lines of python<br />
            <span style={{ color: 'rgba(200,255,0,0.8)' }}>→ "that's a syntax error bestie"</span>
          </div>
        </div>

        {/* Head pat */}
        <div className="bento-card bento-card-accent" style={cardBase}>
          <span className="tag">play mode</span>
          <h3 className="font-pixel" style={{ color: 'var(--cream)', fontSize: 10, marginTop: 16, marginBottom: 10, lineHeight: 2 }}>
            click to pat
          </h3>
          <p style={{ color: 'var(--muted-bright)', fontFamily: 'Inter,sans-serif', fontSize: 12, lineHeight: 1.6 }}>
            Click the cat during play mode. It squishes, hearts float up. Happiness +5.
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginTop: 16 }}>
            <PixelCat size={4} color="#c8ff00" className="anim-bob" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['💕','✨','⭐'].map((e, i) => (
                <span key={i} style={{ fontSize: 14, opacity: 0.7 - i * 0.2, transform: `translateY(-${i * 6}px)` }}>{e}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
