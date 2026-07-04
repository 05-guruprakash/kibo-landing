import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

const EveningSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setShowWaitlist(false);
        setSubmitted(false);
        setEmail('');
      }, 2200);
    }
  };

  return (
    <section ref={ref} className="section-wrapper" data-section="evening">
      {/* Night gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(10,20,50,0.4) 100%)' }}
      />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(70)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2.5 + 0.5,
              height: Math.random() * 2.5 + 0.5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
            animate={{ opacity: [0.1, 0.9, 0.1] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
      </div>

      {/* Moon */}
      <motion.div
        className="absolute top-[8%] right-[12%] w-16 h-16 sm:w-20 sm:h-20 rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #fff9e6, #f0e6c8)',
          boxShadow: '0 0 50px rgba(255,245,200,0.35), 0 0 100px rgba(255,240,180,0.15)'
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-md mx-auto text-center">
        {/* Sleepy Kibo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, type: 'spring', stiffness: 160 }}
          className="mb-8 relative"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="90" height="90" viewBox="0 0 60 60" fill="none" className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px]">
              <ellipse cx="30" cy="42" rx="18" ry="12" fill="#f5e6d3" />
              <ellipse cx="30" cy="24" rx="16" ry="13" fill="#f5e6d3" />
              <path d="M14 18 Q10 8 18 12 Q22 14 20 20" fill="#f5e6d3" />
              <path d="M46 18 Q50 8 42 12 Q38 14 40 20" fill="#f5e6d3" />
              {/* Closed sleepy eyes */}
              <path d="M22 24 Q26 21.5 30 24" stroke="#5a4a3a" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M38 24 Q34 21.5 30 24" stroke="#5a4a3a" strokeWidth="2" strokeLinecap="round" fill="none" />
              <ellipse cx="30" cy="28" rx="2" ry="1.5" fill="#fcd5ce" />
              {/* Tail */}
              <path d="M46 45 Q54 40 52 50 Q50 55 46 52" fill="#f5e6d3" stroke="#e8d5c4" strokeWidth="0.8" />
            </svg>
          </motion.div>
          {/* Floating Z's */}
          {['z', 'z', 'z'].map((z, i) => (
            <motion.span
              key={i}
              className="absolute text-white/50 font-semibold select-none"
              style={{
                fontSize: 10 + i * 3,
                right: -8 - i * 10,
                top: 10 + i * 10,
                fontFamily: 'Fredoka, sans-serif'
              }}
              animate={{ y: [0, -12, 0], opacity: [0.4, 0.1, 0.4] }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.7 }}
            >
              {z}
            </motion.span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="section-title text-white mb-4"
          style={{ textShadow: '0 2px 30px rgba(255,255,255,0.2)' }}
        >
          Bring Kibo Home
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="text-white/60 mb-10 leading-relaxed"
          style={{ fontFamily: 'Quicksand, sans-serif' }}
        >
          A tiny desktop companion, coming soon.
        </motion.p>

        {/* CTA — single Join Waitlist button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => setShowWaitlist(true)}
            className="cta-button text-[#1a3a1a] px-10"
            style={{ background: 'white', boxShadow: '0 8px 32px rgba(255,255,255,0.2)' }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Join Waitlist
          </motion.button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-white/35 text-xs"
          style={{ fontFamily: 'Quicksand, sans-serif' }}
        >
          {['Private by design', 'No account required', 'Runs locally'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              {t}
            </span>
          ))}
        </motion.div>

        {/* Footer credit */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="absolute bottom-6 text-white/25 text-xs px-4 text-center"
          style={{ fontFamily: 'Quicksand, sans-serif' }}
        >
          Made with care. Kibo awaits.
        </motion.p>
      </div>

      {/* Waitlist modal (local to this section) */}
      <AnimatePresence>
        {showWaitlist && (
          <>
            <motion.div
              className="fixed inset-0 z-[60]"
              style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWaitlist(false)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-sm mx-4"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            >
              <div
                className="rounded-3xl p-6 sm:p-8 text-center"
                style={{
                  background: 'linear-gradient(160deg, #f0f9f0, #e8f5e8)',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.8) inset',
                  border: '1px solid rgba(255,255,255,0.7)'
                }}
              >
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h3
                        className="text-2xl text-[#2a4a2a] mb-2"
                        style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 500 }}
                      >
                        Kibo is almost ready
                      </h3>
                      <p className="text-sm text-[#5a7a5a] mb-6">
                        Be the first to know when Kibo is available.
                      </p>
                      <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                          style={{
                            background: 'rgba(255,255,255,0.8)',
                            border: '1.5px solid #c4d8c4',
                            color: '#3a4a3a',
                            fontFamily: 'Quicksand, sans-serif'
                          }}
                        />
                        <motion.button
                          type="submit"
                          className="w-full py-3 rounded-xl text-white font-semibold text-sm"
                          style={{
                            background: 'linear-gradient(135deg, #4a9a5a, #3a7a4a)',
                            fontFamily: 'Fredoka, sans-serif',
                            letterSpacing: '0.02em'
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Notify Me
                        </motion.button>
                      </form>
                      <button
                        onClick={() => setShowWaitlist(false)}
                        className="mt-4 text-xs text-[#8aaa8a] hover:text-[#5a7a5a] transition-colors"
                        style={{ fontFamily: 'Quicksand, sans-serif' }}
                      >
                        maybe later
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-4"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0], y: [0, -8, 0] }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl mb-3"
                      >
                        🎉
                      </motion.div>
                      <h3
                        className="text-xl text-[#2a4a2a] mb-1"
                        style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 500 }}
                      >
                        You're on the list!
                      </h3>
                      <p className="text-sm text-[#5a7a5a]">
                        We'll email you the moment Kibo is ready.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EveningSection;