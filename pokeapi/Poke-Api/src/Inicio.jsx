import './Inicio.css' // Importo los estilos específicos para la página de inicio

export function Inicio(){

    return(
        <div>
            {/* Contenedor principal para la página de inicio */}
            <div className="bannerInicio">
                {/* Banner con mensaje de bienvenida */}
                <div className="bienvenido">
                    <h1>Bienvenido!!!</h1> 
                    <h2>Eres fan de Pokémons? Estás en el lugar adecuado</h2>
                </div>

                {/* Lista de opciones para el usuario */}
                <div className="lista">
                    <ul>
                        <li>
                            <p>Descubre todos los datos sobre tus pokemons favoritos en la pokedex</p> 
                        </li>
                        <li>
                            <p>Pon a prueba tu conocimiento en Pokémons jugando a "Adivínalo"</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
