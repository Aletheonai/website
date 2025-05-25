import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import '../styles.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const heroRef    = useRef(null);
  const mainRef    = useRef(null); // wraps just the ΛI block
  const [delta, setDelta] = useState(0);

  // 1) Center-offset measurement for the AI block
  useLayoutEffect(() => {
    const calc = () => {
      if (!heroRef.current || !mainRef.current) return;
      const h = heroRef.current.getBoundingClientRect();
      const m = mainRef.current.getBoundingClientRect();
      setDelta((h.left + h.width/2) - (m.left + m.width/2));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // 2) Scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const prog = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // 3) Zoom Aletheon 1→1.10 over 0–0.10
  const zoom    = useTransform(prog, [0, 0.10], [1, 1.10]);

  // 4) Fold & fade trailing letters 0.10–0.12
  const fold    = useTransform(prog, [0, 0.10, 0.12], [0, -90, -90]);
  const fadeOut = useTransform(prog, [0, 0.10, 0.12], [1, 1, 0]);

  // 5) Slide AI (ΛI) into center 0.12–0.20
  const aiX     = useTransform(prog, [0.12, 0.20], [0, delta]);

  // 6) Fade in subhead 0.12–0.20
  const subO    = useTransform(prog, [0.12, 0.20], [0, 1]);

  return (
   <section id="hero" ref={sectionRef} className="hero">
  <div ref={heroRef} className="hero-inner">

    <motion.h1 className="hero-title" style={{ scale: zoom }}>
      {/* ΛI block: slides independently */}
      <motion.span
        ref={mainRef}
        className="title-main"
        style={{ x: aiX, display: 'inline-flex' }}
      >
        <span className="char char-violet">Λ</span>
        <span className="char-swap">
          <motion.span
            className="char char-gray"
            style={{ opacity: useTransform(prog, [0,0.12], [1,0]) }}
          >
            L
          </motion.span>
          <motion.span
            className="char char-violet"
            style={{ opacity: useTransform(prog, [0,0.12], [0,1]) }}
          >
            I
          </motion.span>
        </span>
      </motion.span>

      {/* ETHE in ultra-light gray */}
      {['E','T','H','E'].map((c,i) => (
        <motion.span
          key={i}
          className="char char-gray"
          style={{
            rotateY: fold,
            opacity: fadeOut,
            transformOrigin: 'left center',
          }}
        >
          {c}
        </motion.span>
      ))}

      {/* ΘN in mint green */}
      {['Θ','N'].map((c,i) => (
        <motion.span
          key={i}
          className="char char-green"
          style={{
            rotateY: fold,
            opacity: fadeOut,
            transformOrigin: 'left center',
          }}
        >
          {c}
        </motion.span>
      ))}
    </motion.h1>

    <motion.div className="hero-subhead" style={{ opacity: subO }}>
      <h2 >to transform your enterprise.</h2>
      <a href="#contact" className="cta-button">Get in Touch</a>
    </motion.div>

  </div>
</section>
  );
}
