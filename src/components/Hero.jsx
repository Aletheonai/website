// src/components/Hero.jsx
import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import '../styles.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const heroRef    = useRef(null);  // wrapper we’ll center within
  const titleRef   = useRef(null);  // the <h1>
  const mainRef    = useRef(null);  // the “AI” block
  const [delta, setDelta] = useState(0);

  // Measure on mount & resize: how far to shift the <h1> so mainRef is container-centered
  useLayoutEffect(() => {
    const calc = () => {
      if (!heroRef.current || !mainRef.current) return;
      const heroRect = heroRef.current.getBoundingClientRect();
      const mainRect = mainRef.current.getBoundingClientRect();

      const heroCenterX = heroRect.left + heroRect.width  / 2;
      const mainCenterX = mainRect.left + mainRect.width  / 2;
      setDelta(heroCenterX - mainCenterX);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start','end start'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // letter animations
  const lOp   = useTransform(progress, [0,0.12], [1,0]);
  const iOp   = useTransform(progress, [0,0.12], [0,1]);
  const fold  = useTransform(progress, [0,0.10,0.12], [0,-90,-90]);
  const restO = useTransform(progress, [0,0.10,0.12], [1,1,0]);
  const subO  = useTransform(progress, [0.12,0.2], [0,1]);

  // slide <h1> by delta px over a comfortable scroll range
  const titleX = useTransform(progress, [0.10,0.2], [0, delta]);

  return (
    <section id = "hero" ref={sectionRef} className="hero">
      <div ref={heroRef} className="hero-inner">
        <motion.h1
          ref={titleRef}
          className="hero-title"
          style={{ x: titleX }}
        >
          {/* AI block */}
          <span ref={mainRef} className="title-main">
            <span className="char char-blue">Λ</span>
            <span className="char-swap">
              <motion.span className="char char-blue" style={{ opacity: lOp }}>L</motion.span>
              <motion.span className="char char-blue" style={{ opacity: iOp }}>I</motion.span>
            </span>
          </span>

          {/* the rest fold & fade */}
          {['E','T','H','E','Θ','N'].map((c,i) => (
            <motion.span
              key={i}
              className="char"
              style={{
                rotateY: fold,
                opacity: restO,
                transformOrigin: 'left center',
              }}
            >{c}</motion.span>
          ))}
        </motion.h1>

        <motion.div className="hero-subhead" style={{ opacity: subO }}>
          <h2>to transform your enterprise.</h2>
          <a href="#contact" className="cta-button">Get in Touch</a>
        </motion.div>
      </div>
    </section>
  );
}
