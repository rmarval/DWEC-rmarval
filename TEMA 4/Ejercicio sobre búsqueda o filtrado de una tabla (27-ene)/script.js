

const tabla = document.getElementById('gridDatos');
const buscar = document.createElement('input');
buscar.setAttribute('placeholder', 'Introduce tu búsqueda');
buscar.setAttribute('type', 'text');
tabla.parentElement.prepend(buscar);

//añado el evento input para filtrar las filas a mostrar así

buscar.addEventListener('input', evento => {
    const textoBusqueda = evento.target.value.toLowerCase();
    const filas = tabla.getElementsByTagName('tr');
    
    for (let i = 0; i < filas.length; i++) {
        const fila = filas[i];
        const celdas = fila.getElementsByTagName('td');
        let coincide = false;
        
        for (let j = 0; j < celdas.length; j++) {
            const celda = celdas[j];
            
            if (celda.textContent.toLowerCase().includes(textoBusqueda)) {
                coincide = true;
                break;
            }
        }

        if (coincide) {
            fila.style.display = 'table-row';
        } else {
            fila.style.display = 'none';
        }
    }
});
