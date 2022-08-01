import React from 'react'
import { NavLink } from "react-router-dom";
import './MovieCard.css'

function MovieCard({ details }) {

  return (
    <figure className='card-container'>
      <NavLink to={details.titulo} state={details}>
        <img src={details.imagen} alt="movie poster" />
      </NavLink>

      <figcaption>{details.titulo}</figcaption>
    </figure>
  )
}

export default MovieCard