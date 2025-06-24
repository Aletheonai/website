import React, { useState, useEffect, useRef } from 'react';
import '../styles.css';

export default function Navbar() {
  const headerRef = useRef(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shouldCollapse, setShouldCollapse] = useState(false);
  const [navbarReady, setNavbarReady] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowNavbar(y < 10 || y < lastScrollY);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (showNavbar) {
      setNavbarReady(true);
    } else {
      const timeout = setTimeout(() => setNavbarReady(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [showNavbar]);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowLogo(entry.intersectionRatio < 0.5),
      { threshold: [0.5] }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const checkCollapse = () => {
      setShouldCollapse(window.innerWidth < 640);
    };
    checkCollapse();
    window.addEventListener('resize', checkCollapse);
    return () => window.removeEventListener('resize', checkCollapse);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`navbar ${showNavbar ? 'active' : 'hidden'}${!showLogo ? ' navbar-collapsed' : ''}${navbarReady ? ' navbar-ready' : ''}`}
    >
      <div className="navbar-content">
        <div className="logo-wrapper">
          <span className={`logo-full ${showLogo ? 'visible' : 'hidden'}`}>ΛLETHEΘN</span>
          <span className={`logo-mini ${!showLogo ? 'visible' : 'hidden'}`}>ΛI</span>
        </div>

        <div className="link-area justify-right">
          {!shouldCollapse && (
            <ul className="nav-links desktop">
              <li><a href="#hero">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          )}

          {shouldCollapse && (
            <div className="menu-wrapper">
              <button
                className="menu-toggle"
                onClick={() => setMobileOpen(prev => !prev)}
                aria-label="Toggle menu"
              >
                ☰
              </button>
              {mobileOpen && (
                <ul className="nav-links mobile-dropdown">
                  <li><a href="#hero" onClick={() => setMobileOpen(false)}>Home</a></li>
                  <li><a href="#services" onClick={() => setMobileOpen(false)}>Services</a></li>
                  <li><a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a></li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
