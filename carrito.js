let infoDelLs = JSON.parse(localStorage.getItem("carrito"))

const cardHtml = ( array ) => {
    const generarNodos = array.reduce(( acc, element) => {
        return acc + `
        <div class="column card is-one-quarter id="producto-${element.id}">
        <header class="card-header">
            <p class="card-header-title">
                ${element.title}
            </p>
        </header>

        <div class="card-image">
            <figure class="image">
                <img src="${element.image}" alt=" ${element.title}">
            </figure>
        </div>

        <div class="card-content">
            <div class="content">
                ${element.description}
            </div>
        </div>

        <footer class="card-footer">
            <p class="card-footer-item">$ ${element.price}</p>
            <button id="boton-${element.id}" class="btn-remove-cart button card-footer-item has-background-primary">Eliminar del carrito</button>
        </footer>
    </div>
        `
    }, "")

    document.querySelector("#container-carrito").innerHTML = generarNodos
}

cardHtml(infoDelLs || [])

function borrarDelCarrito (array) {
    const btnDelete = document.querySelectorAll(".btn-remove-cart")    
    btnDelete.forEach( boton => {
        boton.onclick = () => {
            const id = boton.id.slice(6)            
            const filtrarProducto = array.filter((elemento) => {
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
    carrito = []
    document.querySelector(".carrito-contenedor").innerHTML = "no hay productos"
    console.log("me clickeaste")
}