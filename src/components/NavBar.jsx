import React, { useState, useEffect } from 'react';

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false); // You were missing this state

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show navbar when at top of page
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

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
