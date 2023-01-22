let infoDelLs = JSON.parse(localStorage.getItem("carrito"))

const cardHtml = ( array ) => {
    const generarNodos = array.reduce(( acc, element) => {
        return acc + `
            <div class="card" id="producto-${element.id}">
                <div class="container-img">
                    <img src=${element.img} alt=${element.name}>
                </div>                
                <h2>
                    ${element.name}
                </h2>
                <button id="boton-${element.id}" class="boton-card">
                    Eliminar del carrito
                </button>
            </div>
        `
    }, "")

    document.querySelector("#container-carrito").innerHTML = generarNodos
}

cardHtml(infoDelLs || [])

function borrarDelCarrito (array) {
    const botonDelete = document.querySelectorAll(".boton-card")    
    botonDelete.forEach( boton => {
        boton.onclick = () => {
            const id = boton.id.slice(6)            
            const filtrarProducto = array.filter((elemento, i) => {
                return elemento.id != Number(id)
            })
            infoDelLs = filtrarProducto
            localStorage.setItem("carrito", JSON.stringify(infoDelLs))
            console.log(infoDelLs)    
            cardHtml(infoDelLs)
            borrarDelCarrito(infoDelLs)       
        }

    })
}

borrarDelCarrito(infoDelLs)

const botonBorrarCarrito = document.querySelector("#delete-cart")

botonBorrarCarrito.onclick = () => {
    localStorage.removeItem("carrito")
    document.querySelector(".carrito-contenedor").innerHTML = "no hay productos"
    console.log("me clickeaste")
}