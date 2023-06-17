let datosUsuarios = []; // datos de los usuarios para acceder a ellos luego
let datosPosts = []; // datos de los posts del usuario


function obtenerUsuarios() { //obtengo información de los usuarios
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      let usuarios = JSON.parse(xhr.responseText);
      datosUsuarios = usuarios; //almaceno datos de los usuarios
      mostrarUsuarios(usuarios);
    }
  };

  xhr.send();
}


function mostrarUsuarios(usuarios) {//muestro lista de usuarios
  let contenedorUsuarios = document.getElementById("userContainer");
  contenedorUsuarios.innerHTML = "";

  
  for (let i = 0; i < usuarios.length; i++) {//recorro cada usuario y mostrar sus detalles
    let usuario = usuarios[i];
    let elementoUsuario = document.createElement("div");
    elementoUsuario.innerHTML = "<h2>" + usuario.name + "</h2><p>Nombre de usuario: " + usuario.username + "</p><p>Sitio web: " + usuario.website + "</p>";

    
    let botonPosts = document.createElement("button");//boton para ver los posts del usuario
    botonPosts.innerText = "Ver posts";
    botonPosts.addEventListener("click", function () {
      obtenerPosts(usuario.id);
    });

    elementoUsuario.appendChild(botonPosts);
    contenedorUsuarios.appendChild(elementoUsuario);
  }

  
  let botonVolver = document.createElement("button"); //botn para volver a la lista de usuarios
  botonVolver.innerText = "Volver a la lista de usuarios";
  botonVolver.addEventListener("click", function () {
    ocultarPosts();
  });

  contenedorUsuarios.appendChild(botonVolver);
}


function obtenerPosts(idUsuario) { //obtengo los posts de un usuario
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://jsonplaceholder.typicode.com/users/${idUsuario}/posts`, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      let posts = JSON.parse(xhr.responseText);
      datosPosts = posts; // Almacenar datos de los posts del usuario
      mostrarPosts(posts);
    }
  };

  xhr.send();
}


function mostrarPosts(posts) { //muestro lista de posts de un usuario
  let contenedorUsuarios = document.getElementById("userContainer");
  let contenedorPosts = document.getElementById("postsContainer");
  let contenedorPost = document.getElementById("postContainer");

  contenedorUsuarios.style.display = "none"; //oculto lista de usuarios
  contenedorPosts.innerHTML = ""; //limpio el contenedor de posts
  contenedorPost.innerHTML = ""; //limpio el contenedor del post

  
  for (let i = 0; i < posts.length; i++) { //recorro cada post y mostrar su título
    let post = posts[i];
    let elementoPost = document.createElement("div");
    elementoPost.innerHTML = "<h3>" + post.title + "</h3>";

    
    let botonVerPost = document.createElement("button"); //boton para ver los detalles del post
    botonVerPost.innerText = "Ver post";
    botonVerPost.addEventListener("click", function () {
      obtenerDetallesPost(post);
    });

    elementoPost.appendChild(botonVerPost);
    contenedorPosts.appendChild(elementoPost);
  }

 
  let botonVolver = document.createElement("button");   //boton para volver a la lista de usuarios
  botonVolver.innerText = "Volver a la lista de usuarios";
  botonVolver.addEventListener("click", function () {
    ocultarDetallesPost();
  });

  contenedorPosts.appendChild(botonVolver);
  contenedorPosts.style.display = "block"; //muestro el contenedor de posts
}


function obtenerDetallesPost(post) { //obtengo los detalles de un post
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://jsonplaceholder.typicode.com/posts/${post.id}`, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      let detallesPost = JSON.parse(xhr.responseText);
      obtenerComentarios(detallesPost);
    }
  };

  xhr.send();
}


function obtenerComentarios(post) { //obtengo los comentarios de un post
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      let comentarios = JSON.parse(xhr.responseText);
      mostrarDetallesPost(post, comentarios);
    }
  };

  xhr.send();
}


function mostrarDetallesPost(post, comentarios) {
  let contenedorPosts = document.getElementById("postsContainer"); //muestor los detalles de un post y sus comentarios
  let contenedorPost = document.getElementById("postContainer");
  let contenedorComentarios = document.getElementById("commentsContainer");

  contenedorPosts.style.display = "none"; //oculto lista de posts
  contenedorPost.innerHTML = ""; //limpio el contenedor del post
  contenedorComentarios.innerHTML = ""; //limpio el contenedor de comentarios

  let usuario = datosUsuarios.find((usuario) => usuario.id === post.userId); //encuentro el usuario correspondiente al post

  
  let elementoPost = document.createElement("div");
  elementoPost.innerHTML = "<h2>" + usuario.username + "</h2><h3>" + post.title + "</h3><p>" + post.body + "</p>"; //muestro detalles del post
  contenedorPost.appendChild(elementoPost);

  
  for (let i = 0; i < comentarios.length; i++) { //muestro comentarios del post
    let comentario = comentarios[i];
    let elementoComentario = document.createElement("div");
    elementoComentario.innerHTML = "<h4>" + comentario.name + "</h4><p>" + comentario.body + "</p>";
    contenedorComentarios.appendChild(elementoComentario);
  }

 
  let botonVolver = document.createElement("button");
  botonVolver.innerText = "Volver a la lista de usuarios";  //boton para volver a la lista de usuarios
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
