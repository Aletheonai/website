import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const statsData = [
  { label: 'Projects Delivered', number: 50 },
  { label: 'AI Models Deployed', number: 25 },
  { label: 'Clients Served', number: 15 },
];

function Stats() {
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // Animate each counter from 0 to its target number
        statsData.forEach((stat, idx) => {
          const duration = 1000;
          let startTime = null;
          const step = timestamp => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * stat.number);
            setCounts(prev => {
              const newCounts = [...prev];
              newCounts[idx] = value;
              return newCounts;
            });
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
        });
        observer.unobserve(entries[0].target);
      }
    }, { threshold: 0.3 });
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={statsRef}>
      <div className="stats-grid">
        {statsData.map((stat, idx) => (
          <motion.div
            className="stat-item"
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="stat-number">
              {counts[idx]}
              <span>+</span>
            </h3>
            <p className="stat-label">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
