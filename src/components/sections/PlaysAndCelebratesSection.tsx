import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const PlaysAndCelebratesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [burst, setBurst] = useState(false);
  const playRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!playRef.current) return;
      const rect = playRef.current.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      )
        return;
      setCursorPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const triggerBurst = () => {
    setBurst(true);
    setTimeout(() => setBurst(false), 1600);
  };

  const confetti = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.4,
    duration: 1.4 + Math.random() * 0.8,
    color: ['#ffd700', '#ff6b6b', '#4ecdc4', '#95e1d3', '#f38181', '#a8e6cf'][i % 6],
    size: 6 + Math.random() * 6,
    rotation: Math.random() * 360
  }));

  const achievements = [
    { icon: '✓', label: 'Finished a task', color: 'from-[#56c96a] to-[#3aa84e]' },
    { icon: '☕', label: 'Made your coffee', color: 'from-[#f5a55a] to-[#d4844a]' },
    { icon: '✦', label: 'Checked in today', color: 'from-[#9b8fe0] to-[#7a6ec0]' }
  ];

  return (
    <section ref={ref} className="section-wrapper" data-section="plays-and-celebrates">
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-6xl mx-auto w-full">
        {/* Shared header */}
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
            It Plays &amp; Celebrates You
          </h2>
          <p
            className="text-white/70 max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: 'Quicksand, sans-serif' }}
          >
            Move your mouse in the playground, then tap the card to celebrate a win.
          </p>
        </motion.div>

        {/* Side-by-side grid: stacks on mobile, sits side by side from md up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 w-full items-stretch">
          {/* ---------- PLAYS PANE ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.96 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full"
            style={{ aspectRatio: '4/3' }}
          >
            <div
              ref={playRef}
              className="w-full h-full rounded-3xl overflow-hidden cursor-none relative"
              style={{
                background: 'rgba(255,255,255,0.38)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255,255,255,0.55)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)'
              }}
            >
              {/* Grid */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="playGrid2" width="36" height="36" patternUnits="userSpaceOnUse">
                      <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#2a4a2a" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#playGrid2)" />
                </svg>
              </div>

              {/* Cursor glow */}
              <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                  width: 100,
                  height: 100,
                  left: `${cursorPos.x}%`,
                  top: `${cursorPos.y}%`,
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(255,215,0,0.2), transparent 70%)'
                }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              {/* Draggable toy ball */}
              <motion.div
                className="absolute w-8 h-8 rounded-full z-10"
                style={{
                  top: '38%',
                  left: '42%',
                  background: 'radial-gradient(circle at 35% 35%, #ffe066, #ffa500)',
                  boxShadow: '0 4px 20px rgba(255,165,0,0.5), 0 1px 0 rgba(255,255,255,0.4) inset',
                  cursor: 'grab'
                }}
                drag
                dragConstraints={{ left: -120, right: 120, top: -60, bottom: 60 }}
                whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
                animate={{ y: [0, -4, 0] }}
                transition={{ y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
              />

              {/* Mini Kibo following cursor */}
              <motion.div
                className="absolute pointer-events-none z-20"
                style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
                transition={{ type: 'spring', stiffness: 80, damping: 18 }}
              >
                <motion.div
                  style={{ x: -18, y: -18 }}
                  animate={{ rotate: [0, 4, -4, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <svg width="26" height="26" viewBox="0 0 60 60" fill="none">
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

              {/* Hint */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-[#4a7a4a]/70 flex items-center gap-2 whitespace-nowrap"
                style={{ fontFamily: 'Quicksand, sans-serif' }}
              >
                <div className="w-2 h-2 rounded-full bg-[#ffd700] animate-pulse" />
                move your cursor · drag the ball
              </div>
            </div>
          </motion.div>

          {/* ---------- CELEBRATES PANE ---------- */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full"
            style={{ aspectRatio: '4/3' }}
          >
            {/* Burst confetti, scoped to this pane */}
            <AnimatePresence>
              {burst && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 rounded-3xl">
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
                        y: [-10, -100 - Math.random() * 80],
                        x: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 130],
                        opacity: [1, 1, 0],
                        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)]
                      }}
                      transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

            <div
              className="w-full h-full rounded-3xl p-6 cursor-pointer select-none flex flex-col justify-center"
              style={{
                background: 'rgba(255,255,255,0.52)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255,255,255,0.65)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.08)'
              }}
              onClick={triggerBurst}
            >
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                <p
                  className="text-xs text-[#6a8a6a] mb-4 font-medium tracking-wide uppercase"
                  style={{ fontFamily: 'Quicksand, sans-serif' }}
                >
                  Tap to celebrate
                </p>

                <div className="space-y-3">
                  {achievements.map((a, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.55 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white font-bold text-sm shadow shrink-0`}
                      >
                        {a.icon}
                      </div>
                      <div className="min-w-0">
                        <p
                          className="font-semibold text-[#1a3a1a] text-sm truncate"
                          style={{ fontFamily: 'Quicksand, sans-serif' }}
                        >
                          {a.label}
                        </p>
                        <p className="text-xs text-[#5a7a5a] mt-0.5">Kibo noticed!</p>
                      </div>

                      {/* Tick animation */}
                      <motion.div
                        className="ml-auto shrink-0"
                        animate={burst ? { scale: [0, 1.3, 1], opacity: [0, 1, 1] } : { scale: 0, opacity: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4, type: 'spring' }}
                      >
                        <div className="w-5 h-5 rounded-full bg-[#4a9a5a] flex items-center justify-center">
                          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M2 5l2.5 2.5L8 3"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Connecting divider — a soft animated thread between the two panes, only on desktop */}
        <motion.div
          className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ zIndex: 5 }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? { opacity: 0.5, scale: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.div
            className="w-3 h-3 rounded-full"
            style={{ background: 'radial-gradient(circle, #ffd700, transparent 70%)' }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 text-sm text-white/45 text-center"
          style={{ fontFamily: 'Quicksand, sans-serif' }}
        >
          Play together, then celebrate the little wins.
        </motion.p>
      </div>
    </section>
  );
};

export default PlaysAndCelebratesSection;
