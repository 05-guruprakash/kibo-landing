import { motion } from 'framer-motion';
import { useMemo, memo } from 'react';
import { useScrollContext } from '../contexts/ScrollContext';

// Static, memoized — only re-renders if these exact props change (never, in practice)
const FarClouds = memo(() => (
  <svg viewBox="0 0 1440 380" preserveAspectRatio="xMidYMid slice" className="w-full" style={{ height: '70vh' }}>
    <ellipse cx="340" cy="100" rx="220" ry="80" fill="#eef5fa" opacity="0.97" />
    <ellipse cx="200" cy="130" rx="130" ry="60" fill="#e8f0f7" opacity="0.95" />
    <ellipse cx="480" cy="115" rx="150" ry="65" fill="#f0f6fb" opacity="0.95" />
    <ellipse cx="340" cy="145" rx="250" ry="50" fill="#e2edf5" opacity="0.9" />
    <ellipse cx="340" cy="158" rx="220" ry="30" fill="#c8dce8" opacity="0.5" />
    <ellipse cx="220" cy="148" rx="100" ry="18" fill="#c0d4e4" opacity="0.4" />
    <ellipse cx="1150" cy="80" rx="180" ry="65" fill="#eef5fa" opacity="0.92" />
    <ellipse cx="1050" cy="105" rx="110" ry="50" fill="#e8f0f7" opacity="0.9" />
    <ellipse cx="1280" cy="95" rx="120" ry="55" fill="#f0f6fb" opacity="0.9" />
    <ellipse cx="1150" cy="130" rx="200" ry="38" fill="#ddeaf4" opacity="0.85" />
    <ellipse cx="1150" cy="140" rx="180" ry="22" fill="#c4d8e8" opacity="0.4" />
    <ellipse cx="700" cy="55" rx="90" ry="35" fill="#f2f8fc" opacity="0.7" />
    <ellipse cx="700" cy="72" rx="95" ry="22" fill="#e4eef7" opacity="0.6" />
    <path d="M0 320 Q180 220 360 260 T720 230 T1080 255 T1440 240 L1440 380 L0 380 Z" fill="#5aab6e" />
    <path d="M0 340 Q200 270 420 295 T840 278 T1200 292 T1440 285 L1440 380 L0 380 Z" fill="#4fa462" />
    <path d="M0 360 Q120 335 300 345 T600 338 T900 342 T1200 340 T1440 345 L1440 380 L0 380 Z" fill="#3d9050" />
  </svg>
));
FarClouds.displayName = 'FarClouds';

const NearHill = memo(() => (
  <svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" className="w-full h-[55vh]">
    <path d="M0 320 L0 200 Q200 120 500 160 Q700 185 1000 100 Q1200 50 1440 80 L1440 320 Z" fill="#52b868" />
    <path d="M0 320 L0 220 Q150 160 400 190 Q600 210 900 140 Q1100 90 1440 110 L1440 320 Z" fill="#5ec97a" opacity="0.4" />
    <path d="M0 320 L0 280 Q300 260 600 268 T1200 272 T1440 268 L1440 320 Z" fill="#3a8a4e" />
  </svg>
));
NearHill.displayName = 'NearHill';

const ForegroundFoliage = memo(() => (
  <svg viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice" className="w-full h-[40vh]">
    <rect x="0" y="160" width="1440" height="80" fill="#3d8e50" />
    <g>
      <line x1="110" y1="160" x2="95" y2="40" stroke="#4a7a3a" strokeWidth="3" />
      <line x1="130" y1="160" x2="118" y2="30" stroke="#4a7a3a" strokeWidth="3" />
      <line x1="150" y1="160" x2="140" y2="50" stroke="#4a7a3a" strokeWidth="2.5" />
      <ellipse cx="95" cy="38" rx="8" ry="22" fill="#e8899a" opacity="0.85" transform="rotate(-5 95 38)" />
      <ellipse cx="118" cy="28" rx="7" ry="20" fill="#d4748a" opacity="0.8" transform="rotate(3 118 28)" />
      <ellipse cx="140" cy="48" rx="6" ry="18" fill="#c8687e" opacity="0.75" transform="rotate(-8 140 48)" />
      <path d="M80 160 Q60 100 40 80 Q55 95 80 130 Q85 145 80 160" fill="#3a6e2a" />
      <path d="M170 160 Q185 110 200 85 Q190 105 175 135 Q172 148 170 160" fill="#4a7e3a" />
      <path d="M60 160 Q50 130 35 110 Q45 125 60 145" fill="#5a8e4a" />
    </g>
    <circle cx="250" cy="148" r="6" fill="#f0c060" />
    <circle cx="255" cy="144" r="5" fill="#e8b840" opacity="0.8" />
    <circle cx="330" cy="152" r="5" fill="#f0c060" />
    <circle cx="415" cy="149" r="6" fill="#d4b040" />
    <path d="M300 160 Q285 125 270 105 Q282 118 298 140" fill="#3d7030" />
    <path d="M380 160 Q370 130 360 110 Q372 128 382 150" fill="#4a7e3c" />
    <path d="M440 160 Q430 120 420 95 Q434 112 444 140" fill="#4d8040" />
    {[60, 200, 350, 520, 700, 900, 1100, 1300].map((x, i) => (
      <g key={i}>
        <path d={`M${x} 165 Q${x - 8} 148 ${x - 5} 138 Q${x} 150 ${x} 165`} fill="#56a060" />
        <path d={`M${x + 8} 165 Q${x + 16} 145 ${x + 14} 135 Q${x + 10} 148 ${x + 8} 165`} fill="#4e9855" />
        <path d={`M${x + 4} 165 Q${x + 2} 142 ${x + 5} 132 Q${x + 6} 148 ${x + 4} 165`} fill="#5aaa62" />
      </g>
    ))}
    <path d="M1360 160 Q1340 100 1310 75 Q1330 95 1355 130" fill="#3a6e2a" />
    <path d="M1400 160 Q1420 105 1435 80 Q1418 105 1402 135" fill="#4a7e3a" />
  </svg>
));
ForegroundFoliage.displayName = 'ForegroundFoliage';

