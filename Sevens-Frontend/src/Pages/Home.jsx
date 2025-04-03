"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { getTopProducts, getNewProducts } from "../api/productApi"
import { getCategories } from "../api/categoryApi"
import "../styles/Home.css"

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch top rated products for featured section
        const topProducts = await getTopProducts()
        setFeaturedProducts(topProducts)

        // Fetch new arrivals
        const newProducts = await getNewProducts()
        setNewArrivals(newProducts)

        // Fetch categories
        const categoriesData = await getCategories()
        setCategories(categoriesData.slice(0, 3)) // Get first 3 categories
      } catch (err) {
        setError("Failed to load data. Please try again later.")
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading amazing products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="home-page">
      {/* Hero Section with Background Image */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Elevate Your Style</h1>
          <p>Discover the latest trends in fashion and accessories</p>
          <Link to="/products" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-container">
          <h2 className="section-title">Shop by Category</h2>

          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                to={`/products?category=${category.name.toLowerCase()}`}
                className="category-card"
                key={category._id}
              >
                <div className="category-image">
                  <img src={category.image || "/placeholder.svg"} alt={category.name} />
                </div>
                <h3 className="category-name">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/products" className="view-all-link">
              View All
            </Link>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>Summer Sale</h2>
          <p>Up to 50% off on selected items</p>
          <Link to="/products" className="shop-now-btn">
            Shop the Sale
          </Link>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="new-arrivals-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <Link to="/products" className="view-all-link">
              View All
            </Link>
          </div>

          <div className="products-grid">
            {newArrivals.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands-section">
        <div className="section-container">
          <h2 className="section-title">Our Brands</h2>

          <div className="brands-grid">
            <div className="brand-logo">
              <img src="/images/brand-nike.png" alt="Nike" />
            </div>
            <div className="brand-logo">
              <img src="/images/brand-jordan.png" alt="Jordan" />
            </div>
            <div className="brand-logo">
              <img src="/images/brand-versace.png" alt="Versace" />
            </div>
            <div className="brand-logo">
              <img src="/images/brand-adidas.png" alt="Adidas" />
            </div>
            <div className="brand-logo">
              <img src="/images/brand-puma.png" alt="Puma" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">What Our Customers Say</h2>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="testimonial-text">
                "The quality of the products exceeded my expectations. Fast shipping and excellent customer service!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="/images/avatar-1.jpg" alt="Customer" />
                </div>
                <div className="author-info">
                  <h4 className="author-name">Sarah Johnson</h4>
                  <p className="author-title">Verified Buyer</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="testimonial-text">
                "I've been shopping here for years and have never been disappointed. The new collection is amazing!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="/images/avatar-2.jpg" alt="Customer" />
                </div>
                <div className="author-info">
                  <h4 className="author-name">Michael Chen</h4>
                  <p className="author-title">Loyal Customer</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <p className="testimonial-text">
                "The shoes I bought are not only stylish but also incredibly comfortable. Will definitely shop again!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="/images/avatar-3.jpg" alt="Customer" />
                </div>
                <div className="author-info">
                  <h4 className="author-name">Emily Rodriguez</h4>
                  <p className="author-title">Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="section-container">
          <div className="newsletter-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get the latest updates on new products and upcoming sales</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

