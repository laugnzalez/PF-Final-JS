let body = document.querySelector("body")

const btnDark = document.querySelector("#btn-dark")

const btnLight = document.querySelector("#btn-light")

const goLight = () => {

    body.classList.remove("has-background-grey-darker", "has-text-white-ter");

}

const goDark = () => {

    body.classList.add("has-background-grey-darker", "has-text-white-ter");

}

const validarTema = obtenerDatoLocal("temaOscuro") === true ? goDark() : goLight()

btnDark.onclick = () => {

    nuevoDatoLocal("temaOscuro" , "true")

    goDark()

}

btnLight.onclick = () => {

    borrarDatoLocal("temaOscuro")

    goLight()
    
}