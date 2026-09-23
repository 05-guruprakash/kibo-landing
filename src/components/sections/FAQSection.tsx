import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Will it slow down my laptop?',
    answer: 'No. Kibo uses under 50MB of RAM and barely touches your CPU. It naps when you nap, and it takes its rest seriously.'
  },
  {
    question: 'Does it need the internet?',
    answer: 'Only if you want it to chat back. Kibo lives and plays offline too — it will still follow your cursor, sleep, and celebrate your wins without Wi-Fi.'
  },
  {
    question: 'What does the AI actually do?',
    answer: 'Kibo uses a small on-device model to understand context — your active app, time of day, recent activity — and responds with the right emotion. No data leaves your machine.'
  },
  {
    question: 'Can I customise Kibo?',
    answer: 'Yes. You can change its fur colour, accessorise it, and unlock new expressions as you spend more time together. More customisations arrive in updates.'
  },
  {
    question: 'More companions coming?',
    answer: 'Dog and bunny are next, with more species already sketched out. Kibo was just the beginning of a small desktop zoo.'
  }
];

// slight per-card entrance variance so cards feel hand-placed, not a stiff grid
const tilts = [-1.2, 0.8, -0.6, 1.1, -0.9];
const accents = ['#140693', '#140693', '#140693', '#140693', '#140693'];

const FAQItem = ({ item, index }: { item: FAQItem; index: number }) => {
  const [open, setOpen] = useState(false);
  const accent = accents[index % accents.length];
  const tilt = tilts[index % tilts.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: tilt * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.34, 1.2, 0.64, 1] }}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: open
            ? 'rgba(255,255,255,0.75)'
            : 'rgba(255,255,255,0.4)',
          border: open
            ? `1.5px solid ${accent}66`
            : '1.5px solid rgba(255,255,255,0.5)',
          backdropFilter: 'blur(14px)',
          boxShadow: open
            ? `0 10px 36px ${accent}33, 0 2px 12px rgba(0,0,0,0.06)`
            : '0 2px 10px rgba(0,0,0,0.04)'
        }}
        whileHover={{
          rotate: tilt * -0.4,
          boxShadow: `0 10px 30px ${accent}22`
        }}
        transition={{ duration: 0.25 }}
        onClick={() => setOpen(o => !o)}
      >
        {/* Glow strip on the left when open */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ background: accent, filter: `drop-shadow(0 0 6px ${accent})` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: open ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Ambient fireflies near open card */}
        <AnimatePresence>
          {open && (
            <>
              {[0, 1, 2].map((f) => (
                <motion.div
                  key={f}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    right: `${10 + f * 12}%`,
                    top: `${20 + (f % 2) * 40}%`,
                    width: 4,
                    height: 4,
                    background: accent,
                    boxShadow: `0 0 8px ${accent}, 0 0 16px ${accent}88`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.9, 0.6, 0],
                    y: [0, -14, -6, 4],
                    scale: [0.4, 1, 0.8, 0.3]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3 + f, repeat: Infinity, delay: f * 0.5, ease: 'easeInOut' }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Question row */}
        <div className="flex items-center justify-between gap-4 pl-6 pr-4 sm:pl-8 sm:pr-6 py-4 sm:py-5">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="text-xs font-bold shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                color: open ? '#fff' : accent,
                background: open ? accent : `${accent}18`,
                border: `1.5px solid ${accent}55`,
                transition: 'all 0.25s ease'
              }}
            >
              {index + 1}
            </span>
            <span
              className="text-[#2a4a2a] font-medium text-sm sm:text-base truncate"
              style={{ fontFamily: 'Quicksand, sans-serif' }}
            >
              {item.question}
            </span>
          </div>

          {/* Seed → X toggle */}
          <motion.div
            animate={{ rotate: open ? 135 : 0 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
            style={{
              background: open ? accent : `${accent}18`,
              boxShadow: open ? `0 0 12px ${accent}88` : 'none',
              border: `1.5px solid ${accent}55`
            }}
          >
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
              <line x1="6" y1="1" x2="6" y2="11" stroke={open ? 'white' : accent} strokeWidth="1.8" strokeLinecap="round" />
              <line x1="1" y1="6" x2="11" y2="6" stroke={open ? 'white' : accent} strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <p
                className="pl-6 pr-4 sm:pl-8 sm:pr-6 pb-5 text-sm text-[#3a5a3a] leading-relaxed"
                style={{ fontFamily: 'Quicksand, sans-serif' }}
              >
                {item.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section ref={ref} className="section-wrapper relative overflow-hidden" data-section="faq">
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
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
            Questions
          </h2>
          <p
            className="text-white/65 text-base"
            style={{ fontFamily: 'Quicksand, sans-serif' }}
          >
            Everything you wondered but were too shy to ask Kibo directly.
          </p>
        </motion.div>

        {/* FAQ list */}
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Ambient floating leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 22}%`,
              top: '5%',
              width: 10,
              height: 16,
              background: 'linear-gradient(135deg, rgba(11, 179, 20, 0.5), rgba(60,140,70,0.3))',
              borderRadius: '0 60% 60% 60%',
            }}
            animate={{
              y: [0, 120, 0],
              x: [0, 20 * (i % 2 === 0 ? 1 : -1), 0],
              rotate: [0, 180, 360],
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              delay: i * 1.2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
