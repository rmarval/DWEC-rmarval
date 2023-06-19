import { productos } from '/productos.js'; //importo archivo



const inputBusqueda = document.querySelector("#input-busqueda"); //obtengo el input de búsqueda
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria"); //esto trae todos los botones del document
const tituloPrincipal = document.querySelector("#titulo-principal");

let numerillo = document.querySelector("#numerillo");

//PAGINACION
const productosPorPagina = 4; //productos por página
let paginaActual = 1; //donde se posiciona la página
let productosFiltrados = []; //array vacio de los productos filtrados











function cargarProductos() {
    //PAGINACION
    const startIndex = (paginaActual - 1) * productosPorPagina;
    const endIndex = startIndex + productosPorPagina; //calculado es la suma del índice de inicio y la cantidad de productos por página.
    const productosPaginados = productosFiltrados.slice(startIndex, endIndex); //extrae los productos filtrados según los índices de inicio y fin, desde hasta...


    contenedorProductos.innerHTML = ""; // Vaciar el contenedor de productos

    if (productosPaginados.length === 0) {
        contenedorProductos.innerHTML = "No se encontraron productos.";
        return; // Salir de la función si no hay productos para mostrar
    }



    productosPaginados.forEach(producto => {
        const div = document.createElement("div"); //creo un div en el documento html
        div.classList.add("producto"); //le añado la clase producto
        div.innerHTML = `<img class="producto-imagen" src="${producto.imagenes[0]}" alt="">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">${producto.precio}€</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>`;

        const img = div.querySelector(".producto-imagen"); //obtengo la imagen dentro del div
        img.style.cursor = "pointer"; //le pongo un cursor al pasar por encima la imagen
        //agregar un evento de clic a la imagen para redireccionar a los detalles del producto
        img.addEventListener("click", () => {
            //al hacer clic en la imagen, redirigir a la página de detalles con el ID del producto en la URL
            window.location.href = `paginadetalles.html?id=${producto.id}`;
        });

        contenedorProductos.appendChild(div); //agrego el elemento 'div' al contenedor de productos del html

    });

    actualizarBotonesAgregar(); // Cada vez que se carguen productos se ejecutarán las funciones

}






//FILTRO PAGINACION Y BUSQUEDA
function filtrarProductos(categoriaSeleccionada) {
    if (categoriaSeleccionada === "todos") { //si la categoria es todos, cargo todos los productos
        productosFiltrados = productos; //estos serán los productos
        tituloPrincipal.innerHTML = "Todos los Juegos"; //este sera este titulo
    } else {
        productosFiltrados = productos.filter(producto => producto.categoria.id === categoriaSeleccionada); //se filtran los productos por la categoría seleccionada
        const productoCategoria = productos.find(producto => producto.categoria.id === categoriaSeleccionada); //el producto buscado de referencia para obtener el nombre de la categoría
        tituloPrincipal.innerHTML = productoCategoria.categoria.nombre; //con esto muestro el titulo que le corresponde a cada categoria
    }
    paginaActual = 1; //asi cuando cambio de categoria vuelve al principio siempre
    cargarProductos(); //cargo los productos
}






//BUSCADOR
function buscarProductos(termino) {
    const terminoMinusculas = termino.toLowerCase(); //pasamos lo que escribamos del input a minuscula
    productosFiltrados = productos.filter(producto => {
        // Verificar si el término de búsqueda coincide con el nombre, categoría o descripción del producto
        const nombre = producto.titulo.toLowerCase();
        const categoria = producto.categoria.nombre.toLowerCase();
        const descripcion = producto.descripcion.toLowerCase();
        
        if (getActiveCategoria() === "todos") { //si la categoria es todos
            //se retorna lo que coincida
            return nombre.includes(terminoMinusculas) || categoria.includes(terminoMinusculas) || descripcion.includes(terminoMinusculas);
        } else {
            //solo se mostrarán los productos que coincidan con la búsqueda y la categoría seleccionada
            return nombre.includes(terminoMinusculas) && producto.categoria.id === getActiveCategoria();
        }

    });

    cargarProductos(); //cargo los productos
}






