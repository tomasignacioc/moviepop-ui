import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import NavBar from '../layouts/NavBar'

function UserFavorites() {
  const [userFavs, setUserFavs] = useState([])

  const { auth } = useContext(AuthContext)

  useEffect(() => {

    const getUserFavorites = () => {

      if (auth.token) {
        fetch("http://localhost:3001/favorites/user", {
          headers: {
            "auth-token": auth.token
          }
        })
          .then(res => res.json())
          .then(data => setUserFavs(data))

      }
    }

    getUserFavorites()
  }, [])
  console.log(userFavs);
  return (
    <main>
      <div className='navbar-wrapper'>
        <NavBar />
      </div>
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