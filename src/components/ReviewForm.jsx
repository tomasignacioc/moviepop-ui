import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import './ReviewForm.css'
import { Toaster } from 'react-hot-toast';
import toastAlerts from '../services/toastAlerts'
import axios from 'axios';

function ReviewForm() {
  const { auth } = useContext(AuthContext)
  const [review, setReview] = useState({ username: auth.username })
  const { movieId } = useParams()


  function handleInputchange(e) {
    setReview({
      ...review,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    if (!auth.token) {
      e.preventDefault()
      return toastAlerts({ error: "No tienes permiso para realizar esta acción! Inicia sesión primero" })
    } else {
      e.preventDefault()
      axios({
        method: 'POST',
        url: `/reviews/new/${movieId}`,
        headers: {
          'Content-Type': 'application/json',
          "auth-token": auth.token
        },
        data: JSON.stringify(review)
      })
        .then(res => toastAlerts(res.data))
        .catch(err => toastAlerts(err.response.data))

    }
  }

  return (
    <div className='review-form-container'>
      <h1>Deja tu reseña</h1>
      <form onSubmit={handleSubmit} className="review-form">
        <fieldset style={{ maxWidth: "320px" }}>
          <label>Puntuación: </label><input type="range" min={1} max={5} step={0.5} name='score' required onChange={handleInputchange} /><b>{review.score}</b>
          <label>Reseña: </label><textarea type="textarea" rows={5} cols={30} name='text' maxLength='150' required onChange={handleInputchange}></textarea>
        </fieldset>
        <input id='send-review' type="submit" />
      </form>
      <Toaster />
    </div>
  )
}

export default ReviewForm