
// Películas


const getFilms = async() => {    
    try {
        // declaramos una variable con los datos entrantes. con el await para que se espere a tener los datos
        const allFilms = await fetch ('https://swapi.dev/api/films/');

        // esto es el equivalente al parsear. Llamamos al método .json() para poder leer la información
        const filmList = await allFilms.json();

        // console.log(filmList);
        // listado peliculas
        // console.log(filmList.results);
        // guardo la array en una variable para poder recorrerla
        const filmCollection = filmList.results;
        // personajes
        // console.log(filmCollection);

        // aquí voy a meter el html
        let content = '';
        // Imprimir un título por película
        for(film of filmCollection) {

            // console.log(element.title);
            let pelicula = document.getElementById('pelicula');

            /////////////////////////////////////////////////////////////////////////////
            content += `<div class="eachMovie">`
            // saco todos los titulos y para añadir al html///////////////////////////////////

            content += `<h2 class="title">${film.title}</h2>
            `;

            // guardo en una variable los arrays con los personajes de cada peli

            const personajesPeliculas = film.characters;
            
            // Imprime cada personaje

            const listHtml = await getCharacterList(personajesPeliculas);
            content += `<ul>${listHtml}</ul>`;
                
            // añado contenido al html

            content += `</div>`

            pelicula.innerHTML = content; 

        };
        let cargando = document.getElementById('cargando');
        cargando.classList.add('ocultar');


    } catch (error) {
        console.log(error) 
    };
}


async function getCharacterList(characters) {
    let htmlContent = '';
    for(let element of characters){
        let cadaPersonaje = await fetch(element);
        let todosPersonajes = await cadaPersonaje.json();
        // console.log('NOMBRE', todosPersonajes.name);
        htmlContent += `<li>${todosPersonajes.name}</li>
                        <select>
                            <option>View more</option>
                            <option>Gender -> ${todosPersonajes.gender}</option>
                            <option>Mass -> ${todosPersonajes.mass}</option>
                            <option>Height -> ${todosPersonajes.height}</option>
                        </select>`;
    }
    return htmlContent;
}

getFilms() ;




