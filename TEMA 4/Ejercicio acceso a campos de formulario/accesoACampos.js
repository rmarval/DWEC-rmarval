document.addEventListener('DOMContentLoaded', function () {
    let submitButton = document.querySelector('input[type="submit"]');
    let button = document.querySelector('input[type="button"]');
    let formulario = document.querySelector('form');
    let valoresDiv = document.getElementById('valores');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        mostrarCampos();
    });

    button.addEventListener('click', mostrarCampos);

    function mostrarCampos() {
        valoresDiv.innerHTML = ''; // Limpiar el contenido anterior

        let campos = formulario.elements;
        let camposVacios = [];

        for (let i = 0; i < campos.length; i++) {
            let campo = campos[i];
            let nombre = campo.name;
            let valor = '';

            if (campo.type === 'file') {
                valor = campo.value.split('\\'); // Obtener solo el nombre del archivo sin la ruta
            } else if (campo.type === 'select-multiple') {
                valor = obtenerOpcionesSeleccionadas(campo);
            } else if (campo.type === 'checkbox') {
                if (campo.checked) {
                    valor = campo.value;
                  } else {
                    valor = 'Esta vacio';
                  }
            } else {
                valor = campo.value;
            }

            if (campo.required && valor === '') {
                camposVacios.push(nombre);
            }

            let campoDiv = document.createElement('div');
            campoDiv.innerHTML = '<strong>' + nombre + ':</strong> ' + valor;
            valoresDiv.appendChild(campoDiv);
        }

        if (camposVacios.length > 0) {
            alert('Los siguientes campos son obligatorios y están vacíos: ' + camposVacios);
            formulario.elements[camposVacios[0]];
        }
    }

    function obtenerOpcionesSeleccionadas(select) {
        let opciones = select.options;
        let seleccionadas = [];

        for (let i = 0; i < opciones.length; i++) {
            let opcion = opciones[i];
            if (opcion.selected) {
                seleccionadas.push(opcion.value);
            }
        }

        return seleccionadas;
    }
});
