const contenedorListaUsuarios = document.getElementById('listaUsuarios');
const token = '6c85a8e18b72ce4c4be952ee5f54250d1e924ebb174dbd564c3e52c43ba4f538';



async function fetchAPI(url) { //función para realizar una petición
  const respuesta = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}` //incluyo el token de acceso en el encabezado de autorización
    }
  });
  const datos = await respuesta.json();
  return datos;
}



async function mostrarListaUsuarios() { //para mostrar la lista de usuarios
  const usuarios = await fetchAPI('https://gorest.co.in/public-api/users');

  let listaUsuariosHTML = '<ul>';
  usuarios.data.forEach(usuario => {
    listaUsuariosHTML += `<li>${usuario.name}</li>`; //se muestra el nombre del usuario en un elemento de lista
  });
  listaUsuariosHTML += '</ul>';

  contenedorListaUsuarios.innerHTML = listaUsuariosHTML; //actualizo el contenido del contenedor con la lista de usuarios
}

document.addEventListener('DOMContentLoaded', function() {
  mostrarListaUsuarios(); //llamo a la función para mostrar la lista de usuarios al cargar la página
});

