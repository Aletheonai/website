import React from 'react';
import { motion, useInView } from 'framer-motion';

export default function Pipeline({ steps }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  const containerVariants = {
    hidden: { opacity: 0, y: -40, scale: 0.9 },
    show:   { opacity: 1, y: 0, scale: 1, transition: { staggerChildren: 0.2, ease: 'easeOut', duration: 0.8 } }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const arrowVariants = {
    hidden: { opacity: 0, x: -20 },
    show:   { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      ref={ref}
      className="pipeline"
      aria-label="AI Transformation Pipeline"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      {steps.map((step, i) => {
        // highlight logic: useInView on each step for “current” class
        const stepRef = React.useRef(null);
        const isCurrent = useInView(stepRef, { margin: '-40% 0px -40% 0px' });

        return (
          <React.Fragment key={step.key}>
            <motion.div
              ref={stepRef}
              className={`pipeline-step${isCurrent ? ' current' : ''}`}
              variants={stepVariants}
            >
              <span className="step-circle" aria-hidden="true">{i + 1}</span>
              <span className="step-label">{step.label}</span>
            </motion.div>

            {i < steps.length - 1 && (
              <motion.div className="step-arrow" variants={arrowVariants} aria-hidden="true">
                <svg
                  width="40"
                  height="24"
                  viewBox="0 0 40 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M0 12H38M38 12L30 4M38 12L30 20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: inView ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: i * 0.2 + 0.1 }}
                  />
                </svg>
              </motion.div>
            )}
          </React.Fragment>
        );
      })}
    </motion.div>
  );
}
