"use client"

import { useState } from "react"
import { useCart } from "../context/CartContext"
import StarRating from "./StarRating"
import "../styles/ProductCard.css"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(product)

    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  return (
    <div className="product-card">
      {product.discount && <div className="product-badge discount">{product.discount}</div>}
      {product.isNew && <div className="product-badge new">New</div>}

      <div className="product-image">
        <img src={product.image || "/placeholder.svg"} alt={product.name} />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-brand">{product.brand}</p>

        <div className="product-rating">
          <StarRating rating={product.rating} />
          <span className="rating-value">{product.rating}</span>
        </div>

        <div className="product-price">
          <span className="current-price">${product.price.toFixed(2)}</span>

          {product.originalPrice > product.price && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <button className={`add-to-cart-btn ${isAdding ? "adding" : ""}`} onClick={handleAddToCart}>
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}

export default ProductCard

