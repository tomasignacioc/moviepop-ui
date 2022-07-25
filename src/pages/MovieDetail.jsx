import React from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import parse from 'html-react-parser'

import fixRating from '../services/fixRating'

function MovieDetail() {
  let details = useLocation()

  const { imagen, titulo, calificacion, lenguaje, generos, estreno, sinopsis } = details.state

  const fixedRating = fixRating(calificacion)

  return (
    <main>
      <nav><ul><li><NavLink to="/home" >Back</NavLink></li></ul></nav>
      <img src={imagen} alt="original portrait" />
      <p><b>{fixedRating}</b></p>
      <section>
        <h3>{titulo}</h3>
        <p>
          <b>Lenguaje: </b><span>{lenguaje}</span>
        </p>
        <p>
          <b>Géneros: </b><span>{generos}</span>
        </p>
        <p>
          <b>Fecha de estreno: </b><span>{estreno}</span>
        </p>
      </section>
      <section>
        <h3>Sinopsis</h3>
        {parse(sinopsis)}
      </section>
    </main>
  )
}

export default MovieDetail