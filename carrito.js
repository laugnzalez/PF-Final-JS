//nuevo dato
// obtener dato
// borrar dato


const btnAddCart = document.getElementsByClassName("btn-add-cart")
const btnDeleteCart = document.querySelector("#delete-cart")
// AÑADIR AL CARRITO

let infoCart = obtenerDatoLocal("carrito")

cards(infoCart || [] , divCarrito)

function guardarCarrito (array) {
    btnAddCart.forEach( boton => {
        const id = boton.id.slice()
        const filtrarProducto = array.filter((elemento, i) => {
        return elemento.id != Number(id)
    })
    infoCart = filtrarProducto
    nuevoDatoLocal("carrito", 
    obtenerDatoLocal(infoCart))
    console.log(infoCart)
    cards(infoCart, divCarrito)
    guardarCarrito(infoCart)
})
}

guardarCarrito(infoCart)

btnDeleteCart.onclick = () => {
    borrarDatoLocal("carrito")
    divCarrito.innerHTML = "No hay productos en el carrito" 
}