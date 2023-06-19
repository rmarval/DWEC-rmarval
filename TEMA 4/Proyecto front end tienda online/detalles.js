import { productos } from './productos.js';



const urlParams = new URLSearchParams(window.location.search); //obtengo el ID del producto de la URL
const productoId = urlParams.get('id');  //se obtiene el valor del parámetro 'id' de la URL


const producto = productos.find(producto => producto.id === productoId); //busco el producto correspondiente al ID


if (producto) { //verifico si se encontró el producto

    //cargo la información del producto en la página de detalles
    document.getElementById('titulo').textContent = producto.titulo;
    document.getElementById('descripcion').textContent = producto.descripcion;
    document.getElementById('ventas').textContent = `Ventas: ${producto.ventas} unidades`;
    document.getElementById('precio').textContent = `Precio: ${producto.precio}€`;
    document.getElementById('stock').textContent = `Stock: x ${producto.stock}`;

    //EL BOTON para agregar al carrito
    const boton = document.querySelector('button'); //recojo el primer elemento <button> del documento y lo asigno a la variable "boton".
    boton.id = producto.id; //pongo el id del producto al atributo "id" del botón. Esto me permite identificar qué producto se agregará al carrito cuando se haga clic en el botón.
    boton.addEventListener("click", agregarAlCarrito); //ejecuto


    const contenedorImagenes = document.getElementById('imagenes');

    producto.imagenes.forEach(imagenUrl => {
        const img = document.createElement('img');
        img.src = imagenUrl;
        img.classList.add('imagen-detalle'); //agrego la clase 'imagen-producto' a la imagen para meterle estilos
        contenedorImagenes.appendChild(img); //agrego el elemento 'img' al contenedor imagenes del html
    });
}






/////////////////////////////////////////////////////

//AGREGAR AL CARRITO
function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id; //el id del boton
    //console.log(idBoton); //aqui solo chekeo que al darle se recoja cada id correctamente

    const productoAgregado = productos.find(producto => producto.id === idBoton);
    //console.log(productoAgregado); //aqui solo chekeo que al darle se recoja el producto u objeto entero

    const productoEnCarrito = productosEnCarrito.find(producto => producto.id === idBoton);
    //busco en el carrito si ya existe un producto con el mismo id que el botón actual

    if (productoEnCarrito) { //si el producto ya está en el carrito

        productoEnCarrito.cantidad++; //incremento la cantidad del producto en 1

    } else { //si el producto no está en el carrito

        productoAgregado.cantidad = 1; //se pone la cantidad del producto en 1
        productosEnCarrito.push(productoAgregado); //hacemos push del producto al carrito

    }
    //console.log(productosEnCarrito); //para chekear que funciona el conteo de cantidad y demás
    actualizarNumerillo();
    //LOCALSTORAGE 
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito)); //lo pasamos el carrito al localstorage
}

//NUMERILLO
function actualizarNumerillo() {
    let nuevoNumerillo = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0); //sumo todas las cantidades de cada producto desde 0
    //console.log(nuevoNumerillo); //verificO
    numerillo.innerHTML = nuevoNumerillo; //para mostrar en el html
}

let productosEnCarrito; //declaro de la variable para almacenar los productos en el carrito
productosEnCarrito = JSON.parse(localStorage.getItem("carrito")); //recojo del localstorage
if (!productosEnCarrito) {
    productosEnCarrito = [];
} else {
    actualizarNumerillo();
    productosEnCarrito;
}