
//REGISTRAR
//VARIABLES GLOBALES
let inputUsuario = document.querySelector("#user")
let inputNombre = document.querySelector("#name")
let inputRol = document.querySelector("#rol")
let inputContra = document.querySelector("#password")
let btnRegistrar = document.querySelector(".btn-guardar")

//LOGIN
//VARIABLES LOGIN

let usuario = document.querySelector("#user")
let contrasena = document.querySelector("#password")
let btnLogin = document.querySelector(".btn-iniciar")

//VALIDAR EXISTENCIA DE LOS BOTONES
if (btnRegistrar != null) {
    btnRegistrar.addEventListener("click", function () {
        let datoUser = obtenerDatosRegistro()
        enviarRegistro(datoUser)
    })
}else if (btnLogin != null) {
    btnLogin.addEventListener("click",function () {
        //alert("di click")
        let usuario = obtenerCredenciales();
        enviarLogin(usuario)
    })
}

//OBTENER DATOS DEL LOGIN

function obtenerCredenciales() {
    let datosLogin
    if (usuario.value == "" || contrasena.value == "") {
        alert("Todos los campos son obligatorios")
    }else{
        datosLogin = {
            user: usuario.value,
            password: contrasena.value
        }
        console.log(datosLogin)
        usuario.value = ""
        contrasena.value = ""
    }
    return datosLogin
}

//ENVIAR CREDENICIALES AL BACKEND

async function enviarLogin(datos) {
    let url =  "http://localhost:3005/login"
    try{
        let respuesta = await fetch(url,{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(datos)
        })
        if(!respuesta.ok){
            throw new Error('No se pudo enviar los datos')
        }
        //RECIBIR RESPUESTA DEL SERVIDOR
        let usuarioRegistrado = await  respuesta.json()
        //MOSTRAR EN LA CONSOLA EL NAVEGADOR
        console.log(usuarioRegistrado)

        //VALIDAR ROL DEL USURIO REGISTRADO 
        if (usuarioRegistrado.rol === "mesero" && usuarioRegistrado.password === datos.password) {
            alert("bienvenido " + usuarioRegistrado.user)
            location.href = "mesero.html"
        }else if (usuarioRegistrado.rol === "cajero" && usuarioRegistrado.password === datos.password) {
            alert("bienvenido " + usuarioRegistrado.user)
            location.href = "cajero.html"            
        }else if (usuarioRegistrado.rol === "chef" && usuarioRegistrado.password === datos.password) {
            alert("bienvenido " + usuarioRegistrado.user)
            location.href = "chef.html"
        }else{
        alert(usuarioRegistrado.mensaje) 
        }
        
        //MOSTRAR MENSAJE DEL USUARIO
        //alert(mensaje)
        //location.href = "login.html"
    }catch(error){
        console.log("Error: " + error)
    }
    
}



//OBTENER DATOS DEL FORMULARIO

function obtenerDatosRegistro() {
    let datosRegistro

    if (inputUsuario.value == "" || inputNombre.value == "" || inputContra.value == "" || inputRol.value == "") {
        alert("Todos los campos son obligatorios");
    } else {
    datosRegistro = {
            user: inputUsuario.value,
            name: inputNombre.value,
            rol: inputRol.value,
            password: inputContra.value
        }
        console.log(datosRegistro);
        inputUsuario.value = "";
        inputNombre.value = "";
        inputRol.value = "";
        inputContra.value = "";
    }

    return datosRegistro
}

//FUNCION PARA ENVIAR DATOS DEL REGISTRO A USUARIOS

async function enviarRegistro(usuario) {
    let url =  "http://localhost:3005/register"
    try{
        let respuesta = await fetch(url,{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(usuario)
        })
        if(!respuesta.ok){
            throw new Error('No se pudo enviar registro')
        }
        //RECIBIR RESPUESTA DEL SERVIDOR
        let mensaje = await  respuesta.text()
        //MOSTRAR EN LA CONSOLA EL NAVEGADOR
        console.log(mensaje)
        //MOSTRAR MENSAJE DEL USUARIO
        alert(mensaje)
        location.href = "login.html"
    }catch(error){
        console.log("Error: " + error)
    }
    
}
