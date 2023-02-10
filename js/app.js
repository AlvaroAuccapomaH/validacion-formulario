document.addEventListener("DOMContentLoaded", function () {

    const validarCampos = {
        nombre: '',
        apellido: '',
        email: '',
        pass: ''
    }

    const inputnombre = document.querySelector('#nombre');
    const inputapellido = document.querySelector('#apellido');
    const inputemail = document.querySelector('#email');
    const inputpass = document.querySelector('#pass');
    const eye = document.querySelector('#eye');
    const button = document.querySelector('#formulario button[type="submit"]');


    inputnombre.addEventListener("input", validar);
    inputapellido.addEventListener("input", validar);
    inputemail.addEventListener("input", validar);
    inputpass.addEventListener("input", validar);

    eye.addEventListener("click", function (e) {
        if (inputpass.type === "password") {
            inputpass.type = "text";
            eye.style.opacity = 0.8;
        } else {
            inputpass.type = "password";
            eye.style.opacity = 0.2;
        }
    });

    function validar(e) {

        if ((e.target.id === "pass") && (e.target.value.trim() === "")) {
            mostrarAlerta(`El campos ${e.target.id} es obligatorio`, e.target.parentElement.parentElement);
            validarCampos[e.target.name] = "";
            botonActivar();
            return
        }
        if (e.target.value.trim() === "") {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            validarCampos[e.target.name] = "";
            botonActivar();
            return
        }


        if ((e.target.id === "nombre" || e.target.id === "apellido") && !validarContenido(e.target.value)) {
            mostrarAlerta(`El ${e.target.id} que ingreso es incorrecto`, e.target.parentElement);
            validarCampos[e.target.name] = "";
            botonActivar();
            return
        }

        if ((e.target.id === "email") && !validarEmail(e.target.value)) {
            mostrarAlerta(`El ${e.target.id} que ingreso es incorrecto`, e.target.parentElement);
            validarCampos[e.target.name] = "";
            botonActivar();
            return
        }
        if ((e.target.id === "pass") && (!validarContraseña(e.target.value))) {
            mostrarAlerta(`La contraseñas que ingreso es incorrecto`, e.target.parentElement.parentElement);
            validarCampos[e.target.name] = "";
            botonActivar();
            return
        }

        /* ASIGNAR VALORES PARA VALIDAR EL CONTENIDO CON LA EXPRESION REGULAR */
        limpiarAlertaRepetidas(e.target.parentElement);
        limpiarAlertaRepetidas(e.target.parentElement.parentElement);
        validarCampos[e.target.name] = e.target.value.trim().toLowerCase();
        botonActivar();
    }

    function mostrarAlerta(mensaje, rutaPadre) {
        const alertaLimpiar = rutaPadre.querySelector('.error');
        if (alertaLimpiar) {
            alertaLimpiar.remove();
        }
        const error = document.createElement("P");
        error.textContent = mensaje;
        error.classList.add('error');
        rutaPadre.appendChild(error);
    }

    function validarContenido(validarCampos) {
        const regex = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/
        const resultado = regex.test(validarCampos);
        return resultado;
    }

    function validarContraseña(validarCampos) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
        const resultado = regex.test(validarCampos);
        return resultado;
    }

    function validarEmail(validarCampos) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(validarCampos);
        return resultado;
    }

    function limpiarAlertaRepetidas(rutaPadre) {
        const alertaLimpiar = rutaPadre.querySelector('.error');
        if (alertaLimpiar) {
            alertaLimpiar.remove();
        }
    }
    function botonActivar() {
        if (Object.values(validarCampos).includes('')) {
            button.style.pointerEvents = "none";
            button.disable = true;
            return
        }
        button.style.pointerEvents = "auto";
        button.disable = false;
    }

})
