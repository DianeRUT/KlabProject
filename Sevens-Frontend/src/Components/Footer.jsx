import "../styles/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Sevens</h3>
          <p className="footer-description">
            Your one-stop shop for premium products. Quality, style, and affordability all in one place.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Shop</h3>
          <ul className="footer-links">
            <li>
              <a href="/">All Products</a>
            </li>
            <li>
              <a href="/">Men</a>
            </li>
            <li>
              <a href="/">Women</a>
            </li>
            <li>
              <a href="/">Accessories</a>
            </li>
            <li>
              <a href="/">New Arrivals</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Customer Service</h3>
          <ul className="footer-links">
            <li>
              <a href="/">Contact Us</a>
            </li>
            <li>
              <a href="/">FAQs</a>
            </li>
            <li>
              <a href="/">Shipping & Returns</a>
            </li>
            <li>
              <a href="/">Size Guide</a>
            </li>
            <li>
              <a href="/">Track Order</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Connect With Us</h3>
          <div className="social-links">
            <a href="/" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="/" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="/" className="social-link">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
          <div className="newsletter">
            <h4>Subscribe to our newsletter</h4>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p className="copyright">© 2025 Sevens. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

