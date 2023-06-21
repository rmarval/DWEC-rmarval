document.addEventListener('DOMContentLoaded', function () {
    let submitButton = document.querySelector('input[type="submit"]');
    let button = document.querySelector('input[type="button"]');
    let form = document.querySelector('form');
    let valoresDiv = document.getElementById('valores');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        if (validarCampos()) {
            mostrarCampos();
        }

    });

    button.addEventListener('click', function (event) {
        event.preventDefault();
        if (validarCampos()) {
            mostrarCampos();
        }

    });

    function mostrarCampos() { //para mostrar los campos del formulario
        let campos = form.elements;
        let valoresHTML = '';

        for (let i = 0; i < campos.length; i++) {
            let campo = campos[i];
            let nombreCampo = campo.name;
            let valorCampo = obtenerValorCampo(campo);

            valoresHTML += nombreCampo + ': ' + valorCampo + '<br>';
        }

        valoresDiv.innerHTML = valoresHTML;
    }

    function validarCampos() { //para validar los campos del formulario
        let campos = form.elements;
        let camposVacios = [];

        for (let i = 0; i < campos.length; i++) {
            let campo = campos[i];
            let valor = campo.value;

            if (valor === '') {
                camposVacios.push(campo.name);
                campo.focus();
            }
        }

        if (camposVacios.length > 0) {
            let mensaje = 'No pueden estar los campos vacíos:\n';
            for (let i = 0; i < camposVacios.length; i++) {
                mensaje += ' ' + camposVacios[i] + '\n';
            }
            alert(mensaje);
            return false;
        }

        return true;
    }

    function obtenerValorCampo(campo) { //para obtener el valor de un campo específico
        if (campo.type === 'file') {
            return obtenerNombreArchivo(campo);
        } else {
            return campo.value;
        }
    }

    function obtenerNombreArchivo(input) { //para obtener el nombre de un archivo seleccionado
        if (input.files && input.files.length > 0) {
            return input.files[0].name;
        }
        return '';
    }

});
