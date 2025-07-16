import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Services from './components/Services';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <NavBar />
      <Hero />
      {/* Main content sections */}
      <main>
        <Services />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
