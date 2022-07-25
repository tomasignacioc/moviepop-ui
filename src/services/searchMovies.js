
const searchMovies = (search) => {
  const result = fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
    .then(res => res.json())
    .then(data => data.map(movie => (
      {
        id: movie.show.id,
        imagen: movie.show.image?.medium,
        titulo: movie.show.name,
        calificacion: movie.show.rating.average,
        lenguaje: movie.show.language,
        generos: movie.show.genres,
        estreno: movie.show.premiered,
        sinopsis: movie.show.summary
      }
    )))

  return result
}

export default searchMovies