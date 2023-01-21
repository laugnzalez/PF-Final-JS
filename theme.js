////////// ELEMENTOS DOM

let body = document.querySelector("body")
const btnDark = document.querySelector("#btn-dark")
const btnLight = document.querySelector("#btn-light")

////////// FUNCIONES ESPECIFICAS

// GENERA EL TEMA CLARO

const goLight = () => {
    body.classList.remove("has-background-grey-darker", "has-text-white-ter");
}

// GENERA EL TEMA OSCURO

const goDark = () => {
    body.classList.add("has-background-grey-darker", "has-text-white-ter");
}

const validarTema = obtenerDatoLocal("temaOscuro") === true ? goDark() : goLight()

// EVENTOS ON CLICK

btnDark.onclick = () => {
    nuevoDatoLocal("temaOscuro" , "true")
    goDark()
}

btnLight.onclick = () => {
    borrarDatoLocal("temaOscuro")
    goLight()
}