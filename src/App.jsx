import { useState, useEffect } from 'react'
import CartaSuelta from './components/CartaSuelta.jsx'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import Contador from './components/contador.jsx'
import './App.css'

const imagesIni = [
  { id: 1, visible: false, src: "/img/arcoiris.png" },
  { id: 2, visible: false, src: "/img/bmo.png" },
  { id: 3, visible: false, src: "/img/chicle.png" },
  { id: 4, visible: false, src: "/img/finn.png" },
  { id: 5, visible: false, src: "/img/grumos.png" },
  { id: 6, visible: false, src: "/img/gunter.png" },
  { id: 7, visible: false, src: "/img/jake.png" },
  { id: 8, visible: false, src: "/img/marceline.png" },
  { id: 9, visible: false, src: "/img/reyhielo.png" },
  { id: 10, visible: false, src: "/img/susana.png" },

  { id: 11, visible: false, src: "/img/arcoiris.png" },
  { id: 12, visible: false, src: "/img/bmo.png" },
  { id: 13, visible: false, src: "/img/chicle.png" },
  { id: 14, visible: false, src: "/img/finn.png" },
  { id: 15, visible: false, src: "/img/grumos.png" },
  { id: 16, visible: false, src: "/img/gunter.png" },
  { id: 17, visible: false, src: "/img/jake.png" },
  { id: 18, visible: false, src: "/img/marceline.png" },
  { id: 19, visible: false, src: "/img/reyhielo.png" },
  { id: 20, visible: false, src: "/img/susana.png" },
]

function canvia(llista, x) {

  let imagesNova = llista.map(el => {
    if (el.src == x.src) {
      el.visible = true;
    }
    return el;
  })
  return imagesNova;
}

function inicia(llista) {

  let imagesInicials = llista.map(el => {
    if (el) {
      el.visible = false;
    }
    return el;
  })
  return imagesInicials;
}

const titulo = "/img/titulo.png";

function App() {



  const [images, setImages] = useState(imagesIni)
  const [cartas, setCartas] = useState([])
  const [turno, setTurno] = useState(0)
  const [jugada1, setJugada1] = useState(null)
  const [jugada2, setJugada2] = useState(null)
  const [fallo, setFallo] = useState(false)
  const [estado, setEstado] = useState(false)
  const [contador, setContador] = useState(0);
  const [abierto, setAbierto] = useState(false);
  const [inicio, setInicio] = useState(false);

  const barajarCartas = () => {

    setInicio(true);
    setContador(0);
    setAbierto(false);

    setJugada1(null);
    setJugada2(null);
    let imatgesInici = inicia(images)
    setImages(imatgesInici);

    console.log(images)

    const cartasBarajadas = [...images]
      .sort(() => Math.random() - 0.5)
    //.map((card) => ({ ...card, id: Math.random() }))

    setCartas(cartasBarajadas)
    setTurno(0)
  }

  useEffect(() => {
    if (inicio) {
      const timerID = setInterval(() => { Tick() }, 1000);
      // console.log({ contador })

      return () => {
        clearInterval(timerID);
      }
    }
  }, [inicio, contador]);

  const Tick = () => {
    setContador(contador + 1)
  }

  useEffect(() => {
    if (contador > 20) {
      setAbierto(true);
      barajarCartas();
      setContador(0);
      setInicio(false);
      console.log('Tiempo agotado')
    }
  }, [contador])

  const jugada = (carta) => {
    if (fallo === true) {
      setJugada1(null);
      setJugada2(null);
      setFallo(false);
    }
    jugada1 ? setJugada2(carta) : setJugada1(carta);
  }


  useEffect(() => {
    if (jugada1 && jugada2) {
      if (jugada1.src === jugada2.src) {
        setTurno(turno + 1)
        console.log("son las mismas!");
        setEstado(!estado);
      } else {
        setTurno(turno + 1)
        console.log("no son las mismas")
        setFallo(true)
      }
    }
  }, [jugada1, jugada2])

  useEffect(() => {

    if (jugada1) {
      let imatgesNoves = canvia(images, jugada1)
      setImages(imatgesNoves);
    }

  }, [estado])

  return (
    <div className='contenedor'>
      <img className="titulo" src={titulo} alt="Memory Time" />
      <h1>TICK TACK: {contador} </h1>
      <Modal isOpen={abierto}>
      <h1>GAME OVER BITCH!</h1>
      </Modal>
      <div className="rejilla">
        {cartas.map(carta => (
          <CartaSuelta className="carta" key={carta.id} carta={carta} jugada={jugada} jugada2={jugada2} jugada1={jugada1} />
        ))}
      </div>
      <button onClick={barajarCartas}>Barajar</button>
      <h1 className="turno">Turnos: {turno}</h1>
    </div>


  )
};
export default App;
