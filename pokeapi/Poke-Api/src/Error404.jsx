import { Link } from "react-router-dom"; // Importo el componente Link para navegar entre rutas
import "./Error404.css"; // Importo los estilos para la página de error 404

export function Error404() {
  return (
    <div className="error-container"> 
      {/* Contenedor principal de la página de error */}
      <h1>404 - Página no encontrada</h1> 
      <p>Oops... Parece que te perdiste.</p> 
      
      {/* Enlace que redirige al inicio */}
      <Link to="/" className="boton-volver">Volver al inicio</Link>
    </div>
  );
}
