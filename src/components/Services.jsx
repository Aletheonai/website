import React from 'react';
import { motion } from 'framer-motion';

const servicesList = [
  {
    title: 'AI Training',
    description: 'Tailored AI sessions designed for enhancing your business needs.',
  },
  {
    title: 'AI Consulting',
    description: 'Expert guidance to create an AI adoption roadmap for your enterprise.',
  },
  {
    title: 'AI Solutions Development and Deployment',
    description: 'End-to-end development to maximize your business efficiency.',
  },
  
];

function Services() {
  return (
    <section id="services" className="services-section">
      <h2>Our Services</h2>
      <div className="services-grid">
        {servicesList.map((service, index) => (
          <motion.div
            className="service-card"
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Services;
