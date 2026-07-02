import { useEffect, useRef } from 'react'
import PixelCat from './PixelCat'

const features = [
  { icon:'⚡', title:'Featherlight', desc:'Barely there. Runs quietly in the background without slowing you down.', span:1 },
  { icon:'🧠', title:'Actually talks back', desc:'A real AI companion that remembers your conversations and grows a personality the longer you talk.', span:2 },
  { icon:'🎨', title:'Hand-pixeled', desc:'Every frame drawn with care, not generated. It looks alive because it was made to feel that way.', span:1 },
  { icon:'🐾', title:'Chases & plays', desc:'Follows your cursor, gets dizzy when you circle it, headpats on click. It notices you.', span:1 },
  { icon:'😴', title:'Has real moods', desc:'Gets hungry, gets bored, gets sleepy. Ignore it too long and it\u2019ll let you know.', span:1 },
  { icon:'🔮', title:'Always evolving', desc:'New companions, new animations, new behaviors — shipped regularly.', span:1 },
]

export default function BentoGrid() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      ref.current?.querySelectorAll<HTMLElement>('.bc').forEach((el,i) => {
        setTimeout(() => { el.style.opacity='1'; el.style.transform='translateY(0)' }, i*80)
      })
      obs.disconnect()
    }, { threshold:0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="features" ref={ref} style={{
      background:'linear-gradient(180deg,#e8f5e9,#fdf6e3)',
      padding:'100px 24px',
    }}>
      <div style={{ maxWidth:1080, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <span style={{
            fontFamily:'JetBrains Mono,monospace', fontSize:11,
            color:'#4caf50', border:'1px solid rgba(76,175,80,0.35)',
            borderRadius:20, padding:'4px 14px', display:'inline-block', marginBottom:16,
          }}>features</span>
          <h2 className="font-display" style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:800, color:'#1a3a0f', lineHeight:1.2 }}>
            More than a pet.<br />
            <span style={{ color:'#4caf50' }}>A companion.</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="bento-grid-3">
          {features.map((f,i) => (
            <div
              key={i}
              className={`bento bc ${f.span===2?'bento-sky':i===0?'bento-green':''} ${f.span===2?'bento-span-2':''}`}
              style={{
                opacity:0, transform:'translateY(18px)',
                transition:'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              <div style={{ fontSize:32, marginBottom:14 }}>{f.icon}</div>
              <h3 className="font-display" style={{ fontSize:18, fontWeight:700, color:'#1a3a0f', marginBottom:8 }}>{f.title}</h3>
              <p style={{ fontSize:14, color:'#5a6e4a', lineHeight:1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Showcase bento below */}
        <div id="showcase" className="bento-grid-3" style={{ marginTop:16 }}>
          {/* Large showcase */}
          <div className="bento bc bento-green bento-span-2 bento-showcase" style={{
            minHeight:220,
            opacity:0, transform:'translateY(18px)',
            transition:'opacity 0.5s ease, transform 0.5s ease',
            display:'flex', alignItems:'center', justifyContent:'space-between',
          }}>
            <div>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#4caf50', display:'block', marginBottom:10 }}>companion preview</span>
              <h3 className="font-display" style={{ fontSize:22, fontWeight:700, color:'#1a3a0f', marginBottom:8 }}>Meet your pet</h3>
              <p style={{ fontSize:14, color:'#5a6e4a', lineHeight:1.7, maxWidth:300 }}>
                Sits on your desktop. Reacts to your cursor. Talks back. Gets bored if you ignore it.
              </p>
            </div>
            <div className="anim-bob" style={{ marginLeft:24 }}>
              <PixelCat size={7} />
            </div>
          </div>

          {/* Stats card */}
          <div className="bento bc" style={{
            opacity:0, transform:'translateY(18px)',
            transition:'opacity 0.5s ease, transform 0.5s ease',
          }}>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#87a878', display:'block', marginBottom:16 }}>real-time stats</span>
            {[{l:'happiness',v:82,c:'#4caf50'},{l:'energy',v:55,c:'#f5c842'},{l:'hunger',v:31,c:'#ef9a9a'}].map(s => (
              <div key={s.l} style={{ marginBottom:12 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#5a6e4a' }}>{s.l}</span>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#87a878' }}>{s.v}</span>
                </div>
                <div style={{ height:6, background:'rgba(135,168,120,0.2)', borderRadius:4 }}>
                  <div style={{ height:'100%', width:`${s.v}%`, background:s.c, borderRadius:4, transition:'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}