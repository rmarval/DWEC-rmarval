// Función para obtener la fecha y hora actual en formato legible
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString();
}

// Función para mostrar el historial de posiciones almacenado en localStorage
function displayLocationHistory() {
    const locationHistory = JSON.parse(localStorage.getItem('locationHistory')); // Obtener el historial de posiciones almacenado en localStorage
    const locationInfoElement = document.getElementById('location-info'); // Obtener el elemento HTML donde se mostrará el historial

    if (locationHistory && locationHistory.length > 0) {
        locationInfoElement.innerHTML = '<h2>Historial de Posiciones:</h2>'; // Mostrar un encabezado para el historial

        locationHistory.forEach(location => {
            const { coords, timestamp } = location;
            const { latitude, longitude } = coords;
            const dateTime = new Date(timestamp).toLocaleString(); // Convertir la marca de tiempo en una fecha y hora legible

            const pElement = document.createElement('p'); // Crear un elemento de párrafo para mostrar la información de cada posición
            pElement.textContent = `Latitud: ${latitude}, Longitud: ${longitude}, Fecha y Hora: ${dateTime}`; // Asignar el contenido al elemento de párrafo

            locationInfoElement.appendChild(pElement); // Agregar el elemento de párrafo al elemento contenedor en el HTML
        });
    } else {
        locationInfoElement.innerHTML = '<p>No hay historial de posiciones.</p>'; // Mostrar un mensaje si no hay historial de posiciones
    }
}

// Función para almacenar una nueva posición en el historial y en localStorage
function storeLocation(position) {
    const location = {
        coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },
        timestamp: position.timestamp
    };

    let locationHistory = JSON.parse(localStorage.getItem('locationHistory')) || []; // Obtener el historial de posiciones almacenado o inicializarlo como un arreglo vacío si no existe
    locationHistory.push(location); // Agregar la nueva posición al historial

    localStorage.setItem('locationHistory', JSON.stringify(locationHistory)); // Guardar el historial actualizado en localStorage
}

// Función para manejar la actualización de la geolocalización
function handleGeolocationUpdate(position) {
    const locationInfoElement = document.getElementById('location-info'); // Obtener el elemento HTML donde se mostrará la posición actual

    const { latitude, longitude } = position.coords; // Obtener la latitud y longitud de la posición actual
    const dateTime = getCurrentDateTime(); // Obtener la fecha y hora actual en formato legible

    const pElement = document.createElement('p'); // Crear un elemento de párrafo para mostrar la información de la posición actual
    pElement.textContent = `Latitud: ${latitude}, Longitud: ${longitude}, Fecha y Hora: ${dateTime}`; // Asignar el contenido al elemento de párrafo

    locationInfoElement.appendChild(pElement); // Agregar el elemento de párrafo al elemento contenedor en el HTML

    storeLocation(position); // Almacenar la posición actual en el historial
}

// Función para iniciar la geolocalización
function startGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(handleGeolocationUpdate); // Iniciar el seguimiento de la posición del usuario y llamar a la función handleGeolocationUpdate cada vez que se actualice la posición
    } else {
        alert('Tu navegador no admite la API de geolocalización.'); // Mostrar una alerta si el navegador no admite la API de geolocalización
    }
}

// Función para detener la geolocalización
function stopGeolocation() {
    navigator.geolocation.clearWatch(); // Detener el seguimiento de la geolocalización
}

// Función para eliminar el historial de posiciones
function clearHistory() {
    localStorage.removeItem('locationHistory'); // Eliminar el historial de posiciones almacenado en localStorage
    displayLocationHistory(); // Volver a mostrar el historial actualizado en la página
}

// Obtener los elementos del DOM y asignarles eventos

document.getElementById('start-btn').addEventListener('click', startGeolocation); // Asignar la función startGeolocation al evento click del botón "start"
document.getElementById('stop-btn').addEventListener('click', stopGeolocation); // Asignar la función stopGeolocation al evento click del botón "stop"
document.getElementById('clear-btn').addEventListener('click', clearHistory); // Asignar la función clearHistory al evento click del botón "clear"

displayLocationHistory(); // Mostrar el historial al cargar la página

