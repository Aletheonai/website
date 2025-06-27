import React, { useState, useEffect, useRef } from 'react';
import '../styles.css';

const mainLinks = [
  { label: 'Home', id: 'hero' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

const moreLinks = [
  { label: 'About', id: 'about' },
  { label: 'Tech & Methodology', id: 'tech-methodology' },
  { label: 'Case Studies', id: 'case-studies' },
  { label: 'Stats', id: 'stats' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Awards', id: 'awards' },
  { label: 'Blog', id: 'blog' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Newsletter', id: 'newsletter' },
];

const allLinks = [...mainLinks, ...moreLinks];

export default function Navbar() {
  const headerRef = useRef(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shouldCollapse, setShouldCollapse] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          setShowNavbar(y < 10 || y < lastScrollY);
          setLastScrollY(y);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setShowLogo(!entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '-20% 0px 0px 0px' }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const checkCollapse = () => {
      setShouldCollapse(window.innerWidth < 640);
    };
    checkCollapse();
    window.addEventListener('resize', checkCollapse, { passive: true });
    return () => window.removeEventListener('resize', checkCollapse);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
    setMoreOpen(false);
  };

  // Close More dropdown on outside click
  useEffect(() => {
    if (!moreOpen) return;
    const handleClick = (e) => {
      if (!e.target.closest('.more-dropdown')) setMoreOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [moreOpen]);

  return (
    <header
      ref={headerRef}
      className={`navbar ${showNavbar ? 'active' : 'hidden'}${!showLogo ? ' navbar-collapsed' : ''}${shouldCollapse ? ' navbar-mobile' : ''}`}
    >
      <div className="navbar-content">
        <div className="logo-wrapper">
          <span className={`logo-full ${showLogo ? 'visible' : 'hidden'}`}>ΛLETHEΘN</span>
          <span className={`logo-mini ${!showLogo ? 'visible' : 'hidden'}`}>ΛI</span>
        </div>
        <div className="link-area justify-right">
          {!shouldCollapse && (
            <ul className="nav-links desktop">
              {mainLinks.map(link => (
                <li key={link.id}>
                  <a href={`#${link.id}`} onClick={e => { e.preventDefault(); scrollToSection(link.id); }}>{link.label}</a>
                </li>
              ))}
              <li className="more-dropdown" style={{ position: 'relative' }}>
                <button
                  className="nav-link-button"
                  onClick={() => setMoreOpen(open => !open)}
                  aria-haspopup="true"
                  aria-expanded={moreOpen}
                >
                  More ▾
                </button>
                {moreOpen && (
                  <ul className="more-menu" style={{ position: 'absolute', top: '100%', right: 0, background: '#fff', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', minWidth: 180, zIndex: 1001, padding: '0.5rem 0', margin: 0 }}>
                    {moreLinks.map(link => (
                      <li key={link.id} style={{ listStyle: 'none' }}>
                        <a
                          href={`#${link.id}`}
                          onClick={e => { e.preventDefault(); scrollToSection(link.id); }}
                          style={{ display: 'block', padding: '0.5rem 1.25rem', color: '#7F56D9', textDecoration: 'none', fontWeight: 500 }}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
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
                  {allLinks.map(link => (
                    <li key={link.id}>
                      <a href={`#${link.id}`} onClick={e => { e.preventDefault(); scrollToSection(link.id); }}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
