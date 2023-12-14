//MESERO
//VARIABLES GLOBALES

let tablas = document.querySelectorAll(".table > tbody")

//AGREGAR EVENTO AL NAVEGADOR PARA MOSTRAR LOS DATOS

document.addEventListener("DOMContentLoaded", function () {
    obtenerDatosPedidosBD();
})


//FUNCION PARA OBTENER LOS PEDIDOS DE LA BASE DE DATOS
async function obtenerDatosPedidosBD() {
    let url = "http://localhost:3005/mesero"
    const respuesta = await fetch(url,{
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    })
    
    if (!respuesta.ok) {
        throw new Error("No se pudo obtener los pedidos de la base de datos")
    }
    const datos = await respuesta.json()
    //MOSTRAR EN CONSOLA LOS DATOS
    console.log(datos)
    //console.log(datos.dataPorPreparar)
    const {dataPorEntregar,dataEntregado} = datos
    console.log(dataPorEntregar)
    dataPorEntregar.forEach((platillo,i) => {
        //console.log(platillo)
        let fila = document.createElement("tr")
        fila.innerHTML = `
        
            <td>${ platillo.platillo }</td>
            <td>
                <button onclick="actualizarPedido(${platillo.id})" class = " btn-editar btn btn-primary" type = "button"> Actualizar</button>
            </td>
        
        `
        tablas[0].appendChild(fila) 
    });

    dataEntregado.forEach((platillo,i) => {
        //console.log(platillo)
        let fila = document.createElement("tr")
        fila.innerHTML = `
        
            <td>${ platillo.platillo }</td>
            <td>
                <button onclick="actualizarPedido(${platillo.id},)" class = " btn-editar btn btn-primary" type = "button"> Actualizar</button>
            </td>
        
        `
        tablas[1].appendChild(fila) 
    });
}

async function actualizarPedido( id ){

    let url = "http://localhost:3005/entregado/" + id



    const respuesta = await fetch(url,{
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({id:id})
    })
    
    if (!respuesta.ok) {
        throw new Error("No se pudo actualizar el pedido")
    }
    const mensaje = await respuesta.text()
    //MOSTRAR EN CONSOLA LOS DATOS
    console.log(mensaje)
    //MOSTRAR UN MENSAJE AL CHEF EN EL NAVEGADOR
    alert(mensaje)
    //RECARGAR LA PAGINA
    location.reload()

}