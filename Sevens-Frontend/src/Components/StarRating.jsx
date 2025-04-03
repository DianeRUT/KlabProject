import "../styles/StarRating.css"

const StarRating = ({ rating }) => {
  // Convert rating to array of 5 stars
  const stars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <i className="fas fa-star"></i>
        ) : rating >= number ? (
          <i className="fas fa-star-half-alt"></i>
        ) : (
          <i className="far fa-star"></i>
        )}
      </span>
    )
  })

  return <div className="star-rating">{stars}</div>
}

export default StarRating

