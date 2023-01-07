import '../App.css';
import React, { useEffect, useState, useRef} from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import PokePreview from './PokePreview';
import { useQuery, QueryClientProvider, QueryClient } from '@tanstack/react-query'
const queryClient = new QueryClient();

function FetchPokemons() {

    const { status, data, error } = useQuery({
        queryKey: ['pkmns'],
        queryFn: () => 
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then(out => out.results)
    })

  
    if (status === 'loading') {
      return <span>Loading...</span>
    }
  
    if (status === 'error') {
      return <span>Error: {error.message}</span>
    }
  
    // also status === 'success', but "else" logic works, too
    return (
      <ul className={"pokedex-list"}>
        {data.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.name}`} className={"pokemon-name"} key={pokemon.name}>
                <li className={"pokemon-link"}> 
                    <PokePreview data={pokemon} />
                </li>
            </Link>
        ))}
      </ul>
    )
  }

const Pokemons=()=>{
    

    //const info = useQuery({ queryKey: ['pkmn'], queryFn: fetch('https://pokeapi.co/api/v2/pokemon?limit=151').then(res =>res.json()) })

    const [pokemonList, setPokemonList] = useState([]);

    /*useEffect(()=>{
        //let cache=getPokemonCache("POKEMON_CACHE")
        //console.log(cache.data)
        //setPokemonList(fetchPokemons())
        console.log(pokemonList)

        /*if (!cache.data) {
            console.log("HERE")
            fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
                .then(response => response.json())
                .then(out => setPokemonList(out.results))
                .catch(err => { throw err });

            pokemonList.forEach(function(pokemon) {
                fetch(pokemon.url)
                .then(res => res.json())
                .then(out => setPokemonToCache(out))
            })
        } else {
            console.log("NO HERE")
            let pokemons = []
            Object.keys(cache.data).forEach(function(x) {
                pokemons.push(cache.data[x].pokemon)
            })            
            setPokemonList(pokemons)
        }
    },[])*/

    console.log(pokemonList)

    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <FetchPokemons />
            </QueryClientProvider>
        </div>
      );
}

export default Pokemons

/*<h1 className={"pokedex-title"}>Pokedex</h1>
<ul className={"pokedex-list"}>
  {pokemonList.map(pokemon => (
    <Link to={`/pokemon/${pokemon.name}`} className={"pokemon-name"} key={pokemon.name}>
      <li className={"pokemon-link"}> 
      <PokePreview data={pokemon} />
      </li>
    </Link>
  ))}
</ul>*/

