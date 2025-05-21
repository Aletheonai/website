// src/components/Navbar.jsx
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const headerRef   = useRef(null);
  const navRef      = useRef(null);
  const [showNavbar, setShowNavbar]     = useState(true);
  const [lastScrollY, setLastScrollY]   = useState(0);
  const [showLogo, setShowLogo]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [centerOffset, setCenterOffset] = useState(0);

  // 1) Hide/show navbar on scroll-down/up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 10) {
        setShowNavbar(true);
      } else if (currentY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // 2) IntersectionObserver to toggle the logo (and recenter links)
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowLogo(entry.intersectionRatio < 0.5),
      { threshold: [0, 0.5] }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  // 3) Measure how far to shift the nav-links so they center under the header
  useLayoutEffect(() => {
    const calc = () => {
      if (!headerRef.current || !navRef.current) return;
      const hdr = headerRef.current.getBoundingClientRect();
      const nav = navRef.current.getBoundingClientRect();
      const hdrCenter = hdr.left + hdr.width/2;
      const navCenter = nav.left + nav.width/2;
      setCenterOffset(hdrCenter - navCenter);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`navbar ${showNavbar ? 'active' : 'hidden'}`}
    >
      {/* Logo (fades in/out) */}
      <div
        className="logo"
        style={{
          opacity: showLogo ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        ΛLETHEΘN
      </div>

      {/* Hamburger (also tied to showLogo) */}
      <button
        className="menu-toggle"
        onClick={() => setMobileOpen(o => !o)}
        style={{
          opacity: showLogo ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Nav links slide between x=0 (right-aligned) and x=centerOffset (centered) */}
      <motion.ul
        ref={navRef}
        className={`nav-links ${mobileOpen ? 'open' : ''}`}
        animate={{ x: showLogo ? 0 : centerOffset }}
        transition={{ type: 'tween', duration: 0.4 }}
      >
        <li><a href="#hero"     onClick={()=>setMobileOpen(false)}>Home</a></li>
        <li><a href="#services" onClick={()=>setMobileOpen(false)}>Services</a></li>
        <li><a href="#contact"  onClick={()=>setMobileOpen(false)}>Contact</a></li>
      </motion.ul>
    </header>
  );
}
