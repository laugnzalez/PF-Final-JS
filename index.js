////////////////ELEMENTOS DOM/////////////////////////

// SECCIONES

const seccionHome = document.querySelector("#home")
const seccionProductos = document.querySelector("#productos")
const seccionCarrito = document.querySelector("#carrito")
const seccionContacto = document.querySelector("#contacto")

// ELEMENTOS
const divCarousel = document.querySelector("#carousel")


//////////////FUNCIONES GENÉRICAS REUTILIZABLES////////////////


///////////// FUNCIONES ESPECIFICAS////////////////////

const carousel = (array) => {
    const imagenes = array.reduce((acc, element) => {
        return acc + `
        <div class="swiper-slide">
        <img src="${element.image}"> <alt="${element.title}>
        </div>
        `
    }, "")
    divCarousel.innerHTML = imagenes
}

fetch('https://fakestoreapi.com/products/category/jewelery?limit=5')
    .then(res => res.json())
    .then(productosCarousel => {
        console.log(productosCarousel)
        carousel(productosCarousel)
    })

//SWIPER CAROUSEL

const swiper = new Swiper('.swiper', {
    autoplay: true,
    centeredSlides: true,

    pagination: {
        el: '.swiper-pagination',
    },
});


//AGREGAR PRODUCTOS A LA SECCION PRODUCTOS A TRAVES DEL DOM

const cards = (array) => {
    const nodos = array.reduce((acc, element) => {
        return acc + `<div class="card">
            <div class="container"
            <div class="card-header">
            <h3 class="card-header-title">${element.title}</h3>
            </div>
            <div class="card-image">
            <img src="${element.image}" alt="${element.title}" style="height: 200px"
            </div>
            <div class="card-content">
            <p>${element.description}</p>
            </div>
            <div class="card-footer">
            <p class="card-footer-item">US$ ${element.price}</p>
            <button class="card-footer-item" id="btnAddToCart">Añadir al carrito</button>
            </div>
            </div>
            <div>`
    }, "")
    seccionProductos.innerHTML = nodos
}

// PETICION A LA API DE FAKESTORE

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        cards(data)
    })
    .catch((error) => console.log("Oops! Algo salió mal."))