import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { getTopProducts, getNewProducts } from "../api/productApi"
import { getCategories } from "../api/categoryApi"
import "../styles/Home.css"
import women from "../assets/Images/women12.jpg"
import men from "../assets/Images/men2.jpg"
import accessories from "../assets/Images/access1.jpg"

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        console.log("Fetching homepage data...")

        // Use Promise.allSettled to handle partial failures
        const [topProductsResult, newProductsResult, categoriesResult] = await Promise.allSettled([
          getTopProducts(),
          getNewProducts(),
          getCategories(),
        ])

        console.log("Top products result:", topProductsResult)
        console.log("New products result:", newProductsResult)
        console.log("Categories result:", categoriesResult)

        // Handle top products
        if (topProductsResult.status === "fulfilled") {
          const topData = topProductsResult.value
          // Check if the response has a products array
          if (topData && topData.products && Array.isArray(topData.products)) {
            setFeaturedProducts(topData.products)
          } else if (Array.isArray(topData)) {
            setFeaturedProducts(topData)
          } else {
            setFeaturedProducts([])
          }
        } else {
          console.error("Failed to fetch top products:", topProductsResult.reason)
          setFeaturedProducts([])
        }

        // Handle new arrivals
        if (newProductsResult.status === "fulfilled") {
          const newData = newProductsResult.value
          // Check if the response has a products array
          if (newData && newData.products && Array.isArray(newData.products)) {
            setNewArrivals(newData.products)
          } else if (Array.isArray(newData)) {
            setNewArrivals(newData)
          } else {
            // For testing - if no new arrivals, use featured products
            setNewArrivals(featuredProducts.length > 0 ? featuredProducts : [])
          }
        } else {
          console.error("Failed to fetch new products:", newProductsResult.reason)
          // For testing - if error fetching new arrivals, use featured products
          setNewArrivals(featuredProducts.length > 0 ? featuredProducts : [])
        }

        // Handle categories
        if (categoriesResult.status === "fulfilled") {
          const categoriesData = categoriesResult.value
          if (Array.isArray(categoriesData)) {
            setCategories(categoriesData.slice(0, 3)) // Get first 3 categories
          } else {
            setCategories([])
          }
        } else {
          console.error("Failed to fetch categories:", categoriesResult.reason)
          setCategories([])
        }
      } catch (err) {
        console.error("Error fetching homepage data:", err)
        setError("Failed to load data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Fallback for missing data
  const renderFallbackCategories = () => {
    return [
      {
        _id: "fallback1",
        name: "Men",
        image: men,
      },
      {
        _id: "fallback2",
        name: "Women",
        image: women,
      },
      {
        _id: "fallback3",
        name: "Accessories",
        image: accessories,
      },
    ]
  }

  // Fallback for missing products
  const renderFallbackProducts = () => {
    return [
      {
        _id: "fallback1",
        name: "Nike Air Max",
        price: 129.99,
        rating: 4.5,
        image: "/images/nike-air-max.jpg",
        countInStock: 10,
      },
      {
        _id: "fallback2",
        name: "Versace Bag",
        price: 899.99,
        rating: 4.8,
        image: "/images/versace-bag.jpg",
        countInStock: 5,
      },
      {
        _id: "fallback3",
        name: "Air Jordan 1",
        price: 199.99,
        rating: 4.7,
        image: "/images/air-jordan-1.jpg",
        countInStock: 8,
      },
    ]
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading amazing products...</p>
      </div>
    )
  }

  // Show partial content even if there's an error
  const displayCategories = categories.length > 0 ? categories : renderFallbackCategories()
  const displayFeaturedProducts = featuredProducts.length > 0 ? featuredProducts : renderFallbackProducts()
  const displayNewArrivals = newArrivals.length > 0 ? newArrivals : renderFallbackProducts()

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
            {displayCategories.map((category) => (
              <Link
                to={`/products?category=${category.name.toLowerCase()}`}
                className="category-card"
                key={category._id}
              >
                <div className="category-image">
                  <img src={category.image || "/placeholder.svg?height=300&width=300"} alt={category.name} />
                </div>
                <h3 className="category-names">{category.name}</h3>
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
            {displayFeaturedProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>Summer Sale Up To 50% Off</h2>
          <p>Shop our latest collection of premium products at unbeatable prices</p>
          <Link to="/products?collection=sale" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="new-arrivals-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <Link to="/products?collection=new" className="view-all-link">
              View All
            </Link>
          </div>

          <div className="products-grid">
            {displayNewArrivals.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
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
                "I'm absolutely in love with my new shoes! The quality is outstanding and they arrived even faster than
                expected. Will definitely be shopping here again."
              </p>
              <div className="testimonials-author">
                <div className="author-avatar">
                  <img src="/images/avatar-1.jpg" alt="Customer" />
                </div>
                <div>
                  <h4 className="author-name">Sarah Johnson</h4>
                  <p className="authors-titles">Verified Buyer</p>
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
                "The customer service here is exceptional. I had an issue with my order and they resolved it
                immediately. Plus, the products are top-notch quality!"
              </p>
              <div className="testimonials-author">
                <div className="author-avatar">
                  <img src="/images/avatar-2.jpg" alt="Customer" />
                </div>
                <div>
                  <h4 className="author-name">Michael Chen</h4>
                  <p className="authors-titles">Verified Buyer</p>
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
                "This is my go-to shop for fashion now. The selection is amazing and the prices are reasonable for the
                quality you get. Highly recommend!"
              </p>
              <div className="testimonials-author">
                <div className="author-avatar">
                  <img src="/images/avatar-3.jpg" alt="Customer" />
                </div>
                <div>
                  <h4 className="author-name">Emily Rodriguez</h4>
                  <p className="authors-titles">Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Stay updated with our latest products, exclusive offers, and fashion tips</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default HomePage

