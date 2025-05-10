import React, { useRef } from 'react';
import { useScroll, useSpring, useTransform, motion } from 'framer-motion';

function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const yMotion = useSpring(scrollY, { stiffness: 40, damping: 20 });
  const bgPosition = useTransform(yMotion, (y) => `0 ${y * 0.15}px`);

  return (
    <section id="hero" className="hero" ref={ref}>
      <motion.div
        className="hero-bg"
        style={{ backgroundPosition: bgPosition }}
      />
      <div className="hero-content">
        <h1>Empower Your Enterprise with AI</h1>
        <p>We deliver custom AI solutions to drive innovation and efficiency.</p>
        <a href="#contact" className="cta-button">Get in Touch</a>
      </div>
    </section>
  );
}

export default Hero;
