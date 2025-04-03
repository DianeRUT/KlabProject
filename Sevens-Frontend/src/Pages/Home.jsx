import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { products } from '../Data/products';
import ProductCard from '../Components/ProductCard';
import '../styles/Home.css';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  
  useEffect(() => {
    // Get featured products (highest rated)
    const featured = [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    setFeaturedProducts(featured);
    
    // Get new arrivals
    const arrivals = products
      .filter(product => product.isNew)
      .slice(0, 3);
    setNewArrivals(arrivals);
  }, []);
  
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Elevate Your Style</h1>
          <p>Discover the latest trends in fashion and accessories</p>
          <Link to="/" className="shop-now-btn">Shop Now</Link>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-container">
          <h2 className="section-title">Shop by Category</h2>
          
          <div className="categories-grid">
            <Link to="/" className="category-card">
              <div className="category-image">
                <img src="/images/category-shoes.jpg" alt="Shoes" />
              </div>
              <h3 className="category-name">Shoes</h3>
            </Link>
            
            <Link to="/" className="category-card">
              <div className="category-image">
                <img src="/images/category-accessories.jpg" alt="Accessories" />
              </div>
              <h3 className="category-name">Accessories</h3>
            </Link>
            
            <Link to="/" className="category-card">
              <div className="category-image">
                <img src="/images/category-clothes.jpg" alt="Clothes" />
              </div>
              <h3 className="category-name">Clothes</h3>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="featured-products-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/" className="view-all-link">View All</Link>
          </div>
          
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>Summer Sale</h2>
          <p>Up to 50% off on selected items</p>
          <Link to="/" className="shop-now-btn">Shop the Sale</Link>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="new-arrivals-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <Link to="/" className="view-all-link">View All</Link>
          </div>
          
          <div className="products-grid">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
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
  );
};

export default HomePage;
