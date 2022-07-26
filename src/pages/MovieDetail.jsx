import React, { useEffect, useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import parse from 'html-react-parser'
import ReviewForm from '../components/ReviewForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import fixRating from '../services/fixRating'

function MovieDetail() {
  let details = useLocation()

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