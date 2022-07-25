import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import NavBar from '../layouts/NavBar';

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
      <NavBar />
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Buscar" onChange={handleChange} />
      </form>
      <h2>Peliculas</h2>
      {movies && movies?.map(movie => (
        <MovieCard key={movie.id} details={movie} />
      ))}
    </main>
  )
}

export default Home