/**
 * 2C = 2 de trebol (clubs)
 * 2D = 2 de diamante (diamont)
 * 2H = 2 de corazones (heart)
 * 2S = 2 de picas (spades)
 */

let baraja = []
const tipos = ['C', 'D', 'H', 'S']
const letras = ['J','Q','k','A']

let puntosJugador = 0
let puntosComputadora = 0

//referencias al HTML
const btnPedir = document.querySelector('#btn-pedir')
// const smallPuntajeJugador = document.querySelector('small')
const btnDetener = document.querySelector('#btn-detener')
const btnNuevo = document.querySelector('#btn-nuevo')
const puntosHTML = document.querySelectorAll('small')
const divJugadorCartas = document.querySelector('#jugador-cartas')
const divComputadoraCartas = document.querySelector('#computadora-cartas')

const crearBaraja = () => {
    //se puebla el arreglo con los números y tipos de la baraja
    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            baraja.push(i + tipo)
        }
    }
    
    for(let letra of letras){
        for(let tipo of tipos){
            baraja.push(letra + tipo)
        }
    }
    baraja = _.shuffle(baraja)
}

crearBaraja()
// console.log(baraja)

//esta funcion pide una carta

const pedirCarta = () => {
    const barajaTamanio = baraja.length
    if(barajaTamanio === 0) throw 'No hay cartas en la baraja'

    const index = Math.floor(Math.random() * barajaTamanio)
    // console.log({index})
    const carta = baraja.splice(index, 1)[0]
    // console.log({ carta })
    // console.log(baraja)
    return carta
}

// pedirCarta()

const valorCarta = (carta) =>{
    const valor = carta.substring(0, carta.length-1)
    return isNaN(valor) ? (valor === 'A' ? 11 : 10) : Number(valor)
}
//turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta()
        puntosComputadora += valorCarta(carta)
        puntosHTML[1].innerText = puntosComputadora

        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta')
        divComputadoraCartas.append(imgCarta)

        if(puntosMinimos > 21) break
    } while (puntosComputadora <= puntosMinimos && puntosMinimos <= 21)

    setTimeout(() => {
        
    if(puntosMinimos === puntosComputadora) alert('hubo empate')
    else if(puntosMinimos > 21) alert('computadora gana')
    else if(puntosComputadora > 21) alert('Genial, ganaste')
    else alert('computadora gana')

    },100)
}
// console.log(valorCarta(pedirCarta()))

//Eventos
btnPedir.addEventListener('click', ()=> {
    const carta = pedirCarta()
    console.log({ carta })
    puntosJugador += valorCarta(carta)
    console.log({ puntosJugador })
    // smallPuntajeJugador.innerText = puntosJugador
    puntosHTML[0].innerText = puntosJugador

    //<img class="Carta" src="assets/cartas/KC.png" alt=""><img class="Carta" src="assets/cartas/JC.png" alt=""><img class="Carta" src="assets/cartas/QC.png" alt=""><img class="Carta" src="assets/cartas/AC.png" alt="">
    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divJugadorCartas.append(imgCarta)

    if(puntosJugador > 21){
        btnPedir.disabled = true
        btnDetener.disabled = true
        console.warn('Lo siento, ya perdiste')
        turnoComputadora(puntosJugador)
    }else if(puntosJugador === 21){
        btnPedir.disabled = true
        btnDetener.disabled = true
        console.warn('21, Genial')
        turnoComputadora(puntosJugador)
    }
})

btnDetener.addEventListener('click', () =>{
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora(puntosComputadora)
})

btnNuevo.addEventListener('click', () => {
    puntosJugador = 0
    puntosComputadora = 0
    btnPedir.disabled = false
    btnDetener.disabled = false
    puntosHTML[0].innerText = 0
    puntosHTML[1].innerText = 0
    divJugadorCartas.innerHTML = ''
    divComputadoraCartas.innerHTML = ''
    console.clear()
    crearBaraja()
})