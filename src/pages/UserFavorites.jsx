import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import NavBar from '../layouts/NavBar'

function UserFavorites() {
  const [userFavs, setUserFavs] = useState([])

  const { auth } = useContext(AuthContext)

  let activeStyle = {
    color: "#C48900",
    textDecoration: "underline"
  };
  let inactiveStyle = {
    color: "#FFFFFF",
    textDecoration: "underline"
  };

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

  return (
    <main>
      <div className='navbar-wrapper'>
        <NavBar />
      </div>
      <h1 style={{ padding: "20px" }}>Películas favoritas de {userFavs.username}: </h1>
      {userFavs.FavMovies && userFavs.FavMovies?.map(fav => (
        <p style={{ padding: "20px" }}>
          <NavLink to={`/home/${fav.name}`} style={({ isActive }) =>
            isActive ? activeStyle : inactiveStyle
          }>
            {fav.name}
          </NavLink>
        </p>
      ))}
    </main>
  )
}

export default UserFavorites