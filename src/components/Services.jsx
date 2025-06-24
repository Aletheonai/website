// src/components/Services.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import '../styles.css';

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

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: '-45% 0px -45% 0px',
    once: false, // Allow multiple triggers
  });

  return (
    <motion.div
      className={`service-card ${isInView ? 'expanded' : ''}`}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 2,
        rotateX: 1,
        y: -8,
        backgroundColor: "rgba(248, 249, 252, 0.95)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        borderColor: "rgba(127, 86, 217, 0.4)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <h3>{service.title}</h3>
      <motion.p
        initial={{ opacity: 0, height: 0 }}
        animate={isInView ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.4 }}
        style={{ overflow: 'hidden' }}
      >
        {service.description}
      </motion.p>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="services-section">
      <motion.h2
        className="services-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20% 0px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Our Services
      </motion.h2>

      <div className="services-grid" style={{ paddingTop: '6rem' }}>
        {servicesList.map((service, index) => (
          <ServiceCard key={service.key} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