// Stars: positions computed ONCE, not on every render
const STAR_FIELD = Array.from({ length: 60 }, () => ({
  width: Math.random() * 2.5 + 0.5,
  height: Math.random() * 2.5 + 0.5,
  left: Math.random() * 100,
  top: Math.random() * 55,
  duration: 2 + Math.random() * 2,
  delay: Math.random() * 3
}));

const StarField = memo(() => (
  <>
    {STAR_FIELD.map((s, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white"
        style={{ width: s.width, height: s.height, left: `${s.left}%`, top: `${s.top}%` }}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
      />
    ))}
  </>
));
StarField.displayName = 'StarField';

function lerpColor(a: string, b: string, t: number): string {
  const ah = a.replace('#', '');
  const bh = b.replace('#', '');
  const ar = parseInt(ah.slice(0, 2), 16);
  const ag = parseInt(ah.slice(2, 4), 16);
  const ab = parseInt(ah.slice(4, 6), 16);
  const br = parseInt(bh.slice(0, 2), 16);
  const bg = parseInt(bh.slice(2, 4), 16);
  const bb = parseInt(bh.slice(4, 6), 16);
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return `#${rr.toString(16).padStart(2, '0')}${rg.toString(16).padStart(2, '0')}${rb.toString(16).padStart(2, '0')}`;
}

const GhibliBackground = () => {
  const { scrollProgress, currentSection } = useScrollContext();

  const skyY = scrollProgress * -60;
  const cloudY = scrollProgress * -30;
  const nearHillY = scrollProgress * -8;
  const grassY = scrollProgress * -3;

  // Bucket to 2 decimals so we don't recompute the hex lerp on every micro-scroll tick
  const bucketed = Math.round(scrollProgress * 50) / 50;
  const { skyTop, skyBottom } = useMemo(
    () => ({
      skyTop: lerpColor('#2a7fa8', '#1a2a5e', Math.min(bucketed * 1.5, 1)),
      skyBottom: lerpColor('#4dbdcf', '#3a4a8a', Math.min(bucketed * 1.5, 1))
    }),
    [bucketed]
  );

  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to bottom, ${skyTop} 0%, ${skyBottom} 55%, #5aab6e 55%, #5aab6e 100%)` }}
      />

      <motion.div className="absolute w-full" style={{ top: `${skyY * 0.4}px`, y: cloudY }}>
        <FarClouds />
      </motion.div>

      <motion.div className="absolute bottom-0 w-full" style={{ y: nearHillY }}>
        <NearHill />
      </motion.div>

      <motion.div className="absolute bottom-0 w-full pointer-events-none" style={{ y: grassY }}>
        <ForegroundFoliage />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute"
          style={{ top: '5%', left: '-20%' }}
          animate={{ x: ['0%', '140%'] }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="200" height="80" viewBox="0 0 200 80">
            <ellipse cx="100" cy="45" rx="80" ry="30" fill="white" opacity="0.4" />
            <ellipse cx="70" cy="45" rx="50" ry="22" fill="white" opacity="0.4" />
            <ellipse cx="130" cy="45" rx="45" ry="20" fill="white" opacity="0.35" />
            <ellipse cx="100" cy="34" rx="70" ry="28" fill="white" opacity="0.25" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute"
          style={{ top: '12%', right: '-15%' }}
          animate={{ x: ['0%', '-130%'] }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear', delay: 20 }}
        >
          <svg width="140" height="60" viewBox="0 0 140 60">
            <ellipse cx="70" cy="35" rx="55" ry="22" fill="white" opacity="0.3" />
            <ellipse cx="45" cy="35" rx="35" ry="16" fill="white" opacity="0.3" />
            <ellipse cx="95" cy="35" rx="30" ry="14" fill="white" opacity="0.25" />
          </svg>
        </motion.div>
      </div>

      {currentSection >= 5 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <StarField />
        </motion.div>
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.025,
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  );
};

export default GhibliBackground;