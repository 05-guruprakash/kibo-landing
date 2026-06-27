import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100, height:56,
      display:'flex', alignItems:'center',
      background: scrolled ? 'rgba(253,246,227,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(135,168,120,0.25)' : 'none',
      transition:'all 0.3s ease',
    }}>
      <div style={{ maxWidth:1080, margin:'0 auto', width:'100%', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span className="font-display" style={{ fontSize:18, fontWeight:800, color:'#1a3a0f' }}>
          🐾 <span style={{ color:'#4caf50' }}>purrfect</span>
        </span>
        <div style={{ display:'flex', gap:28, alignItems:'center' }}>
          {[['Features','#features'],['Setup','#how-it-works'],['Download','#download']].map(([l,h]) => (
            <a key={l} href={h} style={{ fontSize:14, fontWeight:500, color:'#2d5a27', textDecoration:'none', transition:'color 0.2s' }}
               onMouseEnter={e=>(e.currentTarget.style.color='#4caf50')}
               onMouseLeave={e=>(e.currentTarget.style.color='#2d5a27')}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
