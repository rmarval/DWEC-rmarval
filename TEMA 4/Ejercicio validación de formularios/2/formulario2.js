document.getElementById('formulario').addEventListener('submit', function (event) {
    let dniInput = document.getElementById('dni');
    let nombreInput = document.getElementById('nombre');
    let fechaInput = document.getElementById('fecha');
    let emailInput = document.getElementById('email');
    let webInput = document.getElementById('web');
    let contrasenaInput = document.getElementById('contrasena');

    if (dniInput.checkValidity()) {
        event.preventDefault();
        dniInput.setCustomValidity('El DNI debe tener uno de los siguientes formatos: 99.999.999-X, 99999999-X o 99999999X');
        dniInput.reportValidity();
        return reportValidity();
    }

    if (!nombreInput.checkValidity()) {
        event.preventDefault();
        nombreInput.setCustomValidity('Ingrese un nombre válido');
        nombreInput.reportValidity();
        return;
    }

    if (!fechaInput.checkValidity()) {
        event.preventDefault();
        fechaInput.setCustomValidity('Ingrese una fecha de nacimiento válida');
        fechaInput.reportValidity();
        return;
    }

    if (!emailInput.checkValidity()) {
        event.preventDefault();
        emailInput.setCustomValidity('El email debe ser de la forma x@g.educaand.es o x@iesjimenezmontoya.es');
        emailInput.reportValidity();
        return;
    }

    if (!webInput.checkValidity()) {
        event.preventDefault();
        webInput.setCustomValidity('La URL debe comenzar con http:// o https://');
        webInput.reportValidity();
        return;
    }

    if (!contrasenaInput.checkValidity()) {
        event.preventDefault();
        contrasenaInput.setCustomValidity('La contraseña debe tener entre 8 y 10 caracteres alfanuméricos, con al menos 1 dígito, 1 minúscula y 1 mayúscula');
        contrasenaInput.reportValidity();
        return;
    }

    alert('Formulario enviado correctamente');
});
