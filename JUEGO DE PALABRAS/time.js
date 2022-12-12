'use strict';


let contador = 0; //Inicializamos contador a 0
let timeout;

function actualizaContador() {
    document.getElementById('contador').textContent = contador++; //Incrementamos contador

    if (timeout !== -1 && contador <= 15) {
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

const botonstart = document.getElementById('empezar').addEventListener('click', actualizaContador) = timeout = setTimeout(actualizaContador, 1000);



