import React, { useState } from 'react';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className={`navbar ${mobileOpen ? 'open' : ''}`}>
      <div className="logo">ALETHEON</div>
      <nav>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
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