//categoría activa
function getActiveCategoria() {
    let categoriaSeleccionada = ""; // Variable para almacenar la categoría seleccionada
    botonesCategorias.forEach(boton => {
        if (boton.classList.contains("active")) {
            categoriaSeleccionada = boton.id; // Si el botón tiene la clase "active", se asigna su id como categoría seleccionada
        }
    });
    return categoriaSeleccionada; // Devuelve la categoría seleccionada
}





//USO BUSQUEDA
inputBusqueda.addEventListener("input", () => {
    const terminoBusqueda = inputBusqueda.value.trim(); //obtengo el valor del input y eliminar espacios en blanco al inicio y al final

    if (terminoBusqueda !== "") { //si el input no esta vacio
        buscarProductos(terminoBusqueda); //buscamos por filtro
    } else {
        cargarProductos(); //si el input está vacío, cargo todos los productos
    }
});








//Para que cuando le haga click a alguna de las categorias...
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active")); //borramos el active

        e.currentTarget.classList.add("active"); //y lo ponemos en activo según la categoria donde clickemos

        const categoriaSeleccionada = e.currentTarget.id; //la categoria seleccionada
        filtrarProductos(categoriaSeleccionada); //filtramos segun la categoria selecionada
    });
});









//BOTONES AGREGAR
function actualizarBotonesAgregar() {
    let botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito); //para que al hacer click en cualquier boton se agrege mostrado
    });
}










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
        //ademas de crear la propiedad cantidad
    } else { //si el producto no está en el carrito

        productoAgregado.cantidad = 1; //se pone la cantidad del producto en 1
        productosEnCarrito.push(productoAgregado); //hacemos push del producto al carrito

    }
    //console.log(productosEnCarrito); //para chekear que funciona el conteo de cantidad y demás

    actualizarNumerillo(); //cada vex que le demos a agregar algo que se actualize el numerillo del carrito
    //LOCALSTORAGE 
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito)); //lo pasamos el carrito al localstorage
}







//NUMERILLO
function actualizarNumerillo() {
    let nuevoNumerillo = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0); //sumo todas las cantidades de cada producto desde 0
    //console.log(nuevoNumerillo); //verificO
    numerillo.innerHTML = nuevoNumerillo; //para mostrar en el html
}







//LOCALSTORAGE
const productosEnCarritoLS = JSON.parse(localStorage.getItem("carrito")); //recupero el carrito


let productosEnCarrito; //declaro de la variable para almacenar los productos en el carrito

if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS; //si hay datos en el carrito almacenados en LocalStorage, sera 'productosEnCarrito' que es lo recuperado de LS
    actualizarNumerillo();  //para actualizar el contador del carrito
} else {
    productosEnCarrito = []; //sino hay nada en el carrito almacenado en LocalStorage, se deja vacio
}











//PAGINACION
function irAPaginaSiguiente() {
    if (paginaActual < Math.ceil(productosFiltrados.length / productosPorPagina)) { //verifico si la página actual es menor que la última página
        paginaActual++; //si es asi la incremento
    } else {
        paginaActual = 1; //sino vuelve a la primera página
    }
    cargarProductos(); //cargo los productos

}

function irAPaginaAnterior() {
    let ultimapagina = Math.ceil(productosFiltrados.length / productosPorPagina);
    if (paginaActual > 1) { //verifico si la página actual es mayor que la primera página

        paginaActual--; //decremento el número de página actual
    } else {
        paginaActual = ultimapagina; //sino vuelve a la ultima página
    }
    cargarProductos();//cargo los productos


}

document.getElementById("paginaAnterior").addEventListener("click", irAPaginaAnterior); //boton anterior
document.getElementById("paginaSiguiente").addEventListener("click", irAPaginaSiguiente); //boton siguiente



filtrarProductos("todos"); //asi cargo todos los productos 