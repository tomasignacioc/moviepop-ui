import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

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
      return alert("No tienes permiso para realizar esta acción! Inicia sesión primero")
    } else {
      e.preventDefault()
      fetch(`http://localhost:3001/reviews/new/${movieId}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": auth.token
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(review)
      })
        .then(res => res.json())
        .then(data => alert(data.message))
    }
  }

  return (
    <div>
      <h1>Deja tu reseña</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Puntuación: </label><input type="range" min={1} max={5} step={0.5} name='score' required onChange={handleInputchange} /><b>{review.score}</b>
          <label>Reseña: </label><textarea type="textarea" rows={10} cols={30} name='text' required onChange={handleInputchange}></textarea>
        </fieldset>
        <input type="submit" />
      </form>
    </div>
  )
}

export default ReviewForm