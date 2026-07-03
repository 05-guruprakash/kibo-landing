import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Counter from '../react-bits/Counter';

export const GrowsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const growthStages = [
    { day: 1, label: 'First Meeting', description: 'Shy, curious, still learning you' },
    { day: 30, label: 'Familiar Friend', description: 'Knows your rhythms, sleeps when you sleep' },
    { day: 100, label: 'Close Companion', description: 'Remembers your stories, celebrates your wins' },
    { day: 365, label: 'Kindred Spirit', description: 'A shared history, a quiet understanding' }
  ];

  return (
    <section ref={ref} className="section-wrapper" data-section="grows">
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-5xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-title text-[#5a4a3a] mb-6 text-center"
        >
          It Grows With You
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="section-description text-[#6a5a4a] text-center mb-16"
        >
          Like any true friendship, Kibo deepens over time. The longer you spend together, the more it understands.
        </motion.p>

        {/* Growth timeline */}
        <div className="w-full relative">
          {/* Timeline line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute left-0 right-0 top-[60px] h-0.5 bg-gradient-to-r from-transparent via-[#c4a484] to-transparent origin-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {growthStages.map((stage, i) => (
              <motion.div
                key={stage.day}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                className="text-center relative"
              >
                {/* Dot on timeline */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 200 }}
                  className="absolute left-1/2 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-[#fcd5ce] border-2 border-[#c4a484] -mt-2"
                  style={{ top: '52px' }}
                />

                {/* Day counter */}
                <div className="mb-6 pt-10">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {i === 0 && (
                      <Counter
                        value={1}
                        places={[1]}
                        fontSize={32}
                        fontWeight={600}
                        textColor="#7a6a5a"
                        containerStyle={{ display: 'inline-block' }}
                        counterStyle={{ background: 'transparent' }}
                      />
                    )}
                    {i === 1 && (
                      <Counter
                        value={30}
                        places={[10, 1]}
                        fontSize={32}
                        fontWeight={600}
                        textColor="#7a6a5a"
                        containerStyle={{ display: 'inline-block' }}
                        counterStyle={{ background: 'transparent' }}
                      />
                    )}
                    {i === 2 && (
                      <Counter
                        value={100}
                        places={[100, 10, 1]}
                        fontSize={32}
                        fontWeight={600}
                        textColor="#7a6a5a"
                        containerStyle={{ display: 'inline-block' }}
                        counterStyle={{ background: 'transparent' }}
                      />
                    )}
                    {i === 3 && (
                      <Counter
                        value={365}
                        places={[100, 10, 1]}
                        fontSize={32}
                        fontWeight={600}
                        textColor="#7a6a5a"
                        containerStyle={{ display: 'inline-block' }}
                        counterStyle={{ background: 'transparent' }}
                      />
                    )}
                  </motion.div>
                  <p className="text-xs text-[#a09080] mt-1">days</p>
                </div>

                {/* Label */}
                <h3 className="text-lg font-medium text-[#5a4a3a] mb-2">{stage.label}</h3>
                <p className="text-sm text-[#8a7a6a]">{stage.description}</p>

                {/* Kibo representation - gets more detailed */}
                <motion.div
                  className="mt-4 flex justify-center"
                  animate={{
                    y: [0, -4, 0]
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <svg
                    width={24 + i * 6}
                    height={24 + i * 6}
                    viewBox="0 0 60 60"
                    fill="none"
                    className="opacity-80"
                  >
                    {/* Body */}
                    <ellipse cx="30" cy="42" rx={12 + i} ry={10 - i * 0.5} fill="#f5e6d3" />
                    {/* Head */}
                    <ellipse cx="30" cy="24" rx={10 + i} ry={8 + i * 0.5} fill="#f5e6d3" />
                    {/* Ears */}
                    <path d={`M${20 - i} 18 Q${16 - i} 10 ${24 - i} 12`} fill="#f5e6d3" />
                    <path d={`M${40 + i} 18 Q${44 + i} 10 ${36 + i} 12`} fill="#f5e6d3" />
                    {/* Eyes */}
                    <circle cx="26" cy="22" r={2 + i * 0.3} fill="#3a3a3a" />
                    <circle cx="34" cy="22" r={2 + i * 0.3} fill="#3a3a3a" />
                    {/* Nose */}
                    <ellipse cx="30" cy="26" rx="2" ry="1.5" fill="#fcd5ce" />
                    {i >= 1 && (
                      <>
                        {/* Tail */}
                        <path d="M48 44 Q56 38 54 48" fill="#f5e6d3" stroke="#e8d5c4" strokeWidth="0.5" />
                      </>
                    )}
                    {i >= 2 && (
                      <>
                        {/* Cheeks */}
                        <ellipse cx="20" cy="26" rx={2 - i * 0.2} ry="1.5" fill="#fcd5ce" opacity="0.5" />
                        <ellipse cx="40" cy="26" rx={2 - i * 0.2} ry="1.5" fill="#fcd5ce" opacity="0.5" />
                      </>
                    )}
                    {i >= 3 && (
                      <>
                        {/* Extra detail - whiskers */}
                        <line x1="14" y1="24" x2="20" y2="25" stroke="#c4a484" strokeWidth="0.5" opacity="0.4" />
                        <line x1="14" y1="27" x2="20" y2="27" stroke="#c4a484" strokeWidth="0.5" opacity="0.4" />
                        <line x1="40" y1="25" x2="46" y2="24" stroke="#c4a484" strokeWidth="0.5" opacity="0.4" />
                        <line x1="40" y1="27" x2="46" y2="27" stroke="#c4a484" strokeWidth="0.5" opacity="0.4" />
                        {/* Eye shine */}
                        <circle cx="27" cy="21" r="0.8" fill="white" />
                        <circle cx="35" cy="21" r="0.8" fill="white" />
                      </>
                    )}
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative vines */}
      <motion.div
        className="absolute left-0 top-0 w-32 h-full pointer-events-none opacity-20"
        animate={{
          y: [0, -10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 100 600" fill="none" className="w-full h-full">
          <path d="M20 0 Q30 100 10 200 T50 400 T20 600" stroke="#6a8a5a" strokeWidth="2" fill="none" />
          {[
            50, 150, 250, 350, 450, 550
          ].map((y, i) => (
            <circle key={i} cx={15 + (i % 2) * 15} cy={y} r={4 + (i % 3)} fill="#6a8a5a" />
          ))}
        </svg>
      </motion.div>

      <motion.div
        className="absolute right-0 top-0 w-32 h-full pointer-events-none opacity-20"
        animate={{
          y: [0, 10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      >
        <svg viewBox="0 0 100 600" fill="none" className="w-full h-full">
          <path d="M80 0 Q70 100 90 200 T50 400 T80 600" stroke="#6a8a5a" strokeWidth="2" fill="none" />
          {[
            100, 200, 300, 400, 500
          ].map((y, i) => (
            <circle key={i} cx={85 - (i % 2) * 15} cy={y} r={3 + (i % 3)} fill="#6a8a5a" />
          ))}
        </svg>
      </motion.div>
    </section>
  );
};

export default GrowsSection;
