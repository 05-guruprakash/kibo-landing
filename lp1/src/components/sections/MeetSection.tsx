import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import CardSwap, { Card } from '../react-bits/CardSwap';

const MeetSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section ref={ref} className="section-wrapper" data-section="meet">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 max-w-7xl mx-auto gap-12">
        {/* Left content panel */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex-1 max-w-xl rounded-3xl p-8"
          style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255,255,255,0.6)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.08)'
          }}
        >
          <h2 className="section-title text-[#1a3a2a] mb-5">
            A Companion,<br />Not a Tool
          </h2>
          <div className="space-y-4 text-[#2a4a2a] leading-relaxed" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Kibo isn't here to optimise your workflow or boost your productivity.
              It exists simply to keep you company.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
            >
              Perched quietly in the corner of your screen, Kibo naps, plays, watches,
              and occasionally chirps. Like a cat that knows your secrets.
            </motion.p>
          </div>

          {/* Personality traits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {['Curious', 'Gentle', 'Playful', 'Patient'].map((trait) => (
              <span
                key={trait}
                className="px-4 py-1.5 rounded-full text-sm font-medium text-[#1a3a2a]"
                style={{
                  background: 'rgba(90,180,110,0.18)',
                  border: '1.5px solid rgba(90,180,110,0.35)',
                  fontFamily: 'Quicksand, sans-serif'
                }}
              >
                {trait}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right - Card swap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative w-full md:w-[400px] h-[300px] md:h-[340px]"
        >
          <CardSwap
            cardDistance={42}
            verticalDistance={52}
            delay={5000}
            pauseOnHover={true}
            width={285}
            height={190}
          >
            <Card customClass="p-6 flex flex-col justify-between">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                style={{ background: 'linear-gradient(135deg, #fce4d6, #f9c8b8)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3 Q18 6 18 12 Q18 18 12 21 Q6 18 6 12 Q6 6 12 3Z" fill="#d4785a" opacity="0.7"/>
                  <path d="M8 14 L16 10" stroke="#d4785a" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#2a3a2a] mb-1" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  Kibo sleeps when you sleep
                </p>
                <p className="text-sm text-[#5a6a5a]" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  Watching over your desktop dreams
                </p>
              </div>
            </Card>
            <Card customClass="p-6 flex flex-col justify-between">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                style={{ background: 'linear-gradient(135deg, #d4ecd8, #b8e0c0)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="7" stroke="#3a8a4a" strokeWidth="1.8" fill="none"/>
                  <circle cx="12" cy="12" r="2.5" fill="#3a8a4a"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#2a3a2a] mb-1" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  Kibo notices things
                </p>
                <p className="text-sm text-[#5a6a5a]" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  Your cursor, your rhythm, your moods
                </p>
              </div>
            </Card>
            <Card customClass="p-6 flex flex-col justify-between">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                style={{ background: 'linear-gradient(135deg, #e0d4f0, #ccc0e8)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l2.5 5 5.5 0.8-4 3.9 0.95 5.45L12 14.77l-4.95 2.58.95-5.45L4 8.8l5.5-.8z" fill="#7a60a8" opacity="0.8"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#2a3a2a] mb-1" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  Kibo celebrates with you
                </p>
                <p className="text-sm text-[#5a6a5a]" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  Your small wins deserve applause
                </p>
              </div>
            </Card>
          </CardSwap>
        </motion.div>
      </div>

      {/* Floating pollen/leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${18 + i * 14}%`,
              top: '5%',
              width: 8,
              height: 13,
              background: 'linear-gradient(135deg, rgba(100,200,120,0.7), rgba(70,160,90,0.5))',
              borderRadius: '0 60% 60% 60%',
            }}
            animate={{
              y: [0, 90, 0],
              x: [0, 18 * (i % 2 === 0 ? 1 : -1), 0],
              rotate: [0, 200, 360],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 9 + i * 2,
              repeat: Infinity,
              delay: i * 0.9,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default MeetSection;
