import React from 'react';
import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Home from './components/home/home';
// import Movies from './components/movies/movies';

function App(): JSX.Element {
  return (
    <div className="App">
      <Header />
      <Home />
      {/* <Movies /> */}
      <Footer />
    </div>
  );
}

export default App;
