
async function obtenerUsuarios() { //obtener usuarios
  try {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/users'); //solicitud para obtener los usuarios
    const usuarios = await respuesta.json(); //convierto la respuesta en formato JSON
    mostrarUsuarios(usuarios); //llamo a la función para mostrar los usuarios en la interfaz
  } catch (error) {
    console.error('Error:', error); //sino imprimo el mensaje de error en la consola
  }
}


function mostrarUsuarios(usuarios) { //mostrar los usuarios en la interfaz
  let contenedorUsuarios = document.getElementById('userContainer');
  contenedorUsuarios.innerHTML = '';

  
  usuarios.forEach(usuario => { //recorro la lista de usuarios y crear un elemento HTML para cada uno
    let elementoUsuario = document.createElement('div');
    elementoUsuario.innerHTML = `<h2>${usuario.name}</h2><p>Nombre de usuario: ${usuario.username}</p><p>Sitio web: ${usuario.website}</p>`;
    contenedorUsuarios.appendChild(elementoUsuario);
  });
}


document.getElementById('getUsersButton').addEventListener('click', obtenerUsuarios); //escucho el evento click del botón y llamar a la función para obtener usuarios
