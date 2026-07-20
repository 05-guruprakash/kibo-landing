import { motion } from 'framer-motion';
import { useState } from 'react';

import stepHighlightGif from '../../assets/step-highlight.gif';
import stepHighlightPoster from '../../assets/step-highlight-poster.png';
// import stepAskKiboGif from '../../assets/step-ask-kibo.gif';
// import stepAskKiboPoster from '../../assets/step-ask-kibo-poster.png';
// import stepVisualizeGif from '../../assets/step-visualize.gif';
// import stepVisualizePoster from '../../assets/step-visualize-poster.png';

interface Step {
  gif: string;
  poster: string;
  label: string;
  description: string;
}

const steps: Step[] = [
  {
    gif: stepHighlightGif,
    poster: stepHighlightPoster,
    label: 'Highlight',
    description: 'Select any text on the page',
  },
//   {
//     gif: stepAskKiboGif,
//     poster: stepAskKiboPoster,
//     label: 'Ask Kibo',
//     description: 'Kibo picks up the context instantly',
//   },
//   {
//     gif: stepVisualizeGif,
//     poster: stepVisualizePoster,
//     label: 'Visualize',
//     description: 'Kibo explains it back to you',
//   },
];

const activityFeed = [
  'Kibo just took a nap on your idle tab',
  'Kibo noticed you switched windows',
  'Kibo chirped — it missed you',
  'Kibo watched a build finish',
  'Kibo stretched after 40 minutes of focus',
];

const StepCard = ({ step, index }: { step: Step; index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 flex flex-col cursor-pointer"
    >
      <div className="relative aspect-video bg-black/10">
        <img
          src={hovered ? step.gif : step.poster}
          alt={step.label}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 w-6 h-6 rounded-full bg-white/80 text-xs font-semibold flex items-center justify-center">
          {index + 1}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-1">{step.label}</h3>
        <p className="text-sm opacity-70">{step.description}</p>
      </div>
    </motion.div>
  );
};

const LiveSection = () => {
  return (
    <section className="relative py-24 px-6">
      <h2 className="section-title text-center mb-4">See Kibo in action</h2>
      <p className="text-center text-sm opacity-70 mb-12">
        Three steps. Zero friction.
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {steps.map((step, i) => (
          <StepCard key={step.label} step={step} index={i} />
        ))}
      </div>

      <div className="max-w-2xl mx-auto rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium opacity-70">Live activity</span>
        </div>
        <div className="text-sm">{activityFeed[0]}</div>
      </div>
    </section>
  );
};

export default LiveSection;