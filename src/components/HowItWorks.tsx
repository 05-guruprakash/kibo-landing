const steps = [
  { num:'01', icon:'⬇️', title:'Download & Install', desc:'One installer. No setup wizard. No account required. Launches in seconds.' },
  { num:'02', icon:'🔑', title:'Add Your AI Key', desc:'Paste in OpenAI, Gemini, or Groq key. Free tier works perfectly.' },
  { num:'03', icon:'🐱', title:'Meet Your Pet', desc:'Your companion appears. Feed it. Play with it. Talk to it. It grows with you.' },
]

const faqs = [
  { q:'Is it free?', a:'Yes. Free forever. Open source. No subscriptions.' },
  { q:'Do I need an AI key?', a:'Only for chat. The pet lives and animates without one.' },
  { q:'How much RAM does it use?', a:'Under 50MB. You\'ll forget it\'s running.' },
  { q:'Will you add more pets?', a:'Dog and bunny are next. More species planned.' },
]

export default function HowItWorks() {
  return (
    <>
      {/* How it works */}
      <section id="how-it-works" style={{ background:'#fdf6e3', padding:'80px 24px', borderTop:'1px solid rgba(135,168,120,0.2)' }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#4caf50', border:'1px solid rgba(76,175,80,0.35)', borderRadius:20, padding:'4px 14px', display:'inline-block', marginBottom:16 }}>setup</span>
            <h2 className="font-display" style={{ fontSize:'clamp(24px,3.5vw,40px)', fontWeight:800, color:'#1a3a0f' }}>
              Up in <span style={{ color:'#4caf50' }}>30 seconds</span>
            </h2>
          </div>

          <div className="steps-grid-3">
            {steps.map((s,i) => (
              <div key={i} className={i>0 ? 'step-divider' : undefined} style={{
                padding:'40px 32px', textAlign:'center',
              }}>
                <div style={{ fontSize:36, marginBottom:16 }}>{s.icon}</div>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'rgba(76,175,80,0.5)', marginBottom:12 }}>{s.num}</div>
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