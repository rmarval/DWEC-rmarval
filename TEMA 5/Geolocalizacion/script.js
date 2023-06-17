
function obtenerFechaHoraActual() { //para obtener la fecha y hora actual en formato legible
    const ahora = new Date();
    return ahora.toLocaleString();
}


function mostrarHistorialPosiciones() { //para mostrar el historial de posiciones almacenado en localStorage
    const historialPosiciones = JSON.parse(localStorage.getItem('historialPosiciones')); //obtengo el historial de posiciones almacenado en localStorage
    const elementoInfoPosicion = document.getElementById('info-posicion'); //obtengo el elemento HTML donde se mostrará el historial

    if (historialPosiciones && historialPosiciones.length > 0) {
        elementoInfoPosicion.innerHTML = '<h2>Historial de Posiciones:</h2>'; //muestro un encabezado para el historial

        historialPosiciones.forEach(posicion => {
            const { coords, timestamp } = posicion;
            const { latitude, longitude } = coords;
            const fechaHora = new Date(timestamp).toLocaleString(); //convierto la marca de tiempo en una fecha y hora legible

            const elementoParrafo = document.createElement('p'); //creo un elemento de párrafo para mostrar la información de cada posición
            elementoParrafo.textContent = `Latitud: ${latitude}, Longitud: ${longitude}, Fecha y Hora: ${fechaHora}`; //asigno el contenido al elemento de párrafo

            elementoInfoPosicion.appendChild(elementoParrafo); //agrego el elemento de párrafo al elemento contenedor en el HTML
        });
    } else {
        elementoInfoPosicion.innerHTML = '<p>No hay historial de posiciones.</p>'; //muestro un mensaje si no hay historial de posiciones
    }
}


function almacenarPosicion(posicion) { //para almacenar una nueva posición en el historial y en localStorage
    const posicionActual = {
        coords: {
            latitude: posicion.coords.latitude,
            longitude: posicion.coords.longitude
        },
        timestamp: posicion.timestamp
    };

    let historialPosiciones = JSON.parse(localStorage.getItem('historialPosiciones')) || []; //obtengo el historial de posiciones almacenado o inicializarlo como un arreglo vacío si no existe
    historialPosiciones.push(posicionActual); //agrego la nueva posición al historial

    localStorage.setItem('historialPosiciones', JSON.stringify(historialPosiciones)); //guardo el historial actualizado en localStorage
}


function manejarActualizacionGeolocalizacion(posicion) { //para manejar la actualización de la geolocalización
    const elementoInfoPosicion = document.getElementById('info-posicion'); //obtengo el elemento HTML donde se mostrará la posición actual

    const { latitude, longitude } = posicion.coords; //obtengo la latitud y longitud de la posición actual
    const fechaHora = obtenerFechaHoraActual(); //obtengo la fecha y hora actual en formato legible

    const elementoParrafo = document.createElement('p'); //creo un elemento de párrafo para mostrar la información de la posición actual
    elementoParrafo.textContent = `Latitud: ${latitude}, Longitud: ${longitude}, Fecha y Hora: ${fechaHora}`; //asigna el contenido al elemento de párrafo

    elementoInfoPosicion.appendChild(elementoParrafo); //agrego el elemento de párrafo al elemento contenedor en el HTML

    almacenarPosicion(posicion); //almaceno la posición actual en el historial
}


function iniciarGeolocalizacion() { //funcion para iniciar la geolocalización
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(manejarActualizacionGeolocalizacion); //inicio el seguimiento de la posición del usuario y llamar a la función manejarActualizacionGeolocalizacion cada vez que se actualice la posición
    } else {
        alert('Tu navegador no admite la API de geolocalización.'); //muestro una alerta si el navegador no admite la API de geolocalización
    }
}


function detenerGeolocalizacion() { //para detener la geolocalización
    navigator.geolocation.clearWatch(); //detengo el seguimiento de la geolocalización
}


function limpiarHistorial() { //para eliminar el historial de posiciones
    localStorage.removeItem('historialPosiciones'); //elimino el historial de posiciones almacenado en localStorage
    mostrarHistorialPosiciones(); //vuelvo a mostrar el historial actualizado en la página
}

//obtengo los elementos del DOM y asignarles eventos
document.getElementById('btn-iniciar').addEventListener('click', iniciarGeolocalizacion); //asigno la función iniciarGeolocalizacion al evento click del botón "start"
document.getElementById('btn-detener').addEventListener('click', detenerGeolocalizacion); //asigno la función detenerGeolocalizacion al evento click del botón "stop"
document.getElementById('btn-limpiar').addEventListener('click', limpiarHistorial); //asigno la función limpiarHistorial al evento click del botón "clear"

mostrarHistorialPosiciones(); //muestro el historial al cargar la página
