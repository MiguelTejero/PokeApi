import { Navigate, Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';  // Importar hooks
import { auth } from './firebase';
import './RutasPrivadas.css'

export function RutasPrivadas() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Establecer el estado del usuario con la función onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);  // Si el usuario está autenticado, se establece en el estado
    });

    // Limpiar el listener al desmontar el componente
    return () => unsubscribe();
  }, []);

  // Si todavía estamos verificando el estado de autenticación, se puede mostrar un loading o nada.
  if (user === null) {
    return <div class="inciasesionpara" >Inicia sesión para jugar</div>;  // O un componente de carga
  }

  return user ? <Outlet /> : <Navigate to="/" />;  // Si hay un usuario, permite acceder a las rutas privadas, si no, redirige a Inicio
}
