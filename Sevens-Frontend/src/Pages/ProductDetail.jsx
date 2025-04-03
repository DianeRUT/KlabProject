
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getProductById, createProductReview } from "../api/productApi"
import { useCart } from "../context/CartContext"
import { useAuth } from "../components/ProtectedRoute"
import "../Styles/ProductDetails.css"

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isAuthenticated, userInfo } = useAuth()

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Review states
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [reviewSubmitting, setReviewSubmitting] = useState(false)
  const [reviewError, setReviewError] = useState(null)
  const [reviewSuccess, setReviewSuccess] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const data = await getProductById(id)
        setProduct(data)
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Failed to load product details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    setQuantity(value)
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    navigate("/checkout")
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/products/${id}` } })
      return
    }

    setReviewSubmitting(true)
    setReviewError(null)

    try {
      await createProductReview(id, { rating, comment })
      setReviewSuccess(true)
      setComment("")

      // Refresh product data to show the new review
      const updatedProduct = await getProductById(id)
      setProduct(updatedProduct)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setReviewSuccess(false)
      }, 3000)
    } catch (err) {
      setReviewError(err.response?.data?.message || "Failed to submit review")
    } finally {
      setReviewSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <p>{error || "Product not found"}</p>
        <button onClick={() => navigate("/products")} className="back-btn">
          Back to Products
        </button>
      </div>
    )
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-images">
          <div className="main-image">
            <img src={product.image || "/placeholder.svg"} alt={product.name} />
          </div>
          {product.images && product.images.length > 0 && (
            <div className="thumbnail-images">
              {product.images.map((img, index) => (
                <div key={index} className="thumbnail">
                  <img src={img || "/placeholder.svg"} alt={`${product.name} ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>

          <div className="product-rating">
            {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={`fas fa-star ${index < Math.floor(product.rating) ? "filled" : ""} ${
                  index === Math.floor(product.rating) && product.rating % 1 !== 0 ? "half-filled" : ""
                }`}
              ></i>
            ))}
            <span className="rating-count">({product.numReviews} reviews)</span>
          </div>

          <div className="product-price">${product.price.toFixed(2)}</div>

          <div className="product-description">
            <p>{product.description}</p>
          </div>

          <div className="product-meta">
            <div className="meta-item">
              <span className="meta-label">Category:</span>
              <span className="meta-value">{product.category}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Availability:</span>
              <span className="meta-value">{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</span>
            </div>
          </div>

          {product.countInStock > 0 && (
            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <select id="quantity" value={quantity} onChange={handleQuantityChange}>
                  {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="action-buttons">
                <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={product.countInStock === 0}>
                  Add to Cart
                </button>
                <button className="buy-now-btn" onClick={handleBuyNow} disabled={product.countInStock === 0}>
                  Buy Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="product-details-tabs">
        <div className="tabs-header">
          <button className="tab-btn active">Description</button>
          <button className="tab-btn">Reviews ({product.numReviews})</button>
        </div>

        <div className="tab-content">
          <div className="tab-pane active">
            <h3>Product Description</h3>
            <div className="product-full-description">
              <p>{product.description}</p>
              {/* Additional description content */}
            </div>
          </div>
        </div>
      </div>

      <div className="product-reviews">
        <h3>Customer Reviews</h3>

        {product.reviews && product.reviews.length === 0 && (
          <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
        )}

        {product.reviews && product.reviews.length > 0 && (
          <div className="reviews-list">
            {product.reviews.map((review) => (
              <div key={review._id} className="review-item">
                <div className="review-header">
                  <div className="reviewer-name">{review.name}</div>
                  <div className="review-rating">
                    {[...Array(5)].map((_, index) => (
                      <i key={index} className={`fas fa-star ${index < review.rating ? "filled" : ""}`}></i>
                    ))}
                  </div>
                  <div className="review-date">{new Date(review.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="review-comment">{review.comment}</div>
              </div>
            ))}
          </div>
        )}

        <div className="write-review">
          <h4>Write a Review</h4>

          {!isAuthenticated ? (
            <p className="login-prompt">
              Please <a href="/login">login</a> to write a review.
            </p>
          ) : (
            <form onSubmit={handleReviewSubmit} className="review-form">
              {reviewError && <div className="review-error">{reviewError}</div>}
              {reviewSuccess && <div className="review-success">Review submitted successfully!</div>}

              <div className="form-group">
                <label>Rating</label>
                <div className="rating-selector">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <label key={star}>
                      <input
                        type="radio"
                        name="rating"
                        value={star}
                        checked={rating === star}
                        onChange={() => setRating(star)}
                      />
                      <i className={`fas fa-star ${star <= rating ? "filled" : ""}`}></i>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="comment">Comment</label>
                <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
              </div>

              <button type="submit" className="submit-review-btn" disabled={reviewSubmitting}>
                {reviewSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage

