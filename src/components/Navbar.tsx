import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="font-pixel" style={{ color: 'var(--lime)', fontSize: 10 }}>purrfect</span>

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['features', 'how it works', 'download'].map(item => (
            <a
              key={item}
              href={`#${item.replace(/ /g, '-')}`}
              style={{ color: 'var(--muted-bright)', fontSize: 13, textDecoration: 'none', fontFamily: 'Inter, sans-serif', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-bright)')}
            >
              {item}
            </a>
          ))}
          <a
            href="#download"
            style={{
              background: 'var(--lime)', color: '#090909',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 600,
              padding: '8px 16px', textDecoration: 'none',
              border: '1px solid var(--lime)', transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            get it free →
          </a>
        </div>
      </div>
    </nav>
  )
}
