import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import '../styles.css';

const statsData = [
  { label: 'time saved across workflows', number: 50 },
  { label: 'reduction in operational costs', number: 25 },
  { label: 'improvement in delivery quality', number: 15 },
];

const trustLogos = [
  { src: '/logos/logo1.png', alt: 'Client A' },
  { src: '/logos/logo2.png', alt: 'Client B' },
  { src: '/logos/logo3.png', alt: 'Client C' },
];

export default function Stats() {
  return (
    <section className="stats-section">
      {/* Section heading */}
      <motion.h2
        className="stats-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20% 0px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        AI-Powered Impact
      </motion.h2>

      {/* Stats grid */}
      <div className="stats-grid">
        {statsData.map((stat, idx) => (
          <StatItem
            key={stat.label}
            label={stat.label}
            targetNumber={stat.number}
            delay={idx * 0.2}
          />
        ))}
      </div>

      {/* "They trust us" heading */}
      <motion.h2
        className="stats-heading"
        style={{ marginTop: '3rem' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20% 0px' }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      >
        They trust us
      </motion.h2>

      {/* Logos */}
      <motion.div
        className="logo-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20% 0px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        {trustLogos.map((logo, i) => (
          <motion.div
            className="logo-item"
            key={i}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <img src={logo.src} alt={logo.alt} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
function StatItem({ label, targetNumber, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [pop, setPop] = useState(false);

  // Remove pop class after animation
  React.useEffect(() => {
    if (pop) {
      const timeout = setTimeout(() => setPop(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [pop]);

  return (
    <motion.div
      className="stat-item"
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20% 0px' }}
      transition={{ duration: 0.6, delay }}
    >
      <h3 className={`stat-number${pop ? ' pop' : ''}`}>
        <span className="stat-prefix">Up to</span>
        {inView && (
          <CountUp
            start={0}
            end={targetNumber}
            duration={1.2}
            delay={0.1}
            className="stat-value"
            onEnd={() => setPop(true)}
          />
        )}
        <span className="stat-suffix">%</span>
      </h3>
      <p className="stat-label">{label}</p>
    </motion.div>
  );
}

