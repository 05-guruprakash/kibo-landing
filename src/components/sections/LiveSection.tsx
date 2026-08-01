import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import stepHighlightGif from '../../assets/step-highlight.gif';
import stepAskKiboGif from '../../assets/step-ask-kibo.gif';
import stepVisualizeGif from '../../assets/step-visualize.gif';

interface Step {
  gif: string;
  fileName: string;
  label: string;
  description: string;
}

const steps: Step[] = [
  {
    gif: stepHighlightGif,
    fileName: 'highlight.tsx',
    label: 'Highlight',
    description: 'Select any text on the page. Kibo is watching, quietly, for the moment you need it.',
  },
  {
    gif: stepAskKiboGif,
    fileName: 'ask-kibo.tsx',
    label: 'Ask Kibo',
    description: 'Kibo picks up the context instantly — no copy-paste, no switching tabs, no explaining yourself twice.',
  },
  {
    gif: stepVisualizeGif,
    fileName: 'visualize.tsx',
    label: 'Visualize',
    description: 'Kibo explains it back to you, right where you are, in a way that actually makes sense.',
  },
];

const activityFeed = [
  'Kibo just took a nap on your idle tab',
  'Kibo noticed you switched windows',
  'Kibo chirped — it missed you',
  'Kibo watched a build finish',
  'Kibo stretched after 40 minutes of focus',
];

const LiveSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % activityFeed.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const activeStep = steps[activeIndex];

  return (
    <section className="relative py-14 px-6">
      <h2 className="section-title text-center mb-3">See Kibo in action</h2>
      <p className="text-center text-sm opacity-70 mb-8">
        Three steps. Zero friction.
      </p>

      <div
        className="max-w-6xl mx-auto rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr] shadow-xl shadow-black/10 bg-white/10 backdrop-blur-md border border-white/20"
      >
        {/* Left sidebar */}
        <div className="p-5 flex flex-col gap-1">
          {steps.map((step, i) => (
            <button
              key={step.label}
              onClick={() => setActiveIndex(i)}
              className="text-left py-3 pl-4 relative transition-colors"
              style={{
                borderLeft:
                  activeIndex === i
                    ? '2px solid #22e07c'
                    : '2px solid rgba(255,255,255,0.15)',
              }}
            >
              <span
                className="font-medium transition-colors"
                style={{
                  color: activeIndex === i ? 'inherit' : 'rgba(0,0,0,0.4)',
                  opacity: activeIndex === i ? 1 : undefined,
                }}
              >
                {i + 1}. {step.label}
              </span>
            </button>
          ))}
        </div>

        {/* Right panel */}
        <div className="p-5 md:p-6 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                {activeStep.label}
              </h3>
              <p className="opacity-60 leading-relaxed mb-4 max-w-md text-sm">
                {activeStep.description}
              </p>

              {/* Code-editor style frame with gif */}
              <div
                className="rounded-xl overflow-hidden ring-1 ring-white/10"
                style={{ background: '#111111' }}
              >
                <div
                  className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10"
                  style={{ background: '#111111' }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  <span className="ml-3 text-xs text-white/40 font-mono">
                    {activeStep.fileName}
                  </span>
                </div>
                <div className="aspect-video">
                  <img
                    src={activeStep.gif}
                    alt={activeStep.label}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LiveSection;