import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const PlaysSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = (ref.current as HTMLElement).getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      setCursorPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={ref} className="section-wrapper" data-section="plays">
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-4xl mx-auto">
        {/* Header */}
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
            It Plays
          </h2>
          <p
            className="text-white/70 max-w-sm mx-auto leading-relaxed"
            style={{ fontFamily: 'Quicksand, sans-serif' }}
          >
            Move your mouse inside the playground below. Kibo will notice.
          </p>
        </motion.div>

        {/* Play area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative w-full max-w-2xl"
          style={{ aspectRatio: '16/9' }}
        >
          <div
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
                  <pattern id="playGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2a4a2a" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#playGrid)" />
              </svg>
            </div>

            {/* Cursor glow */}
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

            {/* Draggable toy ball */}
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

            {/* Mini Kibo following cursor */}
            <motion.div
              className="absolute pointer-events-none z-20"
              style={{
                left: `${cursorPos.x}%`,
                top: `${cursorPos.y}%`,
              }}
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

            {/* Hint */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-[#4a7a4a]/70 flex items-center gap-2"
              style={{ fontFamily: 'Quicksand, sans-serif' }}
            >
              <div className="w-2 h-2 rounded-full bg-[#ffd700] animate-pulse" />
              move your cursor · drag the ball
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlaysSection;
