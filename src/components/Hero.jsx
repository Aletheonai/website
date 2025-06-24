// src/components/Hero.jsx
import React, { useRef, useState, useLayoutEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring
} from 'framer-motion';
import '../styles.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const mainRef = useRef(null);
  const [delta, setDelta] = useState(0);
  const [sectionHeight, setSectionHeight] = useState('100vh');

  // Calculate how far to slide ΛI into the center (once)
  useLayoutEffect(() => {
    const r = mainRef.current?.getBoundingClientRect();
    if (r) {
      // Use viewport center for more accurate centering
      const viewportCenter = window.innerWidth / 2;
      const elementCenter = r.left + r.width / 2;
      // Add a small adjustment to fine-tune the centering
      const adjustment = -20; // Negative value moves it left, positive moves it right
      setDelta(viewportCenter - elementCenter + adjustment);
    }

    // Calculate section height to accommodate the animation
    // We want the animation to complete before the section ends
    const extraHeight = window.innerHeight * 0.8; // 80% extra height for smooth animation
    setSectionHeight(`calc(100vh + ${extraHeight}px)`);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Raw transforms - adjusted timing to work with expanded section
  // Animation completes by 60% of the section scroll
  const aiXRaw       = useTransform(scrollYProgress, [0.05, 0.25], [0, delta]);
  const zoomRaw      = useTransform(scrollYProgress, [0,    0.20], [1, 1.1]);
  const foldRaw      = useTransform(scrollYProgress, [0.20, 0.30], [0, -90]);
  const fadeOutRaw   = useTransform(scrollYProgress, [0.20, 0.30], [1, 0]);
  const subORaw      = useTransform(scrollYProgress, [0.30, 0.45], [0, 1]);
  const lOpacityRaw  = useTransform(scrollYProgress, [0,    0.30], [1, 0]);
  const iOpacityRaw  = useTransform(scrollYProgress, [0,    0.30], [0, 1]);
  
  // Fade out the entire hero content when animation is complete
  const heroFadeOutRaw = useTransform(scrollYProgress, [0.45, 0.6], [1, 0]);

  // Smoothed springs
  const springConfig = { stiffness: 100, damping: 15 };

  const aiX     = useSpring(aiXRaw, springConfig);
  const zoom    = useSpring(zoomRaw, springConfig);
  const fold    = useSpring(foldRaw, springConfig);
  const fadeOut = useSpring(fadeOutRaw, springConfig);
  const subO    = useSpring(subORaw, springConfig);
  const lOpacity = useSpring(lOpacityRaw, springConfig);
  const iOpacity = useSpring(iOpacityRaw, springConfig);
  const heroFadeOut = useSpring(heroFadeOutRaw, springConfig);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero"
      style={{ 
        overflow: 'hidden',
        height: sectionHeight,
        position: 'relative'
      }}
    >
      <div 
        className="hero-inner"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '100%',
          zIndex: 10
        }}
      >
        <motion.div
          style={{
            opacity: heroFadeOut,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <motion.h1 className="hero-title" style={{ scale: zoom }}>
            <motion.span
              ref={mainRef}
              className="title-main"
              style={{
                x: aiX,
                z: 0,
                display: 'inline-flex',
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitTransformStyle: 'preserve-3d',
                position: 'relative',
              }}
            >
              <span className="char char-violet">Λ</span>

              <span className="char-swap">
                <motion.span className="char char-gray" style={{ opacity: lOpacity }}>
                  L
                </motion.span>
                <motion.span className="char char-violet" style={{ opacity: iOpacity }}>
                  I
                </motion.span>
              </span>
            </motion.span>

            {['E', 'T', 'H', 'E', 'Θ', 'N'].map((c, i) => (
              <motion.span
                key={i}
                className={`char ${
                  ['E', 'T', 'H', 'E'].includes(c) ? 'char-gray' : 'char-green'
                }`}
                style={{
                  rotateY: fold,
                  opacity: fadeOut,
                  transformOrigin: 'left center',
                  willChange: 'transform, opacity',
                  z: 0,
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {c}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div className="hero-subhead" style={{ opacity: subO }}>
            <h2>to transform your enterprise.</h2>
            <a href="#contact" className="cta-button">
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
