import React, { useEffect, useState } from 'react'

function UserFavorites() {
  const [userFavs, setUserFavs] = useState([])

  useEffect(() => {

    const getUserFavorites = () => {
      fetch("http://localhost:3001/favorites/user", {
        headers: {
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU4NzIwNjQ4fQ.fzBQKiCVF2evjM-rrJK_hsPTXcolsdI-K2UgLrJX-P4"
        }
      })
        .then(res => res.json())
        .then(data => setUserFavs(data))
    }

    getUserFavorites()
  }, [])
  return (
    <main>
      <h1>Your favorite movies: </h1>
      {userFavs && userFavs.map(fav => (
        <p>
          <span>
            {fav.name}
          </span>
        </p>
      ))}
    </main>
  )
}

export default UserFavorites