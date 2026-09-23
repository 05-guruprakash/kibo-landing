
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useWaitlist } from '../../contexts/WaitlistContext';
import catSheet from '../../assets/Cat-Sheet.png';

const THOUGHTS = [
  "mrow... don't mind me 🥺",
  "just vibing on your desktop",
  "watching you work, quietly",
  "psst... you're doing great",
  "*tail curl* hii~"
];

const HeroSection = () => {
  const { open } = useWaitlist();
  const [thoughtIdx, setThoughtIdx] = useState(0);

  const scale = 6.875; // 32px -> 220px

  useEffect(() => {
    const id = setInterval(
      () => setThoughtIdx((i) => (i + 1) % THOUGHTS.length),
      2800
    );

    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="section-wrapper relative"
      data-section="hero"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 30% 45%, rgba(8,6,18,0.6) 0%, transparent 70%)'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-10">

        {/* ================= TEXT COLUMN ================= */}
        <div className="text-center md:text-left flex-1 max-w-xl">

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3 tracking-[0.3em] uppercase text-[11px] sm:text-xs"
            style={{
              fontFamily: 'Fredoka, sans-serif',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.55)'
            }}
          >
            Kibo
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.1
            }}
            className="mb-5 text-[2.1rem] sm:text-5xl md:text-6xl leading-[1.05]"
            style={{
              fontFamily: 'Fredoka, sans-serif',
              fontWeight: 700,
              color: '#fff8ef',
              textShadow:
                '0 2px 4px rgba(0,0,0,0.6), 0 4px 40px rgba(0,0,0,0.5), 0 0 80px rgba(255,180,100,0.25)'
            }}
          >
            A tiny companion,
            <br />
            wide awake on your desktop.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed mb-8 max-w-md mx-auto md:mx-0"
            style={{
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 400,
              textShadow: '0 2px 10px rgba(0,0,0,0.6)'
            }}
          >
            It naps, it nudges, it notices — quietly keeping you company
            while you get things done.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            onClick={() => open()}
            className="cta-button text-sm sm:text-base px-8 sm:px-10"
            style={{
              background: 'white',
              color: '#2a5a3a',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
            }}
          >
            Join Waitlist
          </motion.button>
        </div>

        {/* ================= CAT COLUMN ================= */}
        <div
          className="relative flex-shrink-0"
          style={{ width: 260, height: 300 }}
        >

          {/* ================= THOUGHT BUBBLE ================= */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute left-1/2"
            style={{
              top: 0,
              transform: 'translateX(-50%)',
              width: 220,
              zIndex: 5
            }}
          >
            <div className="relative flex justify-center">

              <AnimatePresence mode="wait">
                <motion.div
                  key={thoughtIdx}
                  initial={{
                    opacity: 0,
                    y: 6,
                    scale: 0.9
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }}
                  exit={{
                    opacity: 0,
                    y: -6,
                    scale: 0.9
                  }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl px-4 py-2.5 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    boxShadow: '0 10px 26px rgba(0,0,0,0.35)',
                    maxWidth: 210
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Quicksand, sans-serif',
                      fontWeight: 600,
                      fontSize: 13,
                      color: '#3a2b1a',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {THOUGHTS[thoughtIdx]}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Bubble tail */}
              <span
                className="absolute rounded-full"
                style={{
                  width: 9,
                  height: 9,
                  background: 'rgba(255,255,255,0.95)',
                  left: '50%',
                  bottom: -14,
                  transform: 'translateX(-50%)'
                }}
              />

              <span
                className="absolute rounded-full"
                style={{
                  width: 6,
                  height: 6,
                  background: 'rgba(255,255,255,0.95)',
                  left: '50%',
                  bottom: -24,
                  transform: 'translateX(calc(-50% - 10px))'
                }}
              />

            </div>
          </motion.div>

          {/* ================= STATIC SITTING CAT ================= */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.4,
              duration: 0.6,
              ease: [0.34, 1.56, 0.64, 1]
            }}
            className="absolute bottom-6 left-1/2"
            style={{
              width: 220,
              height: 220,
              transform: 'translateX(-50%)',
              imageRendering: 'pixelated'
            }}
          >
            <div
              style={{
                width: 220,
                height: 220,
                position: 'relative'
              }}
            >

              {/* Cat sprite */}
              <div
                style={{
                  backgroundImage: `url(${catSheet})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: `${256 * scale}px ${1632 * scale}px`,
                  backgroundPosition: `0px -${64 * scale}px`,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 220,
                  height: 220,
                  filter:
                    'drop-shadow(0 20px 22px rgba(0,0,0,0.5))'
                }}
              />

              {/* Left blush */}
              <motion.div
                animate={{
                  opacity: [0.55, 0.95, 0.55]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute rounded-full"
                style={{
                  width: 22,
                  height: 14,
                  left: 50,
                  top: 107,
                  background: 'rgba(255,120,140,0.7)',
                  filter: 'blur(3.5px)'
                }}
              />

              {/* Right blush */}
              <motion.div
                animate={{
                  opacity: [0.55, 0.95, 0.55]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.3
                }}
                className="absolute rounded-full"
                style={{
                  width: 22,
                  height: 14,
                  left: 142,
                  top: 107,
                  background: 'rgba(255,120,140,0.7)',
                  filter: 'blur(3.5px)'
                }}
              />

              {/* Ground shadow */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 140,
                  height: 20,
                  left: '50%',
                  bottom: -6,
                  transform: 'translateX(-50%)',
                  background: 'rgba(0,0,0,0.35)',
                  filter: 'blur(8px)'
                }}
              />

            </div>
          </motion.div>

        </div>
      </div>

      {/* Empty overlay layer */}
      <div className="relative z-10 pointer-events-none">
        <div className="absolute inset-0" />
      </div>

      {/* ================= SCROLL INDICATOR ================= */}
      <motion.div
        className="absolute inset-x-0 bottom-4 sm:bottom-8 z-20 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.div
          className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1"
          animate={{ y: [0, 4, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        >
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>

        <p className="text-[10px] sm:text-xs text-white/40 tracking-widest uppercase">
          scroll
        </p>
      </motion.div>

    </section>
  );
};

export default HeroSection;