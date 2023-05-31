import diccionario from './diccionario.js'; //importo el array diccionario del archivo diccionario.js

const container = []; //contenedor para almacenar palabras
let puntuacion = 0;
let contador = 0; //Inicializamos contador a 0
let timeout;

let reglas = document.getElementById('reglas');
reglas.addEventListener('click', mostrarReglas);

function mostrarReglas() {
  return alert('\n\nJUEGO DE PALABRAS' 
  + '\n\nTienes que escribir tantas palabras como puedas en el margen de tiempo establecido.'
  + '\n\nLas palabras deben empezar por la letra seleccionada' 
  + '\n\nLas palabras van ligadas a un diccionario asi que nada de inventarlas.' 
  + '\n\nCada vez que introduzcas una palabra se te sumarán puntos. ' 
  + '\n\nSi fallas se te restarán puntos.' 
  + '\n\nSi aciertas una palabra se reiniciará el tiempo y si fallas se mantendrá' 
  + '\n\nHay bonificación extra MISTERIOSA según la letra inicial y la longitud de la palabra introducida.' 
  + '\n\nSi el tiempo acaba el juego termina y se almacenarán los resultados.' + '\n\nSuerte!');
}

function seleccionarletra() {
  //Creo array le introduzco las iniciales
  const letra = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]; //creo array de letras
  const random = Math.floor(Math.random() * letra.length); //para aleatorizar array
  const seleccion = letra[random]; //random de cada letra

  return seleccion;
}




function añadir() {
  const letraRandom = document.getElementById('seleccionar').textContent; //la letra random que se selecciona
  const textoinput = document.getElementById('input-text').value.toLowerCase(); //el texto lo paso al minusculas para que no importe la entrada en mayuscula o minuscula

  let letraInicial = textoinput[0]; //letra inicial
  let longitud = textoinput.length; //longitud de cada letra

  //comparo cada inicial de cada palabra que introducimos en el input tipo text con la seleccionada random y las paso a minusculas
  if (letraRandom.toLowerCase() === letraInicial.toLowerCase()) {

    if (container.includes(textoinput)) { //si el contenedor tiene el ya el texto del input...
      alert('Has repetido la palabra, no se incluye');
      document.getElementById('puntuacion').textContent = puntuacion -= 5;
    }
    //sino si...
    else if (diccionario.includes(textoinput)) {
      //aqui reviso que las palabras si empiezan por...
      //ademas las dejo las palabras del array en minusculas porque la distincion de mayusculas y minusculas ya esta realizada
      if (['a', 'c', 'd', 'e'].includes(letraInicial)) {
        alert("Puntuacion extra por Letra Inicial Básica: +1 punto");
        document.getElementById('puntuacion').textContent = puntuacion += 1;
      } else if (['m', 'p', 'r', 's', 't'].includes(letraInicial)) {
        alert("Puntuacion extra por Letra Inicial Habitual: +2 puntos");
        document.getElementById('puntuacion').textContent = puntuacion += 2;
      } else if (['b', 'f', 'g', 'h', 'i', 'v'].includes(letraInicial)) {
        alert("Puntuacion extra por Letra Inicial Rebuscada: +3 puntos");
        document.getElementById('puntuacion').textContent = puntuacion += 3;
      } else if (['j', 'l', 'n', 'o', 'z'].includes(letraInicial)) {
        alert("Puntuacion extra por Letra Inicial Dificil: +4 puntos");
        document.getElementById('puntuacion').textContent = puntuacion += 4;
      } else if (['k', 'ñ', 'q', 'u', 'w', 'x', 'y'].includes(letraInicial)) {
        alert("Puntuacion extra por Letra Inicial Imposible: +5 punto");
        document.getElementById('puntuacion').textContent = puntuacion += 5;
      }

      //aqui comparo la longitud de cada palabra

      if (longitud === 8 || longitud === 9 || longitud === 10 || longitud === 11 || longitud === 12) {
        alert("Puntuacion extra por Longitud de palabra Básica: +1 punto");
        document.getElementById('puntuacion').textContent = puntuacion += 1;
      } else if (longitud === 6 || longitud === 7 || longitud === 13 || longitud === 14) {
        alert("Puntuacion extra por Longitud de palabra Habitual: +2 puntos");
        document.getElementById('puntuacion').textContent = puntuacion += 2;
      } else if (longitud === 5 || longitud === 15) {
        alert("Puntuacion extra por Longitud de palabra Rebuscada: +3 puntos");
        document.getElementById('puntuacion').textContent = puntuacion += 3;
      } else if (longitud === 4 || longitud === 16 || longitud === 17) {
        alert("Puntuacion extra por Longitud de palabra Dificil: +4 puntos");
        document.getElementById('puntuacion').textContent = puntuacion += 4;
      } else if (longitud === 1 || longitud === 2 || longitud === 3 || longitud >= 18) {
        alert("Puntuacion extra por Longitud de palabra Imposible: +5 puntos");
        document.getElementById('puntuacion').textContent = puntuacion += 5;
      }

      container.push(textoinput); //meto la nueva palabra en el array
      document.getElementById('puntuacion').textContent = puntuacion += 10; //incremento la puntuacion cada vez que añado palabra
      contador = 0;
    } else { //else del else if
      alert('La palabra no está en el diccionario');
      document.getElementById('puntuacion').textContent = puntuacion -= 5;
    }
  } else {
    alert('No empieza por la letra selecionada');
    document.getElementById('puntuacion').textContent = puntuacion -= 5; //resto por cada error la puntuacion
  }

  console.log(container); //solo para ver en consola si se esta añadiendo correctamente el array 
}





