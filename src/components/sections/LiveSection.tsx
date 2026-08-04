import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useWaitlist } from '../../contexts/WaitlistContext';

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

const LiveSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { open } = useWaitlist();
  const activeStep = steps[activeIndex];

  return (
    <section className="relative py-16 px-6">
      <h2 className="section-title text-center mb-3 text-white">See Kibo in action</h2>
      <p className="text-center text-base opacity-70 mb-10 text-white">
        Three steps. Zero friction.
      </p>

      <div
        className="max-w-6xl mx-auto rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-[380px_1fr] shadow-xl shadow-black/10 bg-white/10 backdrop-blur-md border border-white/20"
      >

        {/* Left column — steps + description stacked */}
        <div className="p-7 flex flex-col gap-1 border-b md:border-b-0 md:border-r border-white/10">
          {steps.map((step, i) => (
            <button
              key={step.label}
              onClick={() => setActiveIndex(i)}
              className="text-left py-3 pl-4 relative transition-colors"
              style={{
                borderLeft:
                  activeIndex === i
                    ? '3px solid #22e07c'
                    : '3px solid rgba(255,255,255,0.15)',
              }}
            >
              <span
                className="font-semibold text-lg transition-colors"
                style={{
                  color: activeIndex === i ? 'inherit' : 'rgba(0,0,0,0.4)',
                  opacity: activeIndex === i ? 1 : undefined,
                }}
              >
                {i + 1}. {step.label}
              </span>
            </button>
          ))}

          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="opacity-70 leading-relaxed text-base mt-5"
            >
              {activeStep.description}
            </motion.p>
          </AnimatePresence>

        </div>

        {/* Right column — big gif panel */}
        <div className="p-7 md:p-8 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {/* Code-editor style frame with gif */}
              <div
                className="rounded-xl overflow-hidden ring-1 ring-white/10 cursor-pointer"
                style={{ background: '#111111' }}
                onClick={() => open()}
              >
                <div
                  className="flex items-center gap-2 px-4 py-3 border-b border-white/10"
                  style={{ background: '#111111' }}
                >
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="ml-3 text-sm text-white/40 font-mono">
                    {activeStep.fileName}
                  </span>
                </div>
                <div className="aspect-video">
                  <img
                    src={activeStep.gif}
                    alt={activeStep.label}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    style={{ imageRendering: 'pixelated' }}
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