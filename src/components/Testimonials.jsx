import React from 'react';
import '../styles.css';

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <h2 className="section-heading">What Our Clients Say</h2>
      <div className="testimonials-list">
        <div className="testimonial">
          <p>“Aletheon's team delivered results beyond our expectations. Their AI expertise transformed our business.”</p>
          <span className="testimonial-author">— Sarah L., Retail COO</span>
        </div>
        <div className="testimonial">
          <p>“Professional, innovative, and always focused on value. Highly recommended for any AI project.”</p>
          <span className="testimonial-author">— Michael B., Healthcare CTO</span>
        </div>
      </div>
    </section>
  );
} 