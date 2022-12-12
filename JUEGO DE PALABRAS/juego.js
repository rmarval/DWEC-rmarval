'use strict';

const container = []; //contenedor para almacenar palabras
let puntuacion = 0;

function seleccionarletra() {
    //Creo array le introduzco las iniciales
    const letra = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const random = Math.floor(Math.random() * letra.length); //para aleatorizar array
    const seleccion = letra[random];
    //devolvemos letra random
    return seleccion;
}

function añadir() {
    const letrarandom = document.getElementById('seleccionar').textContent;
    const textoinput = document.getElementById('input-text').value;

    //Comparo con la primera inicial de cada palabra que introducimos en el array 
    if (letrarandom === textoinput[0]) {
        container.push(textoinput); //meto la nueva palabra en el array
        document.getElementById('puntuacion').textContent = puntuacion += 100; //incremento la puntuacion cada vez que añado palabra
    } else {
        alert('No empieza por la letra selecionada');
        document.getElementById('puntuacion').textContent = puntuacion -= 50; //resto por cada error la puntuacion
    }
    console.log(container); //solo para ver en consola si se esta añadiendo correctamente el array 

}



document.getElementById('seleccionar').textContent = seleccionarletra();
document.getElementById('formulario').addEventListener('submit', añadir);


