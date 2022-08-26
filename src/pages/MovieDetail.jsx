import React, { useContext, useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'

import parse from 'html-react-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import StarRatings from 'react-star-ratings'
import { Toaster } from 'react-hot-toast';
import toastAlerts from '../services/toastAlerts'

import ReviewForm from '../components/ReviewForm'
import Loading from '../layouts/Loading'
import fixRating from '../services/fixRating'
import singleSearch from '../services/singleSearch'
import AuthContext from '../context/AuthContext'
import './MovieDetail.css'
import axios from 'axios'

function MovieDetail() {
  const { auth } = useContext(AuthContext)
  const params = useParams()

  const [movieReviews, setMovieReviews] = useState([])
  const [movieDetails, setMovieDetails] = useState({})
  const [loading, setLoading] = useState(true)

  const { imagen, titulo, calificacion, lenguaje, generos, estreno, sinopsis, id } = movieDetails

  useEffect(() => {

    singleSearch(params.movieId).then(data => { setMovieDetails(data); setLoading(false) })

    const getThisMovieReviews = () => {
      axios("/reviews/movie/" + params.movieId)
        .then(res => setMovieReviews(res.data))
    }

    getThisMovieReviews()
  }, [])

  function addToFavs(e) {

    if (!auth.token) {
      e.preventDefault()
      return toastAlerts({ error: "No tienes permiso para realizar esta acción! Inicia sesión primero" })
    } else {
      e.preventDefault()
      axios({
        method: 'POST',
        url: '/favorites/add',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": auth.token
        },
        data: JSON.stringify({ name: titulo, apiId: id })
      })
        .then(res => toastAlerts(res.data))
        .catch(err => toastAlerts({ error: err.response.data }))
    }
  }

  const fixedRating = fixRating(calificacion)

  return (
    <div>
      {loading ? <Loading />
        : <main className='movie-detail-container'>
          <nav>
            <ul><li><NavLink to="/home" style={{ color: "#FFFFFF", fontSize: "1.5rem" }} >
              <FontAwesomeIcon icon={faArrowLeft} />
            </NavLink></li></ul>
          </nav>
          <div id='movie-card-information-container'>
            <div className="card-detail-container">
              <img src={imagen} alt="original portrait" />
              <div id='star-ratings'>
                <StarRatings rating={fixedRating} starRatedColor="#C48900" starDimension="20px" starSpacing='1px' />
              </div>
            </div>
            <section className='movie-information'>
              <h3 id='title-h3'>{titulo}</h3>
              <p>
                <b>Lenguaje: </b><span>{lenguaje}</span>
              </p>
              <p>
                <b>Géneros: </b><span>{generos.join(', ')}</span>
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
                <div><StarRatings rating={mr.score} starRatedColor="#C48900" starDimension="20px" starSpacing='2px' /></div>
                <p>{mr.text}</p>
              </fieldset>
            ))}
          </div>
          <Toaster />
        </main>}
    </div>
  )

}

export default MovieDetail