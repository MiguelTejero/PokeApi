import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { RutasPrivadas } from './RutasPrivadas';
import { Inicio } from './Inicio';
import { Pokemon } from './Pokemon';
import { JuegoPokemon } from './JuegoPokemon';
import { Detalles } from './Detalles';
import { Login } from './Login.jsx';
import { Error404 } from './Error404';
import { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

function App() {
  const auth = getAuth();
  const [usuario, setUsuario] = useState(null);

  // Esto actualiza el estado del usuario cuando cambia la autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioActual) => {
      setUsuario(usuarioActual); // Si hay un usuario autenticado, se actualiza el estado
    });

    return () => unsubscribe(); // Limpiamos la suscripción cuando el componente se desmonte
  }, [auth]);

  function cerrarSesion() {
    signOut(auth)
      .then(() => {
        console.log('Cierre de sesión exitoso');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <BrowserRouter>
      <>
        {/* Barra de navegación con enlaces */}
        <div className='nav'>
          <nav>
            <Link className='link' to="/">Inicio</Link>
            {/* Condicionalmente cambio el texto del enlace según si el usuario está autenticado */}
            {usuario ? (
              <button className="link" onClick={cerrarSesion}>Cerrar sesión</button>
            ) : (
              <Link className='link' to="/Login">Iniciar sesión</Link>
            )}
            <Link className='link' to="/Pokemon">Pokedex</Link>
            <Link className='link' to="/JuegoPokemon">Adivínalo</Link>
          </nav>
        </div>

        {/* Definición de rutas */}
        <Routes>
          {/* Ruta de inicio */}
          <Route element={<Inicio />}>
            <Route path="/" element={<Inicio />} />
          </Route>

          {/* Ruta de login */}
          <Route element={<Login />}>
            <Route path="/Login" element={<Login />} />
          </Route>

          {/* Ruta de Pokedex */}
          <Route element={<Pokemon />}>
            <Route path="/Pokemon" element={<Pokemon />} />
          </Route>

          {/* Ruta de detalles de Pokémon */}
          <Route element={<Detalles />}>
            <Route path="/detalles/:pokemonName" element={<Detalles />} />
          </Route>

          {/* Rutas privadas protegidas */}
          <Route element={<RutasPrivadas />}>
            <Route path="/JuegoPokemon" element={<JuegoPokemon />} />
          </Route>

          {/* Ruta para manejar errores 404 */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
