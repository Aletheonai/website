import React from 'react';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import TechMethodology from './components/TechMethodology';
import CaseStudies from './components/CaseStudies';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Awards from './components/Awards';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <main>
        <About />
        <Services />
        <TechMethodology />
        <CaseStudies />
        <Stats />
        <Testimonials />
        <Awards />
        <Blog />
        <FAQ />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
