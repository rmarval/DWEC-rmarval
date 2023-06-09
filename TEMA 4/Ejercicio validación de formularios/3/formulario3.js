document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();

    let dniInput = document.getElementById('dni');
    let nombreInput = document.getElementById('nombre');
    let fechaInput = document.getElementById('fecha');
    let emailInput = document.getElementById('email');
    let webInput = document.getElementById('web');
    let contrasenaInput = document.getElementById('contrasena');

    let errorDni = document.getElementById('errorDni');
    let errorNombre = document.getElementById('errorNombre');
    let errorFecha = document.getElementById('errorFecha');
    let errorEmail = document.getElementById('errorEmail');
    let errorWeb = document.getElementById('errorWeb');
    let errorContrasena = document.getElementById('errorContrasena');

    dniInput.setCustomValidity('');
    nombreInput.setCustomValidity('');
    fechaInput.setCustomValidity('');
    emailInput.setCustomValidity('');
    webInput.setCustomValidity('');
    contrasenaInput.setCustomValidity('');

    errorDni.innerHTML = '';
    errorNombre.innerHTML = '';
    errorFecha.innerHTML = '';
    errorEmail.innerHTML = '';
    errorWeb.innerHTML = '';
    errorContrasena.innerHTML = '';

    if (!dniInput.checkValidity()) {
        dniInput.setCustomValidity('El DNI debe tener uno de los siguientes formatos: 99.999.999-X, 99999999-X o 99999999X');
        errorDni.innerHTML = dniInput.validationMessage;
    }

    if (!nombreInput.checkValidity()) {
        nombreInput.setCustomValidity('Ingrese un nombre válido');
        errorNombre.innerHTML = nombreInput.validationMessage;
    }

    if (!fechaInput.checkValidity()) {
        fechaInput.setCustomValidity('Ingrese una fecha de nacimiento válida');
        errorFecha.innerHTML = fechaInput.validationMessage;
    }

    if (!emailInput.checkValidity()) {
        emailInput.setCustomValidity('El email debe ser de la forma x@g.educaand.es o x@iesjimenezmontoya.es');
        errorEmail.innerHTML = emailInput.validationMessage;
    }

    if (!webInput.checkValidity()) {
        webInput.setCustomValidity('La URL debe comenzar con http:// o https://');
        errorWeb.innerHTML = webInput.validationMessage;
    }

    if (!contrasenaInput.checkValidity()) {
        contrasenaInput.setCustomValidity('La contraseña debe tener entre 8 y 10 caracteres alfanuméricos, con al menos 1 dígito, 1 minúscula y 1 mayúscula');
        errorContrasena.innerHTML = contrasenaInput.validationMessage;
    }

    if (dniInput.checkValidity() && nombreInput.checkValidity() && fechaInput.checkValidity() &&
        emailInput.checkValidity() && webInput.checkValidity() && contrasenaInput.checkValidity()) {
        alert('Formulario enviado correctamente');
    }
});
