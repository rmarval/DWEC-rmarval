function obtenerUsuarios() {
  
  fetch('https://jsonplaceholder.typicode.com/users') //obtengo la lista de usuarios
    .then(response => response.json())
    .then(usuarios => {
      const listaUsuarios = document.getElementById('user-list');
      listaUsuarios.innerHTML = '';

      usuarios.forEach(usuario => {
        
        const li = document.createElement('li'); //creo un elemento de lista para cada usuario
        li.innerHTML = `
          <strong>Nombre:</strong> ${usuario.name}<br>
          <strong>Nombre de usuario:</strong> ${usuario.username}<br>
          <strong>Sitio web:</strong> ${usuario.website}<br>
          <button onclick="mostrarPosts(${usuario.id})">Ver posts</button>
          <hr>
        `;

        listaUsuarios.appendChild(li);
      });
    });
}

function mostrarPosts(userId) {
  
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`) //obtengo los posts de un usuario específico
    .then(response => response.json())
    .then(posts => {
      const listaUsuarios = document.getElementById('user-list');
      listaUsuarios.innerHTML = '';

      const botonVolver = document.createElement('button');
      botonVolver.innerHTML = 'Volver a la lista de usuarios';
      botonVolver.onclick = obtenerUsuarios;
      listaUsuarios.appendChild(botonVolver);

      const listaPosts = document.createElement('ul');
      posts.forEach(post => {
        
        const li = document.createElement('li'); //creo un elemento de lista para cada post
        li.innerHTML = `
          <strong>Título:</strong> ${post.title}<br>
          <button onclick="mostrarPost(${post.id})">Ver post</button>
        `;

        listaPosts.appendChild(li);
      });

      listaUsuarios.appendChild(listaPosts);
    });
}

function mostrarPost(postId) {
  
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`) //obtengo los detalles de un post específico
    .then(response => response.json())
    .then(post => {
      const listaUsuarios = document.getElementById('user-list');
      listaUsuarios.innerHTML = '';

      const botonVolver = document.createElement('button');
      botonVolver.innerHTML = 'Volver a la lista de usuarios';
      botonVolver.onclick = obtenerUsuarios;
      listaUsuarios.appendChild(botonVolver);

      const botonVolverPosts = document.createElement('button');
      botonVolverPosts.innerHTML = 'Volver a la lista de posts del usuario';
      botonVolverPosts.onclick = () => mostrarPosts(post.userId);
      listaUsuarios.appendChild(botonVolverPosts);

      const detallesPost = document.createElement('div');
      detallesPost.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <hr>
      `;

      listaUsuarios.appendChild(detallesPost);

      
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`) //obtengo los comentarios del post
        .then(response => response.json())
        .then(comments => {
          const listaComentarios = document.createElement('ul');
          comments.forEach(comment => {
            
            const li = document.createElement('li'); //creo un elemento de lista para cada comentario
            li.innerHTML = `
              <strong>Nombre:</strong> ${comment.name}<br>
              <strong>Contenido:</strong> ${comment.body}<br>
              <hr>
            `;

            listaComentarios.appendChild(li);
          });

          listaUsuarios.appendChild(listaComentarios);
        });
    });
}

obtenerUsuarios();
