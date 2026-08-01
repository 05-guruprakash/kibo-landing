import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import catSheet from '../../assets/Cat-Sheet.png';

const SHEET_W = 256;
const SHEET_H = 1632;
const FRAME = 32;
const CAT_SCALE = 2.4;

const CardCat = ({ frame }: { frame: { x: number; y: number } }) => (
  <motion.div
    className="pointer-events-none absolute bottom-4 right-4"
    style={{ width: FRAME * CAT_SCALE, height: FRAME * CAT_SCALE }}
    initial={{ opacity: 0, y: 14, scale: 0.85 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 14, scale: 0.85 }}
    transition={{ duration: 0.4, ease: [0.34, 1, 0.64, 1] }}
  >
    <div
      style={{
        width: FRAME * CAT_SCALE,
        height: FRAME * CAT_SCALE,
        backgroundImage: `url(${catSheet})`,
        backgroundPosition: `-${frame.x * CAT_SCALE}px -${frame.y * CAT_SCALE}px`,
        backgroundSize: `${SHEET_W * CAT_SCALE}px ${SHEET_H * CAT_SCALE}px`,
        imageRendering: 'pixelated',
        filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.25))'
      }}
    />
  </motion.div>
);

interface Feature {
  id: string;
  title: string;
  tagline: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
  catFrame: { x: number; y: number };
}

