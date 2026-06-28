import { useEffect, useRef, useState } from 'react'
import PixelCat from './PixelCat'
import WaitlistModal from './WaitlistModal'
const GITHUB_REPO_URL = 'https://github.com/abinaya2006/kibo'

function PixelButterfly({ color = '#7ec8e3' }: { color?: string }) {
  const u = 3
  const px = [[0,1],[1,0],[1,1],[2,1],[3,0],[3,1]].map(([c,r]) => `${c*u}px ${r*u}px 0 ${color}`).join(',')
  return (
    <div style={{ position:'relative', width:`${4*u}px`, height:`${2*u}px` }}>
      <div className="anim-flutter" style={{ width:`${u}px`, height:`${u}px`, boxShadow:px, position:'absolute', top:0, left:0 }} />
    </div>
  )
}

function Cloud({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ position:'absolute', ...style }}>
      <div style={{ background:'rgba(245,245,240,0.92)', borderRadius:'50px', width:120, height:40, position:'relative', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
        <div style={{ position:'absolute', top:-20, left:20, width:60, height:50, background:'rgba(245,245,240,0.92)', borderRadius:'50%' }} />
        <div style={{ position:'absolute', top:-12, left:55, width:45, height:40, background:'rgba(245,245,240,0.95)', borderRadius:'50%' }} />
      </div>
    </div>
  )
}

function GrassRow() {
  const blades = Array.from({length:60},(_,i) => ({
    h: 20 + Math.random()*30, x: i*(100/60),
    delay: Math.random()*2, color: Math.random()>0.5 ? '#4caf50' : '#66bb6a',
  }))
  return (
    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:60 }}>
      {blades.map((b,i) => (
        <div key={i} className="anim-sway" style={{
          position:'absolute', left:`${b.x}%`, bottom:0,
          width:3, height:b.h, borderRadius:'2px 2px 0 0',
          background:`linear-gradient(to top, #2e7d32, ${b.color})`,
          animationDelay:`${b.delay}s`,
        }} />
      ))}
    </div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  useEffect(() => {
    ref.current?.querySelectorAll<HTMLElement>('.fi').forEach((el,i) => {
      el.style.animationDelay = `${i*0.13}s`
      el.style.opacity = '0'
      el.style.animationFillMode = 'forwards'
    })
  }, [])

  return (
    <section ref={ref} style={{
      minHeight:'100vh', position:'relative', overflow:'hidden',
      background:'linear-gradient(180deg, #7ec8e3 0%, #b8e4f5 30%, #d4f0c8 65%, #4caf50 100%)',
    }}>
      {/* Clouds */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
        <Cloud style={{ top:60, left:'8%', animation:'drift 40s linear infinite' }} />
        <Cloud style={{ top:40, left:'45%', animation:'drift 55s linear infinite', opacity:0.85 }} />
        <Cloud style={{ top:80, left:'72%', animation:'drift 48s linear infinite', opacity:0.7 }} />
        <Cloud style={{ top:60, left:'108%', animation:'drift 40s linear infinite' }} />
        <Cloud style={{ top:40, left:'145%', animation:'drift 55s linear infinite', opacity:0.85 }} />
      </div>

      {/* Hills */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'42%', pointerEvents:'none' }}>
        <div style={{ position:'absolute', bottom:'30%', left:'-5%', right:'-5%', height:'60%', background:'linear-gradient(180deg,#66bb6a,#4caf50)', borderRadius:'80% 80% 0 0 / 60% 60% 0 0' }} />
        <div style={{ position:'absolute', bottom:0, left:'-5%', right:'-5%', height:'70%', background:'linear-gradient(180deg,#81c784,#388e3c)', borderRadius:'70% 70% 0 0 / 50% 50% 0 0' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0 }}><GrassRow /></div>
      </div>

      {/* Butterflies */}
      <div style={{ position:'absolute', top:'28%', left:'18%' }} className="anim-float"><PixelButterfly color="#7ec8e3" /></div>
      <div style={{ position:'absolute', top:'35%', right:'22%', animationDelay:'1.2s' }} className="anim-float"><PixelButterfly color="#f5c842" /></div>

      {/* Cat */}
      <div style={{ position:'absolute', bottom:'18%', right:'22%' }} className="anim-bob">
        <PixelCat size={6} />
      </div>

      {/* Flowers */}
      {[{l:'12%',c:'#f5c842'},{l:'35%',c:'#fff'},{l:'58%',c:'#ffb3c1'},{l:'80%',c:'#f5c842'}].map((f,i) => (
        <div key={i} style={{ position:'absolute', bottom:'14%', left:f.l }}>
          <div style={{ width:6, height:6, background:f.c, borderRadius:'50%', boxShadow:`0 -8px 0 3px ${f.c}` }} />
        </div>
      ))}

      {/* Content */}
      <div style={{ position:'relative', zIndex:10, textAlign:'center', paddingTop:'12vh', paddingLeft:24, paddingRight:24 }}>
        <div className="fi fade-up" style={{ display:'inline-block', marginBottom:20, background:'rgba(253,246,227,0.85)', border:'1px solid rgba(135,168,120,0.4)', borderRadius:20, padding:'5px 14px', fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#2d5a27' }}>
          v1.0.0 — coming soon
        </div>

        <h1 className="fi fade-up font-display" style={{ fontSize:'clamp(42px,7vw,88px)', fontWeight:800, color:'#1a3a0f', lineHeight:1.1, marginBottom:20, textShadow:'0 2px 12px rgba(255,255,255,0.4)' }}>
          Your tiny<br />
          <span style={{ color:'#fff', textShadow:'0 2px 20px rgba(46,125,50,0.4)' }}>pixel companion</span>
        </h1>

        <p className="fi fade-up" style={{ fontSize:18, color:'#2c3e1f', maxWidth:480, margin:'0 auto 40px', lineHeight:1.7, fontWeight:500, textShadow:'0 1px 4px rgba(255,255,255,0.6)' }}>
          A pixel-art desktop pet powered by AI. Chases your cursor,
          remembers your chats, lives on your screen.
        </p>

        {/* CTAs */}
        <div className="fi fade-up" style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', marginBottom:36 }}>
          <button onClick={() => setWaitlistOpen(true)} className="btn-primary anim-breathe">
            🐾 Join Waitlist
          </button>
          <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer" className="btn-secondary">
            ★ Star on GitHub
          </a>
        </div>

        {/* Platform badges */}
        <div className="fi fade-up" style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
          {['🍎 macOS','🪟 Windows','🐧 Linux'].map(p => (
            <span key={p} style={{ background:'rgba(253,246,227,0.8)', border:'1px solid rgba(135,168,120,0.3)', borderRadius:10, padding:'5px 14px', fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#2d5a27' }}>{p}</span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position:'absolute', bottom:80, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
        <div style={{ width:1, height:40, background:'linear-gradient(to bottom,transparent,rgba(45,90,39,0.4))' }} />
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#2d5a27', letterSpacing:'0.15em' }}>scroll</span>
      </div>

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </section>
  )
}
