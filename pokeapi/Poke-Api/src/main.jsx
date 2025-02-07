import { createRoot } from 'react-dom/client'; // Importo createRoot para inicializar la aplicación React en el DOM
import App from './App.jsx'; // Importo el componente principal de la aplicación

// Utilizo createRoot para renderizar el componente principal <App /> en el elemento con id 'root'
createRoot(document.getElementById('root')).render(
    <App /> // El componente App es el que contiene toda la lógica y los demás componentes de la aplicación
);