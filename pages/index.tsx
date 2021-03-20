import React from 'react';
import Album from '../components/Album';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

const App = (): JSX.Element => (
  <div className="app">
    <main>
      <Hero />
      <Album />
    </main>
    <Footer />
  </div>
);

export default App;
