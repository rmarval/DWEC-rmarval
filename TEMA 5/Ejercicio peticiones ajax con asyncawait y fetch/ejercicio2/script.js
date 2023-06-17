
async function obtenerDetallesPost(post) { //obtener los detalles de un post y sus comentarios
  try {
    const respuestaPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`); //los detalles del post
    const detallesPost = await respuestaPost.json(); //convierto la respuesta en formato JSON
    const respuestaComentarios = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`); //los comentarios del post
    const comentarios = await respuestaComentarios.json(); //convierto la respuesta en formato JSON
    mostrarDetallesPost(detallesPost, comentarios); //llamo a la función para mostrar los detalles del post y los comentarios
  } catch (error) {
    console.error('Error:', error); //y sino imprimir el mensaje de error en la consola
  }
}

function mostrarDetallesPost(post, comentarios) {  //mostrar los detalles del post y los comentarios en la interfaz
  let contenedorPost = document.getElementById('postContainer');
  let contenedorComentarios = document.getElementById('commentsContainer');
  contenedorPost.innerHTML = '';
  contenedorComentarios.innerHTML = '';

  
  let elementoPost = document.createElement('div'); //muestro los detalles del post
  elementoPost.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
  contenedorPost.appendChild(elementoPost);

  
  comentarios.forEach(comentario => {//muesrto los comentarios del post
    let elementoComentario = document.createElement('div');
    elementoComentario.innerHTML = `<h4>${comentario.name}</h4><p>${comentario.body}</p>`;
    contenedorComentarios.appendChild(elementoComentario);
  });
}


document.getElementById('getPostButton').addEventListener('click', async () => { //escucho el evento click del botón para obtener los detalles del post
  const post = { id: 1, title: 'Ejemplo de post' }; //datos ficticios del post
  await obtenerDetallesPost(post); //llamo a la función para obtener los detalles del post
});



