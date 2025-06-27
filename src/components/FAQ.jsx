import React from 'react';
import '../styles.css';

export default function FAQ() {
  return (
    <section className="faq-section" id="faq">
      <h2 className="section-heading">Frequently Asked Questions</h2>
      <div className="faq-list">
        <div className="faq-item">
          <h3>What industries do you serve?</h3>
          <p>We work with clients in retail, healthcare, finance, manufacturing, and more.</p>
        </div>
        <div className="faq-item">
          <h3>How do you ensure data privacy?</h3>
          <p>We follow industry best practices and comply with all relevant regulations to keep your data secure.</p>
        </div>
        <div className="faq-item">
          <h3>How long does an AI project take?</h3>
          <p>Project timelines vary, but most engagements last between 3 and 9 months depending on complexity.</p>
        </div>
      </div>
    </section>
  );
} 