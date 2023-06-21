fetch('https://jsonplaceholder.typicode.com/posts') //obtengo los posts de cada uno de los objetos del array
    .then(response => response.json())
    .then(posts => {

        const fragmento = document.createDocumentFragment();  //creo un fragmento de código para añadir los elementos


        posts.forEach(post => { //recorro los posts y crear los elementos correspondientes
            const contenedorPost = document.createElement('div');
            contenedorPost.classList.add('contenedor-post');

            const tituloPost = document.createElement('h2');
            tituloPost.classList.add('titulo-post');
            tituloPost.textContent = post.title;

            const contenidoPost = document.createElement('p');
            contenidoPost.classList.add('contenido-post');
            contenidoPost.textContent = post.body;

            contenedorPost.appendChild(tituloPost);
            contenedorPost.appendChild(contenidoPost);

            fragmento.appendChild(contenedorPost);
        });


        const contenedorListaPosts = document.getElementById('listaPosts'); //añadop el fragmento al contenedor principal
        contenedorListaPosts.appendChild(fragmento);
    })
    .catch(error => {
        console.error('Error al obtener los posts:', error);
    });