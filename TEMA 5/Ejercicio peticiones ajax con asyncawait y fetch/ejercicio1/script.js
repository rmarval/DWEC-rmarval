
  // Función para obtener usuarios
async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users'); // Realizar una solicitud para obtener los usuarios
    const users = await response.json(); // Convertir la respuesta en formato JSON
    displayUsers(users); // Llamar a la función para mostrar los usuarios en la interfaz
  } catch (error) {
    console.error('Error:', error); // En caso de error, imprimir el mensaje de error en la consola
  }
}

// Función para mostrar los usuarios en la interfaz
function displayUsers(users) {
  let userContainer = document.getElementById('userContainer');
  userContainer.innerHTML = '';

  // Recorrer la lista de usuarios y crear un elemento HTML para cada uno
  users.forEach(user => {
    let userElement = document.createElement('div');
    userElement.innerHTML = `<h2>${user.name}</h2><p>Username: ${user.username}</p><p>Website: ${user.website}</p>`;
    userContainer.appendChild(userElement);
  });
}

// Escuchar el evento click del botón y llamar a la función para obtener usuarios
document.getElementById('getUsersButton').addEventListener('click', getUsers);

