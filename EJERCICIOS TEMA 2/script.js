"use strict";

//ejercicio 1 - Ordenacion

/*
const numeros = [3, 23, 12];
console.log(numeros.sort((n1, n2) => n1 - n2));
*/

let cadena = [8, 4, 6, 27, 14];
let Ordenar = (n1, n2) => {
    if (n1 > n2) return 1;
    else if (n1 < n2) return -1;
    return 0;
};
console.log(cadena.sort(Ordenar));
document.write(cadena.sort(Ordenar));


//ejercicio 2 - Area
const area = radio => 3.14 * radio**2;
console.log(area(8));


//ejercicio 3 - Bucles
for (let i=1;i<=10;i++){ 
    console.log(i); //1 2 3 4 ... 10
};

for (let i=5;i<=15;i++){ 
    console.log(i); //5 6 7 8 ... 15
};

for (let i=15;i>=1;i--){ 
    console.log(i); //15 14 13 12 ... 1
};

for (let i=11;i<=51;i=i+2){ 
    console.log(i); //11 13 15 ... 51
};

for (let i=50;i>=0;i=i-3){ 
    console.log(i); //50 47 44 ... 0
};

for (let i=(-6);i<=3;i++){ 
    console.log(i); //-6 -5 -4 ... 3
};

const letras = ['a', 'b', 'c', 'd', 'e', 'f','g'];

for (let i=0;i<letras.length;i++){
    console.log(letras[i]); //a b c d f g
};

let mensaje = "mensaje";

for (let i=0;i<=mensaje.length;i++){
    console.log(mensaje[i]); //m e n s a j e
};


//ejercicio 4 - Rombo
for(let i=0;i<4;i++){  
    for(let j=0;j<6-i-1;j++){  
        document.write(". ");  
    }; 
    for(let k=0;k<=(2*i-1)+1;k++){  
        document.write("*");  
    }; 
document.write("<br>");  
};

for(let i=2;i<5;i++){  
    for(let j=0;j<i+1;j++){  
        document.write(". ");
    };

    for(let k=0;k<(9-3 * i) + i;k++){  
        document.write("*");
    };  
document.write("<br>");
};


