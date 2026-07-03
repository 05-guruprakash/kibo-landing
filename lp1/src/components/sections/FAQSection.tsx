import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Is it really free?',
    answer: 'Yes — free forever, open source, no subscriptions, no catch. Kibo is built with love, not VC pressure.'
  },
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

const FAQItem = ({ item, index }: { item: FAQItem; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
    >
      <motion.div
        className="rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: open
            ? 'rgba(255,255,255,0.72)'
            : 'rgba(255,255,255,0.48)',
          border: '1.5px solid rgba(255,255,255,0.55)',
          backdropFilter: 'blur(12px)',
          boxShadow: open
            ? '0 8px 32px rgba(60,90,60,0.08)'
            : '0 2px 8px rgba(60,90,60,0.05)'
        }}
        whileHover={{
          background: 'rgba(255,255,255,0.65)',
          boxShadow: '0 6px 24px rgba(60,90,60,0.1)'
        }}
        transition={{ duration: 0.2 }}
        onClick={() => setOpen(o => !o)}
      >
        {/* Question row */}
        <div className="flex items-center justify-between px-6 py-5">
          <span
            className="text-[#2a4a2a] font-medium text-base pr-4"
            style={{ fontFamily: 'Quicksand, sans-serif' }}
          >
            {item.question}
          </span>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
            style={{
              background: open ? '#4a9a5a' : 'rgba(74,154,90,0.15)',
              border: '1.5px solid rgba(74,154,90,0.3)'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="6" y1="1" x2="6" y2="11" stroke={open ? 'white' : '#4a9a5a'} strokeWidth="1.8" strokeLinecap="round" />
              <line x1="1" y1="6" x2="11" y2="6" stroke={open ? 'white' : '#4a9a5a'} strokeWidth="1.8" strokeLinecap="round" />
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
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <p
                className="px-6 pb-5 text-sm text-[#4a6a4a] leading-relaxed"
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
    <section ref={ref} className="section-wrapper" data-section="faq">
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
        <motion.div
          animate={isInView ? {} : {}}
          className="space-y-3"
        >
          {faqs.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </motion.div>

        {/* Still have questions? */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <p
            className="text-white/50 text-sm"
            style={{ fontFamily: 'Quicksand, sans-serif' }}
          >
            Still curious?{' '}
            <a
              href="#"
              className="text-white/75 underline underline-offset-2 hover:text-white transition-colors"
            >
              Talk to us on Discord
            </a>
          </p>
        </motion.div>
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
              background: 'linear-gradient(135deg, rgba(90,180,100,0.5), rgba(60,140,70,0.3))',
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
