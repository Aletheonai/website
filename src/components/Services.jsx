// src/components/Services.jsx
import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Pipeline from './Pipeline';
import '../styles.css';

const pipelineSteps = [
  { key: 'training', label: 'Training' },
  { key: 'assessment', label: 'Assessment' },
  { key: 'integration', label: 'Integration' },
];

const servicesList = [
  {
    key: 'training',
    title: 'AI Training',
    description: 'Tailored AI sessions designed for enhancing your business needs.',
  },
  {
    key: 'assessment',
    title: 'AI Consulting',
    description: 'Expert guidance to create an AI adoption roadmap for your enterprise.',
  },
  {
    key: 'integration',
    title: 'AI Solutions Development & Deployment',
    description: 'End-to-end development to maximize your business efficiency.',
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const sentinelRef = useRef(null); // 👈 sentinel placed before the grid

  const controls = useAnimation();
  const shouldShowGrid = useInView(sentinelRef, {
    margin: '-20% 0px -20% 0px', // triggers earlier
    once: true,
  });

  useEffect(() => {
    if (shouldShowGrid) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [shouldShowGrid, controls]);

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      <motion.h2
        className="services-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20% 0px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Our Services
      </motion.h2>

      <Pipeline steps={pipelineSteps} />

      {/* 👇 Sentinel triggers grid entrance early */}
      <div ref={sentinelRef} style={{ height: '1px' }} />

      <motion.div
        className="services-grid"
        animate={controls}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 1, paddingTop: '6rem' }}
      >
        {servicesList.map((svc) => (
          <motion.div
            className="service-card"
            key={svc.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.03 }}
          >
            <h3>{svc.title}</h3>
            <p>{svc.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
