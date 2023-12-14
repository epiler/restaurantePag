//VARIABLES GLOBALES
let platiillos = document.querySelectorAll(".platillo")
let clientes= document.querySelectorAll(".cliente")
let precios = document.querySelectorAll(".precios")
let cantidades = document.querySelectorAll(".cantidad")
let fechas = document.querySelectorAll(".fecha")
let observaciones = document.querySelectorAll(".observaciones")
let btnPedidos = document.querySelectorAll(".btn-pedido")


//AGREGAR EVENTO A LOS BOTONES

btnPedidos.forEach(( btn,i )=>{
    btn.addEventListener("click", () => {
        let datosPedido = obtenerDatosPedidos( i )
        enviarPedido(datosPedido)
    })
    
})




//OBTENER DATOS DEL FORMULARIO DE PEDIDOS

function obtenerDatosPedidos( pos ) {
    let datosPedido

    if (platiillos[pos].value == "" || clientes[pos].value == "" || cantidades[pos].value == "" || fechas[pos].value == "" || observaciones[pos].value == "") {
        alert("Todos los campos son obligatorios");
    } else {
    datosPedido = {
            platillo: platiillos[pos].value,
            precio: precios[pos].textContent,
            cantidad: cantidades[pos].value,
            observaciones: observaciones[pos].value,
            cliente: clientes[pos].value,
            fecha: fechas[pos].value
        }
        console.log( datosPedido );
        platiillos[pos].value = "";
        precios[pos].value = "";
        cantidades[pos].value = "";
        observaciones[pos].value = "";
        clientes[pos].value = "";
        fechas[pos].value = "";
    }

    return datosPedido
}

//FUNCION PARA ENVIAR DATOS DEL PEDIDO A USUARIOS

async function enviarPedido(pedido) {
    let url =  "http://localhost:3005/pedido"
    try{
        let respuesta = await fetch(url,{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(pedido)
        })
        if(!respuesta.ok){
            throw new Error('No se pudo enviar el pedido')
        }
        //RECIBIR RESPUESTA DEL SERVIDOR
        let mensaje = await  respuesta.text()
        //MOSTRAR EN LA CONSOLA EL NAVEGADOR
        console.log(mensaje)
        //MOSTRAR MENSAJE DEL USUARIO
        alert(mensaje)
        //location.href = "login.html"
    }catch(error){
        console.log("Error: " + error)
    }
    
}