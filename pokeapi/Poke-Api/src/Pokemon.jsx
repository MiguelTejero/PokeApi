import './Pokemon.css'; // Importo el archivo CSS para darle estilo al componente
import { useState, useEffect } from 'react'; // Importo useState y useEffect de React para manejar el estado y los efectos secundarios
import { Link } from 'react-router-dom'; // Importo Link de react-router-dom para la navegación entre páginas

export function Pokemon() {
  // Inicializo el estado counts para almacenar los pokemones y url para controlar la URL de la API.
  const [counts, setCount] = useState([]); 
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=8'); // Establezco la URL inicial con un límite de 8 pokemones

  useEffect(() => cargapoke(), []); // Uso useEffect para cargar los datos de la API solo cuando el componente se monte

  // Función que carga los datos de los pokemones desde la API
  function cargapoke() {  
    fetch(url) // Realizo la petición a la API con la URL proporcionada
      .then((response) => response.json()) // Convierto la respuesta a formato JSON
      .then((datosAPI) => { 
        datosAPI.results.forEach(pokemones => { // Itero sobre cada pokemon recibido de la API
          fetch(pokemones.url) // Realizo otra petición a la URL de cada pokemon individual
            .then((response) => response.json()) // Obtengo los datos del pokemon específico
            .then((pokemon) => {
              pokemones.image = pokemon.sprites.other.dream_world.front_default; // Obtengo la imagen del pokemon
              setCount((prevCounts) => [...prevCounts, pokemones]); // Agrego el pokemon a la lista de pokemones
              setUrl(datosAPI.next); // Actualizo la URL para poder cargar más pokemones
            })
        });
      });
  }

  // Función que se ejecuta al hacer clic en el botón "Cargar más" para cargar más pokemones
  function cargarmas() {
    cargapoke(); // Llama a la función cargapoke para cargar más pokemones
  }

  return (
    <>
      <ul className="pokemon-grid"> 
        {counts.map((pokemon) => ( // Itero sobre los pokemones en el estado counts
          <li key={pokemon.name} className="pokemon-card"> 
            <Link to={`/detalles/${pokemon.name}`}> {/* Enlazo a la página de detalles del pokemon */}
              <img src={pokemon.image} alt={pokemon.name} /> {/* Muestra la imagen del pokemon */}
              <span>{pokemon.name}</span> {/* Muestra el nombre del pokemon */}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={cargarmas} className="cargarmas"> 
        Cargar más {/* Botón para cargar más pokemones */}
      </button>
    </>
  );
}
