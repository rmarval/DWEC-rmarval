
async function obtenerDatos(url) { //para realizar una petición GET utilizando await
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function obtenerUsuarios() { //para obtener la lista de usuarios y mostrarla en el contenedor
  const contenedorUsuarios = document.getElementById("userContainer"); //obtengo el contenedor de usuarios
  contenedorUsuarios.innerHTML = ""; //limpio el contenido existente

  try {
    const usuarios = await obtenerDatos('https://jsonplaceholder.typicode.com/users'); //rwealizo la petición GET a la API de usuarios
    usuarios.forEach(usuario => { //itero sobre los usuarios obtenidos
      const elementoUsuario = document.createElement("div"); //creo un elemento de usuario
      elementoUsuario.innerHTML = `<h2>${usuario.name}</h2><p>Nombre de usuario: ${usuario.username}</p><p>Sitio web: ${usuario.website}</p>`; //establezco el contenido del elemento con los datos del usuario


      const botonTareas = document.createElement("button"); //creo un botón para ver las tareas del usuario
      botonTareas.innerText = "Ver tareas";
      botonTareas.dataset.usuarioId = usuario.id;

      elementoUsuario.appendChild(botonTareas); //agrego el botón al elemento de usuario
      contenedorUsuarios.appendChild(elementoUsuario); //agrego el elemento de usuario al contenedor
    });

    contenedorUsuarios.addEventListener("click", async function (event) {
      if (event.target.matches("button[data-usuario-id]")) { //verifico si el elemento clicado coincide con un botón que tiene el atributo 'data-usuario-id'
        const usuarioId = event.target.dataset.usuarioId; //obtengo el id de usuario del 'data-usuario-id' del botón click
        await obtenerTareas(usuarioId);
      }
    });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
  }
}

async function obtenerTareas(usuarioId) { //funcion para obtener las tareas pendientes y completadas de un usuario y mostrarlas en los contenedores
  const contenedorTareas = document.getElementById("todosContainer"); //obtengo los contenedores de tareas pendientes y completadas
  const contenedorTareasCompletadas = document.getElementById("completedTodosContainer");

  contenedorTareas.innerHTML = ""; //limpio el contenido existente
  contenedorTareasCompletadas.innerHTML = "";

  try {
    const tareas = await obtenerDatos(`https://jsonplaceholder.typicode.com/users/${usuarioId}/todos`); //realizo la petición GET a la API de tareas del usuario
    const tareasPendientes = tareas.filter(tarea => !tarea.completed); //filtro las tareas pendientes y completadas
    const tareasCompletadas = tareas.filter(tarea => tarea.completed);

    const listaTareasPendientes = document.createElement("ul"); //creo una lista para las tareas pendientes
    listaTareasPendientes.innerHTML = "<h3>Tareas pendientes:</h3>";

    tareasPendientes.forEach(tarea => { //itero sobre las tareas pendientes y crear elementos de lista para cada una
      const elementoTarea = document.createElement("li");
      elementoTarea.innerText = tarea.title;
      listaTareasPendientes.appendChild(elementoTarea);
    });

    const listaTareasCompletadas = document.createElement("ul"); //creo una lista para las tareas completadas
    listaTareasCompletadas.innerHTML = "<h3>Tareas completadas:</h3>";

    tareasCompletadas.forEach(tarea => { //itero sobre las tareas completadas y crear elementos de lista para cada un
      const elementoTarea = document.createElement("li");
      elementoTarea.innerText = tarea.title;
      listaTareasCompletadas.appendChild(elementoTarea);
    });

    contenedorTareas.appendChild(listaTareasPendientes); //agrego las listas de tareas pendientes y completadas a los contenedores correspondientes
    contenedorTareasCompletadas.appendChild(listaTareasCompletadas);
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
  }
}

//ejecuto la función obtenerUsuarios al cargar la página
document.addEventListener("DOMContentLoaded", obtenerUsuarios);
