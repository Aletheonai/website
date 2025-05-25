import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Pipeline from './Pipeline';
import '../styles.css';

const pipelineSteps = [
  { key: 'training',    label: 'Training'    },
  { key: 'assessment',  label: 'Assessment'  },
  { key: 'integration', label: 'Integration' },
];

const servicesList = [
  {
    key:         'training',
    title:       'AI Training',
    description: 'Tailored AI sessions designed for enhancing your business needs.',
  },
  {
    key:         'assessment',
    title:       'AI Consulting',
    description: 'Expert guidance to create an AI adoption roadmap for your enterprise.',
  },
  {
    key:         'integration',
    title:       'AI Solutions Development & Deployment',
    description: 'End-to-end development to maximize your business efficiency.',
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  // scroll-driven fade-out under the pipeline
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const gridOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);

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

      <motion.div
        className="services-grid"
        style={{ opacity: gridOpacity }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20% 0px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } }
        }}
      >
        {servicesList.map((svc) => (
          <motion.div
            className="service-card"
            key={svc.key}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
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
