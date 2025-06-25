// src/components/Hero.jsx
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring
} from 'framer-motion';
import '../styles.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const aiRef = useRef(null);
  const centerRef = useRef(null);
  const [delta, setDelta] = useState(0);
  const [sectionHeight, setSectionHeight] = useState('100vh');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window size changes
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate how far to slide ΛI into the center of the combined container (once)
  useLayoutEffect(() => {
    const aiRect = aiRef.current?.getBoundingClientRect();
    const centerRect = centerRef.current?.getBoundingClientRect();
    if (aiRect && centerRect) {
      const aiCenter = aiRect.left + aiRect.width / 2;
      const centerContainer = centerRect.left + centerRect.width / 2;
      setDelta(centerContainer - aiCenter);
    }

    // Calculate section height to accommodate the animation
    const extraHeight = window.innerHeight * 1.5; // Increased from 0.8 to 1.5 for longer hold
    setSectionHeight(`calc(100vh + ${extraHeight}px)`);
  }, [windowWidth]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Raw transforms
  const aiXRaw       = useTransform(scrollYProgress, [0.05, 0.15], [0, delta]);
  const zoomRaw      = useTransform(scrollYProgress, [0,    0.10], [1, 1.1]);
  const foldRaw      = useTransform(scrollYProgress, [0.10, 0.12], [0, -90]);
  const fadeOutRaw   = useTransform(scrollYProgress, [0.10, 0.12], [1, 0]);
  const subORaw      = useTransform(scrollYProgress, [0.12, 0.20], [0, 1]);
  const lOpacityRaw  = useTransform(scrollYProgress, [0,    0.12], [1, 0]);
  const iOpacityRaw  = useTransform(scrollYProgress, [0,    0.12], [0, 1]);
  
  // Fade out the entire hero content when animation is complete - extended duration
  const heroFadeOutRaw = useTransform(scrollYProgress, [0.20, 0.60], [1, 0]);

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

  // Calculate button offset based on window size and AI position
  const buttonOffset = useTransform(aiX, (x) => {
    // On mobile (smaller screens), the title stacks vertically, so we need different centering
    if (windowWidth <= 768) {
      return x * 0.5; // Reduce the offset for mobile
    }
    // For desktop, move the button by half the AI movement to center them together
    return x * 0.5; // This will center the AI text with respect to the button
  });

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
          ref={centerRef}
          style={{
            opacity: heroFadeOut,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <motion.h1 className="hero-title" style={{ scale: zoom }}>
            <motion.span
              ref={aiRef}
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

          <motion.div 
            className="hero-subhead" 
            style={{ 
              opacity: subO,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              transform: `translateX(${buttonOffset}px)`
            }}
          >
            <h2>Helping companies understand, integrate, and use AI the right way.
            </h2>
            <a href="#contact" className="cta-button">
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
