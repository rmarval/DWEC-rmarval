import { productos } from './productos.js';

function mostrarDestacados() {
    //filtro los juegos más vendidos
    const masVendidos = productos.filter(producto => producto.ventas >= 15);

    //filtro los juegos en promoción
    const enPromocion = productos.filter(producto => producto.enPromocion);

    let prod = [...productos];
    //console.log(prod);
    //ordeno las ventas
    prod.sort((a, b) => {
        return a.ventas - b.ventas;
    });

    //console.log(prod);
    //////////////////VENDIDOS
    function mostrarVentas(array) {
        const contenedorMasVendidos = document.getElementById('mas-vendidos');
        //recorro los juegos más vendidos
        array.forEach(producto => {

            const contenedorJuego = document.createElement('div'); //creo el contenedor del juego más vendido
            contenedorJuego.className = 'col-6'; //para el bootstrap


            //agrego la segunda imagen del juego más vendido
            const img = document.createElement('img');
            img.style.cursor = 'pointer'; //para añadirle el cursor
            img.src = producto.imagenes[1];
            contenedorJuego.appendChild(img);
            img.style.cursor = 'pointer';



            //agrego un evento de clic a la imagen para redireccionar a los detalles de x producto
            img.addEventListener('click', () => {
                //al hacer clic en la imagen, redirigira a la página de detalles con el id del producto en la URL
                window.location.href = `paginadetalles.html?id=${producto.id}`;
            });

            //agrego el título del juego más vendido
            const titulo = document.createElement('h1');
            titulo.style.color = "brown";
            titulo.textContent = producto.titulo;
            contenedorJuego.appendChild(titulo);

            //agrego el número de ventas del juego más vendido
            const ventas = document.createElement('h4');
            ventas.style.color = "yellow"; //cambiar el color de las ventas
            ventas.textContent = `Ventas: ${producto.ventas} copias`;
            contenedorJuego.appendChild(ventas);

            //agrego el juego más vendido al contenedor
            contenedorMasVendidos.appendChild(contenedorJuego);

        })

    }
    //mostrarProductos(masVendidos);
    mostrarVentas(prod.slice(0, 5));
    

    /////////////////PROMOCION
    const contenedorEnPromocion = document.getElementById('en-promocion');

    //itero sobre los juegos en promoción y generar el HTML correspondiente
    enPromocion.forEach(producto => {
        //creo el contenedor del juego en promoción
        const contenedorJuego = document.createElement('div');
        contenedorJuego.className = 'col-6';

        //añado la segunda imagen del juego en promoción
        const img = document.createElement('img');
        img.src = producto.imagenes[1];
        contenedorJuego.appendChild(img);




        //el evento de clic a la imagen para redireccionar a los detalles del producto
        img.addEventListener('click', () => {
            // Al hacer clic en la imagen, redirigir a la página de detalles con el ID del producto en la URL
            window.location.href = `paginadetalles.html?id=${producto.id}`;
        });





        //agregar el título del juego en promoción
        const titulo = document.createElement('h1');
        titulo.style.color = "brown";
        titulo.textContent = producto.titulo;
        contenedorJuego.appendChild(titulo);

        //agregar el precio del juego en promoción
        const precio = document.createElement('h4');
        precio.style.color = "green";
        precio.textContent = "OFERTA: ¡" + producto.precio + "€!";
        contenedorJuego.appendChild(precio);

        //agrego el juego en promoción al contenedor
        contenedorEnPromocion.appendChild(contenedorJuego);
    });
}

mostrarDestacados();


