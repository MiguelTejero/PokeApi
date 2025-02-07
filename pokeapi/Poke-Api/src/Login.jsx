import { useState, useEffect } from 'react'; 
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'; 
import { GithubAuthProvider } from 'firebase/auth'; // También importo el proveedor de autenticación para GitHub
import './login.css';

export function Login() {
  // Inicializo el objeto de autenticación de Firebase y los proveedores de Google y GitHub
  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider(); 

  // Defino los estados que voy a utilizar en mi componente
  const [registrarse, setRegistrarse] = useState(false); // Para saber si el usuario está en el proceso de registro o login
  const [email, setEmail] = useState(''); // Almacenar el email ingresado
  const [contraseña, setContraseña] = useState(''); // Almacenar la contraseña ingresada
  const [contraseña2, setContraseña2] = useState(''); // Almacenar la segunda contraseña en el registro
  const [errores, setErrores] = useState([]); // Para almacenar posibles errores
  const [usuario, setUsuario] = useState(null); // Almacenar el usuario que se ha autenticado

  // Uso useEffect para observar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioActual) => {
      setUsuario(usuarioActual); // Actualizo el estado de 'usuario' si cambia
    });
    return () => unsubscribe(); // Elimino el observador cuando el componente se desmonta
  }, []);

  // Función para alternar entre el formulario de registro y login
  function alternarRegistro() {
    setRegistrarse(!registrarse);
    setErrores([]); // Reseteo los errores cuando cambio de formulario
  }

  // Función para iniciar sesión con Google
  function iniciarSesionConGoogle() {
    signInWithPopup(auth, googleAuthProvider)
      .then(() => console.log('Autenticación correcta')) // Si la autenticación es exitosa
      .catch((error) => console.error('Error:', error)); // Si ocurre un error
  }

  // Función para iniciar sesión con GitHub
  function iniciarSesionConGitHub() {
    signInWithPopup(auth, githubAuthProvider) // Intento iniciar sesión con GitHub
      .then(() => console.log('Autenticación correcta con GitHub')) 
      .catch((error) => console.error('Error:', error)); // Si hay algún error
  }

  // Función para cerrar sesión
  function cerrarSesion() {
    signOut(auth)
      .then(() => console.log('Cierre de sesión exitoso')) // Si la sesión se cierra correctamente
      .catch((error) => console.error('Error:', error)); // Si ocurre un error
  }

  // Función que maneja el envío del formulario de login o registro
  function manejarEnvioFormulario(e) {
    e.preventDefault(); // Evito el comportamiento por defecto del formulario
    setErrores([]); // Reseteo los errores

    // Si estoy en el formulario de registro
    if (registrarse) {
      if (contraseña !== contraseña2) { // Verifico que las contraseñas coincidan
        setErrores(['Las contraseñas no coinciden']); // Si no coinciden, muestro un mensaje de error
        return;
      }

      // Si las contraseñas coinciden, intento crear un nuevo usuario
      createUserWithEmailAndPassword(auth, email, contraseña)
        .then(() => console.log('Usuario registrado correctamente')) // Si el registro es exitoso
        .catch((error) => setErrores([error.message])); // Si ocurre un error
    } else {
      // Si no estoy en el formulario de registro, intento hacer login
      signInWithEmailAndPassword(auth, email, contraseña)
        .then(() => console.log('Inicio de sesión exitoso')) // Si el login es exitoso
        .catch((error) => setErrores([error.message])); // Si ocurre un error
    }
  }

  return (
    <div className={`container ${usuario ? 'logged-in' : ''}`}>
      {usuario ? ( // Si ya estoy autenticado, muestro la información del usuario y un botón para cerrar sesión
        <>
          <p className="user-info">Sesión iniciada como: {usuario.displayName || usuario.email}</p>
          <button className="logout-btn" onClick={cerrarSesion}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <h2>{registrarse ? 'Registro' : 'Iniciar Sesión'}</h2> {/* Título cambia según el estado */}

          <form onSubmit={manejarEnvioFormulario} className={usuario ? 'hidden' : ''}>
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)} 
              required 
            />
            {registrarse && ( // Si estoy en el formulario de registro, pido una confirmación de la contraseña
              <input 
                type="password" 
                placeholder="Confirmar contraseña" 
                value={contraseña2}
                onChange={(e) => setContraseña2(e.target.value)} 
                required 
              />
            )}

            <button type="submit">{registrarse ? 'Registrarse' : 'Iniciar sesión'}</button>
          </form>

          <button className="google-btn" onClick={iniciarSesionConGoogle}>Iniciar sesión con Google</button>
          <button className="google-btn" onClick={iniciarSesionConGitHub}>Iniciar sesión con GitHub</button>

          <button className="toggle-btn" onClick={alternarRegistro}>
            {registrarse ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>

          {errores.length > 0 && (
            <div className="error-message">
              {errores.map((error, index) => (
                <p key={index}>{error}</p> // Muestra los errores si los hay
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
