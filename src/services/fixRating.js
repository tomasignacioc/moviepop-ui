// normalmente esta funcion estaria en una carpeta "helpers" o "utils", pero a efectos practicos la puse en esta carpeta

function fixRating(rating) {

  if (rating === 0) return rating

  let divided = rating / 2

  if (Number.isInteger(divided)) return divided

  if (divided % 1 <= 0.5) {
    return Math.floor(divided) + 0.5
  } else {
    return Math.round(divided)
  }

}

export default fixRating