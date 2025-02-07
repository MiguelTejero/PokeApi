import './JuegoPokemon.css'; // Importo los estilos específicos para el juego
import { useState, useEffect } from 'react'; // Importo los hooks de React para manejar el estado y los efectos

export function JuegoPokemon() {
  // Defino los estados que utilizaré para el juego
  const [pokemon, setPokemon] = useState(null); // Almacena el Pokémon actual
  const [difuminado, setDifuminado] = useState(10); // Controla el nivel de difuminado de la imagen
  const [respuesta, setRespuesta] = useState(''); // Almacena la respuesta del usuario
  const [intentos, setIntentos] = useState(3); // Controla los intentos restantes
  const [mensaje, setMensaje] = useState(''); // Mensaje de estado que muestra si la respuesta fue correcta o incorrecta
  const [juegoTerminado, setJuegoTerminado] = useState(false); // Controla si el juego ha terminado
  const [puntos, setPuntos] = useState(0); // Almacena los puntos obtenidos

  // Uso useEffect para cargar un nuevo Pokémon cuando el componente se monta
  useEffect(() => {
    cargarPokemon(); // Carga un Pokémon al inicio
  }, []);

  // Función para cargar un Pokémon aleatorio de la API
  function cargarPokemon() {
    const idAleatorio = Math.floor(Math.random() * 649) + 1; // Genero un ID aleatorio entre 1 y 649
    fetch(`https://pokeapi.co/api/v2/pokemon/${idAleatorio}`) // Hago la solicitud a la API
      .then(response => response.json()) // Transformo la respuesta a JSON
      .then(data => {
        // Al recibir los datos, configuro el estado con el nombre e imagen del Pokémon
        setPokemon({
          nombre: data.name,
          imagen: data.sprites.other.dream_world.front_default
        });

        // Restablezco los estados para un nuevo juego
        setDifuminado(10);
        setIntentos(3);
        setMensaje('');
        setRespuesta('');
        setJuegoTerminado(false);
      });
  }

  // Manejo el cambio de texto en el input de respuesta
  function manejarCambio(evento) {
    setRespuesta(evento.target.value); // Actualizo el estado de la respuesta
  }

  // Función para manejar el envío del formulario y verificar la respuesta
  function manejarEnvio() {
    if (juegoTerminado) return; // Si el juego está terminado, no permito enviar respuestas

    if (respuesta.toLowerCase() === pokemon.nombre.toLowerCase()) {
      // Si la respuesta es correcta
      setMensaje('¡Correcto! Has adivinado el Pokémon');
      setDifuminado(0); // El Pokémon ya no está difuminado
      setJuegoTerminado(true); // Termino el juego
      setPuntos(prevPuntos => prevPuntos + 1); // Aumento los puntos
    } else {
      // Si la respuesta es incorrecta
      setIntentos(prevIntentos => {
        const nuevosIntentos = prevIntentos - 1; // Decremento los intentos restantes
        if (nuevosIntentos === 0) {
          // Si no quedan intentos, termino el juego
          setMensaje(`¡Juego terminado! El Pokémon era ${pokemon.nombre}.`);
          setDifuminado(0); // El Pokémon ya no está difuminado
          setJuegoTerminado(true); // Termino el juego
          setPuntos(0); // Reseteo los puntos
        } else {
          setMensaje(`¡Incorrecto! Te quedan ${nuevosIntentos} intentos.`); // Mensaje de error
          setDifuminado(prev => Math.max(prev - 4, 0)); // Aumento el desenfoque a medida que fallan las respuestas
        }
        return nuevosIntentos; // Actualizo los intentos restantes
      });
    }
  }

  return (
    <div className="contenedor-juego"> {/* Contenedor principal del juego */}
      <div className="contador-puntos">Puntos: {puntos} 🏆</div> 
      {/* Muestra los puntos actuales */}
      <h1>¿Qué Pokémon es este?</h1> 
      {/* Título principal */}
      {pokemon && ( // Verifico que los datos del Pokémon estén disponibles
        <>
          <div className="contenedor-imagen">
            <img
              src={pokemon.imagen} // Muestro la imagen del Pokémon
              alt={pokemon.nombre} 
              style={{ filter: `blur(${difuminado}px)`, imageRendering: "pixelated" }} 
              // Aplico el filtro de difuminado dinámicamente
              className="imagen-pokemon"
            />
          </div>
          <p className="mensaje-juego">{mensaje}</p> 
          {/* Muestra el mensaje de estado (correcto, incorrecto, etc.) */}
          {juegoTerminado ? ( // Si el juego ha terminado, muestro el resultado
            <div className="juego-terminado">
              <h2>{pokemon.nombre.toUpperCase()}</h2> {/* Muestra el nombre del Pokémon en mayúsculas */}
              <button onClick={cargarPokemon} className="boton-reiniciar"> {/* Botón para reiniciar el juego */}
                Jugar de nuevo
              </button>
            </div>
          ) : ( // Si el juego no ha terminado, muestro los controles para adivinar
            <>
              <input
                type="text"
                value={respuesta}
                onChange={manejarCambio} 
                placeholder="Escribe tu respuesta" 
                className="entrada-respuesta" 
              />
              <button onClick={manejarEnvio} className="boton-enviar">Adivinar</button>
              {/* Botón para enviar la respuesta */}
            </>
          )}
        </>
      )}
    </div>
  );
}
