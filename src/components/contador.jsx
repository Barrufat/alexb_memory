import React, { useState, useEffect } from 'react'
import './contador.css'

const Contador = () => {

    const [contador, setContador] = useState(0);

    const Tick = () => {
        setContador(contador + 1)
    }
    
    useEffect(() => {
        const timerID = setInterval(() => { Tick() }, 1000);
        console.log('Contador actualizado')

        return () => {
            clearInterval(timerID);
        }
    },);

    
  return (
    <h1>TICK TACK: {contador} </h1>
  )
};

export default Contador;
