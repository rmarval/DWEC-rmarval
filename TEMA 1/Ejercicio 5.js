function Espaniol()
{
  var es = document.getElementById("Espaniol");
  es.style.fontSize="55px";
  es.style.color="red";
}
function Ruso()
{
  var ru = document.getElementById("Ruso");
  ru.style.fontSize="55px";
  ru.style.color="blue";
}
function Ingles()
{
  var en = document.getElementById("Ingles");
  en.style.fontSize="55px";
  en.style.color="green";
}

function Reset()
{
    var y= document.getElementById("Espaniol");
    var x= document.getElementById("Ruso");
    var z= document.getElementById("Ingles");
    x.style.fontSize="";
    y.style.fontSize="";
    z.style.fontSize="";

    x.style.color="black";
    y.style.color="black";
    z.style.color="black";
}