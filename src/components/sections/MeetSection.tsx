import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import CardSwap, { Card } from '../react-bits/CardSwap';

const cardMeta = [
  { title: 'Kibo lives on your screen', desc: 'Not a chatbot, not a tool — a tiny companion' },
  { title: 'Kibo works when you work', desc: 'Summarizing, automating, and helping without being asked' },
  { title: 'Kibo surprises you sometimes', desc: 'Little moments of personality, just for fun' }
];

const TITLE_COLOR = '#ff7a3d';

const MeetSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section ref={ref} className="section-wrapper" data-section="meet">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 max-w-7xl mx-auto gap-12">
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
            <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
              Kibo turns your desktop into something that feels a little less static and
              a little more alive — a presence, not a productivity feature.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35 }}>
              It finds places to sit, jumps over little obstacles, sleeps when you're away,
              and gets strangely curious about your cursor. Like a cat that's always watching.
            </motion.p>

            {/* Live-synced caption reflecting the active card — desktop/tablet only, since CardSwap doesn't render on mobile */}
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="hidden md:block pt-2 border-t border-[#2a4a2a]/10"
            >
              <p className="text-sm font-semibold" style={{ color: TITLE_COLOR }}>{cardMeta[activeCard].title}</p>
              <p className="text-xs text-[#5a7a5a]">{cardMeta[activeCard].desc}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {['Answers', 'Automates', 'Summarizes', 'Local'].map((trait) => (
              <span
                key={trait}
                className="px-4 py-1.5 rounded-full text-sm font-medium text-[#1a3a2a]"
                style={{ background: 'rgba(90,180,110,0.18)', border: '1.5px solid rgba(90,180,110,0.35)', fontFamily: 'Quicksand, sans-serif' }}
              >
                {trait}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* CardSwap stack — hidden on mobile, visible from md breakpoint up */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="hidden md:block relative w-full md:w-[340px] h-[260px] md:h-[290px]"
        >
          <CardSwap
            cardDistance={36}
            verticalDistance={44}
            delay={5000}
            pauseOnHover={true}
            width={240}
            height={160}
            onActiveChange={setActiveCard}
          >
            <Card customClass="p-5 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2.5" style={{ background: 'linear-gradient(135deg, #fce4d6, #f9c8b8)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3 Q18 6 18 12 Q18 18 12 21 Q6 18 6 12 Q6 6 12 3Z" fill="#d4785a" opacity="0.7"/>
                  <path d="M8 14 L16 10" stroke="#d4785a" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold mb-1 text-sm" style={{ fontFamily: 'Fredoka, sans-serif', color: TITLE_COLOR }}>Kibo sleeps when you sleep</p>
                <p className="text-xs text-[#5a6a5a]" style={{ fontFamily: 'Quicksand, sans-serif' }}>Watching over your desktop dreams</p>
              </div>
            </Card>
            <Card customClass="p-5 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2.5" style={{ background: 'linear-gradient(135deg, #d4ecd8, #b8e0c0)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="7" stroke="#3a8a4a" strokeWidth="1.8" fill="none"/>
                  <circle cx="12" cy="12" r="2.5" fill="#3a8a4a"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold mb-1 text-sm" style={{ fontFamily: 'Fredoka, sans-serif', color: TITLE_COLOR }}>Kibo notices things</p>
                <p className="text-xs text-[#5a6a5a]" style={{ fontFamily: 'Quicksand, sans-serif' }}>Your cursor, your rhythm, your moods</p>
              </div>
            </Card>
            <Card customClass="p-5 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2.5" style={{ background: 'linear-gradient(135deg, #e0d4f0, #ccc0e8)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l2.5 5 5.5 0.8-4 3.9 0.95 5.45L12 14.77l-4.95 2.58.95-5.45L4 8.8l5.5-.8z" fill="#7a60a8" opacity="0.8"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold mb-1 text-sm" style={{ fontFamily: 'Fredoka, sans-serif', color: TITLE_COLOR }}>Kibo celebrates with you</p>
                <p className="text-xs text-[#5a6a5a]" style={{ fontFamily: 'Quicksand, sans-serif' }}>Your small wins deserve applause</p>
              </div>
            </Card>
          </CardSwap>
        </motion.div>
      </div>

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
              borderRadius: '0 60% 60% 60%'
            }}
            animate={{
              y: [0, 90, 0],
              x: [0, 18 * (i % 2 === 0 ? 1 : -1), 0],
              rotate: [0, 200, 360],
              opacity: [0, 0.6, 0]
            }}
            transition={{ duration: 9 + i * 2, repeat: Infinity, delay: i * 0.9, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </section>
  );
};

export default MeetSection;
