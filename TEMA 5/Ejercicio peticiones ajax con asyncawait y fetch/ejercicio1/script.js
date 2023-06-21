let datosUsuarios = []; // datos de los usuarios para acceder a ellos luego
let datosPosts = []; // datos de los posts del usuario


async function obtenerUsuarios() { //obtengo información de los usuarios
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const usuarios = await response.json();
    datosUsuarios = usuarios; //almaceno datos de los usuarios
    mostrarUsuarios(usuarios);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
  }
}

function mostrarUsuarios(usuarios) { //muestro lista de usuarios
  let contenedorUsuarios = document.getElementById("userContainer");
  contenedorUsuarios.innerHTML = "";

  usuarios.forEach(usuario => { //recorro cada usuario y mostrar sus detalles
    let elementoUsuario = document.createElement("div");
    elementoUsuario.innerHTML = "<h2>" + usuario.name + "</h2><p>Nombre de usuario: " + usuario.username + "</p><p>Sitio web: " + usuario.website + "</p>";

    let botonPosts = document.createElement("button"); //boton para ver los posts del usuario
    botonPosts.innerText = "Ver posts";
    botonPosts.dataset.userId = usuario.id;

    elementoUsuario.appendChild(botonPosts);
    contenedorUsuarios.appendChild(elementoUsuario);
  });

  contenedorUsuarios.addEventListener("click", async function (event) {
    if (event.target.tagName === "BUTTON" && event.target.dataset.userId) {
      let userId = event.target.dataset.userId;
      obtenerPosts(userId);
    }
  });

  let botonVolver = document.createElement("button"); //botn para volver a la lista de usuarios
  botonVolver.innerText = "Volver a la lista de usuarios";
  botonVolver.addEventListener("click", function () {
    ocultarPosts();
  });

  contenedorUsuarios.appendChild(botonVolver);
}


async function obtenerPosts(idUsuario) { //obtengo los posts de un usuario
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${idUsuario}/posts`);
    const posts = await response.json();
    datosPosts = posts; //almaceno datos de los posts del usuario
    mostrarPosts(posts);
  } catch (error) {
    console.error("Error al obtener los posts:", error);
  }
}

function mostrarPosts(posts) { //muestro lista de posts de un usuario
  let contenedorUsuarios = document.getElementById("userContainer");
  let contenedorPosts = document.getElementById("postsContainer");
  let contenedorPost = document.getElementById("postContainer");

  contenedorUsuarios.style.display = "none"; //oculto lista de usuarios
  contenedorPosts.innerHTML = ""; //limpio el contenedor de posts
  contenedorPost.innerHTML = ""; //limpio el contenedor del post

  posts.forEach(post => { //recorro cada post y mostrar su título
    let elementoPost = document.createElement("div");
    elementoPost.innerHTML = "<h3>" + post.title + "</h3>";

    let botonVerPost = document.createElement("button"); //boton para ver los detalles del post
    botonVerPost.innerText = "Ver post";
    botonVerPost.dataset.postId = post.id;

    elementoPost.appendChild(botonVerPost);
    contenedorPosts.appendChild(elementoPost);
  });

  contenedorPosts.addEventListener("click", async function (event) {
    if (event.target.tagName === "BUTTON" && event.target.dataset.postId) {
      let postId = event.target.dataset.postId;
      obtenerDetallesPost(postId);
    }
  });

  let botonVolver = document.createElement("button"); //boton para volver a la lista de usuarios
  botonVolver.innerText = "Volver a la lista de usuarios";
  botonVolver.addEventListener("click", function () {
    ocultarDetallesPost();
  });

  contenedorPosts.appendChild(botonVolver);
  contenedorPosts.style.display = "block"; //muestro el contenedor de posts
}

function obtenerDetallesPost(postId) { //obtengo los detalles de un post
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => response.json())
    .then(detallesPost => {
      obtenerComentarios(detallesPost);
    })
    .catch(error => {
      console.error("Error al obtener los detalles del post:", error);
    });
}

async function obtenerComentarios(post) { //obtengo los comentarios de un post
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
    const comentarios = await response.json();
    mostrarDetallesPost(post, comentarios);
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
  }
}

function mostrarDetallesPost(post, comentarios) {
  let contenedorPosts = document.getElementById("postsContainer"); //muestor los detalles de un post y sus comentarios
  let contenedorPost = document.getElementById("postContainer");
  let contenedorComentarios = document.getElementById("commentsContainer");

  contenedorPosts.style.display = "none"; //oculto lista de posts
  contenedorPost.innerHTML = ""; //limpio el contenedor del post
  contenedorComentarios.innerHTML = ""; //limpio el contenedor de comentarios

  let usuario = datosUsuarios.find(usuario => usuario.id === post.userId); //encuentro el usuario correspondiente al post

  let elementoPost = document.createElement("div");
  elementoPost.innerHTML = "<h2>" + usuario.username + "</h2><h3>" + post.title + "</h3><p>" + post.body + "</p>";
  contenedorPost.appendChild(elementoPost);

  comentarios.forEach(comentario => { //muestro comentarios del post
    let elementoComentario = document.createElement("div");
    elementoComentario.innerHTML = "<h4>" + comentario.name + "</h4><p>" + comentario.body + "</p>";
    contenedorComentarios.appendChild(elementoComentario);
  });

  let botonVolver = document.createElement("button");
  botonVolver.innerText = "Volver a la lista de usuarios"; //boton para volver a la lista de usuarios
  botonVolver.addEventListener("click", function () {
    ocultarDetallesPost();
  });

  let botonVolverPosts = document.createElement("button"); //boton para volver a la lista de posts del usuario
  botonVolverPosts.innerText = "Volver a la lista de posts del usuario";
  botonVolverPosts.addEventListener("click", function () {
    mostrarPosts(datosPosts);
  });

  contenedorPost.appendChild(botonVolver);
  contenedorPost.appendChild(botonVolverPosts);
  contenedorPost.style.display = "block"; //muestro el contenedor del post
  contenedorComentarios.style.display = "block"; //muestro el contenedor de comentarios
}

function ocultarPosts() {
  let contenedorUsuarios = document.getElementById("userContainer"); //oculto los contenedores de posts y comentarios
  let contenedorPosts = document.getElementById("postsContainer");
  let contenedorPost = document.getElementById("postContainer");
  let contenedorComentarios = document.getElementById("commentsContainer");

  contenedorUsuarios.style.display = "block"; //muestro lista de usuarios
  contenedorPosts.style.display = "none"; //oculto lista de posts
  contenedorPost.style.display = "none"; //oculto el contenedor del post
  contenedorComentarios.style.display = "none"; //oculto el contenedor de comentarios
}

function ocultarDetallesPost() {//oculto el contenedor de detalles del post y comentarios
  let contenedorPosts = document.getElementById("postsContainer");
  let contenedorPost = document.getElementById("postContainer");
  let contenedorComentarios = document.getElementById("commentsContainer");

  contenedorPosts.style.display = "block"; //muestro lista de posts
  contenedorPost.style.display = "none"; //oculto el contenedor del post
  contenedorComentarios.style.display = "none"; //oculto el contenedor de comentarios
}

document.getElementById("getUsersButton").addEventListener("click", obtenerUsuarios); //evento para obtener los usuarios al hacer clic en un botón
