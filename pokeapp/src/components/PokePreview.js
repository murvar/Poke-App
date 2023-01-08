import '../App.css';
import React, { useState, useEffect } from 'react';
import { useQuery, QueryClientProvider, QueryClient } from '@tanstack/react-query'
const queryClient = new QueryClient();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function FetchPokemon(props) {

  const { status, data, error } = useQuery({
      queryKey: [props.data.name],
      queryFn: () => 
      fetch('https://pokeapi.co/api/v2/pokemon/' + props.data.name)
      .then(response => response.json())

  })


  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  let types = []
  /*for (let i = 0; i < data.types.length; i++) {
    types.push(data.types[i]['type']['name']);
  }*/

  return (
    <div >
      <div className={'pokemon-circle ' + data.types[0]['type']['name']}>
        <p className={'pokemon-id'}>#{String(data.id).padStart(3, '0')}</p>
        <img src={data.sprites.other.dream_world.front_default} alt={data.name} className={'pokemon-image'}/>    
        <h1 className={'pokemon-name'}>{data.name.toUpperCase()}</h1>
      </div>
      
      <ul className={'type-list'}>
        {types.map((type) => (
          <li className={type} key={String(type)}>
            {capitalizeFirstLetter(type)}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Pokemon(props) {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <FetchPokemon data={props.data}/>
      </QueryClientProvider>

    </div>
  );
}

export default Pokemon;
