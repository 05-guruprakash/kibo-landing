import PixelCat from './PixelCat'

export default function Footer() {
  return (
    <footer id="download">
      {/* Download CTA hill */}
      <div style={{
        background:'linear-gradient(180deg,#e8f5e9 0%,#4caf50 60%,#2e7d32 100%)',
        padding:'80px 24px 120px', textAlign:'center', position:'relative', overflow:'hidden',
      }}>
        {/* Decorative pixel flowers */}
        {[{l:'10%',c:'#fff'},{l:'30%',c:'#f5c842'},{l:'65%',c:'#fff'},{l:'85%',c:'#f5c842'}].map((f,i) => (
          <div key={i} style={{ position:'absolute', bottom:40, left:f.l }}>
            <div style={{ width:8, height:8, background:f.c, borderRadius:'50%', boxShadow:`0 -10px 0 4px ${f.c}` }} />
          </div>
        ))}

        <div className="anim-bob" style={{ display:'inline-block', marginBottom:24 }}>
          <PixelCat size={7} />
        </div>

        <h2 className="font-display" style={{
          fontSize:'clamp(24px,4vw,48px)', fontWeight:800,
          color:'white', textShadow:'0 2px 16px rgba(0,0,0,0.2)',
          lineHeight:1.2, marginBottom:16,
        }}>
          Ready to adopt?
        </h2>
        <p style={{ fontSize:16, color:'rgba(255,255,255,0.85)', marginBottom:40, maxWidth:400, margin:'0 auto 40px', lineHeight:1.7 }}>
          Free forever. Open source. No telemetry.<br />The cat is entirely yours.
        </p>

        <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
          <a href="#" className="btn-primary" style={{ background:'white', color:'#2e7d32', boxShadow:'0 4px 20px rgba(0,0,0,0.15)' }}>
            🐾 Download Desktop Pet
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-secondary" style={{ background:'rgba(255,255,255,0.2)', color:'white', borderColor:'rgba(255,255,255,0.4)' }}>
            ★ View on GitHub
          </a>
        </div>

        <p style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'rgba(255,255,255,0.6)', marginTop:24 }}>
          macOS · Windows · Linux
        </p>
      </div>

      {/* Bottom bar */}
      <div style={{ background:'#1a3a0f', padding:'20px 24px', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <p style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'rgba(255,255,255,0.4)' }}>
          made with 🍵 and pixel magic
        </p>
      </div>
    </footer>
  )
}
