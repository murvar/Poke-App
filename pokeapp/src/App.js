import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import Pokemons from './components/Pokemons';
import Pokemon from './components/Pokemon';

function App() {
  

  return (
    <div className={"pokedex"}>
      <Router>
        <div className={"pokedex-header"}>
          <Link to="/">
            <button className={"pokemon-home-button"}>
              <h1>Pokedex</h1>
            </button>
          </Link>
        </div>
        <Routes>
          <Route path="/pokemon/:pokemonName" element={<Pokemon/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

function Home() {
  return (
    <div>
      <Pokemons />
    </div>
  )
}

export default App;
