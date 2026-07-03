import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Counter from './react-bits/Counter';

const INITIAL_STARS = 2841;

const Navbar = () => {
  const [stars, setStars] = useState(INITIAL_STARS);
  const [starred, setStarred] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleStar = () => {
    if (!starred) {
      setStars(s => s + 1);
      setStarred(true);
    } else {
      setStars(s => s - 1);
      setStarred(false);
    }
  };

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
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <svg width="28" height="28" viewBox="0 0 60 60" fill="none">
            <ellipse cx="30" cy="42" rx="18" ry="12" fill="#f5e6d3" />
            <ellipse cx="30" cy="24" rx="16" ry="14" fill="#f5e6d3" />
            <path d="M14 18 Q10 8 18 12 Q22 14 20 20" fill="#f5e6d3" />
            <path d="M46 18 Q50 8 42 12 Q38 14 40 20" fill="#f5e6d3" />
            <circle cx="24" cy="23" r="3.5" fill="white" />
            <circle cx="36" cy="23" r="3.5" fill="white" />
            <circle cx="24" cy="23" r="2" fill="#3a3a3a" />
            <circle cx="36" cy="23" r="2" fill="#3a3a3a" />
            <circle cx="25" cy="22" r="0.8" fill="white" />
            <circle cx="37" cy="22" r="0.8" fill="white" />
            <ellipse cx="30" cy="27" rx="2" ry="1.5" fill="#fcd5ce" />
          </svg>
          <span
            className="text-white font-semibold text-lg"
            style={{
              fontFamily: 'Fredoka, sans-serif',
              textShadow: '0 1px 8px rgba(0,0,0,0.25)'
            }}
          >
            Kibo
          </span>
        </motion.div>

        {/* Right controls */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3"
        >
          {/* GitHub Stars Button */}
          <motion.button
            onClick={handleStar}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
            style={{
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.35)',
              color: 'white',
              fontFamily: 'Quicksand, sans-serif',
              textShadow: '0 1px 4px rgba(0,0,0,0.15)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.12)'
            }}
            whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.26)' }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Star icon */}
            <motion.svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              animate={{
                fill: starred ? '#ffd700' : 'rgba(255,255,255,0.7)',
                scale: starred ? [1, 1.4, 1] : 1
              }}
              transition={{ duration: 0.35, type: 'spring', stiffness: 300 }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </motion.svg>

            {/* Counter display */}
            <span className="flex items-center" style={{ lineHeight: 1 }}>
              <Counter
                value={stars}
                places={[1000, 100, 10, 1]}
                fontSize={13}
                padding={2}
                gap={0}
                horizontalPadding={0}
                borderRadius={0}
                textColor="white"
                fontWeight={500}
                gradientHeight={0}
                containerStyle={{ display: 'inline-flex', verticalAlign: 'middle' }}
                counterStyle={{ background: 'transparent', overflow: 'hidden', height: 17 }}
                topGradientStyle={{ display: 'none' }}
                bottomGradientStyle={{ display: 'none' }}
              />
            </span>

            <span className="opacity-60 text-xs">stars</span>
          </motion.button>

          {/* Join Waitlist */}
          <motion.button
            onClick={() => setShowWaitlist(true)}
            className="rounded-full px-5 py-2 text-sm font-semibold"
            style={{
              background: 'white',
              color: '#2a5a3a',
              fontFamily: 'Fredoka, sans-serif',
              boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
              letterSpacing: '0.01em'
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}
            whileTap={{ scale: 0.97 }}
          >
            Join Waitlist
          </motion.button>
        </motion.div>
      </nav>

      {/* Waitlist modal */}
      <AnimatePresence>
        {showWaitlist && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60]"
              style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWaitlist(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-sm mx-4"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            >
              <div
                className="rounded-3xl p-8 text-center"
                style={{
                  background: 'linear-gradient(160deg, #f0f9f0, #e8f5e8)',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.8) inset',
                  border: '1px solid rgba(255,255,255,0.7)'
                }}
              >
                {/* Kibo icon */}
                <div className="flex justify-center mb-4">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <svg width="48" height="48" viewBox="0 0 60 60" fill="none">
                      <ellipse cx="30" cy="42" rx="18" ry="12" fill="#f5e6d3" />
                      <ellipse cx="30" cy="24" rx="16" ry="14" fill="#f5e6d3" />
                      <path d="M14 18 Q10 8 18 12 Q22 14 20 20" fill="#f5e6d3" />
                      <path d="M46 18 Q50 8 42 12 Q38 14 40 20" fill="#f5e6d3" />
                      <circle cx="24" cy="23" r="3.5" fill="white" />
                      <circle cx="36" cy="23" r="3.5" fill="white" />
                      <circle cx="24" cy="23" r="2" fill="#3a3a3a" />
                      <circle cx="36" cy="23" r="2" fill="#3a3a3a" />
                      <circle cx="25" cy="22" r="0.8" fill="white" />
                      <circle cx="37" cy="22" r="0.8" fill="white" />
                      <ellipse cx="30" cy="27" rx="2" ry="1.5" fill="#fcd5ce" />
                      <path d="M28 30 Q30 32 32 30" stroke="#d4a574" strokeWidth="1" strokeLinecap="round" fill="none" />
                      <ellipse cx="20" cy="28" rx="3" ry="2" fill="#fcd5ce" opacity="0.4" />
                      <ellipse cx="40" cy="28" rx="3" ry="2" fill="#fcd5ce" opacity="0.4" />
                    </svg>
                  </motion.div>
                </div>

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
                        Be the first to know when Kibo is available for download.
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
                        *
                      </motion.div>
                      <h3
                        className="text-xl text-[#2a4a2a] mb-2"
                        style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 500 }}
                      >
                        You're on the list!
                      </h3>
                      <p className="text-sm text-[#5a7a5a]">
                        Kibo can't wait to meet you.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
