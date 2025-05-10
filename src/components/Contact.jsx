import React from 'react';

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2>Contact Us</h2>
      <p>Ready to unlock your enterprise AI potential? Reach out to us:</p>
      <form className="contact-form" onSubmit={e => e.preventDefault()}>
        <div className="form-group">
          <input type="email" placeholder="Your Email" required />
          <button type="submit">Get in Touch</button>
        </div>
      </form>
    </section>
  );
}

export default Contact;
