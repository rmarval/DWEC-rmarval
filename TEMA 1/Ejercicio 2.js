var fotomostrada = "bigsmoke";
function cambiaimg()
{
    var imagen = document.getElementById("foto");
   
    if(fotomostrada=="bigsmoke"){
        imagen.src = "IMAGENES/fondo.jpeg";
        fotomostrada = "fondo";
    }
    else if(fotomostrada=="fondo"){
        imagen.src= "IMAGENES/goku.jpg";
        fotomostrada = "goku"; 
    }
    else if(fotomostrada=="goku"){
        imagen.src= "IMAGENES/nicolas.jpg";
        fotomostrada = "nicolas"; 
    }
    else{
        imagen.src="IMAGENES/bigsmoke.jpg";
        fotomostrada="bigsmoke";
    } 
}

