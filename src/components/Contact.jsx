import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles.css';

export default function Contact() {
  const headingRef = useRef(null);
  const paraRef    = useRef(null);
  const btnRef     = useRef(null);

  return (
    <section id="contact" className="contact-section">
      {/* Heading */}
      <motion.h2
        ref={headingRef}
        className="contact-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20% 0px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Contact Us
      </motion.h2>

      {/* Paragraph */}
      <motion.p
        ref={paraRef}
        className="contact-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        Ready to unlock your enterprise AI potential? Reach out to us:
      </motion.p>

      {/* Button */}
      <motion.a
        ref={btnRef}
        href="mailto:info@aletheon.ai"
        className="contact-button"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      >
        Get in Touch
      </motion.a>
    </section>
  );
}
