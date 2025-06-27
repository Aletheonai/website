import React from 'react';
import '../styles.css';

export default function Blog() {
  return (
    <section className="blog-section" id="blog">
      <h2 className="section-heading">Insights & Resources</h2>
      <div className="blog-list">
        <div className="blog-post">
          <h3>How to Integrate AI into Your Business</h3>
          <p>Discover the key steps and best practices for a successful AI adoption journey.</p>
          <a href="#" className="blog-link">Read More</a>
        </div>
        <div className="blog-post">
          <h3>AI Ethics: What Every Leader Should Know</h3>
          <p>Learn about the importance of ethical AI and how to ensure responsible innovation.</p>
          <a href="#" className="blog-link">Read More</a>
        </div>
      </div>
    </section>
  );
} 