const features: Feature[] = [
  {
    id: 'plays',
    title: 'It Plays',
    tagline: 'Follows your cursor',
    description:
      'Kibo notices when you move your mouse into its space — chasing, pouncing, reacting in real time. It never feels scripted.',
    accent: '#22e07c',
    catFrame: { x: 64, y: 608 }, // jumpUp row, playful pose
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'remembers',
    title: 'It Remembers',
    tagline: 'Learns your habits',
    description:
      'Every conversation and quiet moment becomes part of its memory — Kibo learns your patterns, your preferences, your rhythm.',
    accent: '#a855f7',
    catFrame: { x: 0, y: 288 }, // sitting row, calm pose
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'ask',
    title: 'Ask Anything',
    tagline: 'Context-aware chat',
    description:
      'Highlight text anywhere and ask Kibo about it instantly — no copy-paste, no tab switching. It already knows what you meant.',
    accent: '#22e07c',
    catFrame: { x: 32, y: 288 }, // sitting row, alert pose variant
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'grows',
    title: 'It Grows',
    tagline: 'Levels up with you',
    description:
      'Kibo earns experience from every interaction, unlocking new expressions, moods, and personality traits the longer you spend together.',
    accent: '#a855f7',
    catFrame: { x: 96, y: 640 }, // jumpDown row, leaping/growing pose
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 7h7v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const FeaturesHoverSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [activeId, setActiveId] = useState<string>(features[0].id);

  // NOTE: mouse position is written straight to CSS vars via ref (no setState),
  // so the glow tracks the cursor at 60fps without triggering React re-renders.
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleMouseMove = (id: string) => (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRefs.current[id];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  };

  return (
    <section ref={ref} className="section-wrapper" data-section="features-hover">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2
            className="section-title text-white mb-3"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.25)' }}
          >
            Meet Kibo
          </h2>
          <p className="text-white/65 text-base" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            Hover a card to see what makes it tick.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col md:flex-row gap-3 h-auto md:h-[420px]"
        >
          {features.map((f) => {
            const active = activeId === f.id;
            return (
              <motion.div
                key={f.id}
                ref={(el) => (cardRefs.current[f.id] = el)}
                layout
                onMouseEnter={() => setActiveId(f.id)}
                onMouseMove={handleMouseMove(f.id)}
                onClick={() => setActiveId(f.id)}
                animate={{ flex: active ? 3.2 : 1 }}
                transition={{ duration: 0.5, ease: [0.34, 1, 0.64, 1] }}
                className="relative overflow-hidden rounded-3xl cursor-pointer min-h-[110px] md:min-h-0"
                style={{
                  ['--mx' as any]: '50%',
                  ['--my' as any]: '50%',
                  background: active
                    ? 'rgba(255,255,255,0.55)'
                    : 'rgba(255,255,255,0.28)',
                  border: active
                    ? `1.5px solid ${f.accent}66`
                    : '1.5px solid rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: active
                    ? `0 20px 60px ${f.accent}33, inset 0 1px 0 rgba(255,255,255,0.6)`
                    : '0 4px 16px rgba(0,0,0,0.05)'
                }}
              >
                {/* Cursor-follow glow wash (fill) */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: active ? 1 : 0,
                    background: `radial-gradient(320px circle at var(--mx) var(--my), ${f.accent}2e, transparent 70%)`
                  }}
                />

                {/* Cursor-follow glowing border ring (Langflow-style) */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: active ? 1 : 0,
                    padding: '1.5px',
                    background: `radial-gradient(280px circle at var(--mx) var(--my), ${f.accent}, transparent 70%)`,
                    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude' as any,
                  }}
                />

                {/* Collapsed label — always mounted, faded/slid instead of remounted, horizontal (no vertical text) */}
                <motion.div
                  animate={{ opacity: active ? 0 : 1, y: active ? -6 : 0 }}
                  transition={{ duration: 0.35, ease: [0.34, 1, 0.64, 1] }}
                  className="hidden md:flex absolute inset-0 flex-col items-center justify-center gap-3 px-2"
                  style={{ pointerEvents: active ? 'none' : 'auto' }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      color: f.accent,
                      background: `${f.accent}18`,
                      border: `1.5px solid ${f.accent}40`
                    }}
                  >
                    {f.icon}
                  </div>
                  <span
                    className="text-xs font-semibold tracking-wide text-[#2a4a2a]/70 text-center leading-tight"
                    style={{ fontFamily: 'Quicksand, sans-serif' }}
                  >
                    {f.title}
                  </span>
                </motion.div>

                {/* Floating glowy theme particles */}
                <AnimatePresence>
                  {active && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: [0, 0.9, 0],
                            y: [20, -30 - i * 15, -60 - i * 20],
                            x: [0, i % 2 === 0 ? 12 : -12, 0]
                          }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 3.5 + i,
                            repeat: Infinity,
                            delay: i * 0.9,
                            ease: 'easeInOut'
                          }}
                          className="absolute rounded-full"
                          style={{
                            width: 6 + i * 2,
                            height: 6 + i * 2,
                            left: `${20 + i * 25}%`,
                            bottom: '15%',
                            background: f.accent,
                            boxShadow: `0 0 10px ${f.accent}, 0 0 20px ${f.accent}aa`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </AnimatePresence>

                {/* Expanded content */}
                <AnimatePresence>
                  {active && (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8"
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.35, delay: 0.1 }}
                        className="relative w-12 h-12 mb-5"
                      >
                        {/* soft pulsing outer glow */}
                        <motion.div
                          className="absolute -inset-2 rounded-full pointer-events-none"
                          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                          style={{
                            background: `radial-gradient(circle, ${f.accent}55, transparent 70%)`,
                            filter: 'blur(6px)'
                          }}
                        />
                        {/* icon container with gradient fill instead of flat/transparent bg */}
                        <div
                          className="relative w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            color: '#fff',
                            background: `radial-gradient(circle at 30% 30%, ${f.accent}, ${f.accent}bb 60%, ${f.accent}88)`,
                            border: `1.5px solid ${f.accent}aa`,
                            boxShadow: `0 0 20px ${f.accent}66, 0 0 40px ${f.accent}33, inset 0 1px 1px rgba(255,255,255,0.4)`
                          }}
                        >
                          {f.icon}
                        </div>
                      </motion.div>

                      <span
                        className="text-xs font-semibold uppercase tracking-wide mb-2"
                        style={{ color: f.accent, fontFamily: 'Quicksand, sans-serif' }}
                      >
                        {f.tagline}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#1a3a2a] mb-3">
                        {f.title}
                      </h3>
                      <p
                        className="text-sm md:text-base text-[#3a5a3a] leading-relaxed max-w-xs"
                        style={{ fontFamily: 'Quicksand, sans-serif' }}
                      >
                        {f.description}
                      </p>

                      <CardCat frame={f.catFrame} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mobile collapsed label (stacked layout) */}
                {!active && (
                  <div className="md:hidden flex items-center gap-3 p-5 h-full">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ color: f.accent, background: `${f.accent}18`, border: `1.5px solid ${f.accent}40` }}
                    >
                      {f.icon}
                    </div>
                    <span className="text-sm font-semibold text-[#2a4a2a]">{f.title}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesHoverSection;