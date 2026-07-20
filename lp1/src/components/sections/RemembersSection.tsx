import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const RemembersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const fireflies = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 2.5,
    size: 3 + Math.random() * 4
  }));

  return (
    <section ref={ref} className="section-wrapper" data-section="remembers">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {fireflies.map((f) => (
          <motion.div
            key={f.id}
            className="absolute rounded-full"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: f.size,
              height: f.size,
              background: 'radial-gradient(circle, #fff8dc 30%, #ffd700 70%, transparent 100%)',
              boxShadow: '0 0 8px #ffd700, 0 0 18px #ffa50088'
            }}
            animate={{
              opacity: [0, 0.9, 0.7, 0],
              y: [0, -35, -20, 10],
              x: [0, 12, -6, 18],
              scale: [0.5, 1.1, 0.9, 0.3]
            }}
            transition={{ duration: f.duration, repeat: Infinity, delay: f.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.35 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <svg className="w-full h-full">
          <defs>
            <linearGradient id="threadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffd700" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 200 Q400 140 800 240 T1600 200"
            stroke="url(#threadGrad)"
            strokeWidth="1.5"
            fill="none"
            animate={{
              d: ['M0 200 Q400 140 800 240 T1600 200', 'M0 220 Q400 170 800 195 T1600 225', 'M0 200 Q400 140 800 240 T1600 200']
            }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-10 items-center px-6 md:px-16 max-w-6xl mx-auto">
        {/* Main content column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="rounded-3xl px-8 py-10 md:px-10"
          style={{
            background: 'rgba(255,255,255,0.52)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255,255,255,0.6)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.08)'
          }}
        >
          <h2 className="section-title text-[#1a3a2a] mb-5">It Remembers</h2>
          <p className="text-[#2a4a2a] leading-relaxed" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            Kibo weaves a glowing thread through your days. Every conversation, every
            small moment, becomes part of its memory. It learns your patterns,
            your preferences, your quiet habits.
          </p>
        </motion.div>

        {/* Aside: orb + timeline, sticky on desktop */}
        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="md:sticky md:top-24 flex flex-col items-center rounded-3xl px-6 py-8"
          style={{
            background: 'rgba(255,255,255,0.45)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255,255,255,0.55)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.08)'
          }}
        >
          <motion.div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
            style={{
              background: 'radial-gradient(circle, rgba(255,220,50,0.35), rgba(255,165,0,0.15))',
              border: '1.5px solid rgba(255,210,50,0.4)',
              backdropFilter: 'blur(8px)'
            }}
            animate={{ boxShadow: ['0 0 20px #ffd70040', '0 0 40px #ffd70070', '0 0 20px #ffd70040'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#ffd700" opacity="0.7" />
              <circle cx="12" cy="12" r="3" fill="#ffd700" />
            </svg>
          </motion.div>

          <div className="flex flex-col gap-4 w-full">
            {[
              { label: 'Yesterday', note: 'A quiet afternoon' },
              { label: 'Last week', note: 'A shared laugh' },
              { label: 'Last month', note: 'A small victory' }
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: 15 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.12 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,215,0,0.18)', border: '1.5px solid rgba(255,215,0,0.4)' }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3 + i, repeat: Infinity }}
                >
                  <span className="text-sm">{'✦'.repeat(i + 1)}</span>
                </motion.div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-[#3a5a3a]">{m.label}</p>
                  <p className="text-xs text-[#6a8a6a]">{m.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  );
};

export default RemembersSection;