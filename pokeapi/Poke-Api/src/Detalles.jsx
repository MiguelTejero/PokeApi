import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './detalles.css'

export function Detalles() {
  // Utilizo useParams para obtener el nombre del Pokémon de la URL
  const { pokemonName } = useParams();
  
  // Creo el estado para almacenar los detalles del Pokémon
  const [pokemonDetalles, setPokemonDetails] = useState(null);
  
  // Utilizo useNavigate para redirigir al usuario cuando presione el botón de volver
  const navigate = useNavigate();

  // Hago una petición a la API de Pokémon para obtener los detalles del Pokémon
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((data) => {
        // Guardo los detalles del Pokémon en el estado
        setPokemonDetails(data);
      });
  }, [pokemonName]); // Dependencia para que se ejecute cada vez que cambie pokemonName

  // Si no se han cargado los detalles, muestro un mensaje de carga
  if (!pokemonDetalles) {
    return <p>Cargando detalles...</p>;
  }

  return (
    <div className="pokemon-detalles">
      {/* Muestra el nombre del Pokémon */}
      <h1>{pokemonDetalles.name}</h1>
      
      {/* Muestra la imagen del Pokémon */}
      <img src={pokemonDetalles.sprites.other.dream_world.front_default} alt={pokemonDetalles.name} />
      
      {/* Muestra las habilidades del Pokémon */}
      <div className="habilidades">
        <h2>Habilidades</h2>
        <ul>
          {pokemonDetalles.abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>

      {/* Muestra las estadísticas del Pokémon */}
      <div className="estadisticas">
        <h2>Estadísticas</h2>
        <ul>
          {pokemonDetalles.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>

      {/* Muestra los tipos del Pokémon */}
      <div className="tipos">
        <h2>Tipos</h2>
        <ul>
          {pokemonDetalles.types.map((type) => (
            <li key={type.type.name}>{type.type.name}</li>
          ))}
        </ul>
      </div>

      {/* Botón para volver a la Pokedex */}
      <button onClick={() => navigate('/Pokemon')} className="volver">
        Volver
      </button>
    </div>
  );
}
