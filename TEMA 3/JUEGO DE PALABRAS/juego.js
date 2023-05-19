'use strict';

const container = []; //contenedor para almacenar palabras
let puntuacion = 0;
let contador = 0; //Inicializamos contador a 0
let timeout;

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
        if (!container.includes(textoinput)) {
            container.push(textoinput); //meto la nueva palabra en el array
            document.getElementById('puntuacion').textContent = puntuacion += 100; //incremento la puntuacion cada vez que añado palabra
            contador = 0;
        } else {
            alert('Has repetido la palabra, no se incluye');
            document.getElementById('puntuacion').textContent = puntuacion -= 50;
        }
    } else {
        alert('No empieza por la letra selecionada');
        document.getElementById('puntuacion').textContent = puntuacion -= 50; //resto por cada error la puntuacion
    }
    console.log(container); //solo para ver en consola si se esta añadiendo correctamente el array 
}

function actualizaContador() {
    document.getElementById('contador').textContent = ++contador; //Incrementamos contador

    if (timeout !== -1 && contador <= 6) {
        timeout = setTimeout(actualizaContador, 1000);

        document.getElementById('empezar').disabled = true; //con esto desabilito el boton 'start game' al hacer click
        document.getElementById('añadir').removeAttribute("disabled"); //asi habilito el boton de añadir al hacer click en empezar juego
        document.getElementById('input-text').removeAttribute("disabled"); //asi habilito el campo de texto al hacer click en empezar juego
    } else {
        //Asi termino el juego cuando el limite sea 15 segundos
        alert("El juego a terminado...");
        document.write("<h1>Palabras introducidas</h1>");
        document.write(container); //muestro palabras añadidas

        document.write("<h1>Puntuacion</h1>");
        document.write(puntuacion); //muestro puntuacion

        document.write("<h1>Numero de palabras introducidas</h1>");
        document.write(container.length); //muestro el numero de palabras introducidas

        document.write("<br><br><a href='index.html'>Volver a inicio</a>"); //para volver al inicio
    }
}

const botonstart = document.getElementById('empezar');
botonstart.addEventListener('click', () => {
    timeout = setTimeout(actualizaContador, 1000);
});

document.getElementById('seleccionar').textContent = seleccionarletra();
document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();
    añadir();
});