function actualizaContador() {
  document.getElementById('contador').textContent = ++contador; //Incrementamos contador

  if (timeout !== -1 && contador <= 8) {
    timeout = setTimeout(actualizaContador, 1000);

    document.getElementById('empezar').disabled = true; //con esto desabilito el boton 'start game' al hacer click
    document.getElementById('añadir').removeAttribute("disabled"); //asi habilito el boton de añadir al hacer click en empezar juego
    document.getElementById('input-text').removeAttribute("disabled"); //asi habilito el campo de texto al hacer click en empezar juego
  } else {
    //Asi termino el juego cuando el limite sea 8 segundos
    alert("El juego ha terminado...");
    usuarioLocalStorage(); //ejecuto la funcion para que me pida usuario y muestre datos
    reiniciarJuego(); //reinicio el juego al final

  }

}






function usuarioLocalStorage() {

  let nombreUsuario = prompt("Ingrese su nombre de usuario:"); //obtengo el nombre de usuario del jugador

  if (nombreUsuario === null || nombreUsuario === '') { //si en el prompt no se introduce nombre o se le da a cancelar, el jugador será 'Invitado'
    nombreUsuario = "Invitado";
    alert("Usuario: " + nombreUsuario + "\nPuntuación: " + puntuacion + "\nPalabras introducidas: " + container);
    return; //para acabar ejecucion del if
  }


  if (localStorage.getItem(nombreUsuario)) { //compruebo si el usuario ha jugado alguna vez

    let datosUsuario = JSON.parse(localStorage.getItem(nombreUsuario));  //si el usuario ha jugado antes, obtengo sus datos
    let partidasJugadas = datosUsuario.partidasJugadas;
    let puntuacionPromedio = datosUsuario.puntuacionPromedio;

    datosUsuario.partidasJugadas++;//actualizo los datos del usuario con la nueva partida
    datosUsuario.puntuacionPromedio = (datosUsuario.puntuacionPromedio * partidasJugadas + puntuacion) / datosUsuario.partidasJugadas; //hago la media


    localStorage.setItem(nombreUsuario, JSON.stringify(datosUsuario)); //guardo los datos en localStorage
    alert("Usuario: " + nombreUsuario + "\nPartidas Jugadas: " + datosUsuario.partidasJugadas + "\nPuntuación: " + puntuacion + "\nPuntuación Promedio: " + datosUsuario.puntuacionPromedio + "\nPalabras introducidas: " + container);

  }
  else {

    let datosUsuario = { //si el usuario no ha jugado antes, creao nuevos datos y los almaceno
      partidasJugadas: 1,
      puntuacionPromedio: puntuacion
    };

    localStorage.setItem(nombreUsuario, JSON.stringify(datosUsuario)); //guardo los datos en localStorage
    alert("Usuario: " + nombreUsuario + "\nPartidas Jugadas:" + datosUsuario.partidasJugadas + "\nPuntuación: " + puntuacion + "\nPalabras introducidas: " + container);
  }

}






function reiniciarJuego() {
  container.length = 0; //vacio el contenedor array de palabras y las demás variables para resetear
  puntuacion = 0;
  contador = 0;


  document.getElementById('puntuacion').textContent = puntuacion; //vuelvo a definir por defecto los elementos del document y los botones
  document.getElementById('contador').textContent = contador;
  document.getElementById('añadir').disabled = true;
  document.getElementById('input-text').disabled = true;
  document.getElementById('empezar').disabled = false;


  document.getElementById('seleccionar').textContent = seleccionarletra(); //selecciono una nueva letra aleatoria
  document.getElementById('input-text').value = ''; //limpio el campo de entrada de texto

}


const botonstart = document.getElementById('empezar');
botonstart.addEventListener('click', () => {
  timeout = setTimeout(actualizaContador, 1000);
});

document.getElementById('seleccionar').textContent = seleccionarletra(); //Aqui selecciono una letra en el document
document.getElementById('formulario').addEventListener('submit', (event) => {
  event.preventDefault();
  añadir();
});
