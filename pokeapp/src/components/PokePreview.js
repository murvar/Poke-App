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
      fetch(props.data.url)
      .then(response => response.json())

  })


  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  let types = []
  for (let i = 0; i < data.types.length; i++) {
    types.push(data.types[i]['type']['name']);
  }

  // also status === 'success', but 'else' logic works, too
  return (
    <div >
      <div className={'pokemon-circle'}>
        <div className={'shadow ' + String(types[0])}></div>
        <img src={data.sprites.other.dream_world.front_default} alt={data.name} className={'pokemon-image'}/>
        
      </div>
      <p>#{String(data.id).padStart(3, '0')}</p>
      <h1 className={'pokemon-name'}>{data.name.toUpperCase()}</h1>
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

//<img src={props.data.sprites.front_default} alt={props.data.name} />
