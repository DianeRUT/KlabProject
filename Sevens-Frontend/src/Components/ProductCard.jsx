import { Link } from "react-router-dom"
import { useState } from "react"
import { useCart } from "../context/CartContext"
import StarRating from "./StarRating"
import "../styles/ProductCard.css"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  // Handle missing or undefined properties
  const productId = product?._id || product?.id || "unknown"
  const productName = product?.name || "Product Name"
  const productPrice = product?.price || 0
  const productImage = product?.image || "/placeholder.svg?height=200&width=200"
  const productRating = product?.rating || 0
  const productNumReviews = product?.numReviews || 0
  const productCountInStock = product?.countInStock || 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product, 1)
  }

  return (
    <div className="product-card">
      <Link to={`/products/${productId}`} className="product-link">
        <div className="product-image">
          <img src={productImage || "/placeholder.svg"} alt={productName} />
        </div>
        <div className="product-info">
          <h3 className="product-name">{productName}</h3>
          <div className="product-price">${productPrice.toFixed(2)}</div>
          <div className="product-rating">
            {[...Array(5)].map((_, index) => (
              <i key={index} className={`fas fa-star ${index < Math.floor(productRating) ? "filled" : ""}`}></i>
            ))}
            <span className="rating-count">({productNumReviews})</span>
          </div>
        </div>
      </Link>
      <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={productCountInStock === 0}>
        {productCountInStock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  )
}

export default ProductCard

