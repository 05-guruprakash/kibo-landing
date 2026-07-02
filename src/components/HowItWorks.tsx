const highlights = [
  { icon: '🌱', title: 'Grows with you',    desc: 'Every chat, every pat, every ignored notification — it all shapes who your pet becomes.' },
  { icon: '🔒', title: 'Fully private',      desc: 'Everything stays on your machine. No accounts, no tracking, no data leaving your desktop.' },
  { icon: '💛', title: 'Made with love',     desc: 'Every sprite hand-pixeled, every animation tuned frame by frame. This isn\u2019t a template.' },
]

const faqs = [
  { q: 'Is it really free?',            a: 'Yes — free forever, open source, no subscriptions, no catch.' },
  { q: 'Will it slow down my laptop?',  a: 'No. Purrfect uses under 50MB of RAM and barely touches your CPU.' },
  { q: 'Does it need the internet?',    a: 'Only if you want it to chat back. It lives and plays offline too.' },
  { q: 'More companions coming?',       a: 'Dog and bunny are next, with more species already sketched out.' },
]

export default function HowItWorks() {
  return (
    <>
      {/* Highlights — trust / emotional benefits, not a setup guide */}
      <section style={{ background:'#fdf6e3', padding:'80px 24px', borderTop:'1px solid rgba(135,168,120,0.2)' }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#4caf50', border:'1px solid rgba(76,175,80,0.35)', borderRadius:20, padding:'4px 14px', display:'inline-block', marginBottom:16 }}>why purrfect</span>
            <h2 className="font-display" style={{ fontSize:'clamp(24px,3.5vw,40px)', fontWeight:800, color:'#1a3a0f' }}>
              Not just software.<br />
              <span style={{ color:'#4caf50' }}>A little companion.</span>
            </h2>
          </div>

          <div className="steps-grid-3">
            {highlights.map((s,i) => (
              <div key={i} className={i>0 ? 'step-divider' : undefined} style={{
                padding:'40px 32px', textAlign:'center',
              }}>
                <div style={{ fontSize:36, marginBottom:16 }}>{s.icon}</div>
                <h3 className="font-display" style={{ fontSize:16, fontWeight:700, color:'#1a3a0f', marginBottom:10 }}>{s.title}</h3>
                <p style={{ fontSize:13, color:'#5a6e4a', lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background:'linear-gradient(180deg,#fdf6e3,#e8f5e9)', padding:'80px 24px' }}>
        <div style={{ maxWidth:680, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#4caf50', border:'1px solid rgba(76,175,80,0.35)', borderRadius:20, padding:'4px 14px', display:'inline-block', marginBottom:16 }}>faq</span>
            <h2 className="font-display" style={{ fontSize:32, fontWeight:800, color:'#1a3a0f' }}>Quick answers</h2>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {faqs.map((f,i) => (
              <div key={i} className="bento" style={{ padding:'20px 24px' }}>
                <h4 className="font-display" style={{ fontSize:14, fontWeight:700, color:'#1a3a0f', marginBottom:6 }}>{f.q}</h4>
                <p style={{ fontSize:13, color:'#5a6e4a', lineHeight:1.6 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}