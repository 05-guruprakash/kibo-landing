import { useState } from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

type Status = 'idle' | 'loading' | 'success' | 'error'

// TODO: Replace with real API integration
async function joinWaitlist(_name: string, _email: string): Promise<void> {
  await new Promise(r => setTimeout(r, 1200)) // simulate network
  // throw new Error('API not connected') // uncomment to test error state
}

export default function WaitlistModal({ open, onClose }: Props) {
  const [name, setName]     = useState('')
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError]   = useState('')

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setStatus('loading')
    setError('')
    try {
      await joinWaitlist(name.trim(), email.trim())
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  const handleClose = () => {
    onClose()
    // reset after close animation
    setTimeout(() => { setStatus('idle'); setName(''); setEmail(''); setError('') }, 200)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 10,
    border: '1.5px solid rgba(135,168,120,0.35)',
    background: '#fdf6e3', color: '#2c3e1f',
    fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14,
    outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    /* Backdrop */
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(26,58,15,0.45)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      {/* Modal */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fdf6e3', borderRadius: 20, padding: 36,
          width: '100%', maxWidth: 420,
          border: '1.5px solid rgba(135,168,120,0.25)',
          boxShadow: '0 20px 60px rgba(26,58,15,0.2)',
        }}
      >
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🐾</div>
            <h3 className="font-display" style={{ fontSize: 22, fontWeight: 800, color: '#1a3a0f', marginBottom: 10 }}>
              You're on the list!
            </h3>
            <p style={{ fontSize: 14, color: '#5a6e4a', lineHeight: 1.7, marginBottom: 28 }}>
              We'll let you know the moment Purrfect is ready to download.
            </p>
            <button onClick={handleClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h3 className="font-display" style={{ fontSize: 20, fontWeight: 800, color: '#1a3a0f', marginBottom: 6 }}>
                  Join the Waitlist
                </h3>
                <p style={{ fontSize: 13, color: '#5a6e4a', lineHeight: 1.6 }}>
                  Be first to adopt your pixel companion.
                </p>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 20, color: '#87a878', lineHeight: 1, padding: 4,
                }}
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#2d5a27', display: 'block', marginBottom: 6 }}>
                  Name <span style={{ color: '#4caf50' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = '#4caf50')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(135,168,120,0.35)')}
                  disabled={status === 'loading'}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#2d5a27', display: 'block', marginBottom: 6 }}>
                  Email <span style={{ color: '#4caf50' }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = '#4caf50')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(135,168,120,0.35)')}
                  disabled={status === 'loading'}
                />
              </div>

              {error && (
                <p style={{ fontSize: 12, color: '#c0392b', background: 'rgba(192,57,43,0.08)', borderRadius: 8, padding: '8px 12px' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={status === 'loading'}
                style={{ width: '100%', justifyContent: 'center', marginTop: 4, opacity: status === 'loading' ? 0.7 : 1 }}
              >
                {status === 'loading' ? '🌿 Joining...' : '🐾 Join Waitlist'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
