const steps = [
  { num: '01', title: 'download & run', desc: 'One installer. No setup wizard. No account. The cat appears on your desktop in 10 seconds.' },
  { num: '02', title: 'add your ai key', desc: 'Drop in an OpenAI, Gemini, or Groq key. Free tier works fine. The cat gets its brain.' },
  { num: '03', title: 'just vibe', desc: 'Play, chat, feed, ignore. The pet lives on your screen and grows with you over time.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ borderTop: '1px solid var(--border)', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <span className="tag">setup</span>
          <h2 className="font-pixel" style={{ color: 'var(--cream)', fontSize: 18, marginTop: 20, lineHeight: 2 }}>
            zero friction.<br />
            <span style={{ color: 'var(--lime)' }}>three steps.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                borderTop: '1px solid var(--border)',
                borderLeft: i > 0 ? '1px solid var(--border)' : undefined,
                padding: '40px 32px',
              }}
            >
              <div className="font-pixel" style={{ color: 'var(--lime)', fontSize: 11, opacity: 0.5, marginBottom: 24 }}>
                {step.num}
              </div>
              <h3 className="font-pixel" style={{ color: 'var(--cream)', fontSize: 10, lineHeight: 2, marginBottom: 16 }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: 'Inter,sans-serif', color: 'var(--muted-bright)', fontSize: 13, lineHeight: 1.7 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
