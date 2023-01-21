////////////////ELEMENTOS DOM/////////////////////////

// SECCIONES

const seccionHome = document.querySelector("#home")
const seccionProductos = document.querySelector("#productos")
const seccionCarrito = document.querySelector("#carrito")
const seccionContacto = document.querySelector("#contacto")

// ELEMENTOS

const divCarousel = document.querySelector("#carousel")
const btnHome = document.querySelector("#btn-home")
const btnProductos = document.querySelector("#btn-productos")
const btnCheckout = document.querySelector("#btn-checkout")
const btnContacto = document.querySelector("#btn-contacto")
const divCards = document.querySelector("#cards-container")
const divMostBuyed = document.querySelector("#most-buyed-container")
const btnSortUp = document.querySelector("#btn-sort-u")
const btnSortDown = document.querySelector("#btn-sort-d")

//////////////FUNCIONES GENÉRICAS REUTILIZABLES////////////////


// MOSTRAR U OCULTAR ELEMENTOS

let hideElements = (element) => {
    element.style.display = "none"
}

let showElements = (element) => {
    element.style.display = "block"
}

// FUNCIONES RELACIONADADAS AL MANEJO DEL STORAGE

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

// CONSTRUCCION DE LAS CARDS

const cards = (array, section) => {
    const nodos = array.reduce((acc, element) => {
        return acc + `
        <div class="column card is-one-quarter">
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
                <button class="card-footer-item has-background-primary">Añadir al carrito</button>
            </footer>
        </div>
`
    }, "")
    section.innerHTML = nodos
}

// FILTROS ARRAY

const filtrarUp = (array) => {
    const arrayOrdenado = JSON.parse(JSON.stringify(array)).sort((a, b) =>
        a.title - b.title)
        console.log(arrayOrdenado)
        return arrayOrdenado
}

const filtrarDown = (array) => {
    const arrayOrdenado = JSON.parse(JSON.stringify(array)).sort((a, b) =>
        b.title - a.title)
        return arrayOrdenado
}

///////////// FUNCIONES ESPECIFICAS////////////////////

// MOSTRAR U OCULTAR SECCIONES DE LA WEB

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

// HTML CAROUSEL 

const carousel = (array) => {
    const imagenes = array.reduce((acc, element) => {
        return acc + `
        <div class="swiper-slide">
        <figure class="image is-centered is-2by1">
        <img src="${element.image}"> <alt="${element.title}>
        </figure>
        </div>
        `
    }, "")
    divCarousel.innerHTML = imagenes
}

// PETICION IMAGENES CAROUSEL

fetch('https://fakestoreapi.com/products/category/jewelery?limit=5')
    .then(res => res.json())
    .then(productosCarousel => {
        carousel(productosCarousel)
    })

// INICIAR CAROUSEL SWIPER

const swiper = new Swiper('.swiper', {
    autoplay: true,
    centeredSlides: true,

    pagination: {
        el: '.swiper-pagination',
    },
});

// PETICION DE PRODUCTOS MAS COMPRADOS

fetch('https://fakestoreapi.com/products/category/electronics?limit=4')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        cards(data, divMostBuyed)
    })
    .catch((error) => console.log("Oops! Algo salió mal."))

// PETICION DEL ARRAY DE PRODUCTOS

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
        cards(data, divCards)
        btnSortUp.onclick = () => {
            cards(filtrarUp(data), divCards)
        } 
        btnSortDown.onclick = () => {
            cards(filtrarDown(data), divCards)
        } 
    })
    .catch((error) => console.log("Oops! Algo salió mal."))