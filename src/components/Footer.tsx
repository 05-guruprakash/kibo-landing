import PixelCat from './PixelCat'

export default function Footer() {
  return (
    <footer id="download" style={{ borderTop: '1px solid var(--border)' }}>
      {/* Download CTA */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div className="anim-bob" style={{ display: 'inline-block', marginBottom: 24 }}>
          <PixelCat size={5} color="#c8ff00" />
        </div>
        <h2 className="font-pixel" style={{ color: 'var(--cream)', fontSize: 'clamp(13px, 2.2vw, 26px)', lineHeight: 2, marginBottom: 16 }}>
          ready to adopt?
        </h2>
        <p style={{ fontFamily: 'Inter,sans-serif', color: 'var(--muted-bright)', fontSize: 14, marginBottom: 40, maxWidth: 420, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Free forever. Open source. No telemetry. The cat is yours.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#"
            style={{
              background: 'var(--lime)', color: '#090909',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 700,
              padding: '14px 36px', textDecoration: 'none',
              border: '1px solid var(--lime)', transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            download for macOS →
          </a>
          <a
            href="#"
            style={{
              border: '1px solid var(--border)', color: 'var(--muted-bright)',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
              padding: '14px 28px', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.color = 'var(--cream)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted-bright)' }}
          >
            view on github
          </a>
        </div>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--muted)', marginTop: 20 }}>
          also available for Windows · Linux
        </p>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 48, maxWidth: 1100, margin: '0 auto' }}>
        <span className="font-pixel" style={{ color: 'var(--lime)', fontSize: 8 }}>purrfect</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--muted)' }}>made with ♥ and too much coffee</span>
      </div>
    </footer>
  )
}
