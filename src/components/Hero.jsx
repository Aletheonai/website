// src/components/Hero.jsx
import React, { useRef, useState, useLayoutEffect, useEffect, useCallback, useMemo } from 'react';
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
  const [animationTriggered, setAnimationTriggered] = useState(false);

  // Track window size changes
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Recalculate delta (used in multiple places)
  const recalculateDelta = useCallback((retryCount = 0) => {
    const aiRect = aiRef.current?.getBoundingClientRect();
    if (aiRect && aiRect.width > 0) { // Ensure element is properly rendered
      // Get the button element to align with
      const button = document.querySelector('.cta-button');
      let targetCenter = window.innerWidth / 2; // Default to viewport center
      
      if (button) {
        const buttonRect = button.getBoundingClientRect();
        targetCenter = buttonRect.left + buttonRect.width / 2;
        console.log('Button found:', {
          buttonLeft: buttonRect.left,
          buttonWidth: buttonRect.width,
          buttonCenter: targetCenter
        });
      } else {
        console.log('Button not found, using viewport center');
        // If button not found and we haven't retried too many times, retry
        if (retryCount < 3) {
          setTimeout(() => {
            recalculateDelta(retryCount + 1);
          }, 200);
          return;
        }
      }
      
      // Calculate the center of the current "AL" text
      const aiCenter = aiRect.left + aiRect.width / 2;
      
      // Estimate the final "AI" width (assuming "I" is about 60% the width of "L")
      const currentWidth = aiRect.width;
      const estimatedFinalWidth = currentWidth * 0.8; // "AI" will be about 80% of "AL" width
      const widthDifference = currentWidth - estimatedFinalWidth;
      
      // Calculate where the center of "AI" will be
      const finalAICenter = aiCenter - (widthDifference / 2);
      
      // Calculate the delta needed to move "AI" to button center
      const rawDelta = targetCenter - finalAICenter;
      
      // Debug logging to understand positioning
      console.log('Centering debug:', {
        userAgent: navigator.userAgent,
        windowWidth,
        viewportWidth: window.innerWidth,
        targetCenter,
        aiLeft: aiRect.left,
        aiWidth: aiRect.width,
        aiCenter,
        finalAICenter,
        widthDifference,
        rawDelta,
        expectedFinalPosition: finalAICenter + rawDelta,
        device: windowWidth <= 768 ? 'mobile' : 'desktop'
      });
      
      setDelta(rawDelta);
    } else if (retryCount < 5) {
      // If element isn't ready, retry after a short delay (max 5 retries)
      setTimeout(() => {
        recalculateDelta(retryCount + 1);
      }, 100);
    }
  }, [windowWidth]);

  // Initial layout calc and section height setup
  useLayoutEffect(() => {
    // Add a delay to ensure the button is rendered
    setTimeout(() => {
      recalculateDelta();
    }, 300);
    const extraHeight = window.innerHeight * 1.5;
    setSectionHeight(`calc(100vh + ${extraHeight}px)`);
  }, [windowWidth, recalculateDelta]);

  // Recalculate delta when returning from background (iOS Safari fix)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Only recalculate if we're at the top of the page and animation hasn't been triggered yet
        if (window.scrollY < 100 && !animationTriggered) {
          // Wait for the next frame to ensure DOM is ready
          requestAnimationFrame(() => {
            // Add a small delay to ensure viewport is stable
            setTimeout(() => {
              recalculateDelta();
            }, 50);
          });
        }
      }
    };

    const handleOrientationChange = () => {
      // Recalculate on orientation change for mobile devices
      setTimeout(() => {
        recalculateDelta();
      }, 100);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [recalculateDelta, animationTriggered]);

  // Debug effect to monitor AI text position during animation
  useEffect(() => {
    const checkPosition = () => {
      const aiRect = aiRef.current?.getBoundingClientRect();
      if (aiRect) {
        // Get the button element to align with
        const button = document.querySelector('.cta-button');
        let targetCenter = window.innerWidth / 2; // Default to viewport center
        
        if (button) {
          const buttonRect = button.getBoundingClientRect();
          targetCenter = buttonRect.left + buttonRect.width / 2;
        }
        
        // Calculate the center of the current "AL" text
        const aiCenter = aiRect.left + aiRect.width / 2;
        
        // Estimate the final "AI" width
        const currentWidth = aiRect.width;
        const estimatedFinalWidth = currentWidth * 0.8;
        const widthDifference = currentWidth - estimatedFinalWidth;
        
        // Calculate where the center of "AI" will be
        const finalAICenter = aiCenter - (widthDifference / 2);
        const distanceFromCenter = Math.abs(targetCenter - finalAICenter);
        
        console.log('Position check:', {
          aiCenter,
          finalAICenter,
          targetCenter,
          widthDifference,
          distanceFromCenter,
          isCentered: distanceFromCenter < 5
        });
      }
    };
    
    // Check position after animation completes
    const timer = setTimeout(checkPosition, 2000);
    return () => clearTimeout(timer);
  }, [delta]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Track when animation is triggered
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest > 0.05 && !animationTriggered) {
        setAnimationTriggered(true);
      } else if (latest < 0.02 && animationTriggered) {
        // Reset animation state when scrolled back to top
        setAnimationTriggered(false);
      }
    });
    
    return unsubscribe;
  }, [scrollYProgress, animationTriggered]);

  const aiXRaw       = useTransform(scrollYProgress, [0.05, 0.15], [0, delta]);
  const zoomRaw      = useTransform(scrollYProgress, [0,    0.10], [1, 1.1]);
  const foldRaw      = useTransform(scrollYProgress, [0.10, 0.12], [0, -90]);
  const fadeOutRaw   = useTransform(scrollYProgress, [0.10, 0.12], [1, 0]);
  const subORaw      = useTransform(scrollYProgress, [0.12, 0.20], [0, 1]);
  const lOpacityRaw  = useTransform(scrollYProgress, [0,    0.12], [1, 0]);
  const iOpacityRaw  = useTransform(scrollYProgress, [0,    0.12], [0, 1]);
  const heroFadeOutRaw = useTransform(scrollYProgress, [0.20, 0.60], [1, 0]);

  const springConfig = { stiffness: 100, damping: 15 };
  const aiX          = useSpring(aiXRaw, springConfig);
  const zoom         = useSpring(zoomRaw, springConfig);
  const fold         = useSpring(foldRaw, springConfig);
  const fadeOut      = useSpring(fadeOutRaw, springConfig);
  const subO         = useSpring(subORaw, springConfig);
  const lOpacity     = useSpring(lOpacityRaw, springConfig);
  const iOpacity     = useSpring(iOpacityRaw, springConfig);
  const heroFadeOut  = useSpring(heroFadeOutRaw, springConfig);

  // Background pattern animations
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const backgroundOpacity = useTransform(scrollYProgress, [0.10, 0.15], [0.8, 0]);

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
      {/* AI Particle System Background */}
      <motion.div
        className="hero-background-pattern"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(circle, rgba(108, 48, 130, 0.25) 0px, transparent 2px)
          `,
          backgroundSize: '120px 120px',
          backgroundPosition: '0 0',
          y: backgroundY,
          opacity: backgroundOpacity,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

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
          <motion.h1 className="hero-title" style={{ scale: zoom, fontFamily: 'Epilogue-Edited, sans-serif' }}>
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
                fontFamily: 'Epilogue-Edited, sans-serif',
              }}
            >
              <span className="char char-violet" style={{ fontFamily: 'Epilogue-Edited, sans-serif' }}>A</span>

              <span className="char-swap">
                <motion.span className="char char-gray" style={{ opacity: lOpacity, fontFamily: 'Epilogue-Edited, sans-serif' }}>
                  L
                </motion.span>
                <motion.span className="char char-violet" style={{ opacity: iOpacity, fontFamily: 'Epilogue-Edited, sans-serif' }}>
                  I
                </motion.span>
              </span>
            </motion.span>

            {['E', 'T', 'H', 'E', 'O', 'N'].map((c, i) => (
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
                  fontFamily: 'Epilogue-Edited, sans-serif',
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
              width: '100%'
            }}
          >
            <h2>the right way.</h2>
            <a href="#contact" className="cta-button">
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
