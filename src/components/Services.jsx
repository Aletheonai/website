// src/components/Services.jsx
import React from 'react';
import '../styles.css';

export default function Services() {
  return (
    <section className="services-section" id="services">
      <h2 className="section-heading">Our Services</h2>
      <div className="services-grid">
        <div className="service-card">
          <h3>AI Strategy Consulting</h3>
          <p>We help you define a clear AI vision, identify high-impact opportunities, and build a roadmap for success.</p>
          <ul className="service-details">
            <li>AI Readiness Assessment</li>
            <li>Business Case Development</li>
            <li>Change Management</li>
          </ul>
        </div>
        <div className="service-card">
          <h3>Custom AI Solutions</h3>
          <p>From data engineering to model deployment, we deliver end-to-end AI solutions tailored to your needs.</p>
          <ul className="service-details">
            <li>Data Preparation & Integration</li>
            <li>Machine Learning & Deep Learning</li>
            <li>Deployment & Support</li>
          </ul>
        </div>
        <div className="service-card">
          <h3>AI Training & Enablement</h3>
          <p>Empower your team with the skills and knowledge to leverage AI effectively and responsibly.</p>
          <ul className="service-details">
            <li>Workshops & Seminars</li>
            <li>Executive Training</li>
            <li>Ongoing Support</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
