//Menú responsive
document.querySelector('#btnMenu').addEventListener('click', toogleMenu);

function toogleMenu() {
    document.querySelector('.barra').classList.toggle('show');
}

//Estilos de Menú
document.querySelector('#btnMenu').addEventListener('click', cambiarEstilos);

function cambiarEstilos() {
    document.querySelector("#menu").classList.toggle("menuDesplegado");
}

//Tabla Elementos
window.addEventListener('load', obtenerDatos);
const url = "https://6675960ca8d2b4d072f0addb.mockapi.io/api/Elementos";
const tablaElementos = document.querySelector("#tablaElementos");

async function obtenerDatos() {
    tablaElementos.innerHTML = "";
    try {
        let res = await fetch(url);
        if(res.ok) {
            let json = await res.json();
            for(let elemento of json) {
                let name = elemento.name;
                let id = elemento.id;
                tablaElementos.innerHTML += `<tr><td>${id}</td><td>${name}</td></tr>`;
            }
        } else {
            tablaElementos.innerHTML = `<tr><td>${"No se pudo cargar la tabla"}</td></tr>`;
        }
    } catch (error) {
        tablaElementos.innerHTML = `<tr><td>${"No se pudo encontrar la URL"}</td></tr>`
    }

}
let btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click", agregarElemento);

async function agregarElemento(e) {
    e.preventDefault();
    let nameElemento = document.querySelector("#inputElemento").value;
    let mensaje = document.querySelector("#msg");
    let elemento = {
        "name": nameElemento
    }
    try {
        let res = await fetch(url, {
            "method": "POST", 
            "headers": {"Content-type": "application/json"},
            "body": JSON.stringify(elemento)
        })
        if(res.status === 201) {
            mensaje.innerHTML = "Agregado!";
            obtenerDatos();
        }
    } catch (error) {
        mensaje.innerHTML = "No se pudo agregar el elemento";
    }
}
let btnEditar = document.querySelector("#btnEditar");
btnEditar.addEventListener("click", editarElemento);

async function editarElemento(e) {
    e.preventDefault();
    let id = document.querySelector("#inputId").value;
    let nameElemento = document.querySelector("#inputElemento").value;
    let mensaje = document.querySelector("#msg");
    let elemento = {
        "name": nameElemento,
        "id": id
    }
    try {
        let res = await fetch(`${url}/${id}`, {
            "method": "PUT",
            "headers": {"Content-type": "application/json"},
            "body": JSON.stringify(elemento)
        });
        if(res.status === 200) {
            mensaje.innerHTML = "Editado!";
            obtenerDatos();
        }
    } catch (error) {
        mensaje.innerHTML = "No se pudo editar el elemento";
    }
}
let btnBorrar = document.querySelector("#btnBorrar");
btnBorrar.addEventListener("click", borrarElemento);


async function borrarElemento(e) {
    e.preventDefault();
    let id = document.querySelector("#inputId").value;
    let nameElemento = document.querySelector("#inputElemento").value;
    let mensaje = document.querySelector("#msg");
    let elemento = {
        "name": nameElemento,
        "id": id
    }
    try {
        let res = await fetch(`${url}/${id}`, {
            "method": "DELETE",
            "headers": {"Content-type": "application/json"},
            "body": JSON.stringify(elemento)
        });
        if(res.status === 200) {
            mensaje.innerHTML = "Eliminado!";
            obtenerDatos();
        }
    } catch (error) {
        mensaje.innerHTML = "No se pudo eliminar el elemento";
    }
}

//Fondo
document.querySelector('#btnFondo').addEventListener('click', cambiarFondo);

function cambiarFondo() {
    document.querySelector('body').classList.toggle("fondoOscuro");
    document.querySelector('header').classList.toggle("darkHeader");
    document.querySelector('#menu').classList.toggle("menuDarkColor");
    document.querySelector('.main').classList.toggle("darkMain");
    document.querySelector('footer').classList.toggle("darkFooter");
    document.querySelector('.contacto').classList.toggle("darkContacto");
    document.querySelector('td').classList.toggle("lineasTabla");
    document.querySelector('table').classList.toggle("darkTable");
    
}

//Contacto (Inicio)
let form = document.querySelector("#formContacto");
form.addEventListener("submit", enviarCaptcha);

//Arreglo con los valores
let respuestaCaptcha = [ 
    { texto: "D5E8rT", imagen:"/img/Captcha_0.png" },
    { texto: "qGphJD", imagen:"/img/Captcha_1.png" },
    { texto: "263s2v", imagen:"/img/Captcha_2.png" },
    { texto: "BK368H", imagen:"/img/Captcha_3.webp" },
    { texto: "2bAway", imagen:"/img/Captcha_4.png" },
];

function mostrarCaptcha() {
    let imagenRandom = Math.floor(Math.random() * respuestaCaptcha.length);
    let captchaSeleccionado = respuestaCaptcha[imagenRandom];
    document.querySelector("#captchaImg").src = captchaSeleccionado.imagen;
    return captchaSeleccionado.texto;
}
//Mostrar un Captcha al cargar la página
let captchaActual = mostrarCaptcha();

function enviarCaptcha(e) {
    e.preventDefault();

    let formData = new FormData(form);
    let captchaUsuario = formData.get("captcha");

    if (captchaUsuario == captchaActual) {
        document.querySelector("#mensajeCaptcha").innerHTML = "Correcto!";
        setTimeout(function() {
            location.reload()
        }, 3000);
    } else {
        document.querySelector("#mensajeCaptcha").innerHTML = "Incorrecto";
        captchaActual = mostrarCaptcha();
        form.reset();
    }
}
//Contacto (Fin)