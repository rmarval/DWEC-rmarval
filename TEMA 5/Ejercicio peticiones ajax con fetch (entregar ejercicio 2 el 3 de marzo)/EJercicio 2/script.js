// Función para realizar una petición GET utilizando fetch
function fetchData(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
}

// Función para obtener la lista de usuarios y mostrarla en el contenedor
function getUsers() {
  // Obtener el contenedor de usuarios
  const userContainer = document.getElementById("userContainer");
  // Limpiar el contenido existente
  userContainer.innerHTML = "";

  // Realizar la petición GET a la API de usuarios
  fetchData('https://jsonplaceholder.typicode.com/users')
    .then(users => {
      // Iterar sobre los usuarios obtenidos
      users.forEach(user => {
        // Crear un elemento de usuario
        const userElement = document.createElement("div");
        // Establecer el contenido del elemento con los datos del usuario
        userElement.innerHTML = `<h2>${user.name}</h2><p>Username: ${user.username}</p><p>Website: ${user.website}</p>`;

        // Crear un botón para ver las tareas del usuario
        const tasksButton = document.createElement("button");
        tasksButton.innerText = "Ver tareas";
        // Asignar un evento click al botón para obtener las tareas del usuario
        tasksButton.addEventListener("click", function () {
          getTasks(user.id);
        });

        // Agregar el botón al elemento de usuario
        userElement.appendChild(tasksButton);
        // Agregar el elemento de usuario al contenedor
        userContainer.appendChild(userElement);
      });
    });
}

// Función para obtener las tareas pendientes y completadas de un usuario y mostrarlas en los contenedores
function getTasks(userId) {
  // Obtener los contenedores de tareas pendientes y completadas
  const todosContainer = document.getElementById("todosContainer");
  const completedTodosContainer = document.getElementById("completedTodosContainer");

  // Limpiar el contenido existente
  todosContainer.innerHTML = "";
  completedTodosContainer.innerHTML = "";

  // Realizar la petición GET a la API de tareas del usuario
  fetchData(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
    .then(tasks => {
      // Filtrar las tareas pendientes y completadas
      const pendingTasks = tasks.filter(task => !task.completed);
      const completedTasks = tasks.filter(task => task.completed);

      // Crear una lista para las tareas pendientes
      const pendingTasksList = document.createElement("ul");
      pendingTasksList.innerHTML = "<h3>Tareas pendientes:</h3>";

      // Iterar sobre las tareas pendientes y crear elementos de lista para cada una
      pendingTasks.forEach(task => {
        const taskElement = document.createElement("li");
        taskElement.innerText = task.title;
        pendingTasksList.appendChild(taskElement);
      });

      // Crear una lista para las tareas completadas
      const completedTasksList = document.createElement("ul");
      completedTasksList.innerHTML = "<h3>Tareas completadas:</h3>";

      // Iterar sobre las tareas completadas y crear elementos de lista para cada una
      completedTasks.forEach(task => {
        const taskElement = document.createElement("li");
        taskElement.innerText = task.title;
        completedTasksList.appendChild(taskElement);
      });

      // Agregar las listas de tareas pendientes y completadas a los contenedores correspondientes
      todosContainer.appendChild(pendingTasksList);
      completedTodosContainer.appendChild(completedTasksList);
    });
}

// Ejecutar la función getUsers al cargar la página
document.addEventListener("DOMContentLoaded", getUsers);
