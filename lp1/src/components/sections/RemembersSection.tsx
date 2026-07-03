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
      {/* Fireflies */}
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
            transition={{
              duration: f.duration,
              repeat: Infinity,
              delay: f.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Memory thread SVG */}
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

      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-4xl mx-auto text-center">
        {/* Glow orb icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <motion.div
            className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, rgba(255,220,50,0.35), rgba(255,165,0,0.15))',
              border: '1.5px solid rgba(255,210,50,0.4)',
              backdropFilter: 'blur(8px)'
            }}
            animate={{ boxShadow: ['0 0 20px #ffd70040', '0 0 40px #ffd70070', '0 0 20px #ffd70040'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="#ffd700" opacity="0.7" />
              <circle cx="12" cy="12" r="3" fill="#ffd700" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Content panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="rounded-3xl px-10 py-10 max-w-lg mx-auto"
          style={{
            background: 'rgba(255,255,255,0.52)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255,255,255,0.6)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.08)'
          }}
        >
          <h2 className="section-title text-[#1a3a2a] mb-5">It Remembers</h2>
          <p
            className="text-[#2a4a2a] leading-relaxed mb-8"
            style={{ fontFamily: 'Quicksand, sans-serif' }}
          >
            Kibo weaves a glowing thread through your days. Every conversation, every
            small moment, becomes part of its memory. It learns your patterns,
            your preferences, your quiet habits.
          </p>

          {/* Memory timeline */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Yesterday', note: 'A quiet afternoon' },
              { label: 'Last week', note: 'A shared laugh' },
              { label: 'Last month', note: 'A small victory' }
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.12 }}
                className="text-center"
              >
                <motion.div
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: 'rgba(255,215,0,0.18)',
                    border: '1.5px solid rgba(255,215,0,0.4)'
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3 + i, repeat: Infinity }}
                >
                  <span className="text-lg">{'✦'.repeat(i + 1)}</span>
                </motion.div>
                <p className="text-xs font-semibold text-[#3a5a3a]">{m.label}</p>
                <p className="text-xs text-[#6a8a6a] mt-0.5">{m.note}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RemembersSection;
