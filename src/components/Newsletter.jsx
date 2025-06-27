import React from 'react';
import '../styles.css';

export default function Newsletter() {
  return (
    <section className="newsletter-section" id="newsletter">
      <h2 className="section-heading">Stay Updated</h2>
      <p>Subscribe to our newsletter for the latest AI insights and company news.</p>
      <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
        <input type="email" placeholder="Your email address" required className="newsletter-input" />
        <button type="submit" className="newsletter-button">Subscribe</button>
      </form>
    </section>
  );
} 