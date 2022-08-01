
const singleSearch = (title) => {
  const result = fetch(`https://api.tvmaze.com/singlesearch/shows?q=${title}`)
    .then(res => res.json())
    .then(data => (
      {
        id: data.id,
        imagen: data.image?.medium,
        titulo: data.name,
        calificacion: data.rating.average,
        lenguaje: data.language,
        generos: data.genres,
        estreno: data.premiered,
        sinopsis: data.summary
      }))

  return result
}

export default singleSearch