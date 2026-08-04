import { motion } from 'framer-motion';
import { useMemo, memo } from 'react';
import { useScrollContext } from '../contexts/ScrollContext';

// ─── Silhouette hills (no clouds) ──────────────────────────────────────────
const FarHills = memo(() => (
  <svg viewBox="0 0 1440 380" preserveAspectRatio="xMidYMid slice" className="w-full" style={{ height: '55vh' }}>
    <path d="M0 320 Q180 240 360 270 T720 250 T1080 265 T1440 255 L1440 380 L0 380 Z" fill="#2e2440" opacity="0.55" />
    <path d="M0 340 Q200 285 420 300 T840 290 T1200 298 T1440 292 L1440 380 L0 380 Z" fill="#241d38" opacity="0.7" />
    <path d="M0 360 Q120 340 300 348 T600 342 T900 345 T1200 344 T1440 346 L1440 380 L0 380 Z" fill="#1a1530" opacity="0.85" />
  </svg>
));
FarHills.displayName = 'FarHills';

const NearHill = memo(() => (
  <svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" className="w-full h-[42vh]">
    <path d="M0 320 L0 220 Q200 150 500 180 Q700 200 1000 130 Q1200 85 1440 105 L1440 320 Z" fill="#161228" />
    <path d="M0 320 L0 280 Q300 260 600 268 T1200 272 T1440 268 L1440 320 Z" fill="#0e0c1c" />
  </svg>
));
NearHill.displayName = 'NearHill';

// Stars: computed once
const STAR_FIELD = Array.from({ length: 90 }, () => ({
  width: Math.random() * 2.5 + 0.5,
  height: Math.random() * 2.5 + 0.5,
  left: Math.random() * 100,
  top: Math.random() * 65,
  duration: 2 + Math.random() * 2.5,
  delay: Math.random() * 4
}));

const StarField = memo(({ opacity }: { opacity: number }) => (
  <div style={{ opacity }} className="absolute inset-0 pointer-events-none transition-opacity duration-700">
    {STAR_FIELD.map((s, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white"
        style={{ width: s.width, height: s.height, left: `${s.left}%`, top: `${s.top}%` }}
        animate={{ opacity: [0.15, 1, 0.15] }}
        transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
      />
    ))}
  </div>
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
  const { scrollProgress } = useScrollContext();

  // t: 0 = full sunset (top of page), 1 = full night (bottom of page)
  const t = Math.min(Math.max(scrollProgress, 0), 1);
  const bucketed = Math.round(t * 100) / 100;

  const nearHillY = scrollProgress * -8;
  const farHillY = scrollProgress * -20;

  // Sunset → night sky gradient stops
  const { skyA, skyB, skyC, skyD } = useMemo(
    () => ({
      // upper sky
      skyA: lerpColor('#2b3a67', '#05070f', bucketed),
      // mid-upper — warm orange fading to deep indigo
      skyB: lerpColor('#e0704a', '#141530', bucketed),
      // mid-lower — pink/gold horizon glow fading out
      skyC: lerpColor('#f4a15c', '#1c1b3a', bucketed),
      // horizon line — brightest sunset band, fading to near-black
      skyD: lerpColor('#ffd27a', '#0a0a18', bucketed),
    }),
    [bucketed]
  );

  // Sun sinks below horizon and fades as t increases; glow fades with it
  const sunY = 38 + t * 45; // % from top, moves down
  const sunOpacity = Math.max(0, 1 - t * 1.6);
  const glowOpacity = Math.max(0, 1 - t * 1.3);

  // Moon rises and fades in as sun fades out
  const moonOpacity = Math.max(0, (t - 0.4) / 0.6);
  const moonY = 18 - t * 4;

  const starOpacity = Math.max(0, (t - 0.35) / 0.65);

  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      {/* Layered sunset → night sky */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom,
            ${skyA} 0%,
            ${skyB} 38%,
            ${skyC} 58%,
            ${skyD} 72%,
            #0d0e1c 100%)`
        }}
      />

      {/* Sun with realistic glow, sinking + fading on scroll */}
      <motion.div
        className="absolute left-1/2 pointer-events-none"
        style={{
          top: `${sunY}%`,
          transform: 'translate(-50%, -50%)',
          opacity: sunOpacity
        }}
      >
        <div
          style={{
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,210,120,0.5) 0%, rgba(255,150,90,0.22) 35%, transparent 70%)',
            opacity: glowOpacity,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)'
          }}
        />
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 35%, #fff3d6, #ffcf7a 45%, #ff9a56 80%)',
            boxShadow: '0 0 60px 20px rgba(255,180,100,0.45)'
          }}
        />
      </motion.div>

      {/* Moon, rising as night falls */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: `${moonY}%`,
          right: '14%',
          opacity: moonOpacity,
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #fdfaf0, #e6e2d4)',
          boxShadow: '0 0 40px rgba(255,250,220,0.35), 0 0 90px rgba(255,250,220,0.15)'
        }}
      />

      {/* Stars, fading in as sunset gives way to night */}
      <StarField opacity={starOpacity} />

      {/* Horizon glow band, warm light hugging the hill line, fading with sunset */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '54%',
          height: '18%',
          background: 'linear-gradient(to bottom, transparent, rgba(255,170,90,0.35), transparent)',
          opacity: Math.max(0, 1 - t * 1.4),
          filter: 'blur(2px)'
        }}
      />

      {/* Silhouette hills, no clouds */}
      <motion.div className="absolute bottom-[30vh] w-full" style={{ y: farHillY }}>
        <FarHills />
      </motion.div>
      <motion.div className="absolute bottom-0 w-full" style={{ y: nearHillY }}>
        <NearHill />
      </motion.div>

      {/* Subtle grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  );
};

export default GhibliBackground;