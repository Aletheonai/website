import React, { useState, useEffect } from 'react';

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShowNavbar(false);
      } else {
        // if scroll up show the navbar
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <header className={`navbar ${showNavbar ? 'active' : 'hidden'}`}>
      <div className="logo">ΛLETHEΘN</div>
      <nav>
        <ul className="nav-links">
          <li><a href="#hero"><b>Home</b></a></li>
          <li><a href="#services"><b>Services</b></a></li>
          <li><a href="#contact"><b>Contact</b></a></li>
        </ul>
      </nav>
      <button 
        className="menu-toggle" 
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>
    </header>
  );
}

export default Navbar;
