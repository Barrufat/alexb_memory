import { useState } from 'react'
import './cartaSuelta.css'

export default function CartaSuelta({ carta, jugada, jugada1, jugada2 }) {

    function destapar() {
        //setClicada(true);
        jugada(carta);
    }

    const visible = carta.visible || (jugada1 && carta.id===jugada1.id) || (jugada2 && carta.id===jugada2.id);

    return (
        <div className="carta">
            <div>
                {visible ? <img src={carta.src} alt="cara" />
                    : <img className="cruz" src="/img/reverso.png" alt="cruz" onClick={destapar} />}
            </div>
        </div>
    )
}

