import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Counter from './react-bits/Counter';
import CatSpriteIcon from './CatSpriteIcon';
import { useWaitlist } from '../contexts/WaitlistContext';

const GITHUB_REPO_URL = 'https://github.com/05-guruprakash/kibo-landing';
const GITHUB_API_URL = 'https://api.github.com/repos/05-guruprakash/kibo-landing';
const FALLBACK_STARS = 2841;

const Navbar = () => {
  const [stars, setStars] = useState(FALLBACK_STARS);
  const waitlistBtnRef = useRef<HTMLButtonElement>(null);
  const { isOpen, email, submitted, anchorEl, open, close, setEmail, submit } = useWaitlist();
  const [dropdownRect, setDropdownRect] = useState<{ top: number; right: number } | null>(null);

  useEffect(() => {
    const cached = sessionStorage.getItem('kibo_stars');
    const cachedAt = sessionStorage.getItem('kibo_stars_ts');
    if (cached && cachedAt && Date.now() - Number(cachedAt) < 1000 * 60 * 30) {
      setStars(Number(cached));
      return;
    }
    fetch(GITHUB_API_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
          sessionStorage.setItem('kibo_stars', String(data.stargazers_count));
          sessionStorage.setItem('kibo_stars_ts', String(Date.now()));
        }
      })
      .catch(() => {});
  }, []);

  const handleStarClick = () => {
    window.open(GITHUB_REPO_URL, '_blank', 'noopener,noreferrer');
  };

  const handleOpenFromNavbar = () => {
    if (waitlistBtnRef.current) {
      const rect = waitlistBtnRef.current.getBoundingClientRect();
      setDropdownRect({ top: rect.bottom + 10, right: window.innerWidth - rect.right });
    }
    open(waitlistBtnRef.current);
  };

  // Is this specific open triggered from the navbar (dropdown) vs elsewhere (centered)?
  const isNavbarAnchored = anchorEl === waitlistBtnRef.current && dropdownRect !== null;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <CatSpriteIcon size={28} />
          <span
            className="text-white font-semibold text-lg"
            style={{ fontFamily: 'Fredoka, sans-serif', textShadow: '0 1px 8px rgba(0,0,0,0.25)' }}
          >
            Kibo
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 sm:gap-3"
        >
          <motion.button
            onClick={handleStarClick}
            aria-label="Star Kibo on GitHub"
            className="flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 text-sm font-medium"
            style={{
              background: 'rgba(20,30,20,0.35)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.35)',
              color: 'white',
              fontFamily: 'Quicksand, sans-serif',
              textShadow: '0 1px 4px rgba(0,0,0,0.15)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.12)'
            }}
            whileHover={{ scale: 1.04, background: 'rgba(20,30,20,0.5)' }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="hidden sm:flex items-center" style={{ lineHeight: 1 }}>
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
            <span className="opacity-80 text-xs hidden sm:inline">stars</span>
          </motion.button>

          <motion.button
            ref={waitlistBtnRef}
            onClick={handleOpenFromNavbar}
            className="rounded-full px-4 sm:px-5 py-2 text-sm font-semibold"
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

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-[60]"
                style={{ background: isNavbarAnchored ? 'transparent' : 'rgba(0,0,0,0.35)', backdropFilter: isNavbarAnchored ? 'none' : 'blur(4px)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
              />

              {isNavbarAnchored ? (
                // Dropdown anchored under the navbar button
                <motion.div
                  className="fixed z-[70] w-[320px]"
                  style={{ top: dropdownRect!.top, right: dropdownRect!.right }}
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                >
                  <WaitlistPanel email={email} submitted={submitted} setEmail={setEmail} submit={submit} close={close} compact />
                </motion.div>
              ) : (
                // Centered modal for any other trigger on the page
                <motion.div
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-sm mx-4"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                >
                  <WaitlistPanel email={email} submitted={submitted} setEmail={setEmail} submit={submit} close={close} />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

// Shared panel body used by both display modes
const WaitlistPanel = ({
  email,
  submitted,
  setEmail,
  submit,
  close,
  compact = false
}: {
  email: string;
  submitted: boolean;
  setEmail: (v: string) => void;
  submit: (e: React.FormEvent) => void;
  close: () => void;
  compact?: boolean;
}) => (
  <div
    className={`rounded-3xl text-center ${compact ? 'p-5' : 'p-6 sm:p-8'}`}
    style={{
      background: 'linear-gradient(160deg, #f0f9f0, #e8f5e8)',
      boxShadow: '0 24px 64px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.8) inset',
      border: '1px solid rgba(255,255,255,0.7)'
    }}
  >
    <div className="flex justify-center mb-3">
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
        <CatSpriteIcon size={compact ? 36 : 48} />
      </motion.div>
    </div>

    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <h3 className={compact ? 'text-lg text-[#2a4a2a] mb-1' : 'text-2xl text-[#2a4a2a] mb-2'} style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 500 }}>
            Kibo is almost ready
          </h3>
          <p className="text-xs sm:text-sm text-[#5a7a5a] mb-4 sm:mb-6">
            Be the first to know when Kibo is available for download.
          </p>

          <form onSubmit={submit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.8)', border: '1.5px solid #c4d8c4', color: '#3a4a3a', fontFamily: 'Quicksand, sans-serif' }}
            />
            <motion.button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold text-sm"
              style={{ background: 'linear-gradient(135deg, #4a9a5a, #3a7a4a)', fontFamily: 'Fredoka, sans-serif', letterSpacing: '0.02em' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Notify Me
            </motion.button>
          </form>

          <button onClick={close} className="mt-3 text-xs text-[#8aaa8a] hover:text-[#5a7a5a] transition-colors" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            maybe later
          </button>
        </motion.div>
      ) : (
        <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="py-3">
          <motion.div animate={{ rotate: [0, 10, -10, 0], y: [0, -8, 0] }} transition={{ duration: 0.6 }} className="text-3xl mb-2">
            🎉
          </motion.div>
          <h3 className="text-lg text-[#2a4a2a] mb-1" style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 500 }}>
            You're on the list!
          </h3>
          <p className="text-xs sm:text-sm text-[#5a7a5a]">We'll email you the moment Kibo is ready.</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default Navbar;