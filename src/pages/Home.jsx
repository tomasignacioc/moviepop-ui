import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
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
      <form onSubmit={handleSubmit} id="home-searchbar">
        {search ? null : <label htmlFor='search-movie'>Buscar</label>}
        <input id='search-movie' type="search"
          onChange={handleChange} className="home-searchbar" />
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