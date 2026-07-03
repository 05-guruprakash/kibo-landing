import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EveningSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

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
        className="absolute top-[8%] right-[12%] w-20 h-20 rounded-full"
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
            <svg width="90" height="90" viewBox="0 0 60 60" fill="none">
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
          A tiny desktop companion. Free forever. No account required.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <motion.button
            className="cta-button text-[#1a3a1a] px-10"
            style={{ background: 'white', boxShadow: '0 8px 32px rgba(255,255,255,0.2)' }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Download for Mac
          </motion.button>
          <motion.button
            className="cta-button text-white px-8"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(8px)'
            }}
            whileHover={{ scale: 1.05, y: -2, background: 'rgba(255,255,255,0.18)' }}
            whileTap={{ scale: 0.97 }}
          >
            Coming to Windows
          </motion.button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5 text-white/35 text-xs"
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
          className="absolute bottom-6 text-white/25 text-xs"
          style={{ fontFamily: 'Quicksand, sans-serif' }}
        >
          Made with care. Kibo awaits.
        </motion.p>
      </div>
    </section>
  );
};

export default EveningSection;
