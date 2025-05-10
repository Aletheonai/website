import React, { useState, useEffect } from 'react';

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false); // You were missing this state

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;

      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const windowHeight = window.innerHeight;
      const atBottom =
        Math.abs(currentScrollY + windowHeight - scrollHeight) < 50;

      if (currentScrollY < 10) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      }
      else if (atBottom) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
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
