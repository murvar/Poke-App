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
  
    return (
      <ul className={"pokedex-list"}>
        {data.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
                <li className={"pokemon-link"}> 
                    <PokePreview data={pokemon} />
                </li>
            </Link>
        ))}
      </ul>
    )
  }

const Pokemons=()=>{

    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <FetchPokemons />
            </QueryClientProvider>
        </div>
      );
}

export default Pokemons

