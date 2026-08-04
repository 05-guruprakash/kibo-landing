import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';

const activityFeed = [
  'Kibo summarized your last 3 tabs',
  'Kibo flagged a repeated task and automated it',
  'Kibo went idle while you were in a meeting',
  'Kibo caught your build error before you did',
  'Kibo settled in after 40 minutes of deep focus',
];
const PlaysSection = () => {
  const ref = useRef(null);
  const playRef = useRef(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const remembersCardRef = useRef<HTMLDivElement>(null);
  const asideCardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [isHoveringPlay, setIsHoveringPlay] = useState(false);
  const [activityIndex, setActivityIndex] = useState(0);
  const [connectors, setConnectors] = useState<{
    w: number; h: number;
    a: { x: number; y: number }; b: { x: number; y: number };
    c: { x: number; y: number }; d: { x: number; y: number };
  } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      if (!gridRef.current || !remembersCardRef.current || !asideCardRef.current || !playRef.current) return;
      const gridRect = gridRef.current.getBoundingClientRect();
      const remRect = remembersCardRef.current.getBoundingClientRect();
      const asideRect = asideCardRef.current.getBoundingClientRect();
      const playRect = playRef.current.getBoundingClientRect();

      setConnectors({
        w: gridRect.width,
        h: gridRect.height,
        a: { x: remRect.right - gridRect.left, y: remRect.top + remRect.height / 2 - gridRect.top },
        b: { x: asideRect.right - gridRect.left, y: asideRect.top + asideRect.height / 2 - gridRect.top },
        c: { x: playRect.left - gridRect.left, y: playRect.top + playRect.height * 0.3 - gridRect.top },
        d: { x: playRect.left - gridRect.left, y: playRect.top + playRect.height * 0.7 - gridRect.top },
      });
    };

    measure();
    window.addEventListener('resize', measure);
    const ro = new ResizeObserver(measure);
    if (gridRef.current) ro.observe(gridRef.current);
    return () => {
      window.removeEventListener('resize', measure);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!playRef.current) return;
      const rect = (playRef.current as HTMLElement).getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) return;
      setCursorPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % activityFeed.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fireflies = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 4 + Math.random() * 3,
    size: 2 + Math.random() * 3
  }));

  return (
    <section ref={ref} className="section-wrapper relative overflow-hidden" data-section="plays">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
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
              boxShadow: '0 0 6px #ffd70066, 0 0 12px #ffa50044'
            }}
            animate={{
              opacity: [0, 0.5, 0.35, 0],
              y: [0, -25, -15, 8],
              x: [0, 8, -4, 12],
              scale: [0.5, 1, 0.8, 0.3]
            }}
            transition={{ duration: f.duration, repeat: Infinity, delay: f.delay, ease: 'easeInOut' }}
          />
        ))}

        <motion.svg
          className="w-full h-full absolute inset-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.2 } : { opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <defs>
            <linearGradient id="threadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffd700" stopOpacity="0.6" />
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
        </motion.svg>
      </div>

      <div className="relative z-10 px-6 max-w-6xl mx-auto">
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
            It Plays. It Automates.
          </h2>
          <p
            className="text-white/70 max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: 'Quicksand, sans-serif' }}
          >
            Move your mouse into the playground. Kibo will notice — and won't forget.
          </p>
        </motion.div>

        <div ref={gridRef} className="relative grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 items-start">
          {connectors && (
            <svg
              className="hidden md:block absolute inset-0 pointer-events-none z-20"
              style={{ overflow: 'visible' }}
              width={connectors.w}
              height={connectors.h}
              viewBox={`0 0 ${connectors.w} ${connectors.h}`}
            >
              <defs>
                <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#22e07c" stopOpacity="0.75" />
                </linearGradient>
                <filter id="neonGlow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="5" result="blur1" />
                  <feMerge>
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <motion.path
                d={`M ${connectors.a.x} ${connectors.a.y} C ${connectors.a.x + (connectors.c.x - connectors.a.x) * 0.55} ${connectors.a.y}, ${connectors.a.x + (connectors.c.x - connectors.a.x) * 0.45} ${connectors.c.y}, ${connectors.c.x} ${connectors.c.y}`}
                stroke="url(#connGrad)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.1, delay: 0.4 }}
              />
              <motion.path
                d={`M ${connectors.b.x} ${connectors.b.y} C ${connectors.b.x + (connectors.d.x - connectors.b.x) * 0.55} ${connectors.b.y}, ${connectors.b.x + (connectors.d.x - connectors.b.x) * 0.45} ${connectors.d.y}, ${connectors.d.x} ${connectors.d.y}`}
                stroke="url(#connGrad)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.1, delay: 0.6 }}
              />

              {[connectors.a, connectors.b, connectors.c, connectors.d].map((n, i) => {
                const color = i % 2 === 0 ? '#22e07c' : '#a855f7';
                return (
                  <motion.g key={i} filter="url(#neonGlow)">
                    <motion.circle
                      cx={n.x}
                      cy={n.y}
                      r="7"
                      fill={color}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
                    />
                    <circle cx={n.x} cy={n.y} r="2.5" fill="#ffffff" />
                  </motion.g>
                );
              })}
            </svg>
          )}

          <div className="relative z-10 flex flex-col gap-6">
            <motion.div
              ref={remembersCardRef}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="rounded-3xl px-8 py-8"
              style={{
                background: 'rgba(255,255,255,0.52)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255,255,255,0.6)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.08)'
              }}
            >
              <h3 className="text-xl font-bold text-[#1a3a2a] mb-3">It Automates</h3>
              <p className="text-sm text-[#2a4a2a] leading-relaxed" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                The repetitive stuff — sorting files, summarizing docs, running the same steps
                over and over — Kibo quietly takes off your plate.
              </p>
            </motion.div>

            <motion.aside
              ref={asideCardRef}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col items-center rounded-3xl px-6 py-7"
              style={{
                background: 'rgba(255,255,255,0.45)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255,255,255,0.55)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.08)'
              }}
            >
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{
                  background: 'radial-gradient(circle, rgba(255,220,50,0.35), rgba(255,165,0,0.15))',
                  border: '1.5px solid rgba(255,210,50,0.4)',
                  backdropFilter: 'blur(8px)'
                }}
                animate={{ boxShadow: ['0 0 20px #ffd70040', '0 0 40px #ffd70070', '0 0 20px #ffd70040'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#ffd700" opacity="0.7" />
                  <circle cx="12" cy="12" r="3" fill="#ffd700" />
                </svg>
              </motion.div>

              <div className="flex flex-col gap-3 w-full">
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
                      className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,215,0,0.18)', border: '1.5px solid rgba(255,215,0,0.4)' }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3 + i, repeat: Infinity }}
                    >
                      <span className="text-xs">{'✦'.repeat(i + 1)}</span>
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

          <div className="relative z-10 flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative w-full"
              style={{ aspectRatio: '16/9' }}
            >
              <div
                ref={playRef}
                onMouseEnter={() => setIsHoveringPlay(true)}
                onMouseLeave={() => setIsHoveringPlay(false)}
                className="w-full h-full rounded-3xl overflow-hidden cursor-none relative"
                style={{
                  background: 'rgba(255,255,255,0.38)',
                  backdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(255,255,255,0.55)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)'
                }}
              >
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="playGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2a4a2a" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#playGrid)" />
                  </svg>
                </div>

                {isHoveringPlay && (
                  <motion.div
                    className="absolute pointer-events-none rounded-full"
                    style={{
                      width: 120,
                      height: 120,
                      left: `${cursorPos.x}%`,
                      top: `${cursorPos.y}%`,
                      transform: 'translate(-50%, -50%)',
                      background: 'radial-gradient(circle, rgba(255,215,0,0.2), transparent 70%)'
                    }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                <motion.div
                  className="absolute w-9 h-9 rounded-full z-10"
                  style={{
                    top: '38%',
                    left: '42%',
                    background: 'radial-gradient(circle at 35% 35%, #ffe066, #ffa500)',
                    boxShadow: '0 4px 20px rgba(255,165,0,0.5), 0 1px 0 rgba(255,255,255,0.4) inset',
                    cursor: 'grab'
                  }}
                  drag
                  dragConstraints={{ left: -160, right: 160, top: -80, bottom: 80 }}
                  whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
                />

                <AnimatePresence>
                  {isHoveringPlay && (
                    <motion.div
                      className="absolute pointer-events-none z-20"
                      style={{
                        left: `${cursorPos.x}%`,
                        top: `${cursorPos.y}%`,
                      }}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                    >
                      <motion.div
                        style={{ x: -20, y: -20 }}
                        animate={{ rotate: [0, 4, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      >
                        <svg width="28" height="28" viewBox="0 0 60 60" fill="none">
                          <ellipse cx="30" cy="40" rx="14" ry="11" fill="#f5e6d3" />
                          <ellipse cx="30" cy="22" rx="13" ry="11" fill="#f5e6d3" />
                          <path d="M18 15 Q12 6 22 10" fill="#f5e6d3" />
                          <path d="M42 15 Q48 6 38 10" fill="#f5e6d3" />
                          <circle cx="25" cy="21" r="2.5" fill="white" />
                          <circle cx="35" cy="21" r="2.5" fill="white" />
                          <circle cx="25" cy="21" r="1.5" fill="#3a3a3a" />
                          <circle cx="35" cy="21" r="1.5" fill="#3a3a3a" />
                          <ellipse cx="30" cy="26" rx="2" ry="1.2" fill="#fcd5ce" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-[#4a7a4a]/70 flex items-center gap-2"
                  style={{ fontFamily: 'Quicksand, sans-serif' }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#ffd700] animate-pulse" />
                  hover · drag the ball
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-full rounded-xl px-6 py-4"
              style={{
                background: 'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255,255,255,0.5)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-[#2a4a2a]/70">Live activity</span>
              </div>
              <div className="text-sm h-5 overflow-hidden relative text-[#2a4a2a]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activityIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    {activityFeed[activityIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaysSection;
