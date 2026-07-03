import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="section-wrapper" data-section="hero">
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
          className="section-title mb-5 text-white"
          style={{ textShadow: '0 2px 30px rgba(0,0,0,0.3), 0 0 80px rgba(255,255,255,0.1)' }}
        >
          Meet Kibo
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="text-lg md:text-xl text-white/80 leading-relaxed mb-14 max-w-sm mx-auto"
          style={{
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 400,
            textShadow: '0 1px 12px rgba(0,0,0,0.25)'
          }}
        >
          A tiny friend who lives on your desktop.
          It remembers. It plays. It grows with you.
        </motion.p>

        {/* Ambient pollen/dust motes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
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

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
          <p className="text-xs text-white/40 tracking-widest uppercase">scroll</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
