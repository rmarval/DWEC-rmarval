function getUsers() {
    // Obtener la lista de usuarios
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';

        users.forEach(user => {
          // Crear un elemento de lista para cada usuario
          const li = document.createElement('li');
          li.innerHTML = `
            <strong>Nombre:</strong> ${user.name}<br>
            <strong>Nombre de usuario:</strong> ${user.username}<br>
            <strong>Sitio web:</strong> ${user.website}<br>
            <button onclick="showPosts(${user.id})">Ver posts</button>
            <hr>
          `;

          userList.appendChild(li);
        });
      });
  }

  function showPosts(userId) {
    // Obtener los posts de un usuario específico
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      .then(response => response.json())
      .then(posts => {
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';

        const backButton = document.createElement('button');
        backButton.innerHTML = 'Volver a la lista de usuarios';
        backButton.onclick = getUsers;
        userList.appendChild(backButton);

        const postList = document.createElement('ul');
        posts.forEach(post => {
          // Crear un elemento de lista para cada post
          const li = document.createElement('li');
          li.innerHTML = `
            <strong>Título:</strong> ${post.title}<br>
            <button onclick="showPost(${post.id})">Ver post</button>
          `;

          postList.appendChild(li);
        });

        userList.appendChild(postList);
      });
  }

  function showPost(postId) {
    // Obtener los detalles de un post específico
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => response.json())
      .then(post => {
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';

        const backButton = document.createElement('button');
        backButton.innerHTML = 'Volver a la lista de usuarios';
        backButton.onclick = getUsers;
        userList.appendChild(backButton);

        const postButton = document.createElement('button');
        postButton.innerHTML = 'Volver a la lista de posts del usuario';
        postButton.onclick = () => showPosts(post.userId);
        userList.appendChild(postButton);

        const postDetails = document.createElement('div');
        postDetails.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
          <hr>
        `;

        userList.appendChild(postDetails);

        // Obtener los comentarios del post
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
          .then(response => response.json())
          .then(comments => {
            const commentList = document.createElement('ul');
            comments.forEach(comment => {
              // Crear un elemento de lista para cada comentario
              const li = document.createElement('li');
              li.innerHTML = `
                <strong>Nombre:</strong> ${comment.name}<br>
                <strong>Contenido:</strong> ${comment.body}<br>
                <hr>
              `;

              commentList.appendChild(li);
            });

            userList.appendChild(commentList);
          });
      });
  }

  getUsers();