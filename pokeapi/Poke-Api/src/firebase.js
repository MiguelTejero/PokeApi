// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Asegúrate de importar esto
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSsrS4cJKt8-qZMIjXRHEfsBM71Yjg2zs",
  authDomain: "pokeapi-cf7b5.firebaseapp.com",
  projectId: "pokeapi-cf7b5",
  storageBucket: "pokeapi-cf7b5.firebasestorage.app",
  messagingSenderId: "440473001567",
  appId: "1:440473001567:web:21800d9ca8230ceb7c05ea",
  measurementId: "G-RV0WKT25F5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Agregar la autenticación

export { auth, app }; // Ahora sí exportamos 'auth'