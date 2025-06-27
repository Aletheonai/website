import React from 'react';
import '../styles.css';

export default function CaseStudies() {
  return (
    <section className="case-studies-section" id="case-studies">
      <h2 className="section-heading">Case Studies</h2>
      <div className="case-studies-list">
        <div className="case-study">
          <h3>Retail AI Transformation</h3>
          <p>We helped a major retailer automate inventory management, reducing stockouts by 40% and increasing sales by 15% within 6 months.</p>
        </div>
        <div className="case-study">
          <h3>Healthcare Predictive Analytics</h3>
          <p>Our predictive models enabled a healthcare provider to anticipate patient needs, improving care outcomes and reducing costs by 20%.</p>
        </div>
      </div>
    </section>
  );
} 