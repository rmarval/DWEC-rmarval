const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const contenedorCarritoTotal = document.querySelector("#total");

const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

const productosEnCarrito = JSON.parse(localStorage.getItem("carrito")); //recupero el carrito


console.log(productosEnCarrito);

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) { //si hay productos en el carrito

        contenedorCarritoVacio.classList.add("disabled"); //para ocultar el mensaje de carrito vacio
        contenedorCarritoProductos.classList.remove("disabled"); //quito disabled de la clase
        contenedorCarritoAcciones.classList.remove("disabled"); //quito disabled de la clase
        contenedorCarritoComprado.classList.add("disabled"); //agrego la clase disabled



        contenedorCarritoProductos.innerHTML = ""; //vacio el innerhtml

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div"); //creo un div en el documento html
            div.classList.add("carrito-producto"); //le añado la clase 
            div.innerHTML = `<img class="carrito-producto-imagen" src="${producto.imagenes[0]}" alt="">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>${producto.precio}€</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Total</small>
                    <p>${producto.precio * producto.cantidad}€</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}">Eliminar</button>`;

            contenedorCarritoProductos.append(div); //agrego el elemento 'div' al contenedor de productos del html
        });
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar(); //para cada vez que se borre
    actualizarTotal(); //para cada vez que se muestre
}






function actualizarBotonesEliminar() {
    let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito); //para que al hacer click en cualquier boton se borre
    });
};







function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id; //obtengo el id del botón clicado
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton); //buscamoes el indice del id
    productosEnCarrito.splice(index, 1); //se eliminara 1 elemento desde el indice encontrado
    cargarProductosCarrito(); //volvemos a cargar para ver que se han borrado

    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito)); //altualizamos el localStorage del carrito
}








function actualizarTotal() {
    const iva = 0.21; //21%
    //calculo el total sumando el precio de cada producto multiplicado por su cantidad en el carrito
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

    const totalConIva = totalCalculado + (totalCalculado * iva); //total
    //actualizo el contenido del contenedor que muestra el total en el carrito
    contenedorCarritoTotal.innerHTML = `${totalConIva.toFixed(2)}€`; // Redondear a 2 decimales
}




function vaciarCarrito() {
    localStorage.clear("carrito"); //borro del ls
    location.reload(); //recargo la página actual 
}


botonVaciar.addEventListener("click", vaciarCarrito); //para vaciar el carrito

botonComprar.addEventListener("click", () => {
    alert("Se ha realizado la compra");
    vaciarCarrito();
});

cargarProductosCarrito(); //cargo el carrito