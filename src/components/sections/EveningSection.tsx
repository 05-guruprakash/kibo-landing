import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

import { useWaitlist } from '../../contexts/WaitlistContext';

// "Kibo" wordmark — letters rise in one by one with a glow burst, then a shine sweeps across
const KiboWordmark = ({ isInView }: { isInView: boolean }) => {
  const letters = ['K', 'i', 'b', 'o'];

  return (
    <div className="w-full flex justify-center overflow-visible py-2">
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <div style={{ display: 'flex' }}>
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.7, filter: 'blur(6px)' }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                  : { opacity: 0, y: 30, scale: 0.7, filter: 'blur(6px)' }
              }
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{
                fontFamily: "'Baloo 2', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(2.8rem, 8vw, 5rem)',
                lineHeight: 1,
                color: 'rgba(255,255,255,0.92)',
                textShadow: isInView
                  ? '0 0 20px rgba(255,255,255,0.4), 0 0 46px rgba(255,220,170,0.25)'
                  : 'none',
                transition: 'text-shadow 1s ease 0.6s',
              }}
            >
              {ch}
            </motion.span>
          ))}
        </div>

        {/* Shine sweep, starts after letters have landed */}
        <motion.div
          aria-hidden
          initial={{ backgroundPosition: '-150% 0' }}
          animate={
            isInView
              ? { backgroundPosition: '250% 0' }
              : { backgroundPosition: '-150% 0' }
          }
          transition={{
            duration: 1.8,
            delay: 0.9,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 3,
          }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            fontFamily: "'Baloo 2', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2.8rem, 8vw, 5rem)',
            lineHeight: 1,
            backgroundImage:
              'linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.95) 50%, transparent 60%)',
            backgroundSize: '250% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            pointerEvents: 'none',
          }}
        >
          {letters.join('')}
        </motion.div>
      </div>
    </div>
  );
};

const EveningSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const wordmarkRef = useRef(null);
  const wordmarkInView = useInView(wordmarkRef, { once: false, amount: 0.5 });
  const { open } = useWaitlist();
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

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

      {/* Moon
      <motion.div
        className="absolute top-[8%] right-[12%] w-16 h-16 sm:w-20 sm:h-20 rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #fff9e6, #f0e6c8)',
          boxShadow: '0 0 50px rgba(255,245,200,0.35), 0 0 100px rgba(255,240,180,0.15)'
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      /> */}

      {/* Everything below is one column — this is the fix, wordmark now nests inside it */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-md mx-auto text-center"> 

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

        {/* CTA — single Join Waitlist button (now uses shared context) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => setShowComments(true)}
            className="px-10 py-3.5 rounded-full font-semibold text-sm"
            style={{
              fontFamily: 'Fredoka, sans-serif',
              background: 'rgba(255,255,255,0.12)',
              border: '1.5px solid rgba(255,255,255,0.35)',
              color: '#ffffff',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(255,255,255,0.08)',
            }}
            whileHover={{ scale: 1.05, y: -2, background: 'rgba(255,255,255,0.18)' }}
            whileTap={{ scale: 0.97 }}
          >
            Tell Kibo Something
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
          className="mt-8 text-white/25 text-xs px-4 text-center"
          style={{ fontFamily: 'Quicksand, sans-serif' }}
        >
          Always nearby, never in the way.
        </motion.p>

        {/* "Kibo" wordmark — sits below the footer credit, nested in the same column */}
        <div ref={wordmarkRef} className="w-full mt-3 mb-4">
          <KiboWordmark isInView={wordmarkInView} />
        </div>
      </div>

      {/* Comment Modal */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: 'rgba(5,10,25,0.6)', backdropFilter: 'blur(6px)' }}
            onClick={() => setShowComments(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl p-8 relative"
              style={{
                background: 'rgba(20,25,50,0.85)',
                border: '1.5px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              <button
                onClick={() => setShowComments(false)}
                className="absolute top-5 right-5 text-white/40 hover:text-white/80 transition-colors"
              >
                ✕
              </button>

              <h3
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: 'Fredoka, sans-serif' }}
              >
                Tell Kibo Something
              </h3>
              <p
                className="text-white/50 text-sm mb-6"
                style={{ fontFamily: 'Quicksand, sans-serif' }}
              >
                Thoughts, ideas, or just saying hi — Kibo's listening.
              </p>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Type here..."
                rows={4}
                className="w-full rounded-2xl px-4 py-3 text-white placeholder-white/30 text-sm resize-none outline-none"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  fontFamily: 'Quicksand, sans-serif',
                }}
              />

              <motion.button
                onClick={() => {
                  // handle submit here
                  setShowComments(false);
                  setComment('');
                }}
                className="mt-5 w-full py-3 rounded-full font-semibold text-sm"
                style={{
                  fontFamily: 'Fredoka, sans-serif',
                  background: 'white',
                  color: '#1a3a1a',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Send
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default EveningSection;
