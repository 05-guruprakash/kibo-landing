import { motion } from 'framer-motion';
import { useWaitlist } from '../../contexts/WaitlistContext';

const HeroSection = () => {
  const { open } = useWaitlist();
  return (
    <section className="section-wrapper relative" data-section="hero">
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
          className="section-title mb-5 text-white text-[2rem] sm:text-4xl md:text-5xl leading-tight"
          style={{ textShadow: '0 2px 30px rgba(0,0,0,0.3), 0 0 80px rgba(255,255,255,0.1)' }}
        >
          Your desktop's smartest little companion.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xs sm:max-w-sm mx-auto"
          style={{
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 400,
            textShadow: '0 1px 12px rgba(0,0,0,0.25)'
          }}
        >
          A tiny presence that makes your desktop feel alive, without ever getting between you and your work.
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          onClick={() => open()}
          className="cta-button mb-6 text-sm sm:text-base px-8 sm:px-10"
          style={{
            background: 'white',
            color: '#2a5a3a',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}
        >
          Join Waitlist
        </motion.button>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className={i >= 6 ? 'absolute rounded-full hidden sm:block' : 'absolute rounded-full'}
              style={{
                width: 4 + (i % 3) * 2,
                height: 4 + (i % 3) * 2,
                left: `${15 + (i * 8) % 75}%`,
                top: `${25 + (i * 9) % 55}%`,
                background: 'rgba(255,255,255,0.5)',
                filter: 'blur(1px)'
              }}
              animate={{
                y: [0, -18, 0],
                x: [0, (i % 2 === 0 ? 8 : -8), 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.3, 0.8]
              }}
              transition={{
                duration: 4 + i * 0.6,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-4 sm:bottom-8 z-20 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.div
          className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
        <p className="text-[10px] sm:text-xs text-white/40 tracking-widest uppercase">scroll</p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
