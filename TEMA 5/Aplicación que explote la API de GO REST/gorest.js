const GOREST_API_KEY = '6c85a8e18b72ce4c4be952ee5f54250d1e924ebb174dbd564c3e52c43ba4f538';


function crearUsuario() { //para crear un nuevo usuario
  const id = document.getElementById('id').value;
  const name = document.getElementById('name').value; //obtengo los valores de los campos del formulario
  const email = document.getElementById('email').value;
  const gender = document.getElementById('gender').value;
  const status = document.getElementById('status').value;


  const nuevoUsuario = { //creo un objeto con los datos del nuevo usuario
    id: id,
    name: name,
    email: email,
    gender: gender,
    status: status
  };


  fetch("https://gorest.co.in/public/v2/users", { //realizo una solicitud POST para crear el usuario
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${GOREST_API_KEY}`,
      "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify(nuevoUsuario)
  })
    .then(response => {
      //verifico si la respuesta esta bien
      if (response.status !== 201) {
        console.log("Algo ha ido mal:", response.status);
      }
      return response.json();
    })
    .then(user => {

      alert("Nuevo Usuario Creado"); //muestro una alerta y registrar el usuario creado en la consola
      console.log("Nuevo Usuario Creado:", user);

      fetchUsuarios(); //actualizo la lista de usuarios después de crearla
    })
    .catch(console.log);
}


function fetchUsuarios() { //para obtener la lista de usuarios

  fetch("https://gorest.co.in/public/v2/users", { //realizo una solicitud GET para obtener los usuarios
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${GOREST_API_KEY}`,
      "Content-Type": "application/json"
    },
    method: 'GET'
  })
    .then(response => response.json())
    .then(usuarios => {

      mostrarUsuarios(usuarios); //muestro los usuarios en la página
    })
    .catch(console.log);
}


function mostrarUsuarios(usuarios) { //para mostrar los usuarios en una tabla

  const filas = usuarios.map(usuario => crearFila(usuario)).join(''); //genero las filas de la tabla utilizando el array de usuarios

  //actualizo el contenido HTML de la tabla de usuarios
  document.getElementById('user-table').innerHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Status</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${filas}
      </tbody>
    </table>`;
}


function crearFila(usuario) { //para crear una fila de la tabla de usuarios
  return `
    <tr>
      <td>${usuario.id}</td>
      <td><input style="padding: 20px;" type="text" id="name-${usuario.id}" value="${usuario.name}"></td>
      <td><input style="padding: 20px;" type="email" id="email-${usuario.id}" value="${usuario.email}"></td>
      <td>
        <select style="padding: 20px;" id="gender-${usuario.id}">
          <option value="Male" ${usuario.gender}>Male</option>
          <option value="Female" ${usuario.gender}>Female</option>
        </select>
      </td>
      <td>
        <select style="padding: 20px;" id="status-${usuario.id}">
          <option value="Active" ${usuario.status}>Active</option>
          <option value="Inactive" ${usuario.status}>Inactive</option>
        </select>
      </td>
      <td>
        <button onclick="modificarUsuario(${usuario.id})"><img width="30px" src="2091540.png" alt="">Actualizar</button>
        <button onclick="eliminarUsuario(${usuario.id})"><img width="30px" src="216684.png" alt="">Borrar</button>
      </td>
    </tr>`;
}


//para modificar un usuario existente
function modificarUsuario(usuarioId) {
  const name = document.getElementById(`name-${usuarioId}`).value;
  const email = document.getElementById(`email-${usuarioId}`).value;
  const gender = document.getElementById(`gender-${usuarioId}`).value;
  const status = document.getElementById(`status-${usuarioId}`).value;


  const usuarioModificado = {  //creo un objeto con los datos actualizados del usuario
    name: name,
    email: email,
    gender: gender,
    status: status
  };


  fetch(`https://gorest.co.in/public/v2/users/${usuarioId}`, {  //realizo una solicitud PUT para actualizar el usuario
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${GOREST_API_KEY}`,
      "Content-Type": "application/json"
    },
    method: 'PUT',
    body: JSON.stringify(usuarioModificado)
  })
    .then(response => {
      //verifico si la respuesta esta bien
      if (response.status !== 200) {
        console.log("Algo ha ido mal:", response.status);
      } else {
        alert("Usuario Modificado Correctamente");
        console.log("Usuario Modificado Correctamente");

        fetchUsuarios();//actualizo la lista de usuarios después de la modificación
      }
    })
    .catch(console.log);
}

//para eliminar un usuario existente
function eliminarUsuario(usuarioId) {

  fetch(`https://gorest.co.in/public/v2/users/${usuarioId}`, { //realizo una solicitud DELETE para eliminar el usuario
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${GOREST_API_KEY}`,
      "Content-Type": "application/json"
    },
    method: 'DELETE'
  })
    .then(response => {
      //verifico si la respuesta esta bien
      if (response.status !== 204) {
        console.log("Algo ha ido mal:", response.status);
      } else {

        alert("Usuario Borrado Correctamente");
        console.log("Usuario Borrado Correctamente");

        fetchUsuarios(); //actualizo la lista de usuarios después de la eliminación
      }
    })
    .catch(console.log);
}


fetchUsuarios(); //obtengo y muestro la lista de usuarios al cargar la página
