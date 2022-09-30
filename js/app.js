
// Variables
const formulario = document.querySelector('#formulario');
const listaTweet = document.querySelector('#lista-tweets');
let tweets = [];



// Event Listeners
eventListeners();
function eventListeners () {
    // cuando agregas una nueva tarea
    formulario.addEventListener('submit', agregarTweet);

    // cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log (tweets);
        crearHtml();
    });
    
}



// Funciones
function agregarTweet (e) {
    
    e.preventDefault();

    // textarea donde se escribe
    const tweet = document.querySelector('#tweet').value; 
    // validamos
    if (tweet === '') {
        mostrarError('este campo es obligatorio');
        return; // evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        texto: tweet
    }
    // Añadir al arreglo de tweet
    tweets = [...tweets, tweetObj];
    console.log (tweets);

    // una vez agregados creamos el HTML
    crearHtml();

    // reiniciar el formulario
    formulario.reset();
}

// mostrar mensaje de error
function mostrarError (error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error')

    // insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove()
    }, 3000);
}

// muestra el listado de las tareas
function crearHtml () {
    limpiarHtml();
    if (tweets.length > 0) {
        tweets.forEach( tweet => {
            // agregamos un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X'

            // creamos la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet (tweet.id);
            }

            // creamos el html
            const li = document.createElement('li');

            // añadimos el texto
            li.textContent = tweet.texto;
            
            // asignamos el boton 
            li.appendChild(btnEliminar);


            // lo s¡insertamos en el HTML
            listaTweet.appendChild(li);

        });
    }

    sincronizarStorage();
}

// agrega las tareas a localStorage
function sincronizarStorage () {

    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// elimina una tearea 
function borrarTweet (id) {
    tweets = tweets.filter (tweet => tweet.id !== id);
    crearHtml();
}

// limpiar HTML
function limpiarHtml () {
    while (listaTweet.firstChild) {
        listaTweet.removeChild(listaTweet.firstChild);
    }
}





