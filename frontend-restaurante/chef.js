//CHEF
//VARIABLES GLOBALES



//AGREGAR EVENTO AL NAVEGADOR PARA MOSTRAR LOS DATOS

document.addEventListener("DOMContentLoaded", function () {
    obtenerDatosPedidosBD();
})


let tablas = document.querySelectorAll(".table > tbody")

//FUNCION PARA OBTENER LOS PEDIDOS DE LA BASE DE DATOS
async function obtenerDatosPedidosBD() {
    let url = "http://localhost:3005/chef"
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
    const {dataPorPreparar, dataPreparando, dataPorEntregar} = datos
    console.log(dataPorPreparar)
    dataPorPreparar.forEach((platillo,i) => {
        //console.log(platillo)
        let fila = document.createElement("tr")
        fila.innerHTML = `
        
            <td>${ platillo.platillo }</td>
            <td>
                <button onclick="actualizarPedido(${platillo.id},)" class = " btn-editar btn btn-primary" type = "button"> Actualizar</button>
            </td>
        
        `
        tablas[0].appendChild(fila) 
    });

    dataPreparando.forEach((platillo,i) => {
        //console.log(platillo)
        let fila = document.createElement("tr")
        fila.innerHTML = `
        
            <td>${ platillo.platillo }</td>
            <td>
                <button onclick="actualizarPedido(${platillo.id},'preparando')" class = " btn-editar btn btn-primary" type = "button"> Actualizar</button>
            </td>
        
        `
        tablas[1].appendChild(fila) 
    });
    dataPorEntregar.forEach((platillo,i) => {
        //console.log(platillo)
        let fila = document.createElement("tr")
        fila.innerHTML = `
        
            <td>${ platillo.platillo }</td>
            <td>
                <button onclick="actualizarPedido(${platillo.id}'entregado')" class = " btn-editar btn btn-primary" type = "button"> Actualizar</button>
            </td>
        
        `
        tablas[2].appendChild(fila) 
    });
    

}

async function actualizarPedido(id, estado = "por preparar"){
    let url
    let url1 = "http://localhost:3005/preparando/"+id
    let url2 = "http://localhost:3005/listo/"+id
    switch (estado) {
        case "preparando": url = url2
            
            break;
    
        default: url = url1
            break;
    }


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