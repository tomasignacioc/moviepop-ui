import React, { useContext, useEffect, useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import parse from 'html-react-parser'
import ReviewForm from '../components/ReviewForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import fixRating from '../services/fixRating'
import AuthContext from '../context/AuthContext'

function MovieDetail() {
  let details = useLocation()
  const { auth } = useContext(AuthContext)

  const { imagen, titulo, calificacion, lenguaje, generos, estreno, sinopsis, id } = details.state

  const [movieReviews, setMovieReviews] = useState([])

  useEffect(() => {
    const getThisMovieReviews = async () => {
      await fetch("http://localhost:3001/reviews/movie/" + id)
        .then(res => res.json())
        .then(data => setMovieReviews(data))
    }

    getThisMovieReviews()
  }, [])

  function addToFavs(e) {
    // necesito token de usuario y nombre de peli

    if (!auth.token) {
      e.preventDefault()
      return alert("No tienes permiso para realizar esta acción! Inicia sesión primero")
    } else {
      e.preventDefault()
      fetch(`http://localhost:3001/favorites/add`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": auth.token
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ name: titulo })
      })
        .then(res => res.json())
        .then(data => alert(data.message))
    }

  }

  const fixedRating = fixRating(calificacion)

  return (
    <main>
      <nav><ul><li><NavLink to="/home" style={{ color: "#FFFFFF", fontSize: "1.5rem" }} >
        <FontAwesomeIcon icon={faArrowLeft} />
      </NavLink></li></ul></nav>
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

      <button onClick={addToFavs}>agregar a favoritos</button>

      <ReviewForm />

      <div>
        {movieReviews && movieReviews.map((mr, i) => (
          <section key={i}>
            <p>{mr.username}</p>
            <p>{mr.score}</p>
            <p>{mr.text}</p>
          </section>
        ))}
      </div>
    </main>
  )
}

export default MovieDetail