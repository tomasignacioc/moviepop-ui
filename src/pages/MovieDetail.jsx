import React, { useContext, useEffect, useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import parse from 'html-react-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import StarRatings from 'react-star-ratings'
import { Toaster } from 'react-hot-toast';
import toastAlerts from '../services/toastAlerts'

import ReviewForm from '../components/ReviewForm'
import fixRating from '../services/fixRating'
import AuthContext from '../context/AuthContext'
import './MovieDetail.css'

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

    if (!auth.token) {
      e.preventDefault()
      return toastAlerts({ error: "No tienes permiso para realizar esta acción! Inicia sesión primero" })
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
        .then(data => toastAlerts(data))
    }

  }

  const fixedRating = fixRating(calificacion)

  return (
    <main className='movie-detail-container'>
      <nav>
        <ul><li><NavLink to="/home" style={{ color: "#FFFFFF", fontSize: "1.5rem" }} >
          <FontAwesomeIcon icon={faArrowLeft} />
        </NavLink></li></ul>
      </nav>
      <div id='movie-card-information-container'>
        <div className="card-detail-container">
          <img src={imagen} alt="original portrait" />
          <p>
            <StarRatings rating={fixedRating} starRatedColor="#C48900" starDimension="20px" starSpacing='1px' />
          </p>
        </div>
        <section className='movie-information'>
          <h3 id='title-h3'>{titulo}</h3>
          <p>
            <b>Lenguaje: </b><span>{lenguaje}</span>
          </p>
          <p>
            <b>Géneros: </b><span>{generos}</span>
          </p>
          <p>
            <b>Fecha de estreno: </b><span>{estreno}</span>
          </p>
          <h3 id='title-h3'>Sinopsis</h3>
          {parse(sinopsis)}
        </section>
      </div>


      <button id="add-to-favs" onClick={addToFavs}>Agregar a favoritos</button>

      <ReviewForm />

      <div className="reviews-from-users">
        {movieReviews && movieReviews.map((mr, i) => (
          <fieldset key={i} >
            <h4>{mr.username}</h4>
            <p><StarRatings rating={mr.score} starRatedColor="#C48900" starDimension="20px" starSpacing='2px' /></p>
            <p>{mr.text}</p>
          </fieldset>
        ))}
      </div>
      <Toaster />
    </main>
  )
}

export default MovieDetail