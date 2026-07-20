import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const CelebratesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [burst, setBurst] = useState(false);

  const triggerBurst = () => {
    setBurst(true);
    setTimeout(() => setBurst(false), 1600);
  };

  const confetti = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.4,
    duration: 1.4 + Math.random() * 0.8,
    color: ['#ffd700', '#ff6b6b', '#4ecdc4', '#95e1d3', '#f38181', '#a8e6cf'][i % 6],
    size: 6 + Math.random() * 7,
    rotation: Math.random() * 360
  }));

  const achievements = [
    { icon: '✓', label: 'Finished a task', color: 'from-[#56c96a] to-[#3aa84e]' },
    { icon: '☕', label: 'Made your coffee', color: 'from-[#f5a55a] to-[#d4844a]' },
    { icon: '✦', label: 'Checked in today', color: 'from-[#9b8fe0] to-[#7a6ec0]' }
  ];

  return (
    <section ref={ref} className="section-wrapper" data-section="celebrates">
      {/* Burst confetti */}
      <AnimatePresence>
        {burst && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {confetti.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-sm"
                style={{
                  left: `${p.x}%`,
                  top: '45%',
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  transform: `rotate(${p.rotation}deg)`
                }}
                initial={{ y: 0, opacity: 1, scale: 1 }}
                animate={{
                  y: [-10, -120 - Math.random() * 100],
                  x: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 160],
                  opacity: [1, 1, 0],
                  rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)]
                }}
                transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2
            className="section-title text-white mb-3"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.25)' }}
          >
            It Celebrates You
          </h2>
          <p
            className="text-white/70 leading-relaxed"
            style={{ fontFamily: 'Quicksand, sans-serif' }}
          >
            Small wins matter. Kibo notices every one of them.
          </p>
        </motion.div>

        {/* Interactive card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="w-full rounded-3xl p-7 cursor-pointer select-none"
          style={{
            background: 'rgba(255,255,255,0.52)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255,255,255,0.65)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.08)'
          }}
          onClick={triggerBurst}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <p
            className="text-xs text-[#6a8a6a] mb-5 font-medium tracking-wide uppercase"
            style={{ fontFamily: 'Quicksand, sans-serif' }}
          >
            Tap to celebrate
          </p>

          <div className="space-y-4">
            {achievements.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white font-bold text-base shadow`}>
                  {a.icon}
                </div>
                <div>
                  <p
                    className="font-semibold text-[#1a3a1a]"
                    style={{ fontFamily: 'Quicksand, sans-serif' }}
                  >
                    {a.label}
                  </p>
                  <p className="text-xs text-[#5a7a5a] mt-0.5">Kibo noticed!</p>
                </div>

                {/* Tick animation */}
                <motion.div
                  className="ml-auto"
                  animate={burst ? { scale: [0, 1.3, 1], opacity: [0, 1, 1] } : { scale: 0, opacity: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, type: 'spring' }}
                >
                  <div className="w-6 h-6 rounded-full bg-[#4a9a5a] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-6 text-sm text-white/45 text-center"
          style={{ fontFamily: 'Quicksand, sans-serif' }}
        >
          Your tiny accomplishments deserve recognition.
        </motion.p>
      </div>
    </section>
  );
};

export default CelebratesSection;
