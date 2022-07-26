import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import NavBar from '../layouts/NavBar';
import './Home.css'

import searchMovies from '../services/searchMovies'

function Home() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("star wars")

  useEffect(() => {

    searchMovies(search).then(data => setMovies(data))
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    searchMovies(search).then(data => setMovies(data))
  }
  return (
    <main>
      <div className='navbar-wrapper'>
        <NavBar />
      </div>
      <form onSubmit={handleSubmit} className="home-searchbar">
        <input id='search' type="search" placeholder="Buscar" onChange={handleChange} className="home-searchbar" />
      </form>
      <h2>Películas</h2>
      <hr />
      <div className='movies-wrapper'>
        {movies && movies?.map(movie => (
          <MovieCard key={movie.id} details={movie} className="movie-card" />
        ))}
      </div>
    </main>
  )
}

export default Home