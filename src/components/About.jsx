import React from 'react';
import '../styles.css';

export default function About() {
  return (
    <section className="about-section" id="about">
      <h2 className="section-heading">About Aletheon</h2>
      <p className="about-mission">Our mission is to empower organizations to harness the full potential of AI with clarity, responsibility, and measurable results.</p>
      <div className="team-list">
        <div className="team-member">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Team Member" className="team-photo" />
          <h3>Jean-Pierre Richa</h3>
          <p>Founder & AI Strategist</p>
        </div>
        <div className="team-member">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Team Member" className="team-photo" />
          <h3>Jane Doe</h3>
          <p>Lead Data Scientist</p>
        </div>
        <div className="team-member">
          <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Team Member" className="team-photo" />
          <h3>John Smith</h3>
          <p>AI Solutions Architect</p>
        </div>
      </div>
    </section>
  );
} 