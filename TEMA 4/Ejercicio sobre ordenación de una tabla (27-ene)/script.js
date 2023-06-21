//obtengo la tabla y las filas de datos
let tabla = document.getElementById("grid"); 
let cuerpoTabla = tabla.getElementsByTagName("tbody")[0]; //uerpo de la tabla pero accedo al primero
let filas = Array.from(cuerpoTabla.getElementsByTagName("tr")); //convierto las filas en un array

let encabezados = Array.from(tabla.getElementsByTagName("th")); //obtengo los encabezados de columna
//agrego evento de clic a los elementos <th>
encabezados.forEach(function (encabezado, indice) {
  encabezado.addEventListener("click", function () {
    
    let tipoDatos = encabezado.getAttribute("data-type"); //obtengo el tipo de datos del encabezado actual

    
    filas.sort(function (a, b) { //ordeno las filas como en el ejercicio de la tienda online
      let valorA = obtenerValorDato(a.cells[indice]); //obtengo los valores de las celdas correspondientes en las columnas actuales a y b
      let valorB = obtenerValorDato(b.cells[indice]);

      if (tipoDatos === "number") {
        return valorA - valorB; //ordeno numéricamente
      } else if (tipoDatos === "string") {
        return valorA.localeCompare(valorB); //ordenar alfabéticamente
      }

      return 0;
    });

    
    filas.forEach(function (fila) {
      cuerpoTabla.appendChild(fila); //vuelvo a colocar las filas ordenadas al cuerp
    });
  });
});

function obtenerValorDato(celda) { //función para obtener el valor de los elementos de datos
  if (celda.getAttribute("data-type") === "number") {
    return parseInt(celda.textContent); //convierto el valor si es un dato numérico
  } else {
    return celda.textContent.toLowerCase(); // Convertir el valor a minúsculas si es un dato de texto
  }
}
