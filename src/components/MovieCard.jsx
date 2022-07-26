import React from 'react'
import { NavLink } from "react-router-dom";
import './MovieCard.css'

function MovieCard({ details }) {
  const idParam = details.id.toString()

  return (
    <figure className='card-container'>
      <NavLink to={idParam} state={details}>
        <img src={details.imagen} alt="movie poster" />
      </NavLink>

      <figcaption>{details.titulo}</figcaption>
    </figure>
  )
}

export default MovieCard