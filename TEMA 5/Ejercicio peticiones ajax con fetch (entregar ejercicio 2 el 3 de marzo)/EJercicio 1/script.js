let usersData = []; // Almacenar datos de los usuarios para acceder a ellos posteriormente
let postsData = []; // Almacenar datos de los posts del usuario

// Obtener información de los usuarios
function getUsers() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      let users = JSON.parse(xhr.responseText);
      usersData = users; // Almacenar datos de los usuarios
      displayUsers(users);
    }
  };

  xhr.send();
}

// Mostrar lista de usuarios
function displayUsers(users) {
  let userContainer = document.getElementById("userContainer");
  userContainer.innerHTML = "";

  // Recorrer cada usuario y mostrar sus detalles
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    let userElement = document.createElement("div");
    userElement.innerHTML = "<h2>" + user.name + "</h2><p>Username: " + user.username + "</p><p>Website: " + user.website + "</p>";

    // Botón para ver los posts del usuario
    let postsButton = document.createElement("button");
    postsButton.innerText = "Ver posts";
    postsButton.addEventListener("click", function () {
      getPosts(user.id);
    });

    userElement.appendChild(postsButton);
    userContainer.appendChild(userElement);
  }

  // Botón para volver a la lista de usuarios
  let backButton = document.createElement("button");
  backButton.innerText = "Volver a la lista de usuarios";
  backButton.addEventListener("click", function () {
    hidePosts();
  });

  userContainer.appendChild(backButton);
}

// Obtener los posts de un usuario
function getPosts(userId) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://jsonplaceholder.typicode.com/users/${userId}/posts`, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      let posts = JSON.parse(xhr.responseText);
      postsData = posts; // Almacenar datos de los posts del usuario
      displayPosts(posts);
    }
  };

  xhr.send();
}

// Mostrar lista de posts de un usuario
function displayPosts(posts) {
  let userContainer = document.getElementById("userContainer");
  let postsContainer = document.getElementById("postsContainer");
  let postContainer = document.getElementById("postContainer");

  userContainer.style.display = "none"; // Ocultar lista de usuarios
  postsContainer.innerHTML = ""; // Limpiar el contenedor de posts
  postContainer.innerHTML = ""; // Limpiar el contenedor del post

  // Recorrer cada post y mostrar su título
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let postElement = document.createElement("div");
    postElement.innerHTML = "<h3>" + post.title + "</h3>";

    // Botón para ver los detalles del post
    let viewPostButton = document.createElement("button");
    viewPostButton.innerText = "Ver post";
    viewPostButton.addEventListener("click", function () {
      getPostDetails(post);
    });

    postElement.appendChild(viewPostButton);
    postsContainer.appendChild(postElement);
  }

  // Botón para volver a la lista de usuarios
  let backButton = document.createElement("button");
  backButton.innerText = "Volver a la lista de usuarios";
  backButton.addEventListener("click", function () {
    hidePosts();
  });

  postsContainer.appendChild(backButton);
  postsContainer.style.display = "block"; // Mostrar el contenedor de posts
}

// Obtener los detalles de un post
function getPostDetails(post) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://jsonplaceholder.typicode.com/posts/${post.id}`, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      let postDetails = JSON.parse(xhr.responseText);
      getComments(postDetails);
    }
  };

  xhr.send();
}

// Obtener los comentarios de un post
function getComments(post) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      let comments = JSON.parse(xhr.responseText);
      displayPostDetails(post, comments);
    }
  };

  xhr.send();
}

// Mostrar los detalles de un post y sus comentarios
function displayPostDetails(post, comments) {
  let postsContainer = document.getElementById("postsContainer");
  let postContainer = document.getElementById("postContainer");
  let commentsContainer = document.getElementById("commentsContainer");

  postsContainer.style.display = "none"; // Ocultar lista de posts
  postContainer.innerHTML = ""; // Limpiar el contenedor del post
  commentsContainer.innerHTML = ""; // Limpiar el contenedor de comentarios

  let user = usersData.find((user) => user.id === post.userId); // Encontrar el usuario correspondiente al post

  // Mostrar detalles del post
  let postElement = document.createElement("div");
  postElement.innerHTML = "<h2>" + user.username + "</h2><h3>" + post.title + "</h3><p>" + post.body + "</p>";
  postContainer.appendChild(postElement);

  // Mostrar comentarios del post
  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];
    let commentElement = document.createElement("div");
    commentElement.innerHTML = "<h4>" + comment.name + "</h4><p>" + comment.body + "</p>";
    commentsContainer.appendChild(commentElement);
  }

  // Botón para volver a la lista de usuarios
  let backButton = document.createElement("button");
  backButton.innerText = "Volver a la lista de usuarios";
  backButton.addEventListener("click", function () {
    hidePostDetails();
  });

  // Botón para volver a la lista de posts del usuario
  let backToPostsButton = document.createElement("button");
  backToPostsButton.innerText = "Volver a la lista de posts del usuario";
  backToPostsButton.addEventListener("click", function () {
    displayPosts(postsData);
  });

  postContainer.appendChild(backButton);
  postContainer.appendChild(backToPostsButton);
  postContainer.style.display = "block"; // Mostrar el contenedor del post
  commentsContainer.style.display = "block"; // Mostrar el contenedor de comentarios
}

// Ocultar los contenedores de posts y comentarios
function hidePosts() {
  let userContainer = document.getElementById("userContainer");
  let postsContainer = document.getElementById("postsContainer");
  let postContainer = document.getElementById("postContainer");
  let commentsContainer = document.getElementById("commentsContainer");

  userContainer.style.display = "block"; // Mostrar lista de usuarios
  postsContainer.style.display = "none"; // Ocultar lista de posts
  postContainer.style.display = "none"; // Ocultar el contenedor del post
  commentsContainer.style.display = "none"; // Ocultar el contenedor de comentarios
}

// Ocultar el contenedor de detalles del post y comentarios
function hidePostDetails() {
  let postsContainer = document.getElementById("postsContainer");
  let postContainer = document.getElementById("postContainer");
  let commentsContainer = document.getElementById("commentsContainer");

  postsContainer.style.display = "block"; // Mostrar lista de posts
  postContainer.style.display = "none"; // Ocultar el contenedor del post
  commentsContainer.style.display = "none"; // Ocultar el contenedor de comentarios
}

// Evento para obtener los usuarios al hacer clic en un botón
document.getElementById("getUsersButton").addEventListener("click", getUsers);
