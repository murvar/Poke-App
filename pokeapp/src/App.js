import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import PokePreview from './components/PokePreview';
import Pokemons from './components/Pokemons'

const Pokedex = require("pokeapi-js-wrapper")
const api = new Pokedex.Pokedex({ cacheImages: true });

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
          <Route path="/pokemon/:pokemonName" element={<PokemonDetail/>} />
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

function PokemonDetail() {
  const { pokemonName } = useParams();
  console.log("This is the ID: " + pokemonName);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    api.getPokemonByName(pokemonName).then(response => {
      setPokemon(response);
    });
  }, [pokemonName]);

  if (!pokemon) {
    return null;
  }

  return (
    <div className={"pokemon-detail"}>
      <h1 className={"pokemon-name"}>{pokemon.name}</h1>
      <img src={pokemon.sprites.other.dream_world.front_default} alt="sprite" className={"pokemon-image"}></img>
      <p className={"pokemon-info"}>Type: {pokemon.types[0].type.name}</p>
      <p className={"pokemon-info"}>Weight: {pokemon.weight}</p>
      <p className={"pokemon-info"}>Height: {pokemon.height}</p>
    </div>
  );
}


export default App;
