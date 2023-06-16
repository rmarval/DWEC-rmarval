// Función para obtener los detalles de un post y sus comentarios
async function getPostDetails(post) {
  try {
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`); // Obtener los detalles del post
    const postDetails = await postResponse.json(); // Convertir la respuesta en formato JSON
    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`); // Obtener los comentarios del post
    const comments = await commentsResponse.json(); // Convertir la respuesta en formato JSON
    displayPostDetails(postDetails, comments); // Llamar a la función para mostrar los detalles del post y los comentarios
  } catch (error) {
    console.error('Error:', error); // En caso de error, imprimir el mensaje de error en la consola
  }
}

// Función para mostrar los detalles del post y los comentarios en la interfaz
function displayPostDetails(post, comments) {
  let postContainer = document.getElementById('postContainer');
  let commentsContainer = document.getElementById('commentsContainer');
  postContainer.innerHTML = '';
  commentsContainer.innerHTML = '';

  // Mostrar los detalles del post
  let postElement = document.createElement('div');
  postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
  postContainer.appendChild(postElement);

  // Mostrar los comentarios del post
  comments.forEach(comment => {
    let commentElement = document.createElement('div');
    commentElement.innerHTML = `<h4>${comment.name}</h4><p>${comment.body}</p>`;
    commentsContainer.appendChild(commentElement);
  });
}

// Escuchar el evento click del botón para obtener los detalles del post
document.getElementById('getPostButton').addEventListener('click', async () => {
  const post = { id: 1, title: 'Sample Post' }; // Datos ficticios del post
  await getPostDetails(post); // Llamar a la función para obtener los detalles del post
});


