
const seccionHome = document.querySelector("#home")

const seccionProductos = document.querySelector("#productos")

const seccionCarrito = document.querySelector("#carrito")

const seccionContacto = document.querySelector("#contacto")

const divCarousel = document.querySelector("#carousel")

const btnHome = document.querySelector("#btn-home")

const btnProductos = document.querySelector("#btn-productos")

const btnCheckout = document.querySelector("#btn-checkout")

const btnContacto = document.querySelector("#btn-contacto")

const divCards = document.querySelector("#cards-container")

const divMostBuyed = document.querySelector("#most-buyed-container")

const divCarrito = document.querySelector("#container-carrito")

const formulario = document.querySelector("#formulario-contacto")

const btnSubmit = document.querySelector("#envio-formulario")

const inputNombre = document.querySelector("#input-nombre")

const inputMail = document.querySelector("#input-mail")

const inputComentario = document.querySelector("#input-comment")

const errorNombre = document.querySelector("#error-nombre")

const errorMail = document.querySelector("#error-mail")

const errorComentario = document.querySelector("#error-comment")

let hideElements = (element) => {

    element.style.display = "none"

}

let showElements = (element) => {

    element.style.display = "block"

}

let nuevoDatoLocal = (clave, valor) => {

    localStorage.setItem(clave, valor)

}

let obtenerDatoLocal = (clave) => {

    let datos = localStorage.getItem(clave)

    let datosParseados = JSON.parse(datos)

    return datosParseados

}

let borrarDatoLocal = (clave) => {

    localStorage.clear(clave)

}

const cards = (array, section) => {
    const nodos = array.reduce((acc, element) => {

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

                <p class="card-footer-item">$ ${element.price}
                </p>

                <button id="boton-${element.id}" class="btn-add-cart button card-footer-item has-background-primary">

                A??adir al carrito

                </button>

            </footer>

        </div>`
    }, "")
    
        section.innerHTML = nodos
}

const filtrarUp = (array) => {

    const btnSortUp = document.querySelector("#btn-sort-u")

    btnSortUp.onclick = () => {

        const arrayUp = JSON.parse(JSON.stringify(array)).sort((a, b) =>

            a.title - b.title)

            return arrayUp
    }
}

const filtrarDown = (array) => {

    const btnSortDown = document.querySelector("#btn-sort-d")
    
    btnSortDown.onclick = () => {

        const arrayDown = JSON.parse(JSON.stringify(array)).sort((a, b) =>

            b.title - a.title)

            return arrayDown
    }
}

btnHome.onclick = () => {

    showElements(seccionHome)

    hideElements(seccionProductos)

    hideElements(seccionCarrito)

    hideElements(seccionContacto)

}

btnProductos.onclick = () => {

    showElements(seccionProductos)

    hideElements(seccionHome)

    hideElements(seccionCarrito)

    hideElements(seccionContacto)

}

btnCheckout.onclick = () => {

    showElements(seccionCarrito)

    hideElements(seccionHome)

    hideElements(seccionProductos)

    hideElements(seccionContacto)

}

btnContacto.onclick = () => {

    showElements(seccionContacto)

    hideElements(seccionHome)

    hideElements(seccionProductos)

    hideElements(seccionCarrito)

}

const carousel = (array) => {

    const imagenes = array.reduce((acc, element) => {

        return acc + `

        <div class="swiper-slide">

            <figure class="image is-centered is-2by1">

                <img src="${element.image}"> <alt="${element.title}>

            </figure>

        </div>`
    }, "")
    
        divCarousel.innerHTML = imagenes
}

fetch('https://fakestoreapi.com/products/category/jewelery?limit=5')

    .then(res => res.json())

    .then(productosCarousel => {

        carousel(productosCarousel)

    })

const swiper = new Swiper('.swiper', {

    autoplay: true,

    centeredSlides: true,

    pagination: {
        el: '.swiper-pagination',},

});

fetch('https://fakestoreapi.com/products')

    .then(res => res.json())

    .then(array => {

        cards(array, divMostBuyed)

        addToCarrito(array)

    })

fetch('https://fakestoreapi.com/products')

    .then(res => res.json())

    .then(data => {

        cards(data, divCards)

        addToCarrito(data)

        filtrarUp(data)

        filtrarDown(data)

    })

let carrito = []

function addToCarrito (array) {

    const btnAdd = document.querySelectorAll(".btn-add-cart")

    btnAdd.forEach( boton => {

        boton.onclick = () => {

            const id = boton.id.slice(6)

            const filtrarProducto = array.find((elemento) => {

                return elemento.id === Number(id)

            })

            carrito.push(filtrarProducto)

            localStorage.setItem("carrito", JSON.stringify(carrito))   
        }
        
    })
}

const productosElegidos = JSON.parse(localStorage.getItem("carrito"))

carrito = productosElegidos || []

formulario.onsubmit = (e) => {

    e.preventDefault()

    if ( inputNombre.value.length > 2 && inputMail.value.match(/[@]/) && 2 < inputComentario.value.length < 150 ) {

        swal("Enhorabuena!", "Tu comentario fue enviado con ??xito. Pronto recibiras una respuesta por mail.", "success"); 
             
    } 
    
        else {
            
            if (inputNombre.value.length < 2) {
                showElements(errorNombre)
            }

            if (inputMail.value != (/[@]/)) {
                showElements(errorMail)        
            }

            if (2 > inputComentario.value.length > 150) {
                showElements(errorComentario)
            }
    }
}