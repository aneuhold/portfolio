import React from 'react';
import Album from '../components/Album';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

const App = (): JSX.Element => (
  <div className="app">
    <Hero />
    <Album />
    <Footer />
  </div>
);

export default App;
